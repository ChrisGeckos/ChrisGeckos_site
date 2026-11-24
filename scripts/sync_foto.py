#!/usr/bin/env python3
"""
Sincronizza le foto degli esemplari: legge l'elenco dall'app web (la stessa usata dal sito),
scarica da Google Drive le foto nuove, le ridimensiona, le converte in WebP e le salva in foto/.
Le foto di esemplari non più presenti nell'elenco vengono rimosse da foto/.
Non modifica nulla su Drive (solo lettura).
"""
import io, json, os, re, sys, time
from pathlib import Path
import requests
from PIL import Image, ImageOps

API_URL = os.environ.get('ANIMALI_API_URL', 'https://script.google.com/macros/s/AKfycbzdkyKNjGa-nwdOid3cZEXq5MA5u4cowFNmelpje8W1LxxboSCAX77CADSUmHy12get/exec')
# Miniatura grande richiesta a Drive (il file originale può pesare diversi MB)
DRIVE_URLS = [
    os.environ.get('DRIVE_THUMB_URL', 'https://drive.google.com/thumbnail?id={id}&sz=w1600'),
    os.environ.get('DRIVE_ALT_URL', 'https://lh3.googleusercontent.com/d/{id}=w1600'),
]
OUT = Path(os.environ.get('OUT_DIR', 'foto'))
MAX_SIDE = int(os.environ.get('MAX_SIDE', '1200'))     # lato massimo in pixel
QUALITY = int(os.environ.get('WEBP_QUALITY', '80'))
MANIFEST = OUT / 'manifest.json'
FORCE = os.environ.get('FORCE', '0') == '1'   # 1 = riscarica e sostituisce tutte le foto, anche se l'ID su Drive non è cambiato


def safe_name(cod):
    # Deve restare identica alla funzione photoFileName() di script.js
    return re.sub(r'[^A-Za-z0-9\-]+', '_', str(cod)).strip('_')


def get(url, tries=3):
    for i in range(tries):
        try:
            r = requests.get(url, timeout=60, headers={'User-Agent': 'ChrisGeckos-sync/1.0'})
            if r.status_code == 200 and r.content:
                return r.content
        except requests.RequestException:
            pass
        time.sleep(2 * (i + 1))
    return None


def download(drive_id):
    for tpl in DRIVE_URLS:
        data = get(tpl.format(id=drive_id))
        if not data:
            continue
        try:
            im = Image.open(io.BytesIO(data)); im.load()
            return im
        except Exception:
            continue   # non è un'immagine (pagina di errore di Drive)
    return None


def to_webp(im, path):
    im = ImageOps.exif_transpose(im)
    if im.mode not in ('RGB', 'RGBA'):
        im = im.convert('RGB')
    im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, 'WEBP', quality=QUALITY, method=6)


def main():
    r = requests.get(API_URL, timeout=90)
    r.raise_for_status()
    data = r.json()
    if not data.get('ok') or not isinstance(data.get('animali'), list):
        print('Risposta non valida dall\'app web:', str(data)[:200]); return 1

    OUT.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    wanted, added, kept, failed = {}, [], 0, []
    for a in data['animali']:
        cod = str(a.get('cod', '')).strip()
        if not cod:
            continue
        for i, fid in enumerate(a.get('foto') or []):
            name = safe_name(cod) + ('' if i == 0 else f'_{i + 1}') + '.webp'
            wanted[name] = fid
            if not FORCE and manifest.get(name) == fid and (OUT / name).exists():
                kept += 1; continue
            im = download(fid)
            if im is None:
                failed.append(name)
                if name in manifest:                 # si tiene la vecchia versione, se c'è
                    wanted[name] = manifest[name]
                continue
            to_webp(im, OUT / name); added.append(name)

    removed = []
    for f in OUT.glob('*.webp'):
        if f.name not in wanted:
            f.unlink(); removed.append(f.name)
    # in caso di errore il file resta fuori dal manifest, così al prossimo giro si riprova
    new_manifest = {n: fid for n, fid in wanted.items() if (OUT / n).exists()}
    MANIFEST.write_text(json.dumps(new_manifest, indent=1, sort_keys=True))

    if FORCE:
        print('Modalità "ricarica tutto": tutte le foto sono state riscaricate e sostituite.')
    print(f'Aggiunte/aggiornate: {len(added)} {added}')
    print(f'Già presenti: {kept}')
    print(f'Rimosse (esemplare non più in elenco): {len(removed)} {removed}')
    if failed:
        print(f'Non scaricate (si riproverà): {failed}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
