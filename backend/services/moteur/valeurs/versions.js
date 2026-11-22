import { ValeurParametre, VersionParametres } from "../../../models/index.js";
import { ErreurMetier } from "../../planning/enseignements.js";
import { AVEC_CONTRAINTES, contenuDeLaVersion, enregistrerContraintes, enregistrerInverses, inversesDesContraintes, preparerContraintes } from "../contraintes/versionsContraintes.js";
import { avecRepriseSurInterblocage, conflitsAvecLaBase, exigerBase, versionsApresLaBase } from "./concurrence.js";
import { controlerEcriture } from "./ecriture.js";
import { aujourdhui, leCatalogue, lireLignes, valeursEnVigueur } from "./lecture.js";
import { controlerBornes } from "./reglagesEcole.js";
import { lignesDesChoix } from "./valeursDeLEcole.js";

/**
 * Versions des réglages du moteur (lot MP-1, D-07) : un brouillon se prépare, puis s'applique en une
 * fois ; ensuite il ne change plus (I-D5), et l'annuler crée une version inverse. Le chemin passe par
 * le modèle plutôt que par config/db.js : la connexion ne s'importe pas hors de models/ (R-2).
 * Une version porte aussi les contraintes déclarées par l'école (MOT-13) : même cycle, mêmes contrôles
 * refaits à l'application. Le panneau de configuration (ADM-02) crée et applique d'un coup, avec la
 * version de base qu'il a lue (concurrence.js) ; son aperçu est dans apercu.js.
 */

/** Réglages refusés (400), ou dépassés par une version plus récente (409) : la route rend la liste, chacun avec son code et sa phrase. */
export class ErreurReglages extends ErreurMetier {
    constructor(violations, { message = "Ces réglages sont refusés", status = 400, code = "REGLAGES_REFUSES" } = {}) {
        super(message, status, code);
        this.violations = violations;
    }
}

const ETABLISSEMENT = "etablissement";
const transaction = (travail) => VersionParametres.sequelize.transaction(travail);

/** Une ligne de version telle qu'elle s'enregistre : portée « etablissement » par défaut, identifiant en chaîne. */
export const normaliser = (l) => ({
    cle: l.cle,
    portee: l.portee ?? ETABLISSEMENT,
    id_portee: l.id_portee === undefined || l.id_portee === null ? "" : String(l.id_portee),
    valeur: l.valeur,
    force: l.force,
    poids: l.poids,
    retiree: Boolean(l.retiree),
});

const cleDeCible = (l) => `${l.portee}|${l.id_portee}`;
const cibleDe = (l) => (l.portee === ETABLISSEMENT ? {} : { [l.portee]: l.id_portee });

/**
 * Contrôle toutes les lignes d'une version. Les bornes s'essaient avec les autres lignes de la même
 * cible déjà posées : changer ensemble un minimum et un maximum ne doit pas être refusé à tort.
 */
export const controler = async (lignes, auteur, date, options) => {
    const { parametres, dependances } = leCatalogue();
    const parId = new Map(parametres.map((p) => [p.id, p]));
    const violations = [];
    const signaler = (l, code, message) => violations.push({ cle: l.cle, portee: l.portee, id_portee: l.id_portee, code, message });

    const vues = new Set();
    const valeursDe = new Map();
    for (const l of lignes) {
        const p = parId.get(l.cle);
        if (!p) {
            signaler(l, "parametre_inconnu", `Aucun paramètre « ${l.cle} ».`);
            continue;
        }
        const cle = `${l.cle}|${cleDeCible(l)}`;
        if (vues.has(cle)) signaler(l, "doublon", "Ce réglage figure deux fois dans la version.");
        vues.add(cle);
        if ((l.portee === ETABLISSEMENT) !== (l.id_portee === "")) signaler(l, "cible_invalide", "Un réglage d'établissement n'a pas d'identifiant, les autres en ont un.");
        if (!l.retiree && l.valeur === undefined && l.force === undefined && l.poids === undefined) signaler(l, "ligne_vide", "Ce réglage ne change rien.");

        const cibleCle = cleDeCible(l);
        if (!valeursDe.has(cibleCle)) {
            const { valeurs } = await valeursEnVigueur({ date, cible: cibleDe(l), ...options });
            for (const autre of lignes.filter((x) => cleDeCible(x) === cibleCle && x.valeur !== undefined && !x.retiree)) valeurs.set(autre.cle, autre.valeur);
            valeursDe.set(cibleCle, valeurs);
        }
        const refus = controlerEcriture({ parametre: p, portee: l.portee, valeur: l.retiree ? undefined : l.valeur, force: l.force, poids: l.poids, auteur, valeurs: valeursDe.get(cibleCle), dependances });
        for (const r of refus) signaler(l, r.code, r.message);
        // Les bornes de l'écran des cinq réglages du panneau (ADM-02, § 5.2), en plus de celles du catalogue
        if (!refus.length && !l.retiree) for (const r of controlerBornes(l.cle, l.valeur)) signaler(l, r.code, r.message);
    }
    return violations;
};

