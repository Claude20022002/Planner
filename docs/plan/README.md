# Plan de Planner, par modules

**Ce dossier est la seule référence pour savoir quoi faire et dans quel ordre** (7 novembre 2026). Il remplace tous les plans d'octobre et de début novembre, rangés dans [archives/plans/](../archives/plans/).

| Document | Pour |
|---|---|
| [../../AGENTS.md](../../AGENTS.md) | **Les règles obligatoires de toute session**, pour les agents d'IA comme pour l'équipe |
| [organisation.md](organisation.md) | Rôles (le chef de projet est **Claude20022002**), chantiers de module, une branche par tâche, plan de conception avant le code, questions, fin de session, sessions longues |
| [suivi.md](suivi.md) | **À ouvrir en début de session** : une ligne par fonction (état, branche, PR), chantiers ouverts, numéros de migration réservés. **Tenu par le coordinateur** seul, sur sa branche : une branche de fonction ne le modifie pas (décision du chef du 18 nov.) |
| [decisions.md](decisions.md) | Décisions en vigueur et questions ouvertes, en un seul endroit |
| [modules/](modules/) | Un fichier par module : ce qui existe, les fonctions à faire, leur critère de « terminé » |
| [parite-openeducat.md](parite-openeducat.md) | Correspondance entre chaque domaine d'OpenEduCat et la fonction de Planner qui le couvre, et ce que Planner fait en plus (décision du 17 nov.) |
| [missions/](missions/) | Une fiche par mission donnée à un agent par le coordinateur : agent, branche, fichiers qu'il peut écrire, prompt à coller |
| [modeles/](modeles/) | Modèles du [plan de conception](modeles/conception.md), de la [fiche de session](modeles/fiche-de-session.md) et de la [fiche de mission](modeles/mission.md) |
| [../sessions/](../sessions/) | Une fiche par session, avec son prompt de reprise ; les comptes rendus d'avant le 9 novembre |
| [../conception/](../conception/README.md) | Conceptions et contrats encore en vigueur (architecture, moteur, isolation, déploiement…) |
| [../ecole/plan.txt](../ecole/plan.txt) | La **vision** à long terme (ERP modulaire pour l'Afrique). Pas un plan : ses choix de pile et de prix ne s'appliquent pas |

## 1. Les modules

Chaque fonction porte l'identifiant de son module (`MOT-03`). Aucun numéro ne sert deux fois. La colonne « ancien nom » des fichiers de module permet de retrouver les traces dans les archives, les commits et le code (`ME-3a`, `EC-9`, `F-13`…).

Un module se travaille par **chantier** : le chef l'ouvre, au plus 3 sont ouverts à la fois, et un chantier commencé se termine ([organisation.md](organisation.md), § 3). La branche d'une tâche se nomme par son type, puis son identifiant : `feat/pla-05-creer-ecole`, `fix/edt-…`, `etude/pla-06-…` ([organisation.md](organisation.md), § 4).

| Code | Module | Fichier | Identifiants |
|---|---|---|---|
| PLA | Plateforme multi-écoles et isolation | [PLA-plateforme.md](modules/PLA-plateforme.md) | `PLA-01`… |
| EXP | Déploiement, exploitation, sauvegardes, supervision | [EXP-exploitation.md](modules/EXP-exploitation.md) | `EXP-01`… |
| MOT | Moteur de planification (solveur, catalogue, profils) | [MOT-moteur.md](modules/MOT-moteur.md) | `MOT-01`… |
| EDT | Emploi du temps, côté application (séances, publication, examens, salles) | [EDT-emploi-du-temps.md](modules/EDT-emploi-du-temps.md) | `EDT-01`… |
| ADM | Administration selon les rôles (comptes, droits, configuration, import, années) | [ADM-administration.md](modules/ADM-administration.md) | `ADM-01`… |
| VSC | Vie scolaire (élèves, familles, absences, notes, bulletins) | [VSC-vie-scolaire.md](modules/VSC-vie-scolaire.md) | `VSC-01`… |
| COU | Espace de cours (supports, devoirs, sondages, échanges) | [COU-espace-de-cours.md](modules/COU-espace-de-cours.md) | `COU-01`… |
| BIB | Bibliothèque (StudyLib, fichiers) | [BIB-bibliotheque.md](modules/BIB-bibliotheque.md) | `BIB-01`… |
| QJE | Quiz, jeux pédagogiques et IA | [QJE-quiz-jeux-ia.md](modules/QJE-quiz-jeux-ia.md) | `QJE-01`… |
| MOB | Application mobile | [MOB-application.md](modules/MOB-application.md) | `MOB-01`… |
| UIX | Interface du site (socle neutre, accessibilité, langues, textes) | [UIX-interface.md](modules/UIX-interface.md) | `UIX-01`… |
| VIT | Site vitrine public et contact | [VIT-site-vitrine.md](modules/VIT-site-vitrine.md) | `VIT-01`… |
| VEN | Vente, registre des modules, abonnements | [VEN-vente-modules.md](modules/VEN-vente-modules.md) | `VEN-01`… |
| FIN | Finance de l'école (frais, caisse, reçus, relances, export comptable) | [FIN-finance-ecole.md](modules/FIN-finance-ecole.md) | `FIN-01`… |
| QUA | Qualité du code, tests et documentation | [QUA-qualite-docs.md](modules/QUA-qualite-docs.md) | `QUA-01`… |
| MKT | Marketing, par des agents spécialisés (vente gelée : on prépare, on ne publie pas) | [MKT-marketing.md](modules/MKT-marketing.md) | `MKT-01`… |
| COM | Communication et notifications (service d'envoi commun, plages de silence, compte famille, crédits de messages) | [COM-communication.md](modules/COM-communication.md) | `COM-01`… |
| ETA | Échanges avec l'État (cadre de connecteurs ; Massar d'abord) | [ETA-echanges-etat.md](modules/ETA-echanges-etat.md) | `ETA-01`… |
| PAI | Paiements en ligne et rapprochement | [PAI-paiements.md](modules/PAI-paiements.md) | `PAI-01`… |
| RHP | Personnel, vacataires et paie | [RHP-personnel-paie.md](modules/RHP-personnel-paie.md) | `RHP-01`… |
| FOR | Formation continue et financeurs | [FOR-formation-continue.md](modules/FOR-formation-continue.md) | `FOR-01`… |
| DOC | Documents et attestations vérifiables | [DOC-documents-verifiables.md](modules/DOC-documents-verifiables.md) | `DOC-01`… |
| INS | Admissions et prospects | [INS-admissions.md](modules/INS-admissions.md) | `INS-01`… |
| PIL | Pilotage (tableaux de bord de la direction) | [PIL-pilotage.md](modules/PIL-pilotage.md) | `PIL-01`… |
| GRP | Groupes et réseaux d'écoles | [GRP-groupes-reseaux.md](modules/GRP-groupes-reseaux.md) | `GRP-01`… |
| STA | Stages et alternance | [STA-stages-alternance.md](modules/STA-stages-alternance.md) | `STA-01`… |
| SER | Services annexes (cantine, transport, internat) | [SER-services-annexes.md](modules/SER-services-annexes.md) | `SER-01`… |
| STK | Stocks et achats | [STK-stocks-achats.md](modules/STK-stocks-achats.md) | `STK-01`… |

Les douze derniers modules (COM à STK) viennent de l'inventaire du 11 novembre ([06-outils-structures-formation.md](../etude-marche/06-outils-structures-formation.md)), ajoutés au plan le 13 novembre.

## 2. L'ordre : des étapes, pas des dates

**Décision du 21 novembre : le supérieur jusqu'au bout, puis on descend** (elle remplace l'ordre du 7 novembre, « plusieurs écoles d'abord, puis le scolaire »). On **conçoit pour tous et on construit pour le supérieur** : le modèle de données et le moteur restent « par profil », le modèle du scolaire est conçu (VSC-01) mais pas codé, et le code écrit est sûr pour plusieurs écoles dès sa création. Ensuite : la formation professionnelle, puis le lycée, puis le collège, puis le primaire et la maternelle. La cible des écoles privées de la maternelle au lycée vient après ([decisions.md](decisions.md), 21 nov.).

| Étape | Jalon | Fonctions |
|---|---|---|
| **0** | Tout ce qui était commencé est fusionné ; ce plan est sur `main` ; le nouveau serveur est prêt | fusions du 7 novembre, EXP-01, QUA-06, QUA-07 |
| **1. Fondations** | `main` tourne sur le nouveau serveur, sauvegardé et surveillé ; la pile et D-01 sont confirmées ; le solveur est mesuré sur un jeu du supérieur ; le modèle du scolaire est conçu (sans code) | EXP-02 à EXP-05, QUA-03, PLA-06, VSC-01, MOT-01, MOT-02 |
| **2. Plusieurs écoles** | HESTIM et une deuxième école du supérieur tournent sur la même installation, chacune avec sa bibliothèque et sans ClassQuiz ; rien ne passe de l'une à l'autre | PLA-01 à PLA-05, PLA-07, VEN-01, UIX-01, MOT-05, MOT-08, MOB-03, BIB-02, QJE-03, QJE-06 |
| **3. Le supérieur jusqu'au bout** | **Une deuxième école du supérieur, autre que HESTIM, se configure seule et tourne un semestre complet** : emploi du temps (CM, TD, TP, vacataires, campus) dont chaque refus s'explique, appel (aussi à la main hors ligne), examens et surveillances, évaluations, crédits et jurys, espace de cours, quiz, bibliothèque, stages, inscriptions, documents vérifiables, frais, tableau de bord de l'administration ; la vitrine dit tout cela | MOT-03, MOT-04, MOT-13, ADM-01 à ADM-04 (modèle du supérieur), EDT-01 à EDT-04, VSC-08, RHP-01, STA-01, INS-01 à INS-03, DOC-01, DOC-02, FIN-01, FIN-02, VEN-02, COU-02 à COU-06, BIB-01, BIB-03, BIB-04, QJE-02, QJE-07, QJE-16, MOB-01, MOB-02, MOB-06, MOB-07, MOB-08 (l'appel à la main hors ligne, N2), UIX-03, UIX-05, UIX-06, UIX-10, UIX-11, EXP-06, EXP-08, VIT-04, VIT-19 ; parité (26 nov.) : VSC-11, EDT-06, QJE-10, FIN-04 |
| **4. La formation professionnelle** | Un centre de formation tourne de bout en bout : sessions et cohortes, émargement, financeurs, preuves qualité | VSC-06, FOR-01 à FOR-04, RHP-02, RHP-03 ; parité (26 nov.) : COU-10, COU-11 |
| **5. Le lycée, puis le collège** | Une personne extérieure configure une école et génère **un vrai collège avec groupes de langue** (EP-10 : 600 élèves en moins de 10 min) ; les écrans parlent la langue de l'école | MOT-06, MOT-07, VSC-07, UIX-02, ADM-04 (modèle du scolaire), mesure du collège (suite de MOT-02) ; parité (26 nov.) : VSC-12, ADM-10 |
| **6. Pack « École privée »** | Une école fictive de la maternelle au lycée tourne de bout en bout : familles, absences prévenues, notes et bulletins, espace parents en arabe et en français | VSC-02 à VSC-04, ADM-05, COM-01 à COM-03, ETA-01, ETA-02, PAI-01, PAI-02, MOB-05, UIX-04, MOT-09 ; parité (26 nov.) : VSC-09, VSC-13, QJE-11, INS-04, COM-04, COM-05, FIN-05, RHP-04, MOB-10 |
| **7. Durée de vie** | Passage d'année sans aide ; export complet d'une école ; grande échelle | ADM-06, ADM-07, PLA-08 à PLA-13, MOT-10, MOT-11, EDT-05, PIL-03, STA-04 ; reportés : SER-02, SER-03 (avec SER-01), ETA-03, PAI-03, PIL-01, PIL-02, GRP-01, GRP-02, STA-02, SER-01, STK-01 |
| **Libre** | Sans dépendance : à prendre à n'importe quelle session | QJE-01, QJE-04, QJE-05, VIT-01 à VIT-03, COU-01, EXP-09, QUA-01, QUA-02, QUA-04, QUA-05, MOB-09, MKT-01 à MKT-07 |

