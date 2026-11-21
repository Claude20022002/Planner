/**
 * Scène 2 (0:06 – 0:18) : sur l'ordinateur, le calcul avance et la semaine se remplit séance par
 * séance ; puis une case reste vide et l'avis dit la règle qui bloque. Mêmes séances et même avis
 * que l'illustration du site (accueil.json, emploi.illustration ; IllustrationSemaine.astro).
 * Sources : solver/…/ContraintesEmploiDuTemps.java, PreferencesEmploiDuTemps.java,
 * solver/…/rest/AnalyseDesRegles.java.
 */
import React from "react";
import { CircleAlert } from "lucide-react";
import { C, OMBRE } from "../charte";
import { Apparition } from "../elements/Apparition";
import { CadreAppareil } from "../elements/CadreAppareil";
import { ColonneTexte } from "../elements/ColonneTexte";
import { EcranOrdinateur } from "../elements/EcranOrdinateur";
import { Fond } from "../elements/Fond";
import { entre, progression, useSecondes } from "../elements/temps";
import type { Textes } from "../textes";

// [indice de la séance, jour (0 à 4), créneau (0 à 3), ton] : le placement de IllustrationSemaine.astro
const PLACEMENT: [number, number, number, "fonce" | "moyen" | "clair"][] = [
  [0, 0, 0, "fonce"], [1, 0, 1, "moyen"], [2, 1, 1, "clair"], [3, 1, 2, "moyen"],
  [4, 2, 0, "fonce"], [5, 3, 2, "moyen"], [6, 3, 0, "clair"], [7, 4, 1, "clair"],
  [1, 4, 0, "moyen"], [0, 2, 2, "fonce"],
];
const TONS = {
  fonce: { fond: C.bleuNuit, texte: C.blanc, bord: C.bleuClair },
  moyen: { fond: C.bleuPale, texte: C.bleuNuit, bord: C.bleu },
  clair: { fond: C.blanc, texte: C.bleuNuit, bord: C.bleuClair },
};
const CASE_VIDE = { jour: 1, creneau: 0 }; // mardi matin : la séance que l'avis explique

export const A2EmploiDuTemps: React.FC<{ t: Textes }> = ({ t }) => {
  const s = useSecondes();
  const scene = t.video.scenes[1];
  const ill = t.emploi.illustration;
  const calcul = progression(s, 1.4, 4.4);
  const avis = progression(s, 6.4);

  return (
    <Fond ton="gris">
      <ColonneTexte titre={scene.titre} lignes={[{ texte: scene.lignes[0], debut: 1.0 }, { texte: scene.lignes[1], debut: 6.6 }]} largeur={560} />

      <Apparition effet="grandir" debut={0.3} style={{ position: "absolute", left: 760, top: 150 }}>
        <CadreAppareil largeur={1060}>
          <EcranOrdinateur titre={t.video.illustrations.applications[0]} detail={t.video.illustrations.semaine} application={0}>
            {/* Barre du calcul, qui disparaît une fois la semaine remplie */}
            <div style={{ position: "absolute", left: 24, right: 24, top: 16, height: 30, display: "flex", alignItems: "center", gap: 16, opacity: 1 - progression(s, 5.9, 0.5), fontSize: 18, fontWeight: 600, color: C.bleuNuit }}>
              <span style={{ whiteSpace: "nowrap" }}>{t.video.illustrations.calcul}</span>
              <div style={{ flex: 1, height: 10, borderRadius: 5, background: C.grisTrait, overflow: "hidden" }}>
                <div style={{ width: `${calcul * 100}%`, height: "100%", background: C.bleu, borderRadius: 5 }} />
              </div>
            </div>

            <div style={{ position: "absolute", left: 24, right: 24, top: 58, bottom: 20, display: "grid", gridTemplateColumns: "70px repeat(5, 1fr)", gridTemplateRows: "34px repeat(4, 1fr)", gap: 9, fontSize: 17 }}>
              {ill.jours.map((jour, j) => (
                <span key={jour} style={{ gridColumn: j + 2, gridRow: 1, alignSelf: "center", fontWeight: 600, color: C.grisTexte }}>{jour}</span>
              ))}
              {ill.heures.map((heure, h) => (
                <span key={heure} style={{ gridColumn: 1, gridRow: h + 2, paddingTop: 6, color: C.grisTexte, fontVariantNumeric: "tabular-nums" }}>{heure}</span>
              ))}

              {/* La case vide du mardi matin, marquée quand l'avis arrive */}
              <div style={{ gridColumn: CASE_VIDE.jour + 2, gridRow: CASE_VIDE.creneau + 2, borderRadius: 12, border: `3px dashed ${C.bleu}`, opacity: avis, background: "rgb(31 101 179 / 6%)" }} />

              {PLACEMENT.map(([indice, jour, creneau, ton], k) => {
                const p = progression(s, 1.6 + k * 0.38, 0.7);
                const seance = ill.seances[indice];
                return (
                  <div
                    key={k}
                    style={{
                      gridColumn: jour + 2, gridRow: creneau + 2, borderRadius: 12, padding: "9px 11px", overflow: "hidden",
                      background: TONS[ton].fond, color: TONS[ton].texte, borderLeft: `5px solid ${TONS[ton].bord}`,
                      boxShadow: ton === "clair" ? `inset 0 0 0 1px ${C.grisTrait}` : undefined,
                      opacity: p, scale: entre(0.82, 1, p),
                    }}
                  >
                    <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{seance.titre}</div>
                    <div style={{ opacity: 0.8, marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{seance.lieu}</div>
                  </div>
                );
              })}
            </div>

            {/* L'avis de la séance non placée, comme sur le site */}
            <div
              style={{
                position: "absolute", right: 30, bottom: 30, width: 520, display: "flex", gap: 16, padding: "20px 24px", borderRadius: 20,
                background: "rgb(255 255 255 / 96%)", boxShadow: OMBRE.carte, fontSize: 21, color: C.encre,
                opacity: avis, translate: `0px ${(1 - avis) * 40}px`,
              }}
            >
              <CircleAlert size={34} strokeWidth={1.9} color={C.bleu} style={{ flex: "none" }} />
              <div style={{ display: "grid", gap: 6 }}>
                <strong style={{ fontWeight: 700 }}>{ill.alerte.titre}</strong>
                <span style={{ color: C.grisTexte, lineHeight: 1.35 }}>{ill.alerte.texte}</span>
              </div>
            </div>
          </EcranOrdinateur>
        </CadreAppareil>
      </Apparition>
    </Fond>
  );
};
