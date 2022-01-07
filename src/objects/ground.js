//import  {MeshStandardMaterial} from "../modules/three.module.js";
import { GLTFLoader } from "../modules/GLTFLoader.js";
import { assets } from "../logic/globals.js";
import Materials from "./materials.js";
import {Water} from '../modules/Water2.js';
const { MeshStandardMaterial, Group } = THREE;

/*function Lilypad(callback) {
  if (assets.lilypad) {
    callback(assets.lilypad);
  }
  else {
    var loader = new GLTFLoader();
    loader.load("./assets/models/lilypad.glb", loaded.bind(null, callback), null, console.error);
  }
}*/

class Ground extends Group {
	constructor(levelInfo, tileSize) {
		  super();
  this.type = 'Ground';
  this.animations = null;
  this.fern1 = null;
  this.fern2 = null;
  this.ground = null;
  this.bush = null;
  this.mixer1 = null;
  this.mixer2 = null;
  
  this._readyCallbacks = [];
  var scope = this;

  function loaded(imported) {
    assets.ground = imported;
    //console.log(imported);
    var animations = imported.animations;

    var scene = imported.scene;
    scope.fern = scene.getObjectByName("Fern").clone();
    scope.fern1 = scope.fern.getObjectByName("Fern1");
    scope.fern2 = scope.fern.getObjectByName("Fern2");
    scope.ground = scene.getObjectByName("Ground").clone();
		scope.water = new Water(scene.getObjectByName("Water").geometry, {
  		color: 0x00ffcc,
		  flowDirection: new THREE.Vector2(0.1, 0.1),
			scale: tileSize * 0.1 * levelInfo.ground.length,
		  textureWidth: 1024,
	  	textureHeight: 1024
	  });
    scope.bush = scene.getObjectByName("Bush").clone();
    scope.add(scope.fern);
    scope.add(scope.ground);
    scope.add(scope.bush);
		scope.add(scope.water);
    
    scope.rotateY(Math.PI * 0.5);
		scope.water.rotateX(-Math.PI * 0.5);
    scope.scale.set(0.8, 0.8, 0.8)

    scope.mixer1 = new THREE.AnimationMixer(scope.fern1);
    scope.mixer2 = new THREE.AnimationMixer(scope.fern2);
    
    scope.wave1Action = scope.mixer1.clipAction(animations.find(s => s.name == "Wave1"));
    scope.wave1Action.clampWhenFinished = false;
    scope.wave1Action.loop = THREE.LoopRepeat;

    scope.wave2Action = scope.mixer2.clipAction(animations.find(s => s.name == "Wave2"));
    scope.wave2Action.clampWhenFinished = false;
    scope.wave2Action.loop = THREE.LoopRepeat;
    
    function wave() {
      scope.wave1Action.reset().play();
      scope.wave2Action.reset().play();
    }
    
    scope.ready(wave);
    
    for (var fn of scope._readyCallbacks) fn(scope);
  }
  if (assets.ground) {
    loaded(assets.ground);
  }
  else {
    var loader = new GLTFLoader();
    loader.load("./assets/models/ground.gltf", loaded, null, console.error);
  }
	}
	
	ready(callback) {
		this._readyCallbacks.push(callback);
	}
}

/*
function Ground() {
  Group.call(this);
  this.type = 'Ground';
  this.animations = null;
  this.fern1 = null;
  this.fern2 = null;
  this.ground = null;
  this.bush = null;
  this.mixer1 = null;
  this.mixer2 = null;
  
  this._readyCallbacks = [];
  var scope = this;

  function loaded(imported) {
    assets.ground = imported;
    //console.log(imported);
    var animations = imported.animations;

    var scene = imported.scene;
    scope.fern = scene.getObjectByName("Fern").clone();
    scope.fern1 = scope.fern.getObjectByName("Fern1");
    scope.fern2 = scope.fern.getObjectByName("Fern2");
    scope.ground = scene.getObjectByName("Ground").clone();
    scope.bush = scene.getObjectByName("Bush").clone();
    scope.add(scope.fern);
    scope.add(scope.ground);
    scope.add(scope.bush);
    
    scope.rotateY(Math.PI * 0.5);
    scope.scale.set(0.8, 0.8, 0.8)

    scope.mixer1 = new THREE.AnimationMixer(scope.fern1);
    scope.mixer2 = new THREE.AnimationMixer(scope.fern2);
    
    scope.wave1Action = scope.mixer1.clipAction(animations.find(s => s.name == "Wave1"));
    scope.wave1Action.clampWhenFinished = false;
    scope.wave1Action.loop = THREE.LoopRepeat;

    scope.wave2Action = scope.mixer2.clipAction(animations.find(s => s.name == "Wave2"));
    scope.wave2Action.clampWhenFinished = false;
    scope.wave2Action.loop = THREE.LoopRepeat;
    
    function wave() {
      scope.wave1Action.reset().play();
      scope.wave2Action.reset().play();
    }
    
    scope.ready(wave);
    
    for (var fn of scope._readyCallbacks) fn(scope);
  }
  if (assets.ground) {
    loaded(assets.ground);
  }
  else {
    var loader = new GLTFLoader();
    loader.load("./assets/models/ground.gltf", loaded, null, console.error);
  }
}

Ground.prototype = Object.create(Group.prototype);

Ground.prototype.ready = function(callback) {
  this._readyCallbacks.push(callback);
}
*/

export { Ground }
