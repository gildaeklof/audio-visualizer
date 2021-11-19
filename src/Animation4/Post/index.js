import React from "react";
import { extend } from "@react-three/fiber";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

extend({
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
});

export function Post() {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={1}
        height={900}
      />
      <Bloom
        luminanceThreshold={0}
        luminanceSmoothing={1}
        height={900}
        opacity={3}
      />
      <Noise opacity={0.1} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
