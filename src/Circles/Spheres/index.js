import React, { useContext } from 'react';
import { soundContext } from '../Background/index';
import { DoubleSide } from 'three';
import { MeshDistortMaterial } from '@react-three/drei';

const Spheres = ({ index }) => {
  // distance between lines
  const height = useContext(soundContext)[index] / 50;
  return (
    // centers the mesh
    <mesh position={[Math.min(0, height), 0, 0]}>
      <sphereBufferGeometry
        attach="geometry"
        args={[1, 100, 1000]}
        rotateZ={true}
      />
      <MeshDistortMaterial
        attach="material"
        // Changes how many colors there are
        // 100%=color 50%=lightness
        color={`hsl(${height * 100}, 80%, 60%)`}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Spheres;
