import React, { useContext, useRef } from 'react';
import { DoubleSide } from 'three';
import { soundContext } from '../Background4/index';

const Lines = ({ position, angle, index }) => {
  const height = useContext(soundContext)[index] / 30;
  const mesh = useRef();

  const colorMap = () => {
    let r, g, b;
    r = parseInt((Math.sin(angle + Math.PI) + 1) * 128);
    g = parseInt((Math.sin(angle + Math.PI - (4 * Math.PI) / 3) + 1) * 128);
    b = parseInt((Math.sin(angle + Math.PI - (4 * Math.PI) / 3) + 1) * 128);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <>
      <mesh position={position} /* ref={mesh} */>
        <boxBufferGeometry
          attach="geometry"
          args={[0.5, 4 * height, 0.5]}
          ref={mesh}
        />
        <meshPhongMaterial
          attach="material"
          color={colorMap()}
          color={`hsl(${height * 130}, 80%, 60%)`}
          side={DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Lines;
