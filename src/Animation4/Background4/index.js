import React, { useRef, useState, createContext } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide } from "three";
import Spheres from "../Spheres";

const makeSpheres = (num) => {
  const spheres = [];
  let increase = 1.5 / num;
  let angle = 1;

  for (let i = 0; i < num; i++) {
    let x = 30 * Math.cos(angle);
    let y = 0 * Math.cos(angle);
    let id = i < num / num ? i : num - i;
    spheres.push(
      <Spheres
        key={spheres.length}
        position={[x, y, 0]}
        radius={0.5}
        angle={angle}
        /* id={id} */
        index={id}
      />
    );
    angle += increase;
  }
  return spheres;
};

export const soundContext = createContext();

const Background4 = ({ num, analyser, player, play, ...rest }) => {
  const mesh = useRef();
  const [soundArray, setSoundArray] = useState(() => Array(num).fill(0));

  useFrame(() => {
    if (!analyser) return;
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);
    setSoundArray(frequencyData);
  });

  return (
    <mesh ref={mesh} position={[2, 0, -10]} rotation={[0, 0, 0]} {...rest}>
      <sphereBufferGeometry attach="geometry" args={[100]} />
      <meshBasicMaterial
        attach="material"
        color={`hsl(0, 0%, 10%)`}
        side={BackSide}
      />

      <soundContext.Provider value={soundArray}>
        {makeSpheres(num)}
      </soundContext.Provider>
    </mesh>
  );
};

export default Background4;
