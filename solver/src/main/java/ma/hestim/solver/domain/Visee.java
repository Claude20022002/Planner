package ma.hestim.solver.domain;

/**
 * Fait « cette séance (ou cette salle) est visée par cette contrainte déclarée », dans tel paquet
 * et de tel côté (A ou B). Construit à la réception, joint à la leçon par son identifiant : un
 * coup ne revoit que les contraintes de la leçon déplacée. {@code lecon} ou {@code salle} est nul.
 */
public record Visee(String lecon, Long salle, ContrainteDeclaree contrainte, int paquet, char cote) {

    public static Visee deLecon(String lecon, ContrainteDeclaree contrainte, int paquet, char cote) {
        return new Visee(lecon, null, contrainte, paquet, cote);
    }

    public static Visee deSalle(Long salle, ContrainteDeclaree contrainte) {
        return new Visee(null, salle, contrainte, 0, 'A');
    }

    public boolean de(ContrainteDeclaree.Famille famille, ContrainteDeclaree.Niveau niveau) {
        return contrainte.getFamille() == famille && contrainte.getNiveau() == niveau;
    }
}
