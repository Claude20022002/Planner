/**
 * Parcours « sondage » (plan multi-établissements, lot EC-9 ; conception-ec9-groupe-b.md) :
 * l'enseignante pose une question à sa classe depuis l'onglet « Sondages » ; une étudiante le voit
 * au-dessus des supports et répond ; l'enseignante voit le nombre de réponses, sans la répartition
 * (moins de 3 réponses : elle se devinerait), puis clôt le sondage, qui disparaît chez l'étudiante.
 * Les sondages sont allumés pour l'école des parcours (donnees.mjs).
 *
 * La classe s'ouvre par sa carte, à toute heure. La séance du jour des parcours finit à 23 h 55 : le
 * bouton « Supports de cours » de la classe en cours disparaissait alors, et le parcours échouait
 * (CI du 15 nov. ; docs/conception/qualite/fix-sondage-minuit.md). Les deux premiers tests le vérifient
 * juste avant et juste après minuit UTC, sans attendre.
 */
const { test, expect } = require("@playwright/test");
const { lireDonnees, seConnecter, ouvrirClasse } = require("./outils.cjs");

const QUESTION = "Quel jour pour le rattrapage ?";

// Ce que rend le serveur après la fin de la séance du jour, puis le lendemain : aucune classe en cours
// (backend/services/planning/mesClasses.js). Son horloge ne se déplace pas depuis le test : on réécrit sa réponse.
const sansSeanceEnCours = (classes) => classes.map((c) => ({ ...c, en_cours: false, prochaine_seance: null }));

const MOMENTS = [
  { nom: "à 23 h 58 UTC, la séance du jour finie", jours: 0, heure: "23:58:00" },
  { nom: "à 00 h 02 UTC, le lendemain de la séance", jours: 1, heure: "00:02:00" },
];

for (const { nom, jours, heure } of MOMENTS) {
  test(`sondage ${nom} : la classe s'ouvre encore, onglet « Sondages » compris`, async ({ browser }) => {
    test.setTimeout(120_000);
    const { enseignante, motDePasse, seance } = lireDonnees();
    const contexte = await browser.newContext();
    const page = await contexte.newPage();
    // Horloge de la page arrêtée à cet instant ; la date de l'école est celle d'UTC (shared/dates.js)
    const jour = new Date();
    jour.setUTCDate(jour.getUTCDate() + jours);
    await page.clock.setFixedTime(new Date(`${jour.toISOString().slice(0, 10)}T${heure}Z`));
    await page.route("**/api/enseignants/mes-classes", async (route) => {
      const reponse = await route.fetch();
      await route.fulfill({ response: reponse, json: sansSeanceEnCours(await reponse.json()) });
    });
    await seConnecter(page, { email: enseignante.email, motDePasse, role: "enseignant" });

    // L'état du 15 nov. : la carte de la classe est là, plus le bouton de la classe en cours
    await page.goto("/mes-classes");
    await expect(page.getByRole("button", { name: `Ouvrir ${seance.cours} · ${seance.groupe}`, exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole("button", { name: "Supports de cours" })).toHaveCount(0);

    await ouvrirClasse(page, seance);
    await page.getByRole("tab", { name: "Sondages" }).click();
    await expect(page.getByRole("button", { name: "Nouveau sondage" })).toBeVisible({ timeout: 20_000 });
    await contexte.close();
  });
}

test("sondage : l'enseignante pose une question, une étudiante répond, anonymement", async ({ browser }) => {
  // Deux comptes et la première compilation des pages par le site de développement
  test.setTimeout(180_000);
  const { enseignante, etudiants, motDePasse, seance } = lireDonnees();
  const prof = await browser.newPage();
  await seConnecter(prof, { email: enseignante.email, motDePasse, role: "enseignant" });

  // Mes classes → la carte de la classe → onglet « Sondages »
  const { idCours, idGroupe } = await ouvrirClasse(prof, seance);
  await prof.getByRole("tab", { name: "Sondages" }).click();
  await expect(prof.getByText("Aucun sondage pour le moment", { exact: false })).toBeVisible({ timeout: 20_000 });

  // Création : la règle partagée refuse deux choix identiques avant l'envoi
  await prof.getByRole("button", { name: "Nouveau sondage" }).click();
  await prof.getByRole("textbox", { name: "Question" }).fill(QUESTION);
  await prof.getByRole("textbox", { name: "Choix 1" }).fill("Mercredi");
  await prof.getByRole("textbox", { name: "Choix 2" }).fill("mercredi ");
  await prof.getByRole("button", { name: "Publier" }).click();
  await expect(prof.getByText("Deux choix sont identiques : changez l’un d’eux.")).toBeVisible();
  await prof.getByRole("textbox", { name: "Choix 2" }).fill("Samedi");
  await prof.getByRole("button", { name: "Ajouter un choix" }).click();
  await prof.getByRole("textbox", { name: "Choix 3" }).fill("Peu importe");
  await prof.getByRole("button", { name: "Publier" }).click();
  await expect(prof.getByText("Sondage publié. Les étudiants de la classe sont prévenus.")).toBeVisible();
  const carte = prof.getByRole("article", { name: QUESTION });
  await expect(carte.getByText("0 réponse sur 8 étudiants")).toBeVisible();

  // L'étudiante : le sondage au-dessus des supports ; une réponse, anonyme et définitive
  const etu = await browser.newPage();
  await seConnecter(etu, { email: etudiants[1].email, motDePasse, role: "etudiant" });
  await etu.goto(`/mes-cours/${idCours}/${idGroupe}`);
  const sondage = etu.getByRole("region", { name: QUESTION });
  await expect(sondage).toBeVisible({ timeout: 20_000 });
  await expect(sondage.getByRole("button", { name: "Répondre" })).toBeDisabled();
  await sondage.getByRole("radio", { name: "Samedi" }).check();
  await sondage.getByRole("button", { name: "Répondre" }).click();
  await expect(sondage.getByText("Réponse envoyée, merci. Elle reste anonyme.")).toBeVisible();
  await expect(sondage.getByRole("radio")).toHaveCount(0);

  // L'enseignante : une réponse, pas encore de répartition
  await prof.reload();
  await expect(carte.getByText("1 réponse sur 8 étudiants")).toBeVisible({ timeout: 20_000 });
  await expect(carte.getByText("La répartition s’affiche à partir de 3 réponses", { exact: false })).toBeVisible();
  await expect(carte.getByText(/· \d+ %/)).toHaveCount(0);

  // Clôture : le sondage reste chez l'enseignante, marqué « Fermé », et disparaît chez l'étudiante
  await carte.getByRole("button", { name: "Clore le sondage" }).click();
  await prof.getByRole("dialog").getByRole("button", { name: "Clore le sondage" }).click();
  await expect(prof.getByText("Sondage clos.")).toBeVisible();
  await expect(carte.getByText("Fermé", { exact: true })).toBeVisible();
  await etu.reload();
  // La page est chargée : ses supports (parcours espaceCours passé avant) ou la classe vide
  await expect(etu.getByRole("heading", { name: "Général" }).or(etu.getByText("Votre enseignant n’a encore rien partagé ici.")).first()).toBeVisible({ timeout: 20_000 });
  await expect(etu.getByRole("region", { name: QUESTION })).toHaveCount(0);

  // Ménage : le sondage est supprimé
  await carte.getByRole("button", { name: "Supprimer" }).click();
  await prof.getByRole("dialog").getByRole("button", { name: "Supprimer" }).click();
  await expect(prof.getByText("Sondage supprimé.")).toBeVisible();
  await expect(prof.getByText("Aucun sondage pour le moment", { exact: false })).toBeVisible();
});
