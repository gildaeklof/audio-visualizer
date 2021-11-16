import React, { useContext } from 'react';
import { soundContext } from '../Background/index';
import { DoubleSide } from 'three';
import { MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';

const Rings = ({ index }) => {
  // distance between lines
  const height = useContext(soundContext)[index] / 100;
  return (
    // centers the mesh
    <mesh position={[0, 0, Math.max(0, height)]}>
      <torusBufferGeometry
        attach="geometry"
        args={[
          index * 1.9,
          0.5,
          10,
          600,

          index * 7,
          0.6,
          10,
          600,
          ,
          /* index * 0.3 + 1.2 */ // index * 0.3 + 1.3,
          // index * 0.3 + 1.2 /* index * 0.3 + 1.2 */,
          100,
        ]}
        // <ringBufferGeometry
        //   attach="geometry"
        //   args={[
        //     index * 0.2 + 0.2,
        //     index * 0.2 + 0.1 /* index * 0.3 + 1.2 */,
        //     // index * 0.3 + 1.3,
        //     // index * 0.3 + 1.2 /* index * 0.3 + 1.2 */,
        //     1000,
        //   ]}
      />
      {/* <meshBasicMaterial
        attach="material"
        // Changes how many colors there are
        // 100%=color 50%=lightness
        color={`hsl(${height * 200}, 60%, 60%)`}
        side={DoubleSide}
      /> */}
      <meshPhysicalMaterial
        attach="material"
        // Changes how many colors there are
        // 100%=color 50%=lightness
        color={`hsl(${height * 100}, 50%, 20%)`}
        side={DoubleSide}
      />
      <directionalLight
        position={[0, 0, 20]}
        lookAt={[10, 20, 40]}
        color={0xff0000}
      />
    </mesh>
  );
};

export default Rings;
