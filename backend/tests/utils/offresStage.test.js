import {
    DEVISES,
    OFFRE_STAGE,
    filtrerOffres,
    formaterMontant,
    lienAutorise,
    manquesPourPublier,
    verifierOffre,
} from "../../../shared/offresStage.js";

// Offres de stage (STA-01, espace Carrière) : mêmes règles au serveur, au site et à l'application
const DESCRIPTION = "Stage de six mois sur la maintenance d'une plateforme de planning scolaire.";
const valide = {
    titre: "Stage développeur web",
    entreprise: "Hestim Digital",
    ville: "Casablanca",
    description: DESCRIPTION,
};

describe("contenu d'une offre (STA-01)", () => {
    test("acceptée, nettoyée : espaces retirés, vides → null, devise par défaut MAD", () => {
        const { offre } = verifierOffre({ ...valide, titre: "  Stage développeur web  ", niveau: "  ", debut: "", fin: null });
        expect(offre).toEqual({
            titre: "Stage développeur web",
            entreprise: "Hestim Digital",
            ville: "Casablanca",
            description: DESCRIPTION,
            niveau: null,
            debut: null,
            fin: null,
            gratification: null,
            devise: "MAD",
            lien_candidature: null,
            contact_email: null,
        });
    });

    test.each([
        ["offre vide", {}],
        ["champs vides", { titre: "", entreprise: "", ville: "", description: "" }],
        ["champs qui ne sont pas du texte", { titre: 12, entreprise: [], ville: {}, description: null }],
    ])("refusée : %s", (_, offre) => {
        expect(verifierOffre(offre)).toEqual({ motif: "titre" });
    });

    test.each([
        ["titre vide", { ...valide, titre: "   " }, "titre"],
        ["titre trop court", { ...valide, titre: "a".repeat(OFFRE_STAGE.titreMin - 1) }, "titre"],
        ["titre trop long", { ...valide, titre: "a".repeat(OFFRE_STAGE.titreMax + 1) }, "titre"],
        ["entreprise trop longue", { ...valide, entreprise: "a".repeat(OFFRE_STAGE.entrepriseMax + 1) }, "entreprise"],
        ["ville trop longue", { ...valide, ville: "a".repeat(OFFRE_STAGE.villeMax + 1) }, "ville"],
        ["description trop longue", { ...valide, description: "a".repeat(OFFRE_STAGE.descriptionMax + 1) }, "description"],
        ["entreprise trop courte", { ...valide, entreprise: " H " }, "entreprise"],
        ["ville trop courte", { ...valide, ville: "P" }, "ville"],
        ["description trop courte", { ...valide, description: "Stage court." }, "description"],
        ["niveau trop long", { ...valide, niveau: "a".repeat(OFFRE_STAGE.niveauMax + 1) }, "niveau"],
        ["date mal formée", { ...valide, debut: "04/11/2026" }, "dates"],
        ["date qui n'existe pas", { ...valide, fin: "2026-02-30" }, "dates"],
        ["fin avant le début", { ...valide, debut: "2026-11-10", fin: "2026-11-09" }, "dates"],
        ["prix en lettres", { ...valide, gratification: "mille" }, "gratification"],
        ["prix négatif", { ...valide, gratification: -5 }, "gratification"],
        ["prix à trois décimales", { ...valide, gratification: "1500.505" }, "gratification"],
        ["prix au-dessus du plafond", { ...valide, gratification: OFFRE_STAGE.gratificationMax + 1 }, "gratification"],
        ["devise inconnue", { ...valide, devise: "GBP" }, "devise"],
        ["lien en javascript:", { ...valide, lien_candidature: "javascript:alert(1)" }, "lien"],
        ["lien relatif", { ...valide, lien_candidature: "/candidature" }, "lien"],
        ["lien en ftp", { ...valide, lien_candidature: "ftp://hestim.ma/offre" }, "lien"],
        ["courriel mal formé", { ...valide, contact_email: "rh@hestim" }, "email"],
    ])("refusée : %s", (_, offre, motif) => {
        expect(verifierOffre(offre)).toEqual({ motif });
    });

    test("dates et prix acceptés, prix ramené à deux décimales", () => {
        const { offre } = verifierOffre({ ...valide, debut: "2026-11-02", fin: "2026-11-02", gratification: "1 500,5", devise: "eur" });
        expect(offre).toMatchObject({ debut: "2026-11-02", fin: "2026-11-02", gratification: 1500.5, devise: "EUR" });
    });

    test("un lien http ou https est accepté, un autre protocole refusé", () => {
        expect(lienAutorise("https://hestim.ma/offre/12")).toBe(true);
        expect(lienAutorise("http://hestim.ma")).toBe(true);
        expect(lienAutorise("javascript:alert(1)")).toBe(false);
        expect(lienAutorise("data:text/html,<script>")).toBe(false);
        expect(lienAutorise("pas une adresse")).toBe(false);
    });

    test("les devises proposées sont bien des codes de trois lettres", () => {
        expect(DEVISES.every((devise) => /^[A-Z]{3}$/.test(devise))).toBe(true);
        expect(DEVISES).toContain("MAD");
    });
});

describe("publication et prix", () => {
    test("une offre se publie avec un lien de candidature ou un courriel", () => {
        expect(manquesPourPublier({ ...valide })).toEqual(["candidature"]);
        expect(manquesPourPublier({ ...valide, lien_candidature: "https://hestim.ma" })).toEqual([]);
        expect(manquesPourPublier({ ...valide, contact_email: "rh@hestim.ma" })).toEqual([]);
    });

    test.each([
        [null, "MAD", null],
        [undefined, "MAD", null],
        [0, "MAD", "0 MAD"],
        [1500, "MAD", "1\u202F500 MAD"],
        [1500.5, "MAD", "1\u202F500,50 MAD"],
        ["25000", "EUR", "25\u202F000 EUR"],
    ])("prix affiché : %s %s", (gratification, devise, attendu) => {
        expect(formaterMontant(gratification, devise)).toBe(attendu);
    });
});

describe("filtre de la liste", () => {
    const offres = [
        { titre: "Stage data", entreprise: "OCP", ville: "Casablanca", id_filiere: 1, niveau: "3A" },
        { titre: "Alternance support", entreprise: "Hestim", ville: "Rabat", id_filiere: 2, niveau: "2A" },
    ];

    test("la recherche porte sur le titre, l'entreprise et la ville", () => {
        expect(filtrerOffres(offres, { recherche: "data" })).toHaveLength(1);
        expect(filtrerOffres(offres, { recherche: "OCP" })).toHaveLength(1);
        expect(filtrerOffres(offres, { recherche: "rabat" })).toHaveLength(1);
        expect(filtrerOffres(offres, { recherche: "introuvable" })).toEqual([]);
    });

    test("filière et niveau vides ne filtrent rien ; renseignés, ils s'appliquent", () => {
        expect(filtrerOffres(offres, { id_filiere: "", niveau: "" })).toHaveLength(2);
        expect(filtrerOffres(offres, { id_filiere: 2 })).toHaveLength(1);
        expect(filtrerOffres(offres, { id_filiere: "2", niveau: "2A" })).toHaveLength(1);
        expect(filtrerOffres(offres, { niveau: "3A" })).toHaveLength(1);
    });
});
