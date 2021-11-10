import React, { useContext } from 'react';
import { soundContext } from '../Background/index';
import { DoubleSide } from 'three';
import {
  MeshWobbleMaterial,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  OrbitControls,
} from '@react-three/drei';

const Spheres = ({ index }) => {
  // distance between lines
  const height = useContext(soundContext)[index] / 150;
  return (
    // centers the mesh
    <mesh position={[0, 0, Math.min(0, height)]}>
      <sphereBufferGeometry attach="geometry" args={[100, 50, 100]} />
      <meshToonMaterial
        attach="material"
        // Changes how many colors there are
        // 100%=color 50%=lightness
        color={`hsl(${height * 200}, 100%, 50%)`}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Spheres;