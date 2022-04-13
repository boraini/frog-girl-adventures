const {
	AnimationClip,
	VectorKeyframeTrack,
	QuaternionKeyframeTrack,
	Quaternion,
	Vector3
} = THREE;

/**Creates a walking animation, that is, linear translation between the waypoints
 * and smooth rotations in between way segments.
 * 
 * Speed will both affect the translation and rotation speeds. It takes two seconds
 * to rotate for a speed of 1.
 * @param {Vector3[]} points the array of points
 * @param {Quaternion} startQuat rotation quaternion at the beginning
 * @param {Number} speed in (length unit in the frame of reference) / seconds
 * @returns {[clip:AnimationClip, lastQuat:Quaternion]} the animation clip and the
 * rotation quaternion that the animation finishes with
 */
function pathAnimation(points, startQuat, speed = 5) {
	const posTimes = [0];
	const pos = points;
	const posFlat = [];
	const quatFlat = [startQuat.x, startQuat.y, startQuat.z, startQuat.w];
	const quatTimes = [0];
	let total = 0;
	for (let i = 0; i < pos.length - 1; i++) {
		const dur = pos[i].distanceTo(pos[i + 1]) / speed;
		total += dur;
		posTimes.push(total);
		
		const lookQuat = quaternionLookAt(pos[i], pos[i + 1], new Vector3(0, 1, 0));
		quatFlat.push(lookQuat.x, lookQuat.y, lookQuat.z, lookQuat.w);
		quatFlat.push(lookQuat.x, lookQuat.y, lookQuat.z, lookQuat.w);
		quatTimes.push(total - dur + 1 / speed);
		quatTimes.push(total - 1 / speed);
	}
	for (let vec of pos) {
		posFlat.push(vec.x, vec.y, vec.z);
	}
	
	
	const lastEnd = pos[pos.length - 1];
	const lastStart = new Vector3(pos[pos.length - 2].x, lastEnd.y, pos[pos.length - 2].z);
	const lastQuat = quaternionLookAt(lastStart, lastEnd, new Vector3(0, 1, 0));
	quatFlat.push(lastQuat.x, lastQuat.y, lastQuat.z, lastQuat.w);
	quatTimes.push(total);
	
	const track = new VectorKeyframeTrack(".position", posTimes, posFlat);
	const quatTrack = new QuaternionKeyframeTrack(".quaternion", quatTimes, quatFlat);
	const clip = new AnimationClip("pathAnimation" + Math.random(), total, [track, quatTrack]);
	
	return [clip, lastQuat];
}

//https://github.com/mrdoob/three.js/issues/382
function quaternionLookAt(start, end, up) {
	var temp = new THREE.Matrix4();
	temp.lookAt(end, start, up);
	
	//this code, for some reason, doesn't work without the unused variables below.
	const [
		m00, m10, m20, m30,		// eslint-disable-line no-unused-vars
		m01, m11, m21, m31,		// eslint-disable-line no-unused-vars
		m02, m12, m22, m32,		// eslint-disable-line no-unused-vars
		m03, m13, m23, m33		// eslint-disable-line no-unused-vars
	] = temp.elements;

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

	var rotation = new Quaternion(x,y,z,w);
	rotation.normalize();
	return rotation;
}

export { pathAnimation };