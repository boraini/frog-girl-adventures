const {
	Mesh,
	RepeatWrapping,
	MeshStandardMaterial,
	TextureLoader,
  Clock
} = THREE;

var Water = function ( geometry, options ) {

	Mesh.call( this, geometry );

	this.type = 'Water';

	var scope = this;

	var textureLoader = new TextureLoader();

	var flowMap = options.flowMap || undefined;
	var map = options.normalMap0 || textureLoader.load( '/assets/textures/water/Water_1_M_Normal.jpg' );
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

};

Water.prototype = Object.create( Mesh.prototype );
Water.prototype.constructor = Water;

export { Water };
