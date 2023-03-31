import {assets} from "../logic/globals.js";
import { pathAnimation } from "../modules/animation-helper.js";

const rockGeometry = (
	function() {
		const t = ( 1 + Math.sqrt( 5 ) ) / 2;

		const vertices = [
			- 1, t, 0, 	1, t, 0, 	- 1, - t, 0, 	1, - t, 0,
			0, - 1, t, 	0, 1, t,	0, - 1, - t, 	0, 1, - t,
			t, 0, - 1, 	t, 0, 1, 	- t, 0, - 1, 	- t, 0, 1
		];

		const indices = [
			0, 11, 5, 	0, 5, 1, 	0, 1, 7, 	0, 7, 10, 	0, 10, 11,
			1, 5, 9, 	5, 11, 4,	11, 10, 2,	10, 7, 6,	7, 1, 8,
			3, 9, 4, 	3, 4, 2,	3, 2, 6,	3, 6, 8,	3, 8, 9,
			4, 9, 5, 	2, 4, 11,	6, 2, 10,	8, 6, 7,	9, 8, 1
		];
		
		const sigma = 0.1;
		const scale = 0.6;
		for (let i = 0; i < vertices.length; i++) {
			vertices[i] *= scale;
			vertices[i] += 2 * sigma * Math.random() - sigma;
		}
		
		const geometry = new THREE.BufferGeometry();
		geometry.setIndex(indices)
			.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
			.setAttribute("normal", new THREE.Float32BufferAttribute( vertices.slice(), 3 ) );
						
		return geometry;
	}
)();

const rockTileMaterial = new THREE.MeshStandardMaterial({color: 0x888888});
const boulderMaterial = new THREE.MeshStandardMaterial({color: 0x666666});

class RockTile {
	constructor() {
		if (!assets.RockTile) {
			assets.RockTile = new THREE.InstancedMesh(rockGeometry, rockTileMaterial, 32);
		}
		return assets.RockTile;
	}
}

class Boulder extends THREE.Group {
	static handleMatrix = new THREE.Matrix4();
	static pickableBy = [];
	static walkOverBy = [];
	static rollStep = new THREE.Quaternion().setFromEuler(new THREE.Euler(3, 0, 0, "XYZ"));
	constructor(config) {
		super();
		this.mesh = new THREE.Mesh(rockGeometry, boulderMaterial);
		this.config = config;
		this.groundMatrix = Boulder.handleMatrix;
		this.handMatrix = Boulder.handleMatrix;
		this.pickableBy = Boulder.pickableBy;
		this.walkOverBy = Boulder.walkOverBy;

		this.mixer = new THREE.AnimationMixer(this);
		this.add(this.mesh);
	}
	trigger(level, node, triggerer) {
		return new Promise(
			(resolve, reject) => this.triggerInternal(level, node, triggerer, resolve, reject)
		);
	}
	triggerInternal(level, node, triggerer, resolve, reject) {
		const startNode = level.groundNodes[this.config.location[0]][this.config.location[2]];
		//console.log(level.groundNodes);
		const stopNode = level.groundNodes[this.config.rollTo[0]][this.config.rollTo[2]];
		const path = startNode.findPath(stopNode);
		if (path.length > 1) {
			const [clip, endQuat] =  pathAnimation(path.map(n => n.boundObject.position), this.quaternion, 5 * this.scale.x);
			const action = this.mixer.clipAction(clip);
		    action.loop = THREE.LoopOnce;
			const listener = e => {
				if (e.action == action) {
					action.stop();
					this.rolling = false;
					this.mixer.removeEventListener(listener);
					
					const reached = path[path.length - 1].boundObject.position;
					this.position.copy(reached);
					this.quaternion.copy(endQuat);

					console.log("finished");

					if (resolve) resolve();
				}
			};
			this.mixer.addEventListener("finished", listener);
			
			action.reset();
			
			console.log("playing");
			
			action.play();
			this.rolling = true;

			startNode.item = null;
			stopNode.item = this;
		} else {
			reject("There is something wrong with the boulder path.");
		}
	}
	updateAnimation(dt) {
		if (this.rolling) {
			this.mesh.quaternion.multiply(new THREE.Quaternion().slerp(Boulder.rollStep, dt));
		}
		this.mixer.update(dt);
	}
	stopAnimation() {
		this.mixer.stopAllAction();
		this.rolling = false;
	}
}

export {RockTile, Boulder};
