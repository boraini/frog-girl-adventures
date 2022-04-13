import {loadLevel} from "./logic/level-loader.js";
import {World} from "./logic/level-three.js";
import {Level} from "./logic/level-logic.js";
import {UIManager} from "./logic/level-ui.js";
import {levelParameters} from "./logic/globals.js";

const levelSource = window.location.hash.substring(1);

let canvas, dispbox, world, level;

function windowResizeHandler() {
	var rect = dispbox.getBoundingClientRect() || {width: 800, height: 600};
	var rt = window.devicePixelRatio || 2;
	world.resizeHandler(rect.width, rect.height, rt);
}

function init(levelInfo) {
	levelParameters.tileSize = 8 / Math.max(levelInfo.ground.length, levelInfo.ground[0].length);
	world = new World(levelInfo);
	level = new Level(levelInfo, world);
	window.world = world;
	window.level = level;
  
	canvas = world.renderer.domElement;
	dispbox = document.getElementById("dispbox");
	dispbox.appendChild(canvas);
	
	window.uiManager = new UIManager(levelInfo, level, world);
  
	windowResizeHandler();
	addEventListener("resize", windowResizeHandler);
  
	loop();
}

function loop() {
	world.render();
	requestAnimationFrame(loop);
}

if (levelSource) {
	loadLevel(levelSource, alert).then(init);
}
else {
	alert("No level source was supplied in the URL after \"#\"!");
}
