import { RockTile, Boulder } from "../objects/rock.js";
import { Lilypad } from "../objects/lilypad.js";
import { FrogGirl } from "../objects/frog-girl.js";
import { Ground } from "../objects/ground.js";
import { OrbitControls } from "../modules/OrbitControls.js";
import { levelParameters } from "./globals.js";
import { Key, Blocker } from "../objects/pickables.js";

function World(levelInfo) {
	const { tileSize, groundHeight, lilypadHeight } = levelParameters;
	this.levelInfo = levelInfo;
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(20, 1.33, 0.1, 1000);
	this.renderer = new THREE.WebGLRenderer({ antialias: true });
	this.renderer.setClearColor(0x00aaff);

	this.lilypads = [];
	this.objects = {};

	this.levelCenter = [
		0.5 * tileSize * (levelInfo.ground.length - 1),
		0,
		0.5 * tileSize * (levelInfo.ground[0].length - 1),
	];

	this.generateGround(levelInfo.ground, tileSize);
	this.generateLilypads(levelInfo.lilypads, tileSize, lilypadHeight);

	this.groundPlane = new Ground(levelInfo, tileSize);
	this.scene.add(this.groundPlane);

	/*const waterGeometry = new THREE.PlaneBufferGeometry(20, 20);
  this.water = new Water( waterGeometry, {
  		color: 0x00ffcc,
	  	scale: tileSize * 0.1 * levelInfo.ground.length,
		  flowDirection: new THREE.Vector2(0.1, 0.1),
		  textureWidth: 1024,
	  	textureHeight: 1024
	  });
  this.water.position.set(this.levelCenter[0], -0.1, this.levelCenter[2]);
  this.water.rotation.x = Math.PI * - 0.5;
  this.water.scale.set(0.5, 0.5, 0.5);
  this.scene.add(this.water);*/

	this.frogGirl = new FrogGirl();
	this.frogGirl.position.set(
		tileSize * levelInfo.start[0],
		tileSize * groundHeight,
		tileSize * levelInfo.start[2]
	);
	this.characterScale = new THREE.Vector3(0.3 / 1.6 * tileSize, 0.3 / 1.6 * tileSize, 0.3 / 1.6 * tileSize);
	this.frogGirl.scale.copy(this.characterScale);
	this.scene.add(this.frogGirl);

	var ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
	this.scene.add(ambientLight);

	const cd = 4;
	this.camera.position.set(
		cd * tileSize * levelInfo.ground.length,
		cd * tileSize * levelInfo.ground.length,
		cd * tileSize * levelInfo.ground[0].length
	);

	this.camera.lookAt(...this.levelCenter);
	//this.camera.lookAt(this.lilypads[0].position);
	this.scene.add(this.camera);

	this.cameraLight = new THREE.PointLight(0xffffff, 1);
	this.cameraLight.position.set(
		tileSize * 20,
		tileSize * 20,
		tileSize * 20
	);
	this.camera.add(this.cameraLight);

	this.clock = new THREE.Clock();

	this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	this.controls.target.set(...this.levelCenter);

	this.raycaster = new THREE.Raycaster();
}

function generateGround(tiles, tileSize) {
	const rockTile = new RockTile(0, 0, 0, 0);
	let counter = 0;
	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[0].length; j++) {
			if (tiles[i][j]) {
				rockTile.setMatrixAt(
					counter,
					new THREE.Matrix4()
						.multiply(
							new THREE.Matrix4().makeTranslation(tileSize * i, 0, tileSize * j)
						)
						.multiply(
							new THREE.Matrix4().makeScale(tileSize / 1.6, tileSize / 1.6, tileSize / 1.6)
						)
						.multiply(
							new THREE.Matrix4().makeRotationFromEuler(
								new THREE.Euler(0, 6 * Math.random(), 0, "XYZ")
							)
						)
				);
				counter++;
			}
		}
	}
	const zero = new THREE.Matrix4();
	zero.multiplyScalar(0);
	while (counter < 32) {
		rockTile.setMatrixAt(counter, zero);
		counter++;
	}
	rockTile.instanceMatrix.needsUpdate = true;

	this.scene.add(rockTile);
	this.ground = rockTile;
}

