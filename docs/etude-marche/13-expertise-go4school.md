# Expertise du site de Go4School, un concurrent en Afrique subsaharienne

| | |
|---|---|
| Fait par | Claude Code (Opus 5.5), à la demande du chef, le 21 novembre 2026 |
| Regard | le même que pour notre site ([expertise du site de Planner](12-expertise-site-vitrine.md)) : directeur de création, expert produit et conversion, expert en accessibilité |
| Objet | le site public `https://www.go4school.net/fr`, visité le 21 nov. 2026 : 26 pages en français d'après son plan du site, dont 12 pages de module |
| Éditeur | FNT TECH SARL, Douala et Yaoundé (Cameroun), d'après les mentions du site |
| Limite | **seul le site est jugé, pas le produit.** Le code de Go4School n'est pas public : une promesse est dite « vérifiable de l'extérieur » ou « invérifiable », jamais « vraie » |
| Usage | **étude interne.** Elle nomme un concurrent : elle ne sert pas telle quelle dans une publicité ni sur notre site ([arguments marketing](02-arguments-marketing.md), § 5) |

## 0. Le verdict

Go4School a **un site de vendeur** : il dit pour qui il est (les écoles du Cameroun et d'Afrique subsaharienne, de la maternelle au lycée), il montre le produit sur de vraies captures, et il offre cinq façons de le joindre, avec la promesse d'une réponse sous 24 heures ouvrées. C'est tout ce qui manque au site de Planner.

Mais **le site contredit sa propre promesse technique**. Il se dit « conçu pour la 2G » et « sobre en données », alors que son accueil demande environ 500 requêtes, 1,7 Mo de scripts compressés (5 Mo une fois décompressés) et une vidéo de 3,7 Mo. Sur un téléphone simulé, la performance tombe à 48 sur 100. Son bouton principal manque de contraste, et Google Analytics comme la discussion en direct Tawk.to sont appelés avant tout choix sur le bandeau de cookies.

Pour Planner, c'est **un concurrent direct en Afrique**, sur le terrain d'EP-18. Mais il ne vise pas aujourd'hui le même segment : Go4School s'arrête au lycée, et il ne dit rien du calcul sous contraintes de l'emploi du temps.

| Axe | Note | En une phrase |
|---|---|---|
| Objectifs et conversion | **9/10** | En 30 s, un directeur camerounais sait que c'est pour lui ; en 3 min, il a demandé un devis ou écrit sur WhatsApp |
| Promesses | **6/10** | Des promesses précises et souvent vérifiables, mais un « n° 1 » sans source, un « essai gratuit » introuvable, et trois décomptes de modules différents |
| Design | **8/10** | Vraies captures sur ordinateur et téléphone, une charte tenue, de bonnes comparaisons ; une page trop longue et des zones vides |
| Qualité mesurée | **3/10** | Performance mobile de 29 à 48, contraste du bouton principal sous AA, formulaire de devis avec deux violations critiques |
| Confidentialité | **5/10** | Politique de cookies claire, mais Google Tag Manager, Google Analytics, Tawk.to, Cloudflare Insights et Google Fonts appelés avant tout choix |
| Positionnement | **8/10** | Très fort au Cameroun (deux sous-systèmes, OHADA, Mobile Money) ; muet sur le supérieur et sur le calcul de l'emploi du temps |

Ce que Planner peut en tirer est au § 8.

## 1. Méthode

Le même outillage que pour notre site, installé dans un dossier temporaire hors du dépôt : Chrome du poste piloté par Playwright 1.56.1, axe-core 4.10.3, Lighthouse 12.8.2. Aucune donnée personnelle n'a été envoyée : aucun formulaire n'a été rempli, aucun compte n'a été créé, et le bandeau de cookies n'a été ni accepté ni refusé.

| Mesure | Pages | Volume |
|---|---|---|
| Relevé du texte, des titres, des liens, des formulaires, des domaines appelés et des cookies | accueil, Modules, un module (GO4SBOOK), Cameroun, Contact, Devis, FAQ, Mentions légales, Cookies | 9 pages, en 1440 px |
| axe-core (WCAG 2.0 à 2.2 A et AA, bonnes pratiques) et débordement horizontal | accueil, Modules, GO4SBOOK, Contact, Devis, Cameroun | 6 pages × 390 et 1440 px = 12 passages |
| Captures pleine page | les mêmes | 390 et 1440 px |
| Lighthouse, profil mobile (Moto G simulé : 150 ms de latence, 1,6 Mb/s, processeur ralenti 4 fois) ; profil ordinateur sur l'accueil | accueil, GO4SBOOK, Contact | 4 rapports |
| En-têtes HTTP (compression, cache) | trois fichiers | `curl` |
| `robots.txt` et plan du site | — | `curl` |

Un piège évité : à 390 px, l'accueil n'atteint jamais le repos du réseau en 90 s (une vidéo continue de charger). Les mesures attendent donc la fin du chargement, puis quatre secondes.

Deux relevés ont été corrigés avant d'écrire :

- le texte de la page Contact montrait « [email protected] » à la place des adresses. Sur la capture, elles s'affichent bien : le relevé avait été pris avant que le script de Cloudflare les décode. Ce n'est pas un défaut ;
- Lors des mesures sur téléphone, Lighthouse a reçu les scripts **sans compression** (3,6 Mo à gagner selon lui). Or `curl`, puis la mesure sur ordinateur, les reçoivent bien compressés en Brotli (le script `chat_controller` passe de 731 Ko à 191 Ko). Le cache de Cloudflare n'était sans doute pas encore rempli. Les temps d'affichage sur téléphone sont donc **surestimés** ; les poids du § 5 sont donnés dans les deux cas.

## 2. Les objectifs et la conversion : 9/10

### Le test des 30 secondes, puis des 3 minutes

| Visiteur | En 30 s | En 3 min |
|---|---|---|
| **Promoteur ou directeur d'une école camerounaise** | le titre (« L'école connectée, entre vos mains »), la bande « 14 modules · 11 espaces · Mobile Money · Comptabilité OHADA · Français & Anglais », puis une vraie capture du tableau de bord : il sait que c'est pour lui | il a rempli le devis sur une page (« Cinq minutes suffisent »), ou écrit sur WhatsApp, avec une réponse promise sous 24 heures ouvrées |
| **Intendant ou économe** | Mobile Money, encaissement au guichet avec reçu numéroté, comptabilité OHADA jusqu'à la DSF | une page par module (frais, comptabilité, dépenses, paie) |
| **Enseignant** | appel et cahier de textes sur le téléphone, même sans réseau | il peut créer un compte parent ou enseignant, ou ouvrir GO4TEACH |
| **Directeur d'université ou de BTS** | **rien** : le site parle de maternelle, de primaire et de secondaire, de CEP, BEPC, Probatoire, BAC et GCE | il ne trouve rien sur le supérieur |