FIN, COM et PAI ne se construisent qu'après les entretiens de VEN-02, qui confirment le module d'achat de chaque marché (décision du 13 novembre) ; pour l'étape 3, ces entretiens se mènent auprès d'écoles du supérieur.

La colonne « Étape » des fichiers de module et de [suivi.md](suivi.md) a été reprise le 21 novembre selon ce tableau ; en cas d'écart, **ce tableau fait foi**.

**Parité avec OpenEduCat (décision du 17 novembre)** : Planner doit avoir ce qu'a OpenEduCat, et plus, et le faire mieux ([parite-openeducat.md](parite-openeducat.md)). Elle a été écrite avant la feuille de route du 21 novembre (tableau ci-dessus), dont l'échelle d'étapes est différente. Fonctions ajoutées :
- **placées le 26 novembre** dans les étapes du 21 novembre (proposition du coordinateur, acceptée par le chef) : étape 3, VSC-11, EDT-06, QJE-10, FIN-04 ; étape 4, COU-10, COU-11 ; étape 5, VSC-12, ADM-10 ; étape 6, VSC-09, VSC-13, QJE-11, INS-04, COM-04, COM-05, FIN-05, RHP-04, MOB-10 ; étape 7, PIL-03, STA-04, et SER-02, SER-03 reportées avec SER-01. Trois dépendances changent pour l'étape 3 : VSC-11 et EDT-06 ne dépendent plus de VSC-02 (elles lisent les étudiants du modèle actuel), QJE-10 verse sa note à VSC-08 au lieu de VSC-04 (barème et résultat communs, N7). FIN-04 attend VEN-02, comme tout FIN. VSC-14 (santé) et QJE-13 (tuteur IA) restent conditionnels ;
- **libre** : UIX-07, UIX-08, BIB-13, EDT-07, COU-12, COU-13, QJE-12 ;
- **reprises** (elles étaient reportées) : SER-01, STK-01, PIL-01, PIL-02, STA-02 ; la feuille de route du 21 novembre les laisse reportées à l'étape 7.
- Les notes du supérieur (VSC-10 de la parité) sont **fondues dans VSC-08** (évaluations, crédits et jurys, décision du chef du 21 nov.).

