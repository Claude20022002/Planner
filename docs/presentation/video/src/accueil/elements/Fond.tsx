/**
 * Fond d'une scène, dans l'un des trois tons des sections du site (vitrine/src/components/socle/
 * Section.astro) : clair, gris ou sombre. TONS donne aussi les couleurs du texte de chaque ton.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, POLICE } from "../charte";

export type Ton = "clair" | "gris" | "sombre";

export const TONS: Record<Ton, { fond: string; texte: string; second: string; surtitre: string }> = {
  clair: { fond: C.blanc, texte: C.encre, second: C.grisTexte, surtitre: C.bleu },
  gris: { fond: C.grisFond, texte: C.encre, second: C.grisTexte, surtitre: C.bleu },
  sombre: { fond: C.bleuNuit, texte: C.blanc, second: C.bleuPale, surtitre: C.bleuClair },
};

export const Fond: React.FC<{ ton?: Ton; children?: React.ReactNode }> = ({ ton = "clair", children }) => (
  <AbsoluteFill style={{ background: TONS[ton].fond, color: TONS[ton].texte, fontFamily: POLICE }}>
    {children}
  </AbsoluteFill>
);
