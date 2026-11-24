# Sincronizzazione automatica delle foto (Drive -> sito su GitHub)

## Come funziona
1. Carichi le foto su Drive e aggiorni il foglio, come sempre.
2. GitHub Actions (ogni ora, oppure quando premi un pulsante) legge l'elenco degli esemplari,
   scarica da Drive le foto nuove, le ridimensiona (max 1200 px), le converte in WebP e le salva nella cartella `foto/` del sito.
3. Le foto di esemplari che non sono più nell'elenco vengono tolte da `foto/`.
4. GitHub Pages ripubblica il sito. Il sito mostra le foto da `foto/`; se per un esemplare non c'è ancora la foto, la prende da Drive come prima.

Su Drive non viene modificato né cancellato nulla.

## Installazione (una sola volta)
1. Nel repository del sito carica questi file, mantenendo le cartelle:
   - `.github/workflows/sync-foto.yml`
   - `scripts/sync_foto.py`
   - `foto/manifest.json`
   - `script.js` e `disponibilita.html` aggiornati
   Nota: la cartella `.github` comincia con un punto e a volte il trascinamento non la mostra. Dal sito di GitHub usa
   "Add file > Create new file", scrivi `.github/workflows/sync-foto.yml` come nome e incolla il contenuto del file.
2. Su GitHub: Settings > Actions > General > "Workflow permissions" > scegli **Read and write permissions** > Save.
3. Scheda **Actions** > "Sincronizza foto" > **Run workflow** (pulsante verde). Dopo 1-3 minuti la cartella `foto/` si riempie
   e GitHub Pages ripubblica il sito (1-2 minuti in più).

## Uso quotidiano
- Carichi la foto su Drive (nome file = codice esemplare, come ora). Entro un'ora la foto è sul sito.
- Per averla subito: scheda Actions > "Sincronizza foto" > Run workflow (oppure il bottone nel foglio, vedi sotto).
- Più foto per esemplare: `21CF84.jpg`, `21CF84_2.jpg`... il sito mostra la prima.

## Se sostituisci una foto su Drive
- **Carichi un nuovo file** (anche con lo stesso nome): su Drive è un file diverso, con un altro ID. La sincronizzazione se ne accorge e **sostituisce** la foto nel sito (nome sul sito = codice, quindi il file `21CF84.webp` viene sovrascritto).
- **Sostituisci il contenuto dello stesso file** ("Gestisci versioni > Carica nuova versione"): l'ID su Drive non cambia e la sincronizzazione normale non se ne accorge. In questo caso lancia **Run workflow** spuntando "Ricarica e sostituisci TUTTE le foto" (o il menu del foglio "Ricarica TUTTE le foto").
- La cartella `foto/` non viene mai svuotata: si aggiungono le foto nuove, si sostituiscono quelle cambiate e si tolgono solo quelle di esemplari non più in elenco.
- La cache del browser può mostrare la foto vecchia per una decina di minuti dopo la sostituzione.

## Bottone nel foglio Google (facoltativo)
1. GitHub > Settings (del tuo profilo) > Developer settings > Personal access tokens > **Fine-grained tokens** > Generate new token.
   Repository access: solo il repository del sito. Permissions > Repository permissions > **Actions: Read and write**.
2. Nel foglio: Estensioni > Apps Script. Incolla il contenuto di `apps-script-bottone-sincronizza.gs`.
3. Impostazioni progetto > Proprietà script: aggiungi GITHUB_TOKEN (il token), GITHUB_OWNER, GITHUB_REPO (e GITHUB_BRANCH se non è `main`).
4. Ricarica il foglio: compare il menu **ChrisGeckos > Sincronizza foto sul sito**.
Il token è come una password: non metterlo nel sito né in file pubblici.

## Cose da sapere
- Le foto su Drive devono restare visibili a "chiunque abbia il link".
- Se l'archivio GitHub è pubblico e per 60 giorni non c'è alcuna attività, GitHub può sospendere le esecuzioni programmate: basta rilanciarne una a mano.
- Dopo la prima sincronizzazione, se le foto non compaiono entro qualche minuto controlla in Actions che l'esecuzione sia verde.
