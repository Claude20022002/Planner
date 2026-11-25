/**
 * Horloge de l'école (M-10) : le fuseau lu dans APP_TIMEZONE sans défaut de pays (T-3), et la
 * table des décalages calculée par le serveur, changements d'heure compris (T-2). Le Maroc n'est
 * pas pris en exemple : sa règle dépend de la version de la base de fuseaux.
 */
import { jest } from "@jest/globals";
import { estFuseau, lireFuseau } from "../../config/fuseau.js";
import { decalageMinutes, decalagesDe, horlogeDeLEcole } from "../../services/etablissement/horloge.js";

describe("Fuseau de l'école lu dans APP_TIMEZONE (T-3)", () => {
    test("le nom donné est gardé tel quel", () => {
        expect(lireFuseau({ APP_TIMEZONE: "Africa/Kinshasa", NODE_ENV: "production" })).toBe("Africa/Kinshasa");
        expect(lireFuseau({ APP_TIMEZONE: "  Europe/Paris ", NODE_ENV: "production" })).toBe("Europe/Paris");
    });

    test("en production, sans variable, le démarrage est refusé avec un message qui dit quoi faire", () => {
        expect(() => lireFuseau({ NODE_ENV: "production" })).toThrow(/APP_TIMEZONE manque/);
        expect(() => lireFuseau({ NODE_ENV: "production", APP_TIMEZONE: "" })).toThrow(/APP_TIMEZONE manque/);
    });

    test("un nom inconnu est refusé, en production comme ailleurs", () => {
        expect(() => lireFuseau({ NODE_ENV: "production", APP_TIMEZONE: "Mars/Olympus" })).toThrow(/APP_TIMEZONE inconnu/);
        expect(() => lireFuseau({ NODE_ENV: "development", APP_TIMEZONE: "Mars/Olympus" })).toThrow(/APP_TIMEZONE inconnu/);
    });

    test("hors production, sans variable : UTC, avec un avertissement (sauf pendant les tests)", () => {
        const avertir = jest.fn();
        expect(lireFuseau({ NODE_ENV: "development" }, avertir)).toBe("UTC");
        expect(avertir).toHaveBeenCalledWith(expect.stringMatching(/APP_TIMEZONE manque/));
        const silencieux = jest.fn();
        expect(lireFuseau({ NODE_ENV: "test" }, silencieux)).toBe("UTC");
        expect(silencieux).not.toHaveBeenCalled();
    });

    test("estFuseau reconnaît les noms de la base du serveur", () => {
        expect(estFuseau("UTC")).toBe(true);
        expect(estFuseau("America/New_York")).toBe(true);
        expect(estFuseau("Pas/Un_Fuseau")).toBe(false);
    });
});

describe("Table des décalages de l'école (T-2)", () => {
    test("le décalage d'un instant, positif, négatif ou d'une demi-heure", () => {
        expect(decalageMinutes("UTC", new Date("2026-11-22T12:00:00Z"))).toBe(0);
        expect(decalageMinutes("Africa/Lagos", new Date("2026-11-22T12:00:00Z"))).toBe(60);
        expect(decalageMinutes("America/New_York", new Date("2026-07-01T12:00:00Z"))).toBe(-240);
        expect(decalageMinutes("Asia/Kolkata", new Date("2026-11-22T12:00:00Z"))).toBe(330);
    });

    test("un fuseau sans heure d'été : une seule ligne", () => {
        const lignes = decalagesDe("Africa/Lagos", new Date("2026-11-22T00:00:00Z"));
        expect(lignes).toHaveLength(1);
        expect(lignes[0].minutes).toBe(60);
        expect(decalagesDe("UTC", new Date("2026-11-22T00:00:00Z"))).toEqual([{ depuis: expect.any(String), minutes: 0 }]);
    });

    test("le changement d'heure est trouvé à la minute près, à l'instant légal", () => {
        const lignes = decalagesDe("Europe/Paris", new Date("2026-03-15T00:00:00Z"));
        expect(lignes).toContainEqual({ depuis: "2026-03-29T01:00:00.000Z", minutes: 120 });
        expect(lignes).toContainEqual({ depuis: "2026-10-25T01:00:00.000Z", minutes: 60 });
        // La première ligne vaut pour le début de la fenêtre, ensuite une ligne par changement
        const instants = lignes.map((l) => Date.parse(l.depuis));
        expect([...instants].sort((a, b) => a - b)).toEqual(instants);
        expect(lignes.every((l, i) => i === 0 || l.minutes !== lignes[i - 1].minutes)).toBe(true);
    });

    test("la fenêtre couvre plus d'un an de part et d'autre", () => {
        const autour = new Date("2026-11-22T00:00:00Z");
        const lignes = decalagesDe("Europe/Paris", autour);
        expect(Date.parse(lignes[0].depuis)).toBeLessThanOrEqual(autour.getTime() - 365 * 24 * 3600 * 1000);
        expect(lignes.some((l) => Date.parse(l.depuis) > autour.getTime() + 300 * 24 * 3600 * 1000)).toBe(true);
    });

    test("l'horloge rendue au site : fuseau, table et date du calcul", () => {
        const maintenant = new Date("2026-11-22T10:00:00Z");
        const horloge = horlogeDeLEcole(maintenant, "Africa/Lagos");
        expect(horloge).toEqual({ fuseau: "Africa/Lagos", decalages: [{ depuis: expect.any(String), minutes: 60 }], calcule_le: maintenant.toISOString() });
        // Gardée en mémoire le même jour, recalculée si le fuseau change
        expect(horlogeDeLEcole(new Date("2026-11-22T18:00:00Z"), "Africa/Lagos")).toBe(horloge);
        expect(horlogeDeLEcole(maintenant, "UTC").fuseau).toBe("UTC");
    });
});
