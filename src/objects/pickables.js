import {GLTFLoader} from "../modules/GLTFLoader.js";

const {
	Group
} = THREE;

const loader = new GLTFLoader();
loader.load("./assets/models/pickables.gltf", loaded, null, console.error);
let keyInstances = [];
let blockerInstances = [];
let key;
let blocker;

function loaded(imported) {
	key = imported.scene.getObjectByName("Key");
	blocker = imported.scene.getObjectByName("Blocker");
	for (let keyInstance of keyInstances) {
		keyInstance.add(key.clone());
	}
	
	for (let blockerInstance of blockerInstances) {
		blockerInstance.add(blocker.clone());
	}
}

class Pickable extends Group {
	static pickableBy = ["girl"];
	constructor() {
		super();
		this.pickableBy = Pickable.pickableBy;
	}
}

class Blocker extends Pickable {
	static groundMatrix = new THREE.Matrix4().makeScale(0.3 / 1.6, 0.3 / 1.6, 0.3 / 1.6);
	static handMatrix = new THREE.Matrix4();
	static walkOverBy = [];
	constructor() {
		super();
		this.groundMatrix = Blocker.groundMatrix;
		this.handMatrix = Blocker.handMatrix;
		this.walkOverBy = Blocker.walkOverBy;
		if (blocker) {
			this.add(blocker.clone());
		}
		else {
			blockerInstances.push(this);
		}
	}
}

class Key extends Pickable {
	static groundMatrix = new THREE.Matrix4().makeScale(0.3 / 1.6, 0.3 / 1.6, 0.3 / 1.6);
	static handMatrix = new THREE.Matrix4();
	static walkOverBy = ["frog", "girl"];
	constructor() {
		super();
		this.groundMatrix = Key.groundMatrix;
		this.handMatrix = Key.handMatrix;
		this.walkOverBy = Key.walkOverBy;
		if (key) {
			this.add(key.clone());
		}
		else {
			keyInstances.push(this);
		}
	}
}

export {Pickable, Blocker, Key};