import { configuration as configurationIa } from "../ia/client.js";
import { configurationMedia } from "../studio/iaFournisseurs.js";
import { modeContenuPush } from "../push.js";
import { configurationCourriel, destinationCourriel } from "../../utils/configurationCourriel.js";

/**
 * Résumé des envois sortants, écrit au démarrage du serveur (QUA-10, EP-13, question 8) : une
 * ligne par envoi chez un tiers, et un avertissement par réglage incomplet. L'exploitant voit
 * d'un coup d'œil ce qui sort. Ni clé ni mot de passe : seulement l'hôte de destination.
 * La liste complète, avec les données envoyées : docs/envois-sortants.md. Un envoi ajouté là
 * s'ajoute ici.
 */

const hote = (url) => {
    try {
        return new URL(url).host;
    } catch {
        return "adresse illisible";
    }
};

// « SMTP_HOST manque », « IA_VOIX_URL et IA_VOIX_MODELE manquent »
const manquent = (noms) => `${noms.join(" et ")} ${noms.length > 1 ? "manquent" : "manque"}`;

// Un envoi d'IA : désactivé sans clé ; incomplet si la clé est là sans adresse ou sans modèle
const ligneIa = (nom, { cle, url, modele }, variables, extra = []) => {
    if (!cle) return { texte: `${nom} : désactivée`, avertissements: [] };
    const manque = [...extra, ...(url ? [] : [variables.url]), ...(modele ? [] : [variables.modele])];
    if (manque.length) {
        return { texte: `${nom} : désactivée`, avertissements: [`${nom} : ${variables.cle} est réglée, mais ${manquent(manque)} : rien ne part`] };
    }
    return { texte: `${nom} : ${hote(url)} (modèle ${modele})`, avertissements: [] };
};

/** Les lignes du résumé, lues dans process.env : { lignes, avertissements }. */
export const lignesEnvois = () => {
    const ia = configurationIa();
    const parties = [ligneIa("IA, texte", ia, { cle: "IA_CLE", url: "IA_URL", modele: "IA_MODELE" }, ia.connu ? [] : [`un IA_FOURNISSEUR connu (« ${ia.fournisseur} » ne l'est pas)`])];
    for (const nature of ["image", "voix", "transcription"]) {
        const p = `IA_${nature.toUpperCase()}`;
        parties.push(ligneIa(`IA, ${nature}`, configurationMedia(nature), { cle: `${p}_CLE`, url: `${p}_URL`, modele: `${p}_MODELE` }));
    }

    const courriel = configurationCourriel(process.env);
    parties.push({
        texte: `courriel : ${courriel.etat === "pret" ? destinationCourriel(courriel) : courriel.etat === "absent" ? "désactivé (écrit dans le journal)" : "désactivé"}`,
        avertissements: courriel.etat === "incomplet" ? [`courriel : un compte est réglé, mais ${manquent(courriel.manque)} : rien ne part, chaque courriel échoue`] : [],
    });

    const valeurPush = process.env.PUSH_CONTENU;
    parties.push({
        texte: `push : ${process.env.PUSH_DISABLED === "true" ? "désactivé" : `Expo, texte ${modeContenuPush() === "complet" ? "complet" : "générique"}`}`,
        avertissements: valeurPush && !["complet", "generique"].includes(valeurPush) ? [`push : PUSH_CONTENU « ${valeurPush} » inconnu (complet ou generique) : texte générique`] : [],
    });

    return { lignes: parties.map((p) => p.texte), avertissements: parties.flatMap((p) => p.avertissements) };
};

/** Écrit le résumé dans le journal du serveur. */
export const resumerEnvois = (journal = console) => {
    const { lignes, avertissements } = lignesEnvois();
    journal.log(`--> Envois sortants (docs/envois-sortants.md) :\n${lignes.map((l) => `    ${l}`).join("\n")}`);
    for (const a of avertissements) journal.warn(`⚠️  Envoi mal réglé : ${a}`);
};
