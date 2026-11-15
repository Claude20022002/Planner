package ma.hestim.solver.contraintes;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;

import ai.timefold.solver.core.api.score.buildin.hardmediumsoft.HardMediumSoftScore;
import ma.hestim.solver.ReferenceScoreTest;
import ma.hestim.solver.domain.ContrainteDeclaree;
import ma.hestim.solver.domain.ContrainteDeclaree.Famille;
import ma.hestim.solver.domain.ContrainteDeclaree.Niveau;
import ma.hestim.solver.domain.ContrainteDeclaree.Paquet;
import ma.hestim.solver.domain.ContrainteDeclaree.Quoi;
import ma.hestim.solver.domain.ContrainteDeclaree.Relation;
import ma.hestim.solver.domain.Creneau;
import ma.hestim.solver.domain.EmploiDuTemps;
import ma.hestim.solver.domain.Lecon;
import ma.hestim.solver.domain.Visee;
import ma.hestim.solver.rest.ProblemeRecu;

/**
 * Les 12 règles des contraintes déclarées (MOT-13b) : pour chaque famille, un cas tenu et un cas
 * enfreint ; la salle visée, les sous-groupes de langue alignés, le plafond en heures arrondi,
 * l'écart de 2 jours ; et le niveau du score que touche chaque nature.
 */
class ContraintesDeclareesTest extends GrilleDeTest {

    private final Creneau mer1 = new Creneau(30L, 3, 540, 645, 1, "initiale", null, null);

    private static ContrainteDeclaree contrainte(Famille famille, Niveau niveau, int poids) {
        ContrainteDeclaree c = new ContrainteDeclaree();
        c.setId(7L);
        c.setFamille(famille);
        c.setNiveau(niveau);
        c.setPoids(poids);
        return c;
    }

    private static ContrainteDeclaree plage(Niveau niveau, int poids, List<Long> creneaux) {
        ContrainteDeclaree c = contrainte(Famille.PLAGE, niveau, poids);
        c.setCreneaux(creneaux);
        return c;
    }

    /** Les faits que donne la réception : les leçons, puis les visées de la contrainte. */
    private static Object[] faits(ContrainteDeclaree c, Lecon... lecons) {
        EmploiDuTemps p = new EmploiDuTemps();
        p.setContraintesDeclarees(List.of(c));
        p.construireVisees();
        List<Object> faits = new ArrayList<>(List.of(lecons));
        faits.addAll(p.getVisees());
        return faits.toArray();
    }

    private void verifier(ContrainteDeclaree c, int penalite, Lecon... lecons) {
        verifier.verifyThat((p, f) -> ContraintesDeclarees.regle(f, c.getFamille(), c.getNiveau()))
                .given(faits(c, lecons)).penalizesBy(penalite);
    }

    @Test
    void plageAChaqueNiveau() {
        Lecon l = lecon(lun1, g1, Set.of(10L), Set.of(100L));
        for (Niveau niveau : Niveau.values()) {
            int poids = niveau == Niveau.SOUPLE ? 7 : 1;
            ContrainteDeclaree visee = plage(niveau, 7, List.of(1L));
            visee.setLecons(List.of(l.getId()));
            verifier(visee, poids, l);
            ContrainteDeclaree ailleurs = plage(niveau, 7, List.of(3L));
            ailleurs.setLecons(List.of(l.getId()));
            verifier(ailleurs, 0, l);
        }
        // Une séance de deux créneaux sur deux créneaux visés compte deux fois
        Lecon longue = lecon(lun1, g1, Set.of(10L), Set.of(100L));
        longue.setLongueur(2);
        ContrainteDeclaree deux = plage(Niveau.DUR, 0, List.of(1L, 2L));
        deux.setLecons(List.of(longue.getId()));
        verifier(deux, 2, longue);
    }

    @Test
    void plageDUneSalle() {
        Lecon dansG1 = lecon(lun1, g1, Set.of(10L), Set.of(100L));
        Lecon dansG2 = lecon(lun1, g2, Set.of(11L), Set.of(101L));
        ContrainteDeclaree salle = plage(Niveau.DUR, 0, List.of(1L));
        salle.setSalles(List.of(g1.getId()));
        verifier(salle, 1, dansG1, dansG2);
        dansG1.setSalle(g2);
        verifier(salle, 0, dansG1, dansG2);
    }

    @Test
    void plafondEnSeancesEtEnHeuresArrondies() {
        Lecon a = lecon(lun1, g1, Set.of(10L), Set.of(100L));
        Lecon b = lecon(lun2, g1, Set.of(10L), Set.of(100L));
        Lecon c = lecon(lun3, g1, Set.of(10L), Set.of(100L));
        ContrainteDeclaree seances = contrainte(Famille.PLAFOND, Niveau.SOUPLE, 10);
        seances.setQuoi(Quoi.SEANCES);
        seances.setSeuil(2);
        seances.setPaquets(List.of(new Paquet(List.of(a.getId(), b.getId(), c.getId()), null)));
        verifier(seances, 10, a, b, c);
        seances.setSeuil(3);
        verifier(seances, 0, a, b, c);

        // 105 + 90 = 195 min pour 3 h : 15 min de trop, arrondies à une heure
        ContrainteDeclaree heures = contrainte(Famille.PLAFOND, Niveau.DUR, 0);
        heures.setQuoi(Quoi.HEURES);
        heures.setSeuil(3);
        heures.setPaquets(List.of(new Paquet(List.of(a.getId(), b.getId()), null)));
        verifier(heures, 1, a, b);
        heures.setSeuil(4);
        verifier(heures, 0, a, b);
    }

