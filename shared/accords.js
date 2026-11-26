/**
 * Accords des messages du serveur (UIX-05, règles du plan § 5) : un nombre s'écrit avec sa forme,
 * jamais « 3 séance(s) ». `accorder(1, "séance", "séances")` rend « 1 séance », et 3 rend « 3
 * séances ». Zéro prend le singulier, comme l'usage français.
 */

/**
 * « 1 séance », « 3 séances » : le nombre, puis la forme qui lui convient.
 * @param {number} nombre - le compte à écrire
 * @param {string} singulier - la forme pour zéro et un
 * @param {string} pluriel - la forme au-delà d'un
 * @returns {string}
 */
export const accorder = (nombre, singulier, pluriel) =>
    `${nombre} ${Number(nombre) > 1 ? pluriel : singulier}`;
