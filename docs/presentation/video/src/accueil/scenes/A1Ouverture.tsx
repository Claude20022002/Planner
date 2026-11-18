/**
 * Scène 1 (0:00 – 0:06) : le logo à l'horloge, ses aiguilles tournent ; le nom, la phrase, puis les
 * sept applications de Planner en tuiles. Source : frontend/src/i18n/applications.fr.js.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { C, POLICE } from "../charte";
import { ICONES_APPLICATIONS } from "../elements/EcranOrdinateur";
import { Fond } from "../elements/Fond";
import { LogoHorloge } from "../elements/LogoHorloge";
import { TexteAnime } from "../elements/TexteAnime";
import { progression, useSecondes } from "../elements/temps";
import type { Textes } from "../textes";

export const A1Ouverture: React.FC<{ t: Textes }> = ({ t }) => {
  const s = useSecondes();
  const scene = t.video.scenes[0];
  const applications = t.video.illustrations.applications;

  return (
    <Fond ton="clair">
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 96, gap: 26 }}>
        <LogoHorloge largeur={300} debut={0.2} />
        <TexteAnime variante="titre" debut={1.1} style={{ fontSize: 150, letterSpacing: "-0.035em", textAlign: "center" }}>
          {scene.titre}
        </TexteAnime>
        <TexteAnime variante="ligne" debut={1.7} largeur={1300} style={{ textAlign: "center" }}>
          {scene.lignes[0]}
        </TexteAnime>

        <div style={{ display: "flex", gap: 20, marginTop: 36 }}>
          {applications.map((nom, i) => {
            const Icone = ICONES_APPLICATIONS[i];
            const p = progression(s, 2.5 + i * 0.12, 0.8);
            return (
              <div key={nom} style={{ width: 200, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: p, translate: `0px ${(1 - p) * 40}px` }}>
                <div style={{ width: 104, height: 104, borderRadius: 28, background: i === 5 ? C.jeu : C.bleuNuit, color: i === 5 ? C.bleuNuit : C.blanc, display: "grid", placeItems: "center", boxShadow: "0 18px 36px -18px rgb(23 57 92 / 45%)" }}>
                  <Icone size={50} strokeWidth={1.7} />
                </div>
                <span style={{ fontFamily: POLICE, fontSize: 24, fontWeight: 600, color: C.encre, textAlign: "center", lineHeight: 1.2 }}>{nom}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Fond>
  );
};
