# STA · Stages et alternance

**Objet** :
- offres de stage ;
- conventions et tuteur ;
- présence en entreprise ;
- jalons de l'apprentissage ;
- insertion des diplômés.

C'est un besoin réel des lycées professionnels, des CFA et de la formation professionnelle, presque sans outil selon l'inventaire.

**Hors module** :
- la formation continue et ses financeurs (FOR) ;
- l'assiduité en classe (EDT, VSC-03).

**Tables possédées** : offres, conventions de stage, tuteurs, présence en entreprise (à concevoir).

**Origine** : inventaire du 11 novembre (besoin L), décision du 13 novembre.

## Ce qui existe

- **Branche `b/offres-stage`**, jamais fusionnée (dernier commit `2efd772` : « onglet Offres et partage d'une offre par son lien »). Il reste à décider de la reprendre ou de la fermer : c'est STA-01, ancienne COU-07.
- **Absent** : conventions, tuteurs, présence en entreprise.

## Fonctions

| ID | Fonction | Ancien nom | Étape | Taille | Dépend de | État |
|---|---|---|---|---|---|---|
| STA-01 | Offres de stage (espace Carrière) : reprendre ou fermer `b/offres-stage` | COU-07, S-1 | 3 | M | — | à décider |
| STA-02 | Conventions de stage, tuteur, présence en entreprise, jalons de l'apprentissage | — | 7 | M | STA-01, FOR-01 | reporté (étape 7, feuille de route du 21 nov. ; la parité du 17 nov. la reprenait) |
| STA-03 | Avis de stage (entreprise, poste, note, photo, consentement) et idées de projet (dont trois proposées par le service d'IA de Planner), venus de StudyLib | — | 3 | M | STA-01, EDT-04 | à faire : Alexis ([fiche](../missions/sta-avis-idees.md)) ; plan au chef (données, consentement, IA) ; décision du chef du 21 nov. (Q5, Q6 de l'étude StudyLib) |
| STA-04 | Anciens élèves : annuaire des diplômés qui l'acceptent, nouvelles, offres d'emploi (avec STA-01), événements | — | 7 | M | STA-01, DOC-02 | à faire |

## Critères de « terminé »

- **STA-02** : une convention signée ne se modifie plus ; la présence en entreprise alimente l'assiduité de l'apprenant sans ressaisie.
- **STA-03** : un avis ne paraît qu'avec le consentement daté de son auteur ; rien d'identifiant ne part à l'IA, et aucun nom d'école n'est dans le prompt ; 404 hors de l'école, avec un test à deux écoles.

## Références

- [Inventaire du 11 novembre, rapport](<../../etude-marche/reports/Outils scolaires et besoins par pays.md>) : besoin L.
- Ancienne place de STA-01 : [COU](COU-espace-de-cours.md).
