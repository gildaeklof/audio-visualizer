import React, { useRef, useState, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import Heart from '../Heart';
import LineZ from '../LineZ';

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
      <Sky
        distance={450000}
        sunPosition={[-2, 0.1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <soundContext.Provider value={soundArray}>
        <Heart />
        <LineZ />
      </soundContext.Provider>
    </mesh>
  );
};

export default Background3;
