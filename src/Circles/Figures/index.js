import React, { useContext } from "react";
import { soundContext } from "../Background/index";
import { DoubleSide } from "three";

const Figures = ({ index }) => {
  // distance between lines
  const height = useContext(soundContext)[index] / 100;
  return (
    // centers the mesh
    <mesh position={[0, 0, Math.max(0, height)]}>
      <ringBufferGeometry
        attach="geometry"
        args={[index * 0.3 + 1.3, index * 0.3 + 1.2, 100]}
      />
      <meshBasicMaterial
        attach="material"
        // Changes how many colors there are
        // 100%=color 50%=lightness
        color={`hsl(${height * 100}, 80%, 60%)`}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Figures;