### Les chemins vers le contact

Six chemins, visibles en pied de page ou sur chaque page :

1. le **devis** sur une page (`/fr/quote_requests`) : établissement, ordre et type d'enseignement, sous-système, effectif par tranche, ville, contact, modules, urgence ;
2. le **formulaire de contact** (`/fr/contacts`) : quatre besoins au choix (équiper mon école, déployer un réseau, voir une démonstration, support) ;
3. **WhatsApp**, deux numéros, présentés comme « réponse immédiate » ;
4. deux **adresses e-mail** ;
5. deux **bureaux**, avec leurs horaires ;
6. une **discussion en direct** (Tawk.to), en bulle sur chaque page.

La page Contact dit aussi **ce qui suit** : un échange de 20 minutes, une démonstration sur vos cas d'usage, un devis chiffré, puis une mise en service en 24 à 48 heures. C'est exactement ce que la mission VIT-16 prévoit pour Planner.

## 3. Les promesses : 6/10

Les promesses de Go4School sont **précises**, ce qui est rare : des normes nommées (SYSCOHADA, SYCEBNL, DSF, IRPP, CNPS, DIPE, MINESEC), des algorithmes de chiffrement (X25519 et XChaCha20-Poly1305), des délais. Une promesse précise engage, et se vérifie chez un client. Mais plusieurs se contredisent ou ne s'appuient sur rien de visible.