    @Test
    void plafondDeSeancesALaSuite() {
        Lecon a = lecon(lun1, g1, Set.of(10L), Set.of(100L));
        Lecon b = lecon(lun2, g1, Set.of(10L), Set.of(100L));
        Lecon apresMidi = lecon(lun3, g1, Set.of(10L), Set.of(100L));
        ContrainteDeclaree suite = contrainte(Famille.PLAFOND, Niveau.MOYEN, 0);
        suite.setQuoi(Quoi.SEANCES_A_LA_SUITE);
        suite.setSeuil(1);
        suite.setPaquets(List.of(new Paquet(List.of(a.getId(), b.getId()), null)));
        verifier(suite, 1, a, b);
        suite.setPaquets(List.of(new Paquet(List.of(a.getId(), apresMidi.getId()), null)));
        verifier(suite, 0, a, apresMidi);
    }

    @Test
    void repartitionAvecUnEcartDeDeuxJours() {
        Lecon lundi = lecon(lun1, g1, Set.of(10L), Set.of(100L));
        Lecon mardi = lecon(mar1, g1, Set.of(10L), Set.of(100L));
        Lecon mercredi = lecon(mer1, g1, Set.of(10L), Set.of(100L));
        ContrainteDeclaree r = contrainte(Famille.REPARTITION, Niveau.SOUPLE, 10);
        r.setEcart(2);
        r.setPaquets(List.of(new Paquet(List.of(lundi.getId(), mardi.getId()), null)));
        verifier(r, 10, lundi, mardi);
        r.setPaquets(List.of(new Paquet(List.of(lundi.getId(), mercredi.getId()), null)));
        verifier(r, 0, lundi, mercredi);
        r.setEcart(1);
        r.setPaquets(List.of(new Paquet(List.of(lundi.getId(), mardi.getId()), null)));
        verifier(r, 0, lundi, mardi);
    }

    @Test
    void sousGroupesDeLangueAlignes() {
        // Espagnol (demi-groupe 201) et allemand (demi-groupe 202) de la même 4e
        Lecon espagnol = lecon(lun1, g1, Set.of(10L), Set.of(201L));
        Lecon allemand = lecon(lun1, g2, Set.of(11L), Set.of(202L));
        ContrainteDeclaree aligne = contrainte(Famille.ENSEMBLE, Niveau.DUR, 0);
        aligne.setRelation(Relation.EN_MEME_TEMPS);
        aligne.setPaquets(List.of(new Paquet(List.of(espagnol.getId()), List.of(allemand.getId()))));
        verifier(aligne, 0, espagnol, allemand);
        allemand.setCreneau(lun3);
        verifier(aligne, 2, espagnol, allemand);
    }

    @Test
    void jamaisLeMemeJourNiALaSuite() {
        Lecon sport = lecon(lun1, g1, Set.of(10L), Set.of(100L));
        Lecon maths = lecon(lun2, g1, Set.of(11L), Set.of(100L));
        ContrainteDeclaree jour = contrainte(Famille.ENSEMBLE, Niveau.SOUPLE, 3);
        jour.setRelation(Relation.JAMAIS_LE_MEME_JOUR);
        jour.setPaquets(List.of(new Paquet(List.of(sport.getId()), List.of(maths.getId()))));
        verifier(jour, 3, sport, maths);
        ContrainteDeclaree suite = contrainte(Famille.ENSEMBLE, Niveau.MOYEN, 0);
        suite.setRelation(Relation.JAMAIS_A_LA_SUITE);
        suite.setPaquets(jour.getPaquets());
        verifier(suite, 1, sport, maths);
        maths.setCreneau(lun3);
        verifier(suite, 0, sport, maths);
        maths.setCreneau(mar1);
        verifier(jour, 0, sport, maths);
    }

    @Test
    void chaqueNatureToucheSonNiveauDuScore() {
        // Affectation 0 de ReferenceScoreTest : CM0 occupe les créneaux 1 et 2
        EmploiDuTemps p = ReferenceScoreTest.affectationFixee(0);
        List<ContrainteDeclaree> contraintes = new ArrayList<>();
        long id = 1;
        for (Niveau niveau : Niveau.values()) {
            ContrainteDeclaree c = plage(niveau, 7, List.of(1L));
            c.setId(id++);
            c.setLecons(List.of("CM0"));
            contraintes.add(c);
        }
        p.setContraintesDeclarees(contraintes);
        p.construireVisees();
        assertThat(ReferenceScoreTest.score(p)).isEqualTo(HardMediumSoftScore.of(-2, -1, -58));
    }

    @Test
    void uneSeanceInconnueOuUnChampManquantEstRefuse() {
        EmploiDuTemps p = ReferenceScoreTest.affectationFixee(0);
        ContrainteDeclaree c = plage(Niveau.DUR, 0, List.of(1L));
        c.setLecons(List.of("CM0", "inconnue-1", "inconnue-2"));
        p.setContraintesDeclarees(List.of(c));
        assertThat(ProblemeRecu.verifier(p)).contains("2 séance(s) visée(s) inconnue(s)");
        ContrainteDeclaree sansRelation = contrainte(Famille.ENSEMBLE, Niveau.DUR, 0);
        p.setContraintesDeclarees(List.of(sansRelation));
        assertThat(ProblemeRecu.verifier(p)).contains("relation requise");
        assertThat(new Visee(null, 1L, sansRelation, 0, 'A').de(Famille.ENSEMBLE, Niveau.DUR)).isTrue();
    }
}
