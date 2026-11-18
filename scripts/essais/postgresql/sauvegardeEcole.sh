#!/usr/bin/env bash
# Essai PostgreSQL (Q-30), critère 8 : sauvegarde et restauration d'UNE école à une heure donnée,
# chiffrée à clé publique (R-6), sans toucher l'autre école de la même instance.
# Le journal (WAL) est commun à l'instance : on rejoue une copie de l'instance jusqu'à l'heure voulue,
# on en extrait l'école, chiffrée, et on la remet en place seule.
# Prérequis : conteneur essai_pg_test (port 5433) avec la base fictive essai_ecole (convertir.mjs).
# Lancement (Git Bash) : bash scripts/essais/postgresql/sauvegardeEcole.sh <dossier de travail jetable>
# Jamais fusionné : banc jetable de la branche etude/essai-postgresql. Clé d'essai, jamais la clé de production.
set -euo pipefail
export MSYS_NO_PATHCONV=1
TRAVAIL="$1"; mkdir -p "$TRAVAIL"
# Chemin court : le canal de l'agent gpg refuse un chemin trop long (constaté sous Git Bash)
export GNUPGHOME=/tmp/gpg-essai; mkdir -p "$GNUPGHOME"; chmod 700 "$GNUPGHOME"
C=essai_pg_pitr
ms() { node -e "console.log(Date.now())"; }
q() { docker exec -u postgres "$C" psql -qAt -p "${2:-5432}" -d "${3:-postgres}" -c "$1"; }

# Clé d'essai (sans phrase secrète, jetable), comme la paire à clé publique de R-6
gpg --list-keys essai@exemple.test >/dev/null 2>&1 || \
  gpg --batch --quiet --pinentry-mode loopback --passphrase '' --quick-gen-key "essai-planner <essai@exemple.test>" default default never

# 1. Instance avec archivage du journal, deux écoles copiées de la base fictive
docker rm -f "$C" >/dev/null 2>&1 || true
docker run -d --name "$C" -e POSTGRES_PASSWORD=test_root postgres:18 \
  -c wal_level=replica -c archive_mode=on -c archive_timeout=5 \
  -c "archive_command=test ! -f /archive/%f && cp %p /archive/%f" >/dev/null
docker exec "$C" sh -c "mkdir -p /archive /pitr && chown postgres /archive /pitr"
until docker exec "$C" pg_isready -U postgres -q 2>/dev/null; do sleep 1; done; sleep 2
docker exec essai_pg_test pg_dump -U postgres -Fc essai_ecole > "$TRAVAIL/ecole.dump"
for b in ecole_a ecole_b; do
  q "CREATE DATABASE $b"
  docker exec -i -u postgres "$C" pg_restore -d "$b" --no-owner < "$TRAVAIL/ecole.dump"
done

# 2. Sauvegarde de base (la nuit), puis la journée continue
docker exec -u postgres "$C" pg_basebackup -D /pitr/base -X stream
q "CREATE TABLE marqueur (t text)" 5432 ecole_a; q "INSERT INTO marqueur VALUES ('avant')" 5432 ecole_a
q "SELECT pg_switch_wal()" >/dev/null; sleep 2
HEURE=$(q "SELECT now()::timestamptz(0)"); sleep 2
# Après l'heure voulue : l'école A continue de travailler, l'école B subit un incident
q "INSERT INTO marqueur VALUES ('apres')" 5432 ecole_a
q 'DELETE FROM "Presences"; DELETE FROM "Appartenir"; UPDATE "Users" SET actif = false' 5432 ecole_b
q "SELECT pg_switch_wal()" >/dev/null; sleep 7

# 3. Restauration de B seule, à l'heure voulue
DEBUT=$(ms)
docker exec -u postgres "$C" sh -c "cp -r /pitr/base /pitr/restore && chmod 700 /pitr/restore && touch /pitr/restore/recovery.signal \
  && printf \"restore_command = 'cp /archive/%%f %%p'\nrecovery_target_time = '$HEURE'\nrecovery_target_action = 'promote'\nport = 5499\narchive_mode = off\n\" >> /pitr/restore/postgresql.auto.conf \
  && pg_ctl -D /pitr/restore -l /tmp/restore.log -w start >/dev/null"
until [ "$(q 'SELECT pg_is_in_recovery()' 5499)" = "f" ]; do sleep 1; done
docker exec -u postgres "$C" pg_dump -p 5499 -Fc ecole_b | gpg --batch --yes --quiet --encrypt -r essai@exemple.test -o "$TRAVAIL/ecole_b.dump.gpg"
docker exec -u postgres "$C" pg_ctl -D /pitr/restore -w stop >/dev/null
q "DROP DATABASE ecole_b WITH (FORCE)"; q "CREATE DATABASE ecole_b"
gpg --batch --quiet --decrypt "$TRAVAIL/ecole_b.dump.gpg" | docker exec -i -u postgres "$C" pg_restore -d ecole_b --no-owner
FIN=$(ms)

# 4. Contrôles
echo "{"
echo "  \"heure_visee\": \"$HEURE\","
echo "  \"duree_restauration_s\": $(node -e "console.log((($FIN-$DEBUT)/1000).toFixed(1))"),"
echo "  \"taille_chiffree_octets\": $(stat -c %s "$TRAVAIL/ecole_b.dump.gpg"),"
echo "  \"ecole_b_comptes_actifs\": $(q 'SELECT COUNT(*) FROM "Users" WHERE actif' 5432 ecole_b),"
echo "  \"ecole_b_appartenances\": $(q 'SELECT COUNT(*) FROM "Appartenir"' 5432 ecole_b),"
echo "  \"ecole_a_marqueurs\": \"$(q "SELECT string_agg(t, ',' ORDER BY t) FROM marqueur" 5432 ecole_a)\""
echo "}"
