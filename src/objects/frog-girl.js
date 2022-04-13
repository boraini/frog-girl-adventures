import { GLTFLoader } from "../modules/GLTFLoader.js";
import { pathAnimation } from "../modules/animation-helper.js";
import { assets } from "../logic/globals.js";
const {
	Group,
	AnimationMixer
} = THREE;

class FrogGirl extends Group {
	constructor() {
		super();
		
		const scope = this;
		
		function loaded (imported) {
			assets.frogGirl = imported;
			scope.init(imported);
		}
		
		if (assets.frogGirl) {
			loaded(assets.frogGirl);
		}
		else {
			const loader = new GLTFLoader();
			loader.load("./assets/models/frog-girl.gltf", loaded, null, console.error);
		}
		
		this.locomoting = false;
		this.mode = "girl";
		this.nextBlink = 0;
		this.nextThink = 5;
		this.accumulatedTime = 0;
		this.transformLockCounter = 0;
		this.locomotionPath = null;
		this.locomotionWaypointAvailable = false;
		this.movesLocked = false;
	}
	
	init(imported) {
		const { animations, scene } = imported;

		this.rig = scene.getObjectByName("metarig");
		this.suit = scene.getObjectByName("Suit");
		this.girlEyeL = this.rig.getObjectByName("GirlEyeL");
		this.girlEyeR = this.rig.getObjectByName("GirlEyeR");
		this.girlEyelidL = this.rig.getObjectByName("GirlEyelidL");
		this.girlEyelidR = this.rig.getObjectByName("GirlEyelidR");
		
		this.add(this.rig);
		
		this.mixer = new AnimationMixer(this);
		this.rigMixer = new AnimationMixer(this.rig);
		this.girlEyelidLMixer = new AnimationMixer(this.girlEyelidL);
		this.girlEyelidRMixer = new AnimationMixer(this.girlEyelidR);
		
		this.girlStandClip = this.rigMixer.clipAction(animations.find(s => s.name == "GirlRelaxed"));
		this.girlStandClip.clampWhenFinished = true;
		this.girlStandClip.loop = THREE.LoopRepeat;
		
		this.girlThinkClip = this.rigMixer.clipAction(animations.find(s => s.name == "Think"));
		this.girlThinkClip.clampWhenFinished = true;
		this.girlThinkClip.loop = THREE.LoopOnce;
		
		this.transformClip = this.rigMixer.clipAction(animations.find(s => s.name == "Transform"));
		this.transformClip.clampWhenFinished = true;
		this.transformClip.loop = THREE.LoopOnce;
		
		this.frogJumpClip = this.rigMixer.clipAction(animations.find(s => s.name == "FrogJump"));
		this.frogJumpClip.clampWhenFinished = true;
		this.frogJumpClip.loop = THREE.LoopOnce;
		
		this.girlWalkClip = this.rigMixer.clipAction(animations.find(s => s.name == "GirlWalk"));
		this.girlWalkClip.clampWhenFinished = true;
		this.girlWalkClip.loop = THREE.LoopRepeat;
		
		this.girlBlinkClip = [
			this.girlEyelidLMixer.clipAction(animations.find(s => s.name == "Blink")),
			this.girlEyelidRMixer.clipAction(animations.find(s => s.name == "Blink"))
		];
		
		this.girlBlinkClip.forEach((c) => {
			c.clampWhenFinished = true;
			c.loop = THREE.LoopOnce;
		});
		
		this.rigMixer.addEventListener("finished", e => {
			if (e.action == this.girlThinkClip) {
				this.stopThinking.call(this);
			}
			if (e.action == this.transformClip) {
				this.stopTransforming.call(this);
			}
			if (e.action == this.frogJumpClip) {
				if (this.locomoting) this.jumpTimeout = setTimeout(this.stopJumping.bind(this), 1000);
				//this.frogJumpClip.stop();
			}
		});
		
		this.girlStandClip.reset().play();
		this.girlThinkClip.reset().stop();
		this.transformClip.reset().stop();
		this.frogJumpClip.reset().stop();
		
	}
	
