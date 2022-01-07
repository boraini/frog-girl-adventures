import {GLTFLoader} from "../modules/GLTFLoader.js";

const {
	Group
} = THREE;

const loader = new GLTFLoader();
loader.load("./assets/models/ground.gltf", loaded, null, console.error);
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
	constructor() {
		super();
	}
}

class Blocker extends Pickable {
	constructor() {
		super();
	  if (blocker) {
			this.add(blocker.clone());
		}
		else {
			blockerInstances.add(this);
		}
	}
}

class Key extends Pickable {
	constructor() {
		super();
	  if (key) {
			this.add(key.clone());
		}
		else {
			keyInstances.add(this);
		}
	}
}

export {Pickable, Blocker, Key};