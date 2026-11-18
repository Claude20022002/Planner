#!/usr/bin/env node
/**
 * Audit des dépendances livrées, avec exceptions écrites et datées (plan
 * docs/conception/exploitation/fix-audit-dependances.md). Remplace « npm audit --audit-level=high » dans la CI.
 *
 * Lance « npm audit --omit=dev --json » dans le dossier courant, puis échoue :
 * - sur toute faille haute ou critique absente de deploy/audit-exceptions.json ;
 * - dès qu'une exception du dossier a expiré, ou couvre plus de 30 jours après sa dernière revue ;
 * - dès que le paquet en faute publie une version hors de la plage de l'avis (« npm view <paquet> version »).
 *   On ne se fie pas à « fixAvailable » : pour picomatch, npm y propose un faux correctif (umzug 3.8.2).
 * Les failles moyennes et basses sont affichées sans bloquer. Aucune dépendance.
 *
 * Lancement, depuis le dossier audité : node ../scripts/audit.mjs backend
 * (le nom du dossier, par défaut celui du dossier courant, choisit ses exceptions).
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const FICHIER_EXCEPTIONS = path.join(RACINE, 'deploy', 'audit-exceptions.json');
export const DUREE_MAX_JOURS = 30;
const BLOQUANTES = new Set(['high', 'critical']);
const CHAMPS = ['dossier', 'avis', 'paquet', 'chemin', 'raison', 'revue', 'expire'];
const JOUR = 24 * 60 * 60 * 1000;

// ── Versions et plages (le sous-ensemble de semver qu'emploient les avis de npm audit) ──────────

const lireVersion = (texte) => {
  const m = /^v?(\d+)\.(\d+)\.(\d+)/.exec(String(texte).trim());
  if (!m) throw new Error(`version illisible : « ${texte} »`);
  return m.slice(1, 4).map(Number);
};

const comparer = (a, b) => {
  for (let i = 0; i < 3; i += 1) if (a[i] !== b[i]) return a[i] - b[i];
  return 0;
};

const COMPARATEUR = /^(<=|>=|<|>|=)?(v?\d+\.\d+\.\d+\S*)$/;
const OPERATIONS = { '<': (c) => c < 0, '<=': (c) => c <= 0, '>': (c) => c > 0, '>=': (c) => c >= 0, '=': (c) => c === 0 };

/** Vrai si la version est dans la plage de l'avis (« <=4.0.7 », « >=2.0.0 <2.3.2 || >=4.0.0 <4.0.8 », « * ») */
export const dansPlage = (version, plage) => {
  const v = lireVersion(version);
  return String(plage).split('||').some((morceau) => {
    const termes = morceau.trim().split(/\s+/).filter(Boolean);
    if (termes.length === 0) throw new Error(`plage illisible : « ${plage} »`);
    return termes.every((terme) => {
      if (terme === '*') return true;
      const m = COMPARATEUR.exec(terme);
      if (!m) throw new Error(`plage illisible : « ${plage} »`);
      return OPERATIONS[m[1] || '='](comparer(v, lireVersion(m[2])));
    });
  });
};

// ── Règles, sans réseau ni commande : ce que le test vérifie ───────────────────────────────────

const identifiantAvis = (via) => /GHSA-[\w-]+$/.exec(via.url || '')?.[0] ?? String(via.source);

/** Les avis du rapport de npm audit, une fois chacun : { avis, paquet, plage, gravite, titre } */
export const avisDuRapport = (rapport) => {
  const avis = new Map();
  for (const vulnerabilite of Object.values(rapport.vulnerabilities || {})) {
    for (const via of vulnerabilite.via || []) {
      if (typeof via !== 'object') continue; // chaîne : faille héritée d'un autre paquet, comptée chez lui
      const id = identifiantAvis(via);
      avis.set(`${id} ${via.name}`, { avis: id, paquet: via.name, plage: via.range, gravite: via.severity, titre: via.title });
    }
  }
  return [...avis.values()];
};

const jours = (de, a) => Math.round((Date.parse(a) - Date.parse(de)) / JOUR);
const dateValide = (texte) => /^\d{4}-\d{2}-\d{2}$/.test(texte) && !Number.isNaN(Date.parse(texte));

/** Erreurs de forme d'une exception (champs, dates, durée) ; vide si elle est bien écrite */
export const defautsException = (e) => {
  const defauts = CHAMPS.filter((champ) => typeof e[champ] !== 'string' || e[champ].trim() === '').map((c) => `champ « ${c} » manquant`);
  if (defauts.length) return defauts;
  if (!dateValide(e.revue) || !dateValide(e.expire)) return ['dates « revue » et « expire » au format AAAA-MM-JJ'];
  const duree = jours(e.revue, e.expire);
  if (duree < 0) return ['« expire » avant « revue »'];
  if (duree > DUREE_MAX_JOURS) return [`${duree} jours entre revue et expiration (au plus ${DUREE_MAX_JOURS})`];
  return [];
};

