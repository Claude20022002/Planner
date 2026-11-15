# UIX · Interface du site

**Objet** : ce qui vaut pour toutes les pages du site de l'application :
- système de design ;
- socle neutre ;
- accessibilité ;
- langues et écriture de droite à gauche ;
- vocabulaire selon le profil de l'école ;
- ton des textes.

**Hors module** : le site vitrine du produit (VIT).

## Ce qui existe

- **UIX-06a (pilote codé localement, PR #185 en brouillon)** : dernier logo mosaïque et assemblage école ; connexion/récupération et accueil/navigation harmonisés ; Comptes, Enseignants et Étudiants avec recherche nommée, filtres existants, listes téléphone, formulaires et états communs. Plan validé par le chef le 15 novembre. Relecture et parcours réels/CI encore attendus.

- **UIX-01a (PR #184 fusionnée, CI verte)** : accueil des applications après connexion, recherche FR/EN et navigation contextuelle par rôle ; conception validée par le chef le 15 novembre. Ce lot ne réalise pas la migration du socle neutre.

- **Site** : React 19, Vite 7, MUI. Le système visuel « panneau à volets » est décrit dans [DESIGN.md](../../../DESIGN.md).
- **Textes** : `frontend/src/i18n/fr.js` compte 2 575 lignes ; il existe un `en.js` ; il n'y a pas d'arabe. 133 styles dépendent du sens de lecture, dans 81 fichiers.
- **Identité de l'école** : migration 0055 et `shared/couleurs.js`. Aucun nom d'école n'est écrit en dur (contrôle CI `scripts/verifier-neutre.mjs`).
- **Socle neutre** : la conception est fusionnée ([conception-socle-neutre](../../conception/interface/conception-socle-neutre.md)), **aucun code n'est écrit**. La migration 0060 est réservée.
- **Ton** : celui des écrans de l'administration est fait (#96). Les **messages du serveur** gardent encore environ 149 « (s) » dans `controllers` et `services`. Un commit pour les enseignants n'est pas fusionné (`b/textes-enseignant`).

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| UIX-01 | Socle neutre : thème neutre, état « en configuration », école fictive, écriture de droite à gauche préparée | SN-1 à SN-5 | 2 | L | — | conçu, à coder |
| UIX-01a | Accueil des applications et navigation web inspirée d’Odoo, sur les fonctions existantes | — | exception du 15 nov. | M | — | fait : #184 fusionnée, 43 parcours réussis |
| UIX-02 | Vocabulaire des écrans selon le profil de l'école (classe et non groupe, matière et non cours, trimestre et non semestre…) | F-04 (écrans) | 3 | M | MOT-05 | à faire |
| UIX-03 | Accessibilité AA : axe-core sans violation dans les parcours | M-13 | libre | M | — | en partie |
| UIX-04 | Arabe complet : site, application et documents PDF, de droite à gauche ; **prouver d'abord le rendu arabe des PDF** (jsPDF) | F-16 | 4 | XL | UIX-01 | à faire |
| UIX-05 | Ton des messages du serveur ; notifications en anglais (m-7) ; reprendre `b/textes-enseignant` et `b/textes-coherence` | ton des textes | libre | M | — | à faire |
| UIX-06 | Style unifié entre les pages anciennes et récentes | P-5 | libre | M | UIX-01 (pilote visuel découplé) | en cours : pilote UIX-06a codé, à relire et vérifier en CI |
| UIX-06a | Pilote web : marque, connexion, navigation et Personnes | — | exception du 15 nov. | — | sans migration UIX-01 | codé localement, PR #185 en brouillon |

## Critères de « terminé »

- **UIX-01** :
  - une installation neuve n'affiche ni nom, ni couleur, ni photo d'HESTIM ;
  - le passage en `dir="rtl"` ne casse aucune page des parcours.
- **UIX-02** : une école fictive de collège parcourt toutes ses pages sans voir un mot propre au supérieur. Un parcours le prouve.
- **UIX-04** : un bulletin et un emploi du temps en PDF s'impriment en arabe, avec les lettres liées.
- **UIX-05** : `git grep "(s)"` ne trouve plus rien dans les messages renvoyés par le serveur.

## Exigences produit

EP-2, EP-11.

## Références

- [Conception du socle neutre](../../conception/interface/conception-socle-neutre.md)
- Archives : [ton des textes](../../archives/plans/ton-des-textes.md), [plan du groupe B du 22 octobre](../../archives/plans/plan-groupe-b-2026-10-22.md)

### Conception du lot UIX-01a

[Accueil des applications et navigation](../../conception/interface/uix-01a-navigation.md), validé par Claude20022002 le 15 novembre. Exception de chantier limitée à ce lot.

### Pilote UIX-06a : marque et premières pages de gestion

[Conception du pilote Personnes](../../conception/interface/uix-06a-interface.md), validée par le chef le 15 novembre (« Valider », quatre propositions). L’exception et le découplage sans migration sont autorisés pour ce lot seulement. Implémentation locale terminée ; relecture et CI attendues. Le thème historique reste applicable aux autres pages et les documents imprimés conservent LogoEcole.
