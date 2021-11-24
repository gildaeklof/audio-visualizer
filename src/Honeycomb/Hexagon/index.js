import React, { useContext, useRef } from "react";
import { soundContext } from "../Background5";
import { DoubleSide } from "three";

const Hexagon = () => {
  const height = useContext(soundContext)[9] / 50;
  return (
    <mesh position={[0, 0, 0]}>
      <cylinderBufferGeometry
        attach="geometry"
        // args={[(height + 2.6) / 2, 2, 1, 6]}
        args={[1.5 + height * 0.3, 2, 1, 6]}
      />
      <meshPhongMaterial
        attach="material"
        color={`hsl(${height * 8}, 100%, 55%)`}
        side={DoubleSide}
      />
    </mesh>
  );
};

export default Hexagon;
