import React, { useRef, useContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';
import { soundContext } from '../../Heart/Background3/index';

const LineZ = (props) => {
  const height = useContext(soundContext)[14] / 50;
  /* const ref = useRef();
  useFrame(() => (ref.current.rotation.z += 0.01)); */

  return (
    <mesh
      {...props}
      /* ref={ref} */ position={(0, 0, 0)}
      rotation={[29.9, 0, 0]}
    >
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
