import { resetDatabase, closeDatabase, createUser, loginAs } from "./helpers/testApp.js";
import { resetRateLimiters } from "../../middleware/rateLimiterMiddleware.js";
import { poserReglages, retirerReglages } from "./helpers/reglagesMoteur.js";
import { ContrainteDeclaree, JournalSecurite, ValeurParametre, VersionParametres } from "../../models/index.js";

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

const plage = { gabarit: "plage_a_eviter", cibles: [{ type: "ecole" }], parametres: { jours: ["samedi"], debut: "14:00", fin: "18:00" }, nature: "souhait", insistance: "normal" };

describe("Historique des versions (R-3)", () => {
    test("la liste est allégée : comptes, auteur, annulation, sans les lignes", async () => {
        const id = await creerEtAppliquer([{ cle: "LOG.TRAJET.CAMPUS_DEFAUT", valeur: 40 }]);
        const avecContrainte = await client.send("post", "/api/moteur/versions", { libelle: "Samedi", contraintes: [plage] });
        expect(avecContrainte.status).toBe(201);
        const annulation = await client.send("post", `/api/moteur/versions/${id}/annuler`);
        expect(annulation.status).toBe(201);

        const { body } = await client.get("/api/moteur/versions");
        const v = body.find((x) => x.id_version === id);
        expect(v).toEqual(expect.objectContaining({ statut: "appliquee", nb_reglages: 1, nb_contraintes: 0, nb_retraits: 0, annulee_par: annulation.body.id_version }));
        expect(v.auteur).toEqual({ id_user: admin.id_user, nom: expect.any(String) });
        expect(v.valeurs).toBeUndefined();
        expect(body.find((x) => x.id_version === avecContrainte.body.id_version)).toMatchObject({ statut: "brouillon", libelle: "Samedi", nb_contraintes: 1 });
        expect(body.find((x) => x.id_version === annulation.body.id_version)).toMatchObject({ annule_version: id });
        expect(body.map((x) => x.id_version)).toEqual([...body.map((x) => x.id_version)].sort((a, b) => b - a));
    });

    test("le détail : réglages nommés, contraintes avec leur phrase ; 404 sinon", async () => {
        const creee = await client.send("post", "/api/moteur/versions", { lignes: [{ cle: "HOR.REGLE.TROUS", valeur: false }], contraintes: [plage] });
        const { status, body } = await client.get(`/api/moteur/versions/${creee.body.id_version}`);
        expect(status).toBe(200);
        expect(body.reglages).toEqual([expect.objectContaining({ cle: "HOR.REGLE.TROUS", nom: "Éviter les trous", portee: "etablissement", valeur: false })]);
        expect(body.contraintes).toEqual([expect.objectContaining({ gabarit: "plage_a_eviter", phrase: expect.stringMatching(/samedi/i) })]);
        expect(body.retraits).toEqual([]);
        expect((await client.get("/api/moteur/versions/999999")).status).toBe(404);
    });
});

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

    test("date mal écrite : 400 ; un enseignant : refusé (réglages et historique)", async () => {
        expect((await client.get("/api/moteur/reglages?date=22-11-2026")).status).toBe(400);
        const prof = await loginAs(await createUser("enseignant"));
        expect((await prof.get("/api/moteur/reglages")).status).toBe(403);
        expect((await prof.get("/api/moteur/versions")).status).toBe(403);
        expect((await prof.get("/api/moteur/versions/1")).status).toBe(403);
    });
});

