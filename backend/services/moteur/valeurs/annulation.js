import { ValeurParametre, VersionParametres } from "../../../models/index.js";
import { ErreurMetier } from "../../planning/enseignements.js";
import { enregistrerInverses, inversesDesContraintes } from "../contraintes/versionsContraintes.js";
import { aujourdhui, lireLignes } from "./lecture.js";
import { verrouiller } from "./versions.js";

/**
 * Annulation d'une version appliquée des réglages du moteur (lot MP-1, I-D5) : la version ne change
 * jamais ; son inverse est créée et appliquée. Sortie de versions.js (ADM-02, au-delà de 200 lignes),
 * sans changement de comportement.
 */

const transaction = (travail) => VersionParametres.sequelize.transaction(travail);

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
