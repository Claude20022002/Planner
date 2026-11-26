import { chargerDependances, chargerParametres, chargerProfils } from "../../services/moteur/catalogue/charger.js";
import { listeDuProfil } from "../../services/moteur/contraintes/profil.js";
import { poidsDesRegles } from "../../services/moteur/valeurs/poidsDuSolveur.js";
import { reglesReglables } from "../../services/moteur/valeurs/reglagesEcole.js";
import { resoudreTout } from "../../services/moteur/valeurs/resolution.js";

// ADM-02, réponse 16 : ce que le panneau laisse régler est lu par le solveur, et rien n'est envoyé au
// solveur sans être montré. Profil par profil, sans ligne d'école.

const parametres = chargerParametres();
const dependances = chargerDependances();
const profils = chargerProfils();
const parRegleSolveur = new Map(parametres.filter((p) => p.regle_solveur).map((p) => [p.regle_solveur, p]));

const pourLeProfil = (code) => {
    const lignes = [{ cle: "ETA.ID.PROFIL", portee: "etablissement", id_portee: null, valeur: code, statut: "appliquee", date_effet: "2026-09-01", id_version: 1 }];
    return resoudreTout({ parametres, profils, dependances, lignes, date: "2026-11-22", faits: { "ETA.TAILLE.CAMPUS": 2 } });
};

describe("ADM-02 : les règles réglables du panneau et celles que lit le solveur", () => {
    test("le catalogue a cinq profils", () => {
        expect(profils.map((p) => p.code).sort()).toEqual(["college", "formation", "lycee", "primaire", "universite"]);
    });

    test.each(profils.map((p) => p.code))("profil %s : chaque règle réglable est envoyée au solveur", (code) => {
        const { resultats } = pourLeProfil(code);
        const envoyees = Object.keys(poidsDesRegles({ parametres, resultats }));
        const reglables = reglesReglables({ parametres, resultats });
        expect(reglables.length).toBeGreaterThan(0);
        const absentes = reglables.filter((id) => !envoyees.includes(parametres.find((p) => p.id === id).regle_solveur));
        expect(absentes).toEqual([]);
    });

    test.each(profils.map((p) => p.code))("profil %s : une règle envoyée et non réglable est montrée verrouillée, ou réglée par l'enseignant", (code) => {
        const { resultats, valeurs } = pourLeProfil(code);
        const reglables = reglesReglables({ parametres, resultats });
        const liste = new Map(listeDuProfil({ parametres, dependances, resultats, valeurs }).map((r) => [r.id, r]));
        const nonMontrees = Object.keys(poidsDesRegles({ parametres, resultats }))
            .map((nom) => parRegleSolveur.get(nom))
            .filter((p) => !reglables.includes(p.id))
            .filter((p) => !(liste.get(p.id)?.verrouillee || p.modifiable === "personne"));
        expect(nonMontrees.map((p) => p.id)).toEqual([]);
    });

    test("profil université : les six règles du plan (§ 2)", () => {
        const { resultats } = pourLeProfil("universite");
        expect(reglesReglables({ parametres, resultats }).sort()).toEqual(
            ["HOR.REGLE.CHANGEMENT_SALLE", "HOR.REGLE.TROUS", "HOR.REGLE.UN_CAMPUS_PAR_JOUR", "MAT.REGLE.JOURS_DIFFERENTS", "PED.PROG.CM_AVANT_TD", "SAL.REGLE.TAILLE_ADAPTEE"]
        );
    });
});
