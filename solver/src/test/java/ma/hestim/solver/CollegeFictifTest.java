package ma.hestim.solver;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.InputStream;
import java.time.Duration;

import org.junit.jupiter.api.Test;

import ai.timefold.solver.core.api.solver.SolverFactory;
import ai.timefold.solver.core.config.solver.SolverConfig;
import ai.timefold.solver.core.config.solver.termination.TerminationConfig;
import ma.hestim.solver.contraintes.ContraintesEmploiDuTemps;
import ma.hestim.solver.domain.EmploiDuTemps;
import ma.hestim.solver.domain.Lecon;
import ma.hestim.solver.rest.ProblemeRecu;
import tools.jackson.databind.DeserializationFeature;
import tools.jackson.databind.json.JsonMapper;

/**
 * Le collège fictif de MOT-13b (4 classes, 4e et 3e dédoublées en espagnol et en allemand, 8
 * contraintes déclarées), écrit par scripts/college-fictif.mjs : résolu en 30 s au plus, sans
 * aucune impossibilité ni aucun indispensable enfreint (dur = 0, moyen = 0). Le calcul s'arrête dès
 * qu'il y parvient ; le bilan des souhaits se lit avec le script (--resoudre).
 */
class CollegeFictifTest {

    private static final JsonMapper JSON = JsonMapper.builder()
            .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
            .disable(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES)
            .build();

    @Test
    void leCollegeFictifEstResoluSansImpossibiliteNiIndispensableEnfreint() throws Exception {
        EmploiDuTemps probleme;
        try (InputStream entree = getClass().getResourceAsStream("/college-fictif.json")) {
            probleme = JSON.readValue(entree, EmploiDuTemps.class);
        }
        assertThat(ProblemeRecu.verifier(probleme)).isNull();
        ProblemeRecu.relier(probleme);
        assertThat(probleme.getContraintesDeclarees()).hasSize(8);

        SolverConfig config = new SolverConfig()
                .withSolutionClass(EmploiDuTemps.class)
                .withEntityClasses(Lecon.class)
                .withConstraintProviderClass(ContraintesEmploiDuTemps.class)
                .withTerminationConfig(new TerminationConfig()
                        .withSpentLimit(Duration.ofSeconds(30))
                        .withBestScoreLimit("0hard/0medium/*soft"));
        long debut = System.nanoTime();
        EmploiDuTemps solution = SolverFactory.<EmploiDuTemps>create(config).buildSolver().solve(probleme);
        long secondes = Duration.ofNanos(System.nanoTime() - debut).toSeconds();

        assertThat(solution.getScore().hardScore()).as("règles dures et impossibilités").isZero();
        assertThat(solution.getScore().mediumScore()).as("souhaits indispensables").isZero();
        assertThat(secondes).as("durée du calcul").isLessThanOrEqualTo(31);
        assertThat(solution.getLecons()).allMatch(l -> l.getCreneau() != null && l.getSalle() != null);
    }
}
