/** Régressions du protocole serveur, sans Docker ni accès à un serveur. */
import { test } from "node:test";
import assert from "node:assert/strict";
import { MIO, PROJET, verifierGroupe, verifierMemoire, verifierPhotos, raisonsInvalidite, verifierCompose } from "../lib/protection.mjs";
import { surveiller } from "../lib/local.mjs";
import { optionsSerie } from "../lib/serie-locale.mjs";
const etat = () => [{ id: "fictif", debut: "date-fictive", etat: "running", redemarrages: 0, oom: false, sante: "healthy" }];

test("hôte non borné ou swap autorisé : refus", () => {
    const g = { memoire: String(512 * MIO), echange: "0", cpu: "50000 100000" };
    assert.doesNotThrow(() => verifierGroupe(g));
    for (const m of [{ memoire: "max" }, { memoire: String(513 * MIO) }, { echange: "max" }, { cpu: "max 100000" }, { cpu: "100000 100000" }]) assert.throws(() => verifierGroupe({ ...g, ...m }));
});
test("mémoire sous 1 Gio, échange ou relevé incomplet : arrêt", () => {
    const v = "pswpin 0\npswpout 0";
    assert.equal(verifierMemoire("MemAvailable: 1048576 kB", v, 0).disponible_mio, 1024);
    assert.throws(() => verifierMemoire("MemAvailable: 1048575 kB", v, 0), /sous 1 Gio/);
    assert.throws(() => verifierMemoire("MemAvailable: 2097152 kB", "pswpin 1\npswpout 0", 0), /échange/);
    assert.throws(() => verifierMemoire("", v), /incomplet/);
});
test("photos : identité, démarrage, santé, OOM ou absence changés : refus", () => {
    assert.doesNotThrow(() => verifierPhotos(etat(), etat()));
    for (const m of [{ id: "autre" }, { debut: "autre" }, { sante: "unhealthy" }, { etat: "exited" }, { redemarrages: 1 }, { oom: true }]) assert.throws(() => verifierPhotos(etat(), [{ ...etat()[0], ...m }]));
    assert.throws(() => verifierPhotos(etat(), [])); assert.throws(() => verifierPhotos([], []));
});
test("observation en échec : arrêt unique et surveillance terminée", async () => {
    let controles = 0, arrets = 0, signaler;
    const incident = new Promise((r) => { signaler = r; });
    const stopper = surveiller({
        controle: async () => { controles++; throw new Error("lecture Docker impossible"); },
        arreter: async () => { arrets++; signaler(); }, delai: 1,
    });
    await incident; await stopper(); assert.equal(controles, 1); assert.equal(arrets, 1);
});
test("bilan ou relevés incomplets, contrôle manuel absent : invalide", () => {
    const b = { terminee: true, photos_ok: true, temoin_apres: true, code_charge: 0, raisons: [] };
    const c = { valide: true }, r = { valide: true, releves: 1, erreurs: 0 };
    assert.deepEqual(raisonsInvalidite(b, c, r), []);
    for (const x of [{}, { ...b, temoin_apres: false }, { ...b, photos_ok: false }, { ...b, code_charge: 1 }]) assert.ok(raisonsInvalidite(x, c, r).length);
    assert.ok(raisonsInvalidite(b, null, r).length);
    assert.ok(raisonsInvalidite(b, c, { ...r, erreurs: 1 }).length);
});
test("palier 4 Gio ou options de mémoire invalides : refus", () => {
    assert.equal(optionsSerie([]).MESURE_MYSQL_MEMOIRE, "2g");
    assert.equal(optionsSerie(["--mysql-memoire", "1g"]).MESURE_INNODB_POOL, "512M");
    for (const a of [["--mysql-memoire", "4g"], ["--mysql-memoire", "1g", "--innodb", "1g"], ["--reglage", "inconnu"], ["--repos", "NaN"], ["--ecoles-banc", "201"], ["--duree", "NaN"], ["--utilisateurs", "0"], ["--inconnue", "oui"]]) assert.throws(() => optionsSerie(a));
});
const configuration = () => ({
    name: PROJET,
    services: Object.fromEntries(["mysql", "banc", "installer"].map((n) => [n, {
        mem_limit: (n === "mysql" ? 2 : 1) * 1024 ** 3, memswap_limit: (n === "mysql" ? 2 : 1) * 1024 ** 3,
        cpus: 1, labels: { "traefik.enable": "false" }, networks: { default: {} },
        ...(n === "banc" ? { ports: [{ host_ip: "127.0.0.1", published: "5099", target: 5099 }] } : {}),
    }])), networks: { default: { name: PROJET + "_default" } }, volumes: { bases: { name: PROJET + "_bases" } },
});
test("Compose : ports publics, limite contournée et réseau partagé : refus", () => {
    assert.doesNotThrow(() => verifierCompose(configuration()));
    for (const modifier of [
        (c) => { c.services.banc.ports[0].host_ip = "0.0.0.0"; },
        (c) => { c.services.mysql.ports = [{ published: "3399" }]; },
        (c) => { c.services.installer.cpus = 4; },
        (c) => { c.services.banc.mem_limit = 2 * 1024 ** 3; },
        (c) => { c.networks.default.external = true; },
        (c) => { c.services.banc.labels["traefik.enable"] = "true"; },
    ]) { const c = configuration(); modifier(c); assert.throws(() => verifierCompose(c)); }
});

test("un essai réduit ne devient pas une confirmation de capacité après contrôle manuel", () => {
    const b = { essai: true, terminee: true, photos_ok: true, temoin_apres: true, code_charge: 0 };
    assert.ok(raisonsInvalidite(b, { valide: true }, { valide: true, releves: 1, erreurs: 0 }).some((r) => r.includes("essai technique")));
});
