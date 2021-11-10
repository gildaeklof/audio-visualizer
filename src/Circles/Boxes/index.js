import React, { useContext } from 'react';
import { soundContext } from '../Background/index';
import { DoubleSide } from 'three';
import {
  MeshWobbleMaterial,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  OrbitControls,
} from '@react-three/drei';

const Boxes = ({ index }) => {
  // distance between lines
  const height = useContext(soundContext)[index] / 100;
  return (
    // centers the mesh
    <mesh position={[0, 0, Math.min(0, height)]}>
      <sphereBufferGeometry attach="geometry" args={[20, 5, 200]} />
      <meshToonMaterial
        attach="material"
        // Changes how many colors there are
        // 100%=color 50%=lightness
        color={`hsl(${height * 500}, 100%, 50%)`}
        /* side={DoubleSide} */
      />
    </mesh>
  );
};

export default Boxes;
