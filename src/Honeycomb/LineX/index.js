import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const LineX = (props) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x += 0.01));

  return (
    <mesh {...props} ref={ref}>
      <torusBufferGeometry args={[12, 0.1, 20, 200]} />
      <meshBasicMaterial attach="material" color="teal" side={1} />
    </mesh>
  );
};

export default LineX;
