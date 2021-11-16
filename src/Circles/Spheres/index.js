import React, { useRef } from 'react';
import { DoubleSide } from 'three';

const Spheres = (props) => {
  const mesh = useRef();
  const colorMap = () => {
    let r, g, b;
    r = parseInt((Math.sin(props.angle - Math.PI) + 1) * 128);
    g = parseInt(
      (Math.sin(props.angle - Math.PI - (4 * Math.PI) / 3) + 1) * 128
    );
    b = parseInt(
      (Math.sin(props.angle - Math.PI - (2 * Math.PI) / 3) + 1) * 128
    );
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <mesh position={props.position} ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[0.5, 20, 20]} />
      <meshPhongMaterial
        attach="material"
        color={colorMap()}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Spheres;
