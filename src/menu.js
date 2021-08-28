import { MenuBackground } from "./logic/menubg.js";
import { enterMainMenu, goToPage, } from "./logic/menufg.js";
import { LevelSelector } from "./logic/levelselector.js";

var bg = new MenuBackground();
window.bg = bg;
var bgelem;
var dispbox = document.getElementById("display");
var levels = new LevelSelector(document.getElementById("levels"), bg);
var animationSuccessful;
console.log(dispbox);

var NUMBEROFLEVELS = 5;

function populateLevelOptions() {
  var levelButtonContainer = document.getElementById("levels");
  for (let n = 1; n <= NUMBEROFLEVELS; n++) {
    var el = document.createElement("a");
    el.className = "level-button";
    el.href = "/level.html#" + n;
    el.innerHTML = n;
    
    const x = Math.random() * 150 + 'px'; const y = Math.random() * 100; const z = 100 - y; if (el.style) [el.style.marginRight, el.style.marginLeft, el.style.marginTop, el.style.marginBottom] = [x, x, y + 'px', z + 'px'];
    
    levelButtonContainer.appendChild(el);
  }
}

function menusetup() {
  console.log("started loop");
  bg.init();
  bg.levelSelector = levels;
  //Run startup sequence normally
  bg.lilypad.ready(function() {animationSuccessful = true; setTimeout(enterMainMenu, 2500)});
  //Run if lilypad model refuses to load.
  setTimeout(function() {if (!animationSuccessful) enterMainMenu();}, 1000);
  bgelem = bg.renderer.domElement;
  dispbox.appendChild(bgelem);
  bgelem.className = "background";
  populateLevelOptions();
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
