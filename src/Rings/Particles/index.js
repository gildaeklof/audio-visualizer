import React, { useContext, useRef } from "react";
import { soundContext } from "../Background/index";

const Particles = ({ index }) => {
  const height = useContext(soundContext)[index] / 200;
  const mesh = useRef();
  const colorMap = () => {
    let r, g, b;
    r = parseInt((Math.sin(height - Math.PI) + 1) * 1280);
    g = parseInt((Math.sin(height - Math.PI - (4 * Math.PI) / 3) + 1) * 600);
    b = parseInt((Math.sin(height - Math.PI - (2 * Math.PI) / 3) + 1) * 100);
    return `rgb(${r}, ${g}, ${b})`;
  };
  return (
    <mesh position={[0, 0, Math.tan(0, height)]} ref={mesh}>
      <sphereBufferGeometry attach="geometry" args={[100, 50, 500]} />
      <meshPhysicalMaterial
        attach="material"
        // color={`hsl(${height * 200}, 100%, 50%)`}
        color={colorMap()}
        side={1}
      />
    </mesh>
  );
};

export default Particles;
