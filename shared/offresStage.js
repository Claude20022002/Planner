/**
 * Offres de stage (STA-01, espace Carrière). Partagé par le serveur, le site et l'application :
 * la même offre est refusée partout, avec le même motif, et le prix s'écrit de la même façon.
 *
 * Rien d'élève ici : des offres et un contact d'entreprise, fournis par l'école. Le montant de la
 * gratification est un prix affiché tel quel, jamais un calcul de paie (FIN reste propriétaire des
 * frais et des reçus).
 */

export const OFFRE_STAGE = {
  titreMin: 5,
  titreMax: 150,
  entrepriseMin: 2,
  entrepriseMax: 150,
  villeMin: 2,
  villeMax: 100,
  descriptionMin: 30,
  descriptionMax: 5000,
  niveauMax: 50,
  lienMax: 500,
  emailMax: 190,
  // Montant mensuel brut, en dirhams ou dans la devise de l'offre
  gratificationMax: 100000,
};

export const STATUTS_OFFRE_STAGE = ["brouillon", "publiee", "close"];

// Devises proposées à la saisie ; le dirham par défaut
export const DEVISES = ["MAD", "EUR", "USD", "XOF", "XAF", "DZD", "TND"];
export const DEVISE_PAR_DEFAUT = "MAD";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const COURRIEL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Un lien de candidature s'ouvre en http(s) : jamais javascript:, data: ni fichier local
const PLANS_LIEN = ["http:", "https:"];

