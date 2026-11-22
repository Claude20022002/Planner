/**
 * Choix du serveur d'envoi des courriels, sans effet de bord (QUA-10, EP-13 « aucun envoi caché »).
 * Le serveur doit être nommé par un réglage : EMAIL_SERVICE=gmail, ou SMTP_HOST. Un compte réglé
 * sans serveur ne part plus vers smtp.gmail.com par défaut : la configuration est « incomplète ».
 *
 *   absent     aucun compte (EMAIL_USER, SMTP_USER) : rien ne part, le courriel est journalisé
 *   incomplet  un compte, mais aucun serveur nommé : rien ne part, erreur et échec compté
 *   pret       options à passer à nodemailer.createTransport
 */

/**
 * @param {Record<string, string | undefined>} env variables d'environnement (process.env)
 * @returns {{ etat: "absent" | "incomplet" | "pret", options: object | null, manque: string[] }}
 */
export const configurationCourriel = (env) => {
    if (!env.EMAIL_USER && !env.SMTP_USER) return { etat: "absent", options: null, manque: [] };

    // Gmail choisi explicitement : le réglage nomme la destination
    if (env.EMAIL_SERVICE === "gmail") {
        return { etat: "pret", options: { service: "gmail", auth: { user: env.EMAIL_USER, pass: env.EMAIL_PASSWORD } }, manque: [] };
    }

    if (!env.SMTP_HOST) return { etat: "incomplet", options: null, manque: ["SMTP_HOST"] };

    return {
        etat: "pret",
        options: {
            host: env.SMTP_HOST,
            port: env.SMTP_PORT || 587,
            secure: env.SMTP_SECURE === "true", // true pour 465, false pour les autres ports
            auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
        },
        manque: [],
    };
};

/** Où partent les courriels, en clair, pour le journal (« Gmail », « smtp.exemple.test ») ; null si rien ne part. */
export const destinationCourriel = ({ etat, options }) => (etat !== "pret" ? null : options.service === "gmail" ? "Gmail" : options.host);
