import React, { useRef, useState, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { BackSide } from 'three';
import Rings from '../Rings';
import Particles from '../Particles';
import Sphere from '../Sphere';

const makeRings = (num) => {
  const rings = [];
  for (let i = 0; i < num; i++) {
    rings.push(<Rings key={rings.length} index={rings.length} />);
  }
  return rings;
};

const makeParticles = (num) => {
  const particles = [];
  for (let i = 10; i < num; i++) {
    particles.push(
      <Particles key={particles.length} index={particles.length} />
    );
  }
  return particles;
};

const makeSphere = (num) => {
  const sphere = [];
  for (let i = 0; i < num; i++) {
    sphere.push(<Sphere key={sphere.length} index={sphere.length} />);
  }
  return sphere;
};

export const soundContext = createContext();

const Background = ({ num, analyser, player, play, ...rest }) => {
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
      {/* args={[size of background]} */}
      <sphereBufferGeometry attach="geometry" args={[100]} />
      <meshBasicMaterial
        attach="material"
        //Changes the background
        // + 100=hue 100%=background saturation 50%=lightness
        color={`hsl(0, 0%, 10%)`}
        side={BackSide}
      />

      <soundContext.Provider value={soundArray}>
        {makeRings(num)}
        {makeParticles(num)}
        {makeSphere(num)}
      </soundContext.Provider>
    </mesh>
  );
};

export default Background;