Numéros repris le 26 novembre pour éviter les doublons avec la feuille de route : ADM-11 (fériés selon le pays), BIB-13 (bibliothèque physique), MOB-10 (scolarité et direction sur le téléphone), STA-04 (anciens élèves), VSC-14 (infirmerie).

Elles ajoutent environ 87 jours bruts, plus 13 pour les reprises.

Une fonction d'une étape peut commencer avant la fin de l'étape précédente si ses dépendances (colonne « dépend de ») sont faites.

**Tailles** : S = une demi-journée, M = 2 jours, L = 5 jours, XL = plus de 10 jours, bruts. Ce sont des **estimations avant conception** (revue d'architecte du 5 novembre) : environ 292 jours bruts en tout, dont environ 53 ajoutés le 13 novembre avec les nouveaux modules et 2 jours (VSC-07) le 18 novembre, à multiplier par 1,5 à 2 pour du temps réel. Aucune date n'est promise tant que l'effectif n'est pas connu ([decisions.md](decisions.md), Q-01).

## 3. La routine d'une session

Une session = **une fonction** d'un chantier ouvert, sur **sa branche**, fusionnée **seulement si tout est correct**. Les règles complètes : [AGENTS.md](../../AGENTS.md) et [organisation.md](organisation.md).

```powershell
# 1. Choisir, avec le chef, une ligne « à faire » d'un chantier ouvert de docs/plan/suivi.md
#    dont les dépendances sont faites.
cd "C:\Users\clusa\Desktop\Github Project\plan_B_projet_PACTE"
git switch main; git pull --ff-only
$T = "feat"; $F = "mot-03-validation"         # type (feat, fix, etude, refactor, test, doc, chore, mkt), puis identifiant et mot
git worktree add "..\travaux-planner\$F" -b "$T/$F" origin/main
# Pour lancer les tests sans réinstaller : jonction vers les node_modules du dépôt principal
cmd /c mklink /J "..\travaux-planner\$F\backend\node_modules" "backend\node_modules"

# 2. Travailler dans ..\travaux-planner\$F
#    - questions au chef, puis plan de conception (docs/plan/modeles/conception.md) ;
#    - AUCUN CODE avant que le chef ait validé le plan ;
#    - premier commit : le plan seul (suivi.md est tenu par le coordinateur) ;
#    - un test qui fige chaque correctif ;
#    - git add <fichiers>, jamais git add .

# 3. Vérifier en local (base MySQL rapide, voir DEPLOIEMENT.md) : tests du serveur, du site.
#    Les parcours tournent dans la CI de la PR : ne pas les lancer en même temps que la suite.

# 4. Fin de session (obligatoire) : fichier du module, fiche docs/sessions/…, prompt de reprise.
#    Puis le CHEF DE PROJET publie et ouvre la PR : le modèle de PR affiche la liste « terminé »
git -C "..\travaux-planner\$F" push -u origin "$T/$F"
gh pr create --base main --head "$T/$F" --title "MOT-03 : validation avant le calcul" --fill

# 5. Fusionner seulement si tout est correct (§ 4)
gh pr checks "$T/$F" --watch
gh pr merge "$T/$F" --merge --delete-branch

# 6. Clore : le coordinateur passe la ligne de suivi.md à « fait » ; retirer la jonction puis le dossier
cmd /c rmdir "..\travaux-planner\$F\backend\node_modules"
git worktree remove "..\travaux-planner\$F"
git switch main; git pull --ff-only
```

Une fonction trop grosse pour une session (L, XL) se découpe en **étapes livrables** (`MOT-06a`, `MOT-06b`), chacune avec sa PR. Une branche ne reste pas ouverte plus d'une semaine sans être mise à jour depuis `main`.

## 4. « Tout est correct » : la définition de « terminé »

Une PR ne se fusionne que si **tout** ceci est vrai :

1. **La CI est verte** : site, serveur, mobile, solveur et parcours.
2. **Le critère de « terminé »** de la fonction (dans son fichier de module) est atteint et vérifié.
3. **Un test de régression** fige chaque correctif ; une faille connue non corrigée a son `test.failing`.
4. **Les exigences produit** (§ 6) qui s'appliquent à la fonction sont tenues.
5. **La migration**, s'il y en a une, a son numéro réservé dans [suivi.md](suivi.md), par le coordinateur.
6. **La documentation** suit : fichier du module (état, ce qui existe), fiche de session, et la conception si elle a changé. [suivi.md](suivi.md) est mis à jour par le coordinateur.
7. **Rien de réel dans le dépôt** : ni donnée personnelle, ni secret, ni nom d'école en dur (`scripts/verifier-neutre.mjs`). **Le dépôt est public** (choix du 7 novembre, à cause de la limite de durée de GitHub Actions).

## 5. Règles communes

- **Code** : un fichier, une responsabilité ; repère de 300 lignes par fichier, 200 pour un contrôleur ; un lot ne fait jamais grossir un fichier déjà trop long. La page assemble, le hook charge, le contrôleur lit et répond, la règle métier vit dans `services/`. Commentaire de rôle en tête de chaque fichier, une ligne par fonction exportée. Noms en français.
- **Données** : une table a **un seul module propriétaire** ; un autre module passe par son service ou par un contrat d'API relu. Le contrat d'abord : le module propriétaire écrit la route et ses tests d'intégration avant l'écran.
- **Masquer plutôt que supprimer** : une fonction pas prête est éteinte par un interrupteur (`shared/fonctions.js`, réglage de l'école), pas effacée.
- **Ton des textes** : « vous », phrases courtes, sans jargon ; une erreur dit ce qui s'est passé et quoi faire ; ni « (s) » ni « pts » ; le même mot partout (« Quiz », « Bibliothèque », « Activités »).
- **Sécurité** : le serveur ne croit jamais le client ; 404 hors de ses classes ; exports CSV protégés contre les formules ; l'IA ne reçoit jamais de données d'élève, et sa sortie est relue par l'enseignant ; pas de fuseau horaire pris au navigateur.
- **Production** : seul le chef de projet pousse, fusionne et lance les commandes du serveur.

## 6. Exigences produit (EP)

Tirées des reproches faits aux autres outils ([étude de marché](../etude-marche/01-concurrents.md)). Elles s'appliquent à toute fonction concernée, à partir de l'étape indiquée.

| N° | Exigence | Mesure | Étape |
|---|---|---|---|
| EP-1 | Mise en route sans consultant | une école de 300 élèves en service en moins d'une heure **avec un fichier réel**, par une personne extérieure (mesure à faire sur un vrai fichier avant de fixer le seuil) | 3 |
| EP-2 | Interface sobre | menu limité aux modules actifs ; axe-core sans violation ; trois clics au plus jusqu'à un réglage **montré à l'école** (le reste reste au profil) | 3 |
| EP-3 | Application rapide et fiable | ouverture en moins de 2 s sur le téléphone de référence (à choisir, MOB-03) ; emploi du temps lisible hors ligne | 2 et 4 |
| EP-4 | Chaque refus s'explique | tout conflit nomme la règle et le groupe, et propose au moins une solution | 3 |
| EP-5 | Saisie unique | aucune donnée saisie deux fois ; exports **au format accepté** par la plateforme nationale du pays de l'école (Massar au Maroc, et celle de chaque autre pays visé, ETA-03) et par le comptable | 4 |
| EP-6 | L'enseignant saisit moins | appel en un geste ; temps de saisie d'une classe mesuré avant et après chaque fonction qui ajoute une saisie | 4 |
| EP-7 | Notifications maîtrisées | plages horaires, résumés ; un parent reçoit au plus un résumé par jour hors alerte | 4 |
| EP-8 | Passage d'année inclus | une école passe d'une année à l'autre en moins d'une demi-journée, sans perte | 5 |
| EP-9 | Les mises à jour ne cassent rien | parcours verts avant chaque mise en ligne ; retour arrière de l'image en une commande ; migrations « étendre puis contracter » | 1 |
| EP-10 | Rapide à grande échelle | génération d'un collège de 600 élèves en moins de 10 min ; pages de gestion en moins de 1 s | 3 |
| EP-11 | Accessible et trilingue | contraste AA ; **français, anglais et arabe** (droite à gauche), tous trois complets ; aucune autre langue d'interface prévue (décision du 17 nov.) | 2 (droite à gauche), 4 (arabe complet), libre (anglais complet, UIX-07) |
| EP-12 | Les données restent à l'école | isolation testée sur chaque route ; export complet à tout moment | 2 et 5 |
| EP-13 | Aucun envoi caché | liste publique des envois sortants (destinataire, données, raison), à jour (QUA-09) ; toute PR qui ajoute un envoi sortant la met à jour | 1 |
| EP-14 | Contrôles toujours actifs | aucune règle de conflit ou de sécurité livrée ne s'éteint par un réglage ; seul un forçage tracé et justifié la contourne | 1 |
| EP-15 | Aucune route ouverte par erreur | la liste des routes sans connexion est écrite ; un test échoue si une route nouvelle n'exige pas de connexion sans y figurer (avec PLA-04) | 2 |
| EP-16 | Trois langues, aucun texte en dur | tout texte montré (écran, erreur du serveur, PDF, notification) passe par la traduction ; vérifié dans la CI par UIX-08 | 2 |
| EP-17 | Mieux qu'OpenEduCat, mesuré | une fonction qui a un équivalent chez OpenEduCat a un parcours chronométré (temps, clics) dans son critère de « terminé », comparé à OpenEduCat Community quand l'essai du plan 08 l'a mesuré ([parite-openeducat.md](parite-openeducat.md), § 3) | 4 |
| EP-18 | S'adapter à tous les contextes | chaque fonction marche **sans téléphone de l'élève** (le QR code et les jeux sur téléphone sont des options, jamais le seul chemin), avec **peu ou pas de connexion**, et avec ce qu'a l'école (un seul écran projeté, du papier imprimé). Aucun écran ni aucun texte ne suppose un pays : les outils de l'État sont ceux du pays de l'école (décision du chef du 18 nov., contexte de la RDC) | toutes |
| EP-19 | Sobre et mesuré | une page du site pèse **au plus 200 Ko transférés**, hors média lancé à la demande, vérifié en CI ; le **premier chargement de l'application web est mesuré** et écrit dans chaque PR qui le change (décision du chef du 21 nov., N1 de la [synthèse des concurrents](../etude-marche/14-reprendre-et-depasser.md)) | toutes |

**Condition légale** : aucune donnée réelle de mineur sur Planner avant le contrat de sous-traitance, le dossier CNDP de l'école et le test d'intrusion (EXP-08).

## 7. Ce qui a été corrigé par rapport aux anciens plans

| Défaut | Correction |
|---|---|
| Quatre documents se disaient « la référence » (`assainissement.md`, `plan.txt`, le registre, `04-plan-fusionne.md`), dont un absent de `main` | une seule référence : ce dossier ; `plan.txt` = vision ; `docs/conception/` = détail technique |
| La priorité s'est inversée trois fois le 4 novembre au soir | tranché le 7 novembre : plusieurs écoles d'abord |
| Cible différente selon les documents (Q-3 « supérieur seulement » jamais révoquée) | écoles privées de la maternelle au lycée, puis formation professionnelle ; Q-3 révoquée |
| Quatre prix en circulation (4,99, 5,40, 9,99 MAD, grille de 149 à 899 DH) | prix gelés avec la vente ; une seule grille quand elle reprend (VEN) |
| Mêmes identifiants pour des choses différentes (R-, P-1, D-, MP, MO, SC, F, I, M-) | identifiants par module, colonne « ancien nom » |
| Jalon de V2 impossible : la migration 0003 crée les campus d'HESTIM dans toute base neuve | PLA-03 base neuve sans données d'école |
| Un élève ne peut exister que comme compte (`Users.email` et `password_hash` obligatoires) | décision du 8 novembre : un compte créé par l'établissement ; identifiant sans adresse à concevoir (Q-20, VSC-01) |
| « 15 canaux d'isolation fermés en V2 », alors que leurs lots étaient en V5 ; I-16 oublié | PLA-02 dit exactement ce que l'étape 2 ferme ; 16 canaux |
| Le moteur presque absent du plan ; ME-14a mesuré sur le mauvais jeu | ligne MOT complète, MOT-02 sur un jeu scolaire, décision sur Timefold 1.x |
| Tailles sans rapport avec le travail (notes et bulletins en 7 jours, arabe en 5) | tailles révisées, dites comme des estimations |
| Lots disparus sans décision (EC-12, ME-8b, ME-9b) | réintégrés comme « reportés » |
| F-10 et ME-20 faisaient tous deux la réinscription | VSC-02 fait l'inscription, ADM-06 le passage d'année |
| Pas de profil maternelle dans le catalogue | question ouverte Q-08 |
| Numéros de migration réservés nulle part | tableau dans [suivi.md](suivi.md) |
| Production et sauvegardes décrites sur l'ancien serveur (maj44, Helsinki) | EXP-01 à EXP-05 : à revérifier et réinstaller sur le nouveau serveur |
| `docs/README.md` pointait vers le compte rendu du 15 octobre | réécrit |
| `docs/users.xlsx` (noms, adresses, mots de passe) versionné dans un dépôt public | retiré de l'arbre le 7 novembre ; reste dans l'historique (QUA-06) |
