/**
 * Entrée de compatibilité : une série se lance désormais sur le serveur avec lancer.sh.
 * Le contrôle cgroup du pilote empêche une exécution directe non bornée.
 */
process.argv.splice(2, 0, "serie");
await import("./piloter.mjs");
