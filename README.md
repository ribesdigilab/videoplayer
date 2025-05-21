Istruzioni per implementare l’app di RIBESdigilab© videoplayer in un tablet con Windows 11 in modalità chiosco
Di Federico Nigrelli

L’app videoplayer alla data attuale si trova nella repository aziendale, https://github.com/ribesdigilab/videoplayer.git
L’app videoplayer viene sviluppata per visualizzare in un interfaccia web dei file video(testati in .mp4) presenti nella cartella “videos” in fase di sviluppo. Una volta impartito il comando npm run build viene creata la carella build che andra copiata nel tablet, preferibilmente in disco locale C:.
Una volta creata la cartella build non sara piu possibile modificare l’ordine e la quantità dei video, per qualsiasi intervento ricreare una nuova build e reinserire la nuova build sul disco locale c:
Le istruzioni seguenti servono per impostare il tablet per la prima volta, successivamente sarà sufficiente copiare una nuova build nel disco locale C tramite l’account amministratore.

Tutte le seguenti istruzioni vanno eseguite sul tablet
1. Installa Node.js
Per usare http-server, devi installare Node.js anche sul tablet. Scaricalo da:
https://nodejs.org/
Scegli la versione LTS (quella consigliata).
________________________________________
2. Installa http-server
Apri Prompt dei comandi come amministratore e scrivi:
npm install -g http-server
________________________________________


3. Copia sul tablet la cartella build/
Mettila ad esempio in:
C:\ReactApp\build
Assicurati che dentro ci sia anche la sottocartella video/ con i video.
________________________________________
4. Crea uno script .bat per avviare il server
Crea un file start-server.bat con questo contenuto:
@echo off
cd C:\ReactApp\build
http-server -p 3000 -a 127.0.0.1
(Sostituisci il percorso se diverso)
________________________________________
5. Avvia il server all'accesso
  Premi Win + R, scrivi taskschd.msc e premi Invio.
Vai su “Libreria Utilità di pianificazione” → Azione → Crea attività…
Nome: Start HTTP Server
Spunta “Esegui con i privilegi più elevati”
Vai alla scheda Trigger → Nuovo → “All'avvio”
  Vai alla scheda Azioni → Nuovo → Avvia programma:
•	Programma/script: cmd.exe
•	Argomenti: /c "C:\start-server.bat"
Salva tutto



6. Imposta Accesso Assegnato
In:
Impostazioni → Account → Famiglia e altri utenti → Accesso assegnato
•	Crea (o seleziona) un account locale dedicato.
•	Seleziona Microsoft Edge come app.
•	Inserisci l’URL: http://localhost:3000
________________________________________
📌 E ora?
All'accensione, il tablet:
1.	Avvia l’account assegnato.
2.	Esegue lo script per il server.
3.	Apre Edge in modalità chiosco su http://localhost:3000.
4.	Mostra la tua app React.
5.	Esegue i video dalla cartella video.


