# Mission · VIT-16 · la page Contact complète, et la page À propos

| | |
|---|---|
| État | plan écrit ; attend les corrections du chef et `[RÉSEAU]` ; le code après la fusion de VIT-12 |
| Agent | la **nouvelle session Claude** de VIT-12 (pages légales) : ce sont les mêmes questions d'identité au chef |
| Modèle recommandé | le plus capable (Claude Fable 5.2, sinon Opus 5.5) |
| Attribuée le | 2026-11-18, par le coordinateur ; accord du chef : oui, le 18 nov. vers 21 h 15 (« la page contact est encore vide ») ; **condition 10** de la mise en ligne |
| Module | [VIT](../modules/VIT-site-vitrine.md) · préparation de VIT-05 |
| Fonction | VIT-16 : une vraie page `/contact/` et une page `/a-propos/` · taille S |
| Branche | `feat/vit-16-contact-a-propos`, depuis `origin/main` après la fusion de VIT-10 (#219) |
| Plan de conception | plan court `docs/conception/vitrine/vit-16-contact-a-propos.md` · **validé par le chef**, chaque texte et chaque coordonnée compris |

## Ce que doit contenir la page Contact (inspirée de celle d'OpenEduCat, [relevé](../../etude-marche/11-chemins-site-openeducat.md), § 2)

- Les canaux que le chef choisit et accepte de publier (e-mail, WhatsApp, autre) : **aucune coordonnée n'est supposée**.
- Le délai de réponse, si le chef en promet un.
- « Comment nous pouvons vous aider » : quelques parcours (démonstration, question sur une école, partenariat), chacun avec le bon canal.
- « Ce qui se passe après votre message » : les étapes que le chef valide.
- La demande de démonstration, avec la vidéo de l'accueil (VIT-08) et le canal de contact.
- **Pas de formulaire** : il viendra avec VIT-02, après les textes légaux et le nom de domaine.

## Ce que doit contenir la page À propos

Qui fait Planner (ce que le chef accepte de publier), la mission, et les principes déjà décidés : les données restent à l'école, tous les contextes (EP-18), aucun pays supposé (EP-5), aucun envoi caché (EP-13). Sans témoignage ni chiffre.

## Critère de « terminé »

- Les deux pages en français et en anglais ; leurs liens dans l'en-tête (« Nous contacter » mène à `/contact/`) et dans le pied de page ; la section Contact de l'accueil renvoie à la page.
- Rien de réel sans l'accord explicite du chef (le dépôt est public).
- Build, tests, `verifier-neutre.mjs`, axe-core, 390 et 1440 px.

## Périmètre d'écriture

- les deux pages et leurs textes ;
- leurs clés dans `langues.js`, leurs liens dans `EnTete.astro` (le seul bouton de contact) et dans `PiedDePage.astro` ;
- `vitrine/src/components/accueil/Contact.astro`, pour renvoyer à la page ;
- `vitrine/tests/` ;
- le plan, la ligne du module, la fiche de session.

L'agent ne touche pas à `docs/plan/suivi.md`.

## Suivi

| Date | Relecture ou événement | Verdict |
|---|---|---|
| 2026-11-18 21 h 20 | fiche écrite par le coordinateur, sur la décision du chef | — |
| 2026-11-19 0 h 20 | plan écrit (`80d8e603`, corrigé en `b6eaae02`), « validé avec corrections » par le chef, **mais le texte des corrections n'est pas arrivé** (champ « Autre ») ; `[RÉSEAU]` attendu. **D1** (chef, 18 nov.) : une adresse e-mail dédiée au site, avec « réponse sous deux jours ouvrés » ; l'adresse reste à donner. Tous les boutons « Nous contacter » mènent à `/contact/` (expertise, C1). **Condition 11** de la mise en ligne | en attente du chef |
