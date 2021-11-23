import React, { useRef, useState, createContext } from 'react';
import { useFrame } from '@react-three/fiber';
import { BackSide } from 'three';
import Shapes from '../Shapes';

const makeShapes = (num) => {
  const shapes = [];
  let increase = (Math.PI * 3) / num;
  let angle = Math.PI / 1;

  // Angle of shape
  for (let i = 0; i < num; i++) {
    let x = 0 * Math.cos(angle);
    let y = 0 * Math.sin(angle);
    let z = 1 * Math.sin(angle);

    let id = i < num / num ? i : num - i;
    shapes.push(
      <Shapes
        key={shapes.length}
        position={[x, y, z, 0]}
        radius={0.5}
        angle={angle}
        index={id}
      />
    );
    angle += increase;
  }
  return shapes;
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
    <mesh ref={mesh} position={[0, 0, 11]} rotation={[0, 0, 0]} {...rest}>
      <sphereBufferGeometry attach="geometry" args={[100]} />
      <meshBasicMaterial
        attach="material"
        color={`hsl(0, 0%, 10%)`}
        side={BackSide}
      />

      <soundContext.Provider value={soundArray}>
        {makeShapes(num)}
      </soundContext.Provider>
    </mesh>
  );
};

export default Background3;
