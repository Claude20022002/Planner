import { resetDatabase, closeDatabase, createUser, loginAs } from "./helpers/testApp.js";
import { resetRateLimiters } from "../../middleware/rateLimiterMiddleware.js";
import { AnneeUniversitaire, Inscription, LienFamille, Personne, ResponsableLegal } from "../../models/index.js";

/**
 * Dossiers élèves et familles (VSC-02) : les tests de la conception — une personne sans compte,
 * une fratrie en une transaction, un doublon refusé, des états qui n'avancent que dans un sens.
 */

let admin;
let enseignant;
let annee;
let anneeSuivante;

const compter = async () => ({
    personnes: await Personne.count(),
    responsables: await ResponsableLegal.count(),
    liens: await LienFamille.count(),
    inscriptions: await Inscription.count(),
});

beforeAll(async () => {
    await resetDatabase();
    admin = await loginAs(await createUser("admin"));
    enseignant = await loginAs(await createUser("enseignant"));
    annee = await AnneeUniversitaire.create({ libelle: "2026-2027", date_debut: "2026-09-01", date_fin: "2027-06-30", active: true });
    anneeSuivante = await AnneeUniversitaire.create({ libelle: "2027-2028", date_debut: "2027-09-01", date_fin: "2028-06-30", active: false });
});
afterAll(closeDatabase);
beforeEach(resetRateLimiters);

describe("Dossier d'une personne", () => {
    test("C5-1 : une personne se crée sans compte, avec son seul nom et prénom", async () => {
        const reponse = await admin.send("post", "/api/vie-scolaire/personnes", { nom: "Idrissi", prenom: "Yassine" });
        expect(reponse.status).toBe(201);
        expect(reponse.body.id_personne).toBeGreaterThan(0);
        expect(reponse.body.a_un_compte).toBe(false);
        expect(reponse.body.nom_complet).toBe("Yassine IDRISSI");

        const dossier = await admin.get(`/api/vie-scolaire/personnes/${reponse.body.id_personne}`);
        expect(dossier.status).toBe(200);
        expect(dossier.body.inscriptions).toEqual([]);
        expect(dossier.body.responsable).toBeNull();
    });

    test("sans nom, la création est refusée avec le motif", async () => {
        const reponse = await admin.send("post", "/api/vie-scolaire/personnes", { prenom: "SansNom" });
        expect(reponse.status).toBe(400);
        expect(reponse.body.message).toBe("Le nom est obligatoire");
    });

    test("la recherche trouve par le nom, le prénom ou le code Massar", async () => {
        await admin.send("post", "/api/vie-scolaire/personnes", { nom: "Alaoui", prenom: "Nadia", cne: "G987654321" });
        const parNom = await admin.get("/api/vie-scolaire/personnes?recherche=Alaoui");
        expect(parNom.status).toBe(200);
        expect(parNom.body.data.map((p) => p.nom)).toContain("Alaoui");
        const parCne = await admin.get("/api/vie-scolaire/personnes?recherche=G987654");
        expect(parCne.body.data).toHaveLength(1);
    });

    test("le dossier est réservé à l'administration", async () => {
        expect((await enseignant.get("/api/vie-scolaire/personnes")).status).toBe(403);
        expect((await enseignant.send("post", "/api/vie-scolaire/personnes", { nom: "X", prenom: "Y" })).status).toBe(403);
    });

    test("une personne inscrite ne se supprime pas : la radiation garde la trace", async () => {
        const creee = await admin.send("post", "/api/vie-scolaire/personnes", { nom: "Torres", prenom: "Lea" });
        await admin.send("post", `/api/vie-scolaire/personnes/${creee.body.id_personne}/inscriptions`, { id_annee: annee.id_annee, niveau: "5B" });
        const refus = await admin.agent.delete(`/api/vie-scolaire/personnes/${creee.body.id_personne}`).set("X-CSRF-Token", admin.csrf);
        expect(refus.status).toBe(409);
        expect(refus.body.code).toBe("PERSONNE_INSCRITE");
    });
});

