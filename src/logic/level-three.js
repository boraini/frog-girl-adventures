import {RockTile} from "../objects/rock-tile.js";
import {Lilypad} from "../objects/lilypad.js";
import {Water} from '../modules/Water2.js';
import {Ground} from "../objects/ground.js";
import {OrbitControls} from "../modules/OrbitControls.js";
const tileSize = 1.6;

function World(levelInfo) {
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(20, 1.33, 0.1, 1000);
  this.renderer = new THREE.WebGLRenderer( { antialias: true } );
  this.renderer.setClearColor(0x00aaff);
  
  this.lilypads = [];
  
  this.levelCenter = [
    0.5 * tileSize * (levelInfo.ground.length - 1),
    0,
    0.5 * tileSize * (levelInfo.ground[0].length - 1)
  ];
  
  this.generateGround(levelInfo.ground);
  this.generateLilypads(levelInfo.lilypads);
  
  this.groundPlane = new Ground();
  this.scene.add(this.groundPlane);
  
  const waterGeometry = new THREE.PlaneBufferGeometry(20, 20);
  this.water = new Water( waterGeometry, {
  		color: 0x00ffcc,
	  	scale: tileSize * 0.1 * levelInfo.ground.length,
		  flowDirection: new THREE.Vector2(0.1, 0.1),
		  textureWidth: 1024,
	  	textureHeight: 1024
	  });
  this.water.position.set(this.levelCenter[0], -0.1, this.levelCenter[2]);
  this.water.rotation.x = Math.PI * - 0.5;
  this.water.scale.set(0.5, 0.5, 0.5);
  this.scene.add(this.water);
    
  var ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
  this.scene.add( ambientLight );
  
  const cd = 4;
  this.camera.position.set(
    cd * tileSize * levelInfo.ground.length,
    cd * tileSize * levelInfo.ground.length,
    cd * tileSize * levelInfo.ground[0].length
  );
  
  this.camera.lookAt(...this.levelCenter);
  //this.camera.lookAt(this.lilypads[0].position);
  this.scene.add(this.camera);
  
  this.cameraLight = new THREE.PointLight( 0xffffff, 1.2 );
  this.cameraLight.position.set(
    tileSize * levelInfo.ground.length,
    tileSize * levelInfo.ground.length,
    0
  );
  this.cameraLight.lookAt(0, 0, 0);
	this.scene.add( this.cameraLight );
    
  this.clock = new THREE.Clock();
  
  this.controls = new OrbitControls( this.camera, this.renderer.domElement );
  this.controls.target.set(...this.levelCenter);
  const b = () => {
    this.lilypads[0].bloom();
  }
  this.lilypads[0].ready(b);
}
function randomRotationY() {
  return 
}
function generateGround(tiles) {
  const rockTile = new RockTile(0, 0, 0, 0);
  let counter = 0;
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[0].length; j++) {
      if (tiles[i][j]) {
        rockTile.setMatrixAt(
          counter,
          (new THREE.Matrix4())
            .multiply((new THREE.Matrix4()).makeTranslation(tileSize * i, 0, tileSize * j))
            .multiply((new THREE.Matrix4()).makeRotationFromEuler(new THREE.Euler(0, 6 * Math.random(), 0, "XYZ")))
        );
        counter++;
      }
    }
  }
  const zero = new THREE.Matrix4();
  while (counter < 32) {
    rockTile.setMatrixAt(counter, zero);
    counter++;
  }
  rockTile.instanceMatrix.needsUpdate = true;
  
  this.scene.add(rockTile);
  this.ground = rockTile;
}

function generateLilypads(positions) {
  for (let position of positions) {
    const lilypad = new Lilypad();
    lilypad.position.set(
      tileSize * position[0],
      0,
      tileSize * position[1]
    );
    lilypad.scale.set(0.6, 0.6, 0.6);
    lilypad.rotateY(6 * Math.random());
    
    this.scene.add(lilypad);
    this.lilypads.push(lilypad);
  }
}

function render(t) {
  var delta = this.clock.getDelta();
  
  this.lilypads.forEach(l => l.mixer && l.mixer.update(delta));
  if (this.groundPlane.mixer1) {
    this.groundPlane.mixer1.update(delta);
    this.groundPlane.mixer2.update(delta);
  }
  
  this.renderer.render( this.scene, this.camera );
}

function resizeHandler(w, h, r) {
  this.camera.aspect = w / h;
  this.camera.updateProjectionMatrix();

  this.renderer.setSize( w, h );
  this.renderer.setPixelRatio( r );
}
  

World.prototype.generateGround = generateGround;
World.prototype.generateLilypads = generateLilypads;
World.prototype.render = render;
World.prototype.resizeHandler = resizeHandler;

export {World};
