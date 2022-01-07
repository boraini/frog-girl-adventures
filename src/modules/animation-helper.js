const {
  AnimationClip,
	VectorKeyframeTrack,
	Quaternion,
	Vector3
} = THREE;

function pathAnimation(points, startQuat, speed) {
  const times = [0];
	const lp = points;
	const lpflat = [];
	const quatFlat = [startQuat.x, startQuat.y, startQuat.z, startQuat.w];
	const quatTimes = [0];
	let total = 0;
	for (let i = 0; i < lp.length - 1; i++) {
		const dur = lp[i].distanceTo(lp[i + 1]) / 5;
		total += dur;
		times.push(total);
		
		const lookQuat = quaternionLookAt(lp[i], lp[i + 1], new Vector3(0, 1, 0));
		quatFlat.push(lookQuat.x, lookQuat.y, lookQuat.z, lookQuat.w);
		quatFlat.push(lookQuat.x, lookQuat.y, lookQuat.z, lookQuat.w);
		quatTimes.push(total - dur + 0.2);
		quatTimes.push(total - 0.2);
	}
	for (let vec of lp) {
		lpflat.push(vec.x, vec.y, vec.z);
	}
	
	
	const lastEnd = lp[lp.length - 1];
	const lastStart = new Vector3(lp[lp.length - 2].x, lastEnd.y, lp[lp.length - 2].z);
	const lastQuat = quaternionLookAt(lastStart, lastEnd, new Vector3(0, 1, 0));
	quatFlat.push(lastQuat.x, lastQuat.y, lastQuat.z, lastQuat.w);
	quatTimes.push(total);
	
	//console.log(quatFlat, quatTimes);
	
	const track = new VectorKeyframeTrack(".position", times, lpflat);
	const quatTrack = new VectorKeyframeTrack(".quaternion", quatTimes, quatFlat);
	const clip = new AnimationClip("pathAnimation" + Math.random(), total, [track, quatTrack]);
	
	return [clip, lastQuat];
}

//https://github.com/mrdoob/three.js/issues/382
function quaternionLookAt(start, end, up) {
	var temp = new THREE.Matrix4()
	temp.lookAt(end, start, up);
	
	const [m00, m10, m20, m30,
	       m01, m11, m21, m31,
				 m02, m12, m22, m32,
				 m03, m13, m23, m33] = temp.elements;
	//console.log(m00, m10, m20);

	var t = m00 + m11 + m22,s,x,y,z,w;

	if (t > 0) { 
		s =  Math.sqrt(t+1)*2; 
		w = 0.25 * s;            
		x = (m21 - m12) / s;
		y = (m02 - m20) / s;
		z = (m10 - m01) / s;
	} else if ((m00 > m11) && (m00 > m22)) {
		s =  Math.sqrt(1.0 + m00 - m11 - m22)*2;
		x = s * 0.25;
		y = (m10 + m01) / s;
		z = (m02 + m20) / s;
		w = (m21 - m12) / s;
	} else if (m11 > m22) {
		s =  Math.sqrt(1.0 + m11 - m00 - m22) *2; 
		y = s * 0.25;
		x = (m10 + m01) / s;
		z = (m21 + m12) / s;
		w = (m02 - m20) / s;
	} else {
		s =  Math.sqrt(1.0 + m22 - m00 - m11) *2; 
		z = s * 0.25;
		x = (m02 + m20) / s;
		y = (m21 + m12) / s;
		w = (m10 - m01) / s;
	}
	
	//console.log(s, z, x, y, w);

	var rotation = new THREE.Quaternion(x,y,z,w);
	rotation.normalize();
	return rotation;
}

export { pathAnimation };