describe("Famille et fratrie", () => {
    test("C5-3 : un responsable, trois enfants, trois liens, trois inscriptions en une transaction", async () => {
        const avant = await compter();
        const reponse = await admin.send("post", "/api/vie-scolaire/familles", {
            id_annee: annee.id_annee,
            responsable: { nom: "Bennani", prenom: "Karim", telephone: "0600000000" },
            enfants: [
                { personne: { nom: "Bennani", prenom: "Salma", date_naissance: "2014-02-10" }, lien: "pere", titulaire: true, niveau: "6A" },
                { personne: { nom: "Bennani", prenom: "Omar", date_naissance: "2015-05-02" }, lien: "pere", niveau: "5A" },
                { personne: { nom: "Bennani", prenom: "Ines", date_naissance: "2016-09-21" }, lien: "pere", niveau: "4A" },
            ],
        });
        expect(reponse.status).toBe(201);
        expect(reponse.body.enfants).toHaveLength(3);
        expect(reponse.body.enfants.map((e) => e.etat)).toEqual(["demandee", "demandee", "demandee"]);

        const apres = await compter();
        expect(apres.personnes - avant.personnes).toBe(4);
        expect(apres.responsables - avant.responsables).toBe(1);
        expect(apres.liens - avant.liens).toBe(3);
        expect(apres.inscriptions - avant.inscriptions).toBe(3);

        const enfants = await admin.get(`/api/vie-scolaire/responsables/${reponse.body.responsable.id_responsable}/enfants`);
        expect(enfants.status).toBe(200);
        expect(enfants.body.data).toHaveLength(3);
        expect(enfants.body.data.filter((e) => e.titulaire)).toHaveLength(1);
    });

    test("le dossier se lit des deux côtés : les responsables d'un enfant, les enfants d'un responsable", async () => {
        const famille = await admin.send("post", "/api/vie-scolaire/familles", {
            id_annee: annee.id_annee,
            responsable: { nom: "Idrissi", prenom: "Rachid" },
            enfants: [
                { personne: { nom: "Idrissi", prenom: "Nadia" }, lien: "pere", titulaire: true, niveau: "6A" },
                { personne: { nom: "Idrissi", prenom: "Yassine" }, lien: "pere", niveau: "4A" },
            ],
        });
        expect(famille.status).toBe(201);

        const enfant = await admin.get(`/api/vie-scolaire/personnes/${famille.body.enfants[0].id_personne}`);
        expect(enfant.status).toBe(200);
        expect(enfant.body.responsables).toHaveLength(1);
        expect(enfant.body.responsables[0].titulaire).toBe(true);
        expect(enfant.body.responsables[0].nom_complet).toBe("Rachid IDRISSI");
        expect(enfant.body.enfants).toEqual([]);

        const parent = await admin.get(`/api/vie-scolaire/personnes/${famille.body.responsable.id_personne}`);
        expect(parent.status).toBe(200);
        expect(parent.body.responsable).not.toBeNull();
        expect(parent.body.enfants.map((e) => e.nom_complet).sort()).toEqual(["Nadia IDRISSI", "Yassine IDRISSI"]);
    });

    test("un enfant incomplet annule tout : rien n'est écrit", async () => {
        const avant = await compter();
        const reponse = await admin.send("post", "/api/vie-scolaire/familles", {
            id_annee: annee.id_annee,
            responsable: { nom: "Fantome", prenom: "Parent" },
            enfants: [
                { personne: { nom: "Fantome", prenom: "Premier" }, lien: "pere", niveau: "6A" },
                { personne: { nom: "", prenom: "Deuxieme" }, lien: "pere", niveau: "6A" },
            ],
        });
        expect(reponse.status).toBe(400);
        expect(await compter()).toEqual(avant);
    });

    test("un responsable se crée seul, puis on lui rattache des enfants", async () => {
        const responsable = await admin.send("post", "/api/vie-scolaire/responsables", {
            personne: { nom: "Chraibi", prenom: "Sanae" },
            profession: "Pharmacienne",
        });
        expect(responsable.status).toBe(201);
        expect(responsable.body.id_responsable).toBeGreaterThan(0);

        const enfant = await admin.send("post", "/api/vie-scolaire/personnes", { nom: "Chraibi", prenom: "Adam" });
        const lien = await admin.send("post", `/api/vie-scolaire/personnes/${enfant.body.id_personne}/responsables`, {
            id_responsable: responsable.body.id_responsable,
            lien: "mere",
            titulaire: true,
        });
        expect(lien.status).toBe(201);
        expect(lien.body.titulaire).toBe(true);
    });

    test("un second titulaire est refusé tant que le premier tient ce rôle", async () => {
        const pere = await admin.send("post", "/api/vie-scolaire/responsables", { personne: { nom: "Saidi", prenom: "Rachid" } });
        const mere = await admin.send("post", "/api/vie-scolaire/responsables", { personne: { nom: "Saidi", prenom: "Leila" } });
        const enfant = await admin.send("post", "/api/vie-scolaire/personnes", { nom: "Saidi", prenom: "Nour" });

        await admin.send("post", `/api/vie-scolaire/personnes/${enfant.body.id_personne}/responsables`, { id_responsable: pere.body.id_responsable, lien: "pere", titulaire: true });
        const second = await admin.send("post", `/api/vie-scolaire/personnes/${enfant.body.id_personne}/responsables`, { id_responsable: mere.body.id_responsable, lien: "mere", titulaire: true });
        expect(second.status).toBe(409);
        expect(second.body.code).toBe("TITULAIRE_EXISTANT");
    });
});

