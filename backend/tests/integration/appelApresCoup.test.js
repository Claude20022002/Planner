import { resetDatabase, closeDatabase, createUser, createPlanningFixture, loginAs } from "./helpers/testApp.js";
import { resetRateLimiters } from "../../middleware/rateLimiterMiddleware.js";
import { Affectation, AppelSeance, JournalSecurite } from "../../models/index.js";
import { aujourdhui } from "../../services/planning/affectationRules.js";
import { etatsDesSeances } from "../../services/planning/visaSeances.js";

/**
 * M-1 (étude EP-18) : l'appel fait sur papier se saisit à la main, puis se termine après coup, du
 * lendemain de la séance au 7e jour inclus. Il compte (taux de présence, heures payées) et se voit :
 * son visa est « appel saisi après coup », distinct de l'appel validé le jour même (réponse du chef).
 * L'onglet « Appel » montre aussi les 7 prochains jours, pour imprimer la liste à l'avance.
 */

let admin;
let enseignant;
let autreEnseignant;
let etudiant;
let fixture;

const jourDecale = (n) => new Date(Date.parse(`${aujourdhui()}T12:00:00Z`) + n * 24 * 3600 * 1000).toISOString().slice(0, 10);

const seanceLe = (date, statut = "realise") =>
    Affectation.create({
        date_seance: date,
        statut,
        id_cours: fixture.cours.id_cours,
        id_groupe: fixture.groupe.id_groupe,
        id_user_enseignant: enseignant.id_user,
        id_salle: fixture.salle.id_salle,
        id_creneau: fixture.creneau.id_creneau,
        id_user_admin: admin.id_user,
    });

const terminer = async (qui, seance) => (await loginAs(qui)).send("post", `/api/presences/seances/${seance.id_affectation}/apres-coup`);

beforeAll(async () => {
    await resetDatabase();
    admin = await createUser("admin");
    enseignant = await createUser("enseignant");
    autreEnseignant = await createUser("enseignant");
    etudiant = await createUser("etudiant", { prenom: "Salma", nom: "Bennani" });
    fixture = await createPlanningFixture({ admin, enseignant, etudiant });
});
afterAll(closeDatabase);
beforeEach(resetRateLimiters);

describe("Terminer l'appel après coup (M-1)", () => {
    test("T-1 : une séance d'avant-hier se saisit puis se termine ; elle compte et se voit à part", async () => {
        const seance = await seanceLe(jourDecale(-2));
        const prof = await loginAs(enseignant);
        expect((await prof.send("put", `/api/presences/seances/${seance.id_affectation}/etudiants/${etudiant.id_user}`, { statut: "present" })).status).toBe(200);

        const res = await terminer(enseignant, seance);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ presents: 1, apres_coup: true });

        const appel = await AppelSeance.findByPk(seance.id_affectation);
        expect(appel.ferme_le).not.toBeNull();
        const etat = (await etatsDesSeances([seance.id_affectation])).get(seance.id_affectation);
        expect(etat).toMatchObject({ etat: "appel_saisi_apres_coup", compte: true });

        // Elle compte dans les taux de présence de la classe
        const eleves = await prof.get(`/api/classes/${fixture.cours.id_cours}/${fixture.groupe.id_groupe}/eleves`);
        expect(eleves.status).toBe(200);
        expect(JSON.stringify(eleves.body)).toContain('"presents":1');
    });

    test("T-1 : une séance dont l'appel est terminé le jour même reste « appel validé »", async () => {
        const seance = await seanceLe(aujourdhui(), "confirme");
        const prof = await loginAs(enseignant);
        expect((await prof.send("post", `/api/presences/seances/${seance.id_affectation}/ouvrir`)).status).toBe(200);
        expect((await prof.send("post", `/api/presences/seances/${seance.id_affectation}/fermer`)).status).toBe(200);
        const etat = (await etatsDesSeances([seance.id_affectation])).get(seance.id_affectation);
        expect(etat).toMatchObject({ etat: "appel_valide", compte: true });
    });

    test("T-2 : le 7e jour passe, le 8e est refusé ; le jour même et une séance à venir aussi", async () => {
        expect((await terminer(enseignant, await seanceLe(jourDecale(-7)))).status).toBe(200);
        const huit = await terminer(enseignant, await seanceLe(jourDecale(-8)));
        expect(huit.status).toBe(409);
        expect(huit.body.message).toMatch(/délai de saisie après coup est passé/);
        expect((await terminer(enseignant, await seanceLe(aujourdhui(), "confirme"))).status).toBe(409);
        expect((await terminer(enseignant, await seanceLe(jourDecale(2), "confirme"))).status).toBe(409);
    });

    test("T-3 : ni un étudiant, ni un autre enseignant", async () => {
        const seance = await seanceLe(jourDecale(-1));
        expect((await terminer(etudiant, seance)).status).toBe(403);
        expect((await terminer(autreEnseignant, seance)).status).toBe(403);
        expect(await AppelSeance.findByPk(seance.id_affectation)).toBeNull();
        // L'administration le peut
        expect((await terminer(admin, seance)).status).toBe(200);
    });

    test("T-4 : un appel qui existe déjà est refusé (409)", async () => {
        const seance = await seanceLe(jourDecale(-3));
        expect((await terminer(enseignant, seance)).status).toBe(200);
        const encore = await terminer(enseignant, seance);
        expect(encore.status).toBe(409);
        expect(encore.body.message).toMatch(/existe déjà/);
    });

    test("T-4 : la séance « planifiée » restée telle quelle passe à « réalisée »", async () => {
        const seance = await seanceLe(jourDecale(-1), "planifie");
        expect((await terminer(enseignant, seance)).status).toBe(200);
        expect((await seance.reload()).statut).toBe("realise");
    });

    test("T-5 : le journal garde l'action et son auteur ; l'onglet donne les états et la date limite", async () => {
        const passee = await seanceLe(jourDecale(-4));
        const aVenir = await seanceLe(jourDecale(3), "confirme");
        const lointaine = await seanceLe(jourDecale(20), "confirme");
        expect((await terminer(enseignant, passee)).status).toBe(200);
        const ligne = await JournalSecurite.findOne({ where: { evenement: "appel_saisi_apres_coup" }, order: [["id_evenement", "DESC"]] });
        expect(ligne).not.toBeNull();
        expect(ligne.id_user).toBe(enseignant.id_user);

        const aSaisir = await seanceLe(jourDecale(-5));
        const liste = (await (await loginAs(enseignant)).get(`/api/classes/${fixture.cours.id_cours}/${fixture.groupe.id_groupe}/appels`)).body;
        const de = (s) => liste.find((l) => l.id_affectation === s.id_affectation);
        expect(de(aVenir)).toMatchObject({ appel: "a_venir", saisie_apres_coup: false, saisie_possible_jusqu_au: null });
        expect(de(lointaine)).toBeUndefined();
        expect(de(aSaisir)).toMatchObject({ appel: "a_faire", saisie_apres_coup: true, saisie_possible_jusqu_au: jourDecale(2) });
        expect(de(passee)).toMatchObject({ appel: "ferme", saisie_apres_coup: false });
    });
});
