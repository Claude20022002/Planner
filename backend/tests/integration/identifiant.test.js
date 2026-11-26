import request from "supertest";
import app from "../../app.js";
import { Users, JournalSecurite, PasswordResetToken, Etudiant } from "../../models/index.js";
import { resetRateLimiters } from "../../middleware/rateLimiterMiddleware.js";
import { PASSWORD, resetDatabase, closeDatabase, createUser, loginAs } from "./helpers/testApp.js";

/**
 * VSC-03 : l'identifiant de connexion (décision Q-20). L'adresse devient facultative ; l'identifiant
 * est la clé de connexion. Ce que ce fichier prouve :
 *   - la connexion marche par identifiant comme par adresse (les deux, Q-3) ;
 *   - un compte créé sans identifiant prend son adresse (reprise, Q-4) ;
 *   - un compte sans adresse existe et ne reçoit ni invitation ni lien (Q-5) ;
 *   - un compte sans adresse vit normalement : profil, retrait de l'adresse ;
 *   - le journal de sécurité note l'identifiant (Q-6).
 */
beforeAll(async () => {
    await resetDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

beforeEach(resetRateLimiters);

const connexion = (valeur) => request(app).post("/api/auth/login").send({ email: valeur, password: PASSWORD });

describe("Identifiant de connexion (VSC-03)", () => {
    test("on se connecte par identifiant, et l'adresse fonctionne toujours", async () => {
        const compte = await createUser("etudiant", { email: "amina.identifiant@hestim.test" });
        await compte.update({ identifiant: "E2026001" });

        const parIdentifiant = await connexion("E2026001");
        expect(parIdentifiant.status).toBe(200);
        expect(parIdentifiant.body.user).toMatchObject({ identifiant: "E2026001", email: "amina.identifiant@hestim.test" });

        // La casse ne compte pas (collation de la base)
        const parIdentifiantMinuscule = await connexion("e2026001");
        expect(parIdentifiantMinuscule.status).toBe(200);

        const parAdresse = await connexion("amina.identifiant@hestim.test");
        expect(parAdresse.status).toBe(200);
        expect(parAdresse.body.user.identifiant).toBe("E2026001");
    });

    test("un compte créé sans identifiant prend son adresse (reprise)", async () => {
        const compte = await createUser("enseignant", { email: "reprise.enseignant@hestim.test" });
        expect(compte.identifiant).toBe("reprise.enseignant@hestim.test");
    });

    test("un compte sans adresse existe, mais ne peut ni recevoir de lien ni d'invitation", async () => {
        const compte = await Users.create({
            nom: "Sans",
            prenom: "Adresse",
            identifiant: "sans.adresse",
            email: null,
            role: "etudiant",
            password_hash: "x",
        });

        const { envoyerInvitation } = await import("../../services/comptes.js");
        expect(await envoyerInvitation(compte, "https://planner.test/lien")).toBe(false);
        const { sendEmail } = await import("../../utils/sendEmail.js");
        expect((await sendEmail({ to: null, subject: "x", text: "y" })).success).toBe(false);

        // Réinitialisation demandée : réponse neutre, aucun jeton créé faute d'adresse
        const demande = await request(app).post("/api/auth/forgot-password").send({ email: "sans.adresse" });
        expect(demande.status).toBe(200);
        expect(await PasswordResetToken.count({ where: { id_user: compte.id_user } })).toBe(0);
    });

    test("un administrateur peut retirer l'adresse : elle devient nulle, le compte garde son identifiant", async () => {
        const admin = await createUser("admin");
        const client = await loginAs(admin);
        const compte = await createUser("etudiant", { email: "adresse.retiree@hestim.test" });

        const reponse = await client.send("put", `/api/users/${compte.id_user}`, { email: "" });
        expect(reponse.status).toBe(200);
        await compte.reload();
        // Jamais une chaîne vide : elle serait unique et enverrait des courriels dans le vide
        expect(compte.email).toBeNull();
        expect(compte.identifiant).toBe("adresse.retiree@hestim.test");
    });

    test("un compte sans adresse met à jour son profil sans en fournir", async () => {
        const compte = await createUser("etudiant", { identifiant: "profil.sans.adresse", email: null });
        // loginAs se connecte sur le champ « email » de l'API : on y met l'identifiant, seul moyen d'entrer
        const client = await loginAs({ ...compte.toJSON(), email: compte.identifiant });

        const reponse = await client.send("put", `/api/users/${compte.id_user}`, { nom: "Nom modifié", telephone: "0600000000" });
        expect(reponse.status).toBe(200);
        await compte.reload();
        expect(compte.nom).toBe("Nom modifié");
        expect(compte.email).toBeNull();
    });

    test("le journal de sécurité note l'identifiant d'une connexion refusée", async () => {
        await connexion("inconnu.du.jour");
        const evenement = await JournalSecurite.findOne({ where: { evenement: "connexion_echec" }, order: [["id_evenement", "DESC"]] });
        expect(evenement.identifiant).toBe("inconnu.du.jour");
        expect(evenement.email).toBeNull();
    });
});

/**
 * Condition n° 1 du chef de projet (26 nov.) : une clé de connexion ne désigne qu'un compte. Sans
 * cela, la connexion et « mot de passe oublié » tombent sur le mauvais compte et le lien de
 * réinitialisation part chez lui.
 */
describe("Collisions entre identifiant et adresse (condition du chef)", () => {
    // Mot de passe provisoire valable au regard de la politique (celui de l'aide est réservé au modèle)
    const PROVISOIRE = "Provisoire@2026";
    const creerParAdmin = (client, corps) =>
        client.send("post", "/api/users", { nom: "Nom", prenom: "Prenom", role: "etudiant", password: PROVISOIRE, ...corps });

    test("à la création, un identifiant ne peut pas reprendre l'adresse d'un autre compte", async () => {
        const client = await loginAs(await createUser("admin"));
        // Compte dont l'adresse diffère de l'identifiant : la valeur n'est donc pas déjà un identifiant
        await createUser("etudiant", { identifiant: "E-AUTRE-1", email: "collision.adresse@hestim.test" });

        const reponse = await creerParAdmin(client, { identifiant: "collision.adresse@hestim.test", email: "collision.neuve@hestim.test" });
        expect(reponse.status).toBe(409);
        expect(reponse.body.error).toBe("Cet identifiant est l'adresse d'un autre compte");
    });

    test("à la création, une adresse ne peut pas reprendre l'identifiant d'un autre compte", async () => {
        const client = await loginAs(await createUser("admin"));
        // Un compte sans adresse dont l'identifiant a la forme d'une adresse (usage courant)
        await createUser("etudiant", { identifiant: "adresse.prise@hestim.test", email: null });

        const reponse = await creerParAdmin(client, { identifiant: "E-COLLISION-2", email: "adresse.prise@hestim.test" });
        expect(reponse.status).toBe(409);
        expect(reponse.body.error).toBe("Cette adresse est l'identifiant d'un autre compte");
    });

    test("à la modification, l'identifiant ne peut pas devenir l'adresse d'un autre compte", async () => {
        const client = await loginAs(await createUser("admin"));
        await createUser("etudiant", { identifiant: "E-AUTRE-2", email: "collision.modif@hestim.test" });
        const cible = await createUser("etudiant");

        const reponse = await client.send("put", `/api/users/${cible.id_user}`, { identifiant: "collision.modif@hestim.test" });
        expect(reponse.status).toBe(409);
        expect(reponse.body.error).toBe("Cet identifiant est l'adresse d'un autre compte");
        await cible.reload();
        expect(cible.identifiant).not.toBe("collision.modif@hestim.test");
    });

    test("à la modification, l'adresse ne peut pas devenir l'identifiant d'un autre compte", async () => {
        const client = await loginAs(await createUser("admin"));
        await createUser("etudiant", { identifiant: "adresse.modif@hestim.test", email: null });
        const cible = await createUser("etudiant");

        const reponse = await client.send("put", `/api/users/${cible.id_user}`, { email: "adresse.modif@hestim.test" });
        expect(reponse.status).toBe(409);
        expect(reponse.body.error).toBe("Cette adresse est l'identifiant d'un autre compte");
        await cible.reload();
        expect(cible.email).not.toBe("adresse.modif@hestim.test");
    });

    test("le compte qui garde son identifiant égal à sa propre adresse n'est pas en collision", async () => {
        const client = await loginAs(await createUser("admin"));
        const compte = await createUser("etudiant", { email: "collision.reprise@hestim.test" });

        // Même valeur des deux côtés, mais toujours le même compte (reprise de 0064)
        const reponse = await client.send("put", `/api/users/${compte.id_user}`, { identifiant: compte.email, email: compte.email });
        expect(reponse.status).toBe(200);
        await compte.reload();
        expect(compte.identifiant).toBe("collision.reprise@hestim.test");
    });
});

/**
 * Conditions n° 2 et 4 du chef de projet : l'import suit Q-8 (ligne sans adresse ni mot de passe
 * refusée) et Q-2 (identifiant sans espace, 255 au plus), et ses règles sont celles de la création.
 */
describe("Import des comptes : Q-2, Q-8 et collisions", () => {
    let client;
    beforeAll(async () => {
        client = await loginAs(await createUser("admin"));
    });

    const importer = (users) => client.send("post", "/api/users/import", { users });

    test("une ligne sans adresse ni mot de passe est refusée (Q-8)", async () => {
        const reponse = await importer([{ nom: "Sans", prenom: "Adresse", identifiant: "IMP-SANS-ADRESSE", role: "etudiant", numero_etudiant: "E-IMP-1", niveau: "1ère année" }]);
        expect(reponse.status).toBe(201);
        expect(reponse.body.successCount).toBe(0);
        expect(reponse.body.errors[0].error).toBe("Sans adresse, un mot de passe initial est requis");
    });

    test("un identifiant avec un espace est refusé (Q-2)", async () => {
        const reponse = await importer([{ nom: "Espace", prenom: "Interdit", identifiant: "IMP 2026", email: "imp.espace@hestim.test", role: "etudiant", numero_etudiant: "E-IMP-2", niveau: "1ère année" }]);
        expect(reponse.body.errorCount).toBe(1);
        expect(reponse.body.errors[0].error).toBe("L'identifiant ne peut pas contenir d'espace");
    });

    test("un identifiant de plus de 255 caractères est refusé (Q-2)", async () => {
        const long = `IMP-${"x".repeat(252)}`;
        const reponse = await importer([{ nom: "Trop", prenom: "Long", identifiant: long, email: "imp.long@hestim.test", role: "etudiant", numero_etudiant: "E-IMP-3", niveau: "1ère année" }]);
        expect(reponse.body.errorCount).toBe(1);
        expect(reponse.body.errors[0].error).toBe("L'identifiant dépasse 255 caractères");
    });

    test("une ligne en collision est refusée, les autres passent", async () => {
        // Compte sans adresse dont l'identifiant a la forme d'une adresse : la ligne qui reprend
        // cette valeur comme adresse tomberait sur le mauvais compte à la connexion
        await createUser("etudiant", { identifiant: "imp.prise@hestim.test", email: null });

        const reponse = await importer([
            { nom: "Col", prenom: "Ladresse", identifiant: "IMP-COLLISION", email: "imp.prise@hestim.test", role: "etudiant", numero_etudiant: "E-IMP-4", niveau: "1ère année" },
            { nom: "Ligne", prenom: "Valide", identifiant: "IMP-VALIDE", email: "imp.valide@hestim.test", role: "etudiant", numero_etudiant: "E-IMP-5", niveau: "1ère année" },
        ]);
        expect(reponse.body.errorCount).toBe(1);
        expect(reponse.body.successCount).toBe(1);
        expect(reponse.body.errors[0].error).toBe("Cette adresse est l'identifiant d'un autre compte");
        // Le compte et sa fiche existent bien pour la ligne acceptée
        expect(await Etudiant.findOne({ where: { numero_etudiant: "E-IMP-5" } })).not.toBeNull();
        expect(await Users.findOne({ where: { identifiant: "IMP-VALIDE" } })).not.toBeNull();
    });

    test("une ligne dont l'identifiant reprend l'adresse d'un compte est refusée", async () => {
        const autre = await createUser("etudiant", { email: "imp.adresse@hestim.test" });

        // L'identifiant vaut l'adresse du compte : le compte garde son identifiant (reprise de 0064),
        // donc la valeur est refusée par l'unicité de l'identifiant avant même la collision
        const reponse = await importer([{ nom: "Col", prenom: "Lidentifiant", identifiant: autre.email, email: "imp.libre@hestim.test", role: "etudiant", numero_etudiant: "E-IMP-7", niveau: "1ère année" }]);
        expect(reponse.body.errorCount).toBe(1);
        expect(reponse.body.errors[0].error).toBe("Un compte utilise déjà cet identifiant");
    });

    test("un fichier où l'identifiant reprend sa propre adresse passe (usage courant)", async () => {
        const reponse = await importer([{ nom: "Meme", prenom: "Valeur", identifiant: "imp.meme.valeur@hestim.test", email: "imp.meme.valeur@hestim.test", role: "etudiant", numero_etudiant: "E-IMP-6", niveau: "1ère année" }]);
        expect(reponse.body.successCount).toBe(1);
        expect(reponse.body.errorCount).toBe(0);
    });
});
