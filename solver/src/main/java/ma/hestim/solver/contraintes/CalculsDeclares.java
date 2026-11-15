package ma.hestim.solver.contraintes;

import java.util.Comparator;
import java.util.List;

import ma.hestim.solver.domain.ContrainteDeclaree;
import ma.hestim.solver.domain.ContrainteDeclaree.Quoi;
import ma.hestim.solver.domain.ContrainteDeclaree.Relation;
import ma.hestim.solver.domain.Lecon;

/**
 * Calculs des contraintes déclarées (MOT-13b) : combien de fois une contrainte n'est pas tenue.
 * Fonctions pures, que Planner reproduit en JavaScript pour le bilan
 * (backend/services/moteur/contraintes/bilan.js). Un test de concordance lit le même fichier des
 * deux côtés : changer un calcul ici sans le changer là fait échouer l'un des deux tests.
 * Seules les leçons posées (avec un créneau) sont comptées.
 */
public final class CalculsDeclares {

    /** Deux séances « à la suite » : 30 min ou moins entre la fin de l'une et le début de l'autre. */
    static final int PAUSE_COURTE = UsageDesSalles.PAUSE_COURTE;

    private CalculsDeclares() {
    }

    /** PLAGE : créneaux visés que la leçon occupe (son créneau, et le suivant pour deux créneaux). */
    public static int creneauxVisesOccupes(ContrainteDeclaree c, Lecon l) {
        int occupes = 0;
        for (Long creneau : l.getCreneauxOccupes()) {
            if (c.viseCreneau(creneau)) {
                occupes++;
            }
        }
        return occupes;
    }

    /**
     * PLAFOND : excès sur le seuil des séances d'un paquet un même jour. En heures, arrondi à
     * l'heure supérieure ; à la suite, la somme des excès de chaque suite de séances.
     */
    public static int excesPlafond(Quoi quoi, int seuil, List<Lecon> journee) {
        return switch (quoi) {
            case SEANCES -> Math.max(0, journee.size() - seuil);
            case HEURES -> {
                int minutes = journee.stream().mapToInt(Lecon::getDuree).sum();
                yield minutes > seuil * 60 ? (minutes - seuil * 60 + 59) / 60 : 0;
            }
            case SEANCES_A_LA_SUITE -> {
                List<Lecon> triees = journee.stream().sorted(Comparator.comparingInt(Lecon::getDebut)).toList();
                int exces = 0;
                int suite = 0;
                int finPrecedente = Integer.MIN_VALUE;
                for (Lecon l : triees) {
                    suite = suite > 0 && l.getDebut() - finPrecedente <= PAUSE_COURTE ? suite + 1 : 1;
                    if (suite > seuil) {
                        exces++;
                    }
                    finPrecedente = Math.max(finPrecedente, l.getFin());
                }
                yield exces;
            }
        };
    }

    /** REPARTITION : paires de séances d'un paquet à moins de {@code ecart} jours l'une de l'autre. */
    public static int pairesTropProches(List<Lecon> paquet, int ecart) {
        int paires = 0;
        for (int i = 0; i < paquet.size(); i++) {
            for (int j = i + 1; j < paquet.size(); j++) {
                if (Math.abs(paquet.get(i).getJour() - paquet.get(j).getJour()) < ecart) {
                    paires++;
                }
            }
        }
        return paires;
    }

    /**
     * ENSEMBLE : en même temps, chaque séance d'un côté sans séance de l'autre côté au même jour
     * et à la même heure de début ; jamais le même jour, chaque paire A-B le même jour ; jamais à
     * la suite, chaque paire A-B le même jour, sans chevauchement, à 30 min ou moins.
     */
    public static int ensemble(Relation relation, List<Lecon> a, List<Lecon> b) {
        if (relation == Relation.EN_MEME_TEMPS) {
            return sansPartenaire(a, b) + sansPartenaire(b, a);
        }
        int paires = 0;
        for (Lecon x : a) {
            for (Lecon y : b) {
                if (x == y || x.getJour() != y.getJour()) {
                    continue;
                }
                boolean compte = relation == Relation.JAMAIS_LE_MEME_JOUR
                        || (!x.chevauche(y) && x.ecartAvec(y) <= PAUSE_COURTE);
                if (compte) {
                    paires++;
                }
            }
        }
        return paires;
    }

    private static int sansPartenaire(List<Lecon> cote, List<Lecon> autre) {
        int seules = 0;
        for (Lecon x : cote) {
            if (autre.stream().noneMatch(y -> y.getJour() == x.getJour() && y.getDebut() == x.getDebut())) {
                seules++;
            }
        }
        return seules;
    }
}
