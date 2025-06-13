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


export function App() {


 const handleBack = () => {

  };

  return (
    <div className="app text-center">
      <h1 className="text-2xl bg-blue-300 font-bold flex items-center py-8 pl-4">Archivio Digitale</h1>
     {/* Se nessun video è selezionato, mostra la lista */}
        <iframe
            src="http://www.ciseionline.it/2012/archivio.asp"
            title="Ribes DigiLab"
            className="w-screen h-screen border-none"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />

    </div>
  );
}

export default App;