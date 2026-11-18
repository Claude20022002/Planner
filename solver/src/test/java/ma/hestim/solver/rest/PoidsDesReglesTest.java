package ma.hestim.solver.rest;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Map;

import org.junit.jupiter.api.Test;

import ai.timefold.solver.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import ma.hestim.solver.ReferenceScoreTest;
import ma.hestim.solver.contraintes.PreferencesEmploiDuTemps;
import ma.hestim.solver.domain.EmploiDuTemps;

/**
 * Poids des règles du profil envoyés par Planner (MOT-13b) : un poids changé change la pénalité,
 * 0 coupe la règle, un nom inconnu ou un poids hors bornes est refusé.
 */
public class PoidsDesReglesTest {

    /** Ce que fait la réception d'un problème : les poids reçus deviennent des ConstraintWeightOverrides. */
    public static void appliquer(EmploiDuTemps p) {
        ProblemeRecu.appliquerPoids(p);
    }

    private static HardMediumSoftScore avecPoids(Map<String, Integer> poids) {
        // Affectation 0 : « Salle à la taille du groupe » -31 (poids 1), « CM avant TD » -20 (4 × 5)
        EmploiDuTemps p = ReferenceScoreTest.affectationFixee(0);
        p.setPoidsDesRegles(new java.util.HashMap<>(poids));
        appliquer(p);
        return ReferenceScoreTest.score(p);
    }

    @Test
    void unPoidsChangeLaPenalite() {
        assertThat(avecPoids(Map.of())).isEqualTo(HardMediumSoftScore.of(-1, 0, -51));
        assertThat(avecPoids(Map.of(PreferencesEmploiDuTemps.TAILLE_SALLE, 2))).isEqualTo(HardMediumSoftScore.of(-1, 0, -82));
        assertThat(avecPoids(Map.of(PreferencesEmploiDuTemps.CM_AVANT_TD, 10))).isEqualTo(HardMediumSoftScore.of(-1, 0, -71));
    }

    @Test
    void zeroCoupeLaRegle() {
        assertThat(avecPoids(Map.of(PreferencesEmploiDuTemps.CM_AVANT_TD, 0))).isEqualTo(HardMediumSoftScore.of(-1, 0, -31));
        assertThat(avecPoids(Map.of(PreferencesEmploiDuTemps.CM_AVANT_TD, 0, PreferencesEmploiDuTemps.TAILLE_SALLE, 0)))
                .isEqualTo(HardMediumSoftScore.of(-1, 0, 0));
    }

    @Test
    void unNomInconnuOuUnPoidsHorsBornesEstRefuse() {
        assertThat(ProblemeRecu.verifierPoids(Map.of(PreferencesEmploiDuTemps.TROUS, 30))).isNull();
        assertThat(ProblemeRecu.verifierPoids(Map.of("Pas de samedi après-midi", 50))).contains("Pas de samedi après-midi");
        assertThat(ProblemeRecu.verifierPoids(Map.of(PreferencesEmploiDuTemps.TROUS, -1))).contains("Poids hors de 0-1000");
        assertThat(ProblemeRecu.verifierPoids(Map.of(PreferencesEmploiDuTemps.TROUS, 1001))).contains("Poids hors de 0-1000");
        java.util.HashMap<String, Integer> sansValeur = new java.util.HashMap<>();
        sansValeur.put(PreferencesEmploiDuTemps.TROUS, null);
        assertThat(ProblemeRecu.verifierPoids(sansValeur)).contains("Poids hors de 0-1000");
    }

    @Test
    void lesNeufReglesSouplesOntChacuneUnPoidsParDefaut() {
        assertThat(PreferencesEmploiDuTemps.POIDS_PAR_DEFAUT).hasSize(9).doesNotContainKey("Pas de samedi après-midi");
    }
}
