import { chargerDependances, chargerParametres, chargerProfils } from "../../services/moteur/catalogue/charger.js";
import { REGLAGES_ECOLE } from "../../services/moteur/valeurs/reglagesEcole.js";
import { resoudreTout } from "../../services/moteur/valeurs/resolution.js";
import { resoudreALEcole } from "../../services/moteur/valeurs/valeursDeLEcole.js";

// ADM-02 : la lecture ciblée de quelques réglages donne exactement la résolution complète de MP-1.

const parametres = chargerParametres();
const dependances = chargerDependances();
const profils = chargerProfils();
const ligne = (cle, valeur, plus = {}) => ({ cle, portee: "etablissement", id_portee: null, valeur, statut: "appliquee", date_effet: "2026-09-01", id_version: 1, ...plus });
const IDS = [...REGLAGES_ECOLE.map((r) => r.id), "HOR.REGLE.TROUS", "SAL.REGLE.TAILLE_ADAPTEE"];

const comparer = (lignes, date = "2026-11-22") => {
    const complet = resoudreTout({ parametres, profils, dependances, lignes, date }).resultats;
    const cible = resoudreALEcole({ parametres, profils, lignes, date, ids: IDS });
    for (const id of IDS) {
        const { valeur, force, poids, origine } = complet.get(id);
        expect([id, cible.get(id)]).toEqual([id, expect.objectContaining({ valeur, force, poids, origine })]);
    }
    return cible;
};

describe("ADM-02 : lecture ciblée à la portée de l'école", () => {
    test("sans aucune ligne : le catalogue", () => {
        expect(comparer([]).get("HOR.REGLE.MAX_H_JOUR_GROUPE").valeur).toBe(480);
    });

    test("profil, valeurs et poids de l'école, une ligne retirée, une version future, une portée plus fine ignorée", () => {
        const r = comparer([
            ligne("ETA.ID.PROFIL", "universite"),
            ligne("HOR.REGLE.MAX_H_JOUR_GROUPE", 420),
            ligne("HOR.REGLE.TROUS", true, { poids: 15 }),
            ligne("SAL.REGLE.TAILLE_ADAPTEE", false, { id_version: 2 }),
            ligne("SAL.REGLE.TAILLE_ADAPTEE", null, { id_version: 3, retiree: true }),
            ligne("LOG.TRAJET.CAMPUS_DEFAUT", 45, { date_effet: "2027-01-01", id_version: 4 }),
            ligne("ENS.CHARGE.MAX_H_JOUR", 300, { portee: "filiere", id_portee: "3" }),
        ]);
        expect(r.get("HOR.REGLE.MAX_H_JOUR_GROUPE").valeur).toBe(420);
        expect([r.get("HOR.REGLE.TROUS").poids, r.get("HOR.REGLE.TROUS").poids_du_profil]).toEqual([15, 5]);
        expect(r.get("SAL.REGLE.TAILLE_ADAPTEE").valeur).toBe(true);
        expect(r.get("LOG.TRAJET.CAMPUS_DEFAUT").valeur).toBe(30);
        expect(r.get("ENS.CHARGE.MAX_H_JOUR").valeur).toBe(480);
    });

    test("la version future compte à sa date", () => {
        expect(comparer([ligne("LOG.TRAJET.CAMPUS_DEFAUT", 45, { date_effet: "2027-01-01" })], "2027-01-01").get("LOG.TRAJET.CAMPUS_DEFAUT").valeur).toBe(45);
    });
});
