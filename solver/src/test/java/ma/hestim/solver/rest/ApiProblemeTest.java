package ma.hestim.solver.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.StandardCharsets;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.jayway.jsonpath.JsonPath;

import ma.hestim.solver.securite.JetonFiltre;

/**
 * L'API à travers le vrai contexte Spring (Jackson 3, filtre à jeton, solveur) : un problème
 * venu de Planner est lu malgré un null dans un nombre entier et un champ inconnu (régression
 * du réglage Jackson de MOT-12), puis la réponse garde la forme que lit Planner, avec le niveau
 * intermédiaire du score (MOT-13b). L'ancien champ {@code samediApresMidi} est accepté et ignoré.
 */
@SpringBootTest(properties = "solver.jeton=" + ApiProblemeTest.JETON)
class ApiProblemeTest {

    static final String JETON = "jeton-de-test-0123456789abcdef-32";

    /** Tous les types de champs : nombres, null, chaînes, listes, booléen, énumérations, table de trajets. */
    private static final String PROBLEME = """
            {"dureeSecondes": 5, "champInconnu": "ignoré",
             "poidsDesRegles": {"Journées sans trous": 30, "Vœu : créneau préféré": 0},
             "creneaux": [
               {"id": 1, "jour": 1, "debut": 480, "fin": 600, "rang": 1, "regime": "initiale", "suivantId": null, "finAvecSuivant": null},
               {"id": 2, "jour": 1, "debut": 630, "fin": 750, "rang": 2, "regime": "initiale"},
               {"id": 3, "jour": 2, "debut": 480, "fin": 600, "rang": 1, "regime": "initiale"}],
             "salles": [
               {"id": 10, "nom": "S-A", "capacite": 40, "type": "Salle de cours", "equipements": ["projecteur"], "campusId": 1},
               {"id": 11, "nom": "S-B", "capacite": 40, "type": "Salle de cours", "equipements": [], "campusId": 1}],
             "voeux": [{"enseignantId": 101, "creneauId": 1, "type": "INDISPONIBLE"}],
             "ressources": [{"nature": "GROUPE", "id": 7}],
             "parametres": {"maxMinutesJourGroupe": 480, "maxMinutesJourEnseignant": 480, "samediApresMidi": false,
                            "trajetDefautMinutes": 30, "trajets": {"1-2": 20}},
             "lecons": [
               {"id": "l1", "enseignementId": 1, "coursId": 1, "type": "CM", "regime": "initiale", "longueur": 1,
                "enseignants": [100], "groupes": [7], "groupesDirects": [7], "feuilles": [7], "effectif": 30, "distanciel": false},
               {"id": "l2", "enseignementId": 2, "coursId": 2, "type": "TD", "regime": "initiale", "longueur": 1,
                "enseignants": [100], "groupes": [8], "groupesDirects": [8], "feuilles": [8], "effectif": null,
                "typeSalleRequis": null, "equipementsRequis": ["projecteur"]},
               {"id": "l3", "enseignementId": 3, "coursId": 3, "type": "TD", "regime": "initiale", "longueur": 1,
                "enseignants": [101], "groupes": [7], "groupesDirects": [7], "feuilles": [7], "effectif": 30,
                "epinglee": true, "creneau": {"id": 3}, "salle": {"id": 11}}]}
            """;

    @Autowired
    private WebApplicationContext contexte;
    @Autowired
    private JetonFiltre filtre;

    private MockMvc api;

    @BeforeEach
    void preparer() {
        api = MockMvcBuilders.webAppContextSetup(contexte).addFilters(filtre).build();
    }

    @Test
    void unProblemeAvecNullEtChampInconnuEstResoluEtLaReponseGardeSaForme() throws Exception {
        String lance = api.perform(post("/timetables").header("X-Solver-Token", JETON)
                        .contentType(MediaType.APPLICATION_JSON).content(PROBLEME.getBytes(StandardCharsets.UTF_8)))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.dureeSecondes").value(5))
                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
        String id = JsonPath.read(lance, "$.id");

        String etat = attendreLaFin(id);
        assertThat((String) JsonPath.read(etat, "$.score")).matches("-?\\d+hard/-?\\d+medium/-?\\d+soft");
        assertThat((Integer) JsonPath.read(etat, "$.dur")).isZero();
        assertThat((Integer) JsonPath.read(etat, "$.moyen")).isZero();
        assertThat((Integer) JsonPath.read(etat, "$.souple")).isNotNull();
        assertThat((java.util.List<?>) JsonPath.read(etat, "$.violations")).isNotNull();
        assertThat((java.util.List<?>) JsonPath.read(etat, "$.leconsEnConflit")).isEmpty();
        assertThat((java.util.List<?>) JsonPath.read(etat, "$.lecons")).hasSize(3);
        // La leçon épinglée reste à sa place
        assertThat((java.util.List<Object>) JsonPath.read(etat, "$.lecons[?(@.id == 'l3')].creneauId")).containsExactly(3);
        assertThat((java.util.List<Object>) JsonPath.read(etat, "$.lecons[?(@.id == 'l3')].salleId")).containsExactly(11);
    }

    @Test
    void sansJetonLeCalculEstRefuse() throws Exception {
        api.perform(post("/timetables").contentType(MediaType.APPLICATION_JSON).content(PROBLEME.getBytes(StandardCharsets.UTF_8)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void uneLeconDeLongueurTroisEstRefusee() throws Exception {
        String invalide = PROBLEME.replace("\"id\": \"l1\", \"enseignementId\": 1, \"coursId\": 1, \"type\": \"CM\", \"regime\": \"initiale\", \"longueur\": 1",
                "\"id\": \"l1\", \"enseignementId\": 1, \"coursId\": 1, \"type\": \"CM\", \"regime\": \"initiale\", \"longueur\": 3");
        assertThat(invalide).isNotEqualTo(PROBLEME);
        api.perform(post("/timetables").header("X-Solver-Token", JETON)
                        .contentType(MediaType.APPLICATION_JSON).content(invalide.getBytes(StandardCharsets.UTF_8)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.erreur").exists());
    }

    @Test
    void unPoidsDeRegleInconnueEstRefuse() throws Exception {
        String inconnu = PROBLEME.replace("\"Journées sans trous\": 30", "\"Règle qui n'existe pas\": 30");
        assertThat(inconnu).isNotEqualTo(PROBLEME);
        api.perform(post("/timetables").header("X-Solver-Token", JETON)
                        .contentType(MediaType.APPLICATION_JSON).content(inconnu.getBytes(StandardCharsets.UTF_8)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.erreur").value(org.hamcrest.Matchers.containsString("Règle qui n'existe pas")));
    }

    /** Interroge le calcul jusqu'à ce qu'il soit terminé (au plus 30 s ; il est borné à 5 s). */
    private String attendreLaFin(String id) throws Exception {
        long limite = System.currentTimeMillis() + 30_000;
        while (true) {
            String etat = api.perform(get("/timetables/" + id).header("X-Solver-Token", JETON))
                    .andExpect(status().isOk())
                    .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
            String statut = JsonPath.read(etat, "$.statut");
            assertThat(statut).isNotEqualTo("ECHEC");
            if ("NOT_SOLVING".equals(statut) && etat.contains("\"violations\"")) {
                return etat;
            }
            assertThat(System.currentTimeMillis()).as("calcul terminé à temps").isLessThan(limite);
            Thread.sleep(250);
        }
    }
}