describe("Aperçu, puis créer et appliquer avec la version de base (R-2, R-4)", () => {
    const lire = async () => (await client.get("/api/moteur/reglages")).body;
    const compter = async () => [await VersionParametres.count(), await ValeurParametre.count(), await ContrainteDeclaree.count()];

    test("l'aperçu dit avant → après et l'effet, sans rien écrire", async () => {
        const { version_courante } = await lire();
        const avant = await compter();
        const res = await client.send("post", "/api/moteur/versions/apercu", {
            lignes: [{ cle: "ENS.CHARGE.MAX_H_JOUR", valeur: 360 }],
            regles: [{ id: "PED.PROG.CM_AVANT_TD", choix: "coupee" }],
            contraintes: [plage],
            base: version_courante,
        });
        expect(res.status).toBe(200);
        expect(await compter()).toEqual(avant);
        expect(res.body.changements).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: "ENS.CHARGE.MAX_H_JOUR", avant: expect.objectContaining({ valeur: 480 }), apres: expect.objectContaining({ valeur: 360 }), effet: "saisie_et_generation" }),
                expect.objectContaining({ id: "PED.PROG.CM_AVANT_TD", avant: expect.objectContaining({ choix: "normal" }), apres: expect.objectContaining({ choix: "coupee" }), effet: "prochaine_generation" }),
            ])
        );
        expect(res.body.contraintes.contraintes[0].phrase).toMatch(/samedi/i);
        expect(res.body).toMatchObject({ violations: [], conflits: [], peut_appliquer: true });
    });

    test("l'aperçu rend les refus sous leur réglage : bornes, choix, règle non réglable", async () => {
        const res = await client.send("post", "/api/moteur/versions/apercu", {
            lignes: [{ cle: "HOR.REGLE.MAX_H_JOUR_GROUPE", valeur: 450 }],
            regles: [{ id: "HOR.REGLE.TROUS", choix: "indispensable" }, { id: "SAL.REGLE.CONFLIT", choix: "coupee" }],
        });
        expect(res.status).toBe(200);
        expect(res.body.peut_appliquer).toBe(false);
        expect(res.body.violations.map((v) => v.code).sort()).toEqual(["choix_invalide", "hors_bornes", "regle_non_reglable"]);
    });

    test("créer et appliquer d'un coup : la version est appliquée, le choix devient une ligne", async () => {
        const { version_courante } = await lire();
        const res = await client.send("post", "/api/moteur/versions", { appliquer: true, base: version_courante, regles: [{ id: "HOR.REGLE.UN_CAMPUS_PAR_JOUR", choix: "beaucoup" }] });
        expect(res.status).toBe(201);
        expect(res.body.statut).toBe("appliquee");
        const regle = (await lire()).regles.find((r) => r.id === "HOR.REGLE.UN_CAMPUS_PAR_JOUR");
        expect(regle).toMatchObject({ choix: "beaucoup", poids: 30 });
    });

    test("une version appliquée depuis la base sur le même réglage : 409 VERSION_DEPASSEE, rien d'écrit", async () => {
        const { version_courante: base } = await lire();
        await creerEtAppliquer([{ cle: "EXA.EPREUVE.SURVEILLANTS_PAR_SALLE", valeur: 3 }]);
        const avant = await compter();
        const res = await client.send("post", "/api/moteur/versions", { appliquer: true, base, lignes: [{ cle: "EXA.EPREUVE.SURVEILLANTS_PAR_SALLE", valeur: 4 }] });
        expect(res.status).toBe(409);
        expect(res.body).toMatchObject({ code: "VERSION_DEPASSEE", violations: [expect.objectContaining({ cle: "EXA.EPREUVE.SURVEILLANTS_PAR_SALLE", code: "version_depassee" })] });
        expect(await compter()).toEqual(avant);
        const apercu = await client.send("post", "/api/moteur/versions/apercu", { base, lignes: [{ cle: "EXA.EPREUVE.SURVEILLANTS_PAR_SALLE", valeur: 4 }] });
        expect(apercu.body).toMatchObject({ peut_appliquer: false, conflits: [expect.objectContaining({ code: "version_depassee" })] });
        // Un autre réglage ne gêne pas
        expect((await client.send("post", "/api/moteur/versions", { appliquer: true, base, lignes: [{ cle: "LOG.TRAJET.CAMPUS_DEFAUT", valeur: 35 }] })).status).toBe(201);
    });

    test("deux applications simultanées du même réglage : l'une passe, l'autre reçoit 409", async () => {
        const { version_courante: base } = await lire();
        const envoyer = (valeur) => client.send("post", "/api/moteur/versions", { appliquer: true, base, lignes: [{ cle: "EXA.EPREUVE.RATIO_CAPACITE", valeur }] });
        const statuts = (await Promise.all([envoyer(60), envoyer(70)])).map((r) => r.status).sort();
        expect(statuts).toEqual([201, 409]);
    });

    test("base absente ou jamais lue : 400 BASE_INVALIDE", async () => {
        const corps = { appliquer: true, lignes: [{ cle: "LOG.TRAJET.CAMPUS_DEFAUT", valeur: 20 }] };
        expect((await client.send("post", "/api/moteur/versions", corps)).body.code).toBe("BASE_INVALIDE");
        expect((await client.send("post", "/api/moteur/versions", { ...corps, base: 999999 })).body.code).toBe("BASE_INVALIDE");
    });
});

