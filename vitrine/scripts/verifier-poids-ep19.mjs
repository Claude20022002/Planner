// VIT-19 · EP-19 : poids transféré d'une page (comme Nginx gzip niveau 1), hors /videos/*.
// Les @font-face avec unicode-range : seuls les sous-ensembles que le navigateur
// téléchargerait pour la langue de la page sont comptés (précision 2 : ce qui est chargé).
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

export const SEUIL_OCTETS = 200 * 1024; // 204 800
export const GZIP_MIN = 1024;
export const GZIP_LEVEL = 1;

const TYPES_GZIP = new Set([
  '.html', '.htm', '.txt', '.css', '.js', '.mjs', '.json', '.xml', '.svg',
]);

// Plages approximatives des caractères de l'UI par langue publiée.
const PLAGES_LANGUE = {
  // Latin de base + latin-1 : ce que le navigateur tire en premier pour fr/en
  // (Inter « latin » ; « latin-ext » commence en U+0100 et n'est pas chargé sans besoin).
  fr: [[0x0000, 0x00ff]],
  en: [[0x0000, 0x00ff]],
  ar: [[0x0000, 0x00ff], [0x0600, 0x06ff], [0x0750, 0x077f], [0xfb50, 0xfdff], [0xfe70, 0xfeff]],
};

const RACINE_VITRINE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function versCle(racine, fichier) {
  return path.relative(racine, fichier).split(path.sep).join('/');
}

function estVideo(cle) {
  return cle === 'videos' || cle.startsWith('videos/');
}

function estGzipable(fichier, tailleBrute) {
  if (tailleBrute < GZIP_MIN) return false;
  return TYPES_GZIP.has(path.extname(fichier).toLowerCase());
}

export function tailleTransferee(fichier) {
  const brut = fs.readFileSync(fichier);
  if (!estGzipable(fichier, brut.length)) return brut.length;
  return zlib.gzipSync(brut, { level: GZIP_LEVEL }).length;
}

export function langueDepuisPage(clePage) {
  const m = clePage.match(/(?:^|\/)(fr|en|ar)(?:\/|$)/);
  return m ? m[1] : 'fr';
}

function parseUnicodeRange(texte) {
  if (!texte) return null;
  const plages = [];
  for (const part of texte.split(',')) {
    const t = part.trim();
    // U+460-52F, U+A640, U+1F?? (joker → plage 0–F sur chaque ?)
    const un = /^U\+([0-9A-Fa-f?]+)(?:-([0-9A-Fa-f?]+))?$/.exec(t);
    if (!un) continue;
    const borne = (hex) => {
      const min = parseInt(hex.replace(/\?/g, '0'), 16);
      const max = parseInt(hex.replace(/\?/g, 'F'), 16);
      return [min, max];
    };
    const [a1, a2] = borne(un[1]);
    const [b1, b2] = un[2] ? borne(un[2]) : [a1, a2];
    plages.push([Math.min(a1, b1), Math.max(a2, b2)]);
  }
  return plages.length ? plages : null;
}

function plagesSeChevauchent(a, b) {
  for (const [a1, a2] of a) {
    for (const [b1, b2] of b) {
      if (a1 <= b2 && b1 <= a2) return true;
    }
  }
  return false;
}

function policeUtilePourLangue(unicodeRange, langue) {
  const plages = parseUnicodeRange(unicodeRange);
  if (!plages) return true; // pas de unicode-range → le navigateur charge
  const besoin = PLAGES_LANGUE[langue] || PLAGES_LANGUE.fr;
  return plagesSeChevauchent(plages, besoin);
}

function resoudreUrl(racine, depuisFichier, urlBrute) {
  let url = urlBrute.trim().replace(/^['"]|['"]$/g, '');
  if (!url || url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('#')) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(url) && !url.startsWith('file:')) return null;
  if (url.startsWith('//')) return null;

  let relatif;
  if (url.startsWith('/')) {
    relatif = url.slice(1);
  } else {
    const base = path.posix.dirname(versCle(racine, depuisFichier));
    relatif = path.posix.normalize(path.posix.join(base === '.' ? '' : base, url));
    if (relatif.startsWith('../')) return null;
  }
  relatif = relatif.split('?')[0].split('#')[0];
  if (!relatif || estVideo(relatif)) return null;

  const absolu = path.join(racine, ...relatif.split('/'));
  if (!absolu.startsWith(racine) || !fs.existsSync(absolu) || !fs.statSync(absolu).isFile()) return null;
  return absolu;
}

function premierSrcset(srcset) {
  const premier = srcset.split(',')[0]?.trim();
  if (!premier) return null;
  return premier.split(/\s+/)[0];
}

function urlsDepuisHtml(html) {
  const urls = [];
  const attrs = [
    /<link\b[^>]*\brel=["'](?:stylesheet|preload|modulepreload)["'][^>]*\bhref=["']([^"']+)["']/gi,
    /<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["'](?:stylesheet|preload|modulepreload)["']/gi,
    /<script\b[^>]*\bsrc=["']([^"']+)["']/gi,
    /<img\b[^>]*\bsrc=["']([^"']+)["']/gi,
    /<source\b[^>]*\bsrcset=["']([^"']+)["']/gi,
    /<source\b[^>]*\bsrc=["']([^"']+)["']/gi,
  ];
  for (const re of attrs) {
    let m;
    while ((m = re.exec(html))) {
      const brut = re.source.includes('srcset') ? premierSrcset(m[1]) : m[1];
      if (brut) urls.push(brut);
    }
  }
  return urls;
}

function importsStatiquesJs(texte) {
  const urls = [];
  const re = /(?:^|[^\w.$])import\s*(?:[\s\S]*?\sfrom\s*)?["']([^"']+)["']/gm;
  let m;
  while ((m = re.exec(texte))) {
    const avant = texte.slice(Math.max(0, m.index - 12), m.index);
    if (/\bimport\s*\(\s*$/.test(avant)) continue;
    urls.push(m[1]);
  }
  const reExport = /export\s+[\s\S]*?\sfrom\s*["']([^"']+)["']/gm;
  while ((m = reExport.exec(texte))) urls.push(m[1]);
  return urls;
}

/** @returns {{ url: string, unicodeRange: string | null }[]} */
function ressourcesDepuisCss(texte) {
  const out = [];
  const faces = texte.match(/@font-face\s*\{[^}]*\}/gi) || [];
  const urlsPolice = new Set();
  for (const face of faces) {
    const urlM = /url\(\s*(?:"([^"]+)"|'([^']+)'|([^'")]+))\s*\)/i.exec(face);
    const rangeM = /unicode-range\s*:\s*([^;}]+)/i.exec(face);
    const url = (urlM && (urlM[1] || urlM[2] || urlM[3]) || '').trim();
    if (!url) continue;
    urlsPolice.add(url);
    out.push({ url, unicodeRange: rangeM ? rangeM[1].trim() : null });
  }
  const re = /url\(\s*(?:"([^"]+)"|'([^']+)'|([^'")]+))\s*\)/gi;
  let m;
  while ((m = re.exec(texte))) {
    const u = (m[1] || m[2] || m[3] || '').trim();
    if (!u || urlsPolice.has(u)) continue;
    out.push({ url: u, unicodeRange: null });
  }
  return out;
}