export const exigerDate = (date) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? "")) throw new ErreurMetier("La date d'effet s'écrit AAAA-MM-JJ", 400, "DATE_EFFET_INVALIDE");
    if (date < aujourdhui()) throw new ErreurMetier("La date d'effet est passée : un réglage ne change pas le passé", 400, "DATE_EFFET_PASSEE");
};

const nombre = (liste) => (Array.isArray(liste) ? liste.length : 0);

/**
 * Contrôle le contenu d'une version sans rien écrire : réglages, choix des règles (changés en lignes),
 * contraintes ajoutées et retirées. Sert à la création et à l'aperçu (apercu.js).
 * @returns {Promise<{ normalisees: object[], preparees: object, violations: object[] }>}
 */
export const preparerVersion = async ({ date_effet, lignes = [], contraintes = [], retirer = [], regles = [] }, auteur, options = {}) => {
    if (!Array.isArray(lignes)) throw new ErreurMetier("« lignes » est une liste", 400, "VERSION_VIDE");
    const choix = await lignesDesChoix(regles, { date: date_effet, ...options });
    const normalisees = [...lignes, ...choix.lignes].map(normaliser);
    const preparees = await preparerContraintes({ contraintes, retirer }, { date: date_effet, ...options });
    const violations = [...choix.violations, ...(await controler(normalisees, auteur, date_effet, options)), ...preparees.violations];
    return { normalisees, preparees, violations };
};

const enregistrer = async (champs, { normalisees, preparees }, t) => {
    const version = await VersionParametres.create(champs, { transaction: t });
    await ValeurParametre.bulkCreate(normalisees.map((l) => ({ ...l, id_version: version.id_version })), { transaction: t });
    await enregistrerContraintes(version.id_version, preparees, t);
    return version;
};

const nomDe = (id) => leCatalogue().parametres.find((p) => p.id === id)?.nom ?? id;

/**
 * Crée une version (réglages, choix des règles, contraintes ajoutées et retirées). Par défaut un brouillon,
 * sans effet tant qu'il n'est pas appliqué. Avec `appliquer` et la `base` lue par l'écran (ADM-02, R-4) :
 * créée et appliquée dans une seule transaction, ou 409 VERSION_DEPASSEE.
 */
export const creerVersion = async ({ libelle, date_effet = aujourdhui(), lignes = [], contraintes = [], retirer = [], regles = [], id_auteur, auteur, appliquer = false, base }) => {
    exigerDate(date_effet);
    if (!Array.isArray(lignes) || !(nombre(lignes) + nombre(contraintes) + nombre(retirer) + nombre(regles))) throw new ErreurMetier("Une version contient au moins un réglage ou une contrainte", 400, "VERSION_VIDE");
    const contenu = { date_effet, lignes, contraintes, retirer, regles };
    if (!appliquer) {
        const prete = await preparerVersion(contenu, auteur);
        if (prete.violations.length) throw new ErreurReglages(prete.violations);
        return transaction((t) => enregistrer({ libelle, date_effet, statut: "brouillon", id_auteur }, prete, t));
    }
    exigerBase(base);
    return avecRepriseSurInterblocage(() =>
        transaction(async (t) => {
            const recentes = await versionsApresLaBase(base, { transaction: t });
            const prete = await preparerVersion(contenu, auteur, { transaction: t });
            const conflits = conflitsAvecLaBase({ lignes: prete.normalisees, retraits: prete.preparees.retraits, recentes, nomDe });
            if (conflits.length) throw new ErreurReglages(conflits, { status: 409, code: "VERSION_DEPASSEE", message: "Les réglages ont changé depuis votre ouverture : rechargez la page" });
            if (prete.violations.length) throw new ErreurReglages(prete.violations);
            return enregistrer({ libelle, date_effet, statut: "appliquee", appliquee_le: new Date(), id_auteur }, prete, t);
        })
    );
};

const verrouiller = async (id, t) => {
    const version = await VersionParametres.findByPk(id, { include: [{ model: ValeurParametre, as: "valeurs" }, AVEC_CONTRAINTES()], transaction: t, lock: t.LOCK.UPDATE });
    if (!version) throw new ErreurMetier("Version introuvable", 404);
    return version;
};

