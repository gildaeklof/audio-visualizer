import React, { useRef, useState, createContext } from "react";
import { useFrame } from "@react-three/fiber";
import Heart from "../Heart";

export const soundContext = createContext();

const Background3 = ({ num, analyser, player, play, ...rest }) => {
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
      <soundContext.Provider value={soundArray}>
        <Heart />
      </soundContext.Provider>
    </mesh>
  );
};

export default Background3;