| # | Promesse | Où | Ce qu'on peut vérifier de l'extérieur | Verdict |
|---|---|---|---|---|
| G1 | « La plateforme digitale de gestion scolaire **#1 au Cameroun** » ; og:title : « La Solution #1 » | description et balises Open Graph de l'accueil | aucune source, aucun chiffre sur le site | **sans preuve** : un superlatif que notre règle interdit (« pas de n° 1 sans preuve ») |
| G2 | « **Essai gratuit** » | description de l'accueil, celle que montrent les moteurs de recherche | aucune page ni aucun bouton ne propose d'essai ; la FAQ n'en parle que pour l'IA de GO4TEACH | **introuvable sur le site** |
| G3 | « **Quatorze modules** » | accueil | 12 pages de module dans le plan du site ; GO4SCONFIG et GO4SDOC n'en ont pas. Le devis annonce « **10 modules disponibles** » | **trois décomptes différents** |
| G4 | « Conçu pour la 2G », « Sobre en données » | accueil, section Afrique ; page Cameroun | la promesse porte sur l'application ; mais le site lui-même charge environ 500 requêtes, 1,7 Mo de scripts compressés, une vidéo de 3,7 Mo, et demande 8,9 s de travail au processeur d'un téléphone simulé (§ 5) | **contredite par le site** pour la partie visible |
| G5 | « L'appel, le scan des présences et l'embarquement dans le bus fonctionnent hors ligne, puis se synchronisent » | accueil | invérifiable sans l'application ; la promesse est bornée (trois fonctions nommées), ce qui la rend crédible | **précise, invérifiable** |
| G6 | « Conforme aux lois de protection des données de vos pays » | accueil, bloc « confiance » | aucune loi, aucun pays nommé | **floue** |
| G7 | « 99,9 % — Objectif de disponibilité » ; page de statut publique | accueil ; `go4school.statuspage.io` | la page de statut existe et répond | **honnête** : un objectif, dit comme tel, avec sa preuve publique |
| G8 | « L'assistant n'apparaît que là où l'école l'a explicitement activé » ; jetons prépayés | accueil, section GO4SIA | invérifiable | **précise, invérifiable** |
| G9 | « L'emploi du temps de chaque classe se remplit de cinq façons » ; « au secondaire, les souhaits des enseignants […] servent à générer la grille » | page GO4SBOOK | invérifiable ; rien sur les règles tenues, les conflits ni la raison d'un refus | **floue** sur ce qui est calculé |

## 4. Le design : 8/10

### Ce qui est réussi

- **Le produit est montré.** Une vraie capture du tableau de bord d'un « complexe scolaire » sur l'accueil, dix écrans de l'application mobile, une capture par espace (direction, enseignants, parents, élèves). C'est ce que le plan de notre site appelle « des visuels du produit soignés, sur ordinateur et sur téléphone ».
- **Une charte tenue** : vert et quasi-noir, une seule police (DM Sans), un trait vert sous chaque titre, des icônes au trait régulier.
- **Des comparaisons qui parlent** : « Le groupe de discussion » face à « Go4School » (« 200 messages par jour », « Tous les numéros sont visibles de tous » contre « Un accusé de lecture par famille »). C'est le bloc « avant → avec » que VIT-10b prépare.
- **Une offre lisible** : les modules sont rangés en trois familles (« Apprendre, administrer, documenter », « Encaisser, comptabiliser, maîtriser », « Communiquer, nourrir, soigner, transporter »), avec un badge « Socle » et un badge pour ce qui est « Inclus » ou payé « à l'usage ».
- **Des onglets par rôle** (« Écoles & direction », « Pilotage du groupe », « Enseignants », « Parents », « Élèves »), puis « Et pour chaque métier de l'école » : caisse, infirmerie, cantine, transport, surveillance.

### Ce qui déçoit

| Constat | Preuve |
|---|---|
| **Page d'accueil très longue** : 21 900 px à 390 px, soit 26 écrans de téléphone | mesure Playwright |
| **Zones vides sur nos captures** : la vidéo d'ouverture, le visuel de GO4SPILOT et la bande « Intégrations de paiement » restent des cadres vides (peut-être un chargement différé que nos captures n'ont pas attendu) | captures 390 et 1440 px |
| **Le bandeau de cookies flotte au milieu de l'écran** : il cache le titre de la deuxième section, et sur la page Contact il couvre deux champs du formulaire | captures `accueil-1440`, `contact-390` |
| **Une donnée de démonstration peu crédible** : « Taux de présence moyen 100.0 % sur 4 écoles » sur la capture principale | capture de l'accueil |
| **La vidéo d'ouverture** (`NEW-GO4SCHOOL-manifeste-master-1080p.mp4`, 3,7 Mo) part sur l'accueil, a du son (« Activer le son ») et continue de charger sur téléphone | Lighthouse ordinateur ; à 390 px, le réseau n'est jamais au repos en 90 s |

