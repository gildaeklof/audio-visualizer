import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { BokehPass } from "three/examples/jsm/postprocessing/BokehPass";

extend({
  EffectComposer,
  ShaderPass,
  RenderPass,
  UnrealBloomPass,
  FilmPass,
  BokehPass,
});

export function Post() {
  const composer = useRef();
  const bloomPass = useRef();

  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(200, 200), []);

  useEffect(
    () => void composer.current.setSize(size.width, size.height),
    [size]
  );

  useFrame(() => {
    if (bloomPass.current) {
      bloomPass.current.strength = (1, 50, 50, 20, true);
    }
    composer.current.render();
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass
        ref={bloomPass}
        attachArray="passes"
        args={[aspect, 0, 0, 0]}
      />
      <filmPass attachArray="passes" args={[aspect, 50, 50, 0]} />
    </effectComposer>
  );
}
