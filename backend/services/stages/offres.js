import crypto from "node:crypto";
import { Filiere, OffreStage, Users } from "../../models/index.js";
import { ErreurMetier } from "../planning/enseignements.js";
import { filieresDuResponsable } from "../planning/droits.js";
import { STATUTS_OFFRE_STAGE, manquesPourPublier, verifierOffre } from "../../../shared/offresStage.js";

/**
 * Offres de stage (STA-01, espace Carrière) : l'administration publie pour toutes les filières, un
 * enseignant pour celles dont il est responsable ; l'étudiant consulte et partage le lien public.
 *
 * Deux secrets distincts : le partage passe par `jeton_partage` (16 octets aléatoires), jamais par
 * l'identifiant numérique, et le jeton ne donne que la lecture d'une offre publiée.
 *
 * Règle du 404 hors de ses classes (plan, § 5) : un brouillon vu par un étudiant, l'offre d'un
 * autre auteur et une offre inexistante répondent le même corps 404. Le 403 est réservé à la
 * capacité (qui a le droit de publier), jamais à l'existence d'une offre.
 */

const MESSAGES = {
    titre: "Le titre de l'offre : 5 à 150 caractères",
    entreprise: "Le nom de l'entreprise : 2 à 150 caractères",
    ville: "La ville : 2 à 100 caractères",
    description: "La description : 30 à 5 000 caractères",
    niveau: "Le niveau : 50 caractères au plus",
    dates: "Les dates vont au format AAAA-MM-JJ, et la fin ne précède pas le début",
    gratification: "La gratification : un montant entre 0 et 100 000, deux décimales au plus",
    devise: "La devise ne fait pas partie de la liste",
    lien: "Le lien de candidature : une adresse http ou https, 500 caractères au plus",
    email: "Le courriel de contact n'est pas valide",
};

const AVEC = [
    { model: Filiere, as: "filiere", attributes: ["id_filiere", "nom_filiere"] },
    { model: Users, as: "auteur", attributes: ["id_user", "nom", "prenom"] },
];

const JETON = /^[0-9a-f]{32}$/;
const introuvable = () => new ErreurMetier("Offre de stage introuvable", 404);
const enDate = (valeur) => (valeur ? String(valeur).slice(0, 10) : null);

// ── Droits ───────────────────────────────────────────────────────────────

/** Administration : tout. Enseignant : les filières dont il est responsable, et rien d'autre. */
const droitsDe = async (user) => {
    if (user.role === "admin") return { tout: true, filieres: null };
    if (user.role !== "enseignant") throw new ErreurMetier("Réservé à l'administration et aux enseignants", 403);
    const filieres = await filieresDuResponsable(user.id_user);
    if (!filieres.length) throw new ErreurMetier("Réservé à l'administration et aux responsables de filière", 403);
    return { tout: false, filieres: new Set(filieres) };
};

/** Filière de l'offre : obligatoire pour un enseignant (il n'écrit que chez lui), facultative pour l'administration. */
const filiereAutorisee = async (droits, valeur) => {
    if (valeur === null || valeur === undefined || valeur === "") {
        if (droits.tout) return null;
        throw new ErreurMetier("Indiquez la filière de l'offre", 400, "OFFRE_INVALIDE");
    }
    const id = Number(valeur);
    if (!Number.isInteger(id) || id <= 0) throw new ErreurMetier("Filière invalide", 400, "OFFRE_INVALIDE");
    if (!(await Filiere.findByPk(id))) throw new ErreurMetier("Filière introuvable", 404);
    if (!droits.tout && !droits.filieres.has(id)) throw new ErreurMetier("Vous n'êtes pas responsable de cette filière", 403);
    return id;
};

/** L'offre que l'utilisateur peut modifier : la sienne, ou n'importe laquelle pour l'administration. */
const offreModifiable = async (user, id) => {
    const offre = await OffreStage.findByPk(id);
    if (!offre) throw introuvable();
    if (user.role !== "admin" && offre.id_user_auteur !== user.id_user) throw introuvable();
    return offre;
};

// ── Vues ─────────────────────────────────────────────────────────────────

/** Vue complète : personnel et étudiants connectés. */
const presenter = (offre) => ({
    id: offre.id_offre_stage,
    titre: offre.titre,
    entreprise: offre.entreprise,
    ville: offre.ville,
    description: offre.description,
    id_filiere: offre.id_filiere,
    filiere: offre.filiere?.nom_filiere ?? null,
    niveau: offre.niveau,
    debut: enDate(offre.debut),
    fin: enDate(offre.fin),
    gratification: offre.gratification === null || offre.gratification === undefined ? null : Number(offre.gratification),
    devise: offre.devise,
    lien_candidature: offre.lien_candidature,
    contact_email: offre.contact_email,
    statut: offre.statut,
    jeton_partage: offre.jeton_partage,
    publiee_le: offre.publiee_le,
    auteur: offre.auteur ? `${offre.auteur.prenom} ${offre.auteur.nom}`.trim() : null,
    id_user_auteur: offre.id_user_auteur,
    creee_le: offre.createdAt,
    modifiee_le: offre.updatedAt,
});

/** Vue publique : ni auteur, ni statut, ni identifiant interne — le jeton fait l'adresse. */
const presenterPubliquement = (offre) => ({
    titre: offre.titre,
    entreprise: offre.entreprise,
    ville: offre.ville,
    description: offre.description,
    filiere: offre.filiere?.nom_filiere ?? null,
    niveau: offre.niveau,
    debut: enDate(offre.debut),
    fin: enDate(offre.fin),
    gratification: offre.gratification === null || offre.gratification === undefined ? null : Number(offre.gratification),
    devise: offre.devise,
    lien_candidature: offre.lien_candidature,
    contact_email: offre.contact_email,
    publiee_le: offre.publiee_le,
});

