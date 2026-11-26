/**
 * Données des parcours de démonstration (lot B-8) : une base de test jetable, remplie avec les
 * outils des tests d'intégration du serveur (backend/tests/integration/helpers/testApp.js).
 *
 * Contenu : un administrateur, une enseignante, une classe de 8 étudiants et une séance
 * aujourd'hui, en cours de 00 h 00 à 24 h 00, plus la même le lendemain (l'appel ne s'ouvre que le
 * jour de la séance, et « Mes classes » met en avant la classe en cours ; un passage qui traverse
 * minuit trouve encore une séance ouverte). S'y ajoute, hors de la classe, une étudiante dont
 * le compte est déjà lié à un téléphone (parcours du changement de téléphone, R-10). Les comptes et
 * leur mot de passe sont créés ici :
 * aucun identifiant n'est écrit dans les tests. Les données de la génération sont dans
 * donneesGeneration.mjs.
 */
import { pathToFileURL } from "node:url";
import path from "node:path";
import { creerGrille } from "./grille.mjs";
import { preparerGeneration } from "./donneesGeneration.mjs";
import { preparerIiia } from "./donneesIiia.mjs";

// La séance doit tomber « aujourd'hui » pour le serveur : le même fuseau que lui (M-10), lu à l'appel,
// après setupEnv.js (APP_TIMEZONE=UTC si la CI ne l'a pas posé)
const fuseau = () => process.env.APP_TIMEZONE || "UTC";
const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
// Identifiants d'installation de l'application (R-10) : l'ancien téléphone est lié à la préparation
const TELEPHONES = { ancien: "parcours-ancien-telephone-r10", nouveau: "parcours-nouveau-telephone-r10" };
const ETUDIANTS = [["Salma", "Bennani"], ["Yassine", "Alami"], ["Imane", "Tazi"], ["Omar", "Idrissi"], ["Kenza", "Berrada"], ["Mehdi", "Chraibi"], ["Sara", "El Fassi"], ["Anas", "Lahlou"]];

