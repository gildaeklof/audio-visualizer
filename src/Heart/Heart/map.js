import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Hearts = () => {
  let group = useRef();
  let theta = 4;
  useFrame(() => {
    const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.1)));
    const s = Math.cos(THREE.Math.degToRad(theta * 2));
    group.current.rotation.set(r, r, r);
    group.current.scale.set(s, s, s);
  });
  const [geo, mat, coords] = useMemo(() => {
    const x = 0,
      y = 0;

    const heartShape = new THREE.Shape();

    heartShape.moveTo(x - 5, y - 5);
    heartShape.bezierCurveTo(x - 5, y - 5, x - 4, y, x, y);
    heartShape.bezierCurveTo(x + 6, y, x + 6, y - 7, x + 6, y - 7);
    heartShape.bezierCurveTo(x + 6, y - 11, x + 3, y - 15.4, x - 5, y - 19);
    heartShape.bezierCurveTo(x - 12, y - 15.4, x - 16, y - 11, x - 16, y - 7);
    heartShape.bezierCurveTo(x - 16, y - 7, x - 16, y, x - 10, y);
    heartShape.bezierCurveTo(x - 7, y, x - 5, y - 5, x - 5, y - 5);
    const geo = new THREE.ExtrudeGeometry(heartShape);
    const mat = new THREE.MeshPhongMaterial({ color: 'brown' });
    const coords = new Array(150).fill().map(() => [
      Math.random() * 800 - 200,
      Math.random() * 800 - 800,
      Math.random() * 800 - 1000,
      /* Math.random() * 150 - 100,
      Math.random() * 150 - 100,
      Math.random() * 150 - 100, */
    ]);
    return [geo, mat, coords];
  }, []);
  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh
          key={i}
          geometry={geo}
          material={mat}
          position={[p1 * 5, p2, p3]}
          rotation={[21.5, -500, -10]}
        />
      ))}
    </group>
  );
};

export default Hearts;