/** Aller-retour : « 2026-02-30 » est lu comme le 2 mars par Date.parse, mais n'existe pas. */
const dateExiste = (texte) => {
  if (!DATE.test(texte)) return false;
  const date = new Date(`${texte}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === texte;
};

/** Lien de candidature accepté : une adresse absolue, en http ou https. */
export const lienAutorise = (valeur) => {
  try {
    return PLANS_LIEN.includes(new URL(String(valeur)).protocol);
  } catch {
    return false;
  }
};

const texte = (valeur) => (typeof valeur === "string" ? valeur.trim() : "");
const facultatif = (valeur) => texte(valeur) || null;

/**
 * Montant lu depuis le formulaire : nombre ou texte (« 1500 », « 1 500,50 »).
 * Rend { valeur } (deux décimales au plus) ou { motif: 'gratification' }.
 */
const lireMontant = (valeur) => {
  if (valeur === null || valeur === undefined || valeur === "") return { valeur: null };
  if (typeof valeur !== "number" && typeof valeur !== "string") return { motif: "gratification" };
  const montant = String(valeur).trim().replace(/\s/g, "").replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(montant)) return { motif: "gratification" };
  const nombre = Number(montant);
  if (!Number.isFinite(nombre) || nombre > OFFRE_STAGE.gratificationMax) return { motif: "gratification" };
  return { valeur: nombre };
};

/**
 * Contrôle une offre avant création ou modification (règle STA-01). Rend { motif } si elle est
 * refusée — 'titre', 'entreprise', 'ville', 'description', 'niveau', 'dates', 'gratification',
 * 'devise', 'lien' ou 'email' —, sinon { offre } nettoyée (espaces retirés, vides → null, devise
 * en capitales).
 */
export const verifierOffre = ({ titre, entreprise, ville, description, niveau, debut, fin, gratification, devise, lien_candidature: lien, contact_email: email } = {}) => {
  const valeurs = {
    titre: texte(titre),
    entreprise: texte(entreprise),
    ville: texte(ville),
    description: texte(description),
  };
  if (valeurs.titre.length < OFFRE_STAGE.titreMin || valeurs.titre.length > OFFRE_STAGE.titreMax) return { motif: "titre" };
  if (valeurs.entreprise.length < OFFRE_STAGE.entrepriseMin || valeurs.entreprise.length > OFFRE_STAGE.entrepriseMax) return { motif: "entreprise" };
  if (valeurs.ville.length < OFFRE_STAGE.villeMin || valeurs.ville.length > OFFRE_STAGE.villeMax) return { motif: "ville" };
  if (valeurs.description.length < OFFRE_STAGE.descriptionMin || valeurs.description.length > OFFRE_STAGE.descriptionMax) return { motif: "description" };

  const niveauLu = facultatif(niveau);
  if (niveauLu && niveauLu.length > OFFRE_STAGE.niveauMax) return { motif: "niveau" };

  const debutLu = facultatif(debut);
  const finLue = facultatif(fin);
  if (debutLu && !dateExiste(debutLu)) return { motif: "dates" };
  if (finLue && !dateExiste(finLue)) return { motif: "dates" };
  if (debutLu && finLue && finLue < debutLu) return { motif: "dates" };

  const { motif: motifMontant, valeur: prix } = lireMontant(gratification);
  if (motifMontant) return { motif: motifMontant };
  const deviseLue = (facultatif(devise) ?? DEVISE_PAR_DEFAUT).toUpperCase();
  if (!DEVISES.includes(deviseLue)) return { motif: "devise" };

  const lienLu = facultatif(lien);
  if (lienLu && (lienLu.length > OFFRE_STAGE.lienMax || !lienAutorise(lienLu))) return { motif: "lien" };

  const emailLu = facultatif(email);
  if (emailLu && (emailLu.length > OFFRE_STAGE.emailMax || !COURRIEL.test(emailLu))) return { motif: "email" };

  return {
    offre: {
      titre: valeurs.titre,
      entreprise: valeurs.entreprise,
      ville: valeurs.ville,
      description: valeurs.description,
      niveau: niveauLu,
      debut: debutLu,
      fin: finLue,
      gratification: prix,
      devise: deviseLue,
      lien_candidature: lienLu,
      contact_email: emailLu,
    },
  };
};

/**
 * Ce qui manque pour publier : un moyen de postuler (lien ou courriel). Le contenu, lui, est déjà
 * exigé au brouillon ; la liste laisse la place à d'autres règles de publication.
 */
export const manquesPourPublier = (offre) =>
  offre.lien_candidature || offre.contact_email ? [] : ["candidature"];

/**
 * Écrit le prix : « 1 500 MAD », « 1 500,50 MAD ». Null s'il n'y a pas de montant.
 * Séparateur de milliers : espace fine insécable, comme le reste des montants du site.
 */
export const formaterMontant = (gratification, devise) => {
  if (gratification === null || gratification === undefined || gratification === "") return null;
  const nombre = Number(gratification);
  if (!Number.isFinite(nombre)) return null;
  const [entier, decimales] = Math.abs(nombre).toFixed(2).split(".");
  const milliers = entier.replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F");
  const montant = decimales === "00" ? milliers : `${milliers},${decimales}`;
  return `${nombre < 0 ? "-" : ""}${montant} ${devise || DEVISE_PAR_DEFAUT}`;
};

/**
 * Filtre de la liste, côté site et application : la recherche porte sur le titre, l'entreprise et la
 * ville ; une filière ou un niveau vide ne filtre rien.
 */
export const filtrerOffres = (offres, { recherche = "", id_filiere: idFiliere = null, niveau = null } = {}) => {
  const terme = String(recherche ?? "").trim().toLocaleLowerCase("fr");
  return (offres ?? []).filter((offre) => {
    if (terme) {
      const contenu = [offre.titre, offre.entreprise, offre.ville].map((valeur) => String(valeur ?? "").toLocaleLowerCase("fr"));
      if (!contenu.some((valeur) => valeur.includes(terme))) return false;
    }
    if (idFiliere !== null && idFiliere !== "" && Number(offre.id_filiere) !== Number(idFiliere)) return false;
    if (niveau !== null && niveau !== "" && offre.niveau !== niveau) return false;
    return true;
  });
};
