import React, { useContext } from 'react';
import { soundContext } from '../Background/index';
import { DoubleSide } from 'three';
import {
  MeshWobbleMaterial,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  OrbitControls,
} from '@react-three/drei';

const Sphere = ({ index }) => {
  // distance between lines
  const height = useContext(soundContext)[index] / 1000;
  return (
    // centers the mesh
    <mesh position={[0, 0, Math.min(0, height)]}>
      <sphereBufferGeometry attach="geometry" args={[1, 100, 100]} />
      <meshToonMaterial
        attach="material"
        // Changes how many colors there are
        // 100%=color 50%=lightness
        color={`hsl(${height * 100}, 100%, 50%)`}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Sphere;
