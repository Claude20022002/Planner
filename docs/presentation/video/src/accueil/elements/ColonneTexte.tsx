/**
 * Colonne de texte d'une scène, à gauche de l'image : le titre, puis les lignes, chacune entrée à
 * son heure (en secondes) et sortie au besoin. Les textes viennent de accueil.json (video.scenes).
 * Un contenu placé dessous (étapes, rôles) se passe en enfant.
 */
import React from "react";
import { TexteAnime } from "./TexteAnime";
import type { Ton } from "./Fond";

export type Ligne = { texte: string; debut: number; fin?: number };

type Props = {
  ton?: Ton;
  titre?: string;
  titreDebut?: number;
  titreFin?: number;
  lignes?: Ligne[];
  largeur?: number;
  children?: React.ReactNode;
};

export const ColonneTexte: React.FC<Props> = ({ ton = "clair", titre, titreDebut = 0.3, titreFin, lignes = [], largeur = 600, children }) => (
  <div style={{ position: "absolute", left: 130, top: 0, bottom: 0, width: largeur, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30 }}>
    {titre && (
      <TexteAnime variante="titre" ton={ton} debut={titreDebut} fin={titreFin} largeur={largeur} style={{ fontSize: 84 }}>
        {titre}
      </TexteAnime>
    )}
    {lignes.map((ligne) => (
      <TexteAnime key={ligne.texte} variante="ligne" ton={ton} debut={ligne.debut} fin={ligne.fin} largeur={largeur} style={{ fontSize: 44 }}>
        {ligne.texte}
      </TexteAnime>
    ))}
    {children}
  </div>
);
