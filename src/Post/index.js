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
        focusDistance={0.1}
        focalLength={3}
        bokehScale={1}
        height={90}
      />
      <Bloom
        luminanceThreshold={0}
        luminanceSmoothing={3}
        height={1000}
        opacity={2}
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={0.1} />
    </EffectComposer>
  );
}
