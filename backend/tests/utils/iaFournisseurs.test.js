/**
 * Fournisseurs d'IA des médias (services/studio/iaFournisseurs.js) : aucune adresse par défaut
 * (QUA-10, EP-13). Une clé et un modèle sans adresse ne rendent la nature ni disponible ni appelable.
 */
import { configurationMedia, genererImage, mediaConfigure } from "../../services/studio/iaFournisseurs.js";

const NATURES = ["image", "voix", "transcription"];
const VARIABLES = NATURES.flatMap((n) => ["URL", "CLE", "MODELE"].map((s) => `IA_${n.toUpperCase()}_${s}`));
let sauvegarde;
let fetchOrigine;

beforeEach(() => {
    sauvegarde = Object.fromEntries(VARIABLES.map((v) => [v, process.env[v]]));
    VARIABLES.forEach((v) => delete process.env[v]);
    fetchOrigine = globalThis.fetch;
});
afterEach(() => {
    VARIABLES.forEach((v) => (sauvegarde[v] === undefined ? delete process.env[v] : (process.env[v] = sauvegarde[v])));
    globalThis.fetch = fetchOrigine;
});

test.each(NATURES)("%s : clé et modèle sans adresse → non configurée ; avec adresse → configurée", (nature) => {
    const prefixe = `IA_${nature.toUpperCase()}`;
    process.env[`${prefixe}_CLE`] = "cle-essai";
    process.env[`${prefixe}_MODELE`] = "un-modele";
    expect(configurationMedia(nature).url).toBe("");
    expect(mediaConfigure(nature)).toBe(false);
    process.env[`${prefixe}_URL`] = "https://medias.exemple.test/v1/";
    expect(configurationMedia(nature).url).toBe("https://medias.exemple.test/v1");
    expect(mediaConfigure(nature)).toBe(true);
});

test("image sans adresse : 503, aucun appel réseau", async () => {
    const appels = [];
    globalThis.fetch = async (...args) => appels.push(args);
    process.env.IA_IMAGE_CLE = "cle-essai";
    process.env.IA_IMAGE_MODELE = "un-modele";
    await expect(genererImage({ prompt: "un chat" })).rejects.toMatchObject({ status: 503 });
    expect(appels).toHaveLength(0);
});
