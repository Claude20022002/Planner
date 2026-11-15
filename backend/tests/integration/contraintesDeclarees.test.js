import { resetDatabase, closeDatabase, createUser, loginAs } from "./helpers/testApp.js";
import { resetRateLimiters } from "../../middleware/rateLimiterMiddleware.js";
import {
    AnneeUniversitaire,
    Campus,
    ContrainteDeclaree,
    Cours,
    CoursComposante,
    Creneau,
    Enseignement,
    EnseignementEnseignant,
    Filiere,
    GenerationSession,
    Groupe,
    Periode,
    Salle,
    ValeurParametre,
    VersionParametres,
} from "../../models/index.js";
import { construireProbleme } from "../../services/generation/timefold/probleme.js";
import { attendreGeneration, lancerGeneration } from "../../services/generation/timefold/generation.js";
import { manquesDePlace } from "../../services/moteur/contraintes/avantGeneration.js";
import { aujourdhui } from "../../services/moteur/valeurs/lecture.js";

/**
 * MOT-13a : contraintes déclarées par l'école. Cycle d'une version qui en porte, refus, retraits,
 * annulation, vérification à blanc, liste « Déjà pris en compte », refus de la génération par le
 * contrôle de place, et problème envoyé au solveur inchangé.
 */

let admin;
let client;
let ref;

