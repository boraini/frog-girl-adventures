import { Pickable, Blocker, Key } from "../objects/pickables.js";
import { Boulder } from "../objects/rock.js";
import { levelParameters } from "./globals.js";

const { Vector3 } = THREE;

let searchID = 0;

class Node {
	constructor(boundObject, neighbors = []) {
		this.boundObject = boundObject;
		boundObject._node = this;
		this.item = null;
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

	isOccupied(form) {
		return this.item && this.item.walkOverBy.indexOf(form) == -1;
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
						!neighbor.isOccupied(form) &&
            (formAgnostic || neighbor.allowedForms.includes(form))
					)
						traversal.push(neighbor);
					if (neighbor == goal) found = true;
				}
			}
		}

		if (found) {
			let previous =
        goal.isOccupied(form) ||
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
		this.items = world.objects;

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

		for (let object of levelInfo.objects) {
			const constructors = {
				"boulder": Boulder,
				"key": Key,
				"blocker": Blocker
			};
			if (!constructors[object.type]) {
				console.error(`Object type "${object.type}" unknown, for id ${object.id}.`);
				continue;
			}
			
			if (object.location instanceof Array) {
				const object3D = new constructors[object.type](object);
				this.items[object.id] = object3D;
			} else {
				console.error(`Location for id ${object.id} should be specified as [x, don't-care, y] on a ground tile.`);
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
		this.numberOfTransforms = 0;
		this.world.reset();
		for (let node of this.groundNodesCompressed) {
			node.item = null;
		}
		for (let object3D of Object.values(this.items)) {
			const object = object3D.config;
			object.destroyed = false;
			const node = this.groundNodes[object.location[0]][object.location[2]];
			node.item = object3D;
			if (object3D.stopAnimation) {
				object3D.stopAnimation();
			}
			this.world.drop(this.world.frogGirl, node, object3D);
		}
	}
	interactWithNode(node, onStateReady) {
		if (this.world.frogGirl.movesLocked) {
			onStateReady();
			return Promise.resolve();
		}
		if (node.isOccupied(this.world.frogGirl.form)) {
			const item = node.item;
			if (!this.world.frogGirl.heldItem) {
				this.findPath(node).then(
					path => {
						if (this.canPick(this.world.frogGirl, item)) this.pick(node);
						onStateReady();
						return this.move(path);
					}
				).then(
					() => {
						if (this.canPick(this.world.frogGirl, item)) {
							this.world.pick(this.world.frogGirl, node, item);
						}

						if (item.config.triggers != undefined) {
							console.log("executing trigger");
							return this.executeTrigger(node, item);
						} else {
							return Promise.resolve();
						}
					}
				).then(() => {}).catch(err => console.warn(err)).finally(onStateReady);
			}
		} else {
			const item = this.world.frogGirl.heldItem;
			this.findPath(node).then(
				path => {
					if (item) this.drop(node);
					onStateReady();
					return this.move(path);
				}
			).then(
				() => item ? this.world.drop(this.world.frogGirl, node, item) : false
			).catch(err => console.warn(err)).finally(onStateReady);
		}
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
	canTransform() {
		return !(this.position.boundObject.type == "Lilypad" || this.world.frogGirl.heldItem);
	}
	canPick(character, item) {
		return item instanceof Pickable && item.pickableBy.indexOf(character.mode) > -1;
	}
	transform() {
		this.numberOfTransforms++;

		this.world.frogGirl.transform();

		return true;
	}
	findPath(node) {
		if (node == this.position) return Promise.resolve([node]);
		const item = node.item;
		if (this.canPick(this.world.frogGirl, item)) node.item = null;
		const path = this.position.findPath(node, this.world.frogGirl.mode);
		node.item = item;
		if (path) {
			return Promise.resolve(path);
		} else {
			return Promise.reject("path not found");
		}
	}
	move(path) {
		if (path) {
			return this.world.frogGirl.locomoteAsync(
				path.map(
					(waypoint) =>
						new Vector3(
							waypoint.boundObject.position.x,
							waypoint.boundObject.groundHeight,
							waypoint.boundObject.position.z
						)
				)
			).then(
				() => (this.position = path[path.length - 1], Promise.resolve())
			);
		} else return Promise.reject("path not found");
	}
	pick(node) {
		const item = node.item;
		node.item = null;
		if (item.destroyAfterPicking) {
			return false;
		} else {
			this.world.frogGirl.heldItem = item;
		    this.world.frogGirl.lockTransformation();
			return true;
		}
	}
	drop(node) {
		const item = this.world.frogGirl.heldItem;
		node.item = item;
		this.world.frogGirl.heldItem = null;
		this.world.frogGirl.unlockTransformation();
	}
	executeTrigger(node, item) {
		const otherObject = this.items[item.config.triggers];
		if (!otherObject) {
			return Promise.reject(`Other object with id ${item.config.triggers} not found.`);
		}
		return otherObject.trigger(this, node, item);
	}
}

export { Level, BoundObject };
