#!/usr/bin/env bash
# Tests de deployer.sh (lot ME-0b) sur un faux Docker : vérification des versions, refus avant tout
# changement, mise en place des images, historique et retour. Lancé par la CI (job « Scripts
# d'exploitation ») et en local : bash deploy/vps/tests/tester-deployer.sh
set -uo pipefail

ICI="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BAC="$(mktemp -d)"
trap 'rm -rf "$BAC"' EXIT
COMPLET=0123456789abcdef0123456789abcdef01234567
COURT=0123456

# Faux docker : « pull » échoue pour les images de FAUX_ABSENTES ; « image inspect -f » rend
# FAUX_REVISION (étiquette revision) ou FAUX_SOURCE_<nom> (étiquette planner.source) ; chaque
# appel est noté dans $BAC/docker.log
mkdir -p "$BAC/bin"
cat > "$BAC/bin/docker" <<'EOF'
#!/usr/bin/env bash
echo "$*" >> "$BAC/docker.log"
case "$1 $2" in
    "pull -q") [[ " ${FAUX_ABSENTES:-} " == *" $3 "* ]] && exit 1; exit 0 ;;
    "exec hestim_mysql")
        case "${FAUX_DUMP:-ok}" in
            fail) echo "mysqldump: error" >&2; exit 1 ;;
            vide) exit 0 ;;
            *) printf '%s\n' '-- dump de test'; exit 0 ;;
        esac ;;
    "image inspect")
        [ "$3" = "-f" ] || exit 0
        image="$5"
        case "$4" in
            *revision*) echo "${FAUX_REVISION:-<no value>}" ;;
            *planner.source*) [[ "$image" == *":latest" ]] && echo "${FAUX_SOURCE_ACTUELLE:-<no value>}" || echo "${FAUX_SOURCE_NOUVELLE:-<no value>}" ;;
        esac ;;
    *) exit 0 ;;
esac
EOF
chmod +x "$BAC/bin/docker"
# Faux gpg : écrit l'entrée standard dans le fichier -o. FAUX_GPG=fail le fait échouer.
cat > "$BAC/bin/gpg" <<'EOF'
#!/usr/bin/env bash
echo "$*" >> "$BAC/gpg.log"
[ "${FAUX_GPG:-ok}" = fail ] && exit 1
sortie=""
precedent=""
for arg in "$@"; do
    if [ "$precedent" = "-o" ]; then sortie="$arg"; fi
    precedent="$arg"
done
[ -n "$sortie" ] || exit 1
cat > "$sortie"
EOF
chmod +x "$BAC/bin/gpg"
export PATH="$BAC/bin:$PATH" BAC

export REGISTRE=registre.test HESTIM="$BAC/hestim" SAUVEGARDES_DIR="$BAC/sauvegardes"
mkdir -p "$SAUVEGARDES_DIR"
# shellcheck source-path=SCRIPTDIR/.. source=deployer.sh
. "$ICI/../deployer.sh"
# deployer.sh pose « set -Eeuo pipefail » : les tests gardent la main sur les échecs attendus,
# et rejouent principal dans un sous-shell avec ses vraies options
set +eE
en_vrai() { ( set -Eeuo pipefail; principal "$@" ); }

echecs=0
verifier() { # verifier "<nom>" <commande…> : la commande doit réussir
    local nom="$1"; shift
    if "$@" >/dev/null 2>&1; then echo "ok      $nom"; else echo "ÉCHEC   $nom"; echecs=$((echecs + 1)); fi
}
refuser() { # refuser "<nom>" <commande…> : la commande doit échouer
    local nom="$1"; shift
    if "$@" >/dev/null 2>&1; then echo "ÉCHEC   $nom (acceptée)"; echecs=$((echecs + 1)); else echo "ok      $nom"; fi
}
egal() { [ "$1" = "$2" ]; }

# Format du commit demandé
verifier "commit court accepté" commit_valide "$COURT"
verifier "commit complet accepté" commit_valide "$COMPLET"
refuser "8 caractères refusés" commit_valide 01234567
refuser "majuscules refusées" commit_valide 0123ABC
refuser "commande glissée refusée" commit_valide "0123456;rm"
refuser "vide refusé" commit_valide ""

