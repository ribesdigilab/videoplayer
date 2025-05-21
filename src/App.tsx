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

 const handleBack = () => {
    setCurrentVideo(null);
  };

  return (
    <div className="app text-center">
      <h1 className="text-2xl bg-blue-300 font-bold flex items-center py-8 pl-4">Video Jukebox</h1>
     {/* Se nessun video è selezionato, mostra la lista */}
      {!currentVideo && (
        <div className=" grid grid-cols-2 justify-center gap-4 px-16 pt-8">
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideo(video.src)}
              className="bg-blue-700 text-white rounded hover:bg-gray-600 text-center text-sm transition "
            >
              <span className="break-words leading-tight">
                {video.name}
              </span>
            </button>
          ))}
        </div>
      )}


      {currentVideo && (
        <div className="mt-6">
          <video
            id="player"
            controls
            autoPlay
            style={{ maxWidth: "90vw", maxHeight: "60vh" }}
            src={currentVideo}
          />
          <div className="mt-4">
            <button
              onClick={handleBack}
              className="bg-blue-700 text-white rounded hover:bg-gray-600 transition "
            >
              Indietro
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;