	updateAnimation(dt) {
		if (!this.rig) return;
		
		this.accumulatedTime += dt;
		
		if (this.accumulatedTime > this.nextBlink) {
			this.blink();
			this.nextBlink += 1 + 5 * Math.random();
		}
		
		if (this.accumulatedTime > this.nextThink) {
			if (this.mode == "girl" && !this.locomoting) this.think();
			this.nextThink += 10;
		}
		
		if (this.rigMixer) {
			this.rigMixer.update(dt);
			this.mixer.update(dt);
			this.girlEyelidLMixer.update(dt);
			this.girlEyelidRMixer.update(dt);
		}
		
		if (this.locomotionWaypointAvailable) {
			this.locomotionWaypointAvailable = false;
			this.startNewWaypoint();
		}
	}
	
	animateLocomotion(path) {
		const [clip, endQuat] = pathAnimation(path, this.quaternion, 5 * this.scale.x / 0.3);
		const action = this.mixer.clipAction(clip);
		action.loop = THREE.LoopOnce;
		
		const listener = e => {
			if (e.action == action) {
				console.log("finished");
				if (this.mode == "frog") this.stopJumping();
				
				action.stop();
				this.mixer.removeEventListener(listener);
				
				const reached = path[path.length - 1];
				this.position.copy(reached);
				this.quaternion.copy(endQuat);
				
				if (this.mode == "girl") this.stopWalking();
				
				this.movesLocked = false;
			}
		};
		this.mixer.addEventListener("finished", listener);
		
		action.reset();
		
		console.log("playing");
		
		action.play();
		if (this.mode == "girl") this.startWalking();
		else this.jump();
	}
	
	blink() {
		this.girlBlinkClip[0].reset().play();
		this.girlBlinkClip[1].reset().play();
	}
	
	think() {
		this.girlStandClip.crossFadeTo(this.girlThinkClip, 0.2);
		this.girlThinkClip.reset().play();
	}
	
	stopThinking() {
		this.girlThinkClip.crossFadeTo(this.girlStandClip, 0.2);
		this.girlStandClip.reset().play();
	}
	
	transform() {
		if (this.mode == "girl")
			this.transformToFrog();
		else
			this.transformToGirl();
	}
	
	stopTransforming() {
		if (this.mode == "girl") {
			this.transformClip.crossFadeTo(this.girlStandClip, 0.2);
			this.girlStandClip.reset().play();
		}
	}
	
	jump() {
		this.locomoting = true;
		this.lockTransformation();
		this.frogJumpClip.timeScale = 1;
		this.frogJumpClip.reset().play();
	}
	
	stopJumping() {
		this.locomoting = false;
		this.unlockTransformation();
		this.frogJumpClip.reset().timeScale = -1;
		this.frogJumpClip.time = this.frogJumpClip.getClip().duration;
		this.frogJumpClip.play();
	}
	
	startWalking() {
		this.locomoting = true;
		this.lockTransformation();
		this.girlStandClip.crossFadeTo(this.girlWalkClip, 0.2);
		this.girlWalkClip.reset().play();
	}
	
	stopWalking() {
		this.locomoting = false;
		this.unlockTransformation();
		this.girlWalkClip.crossFadeTo(this.girlStandClip, 0.2);
		this.girlStandClip.reset().play();
	}
	
	transformToGirl() {
		if (this.mode == "girl") return;
		if (this.isTransformationLocked()) {
			console.warn("transformation is currently locked");
			return;
		}
		if (this.jumpTimeout) clearTimeout(this.jumpTimeout);
		this.mode = "girl";
		this.girlStandClip.crossFadeTo(this.transformClip, 0.2);
		this.transformClip.timeScale = -1;
		this.transformClip.time = this.transformClip.getClip().duration;
		this.frogJumpClip.stop();
		this.transformClip.reset().play();
	}
	
	transformToFrog() {
		if (this.mode == "frog") return;
		if (this.isTransformationLocked()) {
			console.warn("transformation is currently locked");
			return;
		}
		this.mode = "frog";
		this.girlStandClip.crossFadeTo(this.transformClip, 0.2);
		this.transformClip.timeScale = 1;
		this.girlThinkClip.stop();
		this.transformClip.reset().play();
	}
	
	locomote(path) {
		if (!this.movesLocked) {
			this.movesLocked = true;
			this.animateLocomotion(path);
			return true;
		}
		else return false;
	}
	
	lockTransformation() {
		this.transformLockCounter++;
	}
	
	unlockTransformation() {
		this.transformLockCounter--;
	}
	
	isTransformationLocked() {
		return !this.movesLocked && this.transformLockCounter > 0;
	}
}

export {FrogGirl};
