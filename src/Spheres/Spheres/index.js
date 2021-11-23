import React, { useContext, useRef } from 'react';
import { DoubleSide } from 'three';
import { soundContext } from '../Background2/index';

const Spheres = ({ position, angle, index }) => {
  const height = useContext(soundContext)[index] / 100;
  const mesh = useRef();

  const colorMap = () => {
    let r, g, b;
    r = parseInt((Math.sin(angle - Math.PI) + 1) * 128);
    g = parseInt((Math.sin(angle - Math.PI - (4 * Math.PI) / 3) + 1) * 128);
    b = parseInt((Math.sin(angle - Math.PI - (2 * Math.PI) / 3) + 1) * 128);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <>
      <mesh position={position} ref={mesh}>
        <sphereBufferGeometry
          attach="geometry"
          args={[0.5 + height / 10, 30, 30]}
          ref={mesh}
        />
        <meshPhongMaterial
          attach="material"
          color={colorMap()}
          /* color={`hsl(${height * 128}, 80%, 60%)`} */
          side={DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Spheres;
