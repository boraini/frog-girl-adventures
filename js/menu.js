!function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([,function(e,t,r){"use strict";r.r(t);const{Mesh:a,RepeatWrapping:n,MeshStandardMaterial:s,TextureLoader:i,Clock:o}=THREE;var l=function(e,t){a.call(this,e),this.type="Water";var r=this,n=new i,l=(t.flowMap,t.normalMap0||n.load("/assets/textures/water/Water_1_M_Normal.jpg"));l.wrapS=THREE.RepeatWrapping,l.wrapT=THREE.RepeatWrapping;var p=new o;this.material=new s({roughness:.2,metalness:.7,color:34986,normalMap:l}),this.onBeforeRender=function(){var e=.1*p.getElapsedTime();r.material.normalMap.offset.x=e,r.material.normalMap.offset.y=e}};l.prototype=Object.create(a.prototype),l.prototype.constructor=l;const{AnimationClip:p,Bone:c,Box3:u,BufferAttribute:d,BufferGeometry:h,ClampToEdgeWrapping:m,Color:f,DirectionalLight:v,DoubleSide:g,FileLoader:M,FrontSide:T,Group:y,InterleavedBuffer:S,InterleavedBufferAttribute:R,Interpolant:E,InterpolateDiscrete:w,InterpolateLinear:x,Line:L,LineBasicMaterial:_,LineLoop:b,LineSegments:A,LinearFilter:I,LinearMipmapLinearFilter:P,LinearMipmapNearestFilter:H,Loader:O,LoaderUtils:U,Material:F,MathUtils:C,Matrix4:N,Mesh:D,MeshBasicMaterial:G,MeshStandardMaterial:B,MirroredRepeatWrapping:k,NearestFilter:j,NearestMipmapLinearFilter:K,NearestMipmapNearestFilter:V,NumberKeyframeTrack:X,Object3D:z,OrthographicCamera:W,PerspectiveCamera:Y,PointLight:q,Points:J,PointsMaterial:Q,PropertyBinding:Z,QuaternionKeyframeTrack:$,RGBAFormat:ee,RGBFormat:te,RepeatWrapping:re,Scene:ae,ShaderLib:ne,ShaderMaterial:se,Skeleton:ie,SkinnedMesh:oe,Sphere:le,SpotLight:pe,TangentSpaceNormalMap:ce,TextureLoader:ue,TriangleFanDrawMode:de,TriangleStripDrawMode:he,UniformsUtils:me,Vector2:fe,Vector3:ve,VectorKeyframeTrack:ge,VertexColors:Me,sRGBEncoding:Te}=THREE;var ye=function(){function e(e){O.call(this,e),this.dracoLoader=null,this.ddsLoader=null}function t(){var e={};return{get:function(t){return e[t]},add:function(t,r){e[t]=r},remove:function(t){delete e[t]},removeAll:function(){e={}}}}e.prototype=Object.assign(Object.create(O.prototype),{constructor:e,load:function(e,t,r,a){var n,s=this;n=""!==this.resourcePath?this.resourcePath:""!==this.path?this.path:U.extractUrlBase(e),s.manager.itemStart(e);var i=function(t){a?a(t):console.error(t),s.manager.itemError(e),s.manager.itemEnd(e)},o=new M(s.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),"use-credentials"===s.crossOrigin&&o.setWithCredentials(!0),o.load(e,(function(r){try{s.parse(r,n,(function(r){t(r),s.manager.itemEnd(e)}),i)}catch(e){i(e)}}),r,i)},setDRACOLoader:function(e){return this.dracoLoader=e,this},setDDSLoader:function(e){return this.ddsLoader=e,this},parse:function(e,t,o,l){var p,c={};if("string"==typeof e)p=e;else if(U.decodeText(new Uint8Array(e,0,4))===i){try{c[r.KHR_BINARY_GLTF]=new ye(e)}catch(e){return void(l&&l(e))}p=c[r.KHR_BINARY_GLTF].content}else p=U.decodeText(new Uint8Array(e));var u=JSON.parse(p);if(void 0===u.asset||u.asset.version[0]<2)l&&l(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));else{if(u.extensionsUsed)for(var d=0;d<u.extensionsUsed.length;++d){var h=u.extensionsUsed[d],m=u.extensionsRequired||[];switch(h){case r.KHR_LIGHTS_PUNCTUAL:c[h]=new n(u);break;case r.KHR_MATERIALS_UNLIT:c[h]=new s;break;case r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:c[h]=new Ee;break;case r.KHR_DRACO_MESH_COMPRESSION:c[h]=new Se(u,this.dracoLoader);break;case r.MSFT_TEXTURE_DDS:c[h]=new a(this.ddsLoader);break;case r.KHR_TEXTURE_TRANSFORM:c[h]=new Re;break;case r.KHR_MESH_QUANTIZATION:c[h]=new we;break;default:m.indexOf(h)>=0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}new qe(u,c,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,manager:this.manager}).parse(o,l)}}});var r={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:"KHR_materials_pbrSpecularGlossiness",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",MSFT_TEXTURE_DDS:"MSFT_texture_dds"};function a(e){if(!e)throw new Error("THREE.GLTFLoader: Attempting to load .dds texture without importing DDSLoader");this.name=r.MSFT_TEXTURE_DDS,this.ddsLoader=e}function n(e){this.name=r.KHR_LIGHTS_PUNCTUAL;var t=e.extensions&&e.extensions[r.KHR_LIGHTS_PUNCTUAL]||{};this.lightDefs=t.lights||[]}function s(){this.name=r.KHR_MATERIALS_UNLIT}n.prototype.loadLight=function(e){var t,r=this.lightDefs[e],a=new f(16777215);void 0!==r.color&&a.fromArray(r.color);var n=void 0!==r.range?r.range:0;switch(r.type){case"directional":(t=new v(a)).target.position.set(0,0,-1),t.add(t.target);break;case"point":(t=new q(a)).distance=n;break;case"spot":(t=new pe(a)).distance=n,r.spot=r.spot||{},r.spot.innerConeAngle=void 0!==r.spot.innerConeAngle?r.spot.innerConeAngle:0,r.spot.outerConeAngle=void 0!==r.spot.outerConeAngle?r.spot.outerConeAngle:Math.PI/4,t.angle=r.spot.outerConeAngle,t.penumbra=1-r.spot.innerConeAngle/r.spot.outerConeAngle,t.target.position.set(0,0,-1),t.add(t.target);break;default:throw new Error('THREE.GLTFLoader: Unexpected light type, "'+r.type+'".')}return t.position.set(0,0,0),t.decay=2,void 0!==r.intensity&&(t.intensity=r.intensity),t.name=r.name||"light_"+e,Promise.resolve(t)},s.prototype.getMaterialType=function(){return G},s.prototype.extendParams=function(e,t,r){var a=[];e.color=new f(1,1,1),e.opacity=1;var n=t.pbrMetallicRoughness;if(n){if(Array.isArray(n.baseColorFactor)){var s=n.baseColorFactor;e.color.fromArray(s),e.opacity=s[3]}void 0!==n.baseColorTexture&&a.push(r.assignTexture(e,"map",n.baseColorTexture))}return Promise.all(a)};var i="glTF",o=12,l={JSON:1313821514,BIN:5130562};function ye(e){this.name=r.KHR_BINARY_GLTF,this.content=null,this.body=null;var t=new DataView(e,0,o);if(this.header={magic:U.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==i)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");for(var a=new DataView(e,o),n=0;n<a.byteLength;){var s=a.getUint32(n,!0);n+=4;var p=a.getUint32(n,!0);if(n+=4,p===l.JSON){var c=new Uint8Array(e,o+n,s);this.content=U.decodeText(c)}else if(p===l.BIN){var u=o+n;this.body=e.slice(u,u+s)}n+=s}if(null===this.content)throw new Error("THREE.GLTFLoader: JSON content not found.")}function Se(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=r.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}function Re(){this.name=r.KHR_TEXTURE_TRANSFORM}function Ee(){return{name:r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,specularGlossinessParams:["color","map","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveIntensity","emissiveMap","bumpMap","bumpScale","normalMap","normalMapType","displacementMap","displacementScale","displacementBias","specularMap","specular","glossinessMap","glossiness","alphaMap","envMap","envMapIntensity","refractionRatio"],getMaterialType:function(){return se},extendParams:function(e,t,r){var a=t.extensions[this.name],n=ne.standard,s=me.clone(n.uniforms),i=["#ifdef USE_SPECULARMAP","\tuniform sampler2D specularMap;","#endif"].join("\n"),o=["#ifdef USE_GLOSSINESSMAP","\tuniform sampler2D glossinessMap;","#endif"].join("\n"),l=["vec3 specularFactor = specular;","#ifdef USE_SPECULARMAP","\tvec4 texelSpecular = texture2D( specularMap, vUv );","\ttexelSpecular = sRGBToLinear( texelSpecular );","\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture","\tspecularFactor *= texelSpecular.rgb;","#endif"].join("\n"),p=["float glossinessFactor = glossiness;","#ifdef USE_GLOSSINESSMAP","\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );","\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture","\tglossinessFactor *= texelGlossiness.a;","#endif"].join("\n"),c=["PhysicalMaterial material;","material.diffuseColor = diffuseColor.rgb;","vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );","float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );","material.specularRoughness = max( 1.0 - glossinessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.","material.specularRoughness += geometryRoughness;","material.specularRoughness = min( material.specularRoughness, 1.0 );","material.specularColor = specularFactor.rgb;"].join("\n"),u=n.fragmentShader.replace("uniform float roughness;","uniform vec3 specular;").replace("uniform float metalness;","uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>",i).replace("#include <metalnessmap_pars_fragment>",o).replace("#include <roughnessmap_fragment>",l).replace("#include <metalnessmap_fragment>",p).replace("#include <lights_physical_fragment>",c);delete s.roughness,delete s.metalness,delete s.roughnessMap,delete s.metalnessMap,s.specular={value:(new f).setHex(1118481)},s.glossiness={value:.5},s.specularMap={value:null},s.glossinessMap={value:null},e.vertexShader=n.vertexShader,e.fragmentShader=u,e.uniforms=s,e.defines={STANDARD:""},e.color=new f(1,1,1),e.opacity=1;var d=[];if(Array.isArray(a.diffuseFactor)){var h=a.diffuseFactor;e.color.fromArray(h),e.opacity=h[3]}if(void 0!==a.diffuseTexture&&d.push(r.assignTexture(e,"map",a.diffuseTexture)),e.emissive=new f(0,0,0),e.glossiness=void 0!==a.glossinessFactor?a.glossinessFactor:1,e.specular=new f(1,1,1),Array.isArray(a.specularFactor)&&e.specular.fromArray(a.specularFactor),void 0!==a.specularGlossinessTexture){var m=a.specularGlossinessTexture;d.push(r.assignTexture(e,"glossinessMap",m)),d.push(r.assignTexture(e,"specularMap",m))}return Promise.all(d)},createMaterial:function(e){var t=new se({defines:e.defines,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,uniforms:e.uniforms,fog:!0,lights:!0,opacity:e.opacity,transparent:e.transparent});return t.isGLTFSpecularGlossinessMaterial=!0,t.color=e.color,t.map=void 0===e.map?null:e.map,t.lightMap=null,t.lightMapIntensity=1,t.aoMap=void 0===e.aoMap?null:e.aoMap,t.aoMapIntensity=1,t.emissive=e.emissive,t.emissiveIntensity=1,t.emissiveMap=void 0===e.emissiveMap?null:e.emissiveMap,t.bumpMap=void 0===e.bumpMap?null:e.bumpMap,t.bumpScale=1,t.normalMap=void 0===e.normalMap?null:e.normalMap,t.normalMapType=ce,e.normalScale&&(t.normalScale=e.normalScale),t.displacementMap=null,t.displacementScale=1,t.displacementBias=0,t.specularMap=void 0===e.specularMap?null:e.specularMap,t.specular=e.specular,t.glossinessMap=void 0===e.glossinessMap?null:e.glossinessMap,t.glossiness=e.glossiness,t.alphaMap=null,t.envMap=void 0===e.envMap?null:e.envMap,t.envMapIntensity=1,t.refractionRatio=.98,t.extensions.derivatives=!0,t},cloneMaterial:function(e){var t=e.clone();t.isGLTFSpecularGlossinessMaterial=!0;for(var r=this.specularGlossinessParams,a=0,n=r.length;a<n;a++){var s=e[r[a]];t[r[a]]=s&&s.isColor?s.clone():s}return t},refreshUniforms:function(e,t,r,a,n){if(!0===n.isGLTFSpecularGlossinessMaterial){var s,i=n.uniforms,o=n.defines;i.opacity.value=n.opacity,i.diffuse.value.copy(n.color),i.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity),i.map.value=n.map,i.specularMap.value=n.specularMap,i.alphaMap.value=n.alphaMap,i.lightMap.value=n.lightMap,i.lightMapIntensity.value=n.lightMapIntensity,i.aoMap.value=n.aoMap,i.aoMapIntensity.value=n.aoMapIntensity,n.map?s=n.map:n.specularMap?s=n.specularMap:n.displacementMap?s=n.displacementMap:n.normalMap?s=n.normalMap:n.bumpMap?s=n.bumpMap:n.glossinessMap?s=n.glossinessMap:n.alphaMap?s=n.alphaMap:n.emissiveMap&&(s=n.emissiveMap),void 0!==s&&(s.isWebGLRenderTarget&&(s=s.texture),!0===s.matrixAutoUpdate&&s.updateMatrix(),i.uvTransform.value.copy(s.matrix)),n.envMap&&(i.envMap.value=n.envMap,i.envMapIntensity.value=n.envMapIntensity,i.flipEnvMap.value=n.envMap.isCubeTexture?-1:1,i.reflectivity.value=n.reflectivity,i.refractionRatio.value=n.refractionRatio,i.maxMipLevel.value=e.properties.get(n.envMap).__maxMipLevel),i.specular.value.copy(n.specular),i.glossiness.value=n.glossiness,i.glossinessMap.value=n.glossinessMap,i.emissiveMap.value=n.emissiveMap,i.bumpMap.value=n.bumpMap,i.normalMap.value=n.normalMap,i.displacementMap.value=n.displacementMap,i.displacementScale.value=n.displacementScale,i.displacementBias.value=n.displacementBias,null!==i.glossinessMap.value&&void 0===o.USE_GLOSSINESSMAP&&(o.USE_GLOSSINESSMAP="",o.USE_ROUGHNESSMAP=""),null===i.glossinessMap.value&&void 0!==o.USE_GLOSSINESSMAP&&(delete o.USE_GLOSSINESSMAP,delete o.USE_ROUGHNESSMAP)}}}}function we(){this.name=r.KHR_MESH_QUANTIZATION}function xe(e,t,r,a){E.call(this,e,t,r,a)}Se.prototype.decodePrimitive=function(e,t){var r=this.json,a=this.dracoLoader,n=e.extensions[this.name].bufferView,s=e.extensions[this.name].attributes,i={},o={},l={};for(var p in s){var c=Ne[p]||p.toLowerCase();i[c]=s[p]}for(p in e.attributes){c=Ne[p]||p.toLowerCase();if(void 0!==s[p]){var u=r.accessors[e.attributes[p]],d=Oe[u.componentType];l[c]=d,o[c]=!0===u.normalized}}return t.getDependency("bufferView",n).then((function(e){return new Promise((function(t){a.decodeDracoFile(e,(function(e){for(var r in e.attributes){var a=e.attributes[r],n=o[r];void 0!==n&&(a.normalized=n)}t(e)}),i,l)}))}))},Re.prototype.extendTexture=function(e,t){return e=e.clone(),void 0!==t.offset&&e.offset.fromArray(t.offset),void 0!==t.rotation&&(e.rotation=t.rotation),void 0!==t.scale&&e.repeat.fromArray(t.scale),void 0!==t.texCoord&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),e.needsUpdate=!0,e},xe.prototype=Object.create(E.prototype),xe.prototype.constructor=xe,xe.prototype.copySampleValue_=function(e){for(var t=this.resultBuffer,r=this.sampleValues,a=this.valueSize,n=e*a*3+a,s=0;s!==a;s++)t[s]=r[n+s];return t},xe.prototype.beforeStart_=xe.prototype.copySampleValue_,xe.prototype.afterEnd_=xe.prototype.copySampleValue_,xe.prototype.interpolate_=function(e,t,r,a){for(var n=this.resultBuffer,s=this.sampleValues,i=this.valueSize,o=2*i,l=3*i,p=a-t,c=(r-t)/p,u=c*c,d=u*c,h=e*l,m=h-l,f=-2*d+3*u,v=d-u,g=1-f,M=v-u+c,T=0;T!==i;T++){var y=s[m+T+i],S=s[m+T+o]*p,R=s[h+T+i],E=s[h+T]*p;n[T]=g*y+M*S+f*R+v*E}return n};var Le=0,_e=1,be=2,Ae=3,Ie=4,Pe=5,He=6,Oe={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ue={9728:j,9729:I,9984:V,9985:H,9986:K,9987:P},Fe={33071:m,33648:k,10497:re},Ce={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ne={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},De={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Ge={CUBICSPLINE:void 0,LINEAR:x,STEP:w},Be="OPAQUE",ke="MASK",je="BLEND",Ke={"image/png":ee,"image/jpeg":te};function Ve(e,t){return"string"!=typeof e||""===e?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)?e:/^data:.*,.*$/i.test(e)?e:/^blob:.*$/i.test(e)?e:t+e)}function Xe(e,t,r){for(var a in r.extensions)void 0===e[a]&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[a]=r.extensions[a])}function ze(e,t){void 0!==t.extras&&("object"==typeof t.extras?Object.assign(e.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function We(e,t){if(e.updateMorphTargets(),void 0!==t.weights)for(var r=0,a=t.weights.length;r<a;r++)e.morphTargetInfluences[r]=t.weights[r];if(t.extras&&Array.isArray(t.extras.targetNames)){var n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(r=0,a=n.length;r<a;r++)e.morphTargetDictionary[n[r]]=r}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ye(e){for(var t="",r=Object.keys(e).sort(),a=0,n=r.length;a<n;a++)t+=r[a]+":"+e[r[a]]+";";return t}function qe(e,r,a){this.json=e||{},this.extensions=r||{},this.options=a||{},this.cache=new t,this.primitiveCache={},this.textureLoader=new ue(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.fileLoader=new M(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),"use-credentials"===this.options.crossOrigin&&this.fileLoader.setWithCredentials(!0)}function Je(e,t,r){var a=t.attributes,n=[];function s(t,a){return r.getDependency("accessor",t).then((function(t){e.setAttribute(a,t)}))}for(var i in a){var o=Ne[i]||i.toLowerCase();o in e.attributes||n.push(s(a[i],o))}if(void 0!==t.indices&&!e.index){var l=r.getDependency("accessor",t.indices).then((function(t){e.setIndex(t)}));n.push(l)}return ze(e,t),function(e,t,r){var a=t.attributes,n=new u;if(void 0!==a.POSITION){var s=(h=r.json.accessors[a.POSITION]).min,i=h.max;if(void 0!==s&&void 0!==i){n.set(new ve(s[0],s[1],s[2]),new ve(i[0],i[1],i[2]));var o=t.targets;if(void 0!==o)for(var l=new ve,p=0,c=o.length;p<c;p++){var d=o[p];if(void 0!==d.POSITION){var h;s=(h=r.json.accessors[d.POSITION]).min,i=h.max;void 0!==s&&void 0!==i?(l.setX(Math.max(Math.abs(s[0]),Math.abs(i[0]))),l.setY(Math.max(Math.abs(s[1]),Math.abs(i[1]))),l.setZ(Math.max(Math.abs(s[2]),Math.abs(i[2]))),n.expandByVector(l)):console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}e.boundingBox=n;var m=new le;n.getCenter(m.center),m.radius=n.min.distanceTo(n.max)/2,e.boundingSphere=m}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}(e,t,r),Promise.all(n).then((function(){return void 0!==t.targets?function(e,t,r){for(var a=!1,n=!1,s=0,i=t.length;s<i;s++){if(void 0!==(p=t[s]).POSITION&&(a=!0),void 0!==p.NORMAL&&(n=!0),a&&n)break}if(!a&&!n)return Promise.resolve(e);var o=[],l=[];for(s=0,i=t.length;s<i;s++){var p=t[s];if(a){var c=void 0!==p.POSITION?r.getDependency("accessor",p.POSITION):e.attributes.position;o.push(c)}if(n){c=void 0!==p.NORMAL?r.getDependency("accessor",p.NORMAL):e.attributes.normal;l.push(c)}}return Promise.all([Promise.all(o),Promise.all(l)]).then((function(t){var r=t[0],s=t[1];return a&&(e.morphAttributes.position=r),n&&(e.morphAttributes.normal=s),e.morphTargetsRelative=!0,e}))}(e,t.targets,r):e}))}function Qe(e,t){var r=e.getIndex();if(null===r){var a=[],n=e.getAttribute("position");if(void 0===n)return console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e;for(var s=0;s<n.count;s++)a.push(s);e.setIndex(a),r=e.getIndex()}var i=r.count-2,o=[];if(t===de)for(s=1;s<=i;s++)o.push(r.getX(0)),o.push(r.getX(s)),o.push(r.getX(s+1));else for(s=0;s<i;s++)s%2==0?(o.push(r.getX(s)),o.push(r.getX(s+1)),o.push(r.getX(s+2))):(o.push(r.getX(s+2)),o.push(r.getX(s+1)),o.push(r.getX(s)));o.length/3!==i&&console.error("THREE.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");var l=e.clone();return l.setIndex(o),l}return qe.prototype.parse=function(e,t){var r=this,a=this.json,n=this.extensions;this.cache.removeAll(),this.markDefs(),Promise.all([this.getDependencies("scene"),this.getDependencies("animation"),this.getDependencies("camera")]).then((function(t){var s={scene:t[0][a.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:a.asset,parser:r,userData:{}};Xe(n,s,a),ze(s,a),e(s)})).catch(t)},qe.prototype.markDefs=function(){for(var e=this.json.nodes||[],t=this.json.skins||[],r=this.json.meshes||[],a={},n={},s=0,i=t.length;s<i;s++)for(var o=t[s].joints,l=0,p=o.length;l<p;l++)e[o[l]].isBone=!0;for(var c=0,u=e.length;c<u;c++){var d=e[c];void 0!==d.mesh&&(void 0===a[d.mesh]&&(a[d.mesh]=n[d.mesh]=0),a[d.mesh]++,void 0!==d.skin&&(r[d.mesh].isSkinnedMesh=!0))}this.json.meshReferences=a,this.json.meshUses=n},qe.prototype.getDependency=function(e,t){var a=e+":"+t,n=this.cache.get(a);if(!n){switch(e){case"scene":n=this.loadScene(t);break;case"node":n=this.loadNode(t);break;case"mesh":n=this.loadMesh(t);break;case"accessor":n=this.loadAccessor(t);break;case"bufferView":n=this.loadBufferView(t);break;case"buffer":n=this.loadBuffer(t);break;case"material":n=this.loadMaterial(t);break;case"texture":n=this.loadTexture(t);break;case"skin":n=this.loadSkin(t);break;case"animation":n=this.loadAnimation(t);break;case"camera":n=this.loadCamera(t);break;case"light":n=this.extensions[r.KHR_LIGHTS_PUNCTUAL].loadLight(t);break;default:throw new Error("Unknown type: "+e)}this.cache.add(a,n)}return n},qe.prototype.getDependencies=function(e){var t=this.cache.get(e);if(!t){var r=this,a=this.json[e+("mesh"===e?"es":"s")]||[];t=Promise.all(a.map((function(t,a){return r.getDependency(e,a)}))),this.cache.add(e,t)}return t},qe.prototype.loadBuffer=function(e){var t=this.json.buffers[e],a=this.fileLoader;if(t.type&&"arraybuffer"!==t.type)throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(void 0===t.uri&&0===e)return Promise.resolve(this.extensions[r.KHR_BINARY_GLTF].body);var n=this.options;return new Promise((function(e,r){a.load(Ve(t.uri,n.path),e,void 0,(function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))}))}))},qe.prototype.loadBufferView=function(e){var t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then((function(e){var r=t.byteLength||0,a=t.byteOffset||0;return e.slice(a,a+r)}))},qe.prototype.loadAccessor=function(e){var t=this,r=this.json,a=this.json.accessors[e];if(void 0===a.bufferView&&void 0===a.sparse)return Promise.resolve(null);var n=[];return void 0!==a.bufferView?n.push(this.getDependency("bufferView",a.bufferView)):n.push(null),void 0!==a.sparse&&(n.push(this.getDependency("bufferView",a.sparse.indices.bufferView)),n.push(this.getDependency("bufferView",a.sparse.values.bufferView))),Promise.all(n).then((function(e){var n,s,i=e[0],o=Ce[a.type],l=Oe[a.componentType],p=l.BYTES_PER_ELEMENT,c=p*o,u=a.byteOffset||0,h=void 0!==a.bufferView?r.bufferViews[a.bufferView].byteStride:void 0,m=!0===a.normalized;if(h&&h!==c){var f=Math.floor(u/h),v="InterleavedBuffer:"+a.bufferView+":"+a.componentType+":"+f+":"+a.count,g=t.cache.get(v);g||(n=new l(i,f*h,a.count*h/p),g=new S(n,h/p),t.cache.add(v,g)),s=new R(g,o,u%h/p,m)}else n=null===i?new l(a.count*o):new l(i,u,a.count*o),s=new d(n,o,m);if(void 0!==a.sparse){var M=Ce.SCALAR,T=Oe[a.sparse.indices.componentType],y=a.sparse.indices.byteOffset||0,E=a.sparse.values.byteOffset||0,w=new T(e[1],y,a.sparse.count*M),x=new l(e[2],E,a.sparse.count*o);null!==i&&(s=new d(s.array.slice(),s.itemSize,s.normalized));for(var L=0,_=w.length;L<_;L++){var b=w[L];if(s.setX(b,x[L*o]),o>=2&&s.setY(b,x[L*o+1]),o>=3&&s.setZ(b,x[L*o+2]),o>=4&&s.setW(b,x[L*o+3]),o>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return s}))},qe.prototype.loadTexture=function(e){var t,a=this,n=this.json,s=this.options,i=this.textureLoader,o=window.URL||window.webkitURL,l=n.textures[e],p=l.extensions||{},c=(t=p[r.MSFT_TEXTURE_DDS]?n.images[p[r.MSFT_TEXTURE_DDS].source]:n.images[l.source]).uri,u=!1;return void 0!==t.bufferView&&(c=a.getDependency("bufferView",t.bufferView).then((function(e){u=!0;var r=new Blob([e],{type:t.mimeType});return c=o.createObjectURL(r)}))),Promise.resolve(c).then((function(e){var t=s.manager.getHandler(e);return t||(t=p[r.MSFT_TEXTURE_DDS]?a.extensions[r.MSFT_TEXTURE_DDS].ddsLoader:i),new Promise((function(r,a){t.load(Ve(e,s.path),r,void 0,a)}))})).then((function(e){!0===u&&o.revokeObjectURL(c),e.flipY=!1,void 0!==l.name&&(e.name=l.name),t.mimeType in Ke&&(e.format=Ke[t.mimeType]);var r=(n.samplers||{})[l.sampler]||{};return e.magFilter=Ue[r.magFilter]||I,e.minFilter=Ue[r.minFilter]||P,e.wrapS=Fe[r.wrapS]||re,e.wrapT=Fe[r.wrapT]||re,e}))},qe.prototype.assignTexture=function(e,t,a){var n=this;return this.getDependency("texture",a.index).then((function(s){if(!s.isCompressedTexture)switch(t){case"aoMap":case"emissiveMap":case"metalnessMap":case"normalMap":case"roughnessMap":s.format=te}if(void 0===a.texCoord||0==a.texCoord||"aoMap"===t&&1==a.texCoord||console.warn("THREE.GLTFLoader: Custom UV set "+a.texCoord+" for texture "+t+" not yet supported."),n.extensions[r.KHR_TEXTURE_TRANSFORM]){var i=void 0!==a.extensions?a.extensions[r.KHR_TEXTURE_TRANSFORM]:void 0;i&&(s=n.extensions[r.KHR_TEXTURE_TRANSFORM].extendTexture(s,i))}e[t]=s}))},qe.prototype.assignFinalMaterial=function(e){var t=e.geometry,a=e.material,n=this.extensions,s=void 0!==t.attributes.tangent,i=void 0!==t.attributes.color,o=void 0===t.attributes.normal,l=!0===e.isSkinnedMesh,p=Object.keys(t.morphAttributes).length>0,c=p&&void 0!==t.morphAttributes.normal;if(e.isPoints){var u="PointsMaterial:"+a.uuid,h=this.cache.get(u);h||(h=new Q,F.prototype.copy.call(h,a),h.color.copy(a.color),h.map=a.map,h.sizeAttenuation=!1,this.cache.add(u,h)),a=h}else if(e.isLine){u="LineBasicMaterial:"+a.uuid;var m=this.cache.get(u);m||(m=new _,F.prototype.copy.call(m,a),m.color.copy(a.color),this.cache.add(u,m)),a=m}if(s||i||o||l||p){u="ClonedMaterial:"+a.uuid+":";a.isGLTFSpecularGlossinessMaterial&&(u+="specular-glossiness:"),l&&(u+="skinning:"),s&&(u+="vertex-tangents:"),i&&(u+="vertex-colors:"),o&&(u+="flat-shading:"),p&&(u+="morph-targets:"),c&&(u+="morph-normals:");var f=this.cache.get(u);f||(f=a.isGLTFSpecularGlossinessMaterial?n[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].cloneMaterial(a):a.clone(),l&&(f.skinning=!0),s&&(f.vertexTangents=!0),i&&(f.vertexColors=Me),o&&(f.flatShading=!0),p&&(f.morphTargets=!0),c&&(f.morphNormals=!0),this.cache.add(u,f)),a=f}a.aoMap&&void 0===t.attributes.uv2&&void 0!==t.attributes.uv&&t.setAttribute("uv2",new d(t.attributes.uv.array,2)),a.isGLTFSpecularGlossinessMaterial&&(e.onBeforeRender=n[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].refreshUniforms),a.normalScale&&!s&&(a.normalScale.y=-a.normalScale.y),e.material=a},qe.prototype.loadMaterial=function(e){var t,a=this.json,n=this.extensions,s=a.materials[e],i={},o=s.extensions||{},l=[];if(o[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]){var p=n[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];t=p.getMaterialType(),l.push(p.extendParams(i,s,this))}else if(o[r.KHR_MATERIALS_UNLIT]){var c=n[r.KHR_MATERIALS_UNLIT];t=c.getMaterialType(),l.push(c.extendParams(i,s,this))}else{t=B;var u=s.pbrMetallicRoughness||{};if(i.color=new f(1,1,1),i.opacity=1,Array.isArray(u.baseColorFactor)){var d=u.baseColorFactor;i.color.fromArray(d),i.opacity=d[3]}void 0!==u.baseColorTexture&&l.push(this.assignTexture(i,"map",u.baseColorTexture)),i.metalness=void 0!==u.metallicFactor?u.metallicFactor:1,i.roughness=void 0!==u.roughnessFactor?u.roughnessFactor:1,void 0!==u.metallicRoughnessTexture&&(l.push(this.assignTexture(i,"metalnessMap",u.metallicRoughnessTexture)),l.push(this.assignTexture(i,"roughnessMap",u.metallicRoughnessTexture)))}!0===s.doubleSided&&(i.side=g);var h=s.alphaMode||Be;return h===je?i.transparent=!0:(i.transparent=!1,h===ke&&(i.alphaTest=void 0!==s.alphaCutoff?s.alphaCutoff:.5)),void 0!==s.normalTexture&&t!==G&&(l.push(this.assignTexture(i,"normalMap",s.normalTexture)),i.normalScale=new fe(1,1),void 0!==s.normalTexture.scale&&i.normalScale.set(s.normalTexture.scale,s.normalTexture.scale)),void 0!==s.occlusionTexture&&t!==G&&(l.push(this.assignTexture(i,"aoMap",s.occlusionTexture)),void 0!==s.occlusionTexture.strength&&(i.aoMapIntensity=s.occlusionTexture.strength)),void 0!==s.emissiveFactor&&t!==G&&(i.emissive=(new f).fromArray(s.emissiveFactor)),void 0!==s.emissiveTexture&&t!==G&&l.push(this.assignTexture(i,"emissiveMap",s.emissiveTexture)),Promise.all(l).then((function(){var e;return e=t===se?n[r.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(i):new t(i),void 0!==s.name&&(e.name=s.name),e.map&&(e.map.encoding=Te),e.emissiveMap&&(e.emissiveMap.encoding=Te),e.specularMap&&(e.specularMap.encoding=Te),ze(e,s),s.extensions&&Xe(n,e,s),e}))},qe.prototype.loadGeometries=function(e){var t=this,a=this.extensions,n=this.primitiveCache;function s(e){return a[r.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then((function(r){return Je(r,e,t)}))}for(var i,o,l=[],p=0,c=e.length;p<c;p++){var u,d=e[p],m=(o=void 0,(o=(i=d).extensions&&i.extensions[r.KHR_DRACO_MESH_COMPRESSION])?"draco:"+o.bufferView+":"+o.indices+":"+Ye(o.attributes):i.indices+":"+Ye(i.attributes)+":"+i.mode),f=n[m];if(f)l.push(f.promise);else u=d.extensions&&d.extensions[r.KHR_DRACO_MESH_COMPRESSION]?s(d):Je(new h,d,t),n[m]={primitive:d,promise:u},l.push(u)}return Promise.all(l)},qe.prototype.loadMesh=function(e){for(var t,r=this,a=this.json.meshes[e],n=a.primitives,s=[],i=0,o=n.length;i<o;i++){var l=void 0===n[i].material?(void 0===(t=this.cache).DefaultMaterial&&(t.DefaultMaterial=new B({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:T})),t.DefaultMaterial):this.getDependency("material",n[i].material);s.push(l)}return s.push(r.loadGeometries(n)),Promise.all(s).then((function(t){for(var s=t.slice(0,t.length-1),i=t[t.length-1],o=[],l=0,p=i.length;l<p;l++){var c,u=i[l],d=n[l],h=s[l];if(d.mode===Ie||d.mode===Pe||d.mode===He||void 0===d.mode)!0!==(c=!0===a.isSkinnedMesh?new oe(u,h):new D(u,h)).isSkinnedMesh||c.geometry.attributes.skinWeight.normalized||c.normalizeSkinWeights(),d.mode===Pe?c.geometry=Qe(c.geometry,he):d.mode===He&&(c.geometry=Qe(c.geometry,de));else if(d.mode===_e)c=new A(u,h);else if(d.mode===Ae)c=new L(u,h);else if(d.mode===be)c=new b(u,h);else{if(d.mode!==Le)throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+d.mode);c=new J(u,h)}Object.keys(c.geometry.morphAttributes).length>0&&We(c,a),c.name=a.name||"mesh_"+e,i.length>1&&(c.name+="_"+l),ze(c,a),r.assignFinalMaterial(c),o.push(c)}if(1===o.length)return o[0];var m=new y;for(l=0,p=o.length;l<p;l++)m.add(o[l]);return m}))},qe.prototype.loadCamera=function(e){var t,r=this.json.cameras[e],a=r[r.type];if(a)return"perspective"===r.type?t=new Y(C.radToDeg(a.yfov),a.aspectRatio||1,a.znear||1,a.zfar||2e6):"orthographic"===r.type&&(t=new W(a.xmag/-2,a.xmag/2,a.ymag/2,a.ymag/-2,a.znear,a.zfar)),void 0!==r.name&&(t.name=r.name),ze(t,r),Promise.resolve(t);console.warn("THREE.GLTFLoader: Missing camera parameters.")},qe.prototype.loadSkin=function(e){var t=this.json.skins[e],r={joints:t.joints};return void 0===t.inverseBindMatrices?Promise.resolve(r):this.getDependency("accessor",t.inverseBindMatrices).then((function(e){return r.inverseBindMatrices=e,r}))},qe.prototype.loadAnimation=function(e){for(var t=this.json.animations[e],r=[],a=[],n=[],s=[],i=[],o=0,l=t.channels.length;o<l;o++){var c=t.channels[o],u=t.samplers[c.sampler],d=c.target,h=void 0!==d.node?d.node:d.id,m=void 0!==t.parameters?t.parameters[u.input]:u.input,f=void 0!==t.parameters?t.parameters[u.output]:u.output;r.push(this.getDependency("node",h)),a.push(this.getDependency("accessor",m)),n.push(this.getDependency("accessor",f)),s.push(u),i.push(d)}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(n),Promise.all(s),Promise.all(i)]).then((function(r){for(var a=r[0],n=r[1],s=r[2],i=r[3],o=r[4],l=[],c=0,u=a.length;c<u;c++){var d=a[c],h=n[c],m=s[c],f=i[c],v=o[c];if(void 0!==d){var g;switch(d.updateMatrix(),d.matrixAutoUpdate=!0,De[v.path]){case De.weights:g=X;break;case De.rotation:g=$;break;case De.position:case De.scale:default:g=ge}var M=d.name?d.name:d.uuid,T=void 0!==f.interpolation?Ge[f.interpolation]:x,y=[];De[v.path]===De.weights?d.traverse((function(e){!0===e.isMesh&&e.morphTargetInfluences&&y.push(e.name?e.name:e.uuid)})):y.push(M);var S=m.array;if(m.normalized){var R;if(S.constructor===Int8Array)R=1/127;else if(S.constructor===Uint8Array)R=1/255;else if(S.constructor==Int16Array)R=1/32767;else{if(S.constructor!==Uint16Array)throw new Error("THREE.GLTFLoader: Unsupported output accessor component type.");R=1/65535}for(var E=new Float32Array(S.length),w=0,L=S.length;w<L;w++)E[w]=S[w]*R;S=E}for(w=0,L=y.length;w<L;w++){var _=new g(y[w]+"."+De[v.path],h.array,S,T);"CUBICSPLINE"===f.interpolation&&(_.createInterpolant=function(e){return new xe(this.times,this.values,this.getValueSize()/3,e)},_.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),l.push(_)}}}var b=void 0!==t.name?t.name:"animation_"+e;return new p(b,void 0,l)}))},qe.prototype.loadNode=function(e){var t,a=this.json,n=this.extensions,s=this,i=a.meshReferences,o=a.meshUses,l=a.nodes[e];return(t=[],void 0!==l.mesh&&t.push(s.getDependency("mesh",l.mesh).then((function(e){var t;if(i[l.mesh]>1){var r=o[l.mesh]++;(t=e.clone()).name+="_instance_"+r,t.onBeforeRender=e.onBeforeRender;for(var a=0,n=t.children.length;a<n;a++)t.children[a].name+="_instance_"+r,t.children[a].onBeforeRender=e.children[a].onBeforeRender}else t=e;return void 0!==l.weights&&t.traverse((function(e){if(e.isMesh)for(var t=0,r=l.weights.length;t<r;t++)e.morphTargetInfluences[t]=l.weights[t]})),t}))),void 0!==l.camera&&t.push(s.getDependency("camera",l.camera)),l.extensions&&l.extensions[r.KHR_LIGHTS_PUNCTUAL]&&void 0!==l.extensions[r.KHR_LIGHTS_PUNCTUAL].light&&t.push(s.getDependency("light",l.extensions[r.KHR_LIGHTS_PUNCTUAL].light)),Promise.all(t)).then((function(e){var t;if((t=!0===l.isBone?new c:e.length>1?new y:1===e.length?e[0]:new z)!==e[0])for(var r=0,a=e.length;r<a;r++)t.add(e[r]);if(void 0!==l.name&&(t.userData.name=l.name,t.name=Z.sanitizeNodeName(l.name)),ze(t,l),l.extensions&&Xe(n,t,l),void 0!==l.matrix){var s=new N;s.fromArray(l.matrix),t.applyMatrix(s)}else void 0!==l.translation&&t.position.fromArray(l.translation),void 0!==l.rotation&&t.quaternion.fromArray(l.rotation),void 0!==l.scale&&t.scale.fromArray(l.scale);return t}))},qe.prototype.loadScene=function(){function e(t,r,a,n){var s=a.nodes[t];return n.getDependency("node",t).then((function(e){return void 0===s.skin?e:n.getDependency("skin",s.skin).then((function(e){for(var r=[],a=0,s=(t=e).joints.length;a<s;a++)r.push(n.getDependency("node",t.joints[a]));return Promise.all(r)})).then((function(r){return e.traverse((function(e){if(e.isMesh){for(var a=[],n=[],s=0,i=r.length;s<i;s++){var o=r[s];if(o){a.push(o);var l=new N;void 0!==t.inverseBindMatrices&&l.fromArray(t.inverseBindMatrices.array,16*s),n.push(l)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[s])}e.bind(new ie(a,n),e.matrixWorld)}})),e}));var t})).then((function(t){r.add(t);var i=[];if(s.children)for(var o=s.children,l=0,p=o.length;l<p;l++){var c=o[l];i.push(e(c,t,a,n))}return Promise.all(i)}))}return function(t){var r=this.json,a=this.extensions,n=this.json.scenes[t],s=new ae;void 0!==n.name&&(s.name=n.name),ze(s,n),n.extensions&&Xe(a,s,n);for(var i=n.nodes||[],o=[],l=0,p=i.length;l<p;l++)o.push(e(i[l],s,r,this));return Promise.all(o).then((function(){return s}))}}(),e}();const Se=THREE.MeshStandardMaterial;function Re(e){(new ye).load("../../assets/models/lilypad.glb",Ee.bind(null,e),null,console.error)}function Ee(e,t){var r;for(var a of t.scene.children)if("Mesh"==a.type){r=a;break}r&&(r.material=new Se({roughness:.8,metalness:.4,color:26163}),e(r))}function we(){var e={color:"#ffffff",scale:4,flowX:1,flowY:1};function t(e){this.lilypad=e,this.lilypads.push(e);e.scale.x=2,e.scale.y=2,e.scale.z=2,e.rotation.y=.34*Math.PI;var t=this.lilypads[0];for(var r of(t.position.y=1.1,this.lilypads))this.scene.add(r)}this.init=function(){var r=new THREE.Scene;this.scene=r;var a=[0,12,11],n=[0,0,-1],s=new THREE.PerspectiveCamera(20,1.33,.1,1e3);s.position.set(...a),s.lookAt(...n),this.camera=s;var i=new THREE.PlaneBufferGeometry(20,20),o=new l(i,{color:e.color,scale:e.scale,flowDirection:new THREE.Vector2(e.flowX,e.flowY),textureWidth:1024,textureHeight:1024});o.position.y=1,o.rotation.x=-.5*Math.PI,r.add(o);var p=new THREE.PlaneBufferGeometry(20,20),c=new THREE.MeshStandardMaterial({roughness:.8,metalness:.4,color:35071}),u=new THREE.Mesh(p,c);this.ground=u,u.rotation.x=-.5*Math.PI,r.add(u),this.lilypads=[],Re(t.bind(this));var d=new THREE.AmbientLight(13421772,.4);r.add(d);var h=new THREE.DirectionalLight(16777215,.6);h.position.set(...a),h.lookAt(...n),r.add(h),this.clock=new THREE.Clock,this.renderer=new THREE.WebGLRenderer({antialias:!0}),this.renderer},this.render=function(e){this.clock.getDelta();var t=.04*Math.sin(.5*this.clock.getElapsedTime()*Math.PI)+1.05;for(var r of this.lilypads)r.position.y=t;this.renderer.render(this.scene,this.camera)},this.resizeHandler=function(e,t,r){this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.renderer.setPixelRatio(r)}}window.addEventListener("load",(new we).init);var xe,Le=new we,_e=document.getElementById("display");function be(){Le.render(),requestAnimationFrame(be)}function Ae(){var e=_e.getBoundingClientRect()||{width:800,height:600},t=window.devicePixelRatio||2;Le.resizeHandler(e.width,e.height,t)}console.log(_e);try{window.addEventListener("resize",Ae,{passive:!0})}catch(e){window.addEventListener("resize",Ae)}console.log("started loop"),Le.init(),xe=Le.renderer.domElement,_e.appendChild(xe),xe.className="background",Ae(),requestAnimationFrame(be),be()}]);
//# sourceMappingURL=menu.js.map