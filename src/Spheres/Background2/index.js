import React, { useRef, useState, createContext } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide } from "three";
import Spheres from "../Spheres";
import Sphere from "../Sphere";
import Stars from "../Stars";

const makeSpheres = (num) => {
  const spheres = [];
  let increase = (Math.PI * 2) / num;
  let angle = Math.PI / 2;

  for (let i = 0; i < num; i++) {
    let x = 12 * Math.cos(angle);
    let y = 12 * Math.sin(angle);

    let id = i < num / num ? i : num - i;
    spheres.push(
      <Spheres
        key={spheres.length}
        position={[x, y, 0]}
        radius={0.5}
        angle={angle}
        index={id}
      />
    );
    angle += increase;
  }
  return spheres;
};

export const soundContext = createContext();

const Background2 = ({ num, analyser, player, play, ...rest }) => {
  const mesh = useRef();
  const [soundArray, setSoundArray] = useState(() => Array(num).fill(0));

  useFrame(() => {
    if (!analyser) return;
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);
    setSoundArray(frequencyData);
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]} {...rest}>
      <sphereBufferGeometry attach="geometry" args={[100]} />
      <meshBasicMaterial
        attach="material"
        color={`hsl(0, 0%, 10%)`}
        side={BackSide}
      />

      <Stars />
      <soundContext.Provider value={soundArray}>
        {makeSpheres(num)}
        <Sphere />
      </soundContext.Provider>
    </mesh>
  );
};

export default Background2;