# Images tirées et vérifiées
export FAUX_REVISION="$COMPLET"
verifier "les quatre images du bon commit : acceptées" egal "$(tirer_et_verifier "$COURT")" "$COMPLET"
FAUX_ABSENTES="registre.test/hestim-solver:$COURT" refuser "une image absente : arrêt" tirer_et_verifier "$COURT"
FAUX_REVISION=fedcba9876543210fedcba9876543210fedcba98 refuser "image d'un autre commit : arrêt" tirer_et_verifier "$COURT"
FAUX_REVISION="<no value>" refuser "image sans étiquette de commit : arrêt" tirer_et_verifier "$COURT"
FAUX_REVISION="$COURT" refuser "étiquette de commit tronquée : arrêt" tirer_et_verifier "$COURT"

# Aucun changement avant la vérification : un essai et un refus ne font ni tag ni compose
: > "$BAC/docker.log"
FAUX_REVISION=fedcba9876543210fedcba9876543210fedcba98 en_vrai "$COURT" >/dev/null 2>&1
refuser "refus : aucun tag ni redémarrage" grep -qE "^(tag|compose|exec|create)" "$BAC/docker.log"
: > "$BAC/docker.log"
en_vrai --essai "$COURT" >/dev/null 2>&1
refuser "essai : aucun tag ni redémarrage" grep -qE "^(tag|compose|exec|create)" "$BAC/docker.log"

# Mise en place : ancienne image gardée, nouvelle au nom local ; solveur gardé si ses sources n'ont pas changé
: > "$BAC/docker.log"
FAUX_SOURCE_ACTUELLE=arbre1 FAUX_SOURCE_NOUVELLE=arbre1 mettre_en_place "$COURT" 20261029-120000 >/dev/null
verifier "serveur : ancienne image gardée" grep -q "^tag claude20022002/hestim-backend:latest claude20022002/hestim-backend:avant-20261029-120000$" "$BAC/docker.log"
verifier "serveur : nouvelle image en place" grep -q "^tag registre.test/hestim-backend:$COURT claude20022002/hestim-backend:latest$" "$BAC/docker.log"
refuser "solveur inchangé : pas remplacé" grep -q "^tag registre.test/hestim-solver" "$BAC/docker.log"
: > "$BAC/docker.log"
FAUX_SOURCE_ACTUELLE=arbre1 FAUX_SOURCE_NOUVELLE=arbre2 mettre_en_place "$COURT" 20261029-120000 >/dev/null
verifier "solveur modifié : remplacé" grep -q "^tag registre.test/hestim-solver:$COURT claude20022002/hestim-solver:latest$" "$BAC/docker.log"

# Historique et retour
refuser "retour sans historique : refusé" version_precedente
noter_version aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 20261029-100000
refuser "retour avec une seule version : refusé" version_precedente
noter_version bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb 20261029-110000
verifier "retour : la version d'avant" egal "$(version_precedente)" aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

# Version annoncée en marche
verifier "même commit : accepté" verifier_version serveur "$COMPLET" "$COMPLET"
refuser "autre commit annoncé : refusé" verifier_version serveur inconnue "$COMPLET"

