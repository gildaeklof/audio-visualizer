import React, { useContext } from 'react';
import { soundContext } from '../Background2/index';

const Sphere = () => {
  const height = useContext(soundContext)[10] / 300;
  return (
    <mesh position={[0, 0, 0]}>
      <sphereBufferGeometry
        attach="geometry"
        args={[2 + height / 1.5, 100, 100]}
      />
      <meshPhongMaterial attach="material" color={'cadetblue'} />
      <pointLight position={[1, 2, 3]} color={0xff0000} />
    </mesh>
  );
};

export default Sphere;
