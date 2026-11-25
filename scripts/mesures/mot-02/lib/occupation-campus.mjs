// Vérifie les contraintes du témoin sur les feuilles, les enseignants et les deux campus.
/** Contrôle les durées, les occupations, les déplacements et les fenêtres du problème fourni. */
export function verifierOccupation(probleme, temoin) {
    const creneaux = new Map(probleme.creneaux.map((c) => [c.id, c]));
    const salles = new Map(probleme.salles.map((s) => [s.id, s]));
    const lecons = new Map(probleme.lecons.map((l) => [l.id, l]));
    const absences = new Set((probleme.voeux ?? []).filter((v) => v.type === 'INDISPONIBLE')
        .map((v) => v.enseignantId + ':' + v.creneauId));
    const journees = new Map();
    for (const { id, creneauId, salleId } of temoin) {
        const l = lecons.get(id), debut = creneaux.get(creneauId), salle = salles.get(salleId);
        const fin = l.longueur === 2 ? creneaux.get(debut.suivantId) : debut;
        if (!fin || (l.longueur === 2 && (fin.jour !== debut.jour || fin.debut !== debut.fin
            || fin.fin !== debut.finAvecSuivant))) throw new Error('Séance sans suite');
        if (salle.capacite < l.effectif || (l.typeSalleRequis && salle.type !== l.typeSalleRequis)
            || !l.equipementsRequis.every((e) => salle.equipements.includes(e))
            || debut.regime !== l.regime) throw new Error('Ressource incompatible');
        for (const enseignant of l.enseignants) {
            if ([debut, fin].some((c) => absences.has(enseignant + ':' + c.id))) throw new Error('Enseignant indisponible');
        }
        const feuilles = l.feuilles?.length ? l.feuilles : l.groupesDirects;
        const ressources = ['S:' + salleId, ...feuilles.map((g) => 'G:' + g), ...l.enseignants.map((e) => 'E:' + e)];
        for (const ressource of ressources) {
            const cle = ressource + ':' + debut.jour;
            if (!journees.has(cle)) journees.set(cle, []);
            journees.get(cle).push({ debut: debut.debut, fin: fin.fin, campus: salle.campusId });
        }
    }
    const config = probleme.parametres;
    for (const [cle, journee] of journees) {
        journee.sort((a, b) => a.debut - b.debut);
        let duree = 0;
        for (const [i, seance] of journee.entries()) {
            duree += seance.fin - seance.debut;
            if (!i) continue;
            const avant = journee[i - 1];
            if (seance.debut < avant.fin) throw new Error('Collision dans le témoin');
            if (avant.campus !== seance.campus) {
                const paire = [avant.campus, seance.campus].sort((a, b) => a - b).join('-');
                const minutes = config.trajets?.[paire] ?? config.trajetDefautMinutes;
                if (seance.debut - avant.fin < minutes) throw new Error('Trajet entre campus trop court');
            }
        }
        const plafond = cle.startsWith('G:') ? config.maxMinutesJourGroupe
            : cle.startsWith('E:') ? config.maxMinutesJourEnseignant : Infinity;
        if (duree > plafond) throw new Error('Charge quotidienne dépassée');
    }
}
