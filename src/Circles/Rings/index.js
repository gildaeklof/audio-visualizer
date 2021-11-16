import React, { useContext } from 'react';
import { soundContext } from '../Background/index';
import { DoubleSide } from 'three';
import { MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';

const Rings = ({ index }) => {
  const height = useContext(soundContext)[index] / 100;
  return (
    <mesh position={[0, 0, Math.max(0, height)]}>
      <ringBufferGeometry
        attach="geometry"
        args={[index * 0.3 + 1.3, index * 0.3 + 1.2, 1000]}
      />
      <meshBasicMaterial
        attach="material"
        color={`hsl(${height * 128}, 60%, 60%)`}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Rings;
