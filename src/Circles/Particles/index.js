import React, { useContext, useState } from 'react';
import { soundContext } from '../Background/index';
import { DoubleSide } from 'three';
import { MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';

const Particles = ({ index }) => {
  const height = useContext(soundContext)[index] / 200;
  return (
    <mesh position={[0, 0, Math.tan(0, height)]}>
      <sphereBufferGeometry attach="geometry" args={[100, 50, 500]} />
      <meshPhysicalMaterial
        attach="material"
        color={`hsl(${height * 200}, 100%, 50%)`}
        side={1}
      />
    </mesh>
  );
};

export default Particles;
