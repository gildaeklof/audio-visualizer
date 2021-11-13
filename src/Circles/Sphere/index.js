import React, { useContext } from "react";
import { soundContext } from "../Background/index";
// import { DoubleSide } from "three";
// import {
//   MeshWobbleMaterial,
//   MeshDistortMaterial,
//   MeshReflectorMaterial,
//   OrbitControls,
// } from "@react-three/drei";

import { MeshMatcapMaterial } from "three";

const Sphere = ({ index }) => {
  // distance between lines
  const height = useContext(soundContext)[index] / 1000;
  return (
    // centers the mesh
    <mesh position={[0, 0, Math.min(0, height)]}>
      <sphereBufferGeometry attach="geometry" args={[1, 100, 100]} />
      {/* <ambientLight /> */}
      <pointLight position={[10, 20, 30]} color={0xff0000} />

      <meshStandardMaterial
        attach="material"
        // Changes how many colors there are
        // 100%=color 50%=lightness
        color={`hsl(${height * 1000}, 50%, 50%)`}
      />
    </mesh>
  );
};

export default Sphere;
