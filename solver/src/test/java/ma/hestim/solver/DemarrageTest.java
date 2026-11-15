package ma.hestim.solver;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import ai.timefold.solver.core.api.solver.SolutionManager;
import ai.timefold.solver.core.api.solver.SolverFactory;
import ai.timefold.solver.core.api.solver.SolverManager;
import ma.hestim.solver.rest.EmploiDuTempsController;
import ma.hestim.solver.securite.JetonFiltre;

/**
 * L'application démarre : le contexte Spring se charge, avec le solveur construit par
 * ConfigurationSolveur (sans le starter Timefold), le contrôleur et le filtre à jeton.
 * C'est ce test qui aurait vu l'échec du starter 1.x sous Spring Boot 4 (MOT-12).
 */
@SpringBootTest(properties = "solver.jeton=" + DemarrageTest.JETON)
class DemarrageTest {

    static final String JETON = "jeton-de-test-0123456789abcdef-32";

    @Autowired
    private ApplicationContext contexte;

    @Test
    void leContexteSeCharge() {
        assertThat(contexte.getBeansOfType(SolverFactory.class)).hasSize(1);
        assertThat(contexte.getBeansOfType(SolverManager.class)).hasSize(1);
        assertThat(contexte.getBeansOfType(SolutionManager.class)).hasSize(1);
        assertThat(contexte.getBean(EmploiDuTempsController.class)).isNotNull();
        assertThat(contexte.getBean(JetonFiltre.class)).isNotNull();
    }

    @Test
    void lesDeuxBornesDeCalculLisentLaMemePropriete() {
        // Le nombre de calculs en parallèle et le refus 429 viennent de la même propriété
        assertThat(contexte.getEnvironment().getProperty("solver.calculs-simultanes-max", Integer.class)).isEqualTo(2);
        assertThat(contexte.getEnvironment().getProperty("timefold.solver-manager.parallel-solver-count")).isNull();
    }

    @Test
    void laFabriqueConstruitUnSolveur() {
        @SuppressWarnings("unchecked")
        SolverFactory<Object> fabrique = contexte.getBean(SolverFactory.class);
        assertThat(fabrique.buildSolver()).isNotNull();
    }
}
