import React, { useContext, useRef } from "react";
import { soundContext } from "../../Animation1/Background/index";
import { DoubleSide } from "three";
import { MeshWobbleMaterial, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Particles = ({ index }) => {
  const height = useContext(soundContext)[index] / 200;
  const mesh = useRef();
  return (
    <mesh position={[0, 0, Math.tan(0, height)]} ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[100, 50, 500]} />
      <meshPhysicalMaterial
        attach="material"
        color={`hsl(${height * 200}, 100%, 50%)`}
        side={1}
      />
    </mesh>
  );
};

export default Particles;
