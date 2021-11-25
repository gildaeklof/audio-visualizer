import React, { useRef, useState, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import Heart from '../Heart';
import Heart2 from '../Heart/index2';
import Heart3 from '../Heart/index3';
import Hearts from '../Heart/map';
import { BackSide } from 'three';

const makeHearts = (num) => {
  const hearts = [];
  for (let i = 0; i < num; i++) {
    hearts.push(<Heart key={hearts.length} index={hearts.length} />);
  }
  return hearts;
};

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
        {/* <Heart />
        <Heart2 />
        <Heart3 /> */}
        <Hearts />
        {/* {makeHearts(num)} */}
        {/* <Sphere /> */}
      </soundContext.Provider>
    </mesh>
  );
};

export default Background3;
