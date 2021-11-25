import React, { useRef, useState, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import Heart from '../Heart';
import Heart2 from '../Heart/index2';
import Heart3 from '../Heart/index3';
import Hearts from '../Heart/map';
import { BackSide } from 'three';
import LineZ from '../../Honeycomb/LineZ';

/* const makeHearts = (num) => {
  const hearts = [];
  for (let i = 0; i < num; i++) {
    hearts.push(<Heart key={hearts.length} index={hearts.length} />);
  }
  return hearts;
}; */

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
      {/* <sphereBufferGeometry attach="geometry" args={[10000]} />
      <meshBasicMaterial
        attach="material"
        color={`hsl(0, 0%, 10%)`}
        side={BackSide}
      /> */}
      <Sky
        distance={450000}
        sunPosition={[-2, 0.1, 0]}
        inclination={0}
        azimuth={0.25}
      />
      <soundContext.Provider value={soundArray}>
        <Heart />
        <LineZ />
        {/* <Heart2 />
        <Heart3 />
        <Hearts /> */}
        {/* {makeHearts(num)} */}
        {/* <Sphere /> */}
      </soundContext.Provider>
    </mesh>
  );
};

export default Background3;