## 5. La qualité mesurée : 3/10

### Lighthouse

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | Premier affichage | LCP | TBT | CLS | Transféré |
|---|---|---|---|---|---|---|---|---|---|
| Accueil, téléphone | **48** | 96 | 79 | 100 | 30,6 s * | 31,7 s * | 310 ms | 0,012 | 6 341 Ko * |
| GO4SBOOK, téléphone | **29** | 96 | 79 | 100 | 26,4 s * | 26,4 s * | 1 500 ms | 0,016 | 6 097 Ko * |
| Contact, téléphone | **38** | 96 | 75 | 100 | 9,1 s * | 9,3 s * | 780 ms | 0,009 | 4 895 Ko * |
| Accueil, ordinateur | 76 | 96 | 78 | 100 | 2,0 s | 2,2 s | 60 ms | 0,051 | 5 960 Ko |

\* **Avec réserve** : sur téléphone, Lighthouse a reçu les scripts sans compression (§ 1). Les temps d'affichage y sont donc surestimés.

**Ce que pèse vraiment l'accueil**, d'après la mesure sur ordinateur, où la compression était active :

| Type | Transféré |
|---|---|
| Scripts | 1 735 Ko (5 196 Ko non compressés, sur téléphone) |
| Vidéo d'ouverture | 3 716 Ko |
| Feuilles de style, images, police, page | environ 480 Ko |
| **Total** | **environ 5,9 Mo, en 504 requêtes** |

Les chiffres qui ne dépendent pas de la compression :

- **454 scripts** sur l'accueil ;
- **8,9 s de travail du processeur** sur un téléphone simulé, dont 2,8 s d'exécution de JavaScript ; 9,6 s sur la page GO4SBOOK ;
- **plus de 2 Mo de JavaScript inutilisé** sur l'accueil et sur GO4SBOOK, selon Lighthouse.

Les plus gros fichiers chargés par la vitrine viennent **de l'application** : la messagerie (`chat_controller`, 731 Ko décodés), les icônes (548 Ko), la saisie des numéros de téléphone (310 Ko), le calendrier (255 Ko) et les graphiques (201 Ko). Une page de présentation n'en a pas besoin. Sur un téléphone d'entrée de gamme et un forfait limité, c'est l'inverse de « sobre en données ».

Pour mémoire, notre site : 81 à 84 Ko transférés par page, et une performance de 79 à 100 sur téléphone (79 à cause du saut du menu, que VIT-17 doit corriger).

### axe-core

| Page | Violations (390 et 1440 px) |
|---|---|
| Accueil | contraste insuffisant (19 à 20 éléments, grave) ; texte alternatif qui répète le texte voisin (11, mineur) ; contenu hors repère (1) |
| Modules, GO4SBOOK, Cameroun, Contact | contraste insuffisant (3 à 5, grave) ; contenu hors repère (1) |
| **Devis** | **deux listes déroulantes sans nom accessible et dont la structure est invalide (critique)** ; un interrupteur sans nom ; deux zones défilantes inaccessibles au clavier ; contraste insuffisant (26 à 27) ; contenu hors repère (3) |

