//import  {MeshStandardMaterial} from "../modules/three.module.js";
import { GLTFLoader } from "../modules/GLTFLoader.js";
import { assets } from "../logic/globals.js";
import Materials from "./materials.js";
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

function Lilypad() {
  Group.call(this);
  this.type = 'Lilypad';
  this.animations = null;
  this.lilypad = null;
  this.flower = null;
  this.mixer = null;
  this.bloomAction = null;
  this._readyCallbacks = [];
  var scope = this;

  function loaded(imported) {
    console.log(imported);
    var animations = imported.animations;

    var scene = imported.scene;
    scope.lilypad = scene.getObjectByName("Lilypad");
    scope.flower = scene.getObjectByName("Flower");

    console.log(scope.flower);

    //scope.lilypad.material = Materials.Lilypad;


    /*scope.flower.getObjectByName("Petal1").material = Materials.LilyPetal;
    scope.flower.getObjectByName("Petal2").material = Materials.LilyPetal;
    scope.flower.getObjectByName("Petal3").material = Materials.LilyPetal;
    scope.flower.getObjectByName("Petal4").material = Materials.LilyPetal;
    scope.flower.getObjectByName("Petal5").material = Materials.LilyPetal;
    scope.flower.getObjectByName("Petal6").material = Materials.LilyPetal;*/

    console.log("assigned materials");
    scope.add(scope.lilypad);
    //scope.add(scene.getObjectByName("Petal1"))

    scope.mixer = new THREE.AnimationMixer(scope.flower);

    scope.bloomAction = scope.mixer.clipAction(animations.find(s => s.name == "Bloom"));
    scope.bloomAction.clampWhenFinished = true;
    scope.bloomAction.loop = THREE.LoopOnce;

    scope.growAction = scope.mixer.clipAction(animations.find(s => s.name == "Grow"));
    scope.growAction.clampWhenFinished = true;
    scope.growAction.loop = THREE.LoopOnce;

    console.log(scope);

    for (var fn of scope._readyCallbacks) fn(scope);
  }
  if (assets.lilypad) {
    return assets.lilypad;
  }
  else {
    assets.lilypad = this;
    var loader = new GLTFLoader();
    loader.load("./assets/models/lilypad-animated.glb", loaded, null, console.error);
  }
  console.log(assets.lilypad);
}

console.log(Materials);

Lilypad.prototype = Object.create(Group.prototype);

Lilypad.prototype.ready = function(callback) {
  this._readyCallbacks.push(callback);
}

Lilypad.prototype.bloom = function() {
  this.add(this.flower);
  this.bloomAction.reset().play();
  this.growAction.reset().play();
}

export { Lilypad }
