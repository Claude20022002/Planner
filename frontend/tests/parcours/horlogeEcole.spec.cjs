/**
 * Parcours de régression de M-10 (P-1) : le site prend l'heure de l'école dans l'horloge que rend le
 * serveur (GET /api/etablissement), jamais dans le fuseau du navigateur. L'école des parcours reste
 * à UTC+0 (créneau du jour de #210) : ici, seule la réponse lue par le navigateur dit UTC+1, et
 * l'horloge de la page est figée à 23 h 30 UTC. L'école est alors déjà au lendemain ; avec l'ancien
 * décalage figé à 0, la date proposée était celle du jour.
 */
const { test, expect } = require("@playwright/test");
const { lireDonnees, seConnecter } = require("./outils.cjs");

const UTC_PLUS_1 = { fuseau: "Africa/Kinshasa", decalages: [{ depuis: "2000-01-01T00:00:00.000Z", minutes: 60 }] };

test("à 23 h 30 UTC, une école à UTC+1 propose la date du lendemain", async ({ browser }) => {
  test.setTimeout(120_000);
  const { enseignante, motDePasse } = lireDonnees();
  const jour = new Date().toISOString().slice(0, 10);
  const lendemain = new Date(Date.parse(`${jour}T12:00:00Z`) + 24 * 3600 * 1000).toISOString().slice(0, 10);

  // Un navigateur en UTC : sans le correctif, rien ne le ferait passer au lendemain
  const contexte = await browser.newContext({ timezoneId: "UTC" });
  const page = await contexte.newPage();
  await page.route("**/api/etablissement", async (route) => {
    // Un corps neuf, sans reprendre les en-têtes d'origine (leur longueur ne vaudrait plus)
    const identite = await (await route.fetch()).json();
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ...identite, horloge: UTC_PLUS_1 }) });
  });
  await page.clock.setFixedTime(new Date(`${jour}T23:30:00Z`));
  await seConnecter(page, { email: enseignante.email, motDePasse, role: "enseignant" });

  await page.goto("/disponibilites");
  await page.getByRole("button", { name: "Déclarer une absence" }).click();
  const fenetre = page.getByRole("dialog");
  await expect(fenetre.getByLabel("Du")).toHaveValue(lendemain);
  await expect(fenetre.getByLabel("Au")).toHaveValue(lendemain);
  await contexte.close();
});
