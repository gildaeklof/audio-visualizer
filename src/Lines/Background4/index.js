import React, { useRef, useState, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import Lines from '../Lines';
import { Stars } from '@react-three/drei';

const makeLines = (num) => {
  const lines = [];
  let increase = 2 / num;
  let angle = 10;

  for (let i = 0; i < num; i++) {
    let x = 30 * Math.cos(angle);
    let y = 0 * Math.cos(angle);
    let z = 0;
    let id = i > num / num ? i : num + i;
    lines.push(
      <Lines
        key={lines.length}
        position={[x, y, z]}
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
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]} {...rest}>
      <Stars
        radius={1}
        depth={50}
        count={1000}
        factor={2}
        saturation={0}
        fade
      />
      <soundContext.Provider value={soundArray}>
        {makeLines(num)}
      </soundContext.Provider>
    </mesh>
  );
};

export default Background4;
