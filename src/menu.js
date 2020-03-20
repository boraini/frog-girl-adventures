var assets = {};

import { MenuBackground } from "./logic/menubg.js";
import { goToPage } from "./logic/menufg.js";

var bg = new MenuBackground();
var bgelem;
var dispbox = document.getElementById("display");
console.log(dispbox);
function enterMainMenu() {
  document.getElementById("menu-buttons").className = "enabled";
  document.getElementById("menu-main-logo").className = "enabled";
  console.log("menu open");
}
function menusetup() {
  console.log("started loop");
  bg.init();
  bg.lilypad.ready(() => setTimeout(enterMainMenu, 2500));
  bgelem = bg.renderer.domElement;
  dispbox.appendChild(bgelem);
  bgelem.className = "background";
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
