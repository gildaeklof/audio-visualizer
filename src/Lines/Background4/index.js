import React, { useRef, useState, createContext } from "react";
import { useFrame } from "@react-three/fiber";
import { BackSide } from "three";
import Lines from "../Lines";

const makeLines = (num) => {
  const lines = [];
  let increase = 1.5 / num;
  let angle = 10;

  for (let i = 0; i < num; i++) {
    let x = 30 * Math.cos(angle);
    let y = 0 * Math.cos(angle);
    let id = i < num / num ? i : num - i;
    lines.push(
      <Lines
        key={lines.length}
        position={[x, y, 0]}
        radius={0.5}
        angle={angle}
        index={id}
      />
    );
    angle += increase;
  }
  return lines;
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
    <mesh ref={mesh} position={[7, 0, -20]} rotation={[0, 0, 0]} {...rest}>
      <sphereBufferGeometry attach="geometry" args={[40, 40, 40]} />

      <meshBasicMaterial
        attach="material"
        color={`hsl(000, 100%, 1%)`}
        side={BackSide}
      />

      <soundContext.Provider value={soundArray}>
        {makeLines(num)}
      </soundContext.Provider>
    </mesh>
  );
};

export default Background4;
