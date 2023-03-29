import { MenuBackground } from "./logic/menubg.js";
import { enterMainMenu, goToPage, } from "./logic/menufg.js";
import { LevelSelector } from "./logic/levelselector.js";
import { getStoryModeLevels } from "./logic/level-loader.js";

var bg = new MenuBackground();
var bgelem;
var dispbox = document.getElementById("display");
var levels = new LevelSelector(document.getElementById("levels"), bg);
var animationSuccessful;
var NUMBEROFLEVELS = 5;

function populateLevelOptions(list) {
	NUMBEROFLEVELS = list.length;
	var levelButtonContainer = document.getElementById("levels");
	for (let n = 1; n <= NUMBEROFLEVELS; n++) {
		var el = document.createElement("a");
		el.className = "level-button";
		el.href = "level.html#" + list[n - 1];
		el.innerHTML = n;
    
		const x = Math.random() * 40 + "px";
		const y = Math.random() * 40;
		[el.style.marginRight, el.style.marginLeft, el.style.marginTop, el.style.marginBottom] = [x, x, y + "px", y + "px"];
    
		levelButtonContainer.appendChild(el);
	}
}

function menusetup() {
	console.log("started loop");
	bg.init();
	bg.levelSelector = levels;
	//Run startup sequence normally
	bg.lilypad.ready(function() {animationSuccessful = true; setTimeout(enterMainMenu, 2500);});
	//Run if lilypad model refuses to load.
	setTimeout(function() {if (!animationSuccessful) enterMainMenu();}, 1000);
	bgelem = bg.renderer.domElement;
	dispbox.insertBefore(bgelem, dispbox.children[0]);
	bgelem.className = "background";
	getStoryModeLevels().then(populateLevelOptions);
	windowResizeHandler();
	requestAnimationFrame(menuloop);
}

var lastt = 0;

function menuloop(t = 0) {
	//throttle menu render at ~30fps
	if (t - lastt > 33) {
		bg.render();
		lastt = t;
	}
	requestAnimationFrame(menuloop);
}

function windowResizeHandler() {
	var rect = dispbox.getBoundingClientRect() || {width: 800, height: 600};
	var rt = window.devicePixelRatio || 2;
	bg.resizeHandler(rect.width, rect.height, rt);
}

try {
	window.addEventListener("resize", windowResizeHandler, {passive: true});
}
catch (e) {
	window.addEventListener("resize", windowResizeHandler);
}

function menumain() {
	goToPage("main");
	menusetup();
	menuloop();
}

menumain();
