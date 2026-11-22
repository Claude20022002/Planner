import crypto from "node:crypto";
import { AppelSeance, Presence } from "../../models/index.js";
import { ErreurMetier } from "../planning/enseignements.js";
import { aujourdhui } from "../planning/affectationRules.js";
import { journaliser } from "../journalSecurite.js";
import { seanceDeLEnseignant, STATUTS_FERMABLES } from "./appel.js";

/**
 * Appel saisi après coup (M-1, étude EP-18, docs/conception/emploi-du-temps/edt-feuille-appel.md) :
 * l'appel fait sur papier se saisit à la main (statuts.js), puis se termine dans les 7 jours qui
 * suivent la séance. Il compte alors comme un appel fait (taux de présence, heures payées), mais le
 * visa le montre à part, « appel saisi après coup », pour que l'administration le repère (réponse du
 * chef, 22 nov. : « compte, et se voit »). Sans migration : l'appel est créé déjà fermé, et son secret
 * commence par PREFIXE_APRES_COUP (il ne signe jamais de QR ; un secret ordinaire est en base64url,
 * sans point).
 */

export const DELAI_APRES_COUP_JOURS = 7;
export const PREFIXE_APRES_COUP = "apres-coup.";

/** Vrai si l'appel a été saisi après coup (lecture de la ligne d'AppelSeance, secret compris). */
export const estApresCoup = (appel) => String(appel?.secret ?? "").startsWith(PREFIXE_APRES_COUP);

const plusJours = (date, n) => new Date(Date.parse(`${String(date).slice(0, 10)}T12:00:00Z`) + n * 24 * 3600 * 1000).toISOString().slice(0, 10);

/** Dernier jour (AAAA-MM-JJ) où l'appel d'une séance peut encore être terminé après coup. */
export const limiteApresCoup = (dateSeance) => plusJours(dateSeance, DELAI_APRES_COUP_JOURS);

/** Vrai si, ce jour-là (date de l'école), l'appel de la séance se termine après coup : du lendemain au 7e jour inclus. */
export const dansLeDelai = (dateSeance, jour) => {
    const date = String(dateSeance).slice(0, 10);
    return date < jour && jour <= limiteApresCoup(date);
};

/**
 * État d'une séance pour la page de l'appel, calculé ici à la date de l'école (l'écran ne calcule
 * aucune date) : « annulee », « a_venir », « jour » (appel ordinaire, QR), « ferme » ou « ouvert »
 * (un appel existe), « apres_coup » (à saisir, jusqu'à `saisie_possible_jusqu_au`) ou « hors_delai »
 * (en lecture seule).
 */
export const etatPourLAppel = async (user, id) => {
    const seance = await seanceDeLEnseignant(user, id);
    const date = String(seance.date_seance).slice(0, 10);
    const jour = aujourdhui();
    const appel = await AppelSeance.findByPk(seance.id_affectation, { attributes: ["ferme_le"] });
    let mode;
    if (seance.statut === "annule") mode = "annulee";
    else if (appel) mode = appel.ferme_le ? "ferme" : "ouvert";
    else if (date > jour) mode = "a_venir";
    else if (date === jour) mode = "jour";
    else mode = dansLeDelai(date, jour) ? "apres_coup" : "hors_delai";
    return { mode, saisie_possible_jusqu_au: mode === "apres_coup" ? limiteApresCoup(date) : null };
};

/**
 * Termine après coup l'appel d'une séance passée sans appel : enseignant de la séance ou
 * administration, dans le délai, à la date de l'école. La séance passe à « réalisée » si elle ne
 * l'est pas encore ; l'action est journalisée avec son heure réelle.
 */
export const terminerApresCoup = async (user, id, contexte = null, maintenant = new Date()) => {
    const seance = await seanceDeLEnseignant(user, id);
    // Comme ouvrirAppel : une séance annulée ne reçoit pas d'appel, qui compterait dans les taux
    if (seance.statut === "annule") throw new ErreurMetier("Séance annulée", 409);
    const date = String(seance.date_seance).slice(0, 10);
    const jour = aujourdhui();
    if (date >= jour) throw new ErreurMetier(date === jour ? "L'appel du jour se fait depuis la page de l'appel, puis se termine" : "Cette séance n'a pas encore eu lieu", 409);
    if (!dansLeDelai(date, jour)) throw new ErreurMetier(`Le délai de saisie après coup est passé (jusqu'au ${limiteApresCoup(date)}) : l'administration peut confirmer la séance dans le suivi`, 409);
    if (await AppelSeance.findByPk(seance.id_affectation)) throw new ErreurMetier("L'appel de cette séance existe déjà : terminez-le depuis sa page", 409);
    try {
        await AppelSeance.create({
            id_affectation: seance.id_affectation,
            secret: `${PREFIXE_APRES_COUP}${crypto.randomBytes(24).toString("hex")}`,
            ouvert_le: maintenant,
            ferme_le: maintenant,
            id_user_ouverture: user.id_user,
        });
    } catch (err) {
        // Deux envois en même temps : le second trouve l'appel déjà créé
        if (err?.name === "SequelizeUniqueConstraintError") throw new ErreurMetier("L'appel de cette séance existe déjà : terminez-le depuis sa page", 409);
        throw err;
    }
    if (STATUTS_FERMABLES.includes(seance.statut)) await seance.update({ statut: "realise" });
    const presents = await Presence.count({ where: { id_affectation: seance.id_affectation } });
    await journaliser(contexte, { evenement: "appel_saisi_apres_coup", user, details: { id_affectation: seance.id_affectation, date_seance: date, presents } });
    return { presents, statut: seance.statut, apres_coup: true };
};
