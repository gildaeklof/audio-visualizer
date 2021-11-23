import React, { useContext, useRef } from "react";
import { DoubleSide } from "three";
import { soundContext } from "../Background4/index";

const Lines = ({ position, angle, index }) => {
  const height = useContext(soundContext)[index] / 30;
  const mesh = useRef();

  return (
    <>
      <mesh position={position} ref={mesh}>
        <boxBufferGeometry
          attach="geometry"
          args={[0.5, 4 * height, 0.5]}
          ref={mesh}
        />
        <meshPhongMaterial
          attach="material"
          color={`hsl(${height * 130}, 80%, 60%)`}
          side={DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Lines;