function enrichir(racine, fichier, vus, langue) {
  const cle = versCle(racine, fichier);
  if (vus.has(cle) || estVideo(cle)) return;
  vus.set(cle, fichier);

  const ext = path.extname(fichier).toLowerCase();
  if (ext === '.js' || ext === '.mjs') {
    const texte = fs.readFileSync(fichier, 'utf8');
    for (const ref of importsStatiquesJs(texte)) {
      const cible = resoudreUrl(racine, fichier, ref);
      if (cible) enrichir(racine, cible, vus, langue);
    }
  }
  if (ext === '.css') {
    const texte = fs.readFileSync(fichier, 'utf8');
    for (const { url, unicodeRange } of ressourcesDepuisCss(texte)) {
      if (unicodeRange !== null && !policeUtilePourLangue(unicodeRange, langue)) continue;
      // unicodeRange null hors @font-face → toujours ; dans @font-face sans range → toujours
      const cible = resoudreUrl(racine, fichier, url);
      if (cible) enrichir(racine, cible, vus, langue);
    }
  }
}

/**
 * Mesure le poids transféré d'une page HTML sous `racine`.
 * @returns {{ page: string, total: number, details: { fichier: string, octets: number }[], ok: boolean }}
 */
export function mesurerPage(racine, pageHtml) {
  const racineAbs = path.resolve(racine);
  const pageAbs = path.resolve(pageHtml);
  const clePage = versCle(racineAbs, pageAbs);
  const langue = langueDepuisPage(clePage);
  const vus = new Map();
  enrichir(racineAbs, pageAbs, vus, langue);

  const html = fs.readFileSync(pageAbs, 'utf8');
  for (const url of urlsDepuisHtml(html)) {
    const cible = resoudreUrl(racineAbs, pageAbs, url);
    if (cible) enrichir(racineAbs, cible, vus, langue);
  }

  const details = [...vus.entries()]
    .map(([fichier, abs]) => ({ fichier, octets: tailleTransferee(abs) }))
    .sort((a, b) => b.octets - a.octets);
  const total = details.reduce((s, d) => s + d.octets, 0);
  return {
    page: clePage,
    total,
    details,
    ok: total <= SEUIL_OCTETS,
  };
}

export function listerPagesHtml(racine) {
  const pages = [];
  const marche = (dossier) => {
    if (!fs.existsSync(dossier)) return;
    for (const entree of fs.readdirSync(dossier, { withFileTypes: true })) {
      const p = path.join(dossier, entree.name);
      if (entree.isDirectory()) marche(p);
      else if (entree.isFile() && entree.name.endsWith('.html')) pages.push(p);
    }
  };
  marche(racine);
  return pages.sort();
}

export function controlerRacine(racine) {
  const pages = listerPagesHtml(racine);
  const resultats = pages.map((p) => mesurerPage(racine, p));
  const plusLourde = resultats.reduce(
    (m, r) => (!m || r.total > m.total ? r : m),
    null,
  );
  return {
    ok: resultats.every((r) => r.ok),
    resultats,
    plusLourde,
  };
}

function formaterKo(octets) {
  return `${(octets / 1024).toFixed(1)} Ko (${octets} octets)`;
}

function main() {
  const racine = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.join(RACINE_VITRINE, 'dist');

  if (!fs.existsSync(racine)) {
    console.error(`Dossier introuvable : ${racine}`);
    process.exit(2);
  }

  const { ok, resultats, plusLourde } = controlerRacine(racine);
  for (const r of resultats.filter((x) => !x.ok)) {
    console.error(`EP-19 dépassé : ${r.page} = ${formaterKo(r.total)} (seuil ${SEUIL_OCTETS})`);
    for (const d of r.details.slice(0, 5)) {
      console.error(`  - ${d.fichier} : ${formaterKo(d.octets)}`);
    }
  }

  if (plusLourde) {
    console.log(
      `Page la plus lourde : ${plusLourde.page} = ${formaterKo(plusLourde.total)}`
        + (plusLourde.ok ? ' (sous le seuil)' : ' (AU-DESSUS du seuil)'),
    );
  } else {
    console.log('Aucune page HTML trouvée.');
  }

  process.exit(ok ? 0 : 1);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
