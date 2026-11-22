import { resetDatabase, closeDatabase, createUser, loginAs } from "./helpers/testApp.js";
import { resetRateLimiters } from "../../middleware/rateLimiterMiddleware.js";

/**
 * ADM-02a : ce que le panneau de configuration de l'école lit et écrit par /api/moteur
 * (docs/conception/administration/adm-02-configuration.md).
 */

let admin;
let client;

const creerEtAppliquer = async (lignes) => {
    const creee = await client.send("post", "/api/moteur/versions", { lignes });
    expect(creee.status).toBe(201);
    expect((await client.send("post", `/api/moteur/versions/${creee.body.id_version}/appliquer`)).status).toBe(200);
    return creee.body.id_version;
};

beforeAll(async () => {
    await resetDatabase();
    admin = await createUser("admin");
    client = await loginAs(admin);
});

beforeEach(() => resetRateLimiters());

afterAll(async () => {
    await closeDatabase();
});

describe("GET /api/moteur/reglages", () => {
    test("les cinq réglages et les règles réglables, avec la version courante", async () => {
        const res = await client.get("/api/moteur/reglages");
        expect(res.status).toBe(200);
        expect(res.body.reglages.map((r) => r.id)).toEqual([
            "HOR.REGLE.MAX_H_JOUR_GROUPE",
            "ENS.CHARGE.MAX_H_JOUR",
            "LOG.TRAJET.CAMPUS_DEFAUT",
            "EXA.EPREUVE.RATIO_CAPACITE",
            "EXA.EPREUVE.SURVEILLANTS_PAR_SALLE",
        ]);
        expect(res.body.reglages[0]).toMatchObject({ valeur: 480, unite: "heure", min: 60, max: 720, pas: 60, effet: "saisie_et_generation" });
        expect(res.body.regles).toHaveLength(6);
        expect(res.body.regles.find((r) => r.id === "HOR.REGLE.TROUS")).toMatchObject({ choix: "normal", poids_du_profil: 5 });
        expect(res.body.aujourdhui).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(Number.isInteger(res.body.version_courante)).toBe(true);
    });

    test("une valeur et un choix posés par une version appliquée", async () => {
        const id = await creerEtAppliquer([
            { cle: "HOR.REGLE.MAX_H_JOUR_GROUPE", valeur: 420 },
            { cle: "HOR.REGLE.TROUS", valeur: true, poids: 15 },
            { cle: "HOR.REGLE.CHANGEMENT_SALLE", valeur: false },
        ]);
        const { body } = await client.get("/api/moteur/reglages");
        expect(body.version_courante).toBe(id);
        expect(body.reglages[0]).toMatchObject({ valeur: 420, valeur_du_profil: 480, origine: "etablissement" });
        expect(body.regles.find((r) => r.id === "HOR.REGLE.TROUS").choix).toBe("beaucoup");
        expect(body.regles.find((r) => r.id === "HOR.REGLE.CHANGEMENT_SALLE").choix).toBe("coupee");
    });

    test("date mal écrite : 400 ; un enseignant : refusé", async () => {
        expect((await client.get("/api/moteur/reglages?date=22-11-2026")).status).toBe(400);
        const prof = await loginAs(await createUser("enseignant"));
        expect((await prof.get("/api/moteur/reglages")).status).toBe(403);
    });
});
