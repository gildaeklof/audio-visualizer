import React, { useContext } from 'react';
import * as THREE from 'three';
import { soundContext } from '../Background3';
import { DoubleSide } from 'three';
import { MeshWobbleMaterial } from '@react-three/drei';

const Heart = () => {
  const height = useContext(soundContext)[3] / 80;
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
    <mesh position={[4, 7, height * 3]}>
      <extrudeBufferGeometry attach="geometry" args={[heartShape]} />
      <meshPhongMaterial
        attach="material"
        color={`hsl(${height * 128}, 100%, 55%)`}
      />
      {/* <meshPhongMaterial
        attach="material"
        color={`hsl(${height * 50}, 80%, 20%)`}
       
        side={DoubleSide}
      /> */}
    </mesh>
  );
};

export default Heart;