const dansJours = (n) => {
    const d = new Date(`${aujourdhui()}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
};
const creer = (corps) => client.send("post", "/api/moteur/versions", corps);
const appliquer = (id) => client.send("post", `/api/moteur/versions/${id}/appliquer`);
const annuler = (id) => client.send("post", `/api/moteur/versions/${id}/annuler`);
const enVigueur = async (requete = "") => (await client.get(`/api/moteur/contraintes${requete}`)).body.contraintes;
/** Crée puis applique une version, et rend son numéro. */
const declarer = async (corps) => {
    const creee = await creer(corps);
    expect(creee.status).toBe(201);
    expect((await appliquer(creee.body.id_version)).status).toBe(200);
    return creee.body.id_version;
};
const plage = (id_groupe, jours, debut = "08:00", fin = "18:00") => ({ gabarit: "plage_interdite", cibles: [{ type: "groupe", id: id_groupe }], parametres: { jours, debut, fin } });

beforeAll(async () => {
    await resetDatabase();
    admin = await createUser("admin");
    const prof = await createUser("enseignant");
    client = await loginAs(admin);

    const campus = await Campus.findOne({ where: { actif: true } });
    const filiere = await Filiere.create({ code_filiere: "CTR", nom_filiere: "Contraintes" });
    const promo = await Groupe.create({ nom_groupe: "4A CTR", niveau: "4ème année", annee: 4, effectif: 30, annee_scolaire: "2026-2027", type_groupe: "promotion", id_filiere: filiere.id_filiere });
    const td = await Groupe.create({ nom_groupe: "CTR-TD1", niveau: "4ème année", annee: 4, effectif: 30, annee_scolaire: "2026-2027", type_groupe: "td", id_groupe_parent: promo.id_groupe, id_filiere: filiere.id_filiere });
    await Salle.create({ nom_salle: "S-CTR", type_salle: "Salle de cours", capacite: 40, id_campus: campus.id_campus });
    const c = (jour_semaine, heure_debut, heure_fin, rang) => Creneau.create({ jour_semaine, heure_debut, heure_fin, duree_minutes: 90, rang });
    for (const [jour, rangs] of [["lundi", 4], ["mardi", 2]]) {
        for (let r = 1; r <= rangs; r += 1) await c(jour, `${String(7 + 2 * r).padStart(2, "0")}:00`, `${String(8 + 2 * r).padStart(2, "0")}:30`, r);
    }
    const annee = await AnneeUniversitaire.create({ libelle: "2026-2027", date_debut: "2026-09-01", date_fin: "2027-07-31", active: true });
    const periode = await Periode.create({ id_annee: annee.id_annee, code: "S2", date_debut: "2027-03-01", date_fin: "2027-05-22", nb_semaines: 12 });
    const maths = await Cours.create({ code_cours: "CTR-MA", nom_cours: "Mathématiques", niveau: "4ème année", volume_horaire: 48, type_cours: "CM", semestre: "S8", id_filiere: filiere.id_filiere });
    const cm = await CoursComposante.create({ id_cours: maths.id_cours, type: "CM", volume_heures: 48, niveau_groupe: "promotion", creneaux_par_seance: 1, seances_par_semaine: 4 });
    const ens = await Enseignement.create({ id_composante: cm.id_composante, id_periode: periode.id_periode, heures_prevues: 48 });
    await ens.setGroupes([promo.id_groupe]);
    await EnseignementEnseignant.create({ id_enseignement: ens.id_enseignement, id_user: prof.id_user, role: "principal", statut_service: "accepte" });
    ref = { filiere, promo, td, periode, maths, prof };
});
afterAll(closeDatabase);
beforeEach(async () => {
    resetRateLimiters();
    // Un retrait renvoie à la contrainte qu'il retire, une version inverse à celle qu'elle annule : ces renvois tombent d'abord
    await ContrainteDeclaree.update({ retire_id: null }, { where: {} });
    await ContrainteDeclaree.destroy({ where: {} });
    await ValeurParametre.destroy({ where: {} });
    await VersionParametres.update({ annule_version: null }, { where: {} });
    await VersionParametres.destroy({ where: {} });
});

describe("Les modèles", () => {
    test("six modèles, tous tenus par le calcul depuis MOT-13b ; réservés à l'administration", async () => {
        const r = await client.get("/api/moteur/gabarits");
        expect(r.status).toBe(200);
        expect(r.body.map((g) => g.code)).toEqual(["plage_interdite", "plage_a_eviter", "moment_de_la_journee", "plafond_par_jour", "repartition", "ensemble_ou_separe"]);
        expect(r.body.every((g) => g.tenu === true)).toBe(true);
        const prof = await loginAs(ref.prof);
        expect((await prof.get("/api/moteur/gabarits")).status).toBe(403);
        expect((await prof.send("post", "/api/moteur/contraintes/verifier", { contraintes: [] })).status).toBe(403);
    });
});

describe("Une version qui porte des contraintes", () => {
    test("brouillon sans effet, puis appliquée : la contrainte est en vigueur, avec sa phrase", async () => {
        const creee = await creer({ libelle: "Mardi libre", contraintes: [plage(ref.promo.id_groupe, ["mardi"])] });
        expect(creee.status).toBe(201);
        expect(await enVigueur()).toEqual([]);
        expect((await appliquer(creee.body.id_version)).status).toBe(200);
        const [c] = await enVigueur();
        expect(c).toMatchObject({ gabarit: "plage_interdite", nature: "impossible", insistance: null, tenue_par_le_calcul: true, phrase: "Pas de cours pour le groupe 4A CTR le mardi, de 8 h à 18 h." });
    });

    test("un souhait prend « normal », et son poids suit l'insistance", async () => {
        await declarer({ contraintes: [{ gabarit: "moment_de_la_journee", cibles: [{ type: "matiere", id: ref.maths.id_cours }], parametres: { moment: "matin" } }] });
        const [c] = await enVigueur();
        expect(c).toMatchObject({ nature: "souhait", insistance: "normal", poids: 30, phrase: "Les cours de Mathématiques : plutôt le matin." });
    });

    test("refus : cible inexistante, modèle inconnu, insistance sur une impossibilité, version vide", async () => {
        const r = await creer({ contraintes: [plage(999999, ["lundi"]), { gabarit: "inconnu" }, { ...plage(ref.promo.id_groupe, ["lundi"]), insistance: "beaucoup" }] });
        expect(r.status).toBe(400);
        expect(r.body.violations.map((v) => [v.contrainte, v.code])).toEqual([
            [1, "gabarit_inconnu"],
            [2, "insistance_interdite"],
        ]);
        const inexistante = await creer({ contraintes: [plage(999999, ["lundi"])] });
        expect(inexistante.body.violations).toEqual([expect.objectContaining({ contrainte: 0, champ: "cibles", code: "cible_inexistante" })]);
        expect((await creer({ contraintes: [] })).body.code).toBe("VERSION_VIDE");
    });

    test("retirer une contrainte ; on ne retire pas ce qui n'est pas en vigueur", async () => {
        await declarer({ contraintes: [plage(ref.promo.id_groupe, ["mardi"]), plage(ref.td.id_groupe, ["lundi"], "08:00", "10:00")] });
        const [a, b] = await enVigueur();
        await declarer({ retirer: [a.id_contrainte] });
        expect((await enVigueur()).map((c) => c.id_contrainte)).toEqual([b.id_contrainte]);
        const r = await creer({ retirer: [a.id_contrainte, 424242] });
        expect(r.body.violations.map((v) => [v.retrait, v.code])).toEqual([
            [a.id_contrainte, "contrainte_introuvable"],
            [424242, "contrainte_introuvable"],
        ]);
    });

    test("annuler un retrait remet la contrainte ; annuler une version dont un ajout a été retiré depuis : 409", async () => {
        const v1 = await declarer({ contraintes: [plage(ref.promo.id_groupe, ["mardi"])] });
        const [a] = await enVigueur();
        const v2 = await declarer({ retirer: [a.id_contrainte] });
        expect((await annuler(v1)).body.code).toBe("VERSION_PLUS_RECENTE");
        expect((await annuler(v2)).status).toBe(201);
        const [remise] = await enVigueur();
        expect(remise).toMatchObject({ gabarit: "plage_interdite", parametres: a.parametres, cibles: a.cibles });
    });

    test("annuler une version qui n'a qu'ajouté retire ses contraintes", async () => {
        const v = await declarer({ contraintes: [plage(ref.promo.id_groupe, ["mardi"])] });
        expect((await annuler(v)).status).toBe(201);
        expect(await enVigueur()).toEqual([]);
    });

    test("une date d'effet future : rien aujourd'hui, en vigueur à cette date", async () => {
        await declarer({ date_effet: dansJours(3), contraintes: [plage(ref.promo.id_groupe, ["mardi"])] });
        expect(await enVigueur()).toEqual([]);
        expect(await enVigueur(`?date=${dansJours(3)}`)).toHaveLength(1);
    });
});

describe("Vérification à blanc", () => {
    test("phrases, refus et contradictions ; rien n'est enregistré", async () => {
        const moment = (m) => ({ gabarit: "moment_de_la_journee", cibles: [{ type: "matiere", id: ref.maths.id_cours }], parametres: { moment: m } });
        const r = await client.send("post", "/api/moteur/contraintes/verifier", { contraintes: [moment("matin"), moment("apres_midi"), plage(999999, ["lundi"])] });
        expect(r.status).toBe(200);
        expect(r.body.contraintes.map((c) => c.phrase)).toEqual(["Les cours de Mathématiques : plutôt le matin.", "Les cours de Mathématiques : plutôt l'après-midi.", null]);
        expect(r.body.contraintes[2].violations.map((v) => v.code)).toEqual(["cible_inexistante"]);
        expect(r.body.contradictions).toEqual([expect.objectContaining({ code: "moments_opposes", contraintes: [0, 1], en_vigueur: [] })]);
        expect(r.body.place).toBeNull();
        expect(await ContrainteDeclaree.count()).toBe(0);
    });

    test("avec une période : le manque de place nomme la contrainte en vigueur et la nouvelle", async () => {
        await declarer({ contraintes: [plage(ref.promo.id_groupe, ["mardi"])] });
        const [mardi] = await enVigueur();
        const r = await client.send("post", "/api/moteur/contraintes/verifier", { contraintes: [plage(ref.promo.id_groupe, ["lundi"], "08:00", "12:00")], id_periode: ref.periode.id_periode });
        expect(r.body.place).toEqual([expect.objectContaining({ type: "groupe", id: ref.td.id_groupe, besoin: 4, libres: 2, contraintes: [mardi.id_contrainte], contraintes_en_plus: [0] })]);
        expect(r.body.place[0].message).toMatch(/^Le groupe CTR-TD1 : 4 créneaux nécessaires par semaine, il en reste 2 à cause de « Pas de cours pour le groupe 4A CTR le mardi, de 8 h à 18 h » et « Pas de cours/);
    });
});

describe("Déjà pris en compte", () => {
    const regles = async () => (await client.get("/api/moteur/contraintes/profil")).body.regles;

    test("seules les règles que le calcul tient ; verrouillées, coupées, sans effet", async () => {
        const avant = await regles();
        expect(avant.find((r) => r.id === "PED.COGN.DIFFICILES_REPARTIES")).toBeUndefined();
        expect(avant.find((r) => r.id === "GRP.REGLE.CONFLIT")).toMatchObject({ verrouillee: true, etat: "active" });
        expect(avant.find((r) => r.id === "HOR.REGLE.TROUS")).toMatchObject({ verrouillee: false, etat: "active" });

        await declarer({ lignes: [{ cle: "HOR.REGLE.TROUS", valeur: false }] });
        expect((await regles()).find((r) => r.id === "HOR.REGLE.TROUS").etat).toBe("coupee");

        const actifs = await Campus.findAll({ where: { actif: true } });
        await Campus.update({ actif: false }, { where: { id_campus: actifs.slice(1).map((x) => x.id_campus) } });
        try {
            const unCampus = (await regles()).find((r) => r.id === "HOR.REGLE.UN_CAMPUS_PAR_JOUR");
            expect(unCampus).toMatchObject({ etat: "sans_effet" });
            expect(unCampus.raison).toMatch(/il faut au moins 2/);
        } finally {
            await Campus.update({ actif: true }, { where: { id_campus: actifs.map((x) => x.id_campus) } });
        }
    });
});

describe("La génération", () => {
    test("des plages interdites qui ne laissent pas assez de place arrêtent la génération, avec leur nom", async () => {
        await declarer({ contraintes: [plage(ref.promo.id_groupe, ["mardi"]), plage(ref.promo.id_groupe, ["lundi"], "08:00", "12:00")] });
        const ids = (await enVigueur()).map((c) => c.id_contrainte);
        const session = await lancerGeneration({ id_periode: ref.periode.id_periode, user: admin });
        await attendreGeneration(session.id_generation_session);
        const fin = await GenerationSession.findByPk(session.id_generation_session);
        expect(fin.status).toBe("failed");
        expect(fin.last_message).toMatch(/^Le groupe CTR-TD1 : 4 créneaux nécessaires par semaine, il en reste 2/);
        expect(fin.config.refus_place).toEqual([expect.objectContaining({ id: ref.td.id_groupe, contraintes: ids })]);
    });

    test("des souhaits, ou assez de place : rien à refuser, et le problème envoyé au solveur ne change pas", async () => {
        const sans = await construireProbleme({ id_periode: ref.periode.id_periode });
        await declarer({
            contraintes: [
                plage(ref.promo.id_groupe, ["mardi"], "08:00", "10:00"),
                { gabarit: "plage_a_eviter", cibles: [{ type: "ecole", id: null }], parametres: { jours: ["lundi"], debut: "08:00", fin: "18:00" } },
                { gabarit: "repartition", cibles: [{ type: "matiere", id: ref.maths.id_cours }], parametres: { ecart_jours: 1 } },
            ],
        });
        const avec = await construireProbleme({ id_periode: ref.periode.id_periode });
        expect(avec.probleme).toEqual(sans.probleme);
        expect(await manquesDePlace({ probleme: avec.probleme, date: aujourdhui() })).toEqual([]);
    });
});
