import React, { useContext, useRef } from 'react';
import { soundContext } from '../../Animation1/Background/index';
import { DoubleSide } from 'three';
import { MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Rings = ({ index }) => {
  const height = useContext(soundContext)[index] / 100;
  const mesh = useRef();

  const colorMap = () => {
    let r, g, b;
    r = parseInt((Math.sin(height - Math.PI) + 1) * 1280);
    g = parseInt((Math.sin(height - Math.PI - (4 * Math.PI) / 3) + 1) * 600);
    b = parseInt((Math.sin(height - Math.PI - (2 * Math.PI) / 3) + 1) * 100);
    return `rgb(${r}, ${g}, ${b})`;
  };
  return (
    <mesh position={[0, 0, Math.max(0, height)]} ref={mesh}>
      <ringBufferGeometry
        attach="geometry"
        args={[index * 0.3 + 1.3, index * 0.3 + 1.2, 1000]}
      />
      <MeshWobbleMaterial
        attach="material"
        /* color={`hsl(${height * 128}, 60%, 60%)`} */
        color={colorMap()}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Rings;
