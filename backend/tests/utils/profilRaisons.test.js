import { chargerDependances, chargerParametres, chargerProfils } from "../../services/moteur/catalogue/charger.js";
import { listeDuProfil } from "../../services/moteur/contraintes/profil.js";
import { resoudreTout } from "../../services/moteur/valeurs/resolution.js";

// ADM-02, réponse 17 : la raison « sans effet » de la liste du profil existe en données
// (raison_code, conditions), pour être traduite par le site ; la phrase française ne change pas.

const parametres = chargerParametres();
const dependances = chargerDependances();
const profils = chargerProfils();
const ligne = (cle, valeur) => ({ cle, portee: "etablissement", id_portee: null, valeur, statut: "appliquee", date_effet: "2026-09-01", id_version: 1 });

const liste = (campus, lignes = []) => {
    const { resultats, valeurs } = resoudreTout({ parametres, profils, dependances, lignes: [ligne("ETA.ID.PROFIL", "universite"), ...lignes], date: "2026-11-22", faits: { "ETA.TAILLE.CAMPUS": campus } });
    return new Map(listeDuProfil({ parametres, dependances, resultats, valeurs }).map((r) => [r.id, r]));
};

describe("ADM-02 : la raison « sans effet » en données", () => {
    test("un seul campus : condition non remplie, avec le nombre de campus attendu et le nombre actuel", () => {
        const r = liste(1).get("HOR.REGLE.UN_CAMPUS_PAR_JOUR");
        expect(r.etat).toBe("sans_effet");
        expect(r.raison_code).toBe("condition_non_remplie");
        expect(r.conditions).toEqual([{ parametre: "ETA.TAILLE.CAMPUS", op: ">=", attendu: 2, actuelle: 1 }]);
        expect(r.raison).toMatch(/il faut au moins 2/);
    });

    test("la règle du distanciel : la modalité attendue et la modalité actuelle", () => {
        const r = liste(2).get("SAL.REGLE.DISTANCIEL_SANS_SALLE");
        expect(r.raison_code).toBe("condition_non_remplie");
        expect(r.conditions).toEqual([{ parametre: "MAT.VOL.MODALITE", op: "=", attendu: "distanciel", actuelle: "presentiel" }]);
    });

    test("une règle sans valeur : aucune_valeur, sans condition", () => {
        const r = liste(2).get("PRF.ENS.CRENEAUX_PREFERES");
        expect([r.etat, r.raison_code, r.conditions]).toEqual(["sans_effet", "aucune_valeur", []]);
    });

    test("une règle active ou coupée n'a pas de raison", () => {
        const actives = liste(2);
        expect([actives.get("HOR.REGLE.UN_CAMPUS_PAR_JOUR").raison_code, actives.get("HOR.REGLE.UN_CAMPUS_PAR_JOUR").conditions]).toEqual([null, []]);
        const coupee = liste(2, [ligne("HOR.REGLE.TROUS", false)]).get("HOR.REGLE.TROUS");
        expect([coupee.etat, coupee.raison_code, coupee.conditions]).toEqual(["coupee", null, []]);
    });

    test("le verrou ne change pas : règles strictes verrouillées, plafonds et vœux non", () => {
        const l = liste(2);
        expect(l.get("SAL.REGLE.CONFLIT").verrouillee).toBe(true);
        expect(l.get("SAL.REGLE.DISTANCIEL_SANS_SALLE").verrouillee).toBe(true);
        expect(l.get("HOR.REGLE.MAX_H_JOUR_GROUPE").verrouillee).toBe(false);
        expect(l.get("PRF.ENS.CRENEAUX_PREFERES").verrouillee).toBe(false);
    });
});
