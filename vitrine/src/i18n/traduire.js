// Fonctions pures de traduction : fusion d'un dictionnaire avec celui de la langue de secours, et
// lecture d'une clé pointée. Sans effet, testées seules (tests/traduire.test.js).

const estObjet = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const estVide = (v) => v === undefined || v === null || v === '';

/** Fusionne une valeur traduite avec sa valeur de secours : tout texte vide ou absent prend le secours */
export const fusionner = (secours, valeur) => {
  if (estVide(valeur)) return secours;
  if (Array.isArray(secours)) {
    return secours.map((element, i) => fusionner(element, Array.isArray(valeur) ? valeur[i] : undefined));
  }
  if (estObjet(secours)) {
    const source = estObjet(valeur) ? valeur : {};
    return Object.fromEntries(Object.keys(secours).map((cle) => [cle, fusionner(secours[cle], source[cle])]));
  }
  return valeur;
};

/** Lit une clé pointée (« ouverture.titre ») ; lève une erreur si elle manque, pour casser le build */
export const lire = (dictionnaire, cle) => {
  const valeur = cle.split('.').reduce((noeud, partie) => (noeud == null ? undefined : noeud[partie]), dictionnaire);
  if (valeur === undefined) throw new Error(`Texte manquant : ${cle}`);
  return valeur;
};

/** Forme d'un dictionnaire : liste triée de ses chemins de clés, pour comparer deux langues */
export const forme = (noeud, prefixe = '') => {
  if (Array.isArray(noeud)) return noeud.flatMap((v, i) => forme(v, `${prefixe}[${i}]`));
  if (estObjet(noeud)) return Object.keys(noeud).flatMap((c) => forme(noeud[c], prefixe ? `${prefixe}.${c}` : c));
  return [prefixe];
};