/**
 * Décide de l'audit d'un dossier.
 * dernieresVersions : { paquet: dernière version publiée }, pour les paquets des failles listées.
 * Rend { erreurs, notes } ; l'audit échoue s'il y a au moins une erreur.
 */
export const evaluer = ({ rapport, exceptions, dossier, aujourdhui, dernieresVersions = {} }) => {
  const erreurs = [];
  const notes = [];
  const duDossier = exceptions.filter((e) => e.dossier === dossier);
  const utilisees = new Set();

  for (const e of duDossier) {
    const nom = `${e.avis} (${e.paquet})`;
    for (const defaut of defautsException(e)) erreurs.push(`exception ${nom} mal écrite : ${defaut}`);
    if (dateValide(e.expire) && e.expire < aujourdhui) erreurs.push(`exception ${nom} expirée le ${e.expire} : la revoir ou corriger`);
  }

  for (const a of avisDuRapport(rapport)) {
    const nom = `${a.avis} (${a.paquet}, ${a.gravite}) : ${a.titre}`;
    if (!BLOQUANTES.has(a.gravite)) {
      notes.push(`non bloquante : ${nom}`);
      continue;
    }
    const exception = duDossier.find((e) => e.avis === a.avis && e.paquet === a.paquet);
    if (!exception) {
      erreurs.push(`faille ${a.gravite} non listée : ${nom}`);
      continue;
    }
    utilisees.add(exception);
    const derniere = dernieresVersions[a.paquet];
    if (!derniere) erreurs.push(`dernière version publiée de ${a.paquet} inconnue : impossible de vérifier l'exception ${a.avis}`);
    else if (!dansPlage(derniere, a.plage)) {
      erreurs.push(`${a.paquet} ${derniere} est publiée, hors de la plage « ${a.plage} » de ${a.avis} : monter et retirer l'exception`);
    } else notes.push(`exception tenue jusqu'au ${exception.expire} : ${nom} (dernière version ${derniere}, toujours touchée)`);
  }

  for (const e of duDossier) if (!utilisees.has(e)) notes.push(`exception ${e.avis} (${e.paquet}) sans faille correspondante : à retirer`);
  return { erreurs, notes };
};

// ── Lancement : npm audit, npm view, puis verdict ──────────────────────────────────────────────

const npm = (args) => spawnSync('npm', args, { encoding: 'utf8', shell: process.platform === 'win32', maxBuffer: 64 * 1024 * 1024 });

const lancer = () => {
  const dossier = process.argv[2] || path.basename(process.cwd());
  const audit = npm(['audit', '--omit=dev', '--json']);
  let rapport;
  try {
    rapport = JSON.parse(audit.stdout);
  } catch {
    throw new Error(`rapport de npm audit illisible (code ${audit.status}) : ${audit.stderr || audit.stdout}`.trim());
  }
  if (rapport.error) throw new Error(`npm audit a échoué : ${rapport.error.summary || JSON.stringify(rapport.error)}`);

  const { exceptions } = JSON.parse(fs.readFileSync(FICHIER_EXCEPTIONS, 'utf8'));
  const listes = new Set(exceptions.filter((e) => e.dossier === dossier).map((e) => e.paquet));
  const dernieresVersions = {};
  for (const { paquet } of avisDuRapport(rapport)) {
    if (!listes.has(paquet) || dernieresVersions[paquet]) continue;
    const vue = npm(['view', paquet, 'version']);
    if (vue.status === 0 && vue.stdout.trim()) dernieresVersions[paquet] = vue.stdout.trim();
  }

  const aujourdhui = new Date().toISOString().slice(0, 10);
  const { erreurs, notes } = evaluer({ rapport, exceptions, dossier, aujourdhui, dernieresVersions });
  const total = rapport.metadata?.vulnerabilities?.total ?? '?';
  console.log(`Audit de ${dossier} (${aujourdhui}) : ${total} ligne(s) dans npm audit.`);
  for (const note of notes) console.log(`  · ${note}`);
  for (const erreur of erreurs) console.error(`  ✗ ${erreur}`);
  console.log(erreurs.length ? `Échec : ${erreurs.length} erreur(s).` : 'Aucune faille haute ou critique hors des exceptions.');
  return erreurs.length ? 1 : 0;
};

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    process.exitCode = lancer();
  } catch (erreur) {
    console.error(`Audit impossible : ${erreur.message}`);
    process.exitCode = 1;
  }
}
