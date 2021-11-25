import React, { useRef, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { soundContext } from '../Background5';

const LineY = (props) => {
  const height = useContext(soundContext)[14] / 50;
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  return (
    <mesh {...props} ref={ref} position={(0, 0, 2)}>
      <torusBufferGeometry
        args={[16, 0.1 + height / 20, 20 + height / 20, 6]}
      />
      <meshPhongMaterial attach="material" color="darkseagreen" side={1} />
    </mesh>
  );
};

export default LineY;
