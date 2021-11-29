import React, { useContext, useRef } from 'react';
import { soundContext } from '../Background/index';

const Particles = () => {
  const height = useContext(soundContext)[15] / 90;
  const mesh = useRef();
  const colorMap = () => {
    let r, g, b;
    r = parseInt((Math.sin(height - Math.PI) + 1) * 900);
    g = parseInt((Math.sin(height - Math.PI - (4 * Math.PI) / 25) + 1) * 200);
    b = parseInt((Math.sin(height - Math.PI - (2 * Math.PI) / 25) + 1) * 400);
    return `rgb(${r}, ${g}, ${b})`;
  };
  return (
    <mesh position={[0, 0, Math.tan(0, height)]} ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[100, 50, 500]} />
      <meshPhysicalMaterial attach="material" color={colorMap()} side={1} />
    </mesh>
  );
};

export default Particles;
