# Travail en équipe : plusieurs agents sur la même fonction

18 novembre 2026, demande du chef : « que tous mes agents s'attellent à la même tâche, en équipe, de manière synchronisée, sans créer de conflits, chacun avec le modèle le plus adapté », en développement par composants.

Ce document complète [organisation.md](organisation.md), § 10. Il s'applique à toute **mission d'équipe** : une fiche `docs/plan/missions/<identifiant>-equipe.md` qui donne un même plan validé à plusieurs agents. Claude, Codex et l'agent de Cursor le lisent avant de commencer. Le coordinateur l'applique avec le skill `equipe`.

## 1. Les rôles

| Rôle | Qui | Ce qu'il fait | Ce qu'il ne fait pas |
|---|---|---|---|
| **Coordinateur** | la session Claude désignée par le chef | découpe en lots, écrit la fiche d'équipe, envoie les consignes, relit, tient `decisions.md` et le tableau « Missions en cours » | il ne code pas un lot |
| **Intégrateur** | un membre, nommé dans la fiche | tient la **branche d'intégration** et les **fichiers communs**, pose le point de départ, fusionne les lots en local, lance les contrôles, écrit la fiche de session de la fonction, tient sa ligne de `suivi.md` et le fichier du module | il ne réécrit pas le lot d'un autre : il le renvoie |
| **Membre** | chaque autre agent | code **son lot**, dans **ses fichiers**, sur **sa branche de lot** ; écrit ses tests ; rend compte à chaque rendez-vous | il ne touche ni un fichier commun ni le lot d'un autre |

Le chef garde ses décisions (AGENTS.md) : valider le plan, pousser, fusionner, toute commande sur un serveur.

## 2. Le plan d'abord, puis les lots

1. Une mission d'équipe part d'un **plan de conception validé**. Pas de plan validé : pas d'équipe.
2. Le coordinateur découpe la fonction en **lots**. Un lot, c'est un ou plusieurs **dossiers de composants** (`components/<domaine>/`), la page qui les assemble, leurs traductions et leurs tests.
3. **Chaque fichier a un seul propriétaire** pendant la mission. La fiche d'équipe le dit, dans un tableau « fichier ou dossier → propriétaire ».
4. **Les fichiers communs appartiennent à l'intégrateur** : composants partagés (`components/gestion/`, `components/common/`), mise en page, routes, index des traductions, `suivi.md`, fichier du module, conception. Un membre qui a besoin d'un changement dans un fichier commun le **demande** à l'intégrateur. Il ne l'écrit pas lui-même.
5. **Les traductions sont découpées par lot** : chaque lot a ses dictionnaires (`i18n/<domaine>/<lot>.fr.js`, `.en.js`, puis `.ar.js` quand l'arabe arrive). L'intégrateur les crée vides au départ et les inscrit dans l'index. Ainsi, personne n'écrit dans le même dictionnaire.
6. **Les tests sont découpés par lot** : un fichier de parcours par lot (`frontend/tests/parcours/<fonction>-<lot>.spec.cjs`), des tests unitaires à côté des composants du lot.

## 3. Les composants : des fichiers courts, une responsabilité

Repères pour le code d'une mission d'équipe, plus stricts que la règle générale (300 lignes, 200 pour un contrôleur) :

| Fichier | Rôle | Repère |
|---|---|---|
| page (`pages/…`) | assemble, ne charge rien elle-même | 80 lignes |
| hook (`use<Domaine>.js`) | charge les données et porte les actions | 200 lignes |
| composant d'affichage | affiche une partie, reçoit ses données par ses propriétés | 150 lignes |
| dialogue ou formulaire | un formulaire, ses validations locales | 150 lignes |
| utilitaire pur (`fiche.js`, `formatage.js`) | fonctions sans effet, testées seules | 150 lignes |

**160 caractères au plus par ligne** (décision du coordinateur, 18 nov.) : un repère en nombre de lignes ne vaut que si les lignes restent lisibles.

Un fichier qui dépasse son repère se coupe avant le rendez-vous suivant. Un lot ne fait jamais grossir un fichier commun : il le demande.

## 4. Les branches et les dossiers

- **Branche d'intégration** : celle de la fonction (`feat/uix-06b-referentiel`), dans son dossier. Seul l'intégrateur y commite.
- **Branches de lot** : `<branche d'intégration>-<lot>` (par exemple `feat/uix-06b-referentiel-groupes`), chacune dans son dossier `..\travaux-planner\<fonction>-<lot>`, créée **depuis le point de départ** que l'intégrateur a annoncé :

```powershell
git worktree add "..\travaux-planner\uix-06b-groupes" -b feat/uix-06b-referentiel-groupes <sha du point de départ>
cmd /c mklink /J "..\travaux-planner\uix-06b-groupes\frontend\node_modules" "frontend\node_modules"
```

- **Tout reste local.** Les dossiers de travail partagent le même dépôt Git : l'intégrateur voit les branches de lot sans que rien soit poussé. Personne ne pousse : le chef pousse la seule branche d'intégration, à la fin.
- **On ne réécrit pas l'historique** d'une branche qu'un autre a lue : pas de `rebase`, pas de `commit --amend` après un rendez-vous. Pour reprendre le travail des autres, le membre fusionne la branche d'intégration dans sa branche de lot (`git merge feat/uix-06b-referentiel`).
- `git add <fichiers>`, jamais `git add .` : c'est ce qui empêche un membre de commiter par mégarde le fichier d'un autre.

## 5. Les rendez-vous

La mission avance par rendez-vous, annoncés dans la fiche d'équipe. Entre deux rendez-vous, chacun travaille seul dans ses fichiers.

| Rendez-vous | Qui | Ce qui se passe |
|---|---|---|
| **R0, départ** | intégrateur | il commite l'état de départ (fichiers communs, dictionnaires vides, squelettes de pages s'il le faut), vérifie que lint, tests unitaires et build passent, et annonce le **sha du point de départ**. Personne ne commence avant R0 |
| **R1, R2…, fin de lot** | chaque membre | il commite son lot, vérifie ses contrôles, et rend compte : sha, fichiers touchés, tests et leurs chiffres, demandes pour l'intégrateur, questions |
| **Intégration** | intégrateur | il fusionne les lots dans l'ordre de la fiche, refuse un lot qui sort de ses fichiers (§ 6), relance les contrôles, puis annonce le nouveau sha à tous |
| **Relecture** | coordinateur | skill `relecture-branche` sur la branche d'intégration, puis rapport au chef |

