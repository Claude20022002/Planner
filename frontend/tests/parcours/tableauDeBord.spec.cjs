/**
 * Parcours du tableau de bord de l'administration (UIX-11) : six blocs indépendants, chaque chiffre
 * avec sa période, un volet qui montre ses lignes ; un bloc en panne échoue seul ; aucune violation
 * WCAG A/AA (axe-core) en clair et en sombre ; un chiffre s'ouvre et se ferme au clavier.
 * Données du jeu d'essai des parcours (fictives).
 */
const { test, expect } = require("@playwright/test");
const { lireDonnees, seConnecter } = require("./outils.cjs");

const BLOCS = ["À traiter", "Cette semaine", "Suivi", "À venir", "Usage du mois", "Prochains départs · campus"];

const ouvrirTableau = async (page, mode = "light") => {
  const { admin, motDePasse } = lireDonnees();
  await page.addInitScript((m) => localStorage.setItem("themeMode", m), mode);
  await seConnecter(page, { email: admin.email, motDePasse, role: "admin" });
  await expect(page).toHaveURL(/\/dashboard\/admin$/);
};

/** Tous les blocs ont fini de charger (aucun squelette). */
const attendreLesBlocs = async (page) => {
  for (const nom of BLOCS) await expect(page.getByRole("region", { name: nom })).toBeVisible();
  await expect(page.locator('[aria-busy="true"]')).toHaveCount(0, { timeout: 20_000 });
};

/** La valeur d'un chiffre, lue au début de son nom accessible (« 1 234 séances… »). */
const valeurDe = async (bouton) => Number((await bouton.getAttribute("aria-label")).match(/^[\d\s  ]+/)[0].replace(/\D/g, ""));

async function verifierAccessibilite(page) {
  await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
  const violations = await page.evaluate(async () => {
    const { violations } = await window.axe.run("main", { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
    return violations.map(({ id, nodes }) => ({ id, cibles: nodes.map(({ target }) => target) }));
  });
  expect(violations, "Violations WCAG A/AA dans le tableau de bord").toEqual([]);
}

test("tableau de bord : les six blocs, chaque chiffre avec sa période", async ({ page }) => {
  await ouvrirTableau(page);
  await attendreLesBlocs(page);
  for (const nom of [
    /occupation des salles, cette semaine : voir les lignes/,
    /séances planifiées, cette semaine : voir les lignes/,
    /enseignants qui ont cours, cette semaine : voir les lignes/,
    /heures réalisées, ce mois : voir les lignes/,
    /épreuves d’examen, les 14 prochains jours : voir les lignes/,
    /comptes actifs, ce mois : voir les lignes/,
  ]) {
    await expect(page.getByRole("button", { name: nom })).toBeVisible();
  }
  // Le taux de conflits n'est plus affiché (réponse 5 du plan)
  await expect(page.getByText("Taux de conflits")).toHaveCount(0);
});

test("tableau de bord : le volet des séances montre autant de lignes que le chiffre, puis « Tout voir »", async ({ page }) => {
  await ouvrirTableau(page);
  await attendreLesBlocs(page);
  const chiffre = page.getByRole("button", { name: /séances planifiées, cette semaine/ });
  const n = await valeurDe(chiffre);
  await chiffre.click();
  const volet = page.getByRole("dialog", { name: "Séances planifiées" });
  await expect(volet.getByText(/cette semaine, du/)).toBeVisible();
  if (n === 0) await expect(volet.getByText("Aucune ligne sur cette période.")).toBeVisible();
  else await expect(volet.locator("tbody tr")).toHaveCount(Math.min(n, 100));
  await volet.getByRole("button", { name: "Tout voir" }).click();
  await expect(page).toHaveURL(/\/gestion\/emplois-du-temps$/);
});

test("tableau de bord : « Tout voir » de l’usage ouvre Suivi sur l’onglet Usage (réponse 9)", async ({ page }) => {
  await ouvrirTableau(page);
  await attendreLesBlocs(page);
  await page.getByRole("button", { name: /comptes actifs, ce mois/ }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Tout voir" }).click();
  await expect(page).toHaveURL(/\/gestion\/suivi\?onglet=usage$/);
  await expect(page.getByRole("tab", { name: "Usage du mois" })).toHaveAttribute("aria-selected", "true");
});

test("tableau de bord : une route en panne ne vide que son bloc", async ({ page }) => {
  let panne = true;
  await page.route("**/api/statistiques/kpis*", (route) =>
    panne ? route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ message: "Panne simulée" }) }) : route.continue()
  );
  await ouvrirTableau(page);
  const semaine = page.getByRole("region", { name: "Cette semaine" });
  await expect(semaine.getByRole("alert")).toContainText("Ce bloc n’a pas pu se charger");
  // Les autres blocs restent remplis
  await expect(page.getByRole("button", { name: /épreuves d’examen, les 14 prochains jours/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /comptes actifs, ce mois/ })).toBeVisible();
  await expect(page.getByRole("region", { name: "À traiter" }).getByRole("alert")).toHaveCount(0);
  // « Réessayer » relance ce bloc seul
  panne = false;
  await semaine.getByRole("button", { name: "Réessayer" }).click();
  await expect(semaine.getByRole("button", { name: /séances planifiées, cette semaine/ })).toBeVisible();
});

for (const mode of ["light", "dark"]) {
  test(`tableau de bord : aucune violation WCAG A/AA (${mode === "light" ? "clair" : "sombre"})`, async ({ page }) => {
    await ouvrirTableau(page, mode);
    await attendreLesBlocs(page);
    await verifierAccessibilite(page);
  });
}

test("tableau de bord : au clavier, Entrée ouvre le volet, Échap le ferme et rend le focus au chiffre", async ({ page }) => {
  await ouvrirTableau(page);
  await attendreLesBlocs(page);
  const chiffre = page.getByRole("button", { name: /comptes actifs, ce mois/ });
  // Tabulation jusqu'au chiffre (bornée : la page a un menu et quelques blocs avant)
  for (let i = 0; i < 80 && !(await chiffre.evaluate((el) => el === document.activeElement)); i += 1) await page.keyboard.press("Tab");
  await expect(chiffre).toBeFocused();
  await page.keyboard.press("Enter");
  const volet = page.getByRole("dialog", { name: "Comptes actifs" });
  await expect(volet.getByRole("cell", { name: "Comptes actifs" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(volet).toBeHidden();
  await expect(chiffre).toBeFocused();
});
