import React, { useContext, useRef } from 'react';
import { DoubleSide } from 'three';
import { soundContext } from '../Background3/index';

const Shapes = ({ position, angle, index }) => {
  const height = useContext(soundContext)[index] / 100;
  const mesh = useRef();

  const colorMap = () => {
    let r, g, b;
    r = parseInt((Math.sin(angle - Math.PI) + 1) * 150);
    g = parseInt((Math.sin(angle - Math.PI - (4 * Math.PI) / 3) + 1) * 150);
    b = parseInt((Math.sin(angle - Math.PI - (2 * Math.PI) / 3) + 1) * 150);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <>
      <mesh position={position} ref={mesh}>
        <torusBufferGeometry
          attach="geometry"
          args={[height / 7, 1, 50]}
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

export default Shapes;
