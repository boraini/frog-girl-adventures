import {assets} from "../logic/globals.js";

function RockTile(u, r, d, l) {
  if (!assets.RockTile) {
    const geometry = new THREE.IcosahedronGeometry(1, 2);
    console.log(geometry);
    
    const vertices = geometry.vertices;
    const sigma = 0.1;
    for (let i = 0; i < vertices.count; i++) {
      vertices[i].x += 2 * sigma * Math.random() - sigma;
      vertices[i].y += 2 * sigma * Math.random() - sigma;
      vertices[i].z += 2 * sigma * Math.random() - sigma;
    }
    geometry.verticesNeedUpdate = true;
    
    const material = new THREE.MeshStandardMaterial({color: 0x888888});
    assets.RockTile = new THREE.InstancedMesh(geometry, material, 32);
  }
  return assets.RockTile;
}

export {RockTile};
