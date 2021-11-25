import React, { useContext } from 'react';
import { MeshWobbleMaterial } from '@react-three/drei';
import { soundContext } from '../Background3/index';

const LineZ = (props) => {
  const height = useContext(soundContext)[14] / 50;

  return (
    <mesh {...props} position={(0, 0, 0)} rotation={[29.9, 0, 0]}>
      <torusBufferGeometry args={[100, 0.3, 40, 4000]} />
      <MeshWobbleMaterial
        attach="material"
        color="teal"
        side={1}
        factor={height / 10}
      />
    </mesh>
  );
};

export default LineZ;
