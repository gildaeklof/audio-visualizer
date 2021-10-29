import React, { useContext } from "react";
import { soundContext } from "../Movement/index";
import { DoubleSide } from "three";
import { MeshWobbleMaterial } from "@react-three/drei";

const Figures = ({ index }) => {
  const height = useContext(soundContext)[index] / 100;
  return (
    <mesh position={[0, 0, Math.max(0, height)]}>
      <ringBufferGeometry
        attach="geometry"
        // Line thickness
        args={[index * 0.3 + 1.3, index * 0.3 + 1.2, 2000]}
      />
      <MeshWobbleMaterial
        attach="material"
        // Changes how many colors there are
        // 100%=color 50%=lightness
        color={`hsl(${height * 128}, 100%, 50%)`}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Figures;
