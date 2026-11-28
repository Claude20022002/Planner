/**
 * Appels de l'API des réglages du moteur (/api/moteur, ADM-02a), pour la page « Configuration ».
 * Passe par `request` d'api.js, qui ne grossit pas (§ 5 du README du plan).
 */
import { request } from '../../services/api';

const MOTEUR = '/moteur';

/** Les cinq réglages, la date du jour à l'école et la version courante (base). */
export const lireReglages = () => request(`${MOTEUR}/reglages`);

/** Aperçu à blanc d'un brouillon : rien n'est écrit. */
export const demanderApercu = (corps) => request(`${MOTEUR}/versions/apercu`, { method: 'POST', body: corps });

/** Crée et applique le brouillon en une requête, avec la base lue (409 VERSION_DEPASSEE sinon). */
export const appliquerBrouillon = (corps) => request(`${MOTEUR}/versions`, { method: 'POST', body: { ...corps, appliquer: true } });

/** Historique allégé (100 dernières versions). */
export const lireVersions = () => request(`${MOTEUR}/versions`);

/** Détail d'une version. */
export const lireVersion = (id) => request(`${MOTEUR}/versions/${id}`);

/** Annule une version appliquée (crée son inverse). */
export const annulerVersion = (id) => request(`${MOTEUR}/versions/${id}/annuler`, { method: 'POST' });

/** Abandonne un brouillon. */
export const abandonnerVersion = (id) => request(`${MOTEUR}/versions/${id}/abandonner`, { method: 'POST' });
