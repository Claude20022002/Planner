/**
 * Choix du serveur d'envoi des courriels (utils/configurationCourriel.js, QUA-10, EP-13) : un
 * compte réglé sans serveur nommé ne part plus vers smtp.gmail.com, la configuration est incomplète.
 */
import { configurationCourriel, destinationCourriel } from "../../utils/configurationCourriel.js";

describe("configurationCourriel", () => {
    test("rien de réglé : absent", () => {
        expect(configurationCourriel({})).toEqual({ etat: "absent", options: null, manque: [] });
        expect(destinationCourriel(configurationCourriel({}))).toBeNull();
    });

    test("compte SMTP sans SMTP_HOST : incomplet, aucune destination implicite", () => {
        const c = configurationCourriel({ SMTP_USER: "compte@exemple.test", SMTP_PASSWORD: "secret" });
        expect(c).toEqual({ etat: "incomplet", options: null, manque: ["SMTP_HOST"] });
        expect(destinationCourriel(c)).toBeNull();
        expect(JSON.stringify(c)).not.toContain("gmail");
    });

    test("EMAIL_USER sans serveur nommé : incomplet aussi", () => {
        expect(configurationCourriel({ EMAIL_USER: "compte@exemple.test" })).toMatchObject({ etat: "incomplet", manque: ["SMTP_HOST"] });
    });

    test("EMAIL_SERVICE=gmail avec un compte : prêt, Gmail choisi explicitement", () => {
        const c = configurationCourriel({ EMAIL_SERVICE: "gmail", EMAIL_USER: "compte@exemple.test", EMAIL_PASSWORD: "secret" });
        expect(c).toEqual({ etat: "pret", options: { service: "gmail", auth: { user: "compte@exemple.test", pass: "secret" } }, manque: [] });
        expect(destinationCourriel(c)).toBe("Gmail");
    });

    test("SMTP_HOST réglé : prêt, vers cet hôte", () => {
        const c = configurationCourriel({ SMTP_USER: "compte@exemple.test", SMTP_PASSWORD: "secret", SMTP_HOST: "smtp.exemple.test", SMTP_PORT: "465", SMTP_SECURE: "true" });
        expect(c).toEqual({
            etat: "pret",
            options: { host: "smtp.exemple.test", port: "465", secure: true, auth: { user: "compte@exemple.test", pass: "secret" } },
            manque: [],
        });
        expect(destinationCourriel(c)).toBe("smtp.exemple.test");
    });

    test("SMTP_HOST réglé, port absent : 587 non chiffré, comme avant", () => {
        expect(configurationCourriel({ SMTP_USER: "c", SMTP_HOST: "smtp.exemple.test" }).options).toMatchObject({ port: 587, secure: false });
    });
});
