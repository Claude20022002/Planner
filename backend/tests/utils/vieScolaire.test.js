import {
    ETATS_INSCRIPTION,
    LIENS_FAMILLE,
    etatsSuivants,
    nomComplet,
    transitionAutorisee,
    verifierInscription,
    verifierPersonne,
} from "../../../shared/vieScolaire.js";

/**
 * Règles du scolaire (VSC-02) : elles sont pures, donc vérifiées ici, sans base.
 * Une règle fausse ici serait fausse au serveur, au site et dans l'application.
 */
describe("Personne", () => {
    test("le nom et le prénom suffisent : ni adresse, ni téléphone, ni code Massar", () => {
        expect(verifierPersonne({ nom: "Benali", prenom: "Amina" })).toBeNull();
        expect(verifierPersonne({ nom: "  Benali  ", prenom: "Amina" })).toBeNull();
    });

    test("sans nom, ou sans prénom, la personne est refusée", () => {
        expect(verifierPersonne({ nom: "   ", prenom: "Amina" })).toBe("Le nom est obligatoire");
        expect(verifierPersonne({ nom: "Benali", prenom: "" })).toBe("Le prénom est obligatoire");
        expect(verifierPersonne({})).toBe("Le nom est obligatoire");
    });

    test("les champs facultatifs sont contrôlés quand ils sont là", () => {
        expect(verifierPersonne({ nom: "B", prenom: "A", sexe: "X" })).toBe("Sexe inconnu");
        expect(verifierPersonne({ nom: "B", prenom: "A", date_naissance: "12/03/2014" })).toBe("Date de naissance attendue en AAAA-MM-JJ");
        expect(verifierPersonne({ nom: "B", prenom: "A", email_contact: "amina" })).toBe("Adresse de contact invalide");
        expect(verifierPersonne({ nom: "B", prenom: "A", cne: "AB-12" })).toBe("Code Massar : 20 caractères alphanumériques au plus");
        expect(verifierPersonne({ nom: "B", prenom: "A", date_naissance: "2014-03-12", email_contact: "a@b.ma", cne: "G123456789" })).toBeNull();
    });

    test("le nom s'écrit en capitales sur les listes", () => {
        expect(nomComplet({ prenom: "Amina", nom: "benali" })).toBe("Amina BENALI");
        expect(nomComplet({ prenom: "", nom: "Benali " })).toBe("BENALI");
    });
});

describe("Inscription", () => {
    test("l'année et le niveau sont obligatoires, l'état doit exister", () => {
        expect(verifierInscription({ id_annee: 1, niveau: "6A" })).toBeNull();
        expect(verifierInscription({ niveau: "6A" })).toBe("Année scolaire requise");
        expect(verifierInscription({ id_annee: 1, niveau: "  " })).toBe("Niveau requis");
        expect(verifierInscription({ id_annee: 1, niveau: "6A", etat: "perdue" })).toBe("État d'inscription inconnu");
    });

    test("elle avance d'un cran, ou se termine", () => {
        expect(ETATS_INSCRIPTION).toEqual(["demandee", "engagee", "confirmee", "inscrite", "radiee", "passante"]);
        expect(transitionAutorisee("demandee", "engagee")).toBe(true);
        expect(transitionAutorisee("confirmee", "inscrite")).toBe(true);
        expect(transitionAutorisee("inscrite", "radiee")).toBe(true);
        expect(transitionAutorisee("demandee", "inscrite")).toBe(false);
        expect(transitionAutorisee("radiee", "confirmee")).toBe(false);
        expect(etatsSuivants("radiee")).toEqual([]);
        expect(etatsSuivants("inscrite")).toEqual(["passante", "radiee"]);
    });

    test("les liens de famille sont une liste fermée", () => {
        expect(LIENS_FAMILLE).toEqual(["pere", "mere", "tuteur", "autre"]);
    });
});
