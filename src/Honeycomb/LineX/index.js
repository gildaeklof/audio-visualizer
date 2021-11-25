import React, { useRef, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { soundContext } from '../Background5';

const LineX = (props) => {
  const height = useContext(soundContext)[14] / 50;
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x += 0.01));

  return (
    <mesh {...props} ref={ref}>
      <torusBufferGeometry
        args={[12, 0.1 + height / 10, 20 + height / 10, 200]}
      />
      <meshPhongMaterial attach="material" color="teal" side={1} />
    </mesh>
  );
};

export default LineX;
