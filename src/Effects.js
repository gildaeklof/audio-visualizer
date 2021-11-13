import * as THREE from "three";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
//import { mapRange } from "canvas-sketch-util/math";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
// import { useMusicStore } from "./useMusicStore";

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  UnrealBloomPass,
  FilmPass,
});

export function Effects() {
  const composer = useRef();
  const bloomPass = useRef();

  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(400, 400), []);

  useEffect(
    () => void composer.current.setSize(size.width, size.height),
    [size]
  );

  // const melody = useRef(0);

  // useEffect(
  //   () =>
  //     useMusicStore.subscribe((state) => {
  //       melody.current = state.melody;
  //     }),
  //   []
  // );

  // useFrame(() => {
  //   if (bloomPass.current && melody.current) {
  //     bloomPass.current.strength = mapRange(
  //       melody.current,
  //       0,
  //       3,
  //       1.7,
  //       1.5,

  //       true
  //     );
  //   }

  //   composer.current.render();
  // }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass
        ref={bloomPass}
        attachArray="passes"
        args={[aspect, 2, 1, 0]}
      />
      <filmPass attachArray="passes" args={[aspect, 3, 3, 0]} />
    </effectComposer>
  );
}