describe("Inscription", () => {
    const inscrire = async (niveau = "6A") => {
        const personne = await admin.send("post", "/api/vie-scolaire/personnes", { nom: "Ziani", prenom: "Sara" });
        const inscription = await admin.send("post", `/api/vie-scolaire/personnes/${personne.body.id_personne}/inscriptions`, { id_annee: annee.id_annee, niveau });
        return { personne: personne.body, inscription: inscription.body, statut: inscription.status };
    };

    test("C5-4 : le doublon est refusé avec le numéro de l'inscription existante", async () => {
        const { personne, inscription, statut } = await inscrire();
        expect(statut).toBe(201);
        expect(inscription.etat).toBe("demandee");

        const doublon = await admin.send("post", `/api/vie-scolaire/personnes/${personne.id_personne}/inscriptions`, { id_annee: annee.id_annee, niveau: "6A" });
        expect(doublon.status).toBe(409);
        expect(doublon.body.code).toBe("INSCRIPTION_EXISTANTE");
        expect(doublon.body.message).toContain(`n° ${inscription.id_inscription}`);
    });

    test("les états n'avancent que dans un sens", async () => {
        const { inscription } = await inscrire();
        const saut = await admin.send("put", `/api/vie-scolaire/inscriptions/${inscription.id_inscription}/etat`, { etat: "inscrite" });
        expect(saut.status).toBe(409);
        expect(saut.body.code).toBe("ETAT_INVALIDE");

        for (const etat of ["engagee", "confirmee", "inscrite"]) {
            const avance = await admin.send("put", `/api/vie-scolaire/inscriptions/${inscription.id_inscription}/etat`, { etat });
            expect(avance.status).toBe(200);
            expect(avance.body.etat).toBe(etat);
        }
        const reinscrite = await admin.send("put", `/api/vie-scolaire/inscriptions/${inscription.id_inscription}/etat`, { etat: "radiee" });
        expect(reinscrite.status).toBe(200);
        const retour = await admin.send("put", `/api/vie-scolaire/inscriptions/${inscription.id_inscription}/etat`, { etat: "confirmee" });
        expect(retour.status).toBe(409);
    });

    test("la réinscription crée une ligne reliée à l'année précédente", async () => {
        const { inscription } = await inscrire();
        await admin.send("put", `/api/vie-scolaire/inscriptions/${inscription.id_inscription}/etat`, { etat: "engagee" });

        const tot = await admin.send("post", `/api/vie-scolaire/inscriptions/${inscription.id_inscription}/reinscription`, { id_annee: anneeSuivante.id_annee });
        expect(tot.status).toBe(409);
        expect(tot.body.code).toBe("PRECEDENTE_NON_CONFIRMEE");

        await admin.send("put", `/api/vie-scolaire/inscriptions/${inscription.id_inscription}/etat`, { etat: "confirmee" });
        const suivante = await admin.send("post", `/api/vie-scolaire/inscriptions/${inscription.id_inscription}/reinscription`, { id_annee: anneeSuivante.id_annee, niveau: "7A" });
        expect(suivante.status).toBe(201);
        expect(suivante.body.id_inscription_precedente).toBe(inscription.id_inscription);
        expect(suivante.body.niveau).toBe("7A");
        expect(suivante.body.etat).toBe("demandee");
    });

    test("la liste se filtre par année, par état et par niveau", async () => {
        const { inscription } = await inscrire("3B");
        await admin.send("put", `/api/vie-scolaire/inscriptions/${inscription.id_inscription}/etat`, { etat: "engagee" });

        const parAnnee = await admin.get(`/api/vie-scolaire/inscriptions?id_annee=${annee.id_annee}`);
        expect(parAnnee.status).toBe(200);
        expect(parAnnee.body.total).toBeGreaterThan(0);

        const parEtat = await admin.get(`/api/vie-scolaire/inscriptions?id_annee=${annee.id_annee}&etat=engagee`);
        expect(parEtat.body.data.every((i) => i.etat === "engagee")).toBe(true);

        const parNiveau = await admin.get(`/api/vie-scolaire/inscriptions?niveau=3B`);
        expect(parNiveau.body.data.every((i) => i.niveau === "3B")).toBe(true);
    });

    test("les années connues se lisent, la plus récente d'abord", async () => {
        const annees = await admin.get("/api/vie-scolaire/annees");
        expect(annees.status).toBe(200);
        expect(annees.body.data[0].libelle).toBe("2027-2028");
    });
});

describe("Comptes", () => {
    test("le décompte des personnes sans compte prépare la reprise 0065", async () => {
        await admin.send("post", "/api/vie-scolaire/personnes", { nom: "Sans", prenom: "Compte" });
        const comptes = await admin.get("/api/vie-scolaire/comptes");
        expect(comptes.status).toBe(200);
        expect(comptes.body.personnes).toBeGreaterThan(0);
        expect(comptes.body.sans_compte).toBe(comptes.body.personnes - comptes.body.avec_compte);
    });
});
