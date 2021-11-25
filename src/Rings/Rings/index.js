import React, { useContext, useRef } from 'react';
import { soundContext } from '../Background/index';
import { DoubleSide } from 'three';
import { MeshWobbleMaterial } from '@react-three/drei';

const Rings = ({ index }) => {
  const height = useContext(soundContext)[index] / 20;
  const mesh = useRef();

  const colorMap = () => {
    let r, g, b;
    r = parseInt((Math.sin(height - Math.PI) + 1) * 1280);
    g = parseInt((Math.sin(height - Math.PI - (4 * Math.PI) / 3) + 1) * 600);
    b = parseInt((Math.sin(height - Math.PI - (2 * Math.PI) / 3) + 1) * 100);
    return `rgb(${r}, ${g}, ${b})`;
  };
  return (
    <mesh position={[0, 0, 0]} ref={mesh}>
      <ringBufferGeometry
        attach="geometry"
        args={[index * 0.9 + 2.9, index * 0.9 + 3.1, 1000]}
      />
      <MeshWobbleMaterial
        attach="material"
        factor={height / 2}
        color={colorMap()}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Rings;