describe("Journal de sécurité (R-6)", () => {
    const dernier = async (evenement) => JournalSecurite.findOne({ where: { evenement }, order: [["id_evenement", "DESC"]] });
    const details = (ligne) => (typeof ligne.details === "string" ? JSON.parse(ligne.details) : ligne.details);

    test("appliquer (deux chemins), abandonner, annuler : l'auteur et les clés, jamais les valeurs", async () => {
        const { version_courante } = (await client.get("/api/moteur/reglages")).body;
        const directe = await client.send("post", "/api/moteur/versions", { appliquer: true, base: version_courante, lignes: [{ cle: "LOG.TRAJET.CAMPUS_DEFAUT", valeur: 25 }], contraintes: [plage] });
        expect(directe.status).toBe(201);
        let ligne = await dernier("parametres_version_appliquee");
        expect(ligne.id_user).toBe(admin.id_user);
        expect(details(ligne)).toEqual({ id_version: directe.body.id_version, cles: ["LOG.TRAJET.CAMPUS_DEFAUT"], nb_contraintes: 1, nb_retraits: 0 });
        expect(JSON.stringify(details(ligne))).not.toMatch(/25/);

        const parBrouillon = await creerEtAppliquer([{ cle: "HOR.REGLE.TROUS", valeur: false }]);
        expect(details(await dernier("parametres_version_appliquee"))).toMatchObject({ id_version: parBrouillon, cles: ["HOR.REGLE.TROUS"] });

        const brouillon = await client.send("post", "/api/moteur/versions", { lignes: [{ cle: "HOR.REGLE.TROUS", valeur: true }] });
        expect((await client.send("post", `/api/moteur/versions/${brouillon.body.id_version}/abandonner`)).status).toBe(200);
        expect(details(await dernier("parametres_version_abandonnee"))).toMatchObject({ id_version: brouillon.body.id_version });

        const inverse = await client.send("post", `/api/moteur/versions/${parBrouillon}/annuler`);
        expect(inverse.status).toBe(201);
        expect(details(await dernier("parametres_version_annulee"))).toEqual({ id_version: parBrouillon, cles: ["HOR.REGLE.TROUS"], nb_contraintes: 0, nb_retraits: 0, version_inverse: inverse.body.id_version });
    });

    test("un refus n'écrit rien au journal", async () => {
        const avant = await JournalSecurite.count({ where: { evenement: "parametres_version_appliquee" } });
        expect((await client.send("post", "/api/moteur/versions", { appliquer: true, base: 0, lignes: [{ cle: "HOR.REGLE.MAX_H_JOUR_GROUPE", valeur: 9999 }] })).status).not.toBe(201);
        expect(await JournalSecurite.count({ where: { evenement: "parametres_version_appliquee" } })).toBe(avant);
    });
});

describe("Bascule des anciens paramètres de planification vers MP-1", () => {
    const ancien = async () => (await client.get("/api/parametres-planning")).body.max_heures_jour_groupe;

    // Régression E-1 : une seule source. L'ancienne route n'écrit plus (410) ; la lecture suit MP-1
    test("l'écriture par l'ancienne route est fermée : 410 REGLAGE_DEPLACE, et rien ne change", async () => {
        const avant = await ancien();
        const ecrire = await client.send("put", "/api/parametres-planning/max_heures_jour_groupe", { valeur: 5 });
        expect([ecrire.status, ecrire.body.code]).toEqual([410, "REGLAGE_DEPLACE"]);
        const remettre = await client.send("delete", "/api/parametres-planning/max_heures_jour_groupe");
        expect([remettre.status, remettre.body.code]).toEqual([410, "REGLAGE_DEPLACE"]);
        expect(await ancien()).toEqual(avant);
    });

    test("la lecture suit les réglages du moteur, dans l'ancienne unité ; annuler rend la valeur d'avant", async () => {
        const avant = await ancien();
        const reglage = await poserReglages([{ cle: "HOR.REGLE.MAX_H_JOUR_GROUPE", valeur: 300 }]);
        expect(await ancien()).toMatchObject({ valeur: 5, defaut: 8, modifie: true });
        await retirerReglages(reglage);
        expect(await ancien()).toEqual(avant);
    });
});
