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
	constructor(config) {
		super();
		this.config = config;
		this.pickableBy = Pickable.pickableBy;
	}
}

class Blocker extends Pickable {
	static groundMatrix = new THREE.Matrix4().makeScale(0.3 / 1.6, 0.3 / 1.6, 0.3 / 1.6);
	static handMatrix = new THREE.Matrix4();
	static walkOverBy = [];
	static destroyAfterPicking = false;
	constructor(config) {
		super(config);
		this.groundMatrix = Blocker.groundMatrix;
		this.handMatrix = Blocker.handMatrix;
		this.walkOverBy = Blocker.walkOverBy;
		this.destroyAfterPicking = Blocker.destroyAfterPicking;
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
	static destroyAfterPicking = true;
	constructor(config) {
		super(config);
		this.groundMatrix = Key.groundMatrix;
		this.handMatrix = Key.handMatrix;
		this.walkOverBy = Key.walkOverBy;
		this.destroyAfterPicking = Key.destroyAfterPicking;
		if (key) {
			this.add(key.clone());
		}
		else {
			keyInstances.push(this);
		}
	}
}

class Finish extends Pickable {
	static handleMatrix = new THREE.Matrix4();
	static pickableBy = ["frog", "girl"];
	static walkOverBy = ["frog", "girl"];
	static destroyAfterPicking = true;
	constructor() {
		super({id: "finish", triggers: "finish"});

		const geometry = new THREE.BoxGeometry( 1, 0.05, 1 );
		const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
		const cube = new THREE.Mesh( geometry, material );
		cube.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 4, 0, "XYZ"));
		this.add(cube);

		this.groundMatrix = Finish.handleMatrix;
		this.handMatrix = Finish.handleMatrix;
		this.pickableBy = Finish.pickableBy;
		this.walkOverBy = Finish.walkOverBy;
		this.destroyAfterPicking = Key.destroyAfterPicking;
	}
}

export {Pickable, Blocker, Key, Finish};