const relire = (id) => OffreStage.findByPk(id, { include: AVEC });

// ── Lecture ──────────────────────────────────────────────────────────────

/**
 * Liste : un étudiant ne voit que les offres publiées ; le personnel les voit toutes.
 * Filtres : `statut`, `id_filiere`, `niveau`.
 */
export const offresVisibles = async (user, { statut, id_filiere: idFiliere, niveau } = {}) => {
    const where = {};
    if (user.role === "etudiant") {
        // Un étudiant qui demande un autre statut ne voit rien : on ne révèle pas les brouillons
        if (statut && statut !== "publiee") return [];
        where.statut = "publiee";
    } else if (statut) {
        if (!STATUTS_OFFRE_STAGE.includes(statut)) throw new ErreurMetier("Statut inconnu", 400, "OFFRE_INVALIDE");
        where.statut = statut;
    }
    if (idFiliere !== undefined && idFiliere !== null && idFiliere !== "") {
        const id = Number(idFiliere);
        if (!Number.isInteger(id) || id <= 0) throw new ErreurMetier("Filière invalide", 400, "OFFRE_INVALIDE");
        where.id_filiere = id;
    }
    if (typeof niveau === "string" && niveau.trim()) where.niveau = niveau.trim();

    const offres = await OffreStage.findAll({
        where,
        include: AVEC,
        // Les offres publiées d'abord ; les brouillons, sans date de publication, en fin de liste
        order: [
            ["publiee_le", "DESC"],
            ["id_offre_stage", "DESC"],
        ],
    });
    return offres.map(presenter);
};

/** Une offre : un étudiant sur un brouillon ou une offre close reçoit le 404 d'une offre inexistante. */
export const detailOffre = async (user, id) => {
    const offre = await OffreStage.findByPk(id, { include: AVEC });
    if (!offre) throw introuvable();
    if (user.role === "etudiant" && offre.statut !== "publiee") throw introuvable();
    return presenter(offre);
};

/** Fiche partagée : offre publiée seulement, sans compte, sans auteur ni statut. */
export const offrePublique = async (jeton) => {
    if (typeof jeton !== "string" || !JETON.test(jeton)) throw introuvable();
    const offre = await OffreStage.findOne({
        where: { jeton_partage: jeton, statut: "publiee" },
        include: [{ model: Filiere, as: "filiere", attributes: ["id_filiere", "nom_filiere"] }],
    });
    if (!offre) throw introuvable();
    return presenterPubliquement(offre);
};

// ── Écriture ─────────────────────────────────────────────────────────────

export const creerOffre = async (user, corps = {}) => {
    const droits = await droitsDe(user);
    const { motif, offre } = verifierOffre(corps);
    if (motif) throw new ErreurMetier(MESSAGES[motif], 400, "OFFRE_INVALIDE");
    const idFiliere = await filiereAutorisee(droits, corps.id_filiere);
    const creee = await OffreStage.create({ ...offre, id_filiere: idFiliere, id_user_auteur: user.id_user, statut: "brouillon" });
    return presenter(await relire(creee.id_offre_stage));
};

export const modifierOffre = async (user, id, corps = {}) => {
    const offre = await offreModifiable(user, id);
    const { motif, offre: contenu } = verifierOffre(corps);
    if (motif) throw new ErreurMetier(MESSAGES[motif], 400, "OFFRE_INVALIDE");
    // La filière ne change que si le corps en donne une : le reste de la fiche se met à jour sans la toucher
    const idFiliere = corps.id_filiere === undefined ? offre.id_filiere : await filiereAutorisee(await droitsDe(user), corps.id_filiere);
    // Une offre déjà publiée ne peut pas perdre son moyen de postuler dans une modification
    if (offre.statut !== "brouillon" && manquesPourPublier(contenu).length) {
        throw new ErreurMetier("Une offre publiée garde un lien de candidature ou un courriel de contact", 400, "OFFRE_INCOMPLETE");
    }
    await offre.update({ ...contenu, id_filiere: idFiliere });
    return presenter(await relire(offre.id_offre_stage));
};

/**
 * Publication et fermeture : `publiee` depuis un brouillon ou une offre close, `close` depuis une
 * offre publiée. Rejouer le même statut ne change rien (double clic sans erreur).
 */
export const changerStatutOffre = async (user, id, statut) => {
    if (!["publiee", "close"].includes(statut)) throw new ErreurMetier("Statut de publication invalide", 400, "OFFRE_INVALIDE");
    const offre = await offreModifiable(user, id);
    if (offre.statut === statut) return presenter(await relire(id));

    if (statut === "close") {
        if (offre.statut !== "publiee") throw new ErreurMetier("Seule une offre publiée se ferme", 409, "OFFRE_NON_PUBLIEE");
        await offre.update({ statut: "close" });
    } else {
        // Première publication : il faut un moyen de postuler, puis le jeton de partage naît ici
        if (manquesPourPublier(offre).length) {
            throw new ErreurMetier("Une offre se publie avec un lien de candidature ou un courriel de contact", 400, "OFFRE_INCOMPLETE");
        }
        await offre.update({
            statut: "publiee",
            jeton_partage: offre.jeton_partage ?? crypto.randomBytes(16).toString("hex"),
            publiee_le: offre.publiee_le ?? new Date(),
        });
    }
    return presenter(await relire(id));
};

/** Suppression : refusée tant que l'offre est publiée (la fermer d'abord, le lien public cesse alors de répondre). */
export const supprimerOffre = async (user, id) => {
    const offre = await offreModifiable(user, id);
    if (offre.statut === "publiee") throw new ErreurMetier("Fermez l'offre avant de la supprimer", 409, "OFFRE_PUBLIEE");
    await offre.destroy();
};
