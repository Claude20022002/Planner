/**
 * Cadre d'appareil de la vidéo, dessiné comme celui du site (vitrine/src/components/socle/
 * CadreAppareil.astro) : ordinateur (écran 16:10 et socle) ou téléphone (9:19 et caméra). Formes
 * propres à Planner, aucun appareil d'une marque. L'écran reçoit une illustration dessinée, jamais
 * une capture (décision du chef, 18 nov.). Mesures du site agrandies à l'échelle de la vidéo.
 */
import React from "react";
import { C, ECHELLE, OMBRE, RAYON } from "../charte";

type Props = {
  type?: "ordinateur" | "telephone";
  /** Largeur du cadre en px */
  largeur: number;
  /** Fond de l'écran ; blanc par défaut, comme sur le site */
  fondEcran?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export const CadreAppareil: React.FC<Props> = ({ type = "ordinateur", largeur, fondEcran = C.blanc, children, style }) => {
  if (type === "telephone") {
    const bord = 9.6 * ECHELLE; // 0,6rem
    return (
      <div style={{ width: largeur, ...style }}>
        <div
          style={{
            position: "relative",
            aspectRatio: "9 / 19",
            border: `${bord}px solid ${C.ecran}`,
            borderRadius: 44 * ECHELLE, // 2,75rem
            overflow: "hidden",
            background: fondEcran,
            boxShadow: OMBRE.appareil,
          }}
        >
          {children}
          <div
            aria-hidden
            style={{ position: "absolute", top: bord, left: "50%", width: bord, height: bord, marginLeft: -bord / 2, borderRadius: "50%", background: C.ecran }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: largeur, ...style }}>
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 10",
          border: `${12 * ECHELLE}px solid ${C.ecran}`,
          borderRadius: `${RAYON.normal}px ${RAYON.normal}px 0 0`,
          overflow: "hidden",
          background: fondEcran,
          boxShadow: OMBRE.appareil,
        }}
      >
        {children}
      </div>
      {/* Socle : le dégradé du site (gris-trait vers un gris plus sombre), plus large que l'écran */}
      <div
        style={{
          height: 17.6 * ECHELLE,
          margin: "0 -6%",
          background: `linear-gradient(${C.grisTrait}, #b8c3d1)`,
          borderRadius: `0 0 ${24 * ECHELLE}px ${24 * ECHELLE}px`,
        }}
      />
    </div>
  );
};
