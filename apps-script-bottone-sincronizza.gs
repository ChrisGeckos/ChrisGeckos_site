/**
 * OPZIONALE - Bottone "Sincronizza foto sul sito" nel foglio Google.
 * Avvia su GitHub la sincronizzazione delle foto (la stessa del pulsante "Run workflow").
 *
 * Impostazioni: Apps Script > Impostazioni progetto > Proprietà script, aggiungi:
 *   GITHUB_TOKEN   il token creato su GitHub (vedi ISTRUZIONI)
 *   GITHUB_OWNER   il nome utente o organizzazione GitHub (es. chrisgeckos)
 *   GITHUB_REPO    il nome del repository del sito
 *   GITHUB_BRANCH  (facoltativo) ramo del sito, di solito "main"
 *
 * Se nel progetto esiste già una funzione onOpen(), non incollare quella qui sotto:
 * aggiungi dentro la tua la riga   aggiungiMenuSincronizza_();
 */

function onOpen() {
  aggiungiMenuSincronizza_();
}

function aggiungiMenuSincronizza_() {
  SpreadsheetApp.getUi()
    .createMenu('ChrisGeckos')
    .addItem('Sincronizza foto sul sito', 'sincronizzaFoto')
    .addItem('Ricarica TUTTE le foto (dopo aver sostituito una foto)', 'ricaricaTutteLeFoto')
    .addToUi();
}

function sincronizzaFoto() { avviaSincronizzazione_(false); }
function ricaricaTutteLeFoto() { avviaSincronizzazione_(true); }

function avviaSincronizzazione_(forza) {
  var p = PropertiesService.getScriptProperties();
  var token = p.getProperty('GITHUB_TOKEN'), owner = p.getProperty('GITHUB_OWNER'), repo = p.getProperty('GITHUB_REPO');
  var branch = p.getProperty('GITHUB_BRANCH') || 'main';
  var ui = SpreadsheetApp.getUi();
  if (!token || !owner || !repo) {
    ui.alert('Mancano le impostazioni GITHUB_TOKEN, GITHUB_OWNER o GITHUB_REPO (Proprietà script).');
    return;
  }
  var url = 'https://api.github.com/repos/' + owner + '/' + repo + '/actions/workflows/sync-foto.yml/dispatches';
  var res = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
    payload: JSON.stringify({ ref: branch, inputs: { forza: forza ? 'true' : 'false' } }),
    muteHttpExceptions: true
  });
  var code = res.getResponseCode();
  if (code === 204) {
    ui.alert('Sincronizzazione avviata. Le foto nuove saranno sul sito tra 2-5 minuti.');
  } else {
    ui.alert('Non è partita (codice ' + code + '). Controlla token, nome utente e repository.\n\n' + res.getContentText().slice(0, 300));
  }
}
