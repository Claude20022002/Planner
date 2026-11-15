package ma.hestim.solver;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import ai.timefold.solver.core.api.solver.SolutionManager;
import ai.timefold.solver.core.api.solver.SolverFactory;
import ai.timefold.solver.core.api.solver.SolverManager;
import ai.timefold.solver.core.config.solver.SolverConfig;
import ai.timefold.solver.core.config.solver.SolverManagerConfig;
import ma.hestim.solver.contraintes.ContraintesEmploiDuTemps;
import ma.hestim.solver.domain.EmploiDuTemps;
import ma.hestim.solver.domain.Lecon;

/**
 * Construit le solveur Timefold sans le starter Spring de Timefold, qui ne démarre pas sous
 * Spring Boot 4 en ligne 1.x (MOT-12). Les trois objets sont ceux que le starter fournissait :
 * la fabrique, le gestionnaire des calculs en tâche de fond et l'analyse des règles enfreintes.
 */
@Configuration
public class ConfigurationSolveur {

    /** Durée par défaut d'un calcul ; le contrôleur la remplace à chaque requête. */
    static final Duration DUREE_PAR_DEFAUT = Duration.ofSeconds(60);

    @Bean
    SolverFactory<EmploiDuTemps> fabriqueDuSolveur() {
        return SolverFactory.create(new SolverConfig()
                .withSolutionClass(EmploiDuTemps.class)
                .withEntityClasses(Lecon.class)
                .withConstraintProviderClass(ContraintesEmploiDuTemps.class)
                .withTerminationSpentLimit(DUREE_PAR_DEFAUT));
    }

    /** Autant de calculs en parallèle que la limite au-delà de laquelle le contrôleur répond 429. */
    @Bean
    SolverManager<EmploiDuTemps, String> gestionnaireDesCalculs(SolverFactory<EmploiDuTemps> fabrique,
            @Value("${solver.calculs-simultanes-max:2}") int calculsSimultanesMax) {
        return SolverManager.create(fabrique,
                new SolverManagerConfig().withParallelSolverCount(String.valueOf(calculsSimultanesMax)));
    }

    @Bean
    SolutionManager<EmploiDuTemps, HardSoftScore> analyseDesSolutions(SolverFactory<EmploiDuTemps> fabrique) {
        return SolutionManager.create(fabrique);
    }
}
