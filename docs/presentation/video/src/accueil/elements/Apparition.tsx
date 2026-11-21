/**
 * Enveloppe animée de la vidéo, comme celle du site (vitrine/src/components/socle/Apparition.astro) :
 * « apparaitre » (fondu et glissement vers le haut) ou « grandir » (l'élément passe de 88 % à sa
 * taille, comme les appareils du site qui grandissent en montant). Même durée et même courbe.
 */
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COURBE, MOUVEMENT } from "../charte";

type Props = {
  children: React.ReactNode;
  effet?: "apparaitre" | "grandir";
  /** Entrée, en secondes depuis le début de la séquence */
  debut?: number;
  /** Durée de l'entrée en secondes ; celle du site par défaut, plus longue pour « grandir » */
  duree?: number;
  style?: React.CSSProperties;
};

export const Apparition: React.FC<Props> = ({ children, effet = "apparaitre", debut = 0, duree, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t0 = debut * fps;
  const t1 = t0 + (duree ?? (effet === "grandir" ? 1.4 : MOUVEMENT.apparition)) * fps;
  const options = { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: COURBE } as const;

  return (
    <div
      style={{
        opacity: interpolate(frame, [t0, t1], [0, 1], options),
        translate: effet === "apparaitre" ? interpolate(frame, [t0, t1], [`0px ${MOUVEMENT.glissement}px`, "0px 0px"], options) : undefined,
        scale: effet === "grandir" ? interpolate(frame, [t0, t1], [0.88, 1], options) : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