function generateLilypads(positions, tileSize, lilypadHeight) {
	for (let position of positions) {
		const lilypad = new Lilypad();
		lilypad.position.set(tileSize * position[0], 0, tileSize * position[1]);
		lilypad.scale.set(0.6, 0.6, 0.6);
		lilypad.rotateY(6 * Math.random());
		lilypad.groundHeight = lilypadHeight;

		this.scene.add(lilypad);
		this.lilypads.push(lilypad);
	}
}

function generateObstacles(obstacleInfos) {
	this.obstacles = [];
	for (let obstacleInfo of obstacleInfos) {
		switch (obstacleInfo.type) {
		case "boulder":
			this.obstacles.push(new Boulder(obstacleInfo));
			break;
		default:
			console.warn(obstacleInfo.type + "is an invalid obstacle type");
		}
	}
}

function generateTriggers(triggerInfos) {
	this.triggers = [];
	for (let triggerInfo of triggerInfos) {
		switch (triggerInfo.type) {
		case "key":
			this.triggers.push(new Key(triggerInfo));
			break;
		case "blocker":
			this.triggers.push(new Blocker(triggerInfo));
			break;
		default:
			console.warn(triggerInfo.type + "is an invalid trigger type");
		}
	}
}

function render() {
	var delta = this.clock.getDelta();

	this.lilypads.forEach((l) => l.mixer && l.mixer.update(delta));
	if (this.groundPlane.mixer1) {
		this.groundPlane.mixer1.update(delta);
		this.groundPlane.mixer2.update(delta);
	}

	this.frogGirl.updateAnimation(delta);

	Object.values(this.objects).forEach(obj => {
		if (!obj.destroyed && obj.updateAnimation) {
			obj.updateAnimation(delta);
		}
	});

	this.renderer.render(this.scene, this.camera);
}

function reset() {
	const {tileSize, groundHeight} = levelParameters;
	this.frogGirl.position.set(
		tileSize * this.levelInfo.start[0],
		tileSize * groundHeight,
		tileSize * this.levelInfo.start[2]
	);
	this.frogGirl.transformToGirl();
}

function raycast(x, y) {
	this.raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera);

	const groundIntersection = this.raycaster.intersectObject(this.ground);

	if (groundIntersection.length > 0) {
		//const color = new THREE.Color();
		//this.ground.getColorAt(groundIntersection[0].instanceId, color);
		//this.ground.setColorAt(groundIntersection[0].instanceId, color.setHex(0xff0000));
		//this.ground.instanceColor.needsUpdate = true;
		return { type: "ground", index: groundIntersection[0].instanceId };
	}

	for (let i = 0; i < this.lilypads.length; i++) {
		const intersection = this.raycaster.intersectObject(
			this.lilypads[i].lilypad
		);

		if (intersection.length > 0)
			return { type: "lilypad", object: this.lilypads[i] };
	}
}

function pick(character, node, item) {
	if (item.destroyAfterPicking) {
		item.parent.remove(item);
		item.destroyed = true;
	} else {
		const par = character.getObjectByName("handR");
		const mat = (new THREE.Matrix4()).makeRotationFromEuler(new THREE.Euler(
			0.5 * Math.PI,
			0,
			0.5 * Math.PI, "XYZ"
		)).multiply(item.handMatrix);
		mat.decompose(item.position, item.quaternion, item.scale);
		par.add(item);
	}
}

function drop(character, node, item) {
	const mat = (new THREE.Matrix4()).makeTranslation(
		node.boundObject.position.x,
		node.boundObject.groundHeight,
		node.boundObject.position.z
	).multiply((new THREE.Matrix4()).copy(item.groundMatrix).scale(new THREE.Vector3(
		levelParameters.tileSize / 1.6,
		levelParameters.tileSize / 1.6,
		levelParameters.tileSize / 1.6
	)));
	mat.decompose(item.position, item.quaternion, item.scale);
	this.scene.add(item);
}

function resizeHandler(w, h, r) {
	this.camera.aspect = w / h;
	this.camera.updateProjectionMatrix();

	this.renderer.setSize(w, h);
	this.renderer.setPixelRatio(r);
}

World.prototype.generateGround = generateGround;
World.prototype.generateLilypads = generateLilypads;
World.prototype.generateObstacles = generateObstacles;
World.prototype.render = render;
World.prototype.resizeHandler = resizeHandler;
World.prototype.reset = reset;
World.prototype.raycast = raycast;
World.prototype.pick = pick;
World.prototype.drop = drop;

export { World };