# Sauvegarde avant mise en ligne (REL-01, REL-03) : un dump raté n'écrit pas d'images.
# Phrase et clé factices : le dump doit quand même partir sur la phrase, pas sur la clé.
mkdir -p "$BAC/reglages"
printf 'phrase-de-test\n' > "$BAC/reglages/phrase"
printf 'cle-publique-de-test\n' > "$BAC/reglages/publique"
ecrire_conf() { printf 'JOURS=%s\nPHRASE=%s\nCLE_PUBLIQUE=%s\n' "$1" "$2" "$3" > "$BAC/reglages/conf"; }
ecrire_conf 14 "$BAC/reglages/phrase" "$BAC/reglages/publique"
export CONF="$BAC/reglages/conf"
aucun_dump() { shopt -s nullglob; set -- "$SAUVEGARDES_DIR"/*; [ $# -eq 0 ]; }
pas_de_hestim() { shopt -s nullglob; set -- "$SAUVEGARDES_DIR"/hestim-*; [ $# -eq 0 ]; }
: > "$BAC/docker.log"
rm -f "$SAUVEGARDES_DIR"/*
FAUX_DUMP=fail refuser "mysqldump échoué : déploiement arrêté" en_vrai "$COURT"
verifier "mysqldump échoué : aucun dump laissé" aucun_dump
refuser "mysqldump échoué : images pas mises en place" grep -qE "^tag " "$BAC/docker.log"
: > "$BAC/docker.log"
rm -f "$SAUVEGARDES_DIR"/*
FAUX_DUMP=vide refuser "dump vide : déploiement arrêté" en_vrai "$COURT"
verifier "dump vide : aucun dump laissé" aucun_dump
unset FAUX_DUMP
: > "$BAC/gpg.log"
chemin="$(sauvegarder_base 20261115-120000)"
verifier "dump réussi : chemin renvoyé" egal "$chemin" "$SAUVEGARDES_DIR/hestim-20261115-120000.sql.gz.gpg"
verifier "dump réussi : gzip lisible à travers le faux gpg" gzip -t "$chemin"
# Linux (la CI) stocke le mode. Git Bash sur Windows rend souvent 644 : le système de fichiers ne garde pas 600.
mode_600() {
    local droits
    droits="$(stat -c %a "$1")"
    [ "$droits" = 600 ] && return 0
    case "$(uname -s)" in
        MINGW*|MSYS*|CYGWIN*) return 0 ;;
    esac
    echo "droits obtenus : $droits" >&2
    return 1
}
verifier "dump réussi : droits 600" mode_600 "$chemin"
refuser "dump réussi : pas de clair à côté" test -e "$SAUVEGARDES_DIR/hestim-20261115-120000.sql.gz"
verifier "clé publique présente : quand même la phrase" grep -q -- '--symmetric' "$BAC/gpg.log"
refuser "clé publique présente : pas --recipient-file" grep -q -- '--recipient-file' "$BAC/gpg.log"

# gpg en échec
rm -f "$SAUVEGARDES_DIR"/*
: > "$BAC/docker.log"
FAUX_GPG=fail refuser "gpg échoué : déploiement arrêté" en_vrai "$COURT"
verifier "gpg échoué : aucun dump laissé" aucun_dump
unset FAUX_GPG

# Sans phrase, même avec une clé publique : arrêt, et le banc continue (return, pas exit)
unset PHRASE
printf 'JOURS=14\nCLE_PUBLIQUE=%s\n' "$BAC/reglages/publique" > "$BAC/reglages/conf"
rm -f "$SAUVEGARDES_DIR"/*
refuser "sans PHRASE : déploiement arrêté" en_vrai "$COURT"
verifier "sans PHRASE : aucun dump laissé" pas_de_hestim
ecrire_conf 14 "$BAC/reglages/phrase" "$BAC/reglages/publique"

# Purge : 15 jours partent, 1 jour reste, quotidien/ et studylib- ne sont pas touchés
vieux_gpg="$SAUVEGARDES_DIR/hestim-ancien.sql.gz.gpg"
vieux_clair="$SAUVEGARDES_DIR/hestim-ancien.sql.gz"
recent="$SAUVEGARDES_DIR/hestim-recent.sql.gz.gpg"
mkdir -p "$SAUVEGARDES_DIR/quotidien"
quotidien="$SAUVEGARDES_DIR/quotidien/hestim-ancien.sql.gz.gpg"
studylib="$SAUVEGARDES_DIR/studylib-ancien.sql.gz"
printf x > "$vieux_gpg"
printf x > "$vieux_clair"
printf x > "$recent"
printf x > "$quotidien"
printf x > "$studylib"
touch -d "15 days ago" "$vieux_gpg" "$vieux_clair" "$quotidien" "$studylib"
touch -d "1 day ago" "$recent"
sauvegarder_base 20261118-120000 >/dev/null
verifier "purge : vieux chiffré effacé" test ! -e "$vieux_gpg"
verifier "purge : vieux clair effacé" test ! -e "$vieux_clair"
verifier "purge : récent gardé" test -e "$recent"
verifier "purge : quotidien gardé" test -e "$quotidien"
verifier "purge : studylib gardé" test -e "$studylib"

echo
if [ "$echecs" -eq 0 ]; then echo "deployer.sh : tous les tests passent"; else echo "deployer.sh : $echecs échec(s)"; exit 1; fi
