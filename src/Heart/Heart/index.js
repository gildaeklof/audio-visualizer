import React, { useContext } from 'react';
import * as THREE from 'three';
import { soundContext } from '../Background3';

const Heart = () => {
  const height = useContext(soundContext)[14] / 100;
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

  return (
    <mesh position={[4, 7, Math.max(0, height * 2)]}>
      <extrudeBufferGeometry attach="geometry" args={[heartShape]} />
      <meshPhongMaterial
        attach="material"
        /* color={`hsl(${height * 10}, 100%, 55%)`} */
        color="brown"
      />
    </mesh>
  );
};

export default Heart;
