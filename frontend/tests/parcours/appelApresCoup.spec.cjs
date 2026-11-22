/**
 * Parcours de M-1 (P-1, étude EP-18, contexte C2) : l'enseignante imprime la liste d'appel depuis
 * l'onglet « Appel » de sa classe ; la séance d'hier, sans appel, est « à saisir » ; sa page s'ouvre
 * sans QR code, l'appel fait sur papier s'y saisit et se termine ; l'onglet le montre alors fait.
 * Données : la séance d'hier de donnees.mjs, à distance, sur le créneau existant. Le créneau du jour
 * (#210) n'est pas touché, et la retardataire d'appelClasse n'est pas cochée ici.
 */
const { test, expect } = require("@playwright/test");
const { lireDonnees, seConnecter, ouvrirClasse } = require("./outils.cjs");

test("appel fait sur papier : la liste s'imprime, la séance d'hier se saisit après coup", async ({ page }) => {
  test.setTimeout(240_000);
  const { enseignante, motDePasse, seance, seanceHier, etudiants } = lireDonnees();
  await seConnecter(page, { email: enseignante.email, motDePasse, role: "enseignant" });
  const { idCours, idGroupe } = await ouvrirClasse(page, seance);
  await page.getByRole("tab", { name: "Appel" }).click();

  // La séance d'hier : à saisir après coup ; sa liste d'appel s'imprime dans une fenêtre à part
  const ligneHier = page.getByRole("listitem").filter({ hasText: /Appel à saisir après coup/ });
  await expect(ligneHier).toHaveCount(1, { timeout: 20_000 });
  const [feuille] = await Promise.all([page.waitForEvent("popup"), ligneHier.getByRole("button", { name: "Imprimer la liste d’appel" }).click()]);
  await expect(feuille.getByRole("heading", { name: "Liste d’appel" })).toBeVisible();
  await expect(feuille.getByRole("cell", { name: etudiants[0].nom, exact: true })).toBeVisible();
  await feuille.close();

  // Sa page s'ouvre sans QR code : on coche d'après la feuille, puis on termine
  await ligneHier.getByRole("button", { name: /Appel à saisir après coup/ }).click();
  await expect(page).toHaveURL(new RegExp(`/appel/${seanceHier.id}$`));
  await expect(page.getByText(/appel fait sur papier/)).toBeVisible();
  await expect(page.getByRole("img", { name: /QR code/ })).toHaveCount(0);
  const statut = page.getByRole("group", { name: `Statut de ${etudiants[0].prenom} ${etudiants[0].nom}` });
  await statut.getByRole("button", { name: "Présent" }).click();
  await expect(statut.getByRole("button", { name: "Présent" })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Terminer l’appel" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Terminer l’appel" }).click();
  await expect(page.getByText(/Appel terminé/).first()).toBeVisible();

  // L'onglet montre l'appel fait, avec son bilan
  await page.goto(`/mes-classes/${idCours}/${idGroupe}?onglet=appel`);
  await expect(page.getByRole("listitem").filter({ hasText: /Appel à saisir après coup/ })).toHaveCount(0, { timeout: 20_000 });
  await expect(page.getByRole("button", { name: /1 présents/ }).first()).toBeVisible();
});
