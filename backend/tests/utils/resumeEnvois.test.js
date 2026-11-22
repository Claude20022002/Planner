/**
 * Résumé des envois sortants au démarrage (services/envois/resumeEnvois.js, QUA-10, question 8) :
 * une ligne par envoi, un avertissement par réglage incomplet, ni clé ni mot de passe.
 */
import { lignesEnvois, resumerEnvois } from "../../services/envois/resumeEnvois.js";

const VARIABLES = [
    ...["IA_FOURNISSEUR", "IA_URL", "IA_CLE", "IA_MODELE"],
    ...["IMAGE", "VOIX", "TRANSCRIPTION"].flatMap((n) => ["URL", "CLE", "MODELE"].map((s) => `IA_${n}_${s}`)),
    ...["EMAIL_SERVICE", "EMAIL_USER", "EMAIL_PASSWORD", "SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD"],
    ...["PUSH_DISABLED", "PUSH_CONTENU"],
];
let sauvegarde;

beforeEach(() => {
    sauvegarde = Object.fromEntries(VARIABLES.map((v) => [v, process.env[v]]));
    VARIABLES.forEach((v) => delete process.env[v]);
});
afterEach(() => {
    VARIABLES.forEach((v) => (sauvegarde[v] === undefined ? delete process.env[v] : (process.env[v] = sauvegarde[v])));
});

test("rien de réglé : tout désactivé sauf le push, en texte générique ; aucun avertissement", () => {
    expect(lignesEnvois()).toEqual({
        lignes: ["IA, texte : désactivée", "IA, image : désactivée", "IA, voix : désactivée", "IA, transcription : désactivée", "courriel : désactivé (écrit dans le journal)", "push : Expo, texte générique"],
        avertissements: [],
    });
});

test("clés sans adresse, compte sans serveur : un avertissement qui nomme chaque réglage manquant", () => {
    Object.assign(process.env, { IA_CLE: "cle-secrete", IA_MODELE: "un-modele", IA_VOIX_CLE: "cle-voix", SMTP_USER: "compte@exemple.test", SMTP_PASSWORD: "mot-de-passe" });
    const { lignes, avertissements } = lignesEnvois();
    expect(lignes).toContain("IA, texte : désactivée");
    expect(lignes).toContain("courriel : désactivé");
    expect(avertissements).toEqual([
        "IA, texte : IA_CLE est réglée, mais IA_URL manque : rien ne part",
        "IA, voix : IA_VOIX_CLE est réglée, mais IA_VOIX_URL et IA_VOIX_MODELE manquent : rien ne part",
        "courriel : un compte est réglé, mais SMTP_HOST manque : rien ne part, chaque courriel échoue",
    ]);
    expect(JSON.stringify(avertissements)).not.toMatch(/cle-secrete|cle-voix|mot-de-passe/);
});

test("réglages complets : l'hôte de chaque destination, jamais la clé", () => {
    Object.assign(process.env, {
        IA_CLE: "cle-secrete",
        IA_URL: "https://ia.exemple.test/v1",
        IA_MODELE: "un-modele",
        EMAIL_SERVICE: "gmail",
        EMAIL_USER: "compte@exemple.test",
        PUSH_CONTENU: "complet",
    });
    const { lignes, avertissements } = lignesEnvois();
    expect(lignes).toEqual(expect.arrayContaining(["IA, texte : ia.exemple.test (modèle un-modele)", "courriel : Gmail", "push : Expo, texte complet"]));
    expect(avertissements).toEqual([]);
    expect(JSON.stringify(lignes)).not.toContain("cle-secrete");
});

test("push coupé ; PUSH_CONTENU inconnu : texte générique et avertissement", () => {
    process.env.PUSH_DISABLED = "true";
    expect(lignesEnvois().lignes).toContain("push : désactivé");
    delete process.env.PUSH_DISABLED;
    process.env.PUSH_CONTENU = "complete";
    const { lignes, avertissements } = lignesEnvois();
    expect(lignes).toContain("push : Expo, texte générique");
    expect(avertissements).toEqual(["push : PUSH_CONTENU « complete » inconnu (complet ou generique) : texte générique"]);
});

test("resumerEnvois écrit une ligne de résumé et un avertissement par réglage incomplet", () => {
    process.env.SMTP_USER = "compte@exemple.test";
    const ecrit = { log: [], warn: [] };
    resumerEnvois({ log: (t) => ecrit.log.push(t), warn: (t) => ecrit.warn.push(t) });
    expect(ecrit.log).toHaveLength(1);
    expect(ecrit.log[0]).toMatch(/Envois sortants[\s\S]*push : Expo, texte générique/);
    expect(ecrit.warn).toHaveLength(1);
    expect(ecrit.warn[0]).toMatch(/SMTP_HOST manque/);
});
