# Mission · VIT-15 · une page par module, adaptée à chaque équipement

| | |
|---|---|
| État | ouverte : complément de plan après le code de VIT-11 |
| Agent | Codex : il tient le registre des fonctionnalités de VIT-11, d'où les pages se construisent |
| Modèle recommandé | son modèle le plus fort, raisonnement élevé |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. vers 21 h 15 ; **condition 10** de la mise en ligne |
| Module | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05 |
| Fonction | VIT-15 : une fiche par module, comme les pages `/feature-…` d'OpenEduCat. Chacune a son logo, ce que le module fait (avec sa source dans le code), et un bloc « selon votre équipement » · taille M |
| Branche | `feat/vit-15-pages-modules`, depuis `origin/main` après la fusion de VIT-11 |
| Plan de conception | un plan court, `docs/conception/vitrine/vit-15-pages-modules.md`, **validé par le chef** |

## Ce que le chef a dit (18 nov., vers 21 h 15)

« Pour les fonctionnalités, il faut que ce soit des modules, sachant que tous les établissements ne disposent pas de wifi, d'écran, etc. Les fonctionnalités doivent donc pouvoir être adaptées au maximum de contextes. »

## Critère de « terminé »

- Une page par module du registre de VIT-11, construite depuis lui (`/<langue>/modules/<module>/`), avec :
  - le logo du module (de VIT-09a ; une place réservée en attendant) ;
  - ses fonctionnalités et leurs sources ;
  - les types d'établissement concernés (VIT-13) ;
  - les rôles qui l'utilisent (VIT-10).
- **Un bloc « selon votre équipement »** dans chaque page, avec trois lignes : *sans wifi ou avec peu de connexion*, *sans écran projeté*, *sans téléphone de l'élève*. Chaque ligne dit **ce que le code permet aujourd'hui**, avec sa source. Ce qui manque est marqué « Bientôt ». Une ligne sans solution est écrite telle quelle, sans être enjolivée.
  - Ce bloc s'appuie sur l'étude EP-18 ([etude-ep18-faible-equipement](etude-ep18-faible-equipement.md)) quand elle est rendue ; sinon, sur le code, et le plan le dit.
- Le catalogue (VIT-11) et le méga-menu renvoient à ces pages.
- Les textes sont générés en français et en anglais, et un test vérifie que chaque module du registre a sa page et ses trois lignes.
- Build, tests, `verifier-neutre.mjs`, axe-core sur un échantillon de pages ; poids par page sous le budget de VIT-09.

## Périmètre d'écriture

- `vitrine/src/pages/[lang]/modules/` ;
- les composants `vitrine/src/components/modules/` ;
- `vitrine/src/donnees/` (le registre : les champs « équipement » et « types ») ;
- les textes nouveaux ;
- `vitrine/tests/` ;
- le plan, la ligne du module, la fiche de session.

L'agent ne touche pas à `docs/plan/suivi.md`, ni aux logos (VIT-09a), ni aux pages par app de VIT-07 (elles restent, et renvoient aux modules).

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 21 h 20 | fiche écrite par le coordinateur, sur la décision du chef | — |
| 2026-11-19 0 h 20 | **ajouts de l'[expertise](../../etude-marche/12-expertise-site-vitrine.md)** : le bloc « selon votre équipement » reprend les phrases de C5 (appel à la main d'abord, QR code en option ; jeux sur téléphone ou ordinateur ; semaine lisible sans réseau) et ajoute **l'emploi du temps imprimé en PDF**, chemin sans écran ni téléphone (`frontend/src/components/emploi-du-temps/TimetableExportMenu.jsx`) ; les pages Cours et annonces et Bibliothèque prennent leur contenu des pages de module (C10). Les annonces à tout l'établissement, à un campus ou à un niveau (`Annonce.portee`) sont à dire | — |
| 2026-11-21 | report de la synthèse des concurrents : **R4**, chaque page de module dit ce qu'il fait, qui s'en sert, sa FAQ et les modules liés ; **R2**, captures neutres et crédibles ; **N3**, le bloc « selon votre équipement » dit le poids affiché avant téléchargement là où le code le fait, sinon « Bientôt » ; **le supérieur d'abord** : chaque page parle d'abord au supérieur, le collège et le lycée restent « Bientôt » (D4) | ajout |
| 2026-11-21 | report de la session de la charte (UIX-10b) : **VIT-15 pose les logos des applications dans ses fiches** (logos de VIT-09a) ; VIT-09b ne les refait pas | ajout |
| 2026-11-21 (soir) | le chef valide la liste des dix-sept modules vendables ([étude 15](../../etude-marche/15-modules-et-packs.md), branche `etude/ven-modules-packs`) : les pages de VIT-15 suivent cette liste (une page par module disponible, « Bientôt » pour les autres) et posent les logos de VIT-09c, qui passe avant VIT-15 ; l'écart avec le registre de VIT-11 se traite dans le complément de plan | — |
