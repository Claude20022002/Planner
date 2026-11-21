/** Serialize simulation attempts and solution viewing in the current establishment. */
import { JeuEtatDefi, JeuProgression } from '../../models/index.js';

/** Describe assistance without relabeling a success recorded before solution viewing. */
export const vueEtatDefi = (etat, reussite) => ({
    echecs: etat?.echecs ?? 0,
    solution_vue: Boolean(etat?.solution_vue_le),
    sans_points: reussite ? Boolean(reussite.avec_solution) : Boolean(etat?.solution_vue_le),
});

/** Both write paths must hold this same row lock until their transaction commits. */
export async function avecEtatDefi(user, jeu, defi, operation) {
    const where = { id_user: user.id_user, code_jeu: jeu.code, id_defi: defi.id };
    await JeuEtatDefi.findOrCreate({ where });
    return JeuEtatDefi.sequelize.transaction(async (transaction) => {
        const etat = await JeuEtatDefi.findOne({ where, transaction, lock: transaction.LOCK.UPDATE });
        const reussite = await JeuProgression.findOne({ where, transaction });
        return operation({ etat, reussite, transaction });
    });
}

/** Read attempt states separately from successes so viewing never completes a challenge. */
export async function etatsDuJeu(user, jeu, reussites) {
    if (jeu.type !== 'simulation') return [];
    const lignes = await JeuEtatDefi.findAll({ where: { id_user: user.id_user, code_jeu: jeu.code } });
    return lignes.filter((l) => jeu.defis.some((d) => d.id === l.id_defi)).map((l) => ({
        id: l.id_defi, ...vueEtatDefi(l, reussites.find((r) => r.id_defi === l.id_defi)),
    }));
}
