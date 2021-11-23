import React, { useEffect, useState, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Background from "../Rings/Background/index";
import Background2 from "../Spheres/Background2";
import Background4 from "../Lines/Background4";
// import { Post } from "../Post/index";

function nearestPow2(aSize) {
  return Math.pow(2, Math.ceil(Math.log(aSize) / Math.log(2)));
}

const Visualizer = () => {
  const playerOptions = useRef({
    playing: false,
    pausedAt: 0,
    playedAt: 0,
  });
  const [num, setNum] = useState(16);
  const [track, setTrack] = useState("disco");
  const [background, setBackground] = useState("rings");
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

  const [visible, setVisible] = useState(true);

  return (
    <>
      <button className="controls" onClick={() => setVisible(!visible)}>
        {visible ? "Hide controls" : "Show controls"}
      </button>
      {visible && (
        <header>
          <button
            onClick={() => {
              if (!playerOptions.current.playing) play();
              playerOptions.current.pausedAt = {
                playing: false,
                pausedAt: 0,
                playedAt: 0,
              };
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-play"
              viewBox="1 1 12 12"
            >
              <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
            </svg>
          </button>
          <button
            onClick={() => {
              if (playerOptions.current.playing) play();
              playerOptions.current = {
                playing: false,
                pausedAt: 0,
                playedAt: 0,
              };
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-pause"
              viewBox="2 1 12 12"
            >
              <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
            </svg>
          </button>

          <select
            onChange={(e) => {
              setTrack(e.target.value);
            }}
          >
            <option value="disco" defaultChecked>
              Disco
            </option>
            <option value="riviere">Riviere</option>
            <option value="orchid">Orchid</option>
            <option value="cover">Cover</option>
          </select>
          <select
            onChange={(e) => {
              setNum(e.target.value);
            }}
          >
            <option value={16} defaultChecked>
              16
            </option>
            <option value={20}>20</option>
            <option value={24}>24</option>
            <option value={28}>28</option>
            <option value={32}>32</option>
          </select>
          <select
            onChange={(e) => {
              setBackground(e.target.value);
            }}
          >
            <option value="rings" defaultChecked>
              Rings
            </option>
            <option value="spheres">Spheres</option>
            <option value="lines">Lines</option>
          </select>
        </header>
      )}

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
        camera={{ position: [0, 0, 10] }}
      >
        <ambientLight />
        <pointLight position={[0, 0, 20]} color={0xff0000} />
        <pointLight position={[-20, 0, 20]} color={0x00ff00} />
        <pointLight position={[20, 0, 20]} color={0x0000ff} />
        <directionalLight
          position={[0, 0, 20]}
          lookAt={[4, 4, 4]}
          color={0xff0000}
        />
        {background === "rings" && (
          <>
            <OrbitControls maxDistance={80} />
            <Background
              num={num}
              analyser={analyser.current}
              player={playerOptions}
              play={play}
            />
          </>
        )}
        {background === "spheres" && (
          <>
            <OrbitControls
              maxDistance={80}
              autoRotate={true}
              autoRotateSpeed={0.7}
            />
            <Background2
              num={num}
              analyser={analyser.current}
              player={playerOptions}
              play={play}
            />
          </>
        )}
        {background === "lines" && (
          <>
            <OrbitControls maxDistance={80} />
            <Background4
              num={num}
              analyser={analyser.current}
              player={playerOptions}
              play={play}
            />
          </>
        )}
        {/* <Post /> */}
      </Canvas>
    </>
  );
};

export default Visualizer;
