import { RockTile, Boulder } from "../objects/rock.js";
import { Lilypad } from "../objects/lilypad.js";
import { FrogGirl } from "../objects/frog-girl.js";
import { Ground } from "../objects/ground.js";
import { OrbitControls } from "../modules/OrbitControls.js";
import { levelParameters } from "./globals.js";

const { tileSize, groundHeight, lilypadHeight } = levelParameters;

function World(levelInfo) {
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(20, 1.33, 0.1, 1000);
	this.renderer = new THREE.WebGLRenderer({ antialias: true });
	this.renderer.setClearColor(0x00aaff);

	this.lilypads = [];

	this.levelCenter = [
		0.5 * tileSize * (levelInfo.ground.length - 1),
		0,
		0.5 * tileSize * (levelInfo.ground[0].length - 1),
	];

	this.generateGround(levelInfo.ground);
	this.generateLilypads(levelInfo.lilypads);

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
		tileSize * levelInfo.start[1]
	);
	this.frogGirl.scale.set(0.3, 0.3, 0.3);
	this.scene.add(this.frogGirl);

	var ambientLight = new THREE.AmbientLight(0xffffff, 1);
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

	this.cameraLight = new THREE.PointLight(0xffffff, 1.2);
	this.cameraLight.position.set(
		tileSize * levelInfo.ground.length,
		tileSize * levelInfo.ground.length,
		0
	);
	this.cameraLight.lookAt(0, 0, 0);
	this.scene.add(this.cameraLight);

	this.clock = new THREE.Clock();

	this.controls = new OrbitControls(this.camera, this.renderer.domElement);
	this.controls.target.set(...this.levelCenter);

	this.raycaster = new THREE.Raycaster();

	const b = () => {
		this.lilypads[0].bloom();
	};
	this.lilypads[0].ready(b);
}

function generateGround(tiles) {
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

function generateLilypads(positions) {
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

	this.renderer.render(this.scene, this.camera);
}

function reset() {}

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

		if (intersection) return { type: "lilypad", object: this.lilypads[i] };
	}
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

export { World };
