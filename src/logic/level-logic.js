import { levelParameters } from "./globals.js";

const { Vector3 } = THREE;

let searchID = 0;

class Node {
	constructor(boundObject, neighbors = []) {
		this.boundObject = boundObject;
		boundObject._node = this;
		this.neighbors = neighbors;
		this._previous = null;
		this._searchID = -1;
		this._cost = 0;
	}

	addNeighbor(neighbor) {
		if (this.neighbors.indexOf(neighbor) == -1) {
			this.neighbors.push(neighbor);
			neighbor.addNeighbor(this);
			return this;
		}
	}

	removeNeighbor(neighbor) {
		const index = this.neighbors.indexOf(neighbor);
		if (index > -1) {
			this.neighbors = this.neighbors.splice(0, 1);
			neighbor.removeNeighbor(this);
			return this;
		}
	}

	isOccupied() {
		return this.boundObject.isOccupied;
	}

	heuristic(other) {
		return this.boundObject.position.distanceToSquared(
			other.boundObject.position
		);
	}

	findPath(goal, form) {
		//A* algoritm
		const sID = searchID++;

		const formAgnostic = typeof form == "undefined";
		this._searchID = sID;
		this._previous = null;
		this._cost = 0;
		const traversal = [this];

		let found = false;
		while (!found && traversal.length > 0) {
			traversal.sort(
				(a, b) => a._cost + a.heuristic(goal) - (b._cost + b.heuristic(goal))
			);
			const current = traversal.shift();
			current._searchID = sID;
			for (let neighbor of current.neighbors) {
				const neighborNewCost = current._cost + 1;
				if (neighbor._searchID != sID || neighborNewCost < neighbor.cost) {
					neighbor._cost = neighborNewCost;
					neighbor._previous = current;
					if (
						!neighbor.isOccupied() &&
            (formAgnostic || neighbor.allowedForms.includes(form))
					)
						traversal.push(neighbor);
					if (neighbor == goal) found = true;
				}
			}
		}

		if (found) {
			let previous =
        goal.isOccupied() ||
        (!formAgnostic && !goal.allowedForms.includes(form)) ? goal._previous: goal;
			const result = [];
			while (previous) {
				result.unshift(previous);
				previous = previous._previous;
			}
			return result;
		}
	}
}

class BoundObject {
	constructor({ x, y, groundHeight }) {
		this.position = new Vector3(x, groundHeight, y);
		this.groundHeight = groundHeight || 0;
	}

	equals(other) {
		if (other)
			return (
				this == other || this.position.manhattanDistanceTo(other.position) < 0.1
			);
	}
}

class Level {
	constructor(levelInfo, world) {
		//ground pathfinding nodes
		const groundNodes = [];
		this.groundNodes = groundNodes;
		this.groundNodesCompressed = [];

		for (let i = 0; i < levelInfo.ground.length; i++) {
			groundNodes.push(new Array(levelInfo.ground[i].length));
			for (let j = 0; j < levelInfo.ground[i].length; j++) {
				if (levelInfo.ground[i][j]) {
					const node = new Node(
						new BoundObject({
							x: i * levelParameters.tileSize,
							y: j * levelParameters.tileSize,
							groundHeight:
                levelParameters.tileSize * levelParameters.groundHeight,
						})
					);
					groundNodes[i][j] = node;
					this.groundNodesCompressed.push(node);

					if (j > 0 && levelInfo.ground[i][j - 1]) {
						groundNodes[i][j].addNeighbor(groundNodes[i][j - 1]);
					}
					if (
						i > 0 &&
            levelInfo.ground[i - 1].length > i &&
            levelInfo.ground[i - 1][j]
					) {
						groundNodes[i][j].addNeighbor(groundNodes[i - 1][j]);
					}

					node.allowedForms = ["frog", "girl"];
				}
			}
		}

		//lilypad pathfinding nodes
		const lilypadNodes = [];
		this.lilypadNodes = lilypadNodes;

		for (let i = 0; i < levelInfo.lilypads.length; i++) {
			const node = new Node(world.lilypads[i]);
			node.allowedForms = this.allowedForms = ["frog"];
			lilypadNodes.push(node);
		}

		//connect up lilypad paths
		for (let path of levelInfo.lilypadPaths) {
			let currentPathNode = null;
			let newPathNode = null;
			for (let waypoint of path) {
				if (waypoint instanceof Array) {
					if (
						waypoint[0] >= 0 &&
            waypoint[1] >= 0 &&
            waypoint[0] < groundNodes.length &&
            waypoint[1] < groundNodes[waypoint[0]].length &&
            groundNodes[waypoint[0]][waypoint[1]]
					) {
						newPathNode = groundNodes[waypoint[0]][waypoint[1]];
					} else {
						console.warn(
							`Lilypad path ${path}: ${waypoint} doesn't yield to any ground tile`
						);
					}
				} else {
					if (0 <= waypoint && waypoint < lilypadNodes.length) {
						newPathNode = lilypadNodes[waypoint];
					} else {
						console.warn(
							`Lilypad path ${path}: <${waypoint}> doesn't yield to any lilypad`
						);
					}
				}

				if (newPathNode) {
					if (currentPathNode) {
						currentPathNode.addNeighbor(newPathNode);
					}
					currentPathNode = newPathNode;
					newPathNode = null;
				}
			}
		}

		this.start = groundNodes[levelInfo.start[0]][levelInfo.start[1]];
		this.finish = groundNodes[levelInfo.finish[0]][levelInfo.finish[1]];

		this.world = world;

		this.numberOfTransforms = 0;
		this.numberOfTransformsLimits = levelInfo.numberOfTransforms;

		this.reset();
	}
	reset() {
		this.position = this.start;

		this.world.reset();
	}
	raycast(x, y) {
		const result = this.world.raycast(x, y);

		if (result) {
			if (result.object) {
				return result.object._node;
			} else {
				switch (result.type) {
				case "ground":
					return this.groundNodesCompressed[result.index];
				}
			}
		}
	}
	transform() {
		this.numberOfTransforms++;

		this.world.frogGirl.transform();

		return true;
	}
	move(node) {
		if (node == this.position) return false;
		const path = this.position.findPath(node, this.world.frogGirl.mode);
		if (path) {
			const result = this.world.frogGirl.locomote(
				path.map(
					(waypoint) =>
						new Vector3(
							waypoint.boundObject.position.x,
							waypoint.boundObject.groundHeight,
							waypoint.boundObject.position.z
						)
				)
			);
			if (result) this.position = path[path.length - 1];
			return result;
		} else return false;
	}
	pick() {}
}

export { Level, BoundObject };
