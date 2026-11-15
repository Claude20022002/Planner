#!/bin/bash
# Lanceur du pilote hôte PLA-06 : service transitoire borné ; seul le chef l'exécute sur le serveur.
set -euo pipefail
cd -- "$(dirname -- "$(readlink -f -- "$0")")"
test "$(id -u)" -ne 0 || { echo "Utiliser le compte habituel, pas root." >&2; exit 1; }
command -v node >/dev/null
command -v docker >/dev/null
command -v systemd-run >/dev/null
# Le répertoire est passé comme argument, jamais interpolé dans une commande de shell systemd.
# ExecStopPost appartient au service : même si son groupe atteint sa limite mémoire, systemd
# arrête les conteneurs du projet ; aucun service extérieur n'est ciblé.
exec sudo systemd-run --unit=planner-mesure-pla06-hote --collect --wait --pty \
  --uid="$(id -u)" --gid="$(id -g)" --working-directory="$PWD" \
  -p CPUQuota=50% -p MemoryMax=512M -p MemorySwapMax=0 -p KillMode=control-group \
  -p "ExecStopPost=/bin/bash \"$PWD/arreter.sh\"" \
  "$(command -v node)" "$PWD/piloter.mjs" "$@"
