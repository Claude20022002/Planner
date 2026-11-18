package ma.hestim.solver;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

import ai.timefold.solver.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import ai.timefold.solver.core.api.solver.SolutionManager;
import ai.timefold.solver.core.api.solver.SolverFactory;
import ai.timefold.solver.core.config.solver.SolverConfig;
import ma.hestim.solver.contraintes.ContraintesEmploiDuTemps;
import ma.hestim.solver.contraintes.PreferencesEmploiDuTemps;
import ma.hestim.solver.domain.EmploiDuTemps;
import ma.hestim.solver.domain.Lecon;

/**
 * Non-régression de MOT-13b : sur le problème de ResolutionTest, trois affectations fixées
 * donnent le même score dur et souple qu'avant le passage à HardMediumSoftScore et le découpage
 * des règles. Les valeurs ont été relevées le 15 novembre sur `main` après MOT-12 (38f2f90),
 * avant toute modification du solveur : -1hard/-51soft, -9hard/-46soft et -9hard/-49soft.
 */
public class ReferenceScoreTest {

    /**
     * Pose chaque leçon non épinglée sur une valeur de son domaine, choisie par une formule fixe :
     * variante 0 étalée sur la semaine, 1 et 2 serrées sur les premiers jours.
     */
    public static EmploiDuTemps affectationFixee(int variante) {
        EmploiDuTemps p = ResolutionTest.probleme();
        p.preparerValeursPossibles();
        int i = 0;
        for (Lecon l : p.getLecons()) {
            if (l.isEpinglee()) {
                continue;
            }
            int creneau = switch (variante) {
                case 0 -> (i * 3) % l.getCreneauxPossibles().size();
                case 1 -> i % 4;
                default -> (i * 2 + 1) % 6;
            };
            l.setCreneau(l.getCreneauxPossibles().get(creneau));
            l.setSalle(l.getSallesPossibles().get((i + variante) % l.getSallesPossibles().size()));
            i++;
        }
        return p;
    }

    /** Score d'une solution posée, sans calcul. */
    public static HardMediumSoftScore score(EmploiDuTemps solution) {
        SolverConfig config = new SolverConfig()
                .withSolutionClass(EmploiDuTemps.class)
                .withEntityClasses(Lecon.class)
                .withConstraintProviderClass(ContraintesEmploiDuTemps.class);
        return SolutionManager.<EmploiDuTemps, HardMediumSoftScore>create(SolverFactory.create(config)).update(solution);
    }

    @Test
    void lesTroisAffectationsGardentLeurScore() {
        assertThat(score(affectationFixee(0))).isEqualTo(HardMediumSoftScore.of(-1, 0, -51));
        assertThat(score(affectationFixee(1))).isEqualTo(HardMediumSoftScore.of(-9, 0, -46));
        assertThat(score(affectationFixee(2))).isEqualTo(HardMediumSoftScore.of(-9, 0, -49));
    }

    @Test
    void lesPoidsParDefautEnvoyesExplicitementNeChangentRien() {
        // L'école d'origine envoie les poids du catalogue, égaux aux poids par défaut du solveur
        EmploiDuTemps p = affectationFixee(0);
        p.setPoidsDesRegles(new java.util.HashMap<>(PreferencesEmploiDuTemps.POIDS_PAR_DEFAUT));
        ma.hestim.solver.rest.PoidsDesReglesTest.appliquer(p);
        assertThat(score(p)).isEqualTo(HardMediumSoftScore.of(-1, 0, -51));
    }
}
