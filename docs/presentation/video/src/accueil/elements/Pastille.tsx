/**
 * Pastille arrondie (rayon « pilule » de la charte) : types de questions, onglets, étapes d'un
 * report. Trois tons : bleu (fond bleu pâle), plein (bleu nuit) et jeu (accent jaune, texte bleu
 * nuit, seule paire permise par la charte pour cet accent).
 */
import React from "react";
import { C, ECHELLE, POLICE, RAYON } from "../charte";

const TONS = {
  bleu: { fond: C.bleuPale, texte: C.bleuNuit },
  plein: { fond: C.bleuNuit, texte: C.blanc },
  jeu: { fond: C.jeu, texte: C.bleuNuit },
} as const;

type Props = {
  children: React.ReactNode;
  ton?: keyof typeof TONS;
  /** Taille du texte en px */
  taille?: number;
  icone?: React.ReactNode;
  style?: React.CSSProperties;
};

export const Pastille: React.FC<Props> = ({ children, ton = "bleu", taille = 30, icone, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: taille * 0.4,
      padding: `${taille * 0.35}px ${taille * 0.8}px`,
      borderRadius: RAYON.pilule,
      background: TONS[ton].fond,
      color: TONS[ton].texte,
      fontFamily: POLICE,
      fontSize: taille,
      fontWeight: 600,
      lineHeight: 1.2,
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      minHeight: taille * 1.9,
      ...style,
    }}
  >
    {icone}
    {children}
  </div>
);

/** Espacement d'une rangée de pastilles, à l'échelle de la vidéo */
export const ECART_PASTILLES = 8 * ECHELLE;
