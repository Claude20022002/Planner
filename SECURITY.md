# Politique de sécurité

<!-- Rôle : dire comment signaler une faille de Planner et ce que l'équipe promet en retour (QUA-08, décisions du 15 et du 16 novembre 2026). -->

**In English, briefly.** Please report security issues **privately**, through GitHub: *Security* tab → **Report a vulnerability** ([direct link](https://github.com/Claude20022002/Planner/security/advisories/new)). Do not open a public issue. We acknowledge every report within **7 days**, and publish a fix or an advisory within **90 days** at most. Test only on your own local installation, with fictitious data. The rest of this page is in French.

## Signaler une faille

- Passez par le **signalement privé de GitHub** : onglet *Security* du dépôt, bouton **Report a vulnerability** ([lien direct](https://github.com/Claude20022002/Planner/security/advisories/new)). L'échange reste privé entre vous et l'équipe.
- N'ouvrez **pas** de ticket public, de discussion ou de PR qui décrive la faille.
- Un formulaire de signalement sur le site de Planner est prévu. Quand il sera en ligne, cette page y renverra, et le signalement par GitHub restera ouvert.

## Ce que nous promettons

| Étape | Délai |
|---|---|
| Accusé de réception | **7 jours** au plus |
| Correctif publié, ou avis publié qui explique la faille et comment s'en protéger | **90 jours** au plus après le signalement |

Nous vous citons dans l'avis publié si vous le souhaitez.

## Ce qui est couvert

- **Ce dépôt** : le serveur, le site, l'application mobile, le solveur et les scripts d'exploitation.
- Les versions : la branche `main` et le **dernier paquet de mise à jour publié**. Planner n'a pas encore de versions numérotées.

## Règles pour essayer

- Essayez **seulement sur une installation à vous**, en local, avec des **données fictives**. Le dépôt contient tout ce qu'il faut pour l'installer (`README.md`).
- **Toute installation d'une école est hors du périmètre** : n'y essayez rien, même si vous la trouvez en ligne.
- Pas de déni de service, pas d'ingénierie sociale, pas d'accès aux données d'une autre personne.

## Ce qu'il faut joindre

- une description de la faille et de son impact ;
- les étapes pour la reproduire ;
- le commit ou le paquet de mise à jour concerné ;
- si vous l'avez, une piste de correction.
