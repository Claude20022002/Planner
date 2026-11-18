# Mission · VIT-10 · pages par rôle, menu « Solutions » ouvrant, pied de page complet

| | |
|---|---|
| État | ouverte : plan court à écrire **après la fusion de VIT-07 (#214)** |
| Agent | agent de Cursor (Grok 4.7 high) : il a écrit VIT-07 et tient la navigation (`langues.js`, `EnTete.astro`) ; tâche bornée au plan validé |
| Modèle recommandé | Grok 4.7 high, le modèle de l'agent : pages au gabarit connu, chaque phrase citée |
| Attribuée le | 2026-11-18. Consigne écrite à 17 h 55 par Claude de VS Code, à la demande du chef, après sa lecture du site d'OpenEduCat ; inscrite par le coordinateur ; **condition 8 de la mise en ligne** (chef, 18 nov. vers 18 h 35) |
| Module et chantier | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05, dégelée sans tarifs |
| Fonction | VIT-10 : quatre pages par rôle, un menu « Solutions » qui s'ouvre, un pied de page en colonnes · taille M |
| Branche | `feat/vit-10-pages-par-role`, depuis `origin/main` après la fusion de #214 |
| Dossier de travail | `..\travaux-planner\vit-10-pages-par-role` |
| Plan de conception | plan court à écrire : `docs/conception/vitrine/vit-10-pages-par-role.md` · **validé par le chef** (ce que le site promet est un choix de produit) |

## Ce qui manque, relevé sur le site d'OpenEduCat

1. **Des pages par rôle**, toutes dans le même ordre :
   - un titre qui parle au rôle, avec deux boutons ;
   - cinq lignes « avant → avec l'outil » ;
   - trois ou quatre cartes de capacités, de trois ou quatre points chacune ;
   - des liens vers les pages de fonctions ;
   - une bande de chiffres ;
   - une FAQ de cinq questions ;
   - un bandeau d'appel à l'action.
2. **Un menu « Solutions » qui s'ouvre** : « Par établissement » à gauche, avec une icône par type ; « Par rôle » à droite.
3. **Un pied de page complet**, en colonnes : Fonctions, Solutions, Par rôle, Ressources, À propos et mentions.

## Ce que le plan propose (consigne de 17 h 55)

- **Quatre pages par rôle** : Direction, Scolarité, Enseignants, Étudiants. Les familles restent dans « Bientôt » (chantier VSC).
  - Chaque page suit l'ordre ci-dessus. La bande de chiffres n'y figure que si un chiffre vrai s'y prête, et le chef tranche.
  - Le côté « avec Planner » ne dit que ce qui existe, avec sa source dans le code, comme pour VIT-07.
  - Chaque carte renvoie à sa page de fonction.
- **Le menu « Solutions »** :
  - les trois types d'établissement de VIT-05, avec les ancres de `/solutions/`, et les quatre rôles ;
  - au clavier, Échap ferme le menu et le focus reste visible ;
  - en 390 px, il devient une liste.
- **Le pied de page en colonnes**, avec les seules pages qui existent : aucun lien vide.

## Ce qu'on ne copie pas

- Témoignages, logos d'écoles, badges d'avis, nombres d'utilisateurs : rien de cela n'existe pour Planner, et aucun nom d'école ne va dans le dépôt public.
- Page de tarifs et « Commencez gratuitement » : aucun prix, et pas d'essai gratuit.
- Fenêtre de discussion : un service tiers, alors que le site ne charge rien d'ailleurs.
- « Mon compte » : attend le nom de domaine (Q-11).

## Critère de « terminé »

- Les quatre pages, le menu et le pied de page, en français et en anglais ; l'arabe affiche le français (UIX-04).
- Chaque phrase s'appuie sur un fichier du code, cité dans le plan. **EP-18** : aucune page ne présente le téléphone de l'élève ni le QR code comme le seul chemin. **EP-5** : aucun outil d'État nommé seul.
- Build, tests unitaires du site, `verifier-neutre.mjs`, axe-core et Lighthouse sur chaque nouvelle page, mouvement réduit respecté, pas de défilement horizontal en 390, 768 et 1440 px.

## Périmètre d'écriture

- `vitrine/src/pages/[lang]/` : les quatre pages nouvelles ;
- `vitrine/src/components/fonctions/` et un dossier de composants à lui pour les pages par rôle ;
- `vitrine/src/i18n/{fr,en,ar}/` : les fichiers des nouvelles pages et `commun.json` ;
- `vitrine/src/i18n/langues.js` et `vitrine/src/components/socle/EnTete.astro`, pour la navigation ;
- `vitrine/src/components/socle/PiedDePage.astro` **seulement si le chef l'ouvre** dans le plan (le socle se réutilise sans être modifié) ;
- `vitrine/tests/` ; le plan court, `docs/plan/modules/VIT-site-vitrine.md`, la fiche de session.

L'agent ne touche pas :
- à `docs/plan/suivi.md` ;
- à `vitrine/src/styles/` (jetons générés, UIX-10a) ;
- à l'accueil (`index.astro`, `accueil.json`), qui est à VIT-08 ;
- aux illustrations : **VIT-09** les dessine après VIT-10 et VIT-11. Il laisse la place et dit où.

## Ordre sur le site (chef, 18 nov. vers 18 h 35)

VIT-07, puis **VIT-10**, puis VIT-11 (Codex), puis VIT-09 (Claude de VS Code), qui illustre toutes les pages. VIT-11 met son lien dans le menu : il le demande à l'agent de Cursor par le coordinateur.

## Prompt à donner à l'agent

```text
Ta mission suivante : VIT-10, pages par rôle, menu Solutions ouvrant, pied de page complet (condition 8 de la mise en ligne).
Lis la fiche docs/plan/missions/vit-10-pages-par-role.md (branche doc/coordination-equipe, jusqu'à sa fusion).
Commence après la fusion de #214 : git worktree add "..\travaux-planner\vit-10-pages-par-role" -b feat/vit-10-pages-par-role origin/main.
Écris le plan court docs/conception/vitrine/vit-10-pages-par-role.md, chaque phrase avec sa source ; demande au chef
s'il ouvre PiedDePage.astro, et s'il veut une bande de chiffres. Commite-le seul ; le chef le valide.
Aucune illustration (VIT-09). Ne modifie pas docs/plan/suivi.md. Rapport dans sortie\ ; jamais de git push.
```

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 17 h 55 | consigne écrite par Claude de VS Code à la demande du chef, déposée dans la boîte de l'agent de Cursor | — |
| 2026-11-18 18 h 40 | inscrite par le coordinateur ; condition 8 (chef) ; ordre VIT-07, VIT-10, VIT-11, VIT-09 | — |
