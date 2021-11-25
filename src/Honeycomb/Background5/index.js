import React, { useRef, useState, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import Hexagon from '../Hexagon';
import LineX from '../LineX';
import LineY from '../LineY';

export const soundContext = createContext();

const Background5 = ({ num, analyser, player, play, ...rest }) => {
  const mesh = useRef();
  const [soundArray, setSoundArray] = useState(() => Array(num).fill(0));

  useFrame(() => {
    if (!analyser) return;
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(frequencyData);
    setSoundArray(frequencyData);
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[11, 0, 0]} {...rest}>
      <soundContext.Provider value={soundArray}>
        <LineX />
        <LineY />
        <group>
          <group position={[0, 0, 0]}>
            <Hexagon />
          </group>
          <group position={[3.7, 0, 0]}>
            <Hexagon />
          </group>
          <group position={[-3.7, 0, 0]}>
            <Hexagon />
          </group>
          <group position={[-3.7, 0, 6.4]}>
            <Hexagon />
          </group>
          <group position={[-1.85, 0, 3.2]}>
            <Hexagon />
          </group>
          <group position={[1.85, 0, 3.2]}>
            <Hexagon />
          </group>
          <group position={[1.85, 0, -3.2]}>
            <Hexagon />
          </group>
          <group position={[3.7, 0, -6.4]}>
            <Hexagon />
          </group>
        </group>
      </soundContext.Provider>
    </mesh>
  );
};

export default Background5;
