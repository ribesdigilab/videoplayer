import React, {useRef} from "react";
import "./App.css";

export default function App() {

    // riferimento al nodo <iframe>
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const PROXY_ORIGIN =
        process.env.REACT_APP_PROXY_ORIGIN || "";


    /** Naviga nella history dell’iframe.
     *  Se il dominio è diverso dal tuo, il browser blocca l’accesso
     *  → intercettiamo l’errore e avvisiamo l’utente. */
    const go = (delta: number) => {
        try {
            iframeRef.current?.contentWindow?.history.go(delta);
        } catch {
            alert(
                "Il sito incorporato non consente di navigare dalla pagina genitore (Same-Origin Policy)."
            );
        }
    };

    return (
        /* Colonna: header fisso in alto + iframe che riempie il resto */
        <div className="flex flex-col min-h-screen">
            <header className="bg-blue-frossasco py-8 pl-4">
                <h1 className="text-3xl font-helvetica font-bold text-left text-yellow-frossasco">
                    Archivio Digitale
                </h1>
            </header>

            <main className="relative flex-1">
                <iframe
                    ref={iframeRef}
                    src={`${PROXY_ORIGIN}/cisei/archivio.asp`}
                    title="Archivio CISei"
                    className="border-none h-screen w-screen"


            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />

                {/* Barra di navigazione sovrapposta */}
                <div className="absolute bottom-4 inset-x-0 flex justify-center gap-6">
                    <button
                        onClick={() => go(-1)}
                        className="px-6 py-2 bg-blue-frossasco text-white rounded-lg shadow hover:brightness-110 backdrop-blur"
                    >
                        ← Indietro
                    </button>
                    <button
                        onClick={() => go(1)}
                        className="px-6 py-2 bg-blue-frossasco text-white rounded-lg shadow hover:brightness-110 backdrop-blur"
                    >
                        Avanti →
                    </button>
                </div>
        </main>

    {/* Barra di navigazione */}

        </div>
    );
}
