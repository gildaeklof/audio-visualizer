import React, { useContext, useRef } from 'react';
import { DoubleSide } from 'three';
import { useFrame } from '@react-three/fiber';
import { soundContext } from '../Background/index';
import { MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';

const Spheres = ({ position, index }) => {
  const height = useContext(soundContext)[index] / 100;
  const mesh = useRef();
  /* useFrame(({ clock }) => {
    const a = Math.sin(clock.getElapsedTime());
    mesh.current.rotation.y = a;
  }); */
  /* const colorMap = () => {
    let r, g, b;
    r = parseInt((Math.sin(props.angle - Math.PI) + 1) * 128);
    g = parseInt(
      (Math.sin(props.angle - Math.PI - (4 * Math.PI) / 3) + 1) * 128
    );
    b = parseInt(
      (Math.sin(props.angle - Math.PI - (2 * Math.PI) / 3) + 1) * 128
    );
    return `rgb(${r}, ${g}, ${b})`;
  }; */

  return (
    <mesh position={position} ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[0.5, 20, 20]} />
      <meshBasicMaterial
        attach="material"
        /* color={colorMap()} */
        color={`hsl(${height * 128}, 80%, 60%)`}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Spheres;
