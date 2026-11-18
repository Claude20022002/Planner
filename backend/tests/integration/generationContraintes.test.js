import http from "http";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
    Groupe,
    Periode,
    Salle,
    ValeurParametre,
    VersionParametres,
} from "../../models/index.js";
import { attendreGeneration } from "../../services/generation/timefold/generation.js";

/**
 * MOT-13b : la génération envoie au solveur les contraintes déclarées, compilées, et les poids des
 * règles du profil ; le rapport porte le bilan de chaque contrainte. Un faux solveur HTTP pose la
 * k-ième séance sur le k-ième créneau : le bilan attendu se calcule à la main.
 */

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const JETON = "jeton-de-test-0123456789abcdef-0123";

let client;
let ref;
let solveur;
let problemes;

/** Les poids par défaut du solveur, lus dans PreferencesEmploiDuTemps.java. */
const poidsParDefaut = () => {
    const java = readFileSync(path.join(RACINE, "solver/src/main/java/ma/hestim/solver/contraintes/PreferencesEmploiDuTemps.java"), "utf8");
    const noms = new Map([...java.matchAll(/public static final String (\w+) = "([^"]+)";/g)].map((m) => [m[1], m[2]]));
    return Object.fromEntries([...java.matchAll(/poids\.put\((\w+), (\d+)\);/g)].map((m) => [noms.get(m[1]), Number(m[2])]));
};

const demarrerFauxSolveur = () =>
    new Promise((resolve) => {
        problemes = [];
        const resultats = new Map();
        solveur = http.createServer((req, res) => {
            let corps = "";
            req.on("data", (c) => (corps += c));
            req.on("end", () => {
                const repondre = (code, data) => {
                    res.writeHead(code, { "Content-Type": "application/json" });
                    res.end(JSON.stringify(data));
                };
                if (req.headers["x-solver-token"] !== JETON) return repondre(401, {});
                if (req.method === "POST" && req.url === "/timetables") {
                    const probleme = JSON.parse(corps);
                    problemes.push(probleme);
                    const creneaux = [...probleme.creneaux].sort((a, b) => a.jour - b.jour || a.rang - b.rang);
                    const id = `calcul-${problemes.length}`;
                    resultats.set(id, probleme.lecons.filter((l) => !l.epinglee).map((l, k) => ({ id: l.id, creneauId: creneaux[k].id, salleId: probleme.salles[0].id })));
                    return repondre(202, { id, dureeSecondes: probleme.dureeSecondes });
                }
                const m = req.url.match(/^\/timetables\/(.+)$/);
                if (m && req.method === "GET") {
                    return repondre(200, { id: m[1], statut: "NOT_SOLVING", secondes: 1, score: "0hard/0medium/-3soft", dur: 0, moyen: 0, souple: -3, lecons: resultats.get(m[1]) ?? [], violations: [], leconsEnConflit: [] });
                }
                return repondre(404, {});
            });
        });
        solveur.listen(0, "127.0.0.1", () => {
            process.env.SOLVER_URL = `http://127.0.0.1:${solveur.address().port}`;
            process.env.SOLVER_TOKEN = JETON;
            resolve();
        });
    });

const declarer = async (corps) => {
    const creee = await client.send("post", "/api/moteur/versions", corps);
    expect(creee.status).toBe(201);
    expect((await client.send("post", `/api/moteur/versions/${creee.body.id_version}/appliquer`)).status).toBe(200);
};

const generer = async () => {
    const reponse = await client.send("post", "/api/generation-automatique/generer", { id_periode: ref.periode.id_periode, id_filieres: [ref.filiere.id_filiere], duree_secondes: 10 });
    expect(reponse.status).toBe(202);
    const id = reponse.body.session.id_generation_session;
    await attendreGeneration(id);
    return { session: (await client.get(`/api/generation-automatique/sessions/${id}`)).body, probleme: problemes.at(-1) };
};

beforeAll(async () => {
    await resetDatabase();
    await demarrerFauxSolveur();
    const admin = await createUser("admin");
    const profs = [await createUser("enseignant"), await createUser("enseignant"), await createUser("enseignant")];
    client = await loginAs(admin);

    const campus = await Campus.findOne({ where: { actif: true } });
    const filiere = await Filiere.create({ code_filiere: "COL", nom_filiere: "Collège" });
    const groupe = (nom, type, parent) => Groupe.create({ nom_groupe: nom, niveau: "4e", annee: 4, effectif: 14, annee_scolaire: "2026-2027", type_groupe: type, id_groupe_parent: parent ?? null, id_filiere: filiere.id_filiere });
    const classe = await groupe("4e A", "promotion");
    const espagnol = await groupe("4e A espagnol", "td", classe.id_groupe);
    const allemand = await groupe("4e A allemand", "td", classe.id_groupe);
    await Salle.create({ nom_salle: "S-COL1", type_salle: "Salle de cours", capacite: 30, id_campus: campus.id_campus });
    for (const jour of ["lundi", "mardi"]) {
        for (const [r, debut, fin] of [[1, "09:00", "10:45"], [2, "11:00", "12:30"], [3, "13:30", "15:15"], [4, "15:30", "17:00"]]) {
            await Creneau.create({ jour_semaine: jour, heure_debut: debut, heure_fin: fin, duree_minutes: 90, rang: r });
        }
    }
    const annee = await AnneeUniversitaire.create({ libelle: "2026-2027", date_debut: "2026-09-01", date_fin: "2027-07-31", active: true });
    const periode = await Periode.create({ id_annee: annee.id_annee, code: "S2", date_debut: "2027-03-01", date_fin: "2027-05-22", nb_semaines: 12 });
    const matiere = async (code, nom, groupeId, prof, seances) => {
        const cours = await Cours.create({ code_cours: code, nom_cours: nom, niveau: "4e", volume_horaire: 24, type_cours: "CM", semestre: "S2", id_filiere: filiere.id_filiere });
        const composante = await CoursComposante.create({ id_cours: cours.id_cours, type: "CM", volume_heures: 24, niveau_groupe: "promotion", creneaux_par_seance: 1, seances_par_semaine: seances });
        const ens = await Enseignement.create({ id_composante: composante.id_composante, id_periode: periode.id_periode, heures_prevues: 24 });
        await ens.setGroupes([groupeId]);
        await EnseignementEnseignant.create({ id_enseignement: ens.id_enseignement, id_user: prof.id_user, role: "principal", statut_service: "accepte" });
        return cours;
    };
    // Dans cet ordre, le faux solveur pose : français lundi 9 h et 11 h, espagnol lundi 13 h 30, allemand lundi 15 h 30
    const francais = await matiere("COL-FR", "Français", classe.id_groupe, profs[0], 2);
    const esp = await matiere("COL-ES", "Espagnol", espagnol.id_groupe, profs[1], 1);
    const all = await matiere("COL-AL", "Allemand", allemand.id_groupe, profs[2], 1);
    ref = { filiere, classe, periode, francais, esp, all };
});
afterAll(async () => {
    await new Promise((r) => solveur.close(r));
    await closeDatabase();
});
beforeEach(async () => {
    resetRateLimiters();
    await ContrainteDeclaree.update({ retire_id: null }, { where: {} });
    await ContrainteDeclaree.destroy({ where: {} });
    await ValeurParametre.destroy({ where: {} });
    await VersionParametres.update({ annule_version: null }, { where: {} });
    await VersionParametres.destroy({ where: {} });
});

describe("MOT-13b : ce que reçoit le solveur", () => {
    test("sans réglage de l'école : aucune contrainte, et exactement les poids d'avant MOT-13b", async () => {
        const { session, probleme } = await generer();
        expect(session.status).toBe("completed");
        expect(probleme.contraintesDeclarees).toEqual([]);
        expect(probleme.poidsDesRegles).toEqual(poidsParDefaut());
        expect(Object.keys(probleme.poidsDesRegles)).toHaveLength(9);
        expect(session.config.rapport.contraintes).toEqual([]);
    });

    test("les contraintes en vigueur, compilées ; une règle coupée part à 0 ; un poids changé est envoyé", async () => {
        await declarer({
            lignes: [
                { cle: "HOR.REGLE.TROUS", valeur: false },
                { cle: "HOR.REGLE.CHANGEMENT_SALLE", poids: 7 },
            ],
            contraintes: [
                { gabarit: "ensemble_ou_separe", nature: "impossible", cibles: [{ type: "groupe", id: ref.classe.id_groupe }], parametres: { matieres_a: [ref.esp.id_cours], matieres_b: [ref.all.id_cours], relation: "en_meme_temps" } },
                { gabarit: "plage_a_eviter", cibles: [{ type: "ecole", id: null }], parametres: { jours: ["lundi"], debut: "08:00", fin: "10:00" } },
            ],
        });
        const { session, probleme } = await generer();
        expect(session.status).toBe("completed");
        expect(probleme.poidsDesRegles).toEqual({ ...poidsParDefaut(), "Journées sans trous": 0, "Même salle pour deux cours qui se suivent": 7 });

        const lecons = Object.fromEntries(probleme.lecons.map((l) => [l.coursId, probleme.lecons.filter((x) => x.coursId === l.coursId).map((x) => x.id)]));
        const lundi9h = probleme.creneaux.find((c) => c.jour === 1 && c.rang === 1).id;
        const [ensemble, plage] = probleme.contraintesDeclarees;
        expect(ensemble).toMatchObject({ famille: "ENSEMBLE", niveau: "DUR", relation: "EN_MEME_TEMPS", paquets: [{ a: lecons[ref.esp.id_cours], b: lecons[ref.all.id_cours] }] });
        expect(ensemble).not.toHaveProperty("poids");
        expect(plage).toMatchObject({ famille: "PLAGE", niveau: "SOUPLE", poids: 30, salles: [], creneaux: [lundi9h] });
        expect(plage.lecons).toHaveLength(4);

        // Le bilan : le français de lundi 9 h tombe dans la plage ; l'espagnol et l'allemand ne sont pas alignés
        const [bilanEnsemble, bilanPlage] = session.config.rapport.contraintes;
        expect(bilanEnsemble).toMatchObject({ phrase: "Espagnol et Allemand en même temps pour le groupe 4e A.", nature: "impossible", etat: "non_respectee", fois: 2 });
        expect(bilanEnsemble.exemples).toEqual(["Espagnol (4e A espagnol), lundi 13 h 30", "Allemand (4e A allemand), lundi 15 h 30"]);
        expect(bilanPlage).toMatchObject({ nature: "souhait", insistance: "normal", etat: "non_respectee", fois: 1, exemples: ["Français (4e A), lundi 9 h"] });
    });

    test("une contrainte qui ne vise aucune séance part vide, et le bilan la dit sans effet", async () => {
        await declarer({ contraintes: [{ gabarit: "repartition", cibles: [{ type: "matiere", id: ref.esp.id_cours }], parametres: { ecart_jours: 1 } }] });
        const { session, probleme } = await generer();
        expect(probleme.contraintesDeclarees).toEqual([expect.objectContaining({ famille: "REPARTITION", paquets: [] })]);
        expect(session.config.rapport.contraintes).toEqual([expect.objectContaining({ etat: "sans_effet", fois: 0 })]);
    });
});

describe("MOT-13b : un poids plus fin que l'école", () => {
    test("refusé à l'enregistrement : portee_non_tenue", async () => {
        const r = await client.send("post", "/api/moteur/versions", { lignes: [{ cle: "HOR.REGLE.TROUS", portee: "filiere", id_portee: ref.filiere.id_filiere, poids: 30 }] });
        expect(r.status).toBe(400);
        expect(r.body.violations.map((v) => v.code)).toEqual(["portee_non_tenue"]);
    });
});
