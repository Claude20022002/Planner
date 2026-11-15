#!/bin/bash
# Arrêt du seul projet de mesure, y compris ses conteneurs ponctuels ; aucun prune.
set -euo pipefail
liste=$(docker ps -q --no-trunc --filter label=com.docker.compose.project=planner-mesure-pla06)
if [[ -n "$liste" ]]; then
  mapfile -t conteneurs <<< "$liste"
  docker stop --time 5 "${conteneurs[@]}"
fi