- **Le bouton principal** (« Je m'inscris », « Demander un devis ») est en texte blanc sur vert `#47A534` : contraste de **3,13**, sous le minimum de 4,5 pour un texte de 14 à 16 px.
- **Le formulaire de devis** est le chemin de conversion du site. Ses deux listes déroulantes (bibliothèque SlimSelect) ne sont pas utilisables avec un lecteur d'écran.
- Aucun débordement horizontal, sur aucune page.

### Le référencement

Il est soigné : titre et description par page, balises Open Graph avec une image de 1200 × 630, adresse canonique, `hreflang` en `fr-CM`, `en-CM` et `x-default`, plan du site compressé, `robots.txt` propre. SEO à 100 sur les trois pages mesurées.

## 6. La confidentialité : 5/10

| Constat | Preuve |
|---|---|
| **Google Tag Manager** est chargé avant tout choix (533 Ko) | requête vers `www.googletagmanager.com/gtag/js` |
| **Un signal part vers Google Analytics avant tout choix**, en mode « consentement refusé » (paramètre `gcs=G100`), sans déposer de cookie | requête `www.google-analytics.com/g/collect`, réponse 204 |
| **Tawk.to**, la discussion en direct, est chargée (365 Ko) et **ouvre une session** avant tout choix | requêtes vers `embed.tawk.to` et `va.tawk.to/v1/session/start` (mesure Lighthouse sur ordinateur) |
| **Cloudflare Insights**, **Google Fonts** (police DM Sans servie par Google) et le script de **Statuspage** sont chargés sur chaque page | domaines `static.cloudflareinsights.com`, `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.statuspage.io` |
| Seul le cookie de session `_go4school_session` est déposé sans choix | cookies de la page après chargement |
| Le bandeau dit « En cliquant sur « Accepter », vous consentez à l'utilisation de TOUS les cookies », avec deux boutons de même poids, « Refuser » et « Accepter » | texte du bandeau |
| La politique de cookies nomme Google Analytics et dit qu'on peut refuser les cookies analytiques ; elle ne nomme pas Tawk.to | `/fr/cookies` |

C'est une pratique courante, et la politique est honnête. Mais le contraste avec notre site est net : celui de Planner ne charge rien d'ailleurs et ne dépose aucun cookie (« Ce site ne vous suit pas »).

## 7. Le positionnement, face à Planner : 8/10

### Ce que Go4School dit, et ce que Planner a

| Thème | Go4School (site, 21 nov.) | Planner (code et site, 21 nov.) | Qui a l'avantage |
|---|---|---|---|
| **Pour qui** | maternelle, primaire, secondaire, complexes scolaires ; tutelles (diocèses, ONG) via GO4SPILOT ; **Cameroun** d'abord, l'Afrique subsaharienne ensuite | le supérieur et la formation professionnelle aujourd'hui (D4) ; le collège et le lycée « bientôt » ; **aucun pays supposé** (EP-5) | des segments différents aujourd'hui ; **collision à l'étape 3** (le scolaire, VSC) |
| **Emploi du temps** | « se remplit de cinq façons » ; au secondaire, une grille générée à partir des souhaits des enseignants | calcul sous contraintes (salles, campus, groupes emboîtés, règles strictes et souples), bilan de chaque règle, raison de chaque refus | **Planner**, s'il le montre (VIT-09b, VIT-14) |
| **Périmètre** | 14 modules : notes et bulletins, finances, comptabilité OHADA, paie, RH, stocks, cantine, santé, transport, communication | emploi du temps, appel, quiz, jeux, espace de cours, bibliothèque ; notes, familles et frais « bientôt » | **Go4School**, de loin |
| **Paiement** | Mobile Money (MTN, Orange), guichet avec reçu numéroté, « preuve de dépôt pour les familles non équipées » | rien | **Go4School** |
| **Sans réseau** | appel, scan des présences, embarquement hors ligne ; poids affiché avant chaque téléchargement ; reprise après coupure | la semaine déjà consultée se lit sans réseau ; le hors ligne complet (MOB-06) n'est pas fait | **Go4School** |
| **Sans téléphone** | SMS pour les familles sans application, guichet pour les espèces, kiosque | appel à la main ; quiz dans un navigateur ; emploi du temps en PDF | égalité, chacun à sa façon |
| **Langues et pays** | français et anglais, deux sous-systèmes, examens camerounais ; paie au barème camerounais | français et anglais, arabe prévu ; aucun pays supposé | Go4School au Cameroun ; Planner partout ailleurs |
| **IA** | assistant « Juju », activé école par école, payé en jetons prépayés par Mobile Money | IA du Studio quiz et de la bibliothèque, allumée par la clé du serveur ; interrupteur par école prévu (D2, QJE-16) | Go4School sur l'activation par école |
| **Communication** | communiqués ciblés, accusés de lecture, chat chiffré, SMS : « mieux qu'un groupe WhatsApp » | annonces ciblées, e-mail facultatif, sondages | **Go4School** |
| **Contact et conversion** | devis, formulaire, WhatsApp, e-mail, bureaux, « ce qui suit », réponse sous 24 h | une section vide (VIT-16 en cours) | **Go4School** |
| **Poids, accessibilité, confidentialité du site** | environ 5,9 Mo et 500 requêtes sur l'accueil, performance mobile de 29 à 48, contraste sous AA, Google et Tawk.to appelés avant tout choix | 81 à 84 Ko par page, axe-core sans violation, rien d'un autre site | **Planner** |

### En une phrase

Go4School vend **la gestion complète d'une école africaine, de la maternelle au lycée** ; Planner vend **l'emploi du temps calculé et la vie de la classe, pour le supérieur et la formation**. Ils se rencontreront quand Planner ouvrira le scolaire (étape 3) et visera des pays comme le Cameroun ou la RDC. Ce jour-là, l'avantage de Planner sera le calcul de l'emploi du temps et la neutralité de pays. Son retard sera la finance, le paiement mobile et le hors ligne.

## 8. Ce que Planner peut en tirer

On s'inspire, on ne copie rien : ni texte, ni mise en page, ni nom.

### Pour le site

| # | Leçon | Mission qui la porterait |
|---|---|---|
| L1 | **Un contact complet** : plusieurs canaux, un délai de réponse, et « ce qui suit » en étapes. Go4School le fait sur une page sobre. Sa discussion en direct passe par un service tiers : Planner, qui ne charge rien d'ailleurs, s'en tient à l'e-mail et, si le chef le veut, à un lien WhatsApp (un simple lien ne charge rien) | VIT-16 (l'adresse attend le chef, D1) |
| L2 | **Montrer le produit** sur ordinateur et sur téléphone, avec des données de démonstration **crédibles** (pas de « 100 % de présence ») | VIT-09b |
| L3 | **Une comparaison avec ce qu'on fait sans outil** (le groupe de discussion, le papier), sans nommer personne | VIT-10b, VIT-14 |
| L4 | **Un périmètre hors ligne borné** : nommer les fonctions qui marchent sans réseau, plutôt qu'un « hors ligne » général. VIT-18 (en attente de fusion) le fait déjà pour la semaine consultée | VIT-15 (bloc « selon votre équipement ») |
| L5 | **Une page par module** avec « Qui s'en sert », une FAQ et « Les modules qui vont avec » | VIT-15 |
| L6 | **Les métiers de l'école** (caisse, infirmerie, cantine…) présentés à part des rôles | à garder pour l'étape 3 (VSC) |
| L7 | **Éviter leurs défauts** : pas de superlatif sans source, des décomptes cohérents, un bouton principal au contraste AA, aucun script d'application sur la vitrine, rien chargé d'ailleurs | règles déjà en place ; le test de garde de VIT-18 peut s'étendre aux superlatifs |

