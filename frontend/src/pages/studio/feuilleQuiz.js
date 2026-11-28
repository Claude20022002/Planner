/**
 * Ouvre la feuille imprimable d'un quiz : les questions, pas les réponses.
 */
import { contenuFeuille } from "../../../../shared/quiz/studio/feuille.js";

const echapper = (valeur) => String(valeur ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const liste = (entrees) => (entrees ?? []).map((t) => `<li>${echapper(t)}</li>`).join("");

const bloc = (question, index, L) => {
    const c = contenuFeuille(question);
    const choix = (c.choix ?? []).map((id) => (id === "vrai" ? L.vrai : id === "faux" ? L.faux : id));
    const corps = [
        c.nombre ? `<p>${echapper(L.nombre(c.nombre))}</p>` : "",
        choix.length ? `<ul>${liste(choix)}</ul>` : "",
        c.texte ? `<p>${echapper(c.texte)}</p>` : "",
        (c.listes ?? []).map((l) => `<p>${echapper(l.id)}. ${echapper(l.options.join(" · "))}</p>`).join(""),
        c.gauches?.length ? `<p>${echapper(L.associer)}</p><ul>${liste(c.gauches)}</ul><ul>${liste(c.droites)}</ul>` : "",
        c.elements?.length ? `<p>${echapper(L.ordre)}</p><ul>${liste(c.elements)}</ul>` : "",
        c.ligne ? `<p>${echapper(L.ligne)}${c.unite ? ` (${echapper(c.unite)})` : ""} : ________</p>` : "",
        c.image ? `<p>${echapper(L.image)}</p>` : "",
    ].join("");
    return `<article><h2>${index + 1}. ${echapper(c.enonce)}</h2><p>${echapper(L.points(c.points))}</p>${corps}</article>`;
};

/** HTML de la feuille. `L` porte les libellés déjà traduits. */
export const htmlFeuille = (quiz, L) => `<!DOCTYPE html>
<html lang="${echapper(L.langue)}">
<head>
<meta charset="utf-8">
<title>${echapper(quiz?.titre)}</title>
<style>
  body { font-family: Georgia, serif; color: #1a1a1a; margin: 2rem; }
  h1 { font-size: 1.4rem; }
  article { break-inside: avoid; margin: 1.5rem 0; }
  h2 { font-size: 1rem; font-weight: 600; }
  ul { list-style: none; padding: 0; }
  li { margin: 0.35rem 0; }
  li::before { content: "\\2610\\00a0"; }
</style>
</head>
<body>
<h1>${echapper(quiz?.titre)}</h1>
<p>${echapper(L.nom)} : ______________________________</p>
${(quiz?.questions ?? []).map((q, i) => bloc(q, i, L)).join("\n")}
</body>
</html>`;

/** Ouvre la feuille et lance l'impression du navigateur. */
export const ouvrirFeuille = (quiz, L) => {
    const fenetre = window.open("", "_blank");
    if (!fenetre) return false;
    fenetre.document.open();
    fenetre.document.write(htmlFeuille(quiz, L));
    fenetre.document.close();
    fenetre.onload = () => {
        try { fenetre.print(); } catch { /* le navigateur a refusé */ }
    };
    return true;
};
