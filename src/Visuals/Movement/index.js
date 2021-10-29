import React, { useRef, useState, createContext } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, BackSide } from "three";
import Figures from "../Figures";
import { MeshWobbleMaterial } from "@react-three/drei";

const makeFigures = (num) => {
  const figures = [];
  for (let i = 0; i < num; i++) {
    figures.push(
      <Figures key={`danc${figures.length}`} index={figures.length} />
    );
  }
  return figures;
};

export const soundContext = createContext();

const Movement = ({ num, analyser, player, play, ...rest }) => {
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
      <sphereBufferGeometry attach="geometry" args={[100]} />
      <meshStandardMaterial
        attach="material"
        //Changes the background
        // + 100=hue 100%=background saturation 50%=lightness
        color={`hsl(${Math.max(...soundArray) + 100}, 100%, 50%)`}
        side={BackSide}
      />
      {!player.current.playing && (
        <mesh onClick={play}>
          {/* args={[  line width, inner width, shape(3=triangle, 4=square etc)  ]} */}
          <ringBufferGeometry attach="geometry" args={[1, 0.3, 3]} />

          <meshLambertMaterial
            attach="material"
            color={`hsl(${Math.max(...soundArray)}, 100%, 50%)`}
            side={DoubleSide}
          />
        </mesh>
      )}
      {player.current.playing && (
        <group position={[0, 0, Math.max(...soundArray) / 100]} onClick={play}>
          <mesh position={[-0.3, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[0.3, 1]} />
            <MeshWobbleMaterial
              attach="material"
              color={`hsl(${Math.max(...soundArray)}, 100%, 50%)`}
              side={DoubleSide}
            />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[0.3, 1]} />
            <MeshWobbleMaterial
              attach="material"
              color={`hsl(${Math.max(...soundArray)}, 100%, 50%)`}
              side={DoubleSide}
            />
          </mesh>
        </group>
      )}
      <soundContext.Provider value={soundArray}>
        {makeFigures(num)}
      </soundContext.Provider>
    </mesh>
  );
};

export default Movement;