### Pour le produit (décisions du chef)

- **Le hors ligne de l'appel** : Go4School en fait un argument d'Afrique. Pour Planner, c'est MOB-06, et l'étude EP-18 doit dire à quel rang le placer.
- **Le paiement mobile et le guichet** : ils sont dans le plan de parité (frais et paiements, « bientôt »). Le Cameroun montre qu'ils décident d'une vente en Afrique.
- **L'IA activée école par école** confirme l'interrupteur décidé avec D2 (QJE-16).
- **Le supérieur** reste un espace que Go4School ne couvre pas : c'est là que Planner est seul aujourd'hui, face à ce concurrent.

## 9. Questions au chef

| N° | Question | Proposition |
|---|---|---|
| 1 | Faut-il ajouter Go4School à l'étude des concurrents (`01-concurrents.md`) et au comparatif avec OpenEduCat ? | oui, une ligne dans `01-concurrents.md`, avec le lien vers cette étude ; le coordinateur l'inscrit |
| 2 | Faut-il essayer le produit (compte de démonstration ou démonstration commerciale) ? | non pour l'instant : il faudrait se présenter comme une école, ce qui serait trompeur. Seulement avec ton accord, sous notre vrai nom |
| 3 | L'étude EP-18 doit-elle comparer le hors ligne de Planner à ce que Go4School annonce (appel, présences, transport) ? | oui, comme repère du marché, sans en faire une promesse |

## 10. Limites

- Une seule visite, le 21 novembre 2026 ; le site peut changer.
- Aucune promesse sur le produit n'a pu être vérifiée dans un code ou dans l'application.
- Sur téléphone, les temps d'affichage de Lighthouse sont surestimés (scripts reçus sans compression, § 1) ; les poids réels viennent de la mesure sur ordinateur, et le travail du processeur comme le nombre de requêtes ne dépendent pas de la compression.
- Les tiers ont été relevés sur une visite sans choix sur le bandeau de cookies ; ce qui se passe après « Accepter » ou « Refuser » n'a pas été mesuré.
- Les captures et les rapports de mesure restent hors du dépôt, dans le dossier temporaire de la session.
