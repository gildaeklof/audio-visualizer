import React, { useContext } from 'react';
import { soundContext } from '../DanceFloor/index';
import { DoubleSide } from 'three';
import { MeshWobbleMaterial } from '@react-three/drei';

const Dancer = ({ index }) => {
  const height = useContext(soundContext)[index] / 100;
  return (
    <mesh position={[0, 0, Math.max(0, height)]}>
      <ringBufferGeometry
        attach="geometry"
        args={[index * 0.3 + 1.3, index * 0.3 + 1.2, 2000]}
      />
      <MeshWobbleMaterial
        attach="material"
        color={`hsl(${height * 128}, 100%, 50%)`}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Dancer;
