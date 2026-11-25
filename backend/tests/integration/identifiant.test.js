import request from "supertest";
import app from "../../app.js";
import { Users, JournalSecurite, PasswordResetToken } from "../../models/index.js";
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
