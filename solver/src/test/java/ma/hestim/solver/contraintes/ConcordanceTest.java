package ma.hestim.solver.contraintes;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.InputStream;
import java.util.List;

import org.junit.jupiter.api.Test;

import ai.timefold.solver.test.api.score.stream.ConstraintVerifier;
import ma.hestim.solver.domain.ContrainteDeclaree;
import ma.hestim.solver.domain.EmploiDuTemps;
import ma.hestim.solver.domain.Lecon;
import ma.hestim.solver.rest.ProblemeRecu;
import tools.jackson.databind.DeserializationFeature;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

/**
 * Concordance du solveur et du bilan de Planner (MOT-13b, § 4.4) : le fichier commun
 * concordance-declarees.json porte une affectation fixée, des contraintes compilées et le nombre
 * d'occurrences attendu pour chacune. Planner lit le même fichier (bilanContraintes.test.js).
 */
class ConcordanceTest {

    private final ConstraintVerifier<ContraintesEmploiDuTemps, EmploiDuTemps> verifier =
            ConstraintVerifier.build(new ContraintesEmploiDuTemps(), EmploiDuTemps.class, Lecon.class);

    // Comme l'API : champs inconnus ignorés, null lu 0 dans un nombre entier
    private static final JsonMapper JSON = JsonMapper.builder()
            .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
            .disable(DeserializationFeature.FAIL_ON_NULL_FOR_PRIMITIVES)
            .build();

    @Test
    void chaqueContrainteCompteLesOccurrencesAttendues() throws Exception {
        JsonNode fichier;
        try (InputStream entree = getClass().getResourceAsStream("/concordance-declarees.json")) {
            fichier = JSON.readTree(entree);
        }
        EmploiDuTemps probleme = JSON.treeToValue(fichier, EmploiDuTemps.class);
        assertThat(ProblemeRecu.verifier(probleme)).isNull();
        ProblemeRecu.relier(probleme);
        List<ContrainteDeclaree> toutes = List.copyOf(probleme.getContraintesDeclarees());
        assertThat(toutes).hasSize(fichier.get("attendus").size());

        for (ContrainteDeclaree c : toutes) {
            int attendu = fichier.get("attendus").get(String.valueOf(c.getId())).asInt();
            // Une contrainte à la fois : la pénalité de sa règle est celle de ses seules occurrences
            probleme.setContraintesDeclarees(List.of(c));
            probleme.construireVisees();
            verifier.verifyThat((p, f) -> ContraintesDeclarees.regle(f, c.getFamille(), c.getNiveau()))
                    .givenSolution(probleme)
                    .penalizesBy("contrainte " + c.getId(), ContraintesDeclarees.penalite(c, attendu));
        }
    }
}
