import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const LineY = (props) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  return (
    <mesh {...props} ref={ref} position={(0, 0, 2)}>
      <torusBufferGeometry args={[16, 0.1, 20, 6]} />
      <meshBasicMaterial attach="material" color="darkseagreen" side={1} />
    </mesh>
  );
};

export default LineY;