Un membre bloqué n'attend pas en silence : il écrit sa question tout de suite (§ 7) et passe à la partie suivante de son lot.

## 6. Le contrôle des fichiers, avant chaque fusion

L'intégrateur compare les fichiers du lot à la fiche d'équipe :

```powershell
git diff --name-only <sha du point de départ>..feat/uix-06b-referentiel-groupes
```

- Un fichier qui n'est pas au membre : **lot refusé**, renvoyé avec la liste des fichiers en trop.
- Un conflit à la fusion veut dire que le découpage était faux : l'intégrateur arrête, prévient le coordinateur, et le découpage est corrigé dans la fiche. Il ne règle pas le conflit en devinant.

## 7. Comment on se parle

| De → à | Canal |
|---|---|
| coordinateur → session Claude | message direct entre sessions |
| coordinateur → Codex ou agent de Cursor | boîte `..\travaux-planner\boites\<agent>\entree\` ; le chef leur dit « lis ta boîte » |
| Codex ou agent de Cursor → coordinateur | boîte `…\sortie\`, un fichier par rapport ou question (format dans `boites\README.md`) |
| membre → intégrateur | par le coordinateur : il relaie les demandes de fichiers communs |

Tout rapport de rendez-vous suit ce modèle :

```text
Lot <nom>, rendez-vous <R1…>. Branche <branche>, sha <sha>.
Fichiers : <liste>. Contrôles : lint <résultat>, unitaires <n verts / n>, build <résultat>.
Demandes à l'intégrateur : <aucune ou liste>. Questions : <aucune ou liste>.
```

## 8. Les modèles

Chaque fiche d'équipe dit quel modèle prend chaque agent, et pourquoi en une ligne. Repères (skill `coordination`, § 4) :

| Rôle ou lot | Modèle |
|---|---|
| intégrateur, fichiers communs, lot le plus large ou le plus risqué | le plus capable : Claude Fable 5.2, sinon Opus 5.5 ; dans Codex ou Cursor, leur modèle le plus fort, raisonnement élevé |
| lot borné, plan précis | un modèle moyen : Claude Sonnet 5.5 ou l'équivalent |
| relevés, mises en forme | un modèle rapide : Claude Haiku 5.5 ou l'équivalent |

Seul le chef change le modèle d'un éditeur. Un agent qui ne tourne pas sur le modèle de sa fiche le dit avant de commencer, et note son modèle dans sa fiche de session.

## 9. La fin

- Chaque membre écrit **sa** fiche de session (`docs/sessions/AAAA-MM-JJ-<branche de lot>.md`) dans sa branche de lot : un fichier nouveau, donc sans conflit.
- L'intégrateur écrit la fiche de la fonction, met à jour sa ligne de `suivi.md` et le fichier du module, et donne au coordinateur la branche à relire.
- Le coordinateur relit, puis donne au chef les commandes (une seule PR, celle de la branche d'intégration) et retire les lignes de « Missions en cours ».
- Les dossiers des lots se retirent après la fusion, jonction `node_modules` d'abord.
