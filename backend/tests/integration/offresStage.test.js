import {
    anonymous,
    closeDatabase,
    createPlanningFixture,
    createUser,
    loginAs,
    resetDatabase,
} from "./helpers/testApp.js";
import { resetRateLimiters } from "../../middleware/rateLimiterMiddleware.js";
import { Filiere, ResponsableFiliere } from "../../models/index.js";

/**
 * Offres de stage (STA-01, espace Carrière) : l'administration publie pour toutes les filières, un
 * responsable pour la sienne ; l'étudiant consulte les offres publiées et partage le lien public.
 * Règle du 404 hors de ses classes : brouillon vu par un étudiant, offre d'un autre auteur et offre
 * inexistante répondent le même corps.
 */

let admin;
let responsable;
let autreResponsable;
let enseignant;
let etudiant;
let fixture;
let secondeFiliere;

const offreValide = (surcharge = {}) => ({
    titre: "Stage développeur web",
    entreprise: "Hestim Digital",
    ville: "Casablanca",
    description: "Stage de six mois sur la maintenance d'une plateforme de planning scolaire.",
    gratification: "1 500",
    contact_email: "rh@hestim.ma",
    id_filiere: fixture.filiere.id_filiere,
    ...surcharge,
});

const publier = async (session, id, statut = "publiee") => session.send("post", `/api/offres-stage/${id}/publication`, { statut });

beforeAll(async () => {
    await resetDatabase();
    admin = await createUser("admin");
    responsable = await createUser("enseignant");
    autreResponsable = await createUser("enseignant");
    enseignant = await createUser("enseignant");
    etudiant = await createUser("etudiant");
    fixture = await createPlanningFixture({ admin, enseignant, etudiant });
    secondeFiliere = await Filiere.create({ code_filiere: "GB-STA", nom_filiere: "Génie biologique" });
    await ResponsableFiliere.create({ id_user: responsable.id_user, id_filiere: fixture.filiere.id_filiere });
    await ResponsableFiliere.create({ id_user: autreResponsable.id_user, id_filiere: secondeFiliere.id_filiere });
});
afterAll(closeDatabase);
beforeEach(resetRateLimiters);

describe("Écrire une offre", () => {
    test("le responsable crée un brouillon pour sa filière, le prix est enregistré tel quel", async () => {
        const res = await (await loginAs(responsable)).send("post", "/api/offres-stage", offreValide());
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            statut: "brouillon",
            gratification: 1500,
            devise: "MAD",
            jeton_partage: null,
            filiere: "Informatique & IA",
        });
        expect(res.body.id_user_auteur).toBe(responsable.id_user);
    });

    test("l'administration crée sans filière, le nom de l'auteur est rendu", async () => {
        const res = await (await loginAs(admin)).send("post", "/api/offres-stage", { ...offreValide(), id_filiere: null });
        expect(res.status).toBe(201);
        expect(res.body.id_filiere).toBeNull();
        expect(res.body.auteur).toBe(`${admin.prenom} ${admin.nom}`);
    });

    test("un enseignant sans responsabilité de filière ne publie pas", async () => {
        const res = await (await loginAs(enseignant)).send("post", "/api/offres-stage", offreValide());
        expect(res.status).toBe(403);
    });

    test("un étudiant ne publie pas", async () => {
        const res = await (await loginAs(etudiant)).send("post", "/api/offres-stage", offreValide());
        expect(res.status).toBe(403);
    });

    test("le responsable ne publie pas pour une filière dont il n'a pas la charge", async () => {
        const res = await (await loginAs(responsable)).send("post", "/api/offres-stage", offreValide({ id_filiere: secondeFiliere.id_filiere }));
        expect(res.status).toBe(403);
    });

    test("un enseignant indique la filière de son offre", async () => {
        const res = await (await loginAs(responsable)).send("post", "/api/offres-stage", { ...offreValide(), id_filiere: null });
        expect(res.status).toBe(400);
        expect(res.body.code).toBe("OFFRE_INVALIDE");
    });

    test("un prix au-delà du plafond est refusé", async () => {
        const res = await (await loginAs(admin)).send("post", "/api/offres-stage", offreValide({ gratification: 150000 }));
        expect(res.status).toBe(400);
        expect(res.body.message).toContain("gratification");
    });

    test("un lien de candidature en javascript: est refusé", async () => {
        const res = await (await loginAs(admin)).send("post", "/api/offres-stage", offreValide({ lien_candidature: "javascript:alert(1)" }));
        expect(res.status).toBe(400);
        expect(res.body.message).toContain("lien de candidature");
    });
});

describe("Relire une offre", () => {
    let brouillon;

    beforeAll(async () => {
        const res = await (await loginAs(responsable)).send("post", "/api/offres-stage", offreValide());
        brouillon = res.body;
    });

    test("le brouillon est invisible pour un étudiant, visible pour le personnel", async () => {
        const etudiantListe = await (await loginAs(etudiant)).get("/api/offres-stage");
        expect(etudiantListe.status).toBe(200);
        expect(etudiantListe.body.data.map((o) => o.id)).not.toContain(brouillon.id);

        const adminListe = await (await loginAs(admin)).get("/api/offres-stage?statut=brouillon");
        expect(adminListe.body.data.map((o) => o.id)).toContain(brouillon.id);
    });

    test("un étudiant sur un brouillon reçoit le 404 d'une offre inexistante", async () => {
        const session = await loginAs(etudiant);
        const brouillonMasque = await session.get(`/api/offres-stage/${brouillon.id}`);
        const inexistante = await session.get("/api/offres-stage/999999");
        expect(brouillonMasque.status).toBe(404);
        expect(inexistante.status).toBe(404);
        expect(brouillonMasque.body).toEqual(inexistante.body);
    });

    test("un autre auteur reçoit 404, l'auteur modifie", async () => {
        const autre = await (await loginAs(autreResponsable)).send("put", `/api/offres-stage/${brouillon.id}`, offreValide({ titre: "Titre détourné" }));
        expect(autre.status).toBe(404);

        const auteur = await (await loginAs(responsable)).send("put", `/api/offres-stage/${brouillon.id}`, offreValide({ gratification: "2 000,50" }));
        expect(auteur.status).toBe(200);
        expect(auteur.body.gratification).toBe(2000.5);
    });
});

