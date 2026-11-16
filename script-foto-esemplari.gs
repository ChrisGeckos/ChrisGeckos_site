/**
 * ChrisGeckos - esemplari disponibili + foto dalla cartella Drive
 *
 * Restituisce al sito un JSON: { ok, animali: [...], senzaFoto: [...], fotoOrfane: [...] }
 * Ogni animale ha: cod, sesso, mf, nascita, morph, note, proven, specie, prezzo, stato, foto (elenco di ID file Drive).
 *
 * Abbinamento foto: il nome del file deve iniziare con il codice dell'esemplare, seguito da
 * fine nome o da un carattere non alfanumerico. Esempi per il codice 26CF125:
 *   26CF125.jpg   26CF125_2.jpg   26CF125 (1).png   26CF125-b.webp
 * (il codice 18 NON viene confuso con 185: dopo il codice non può esserci una lettera o un numero).
 * Le foto sono ordinate per nome: la prima è quella mostrata nella scheda.
 */

// ===== DA COMPILARE =====
const SHEET_NAME = 'Disponibili';          // nome della scheda con gli animali
const FOLDER_ID  = 'INCOLLA_QUI_ID_CARTELLA_DRIVE'; // la parte finale dell'indirizzo della cartella: drive.google.com/drive/folders/<ID>
// ========================

// Nome colonna (senza maiuscole, spazi e due punti) -> campo
const COLUMNS = {
  cod: ['cod', 'codice'],
  sesso: ['sesso'],
  mf: ['m/f', 'mf'],
  nascita: ['nascita'],
  morph: ['morph'],
  note: ['note'],
  proven: ['riproduttore', 'proven'],
  specie: ['specie'],
  prezzo: ['prezzo'],
  stato: ['stato', 'prenotato', 'prenotata', 'prenotazione']
};

function doGet() {
  try {
    return json(buildResponse());
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function norm(v) {
  return String(v == null ? '' : v).toLowerCase().replace(/[:\s]+/g, '').trim();
}

function buildResponse() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Scheda "' + SHEET_NAME + '" non trovata');

  const values = sheet.getDataRange().getDisplayValues();
  const head = values[0].map(norm);
  const col = {};
  Object.keys(COLUMNS).forEach(k => { col[k] = head.findIndex(h => COLUMNS[k].indexOf(h) !== -1); });
  if (col.cod < 0) throw new Error('Colonna COD non trovata');

  // Foto: [{id, name}] ordinate per nome
  const files = [];
  const it = DriveApp.getFolderById(FOLDER_ID).getFiles();
  while (it.hasNext()) {
    const f = it.next();
    if ((f.getMimeType() || '').indexOf('image/') === 0) files.push({ id: f.getId(), name: f.getName() });
  }
  files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const used = {};
  const animali = [];
  const senzaFoto = [];

  values.slice(1).forEach(row => {
    const cod = String(row[col.cod] || '').trim();
    if (!cod) return;
    const a = { cod: cod };
    Object.keys(col).forEach(k => { if (k !== 'cod') a[k] = col[k] >= 0 ? String(row[col[k]] || '').trim() : ''; });

    const up = cod.toUpperCase();
    a.foto = files.filter(f => {
      const n = f.name.replace(/\.[^.]+$/, '').toUpperCase();
      if (n.indexOf(up) !== 0) return false;
      const next = n.charAt(up.length);
      return next === '' || !/[A-Z0-9]/.test(next);
    }).map(f => { used[f.id] = true; return f.id; });

    if (!a.foto.length) senzaFoto.push(cod);
    animali.push(a);
  });

  const fotoOrfane = files.filter(f => !used[f.id]).map(f => f.name);
  return { ok: true, animali: animali, senzaFoto: senzaFoto, fotoOrfane: fotoOrfane };
}