/** Applique un brouillon, d'un seul coup. Les contrôles se refont : les réglages ont pu bouger depuis. */
export const appliquerVersion = (id, { auteur }) =>
    transaction(async (t) => {
        const version = await verrouiller(id, t);
        if (version.statut !== "brouillon") throw new ErreurMetier("Seul un brouillon s'applique", 409, "VERSION_NON_BROUILLON");
        exigerDate(version.date_effet);
        const lignes = version.valeurs.map((v) => normaliser({ ...v.get(), force: v.force ?? undefined, poids: v.poids ?? undefined, valeur: v.valeur === null && !v.retiree ? undefined : v.valeur }));
        const preparees = await preparerContraintes(contenuDeLaVersion(version), { date: version.date_effet, transaction: t });
        const violations = [...(await controler(lignes, auteur, version.date_effet, { transaction: t })), ...preparees.violations];
        if (violations.length) throw new ErreurReglages(violations);
        return version.update({ statut: "appliquee", appliquee_le: new Date() }, { transaction: t });
    });

/** Abandonne un brouillon. Il reste dans l'historique. */
export const abandonnerVersion = (id) =>
    transaction(async (t) => {
        const version = await verrouiller(id, t);
        if (version.statut !== "brouillon") throw new ErreurMetier("Seul un brouillon s'abandonne : une version appliquée s'annule", 409, "VERSION_NON_BROUILLON");
        return version.update({ statut: "annulee" }, { transaction: t });
    });

// Ordre de deux lignes dans le temps : la date d'effet, puis le numéro de version
const apres = (a, b) => a.date_effet > b.date_effet || (a.date_effet === b.date_effet && a.id_version > b.id_version);

/**
 * Annule une version appliquée en créant son inverse, sans la modifier : chaque réglage reprend sa
 * valeur précédente, ou redescend d'un cran s'il n'en avait pas. Refusé si une version plus récente
 * touche le même réglage : l'annuler écraserait ce qu'elle a décidé.
 */
export const annulerVersion = (id, { id_auteur, auteur }) =>
    transaction(async (t) => {
        const version = await verrouiller(id, t);
        if (version.statut !== "appliquee") throw new ErreurMetier("Seule une version appliquée s'annule", 409, "VERSION_NON_APPLIQUEE");
        if (await VersionParametres.findOne({ where: { annule_version: version.id_version }, transaction: t })) throw new ErreurMetier("Cette version a déjà été annulée", 409, "VERSION_DEJA_ANNULEE");
        if (auteur !== "plateforme" && version.valeurs.some((v) => v.force)) throw new ErreurMetier("Cette version change la force d'une règle : seule la Plateforme peut l'annuler", 403, "DROIT_INSUFFISANT");

        const ref = { date_effet: version.date_effet, id_version: version.id_version };
        const toutes = await lireLignes({ transaction: t });
        const memeReglage = (v) => (l) => l.cle === v.cle && l.portee === v.portee && (l.id_portee ?? "") === v.id_portee && l.id_version !== version.id_version;
        const inverses = [];
        for (const v of version.valeurs) {
            const autres = toutes.filter(memeReglage(v));
            if (autres.some((l) => apres(l, ref))) throw new ErreurMetier(`Une version plus récente change « ${v.cle} » : annulez-la d'abord`, 409, "VERSION_PLUS_RECENTE");
            const precedente = autres.filter((l) => apres(ref, l)).sort((a, b) => (apres(a, b) ? -1 : 1))[0];
            const reprend = precedente && !precedente.retiree;
            inverses.push({ cle: v.cle, portee: v.portee, id_portee: v.id_portee, valeur: reprend ? precedente.valeur : null, force: reprend ? precedente.force ?? null : null, poids: reprend ? precedente.poids ?? null : null, retiree: !reprend });
        }
        const inversesContraintes = await inversesDesContraintes(version, t);
        const jour = aujourdhui();
        const inverse = await VersionParametres.create(
            { libelle: `Annulation de la version ${version.id_version}`, date_effet: version.date_effet > jour ? version.date_effet : jour, statut: "appliquee", appliquee_le: new Date(), id_auteur, annule_version: version.id_version },
            { transaction: t }
        );
        await ValeurParametre.bulkCreate(inverses.map((l) => ({ ...l, id_version: inverse.id_version })), { transaction: t });
        await enregistrerInverses(inverse.id_version, inversesContraintes, t);
        return inverse;
    });

// La liste et le détail des versions sont dans historique.js (ADM-02, R-3)
