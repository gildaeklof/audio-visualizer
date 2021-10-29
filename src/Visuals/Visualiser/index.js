import React, { useEffect, useState, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Movement from "../Movement";
import "../Visualiser/visualiser.css";

function nearestPow2(aSize) {
  return Math.pow(2, Math.ceil(Math.log(aSize) / Math.log(2)));
}

const Visualiser = () => {
  const [ready, setReady] = useState(false);
  const playerOptions = useRef({
    playing: false,
    pausedAt: 0,
    playedAt: 0,
  });
  const [num, setNum] = useState(16);
  const [track, setTrack] = useState("disco");
  const audioContext = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const analyser = useRef(audioContext.current.createAnalyser());
  const currentSource = useRef(null);
  const currentBuffer = useRef(null);

  useEffect(() => {
    analyser.current.fftSize = nearestPow2(num) * 2;
  }, [num]);

  useEffect(() => {
    fetch(track + ".mp3").then((res) => {
      res.arrayBuffer().then((value) => {
        audioContext.current.decodeAudioData(value).then((audioBuffer) => {
          currentBuffer.current = audioBuffer;
          setReady(true);
        });
      });
    });
    return () => {
      if (playerOptions.current.playing) play();
      currentBuffer.current = null;
      playerOptions.current = {
        playing: false,
        pausedAt: 0,
        playedAt: 0,
      };
    };
  }, [track]);

  const play = useCallback(() => {
    if (!playerOptions.current.playing) {
      const source = audioContext.current.createBufferSource();
      source.buffer = currentBuffer.current;
      source.connect(analyser.current);
      analyser.current.connect(audioContext.current.destination);
      currentSource.current = source;
      currentSource.current.start(0, playerOptions.current.pausedAt);
      playerOptions.current.playedAt =
        audioContext.current.currentTime - playerOptions.current.pausedAt;
    } else {
      playerOptions.current.pausedAt =
        audioContext.current.currentTime - playerOptions.current.playedAt;
      currentSource.current.stop();
    }
    return (playerOptions.current.playing = !playerOptions.current.playing);
  }, []);
  return (
    <>
      <header>
        <button
          class="replay"
          onClick={() => {
            if (playerOptions.current.playing) play();
            playerOptions.current = {
              playing: false,
              pausedAt: 0,
              playedAt: 0,
            };
            play();
          }}
        >
          Replay song
        </button>
        <select
          class="songs"
          onChange={(e) => {
            setTrack(e.target.value);
          }}
        >
          <option value="disco" defaultChecked>
            Disco
          </option>
          <option value="studio">Studio</option>
          <option value="riviere">Riviere</option>
          <option value="face">Face</option>
        </select>
        <select
          class="numbers"
          onChange={(e) => {
            setNum(e.target.value);
          }}
        >
          <option value={16} defaultChecked>
            16
          </option>
          <option value={32}>32</option>
          <option value={64}>64</option>
          <option value={128}>128</option>
          <option value={256}>256</option>
        </select>
      </header>
      <Canvas
        pixelRatio={window.devicePixelRatio}
        invalidateFrameloop={false}
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
        }}
        camera={{ position: [0, -2, 3] }}
      >
        <OrbitControls /* autoRotate={true} autoRotateSpeed={5} */ />
        <ambientLight />
        <pointLight position={[0, 0, 20]} color={0xff0000} />
        <pointLight position={[-20, 0, 20]} color={0x00ff00} />
        <pointLight position={[20, 0, 20]} color={0x0000ff} />
        <directionalLight
          position={[0, 0, 20]}
          lookAt={[4, 4, 4]}
          color={0xff0000}
        />
        {ready && (
          <Movement
            num={num}
            analyser={analyser.current}
            player={playerOptions}
            play={play}
          />
        )}
      </Canvas>
    </>
  );
};

export default Visualiser;
