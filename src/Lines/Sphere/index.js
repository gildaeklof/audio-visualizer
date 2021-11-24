import React, { useContext, useRef } from 'react';
import { soundContext } from '../Background4/index';

const Sphere = () => {
  const height = useContext(soundContext)[4] / 80;

  return (
    <mesh position={[0, 0, Math.tan(0, height)]}>
      <sphereBufferGeometry attach="geometry" args={[100, 50, 500]} />
      <meshPhysicalMaterial
        attach="material"
        color={`hsl(${height * 200}, 100%, 40%)`}
        side={1}
      />
    </mesh>
  );
};

export default Sphere;
