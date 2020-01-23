//import  {MeshStandardMaterial} from "../modules/three.module.js";
const MeshStandardMaterial = THREE.MeshStandardMaterial;
import { GLTFLoader } from "../modules/GLTFLoader.js";

function Lilypad(callback) {
  var loader = new GLTFLoader();
  loader.load("../../assets/models/lilypad.glb", loaded.bind(null, callback), null, console.error);
}

function loaded(callback, imported) {
  var interest;
  for (var obj of imported.scene.children) {
    if (obj.type == "Mesh") {
      interest = obj;
      break;
    }
  }
  if (!interest) return;
  interest.material = new MeshStandardMaterial( {
    roughness: 0.8, metalness: 0.4, color: 0x006633
  } );
  callback(interest);
}

export { Lilypad }
