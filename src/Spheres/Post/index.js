import React from 'react';
import { extend } from '@react-three/fiber';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
} from '@react-three/postprocessing';

extend({
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
});

export function Post() {
  return (
    <EffectComposer>
      <DepthOfField
        focusDistance={1}
        focalLength={2}
        bokehScale={1}
        height={900}
      />
      <Bloom
        luminanceThreshold={0}
        luminanceSmoothing={5}
        height={10000}
        opacity={5}
      />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
