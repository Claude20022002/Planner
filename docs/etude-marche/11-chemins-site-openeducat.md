# Les chemins du site d'OpenEduCat, et ce qui manque au site de Planner

| | |
|---|---|
| Relevé par | le coordinateur (Claude Code, Opus 5.5), le 18 novembre 2026, à la demande du chef |
| Source | plan du site public d'OpenEduCat (`openeducat.org/sitemap.xml`, environ 600 adresses lues sur 3 millions de caractères, le reste est de la même famille), et les pages `/compare/`, `/compare/moodle/`, `/contact/`, lues le même jour |
| Règle | on s'inspire, on ne copie rien ; on ne dit que ce qui existe (plan du site, § 2) |

## 1. Les familles de pages d'OpenEduCat

| Famille | Nombre | Exemples | Ce que c'est |
|---|---|---|---|
| Accueil | 1 | `/` | modules en grille, chiffres, témoignages, badges, articles |
| Fonctionnalités | 73 + `/features/` | `/feature-attendance-management-system/`, `/feature-timetable-management-system/`, `/feature-library-management-system/` | **une page par module** |
| Fonctionnalité par type d'école | environ 80 | `/feature-lms/high-schools/`, `/feature-campus/universities/` | le même module, présenté pour un type d'établissement |
| Par rôle | 9 | `/for/principals/`, `/for/teachers/`, `/for/registrars/` | « avant → avec », capacités, FAQ |
| Solutions | environ 255 | par type d'établissement, par pays, « gratuit / open source pour… » | pages faites pour les moteurs de recherche |
| **Comparatifs** | 1 + 27 | `/compare/`, `/compare/moodle/`, `/compare/fedena/` + guides de migration | une page par concurrent : cartes, tableau de dix critères, coût total estimé, raisons de changer, migration en cinq étapes, FAQ |
| Éditions | 1 | `/compare-editions/` | gratuite contre payante |
| Études de cas | 1 + 9 | `/case-studies/` | une école cliente par page |
| Articles | environ 100 | `/articles/`, sept catégories | blog |
| Pays | 28 | `/education-software-morocco/`, `/education-software-kenya/` | une page par pays |
| Calculateurs | 6 | `/calculator-teacher-roi/` | retour sur investissement estimé |
| Institutionnel | 11 | `/about/`, `/contact/`, `/demo/`, `/faq/`, `/pricing/`, `/disclaimer/`, `/acceptable-use/`, licences | — |

## 2. Ce que fait leur page Contact

Une réponse promise sous un jour ouvré. Les adresses e-mail par sujet (ventes, support, général) et les réseaux. Les bureaux, en texte. Un formulaire (nom, e-mail, téléphone, sujet, message). « Comment nous pouvons aider » en quatre parcours. « Ce qui se passe ensuite » en quatre étapes. Des liens vers la démonstration et la FAQ. Pas de numéro de téléphone affiché.

## 3. Ce que font leurs comparatifs

La page centrale présente vingt concurrents en cartes, avec leur positionnement, leur marché et leur année de fondation. Chaque page de concurrent contient un tableau de dix critères rédigés en texte (périmètre, dossier élève, finances, RH, admissions, emploi du temps, intégrations nécessaires, mobile, coût total, données unifiées), puis un coût total estimé pour trois tailles d'école, sans source indépendante. Elle se termine par un guide de migration et une FAQ.

## 4. Ce qui serait utile à Planner, et la décision du chef (18 nov., vers 21 h 15)

| Chemin | Chez Planner aujourd'hui | Décision |
|---|---|---|
| Une page par module | sept pages par app et le catalogue (VIT-11, à coder) | **à faire avant la mise en ligne** : une fiche par module, avec son logo, ses sources et un bloc « selon votre équipement » (sans wifi, sans écran, sans téléphone de l'élève : EP-18) → [VIT-15](../plan/missions/vit-15-pages-modules.md) |
| Fonctionnalités par type d'école | page Solutions, trois types | à faire : [VIT-13](../plan/missions/vit-13-pourquoi-et-types.md) |
| Par rôle | quatre pages (VIT-10) | fait ; « avant → avec » et FAQ : [VIT-10b](../plan/missions/vit-10b-avant-avec-faq.md) |
| **Comparatif** | rien | **à faire, par approche et sans nommer de concurrent** : Planner face au tableur et à la messagerie, à l'ERP généraliste, au LMS seul, au logiciel de vie scolaire. C'est la section « Pourquoi Planner » de l'accueil, plus une page `/comparer/` → [VIT-14](../plan/missions/vit-14-comparatif.md) |
| Contact | une section sans formulaire | **page complète** : canaux, ce qui se passe ensuite, demande de démonstration avec la vidéo, toujours sans formulaire avant VIT-02 → [VIT-16](../plan/missions/vit-16-contact-a-propos.md) |
| À propos | rien | **à faire** : mission, principes, ce qui fait Planner → [VIT-16](../plan/missions/vit-16-contact-a-propos.md) |
| Études de cas | rien (aucun client publiable) | **plus tard** : une page prête quand une école accepte d'en publier une |
| FAQ | à coder (VIT-11) | prévu |
| Mentions et confidentialité | à faire (VIT-12) | prévu |
| Articles, pays, calculateurs, éditions, tarifs | rien | **écartés pour l'instant** : vente mise de côté, aucun chiffre vrai, aucun pays supposé (EP-5) |
| Témoignages, badges, nombres d'utilisateurs, discussion en direct, essai gratuit | rien | **écartés** : rien de vrai pour les remplir, ou un service tiers |

## 5. Ce que Planner peut dire de plus qu'eux, sans rien inventer

- **L'emploi du temps calculé sous contraintes, avec la raison de chaque refus** : leur comparatif liste « Timetable & Scheduling » comme une ligne parmi dix.
- **Tous les contextes** (EP-18) : sans wifi, sans écran, sans téléphone de l'élève. Aucune de leurs pages ne le traite.
- **Aucun pays supposé** : leurs pages par pays sont faites pour le référencement, et non pour les plateformes nationales.

Ces points se vérifient dans le code avant d'être écrits (VIT-14).
