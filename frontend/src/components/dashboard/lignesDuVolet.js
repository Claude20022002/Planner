/**
 * Les lignes de chaque chiffre du tableau de bord (UIX-11, plan § 4.2) : la route qui les lit, ses
 * paramètres pour la période affichée, les colonnes du volet et la page « Tout voir ».
 *
 * Fichier pur (aucun import de services/api.js) : `api` nomme l'objet et la fonction d'appel, que
 * VoletLignes résout. Les blocs comptent leurs chiffres avec les mêmes `lignes`, pour que le volet
 * montre exactement ce que le chiffre compte.
 *
 * `periode` : { debut, fin } (AAAA-MM-JJ), `mois` (AAAA-MM) ou `id_periode`, selon le chiffre.
 * `o` (outils de mise en forme) : { t, nombre, date, heure }, fournis par le volet.
 */

/** Plafond de la liste des séances côté serveur : au-delà, le volet le dit. */
export const PLAFOND_SEANCES = 100;

const nomComplet = (u) => [u?.prenom, u?.nom].filter(Boolean).join(' ') || '-';
const plage = (debut, fin, o) => [o.heure(debut), o.heure(fin)].filter(Boolean).join(' – ');

export const VOLETS = {
  // Bloc C, « Cette semaine »
  occupationSalles: {
    api: ['statistiquesAPI', 'getKPIs'],
    arguments: (p) => [{ date_debut: p.debut, date_fin: p.fin }],
    lignes: (r) => r?.kpis?.taux_occupation_salles?.graphique ?? [],
    colonnes: [
      { cle: 'salle', valeur: (l) => l.nom },
      { cle: 'heures', valeur: (l, o) => o.nombre(l.heures), nombre: true },
      { cle: 'taux', valeur: (l, o) => `${o.nombre(l.taux)} %`, nombre: true },
    ],
    note: 'dixSalles',
    toutVoir: '/statistiques',
  },
  seancesSemaine: {
    api: ['affectationAPI', 'getAll'],
    arguments: (p) => [{ date_from: p.debut, date_to: p.fin, ordre: 'asc', limit: PLAFOND_SEANCES }],
    // Le chiffre (statistiques) ne compte pas les séances annulées : le volet non plus
    lignes: (r) => (r?.data ?? []).filter((a) => a.statut !== 'annule'),
    colonnes: [
      { cle: 'jour', valeur: (l, o) => o.date(l.date_seance) },
      { cle: 'heure', valeur: (l, o) => plage(l.creneau?.heure_debut, l.creneau?.heure_fin, o) },
      { cle: 'enseignement', valeur: (l) => l.cours?.nom_cours || '-' },
      { cle: 'groupe', valeur: (l) => l.groupe?.nom_groupe || '-' },
      { cle: 'salle', valeur: (l) => l.salle?.nom_salle || '-' },
    ],
    plafond: PLAFOND_SEANCES,
    toutVoir: '/gestion/emplois-du-temps',
  },
  enseignantsSemaine: {
    api: ['statistiquesAPI', 'getChargeEnseignants'],
    arguments: (p) => [{ date_debut: p.debut, date_fin: p.fin }],
    lignes: (r) => r?.charge_enseignants ?? [],
    colonnes: [
      { cle: 'enseignant', valeur: (l) => nomComplet(l) },
      { cle: 'heures', valeur: (l, o) => o.nombre(l.total_heures), nombre: true },
      { cle: 'enseignements', valeur: (l, o) => o.nombre(l.nombre_cours_differents), nombre: true },
    ],
    toutVoir: '/statistiques',
  },

  // Bloc D, « Suivi »
  enseignementsEnRetard: {
    api: ['suiviAPI', 'modules'],
    arguments: (p) => [{ id_periode: p.id_periode }],
    lignes: (r) => (Array.isArray(r) ? r.filter((l) => l.en_retard) : []),
    colonnes: [
      // Avec ses groupes : deux TD d'un même module se distinguent
      { cle: 'enseignement', valeur: (l) => [l.module?.nom_cours, l.type, (l.groupes ?? []).join(', ')].filter(Boolean).join(' · ') },
      { cle: 'filiere', valeur: (l) => l.module?.filiere || '-' },
      { cle: 'attendues', valeur: (l, o) => o.nombre(l.heures_attendues), nombre: true },
      { cle: 'realisees', valeur: (l, o) => o.nombre(l.heures_realisees), nombre: true },
      { cle: 'reste', valeur: (l, o) => o.nombre(l.reste), nombre: true },
    ],
    toutVoir: '/gestion/suivi',
  },
  heuresMois: {
    api: ['suiviAPI', 'enseignants'],
    arguments: (p) => [p.mois],
    lignes: (r) => (Array.isArray(r) ? r : []),
    colonnes: [
      { cle: 'enseignant', valeur: (l) => nomComplet(l) },
      { cle: 'realisees', valeur: (l, o) => o.nombre(l.heures_realisees), nombre: true },
      { cle: 'aVerifier', valeur: (l, o) => o.nombre(l.heures_a_verifier), nombre: true },
      { cle: 'statut', valeur: (l, o) => o.t(`tableauDeBord.statutEnseignant.${l.statut}`, { defaultValue: l.statut ?? '-' }) },
    ],
    toutVoir: '/gestion/suivi?onglet=heures',
  },

  // Bloc E, « À venir » : une épreuve annulée n'est plus à venir
  examens: {
    api: ['examenAPI', 'getAll'],
    arguments: (p) => [{ date_from: p.debut, date_to: p.fin }],
    lignes: (r) => (Array.isArray(r) ? r.filter((e) => e.statut !== 'annulee') : []),
    colonnes: [
      { cle: 'jour', valeur: (l, o) => o.date(l.date) },
      { cle: 'heure', valeur: (l, o) => plage(l.heure_debut, l.heure_fin, o) },
      { cle: 'epreuve', valeur: (l) => l.titre || l.cours?.nom_cours || '-' },
      { cle: 'salles', valeur: (l) => (l.salles ?? []).map((s) => s.salle?.nom_salle).filter(Boolean).join(', ') || '-' },
    ],
    toutVoir: '/gestion/examens',
  },

  // Bloc F, « Usage du mois » : pas de lignes, le détail des compteurs (écart accepté, réponse 1)
  usage: {
    api: ['statistiquesAPI', 'usage'],
    arguments: (p) => [p.mois],
    lignes: (r) =>
      r
        ? [
            { compteur: 'actifs', valeur: r.comptes_actifs?.total },
            { compteur: 'etudiants', valeur: r.comptes_actifs?.etudiant },
            { compteur: 'enseignants', valeur: r.comptes_actifs?.enseignant },
            { compteur: 'administration', valeur: r.comptes_actifs?.admin },
            { compteur: 'appels', valeur: r.appels_valides },
            { compteur: 'parties', valeur: r.quiz?.parties },
            { compteur: 'joueurs', valeur: r.quiz?.joueurs },
            { compteur: 'devoirs', valeur: r.devoirs_rendus },
          ]
        : [],
    colonnes: [
      { cle: 'compteur', valeur: (l, o) => o.t(`tableauDeBord.usage.${l.compteur}`) },
      { cle: 'valeur', valeur: (l, o) => o.nombre(l.valeur), nombre: true },
    ],
    note: 'definitionActif',
    toutVoir: '/gestion/suivi',
  },
};

/** Les identifiants des chiffres qui ouvrent un volet. */
export const CHIFFRES = Object.keys(VOLETS);