describe("Publier et partager", () => {
    test("publier exige un lien de candidature ou un courriel", async () => {
        const creation = await (await loginAs(responsable)).send("post", "/api/offres-stage", offreValide({ contact_email: null }));
        expect(creation.status).toBe(201);
        const res = await publier(await loginAs(responsable), creation.body.id);
        expect(res.status).toBe(400);
        expect(res.body.code).toBe("OFFRE_INCOMPLETE");
    });

    test("une offre publiée porte un jeton de 128 bits et s'ouvre à l'étudiant", async () => {
        const creation = await (await loginAs(responsable)).send("post", "/api/offres-stage", offreValide());
        const res = await publier(await loginAs(responsable), creation.body.id);
        expect(res.status).toBe(200);
        expect(res.body.statut).toBe("publiee");
        expect(res.body.jeton_partage).toMatch(/^[0-9a-f]{32}$/);
        expect(res.body.publiee_le).not.toBeNull();

        const liste = await (await loginAs(etudiant)).get("/api/offres-stage");
        expect(liste.body.data.map((o) => o.id)).toContain(creation.body.id);
        const detail = await (await loginAs(etudiant)).get(`/api/offres-stage/${creation.body.id}`);
        expect(detail.status).toBe(200);
    });

    test("le lien public se lit sans compte, sans auteur ni statut, et ne s'indexe pas", async () => {
        const creation = await (await loginAs(responsable)).send("post", "/api/offres-stage", offreValide());
        const { jeton_partage: jeton } = (await publier(await loginAs(responsable), creation.body.id)).body;

        const res = await anonymous().get(`/api/offres-stage/publiques/${jeton}`);
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ titre: "Stage développeur web", entreprise: "Hestim Digital", gratification: 1500, devise: "MAD" });
        expect(res.body).not.toHaveProperty("statut");
        expect(res.body).not.toHaveProperty("auteur");
        expect(res.body).not.toHaveProperty("id");
        expect(res.headers["cache-control"]).toBe("no-store");
        expect(res.headers["x-robots-tag"]).toBe("noindex");
    });

    test("fermer retire le lien public, rouvrir le rend avec le même jeton", async () => {
        const creation = await (await loginAs(responsable)).send("post", "/api/offres-stage", offreValide());
        const session = await loginAs(responsable);
        const publiee = (await publier(session, creation.body.id)).body;

        const fermee = await publier(session, creation.body.id, "close");
        expect(fermee.status).toBe(200);
        expect(fermee.body.statut).toBe("close");
        expect(fermee.body.jeton_partage).toBe(publiee.jeton_partage);
        const publicFerme = await anonymous().get(`/api/offres-stage/publiques/${publiee.jeton_partage}`);
        expect(publicFerme.status).toBe(404);

        const rouverte = await publier(session, creation.body.id);
        expect(rouverte.body.statut).toBe("publiee");
        expect(rouverte.body.jeton_partage).toBe(publiee.jeton_partage);
        expect((await anonymous().get(`/api/offres-stage/publiques/${publiee.jeton_partage}`)).status).toBe(200);
    });

    test("supprimer une offre publiée est refusé ; fermée, elle se supprime", async () => {
        const creation = await (await loginAs(responsable)).send("post", "/api/offres-stage", offreValide());
        const session = await loginAs(responsable);
        const { jeton_partage: jeton } = (await publier(session, creation.body.id)).body;

        const refuse = await session.send("delete", `/api/offres-stage/${creation.body.id}`);
        expect(refuse.status).toBe(409);
        expect(refuse.body.code).toBe("OFFRE_PUBLIEE");

        await publier(session, creation.body.id, "close");
        const supprime = await session.send("delete", `/api/offres-stage/${creation.body.id}`);
        expect(supprime.status).toBe(204);
        expect((await anonymous().get(`/api/offres-stage/publiques/${jeton}`)).status).toBe(404);
    });

    test("un jeton inconnu ou mal formé répond 404, comme une offre qui n'existe pas", async () => {
        expect((await anonymous().get(`/api/offres-stage/publiques/${"a".repeat(32)}`)).status).toBe(404);
        expect((await anonymous().get("/api/offres-stage/publiques/abc")).status).toBe(404);
    });

    test("60 lectures publiques par quart d'heure et par adresse, pas une de plus", async () => {
        const creation = await (await loginAs(responsable)).send("post", "/api/offres-stage", offreValide());
        const { jeton_partage: jeton } = (await publier(await loginAs(responsable), creation.body.id)).body;

        for (let lecture = 1; lecture <= 60; lecture += 1) {
            expect((await anonymous().get(`/api/offres-stage/publiques/${jeton}`)).status).toBe(200);
        }
        expect((await anonymous().get(`/api/offres-stage/publiques/${jeton}`)).status).toBe(429);
    });
});
