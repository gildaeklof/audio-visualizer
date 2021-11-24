import React, { useRef, useState, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import Heart from '../Heart';
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
    <mesh ref={mesh} position={[0, 0, -20]} rotation={[0, 0, 0]} {...rest}>
      {/* <sphereBufferGeometry attach="geometry" args={[40, 40, 40]} />

      <meshBasicMaterial
        attach="material"
        color={`hsl( 100%, 1%)`}
        side={BackSide}
      /> */}
      <soundContext.Provider value={soundArray}>
        <Heart />
        {/* {makeHearts(num)} */}
        {/* <Sphere /> */}
      </soundContext.Provider>
    </mesh>
  );
};

export default Background3;
