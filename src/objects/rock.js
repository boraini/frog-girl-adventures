import {assets} from "../logic/globals.js";

const rockGeometry = (
	function() {
		const t = ( 1 + Math.sqrt( 5 ) ) / 2;

		const vertices = [
			- 1, t, 0, 	1, t, 0, 	- 1, - t, 0, 	1, - t, 0,
			0, - 1, t, 	0, 1, t,	0, - 1, - t, 	0, 1, - t,
			t, 0, - 1, 	t, 0, 1, 	- t, 0, - 1, 	- t, 0, 1
		];

		const indices = [
			0, 11, 5, 	0, 5, 1, 	0, 1, 7, 	0, 7, 10, 	0, 10, 11,
			1, 5, 9, 	5, 11, 4,	11, 10, 2,	10, 7, 6,	7, 1, 8,
			3, 9, 4, 	3, 4, 2,	3, 2, 6,	3, 6, 8,	3, 8, 9,
			4, 9, 5, 	2, 4, 11,	6, 2, 10,	8, 6, 7,	9, 8, 1
		];
		
		const sigma = 0.1;
		const scale = 0.6;
		for (let i = 0; i < vertices.length; i++) {
			vertices[i] *= scale;
			vertices[i] += 2 * sigma * Math.random() - sigma;
		}
		
		const geometry = new THREE.BufferGeometry();
		geometry.setIndex(indices)
			.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
			.setAttribute("normal", new THREE.Float32BufferAttribute( vertices.slice(), 3 ) );
						
		return geometry;
	}
)();

const rockTileMaterial = new THREE.MeshStandardMaterial({color: 0x888888});
const boulderMaterial = new THREE.MeshStandardMaterial({color: 0x666666});

class RockTile {
	constructor() {
		if (!assets.RockTile) {
			assets.RockTile = new THREE.InstancedMesh(rockGeometry, rockTileMaterial, 32);
		}
		return assets.RockTile;
	}
}

class Boulder extends THREE.Mesh {
	static handleMatrix = new THREE.Matrix4();
	constructor() {
		super(rockGeometry, boulderMaterial);
		this.groundMatrix = Boulder.handleMatrix;
		this.handMatrix = Boulder.handleMatrix;
	}
}

export {RockTile, Boulder};
