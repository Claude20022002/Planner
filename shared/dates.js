/**
 * Date et heure de l'école, au format AAAA-MM-JJ et HH:MM, pour le site et l'application (lot B-2,
 * M-10) : une seule définition à la place des copies de `new Date().toISOString().slice(0, 10)`.
 *
 * Le calcul se fait en UTC, plus le décalage de l'école à cet instant. Ce décalage vient du
 * serveur (GET /api/etablissement, champ `horloge`), qui le calcule avec sa propre base de fuseaux,
 * changements d'heure compris : le site et l'application appellent `configurerHorloge()` au
 * lancement. Surtout pas de fuseau demandé au navigateur : une base de fuseaux ancienne se trompe
 * d'heure (le Maroc resté à UTC+1 après le 20 septembre 2026, par exemple) et donc de jour près de
 * minuit. Avant toute table (premier lancement sans réseau ni copie), le décalage du navigateur ou
 * du téléphone sert faute de mieux, jamais 0 (réponse 4 du plan de M-10).
 */

const MINUTE_MS = 60 * 1000;
const JOUR_MS = 24 * 60 * MINUTE_MS;

// Table reçue du serveur : décalages en minutes, à partir de chaque instant (ms), dans l'ordre
let table = null;

/**
 * Reçoit l'horloge de l'école rendue par le serveur : { fuseau, decalages: [{ depuis, minutes }] }.
 * Une horloge absente ou mal formée est ignorée : la table d'avant (ou le dernier recours) reste.
 * @returns {boolean} vrai si la table est prise
 */
export const configurerHorloge = (horloge) => {
  const lignes = Array.isArray(horloge?.decalages)
    ? horloge.decalages
        .map((l) => ({ depuis: Date.parse(l?.depuis), minutes: l?.minutes }))
        .filter((l) => Number.isFinite(l.depuis) && Number.isInteger(l.minutes))
        .sort((a, b) => a.depuis - b.depuis)
    : [];
  if (!lignes.length) return false;
  table = { fuseau: String(horloge.fuseau ?? ''), lignes };
  return true;
};

/** Oublie la table : le dernier recours (le décalage de l'appareil) reprend. Pour les tests. */
export const oublierHorloge = () => {
  table = null;
};

/** Le fuseau de l'école reçu du serveur, ou null tant qu'aucune table n'est arrivée. */
export const fuseauEcole = () => table?.fuseau || null;

/**
 * Décalage de l'école sur UTC à cet instant, en minutes : la dernière ligne de la table déjà en
 * vigueur, ou la première pour un instant d'avant la table.
 */
export const decalageA = (instant = new Date()) => {
  const t = new Date(instant).getTime();
  if (!table) return -new Date(t).getTimezoneOffset();
  let minutes = table.lignes[0].minutes;
  for (const ligne of table.lignes) {
    if (ligne.depuis > t) break;
    minutes = ligne.minutes;
  }
  return minutes;
};

// L'instant décalé à l'heure de l'école, à lire en UTC
const aLEcole = (instant) => new Date(instant.getTime() + decalageA(instant) * MINUTE_MS);

/** Date de l'école (AAAA-MM-JJ) à l'instant donné, par défaut maintenant. */
export const aujourdhui = (maintenant = new Date()) => aLEcole(new Date(maintenant)).toISOString().slice(0, 10);

/** Date de l'école (AAAA-MM-JJ) dans n jours (négatif : il y a n jours). */
export const dansJours = (n, maintenant = new Date()) => aujourdhui(new Date(new Date(maintenant).getTime() + n * JOUR_MS));

/** Heure de l'école à l'instant donné : { heures, minutes } (de 0 à 23, de 0 à 59). */
export const heureEcole = (instant = new Date()) => {
  const d = aLEcole(new Date(instant));
  return { heures: d.getUTCHours(), minutes: d.getUTCMinutes() };
};

/** Jour civil UTC d'un instant déjà calculé, jamais le fuseau du navigateur. */
export const jourUtc = (instant) => {
  const date = new Date(instant);
  const mois = String(date.getUTCMonth() + 1).padStart(2, '0');
  const jour = String(date.getUTCDate()).padStart(2, '0');
  return `${date.getUTCFullYear()}-${mois}-${jour}`;
};

/**
 * Instant réel d'une heure de l'école (date AAAA-MM-JJ, heure HH:MM ou HH:MM:SS), par exemple la fin
 * d'une séance. Jamais `new Date("2026-10-29T23:55")`, lu dans le fuseau du navigateur. Le calcul se
 * fait en deux pas, pour tenir l'heure qui suit un changement d'heure : un instant d'essai, puis le
 * décalage en vigueur à cet instant.
 */
export const instantEcole = (date, heure) => {
  const naif = Date.parse(`${String(date).slice(0, 10)}T${String(heure).slice(0, 5)}:00Z`);
  const essai = naif - decalageA(new Date(naif)) * MINUTE_MS;
  return new Date(naif - decalageA(new Date(essai)) * MINUTE_MS);
};

/**
 * Locale de l'écran pour les dates, les heures et les nombres. En anglais aussi, l'heure sur
 * 24 h et le jour avant le mois (en-GB), comme les emplois du temps de l'école : « en » seul
 * donnait « 10:20 PM » et « 10/20/2026 » à côté de « 15:30 » (recette du 20 octobre, m-6).
 */
export const localeEcran = (langue) => (String(langue ?? '').startsWith('en') ? 'en-GB' : 'fr-FR');
