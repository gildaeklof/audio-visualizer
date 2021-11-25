import React, { useContext, useRef } from 'react';
import { MeshWobbleMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { soundContext } from '../Background3/index';

const LineX = () => {
  const height = useContext(soundContext)[7] / 50;
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x += 0.003));

  return (
    <mesh ref={ref} position={(0, 0, 0)} rotation={[29.9, -10, 0]}>
      <torusBufferGeometry args={[100, 0.3, 40, 4000]} />
      <MeshWobbleMaterial
        attach="material"
        color={`hsl(${height * 70}, 80%, 60%)`}
        side={1}
        factor={height / 10}
      />
    </mesh>
  );
};

export default LineX;
