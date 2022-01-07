import {loadLevel} from "./logic/level-loader.js";
import {World} from "./logic/level-three.js";
import {Level} from "./logic/level-logic.js";
import {UIManager} from "./logic/level-ui.js";

const levelNumber = parseInt(window.location.hash.substr(1));

let canvas, dispbox, world, level, uiManager;

function windowResizeHandler() {
  var rect = dispbox.getBoundingClientRect() || {width: 800, height: 600};
  var rt = window.devicePixelRatio || 2;
  world.resizeHandler(rect.width, rect.height, rt);
}

function init(levelInfo) {
  world = new World(levelInfo);
	level = new Level(levelInfo, world);
  window.world = world;
	window.level = level;
  
  canvas = world.renderer.domElement;
  dispbox = document.getElementById("dispbox");
  dispbox.appendChild(canvas);
	
	uiManager = new UIManager(levelInfo, level, world);
  
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
else {
	alert()
}
