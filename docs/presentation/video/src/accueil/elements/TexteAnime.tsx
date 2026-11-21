/**
 * Texte qui entre comme les blocs du site au défilement : fondu et léger glissement vers le haut,
 * 0,9 s, avec la courbe de la charte (animations.js, « apparitions »). Il peut sortir par un fondu.
 * Trois variantes : titre (les phrases fortes), ligne (le texte qui suit), legende (les mentions).
 */
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COURBE, MOUVEMENT, POLICE, TEXTE } from "../charte";
import { TONS, type Ton } from "./Fond";

type Variante = "titre" | "ligne" | "legende";

const STYLES: Record<Variante, React.CSSProperties> = {
  titre: { fontSize: TEXTE.titre, fontWeight: 700, lineHeight: TEXTE.interligneTitre, letterSpacing: "-0.025em" },
  ligne: { fontSize: TEXTE.ligne, fontWeight: 500, lineHeight: TEXTE.interligneTexte, letterSpacing: "-0.01em" },
  legende: { fontSize: TEXTE.legende, fontWeight: 500, lineHeight: TEXTE.interligneTexte },
};

type Props = {
  children: React.ReactNode;
  variante?: Variante;
  ton?: Ton;
  /** Entrée, en secondes depuis le début de la séquence */
  debut?: number;
  /** Sortie par un fondu, en secondes ; sans valeur, le texte reste */
  fin?: number;
  /** Largeur maximale en px (le texte passe à la ligne, équilibré comme sur le site) */
  largeur?: number;
  style?: React.CSSProperties;
};

export const TexteAnime: React.FC<Props> = ({ children, variante = "ligne", ton = "clair", debut = 0, fin, largeur = 1500, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t0 = debut * fps;
  const duree = MOUVEMENT.apparition * fps;
  const sortie = fin === undefined ? 1 : interpolate(frame, [fin * fps, fin * fps + duree / 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: COURBE });

  return (
    <div
      style={{
        fontFamily: POLICE,
        maxWidth: largeur,
        textWrap: "balance",
        color: variante === "titre" ? TONS[ton].texte : TONS[ton].second,
        ...STYLES[variante],
        opacity: interpolate(frame, [t0, t0 + duree], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: COURBE }) * sortie,
        translate: interpolate(frame, [t0, t0 + duree], [`0px ${MOUVEMENT.glissement}px`, "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: COURBE }),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