/** Vide la base de test, la remplit et rend les comptes et la séance créés. */
export const preparerDonnees = async (racine) => {
  const serveur = (chemin) => import(pathToFileURL(path.join(racine, "backend", chemin)).href);
  const { resetDatabase, createUser, createPlanningFixture, PASSWORD } = await serveur("tests/integration/helpers/testApp.js");
  const { Affectation, AnneeUniversitaire, AppareilEtudiant, Appartenir, ConfigurationEtablissement, CoursComposante, Creneau, Enseignement, EnseignementEnseignant, EnvoiEdt, Periode } = await serveur("models/index.js");
  const { empreinteAppareil } = await serveur("services/presences/appareil.js");

  await resetDatabase();
  // Sondages des enseignants (lot EC-9) : éteints pour une base neuve, allumés pour leur parcours
  await ConfigurationEtablissement.update({ sondages_actifs: true }, { where: { id: 1 } });
  const admin = await createUser("admin", { prenom: "Admin", nom: "Parcours", email: "admin.parcours@exemple.hestim.test" });
  const enseignante = await createUser("enseignant", { prenom: "Nadia", nom: "Sefrioui", email: "prof.parcours@exemple.hestim.test" });
  const etudiants = [];
  for (const [i, [prenom, nom]] of ETUDIANTS.entries()) {
    etudiants.push(await createUser("etudiant", { prenom, nom, email: `etu${i + 1}.parcours@exemple.hestim.test` }));
  }
  const changeDeTelephone = await createUser("etudiant", { prenom: "Rania", nom: "Kettani", email: "etu.telephone.parcours@exemple.hestim.test" });
  await AppareilEtudiant.create({ id_user: changeDeTelephone.id_user, appareil: empreinteAppareil(TELEPHONES.ancien), lie_le: new Date() });
  const fixture = await createPlanningFixture({ admin, enseignant: enseignante, etudiant: etudiants[0] });
  for (const e of etudiants.slice(1)) await Appartenir.create({ id_user_etudiant: e.id_user, id_groupe: fixture.groupe.id_groupe });

  const maintenant = new Date();
  const aujourdhui = maintenant.toLocaleDateString("en-CA", { timeZone: fuseau() });
  const jourDe = (date) => JOURS[new Date(`${date}T12:00:00Z`).getUTCDay()];
  const plusTard = (date, jours) => {
    const d = new Date(`${date}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + jours);
    return d.toISOString().slice(0, 10);
  };
  // 24:00 reste après 23:59 dans la comparaison du serveur. S'il revient autrement, on s'arrête.
  const creneauTouteLaJournee = async (jourSemaine) => {
    const cree = await Creneau.create({ jour_semaine: jourSemaine, heure_debut: "00:00:00", heure_fin: "24:00:00", duree_minutes: 1440 });
    const relu = await Creneau.findByPk(cree.id_creneau);
    const fin = String(relu?.heure_fin ?? "").slice(0, 5);
    if (fin !== "24:00") throw new Error(`Le créneau du ${jourSemaine} n'a pas gardé 24:00 (lu : ${relu?.heure_fin}). Arrêt, sans autre codage.`);
    return cree;
  };
  const creneau = await creneauTouteLaJournee(jourDe(aujourdhui));
  const seanceDu = (date, idCreneau, idSalle) => Affectation.create({
    date_seance: date,
    statut: "confirme",
    id_cours: fixture.cours.id_cours,
    id_groupe: fixture.groupe.id_groupe,
    id_user_enseignant: enseignante.id_user,
    id_salle: idSalle,
    id_creneau: idCreneau,
    id_user_admin: admin.id_user,
  });
  const seance = await seanceDu(aujourdhui, creneau.id_creneau, fixture.salle.id_salle);
  const demain = plusTard(aujourdhui, 1);
  const creneauDemain = await creneauTouteLaJournee(jourDe(demain));
  await seanceDu(demain, creneauDemain.id_creneau, fixture.salle.id_salle);
  // La même séance dans une semaine, à distance (sans salle) : son lien de visio (lot EC-11, lienVisio.spec)
  const seanceADistance = await seanceDu(plusTard(aujourdhui, 7), creneau.id_creneau, null);

  // Les étudiants ne voient un mois qu'une fois publié : ceux de la séance du jour, du lendemain, de la séance à distance et de la séance fixe de la classe le sont
  const moisPublies = [...new Set([aujourdhui, demain, seanceADistance.date_seance, String(fixture.affectation.date_seance).slice(0, 10)].map((d) => String(d).slice(0, 7)))];
  // Avec les séances telles que publiées : c'est cette version que lisent les étudiants
  const { lignesDuMois } = await serveur("services/calendrier/envoiEdt.js");
  for (const mois of moisPublies) {
    await EnvoiEdt.create({ id_groupe: fixture.groupe.id_groupe, mois, seances: await lignesDuMois(fixture.groupe, mois), envoye_le: new Date(), nb_destinataires: etudiants.length });
  }

  const grille = await creerGrille(Creneau);
  const generation = await preparerGeneration(racine, admin, grille);
  // Après la génération GEN, qui crée l'année 2026-2027
  const iiia = await preparerIiia(racine);

  // La classe du jour est aussi un enseignement de l'enseignante, comme dans les vraies données :
  // « Créer un quiz » n'accepte qu'un groupe qui suit le module. Sur une autre année, inactive, pour
  // ne rien changer aux générations du S1 et du S2 (parcours iiia et generation)
  const annee = await AnneeUniversitaire.create({ libelle: "2025-2026", date_debut: "2025-09-01", date_fin: "2026-07-31", active: false });
  const s1 = await Periode.create({ id_annee: annee.id_annee, code: "S1", date_debut: "2025-09-15", date_fin: "2026-01-23", nb_semaines: 15 });
  const composante = await CoursComposante.create({ id_cours: fixture.cours.id_cours, type: "CM", volume_heures: 21, niveau_groupe: "promotion" });
  const enseignement = await Enseignement.create({ id_composante: composante.id_composante, id_periode: s1.id_periode, heures_prevues: 21 });
  await enseignement.setGroupes([fixture.groupe.id_groupe]);
  await EnseignementEnseignant.create({ id_enseignement: enseignement.id_enseignement, id_user: enseignante.id_user, role: "principal", statut_service: "accepte" });

  const compte = (u) => ({ email: u.email, prenom: u.prenom, nom: u.nom });
  return {
    motDePasse: PASSWORD,
    admin: compte(admin),
    enseignante: compte(enseignante),
    etudiants: etudiants.map(compte),
    changementTelephone: { etudiante: compte(changeDeTelephone), ...TELEPHONES },
    seance: { id: seance.id_affectation, cours: fixture.cours.nom_cours, groupe: fixture.groupe.nom_groupe },
    seanceADistance: { id: seanceADistance.id_affectation, date: String(seanceADistance.date_seance).slice(0, 10) },
    // Séance déjà planifiée lundi 4 janvier 2027 à 9 h (createPlanningFixture) : le parcours des séances la percute
    seanceFixe: { date: String(fixture.affectation.date_seance).slice(0, 10), salle: fixture.salle.nom_salle, groupe: fixture.groupe.nom_groupe, autreGroupe: fixture.autreGroupe.nom_groupe },
    generation,
    iiia,
  };
};
