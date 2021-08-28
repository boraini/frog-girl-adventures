import {loadLevel} from "./logic/level-loader.js";
import {World} from "./logic/level-three.js";

const levelNumber = parseInt(window.location.hash.substr(1));

let canvas, dispbox, world;

function windowResizeHandler() {
  var rect = dispbox.getBoundingClientRect() || {width: 800, height: 600};
  var rt = window.devicePixelRatio || 2;
  world.resizeHandler(rect.width, rect.height, rt);
}

function init(levelInfo) {
  world = new World(levelInfo);
  window.world = world;
  
  canvas = world.renderer.domElement;
  dispbox = document.getElementById("dispbox");
  dispbox.appendChild(canvas);
  
  windowResizeHandler();
  addEventListener("resize", windowResizeHandler);
  
  loop();
}

function loop() {
  world.render();
  requestAnimationFrame(loop);
}

if (levelNumber) {
  loadLevel(levelNumber, alert).then(init);
}
