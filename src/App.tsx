import React, { useState } from "react";
import "./App.css";

// Dichiara il tipo mancante per Webpack
interface WebpackRequire extends NodeRequire {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => {
    keys: () => string[];
    (key: string): string;
  };
}

// Estendi require con il metodo context di Webpack
const requireWithContext = require as WebpackRequire;

// Importa tutti i video da src/videos/
const importAll = (r: ReturnType<WebpackRequire["context"]>) =>
  r.keys().map((key) => ({
    src: r(key),
    name: key.replace("./", "").replace(/\.[^/.]+$/, ""),
  }));

const videos = importAll(requireWithContext.context("./videos", false, /\.(mp4)$/));

export function App() {
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const playVideo = (src: string) => {
    setCurrentVideo(src);
  };

  return (
    <div className="app text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Video Jukebox</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {videos.map((video, index) => (
          <button
            key={index}
            onClick={() => playVideo(video.src)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            {video.name}
          </button>
        ))}
      </div>

      {currentVideo && (
        <div className="mt-6">
          <video
            id="player"
            controls
            autoPlay
            style={{ maxWidth: "90vw", maxHeight: "60vh" }}
            src={currentVideo}
          />
        </div>
      )}
    </div>
  );
}

export default App;