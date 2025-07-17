import React, { useState } from "react";
import "./App.css";
import avatar from "./images/avatarsample.jpg";
import avatarSarah from "./images/Avatars-03.png";
import avatarAndrea from "./images/Avatars-02.png";
import avatarElisa from "./images/Avatars-11.png";
import avatarRiccardo from "./images/Avatars-01.png";

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
    <div className="app  text-center">
      
      {!currentVideo && (
        <div className="flex flex-col justify-center items-center min-h-screen">
          {videos.map((video, index) => {
            // Valori di default
            let nome = "Contatto sconosciuto";
            let eta = "";
            let citta = "";
            let destinazione = "";
            let imgSrc = avatar;
            

            // Seleziona informazioni personalizzate
            if (video.name === "sarah") {
              nome = "Sarah";
              eta = "Data di nascita: 1996";
              citta = "Città di origine: Cervere (CN)";
              destinazione = "Paese di destinazione: Australia";
              imgSrc = avatarSarah;
            } else if (video.name === "andrea") {
              nome = "Andrea";
              eta = "Età: circa 40 anni";
              citta = "Città di origine: Torino";
              destinazione = "Paese di destinazione: Regno Unito";
              imgSrc = avatarAndrea;
            }else if (video.name === "elisa") {
              nome = "Elisa";
              eta = "Data di nascita: 1986";
              citta = "Città di origine: Gravellona Toce (VB)";
              destinazione = "Paese di destinazione: Francia";
              imgSrc = avatarElisa;
            }else if (video.name === "riccardo") {
              nome = "Riccardo";
              eta = "Data di nascita: 1994";
              citta = "Città di origine: Torino";
              destinazione = "Paese di destinazione: Belgio";
              imgSrc = avatarRiccardo;
            }

            return (
              <button
                key={index}
                onClick={() => setCurrentVideo(video.src)}
                className="flex items-center text-3xl w-full px-16 py-4 text-left text-[#fdb315] hover:bg-gray-700 transition duration-200 border-b border-gray-700"
              >
                <img
                  src={imgSrc}
                  alt="Anteprima"
                  className="w-18 h-[12rem] rounded-full mr-4 object-cover"
                />
                <div className="flex flex-col grid-cols-1">
                  <span className="text-md text-4xl break-words leading-tight">
                    {nome}
                  </span>
                  <span className="text-md text-2xl break-words leading-tight">
                    {eta}
                  </span>
                  <span className="text-md text-2xl break-words leading-tight">
                    {citta}
                  </span><span className="text-md text-2xl break-words leading-tight">
                    {destinazione}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {currentVideo && (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <video
      id="player"
      controls
      autoPlay
      className=" mt-4"
      src={currentVideo}
    />
    <button
      onClick={handleBack}
      className="bg-blue-700 text-white rounded hover:bg-gray-600 transition mt-8 px-4 py-2"
    >
      Indietro
    </button>
  </div>
)}

    </div>
  );
}

export default App;