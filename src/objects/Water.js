import { assets } from "../logic/globals.js";
const {
	Mesh,
	RepeatWrapping,
	MeshStandardMaterial,
	TextureLoader,
  Clock
} = THREE;

class Water extends Mesh {
	constructor(geometry) {
		super(geometry);
		
		this.type = 'Water';

		var scope = this;

		var flowMap = undefined;
		if (!assets.water) {
			assets.water = (new THREE.TextureLoader()).load("./assets/textures/water/Water_1_M_Normal.jpg");
		}
		var map = assets.water;
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;

		var clock = new Clock();


		// material

		this.material = new MeshStandardMaterial( {
			roughness: 0.2, metalness: 0.7, color: 0x0088aa, normalMap: map
		} );

		function updateFlow() {

			var val = clock.getElapsedTime() * 0.1;

			scope.material.normalMap.offset.x = val;
			scope.material.normalMap.offset.y = val;
		}

		//

		this.onBeforeRender = updateFlow;
	}
}

export { Water };
