/**
 * Règles du scolaire, partagées par le serveur, le site et l'application (VSC-02).
 *
 * Elles ne touchent ni la base ni le réseau : les mêmes réponses partout, un seul endroit à corriger.
 * Ce que la base garantit (une inscription par personne et par année), un index unique le porte ;
 * ce que seul le code peut dire (un état ne recule pas), c'est ici.
 */

/** Un sexe absent est permis : l'école n'a pas toujours l'information, elle n'est pas bloquante. */
export const SEXES = ["F", "M", "autre"];

/** Nature du lien entre un élève et son responsable. « autre » couvre le grand frère, la tutrice… */
export const LIENS_FAMILLE = ["pere", "mere", "tuteur", "autre"];

/** Vie d'une inscription : elle avance d'un cran, ou se termine, jamais ne recule. */
export const ETATS_INSCRIPTION = ["demandee", "engagee", "confirmee", "inscrite", "radiee", "passante"];

const SUITE = {
    demandee: ["engagee", "radiee"],
    engagee: ["confirmee", "radiee"],
    confirmee: ["inscrite", "radiee"],
    inscrite: ["passante", "radiee"],
    passante: [],
    radiee: [],
};

/** États atteignables depuis celui-ci ; vide quand l'inscription est close. */
export const etatsSuivants = (etat) => SUITE[etat] ?? [];

export const estEtatInscription = (etat) => ETATS_INSCRIPTION.includes(etat);

export const transitionAutorisee = (de, vers) => etatsSuivants(de).includes(vers);

/** Espaces de bord retirés ; tout ce qui n'est pas un texte vaut chaîne vide. */
export const nettoyerTexte = (valeur) => (typeof valeur === "string" ? valeur.trim() : "");

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const COURRIEL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_MASSAR = /^[A-Za-z0-9]{1,20}$/;

/**
 * Première raison de refuser une personne, ou `null` si elle est acceptable.
 * Le nom et le prénom sont les seuls obligatoires : ni adresse, ni téléphone, ni code Massar.
 */
export const verifierPersonne = (personne = {}) => {
    if (!nettoyerTexte(personne.nom)) return "Le nom est obligatoire";
    if (!nettoyerTexte(personne.prenom)) return "Le prénom est obligatoire";
    if (personne.sexe && !SEXES.includes(personne.sexe)) return "Sexe inconnu";
    if (personne.date_naissance && !DATE.test(String(personne.date_naissance))) return "Date de naissance attendue en AAAA-MM-JJ";
    if (personne.email_contact && !COURRIEL.test(nettoyerTexte(personne.email_contact))) return "Adresse de contact invalide";
    if (personne.cne && !CODE_MASSAR.test(nettoyerTexte(personne.cne))) return "Code Massar : 20 caractères alphanumériques au plus";
    return null;
};

/** Première raison de refuser une inscription, ou `null`. Le groupe n'en fait pas partie (VSC-01, Q-6). */
export const verifierInscription = ({ id_annee, niveau, etat } = {}) => {
    if (!Number.isInteger(Number(id_annee)) || Number(id_annee) <= 0) return "Année scolaire requise";
    if (!nettoyerTexte(niveau)) return "Niveau requis";
    if (etat !== undefined && !estEtatInscription(etat)) return "État d'inscription inconnu";
    return null;
};

/** « Amina BENALI » : le prénom tel quel, le nom en capitales, comme sur les listes de classe. */
export const nomComplet = (personne = {}) => {
    const prenom = nettoyerTexte(personne.prenom);
    const nom = nettoyerTexte(personne.nom).toUpperCase();
    return [prenom, nom].filter(Boolean).join(" ");
};
