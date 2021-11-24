import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Stars = () => {
  let group = useRef();
  let theta = 10;
  useFrame(() => {
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.1)));
    const s = Math.cos(THREE.Math.degToRad(theta * 2));
    group.current.rotation.set(r, r, r);
    group.current.scale.set(s, s, s);
  });
  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(0.3, 15, 15);
    const mat = new THREE.MeshPhongMaterial({
      color: new THREE.Color('gold'),
    });
    const coords = new Array(200)
      .fill()
      .map(() => [
        Math.random() * 150 - 100,
        Math.random() * 150 - 100,
        Math.random() * 150 - 100,
      ]);
    return [geo, mat, coords];
  }, []);
  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
};

export default Stars;
