import { MenuBackground } from "./menubg.js";
import { MenuForeground } from "./menufg.js";

var bg = new MenuBackground();
var bgelem;
var dispbox = document.getElementById("display");
console.log(dispbox);
function rnsetup() {
  console.log("started loop");
  bg.init();
  bgelem = bg.renderer.domElement;
  dispbox.appendChild(bgelem);
  bgelem.className = "background";
  windowResizeHandler();
  requestAnimationFrame(rnloop);
}
function rnloop() {
  bg.render();
  requestAnimationFrame(rnloop);
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

rnsetup();
rnloop();
