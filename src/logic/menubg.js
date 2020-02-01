//import * as THREE from "./modules/three.module.js";
import { Water } from '../objects/Water.js';
import { Lilypad } from '../objects/lilypad.js';

function MenuBackground() {

  var params = {
    color: '#ffffff',
    scale: 4,
    flowX: 1,
    flowY: 1
  };

  function addLilies(object) {
    this.lilypad = object;
    this.lilypads.push(object);

    var s = 2;
    object.scale.x = s;
    object.scale.y = s;
    object.scale.z = s;
    object.rotation.y = Math.PI * 0.34;
    var lp = this.lilypads[0];
    lp.position.y = 1.1;

    for (var o of this.lilypads) this.scene.add(o);
  }

  function render(t) {

	  var delta = this.clock.getDelta();

    var y = Math.sin(this.clock.getElapsedTime() * 0.5 * Math.PI) * 0.04 + 1.05;
    for (var lp of this.lilypads)
      lp.position.y = y;
  	this.renderer.render( this.scene, this.camera );

  }

  function init() {

    //Scene

    var scene = new THREE.Scene();
    this.scene = scene;

    //Camera
    var cameraPos = [0, 12, 11];
    var cameraDir = [0, 0, -1];
    var camera = new THREE.PerspectiveCamera(20, 1.33, 0.1, 1000);
    camera.position.set(...cameraPos);
    camera.lookAt(...cameraDir);
    this.camera = camera;

    //Water Surface

    var waterGeometry = new THREE.PlaneBufferGeometry(20, 20);
    var water = new Water( waterGeometry, {
  		color: params.color,
	  	scale: params.scale,
		  flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
		  textureWidth: 1024,
	  	textureHeight: 1024
	  });
    water.position.y = 1;
  	water.rotation.x = Math.PI * - 0.5;
   	scene.add( water );

    //Rocky Ground

    var groundGeometry = new THREE.PlaneBufferGeometry( 20, 20 );
		var groundMaterial = new THREE.MeshStandardMaterial( { roughness: 0.8, metalness: 0.4, color: 0x0088ff} );
		var ground = new THREE.Mesh( groundGeometry, groundMaterial );
    this.ground = ground;
		ground.rotation.x = Math.PI * - 0.5;
		scene.add( ground );

    this.lilypads = [];

    Lilypad(addLilies.bind(this));

    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );

  	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
	  directionalLight.position.set(...cameraPos);
    directionalLight.lookAt(...cameraDir);
	  scene.add( directionalLight );

    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    var renderer = this.renderer;

  }
  function resizeHandler(w, h, r) {

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( w, h );
    this.renderer.setPixelRatio( r );

    /*this.renderer.domElement.style.width = null;
    this.renderer.domElement.style.height = null;*/

  }

  this.init = init;
  this.render = render;
  this.resizeHandler = resizeHandler;
}

export { MenuBackground };
