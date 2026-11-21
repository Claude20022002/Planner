/**
 * Scène 5 (0:36 – 0:46), accent « jeu » : les dix types de questions du Studio s'alignent ; puis un
 * quiz en direct sur le téléphone (la question de l'illustration du site, accueil.json,
 * quiz.illustration), la bonne réponse rapporte des points, le classement monte.
 * Sources : shared/quiz/studio/types.js, l. 31 à 42 ; shared/quiz/studio/direct.js, l. 11 à 13.
 */
import React from "react";
import { ArrowDownUp, Check, CircleDot, Crosshair, Hash, Link2, ListChecks, PenLine, TextCursorInput, ToggleLeft, Trophy, Type } from "lucide-react";
import { C } from "../charte";
import { CadreAppareil } from "../elements/CadreAppareil";
import { ColonneTexte } from "../elements/ColonneTexte";
import { EcranTelephone } from "../elements/EcranTelephone";
import { Fond } from "../elements/Fond";
import { entre, progression, useSecondes } from "../elements/temps";
import type { Textes } from "../textes";

// Une icône par type, dans l'ordre de types.js et de accueil.json (video.illustrations.quiz.types)
const ICONES = [CircleDot, ListChecks, ToggleLeft, TextCursorInput, Hash, Type, Link2, ArrowDownUp, Crosshair, PenLine];
const PODIUM = [{ rang: 2, hauteur: 170 }, { rang: 1, hauteur: 250 }, { rang: 3, hauteur: 120 }];

export const A5Quiz: React.FC<{ t: Textes }> = ({ t }) => {
  const s = useSecondes();
  const scene = t.video.scenes[4];
  const ill = t.quiz.illustration;
  const vid = t.video.illustrations.quiz;
  const sortieTypes = progression(s, 4.2, 0.6);
  const telephone = progression(s, 4.5, 1.1);
  const reponse = progression(s, 6.6, 0.4);
  const points = progression(s, 7.0, 0.6);
  const minuteur = Math.max(1, Number.parseInt(ill.minuteur, 10) - Math.max(0, Math.floor(s - 5)));

  return (
    <Fond ton="clair">
      <ColonneTexte titre={scene.titre} lignes={[{ texte: scene.lignes[0], debut: 1.0 }]} largeur={600} />

      {/* Les dix types de questions */}
      <div style={{ position: "absolute", left: 830, top: 170, width: 980, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, opacity: 1 - sortieTypes, translate: `0px ${-sortieTypes * 40}px` }}>
        {vid.types.map((nom, i) => {
          const Icone = ICONES[i];
          const p = progression(s, 0.7 + i * 0.16, 0.7);
          return (
            <div key={nom} style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 22px", borderRadius: 22, background: C.grisFond, opacity: p, translate: `${(1 - p) * 40}px 0px`, fontSize: 30, fontWeight: 600, color: C.bleuNuit }}>
              <span style={{ width: 56, height: 56, borderRadius: 16, display: "grid", placeItems: "center", background: i % 3 === 0 ? C.jeu : C.bleuNuit, color: i % 3 === 0 ? C.bleuNuit : C.blanc }}>
                <Icone size={30} strokeWidth={2} />
              </span>
              {nom}
            </div>
          );
        })}
      </div>

      {/* Le quiz en direct */}
      <div style={{ position: "absolute", left: 930, top: 90, opacity: telephone, scale: entre(0.88, 1, telephone) }}>
        <CadreAppareil type="telephone" largeur={420}>
          <EcranTelephone titre={ill.titre}>
            <div style={{ position: "absolute", inset: 0, padding: "22px 22px", display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ padding: "8px 16px", borderRadius: 999, background: C.jeu, color: C.bleuNuit, fontSize: 20, fontWeight: 700 }}>{minuteur} s</span>
                <span style={{ fontSize: 17, color: C.grisTexte }}>{ill.participants}</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.bleuNuit, lineHeight: 1.25, minHeight: 110 }}>{ill.question}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {ill.reponses.map((texte, i) => {
                  const juste = i === 0;
                  const choisie = juste && reponse > 0.5;
                  return (
                    <div
                      key={texte}
                      style={{
                        height: 150, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 28, fontWeight: 700,
                        background: choisie ? C.jeu : i % 2 === 0 ? C.bleuNuit : C.bleu, color: choisie ? C.bleuNuit : C.blanc,
                        opacity: !juste && reponse > 0.5 ? 0.45 : 1, scale: juste ? 1 + reponse * 0.04 * (1 - points) : 1,
                      }}
                    >
                      {choisie && <Check size={28} strokeWidth={3} />}
                      {texte}
                    </div>
                  );
                })}
              </div>
              {/* Les points de la bonne réponse : justesse et rapidité */}
              <div style={{ alignSelf: "center", marginTop: 26, padding: "14px 30px", borderRadius: 999, background: C.bleuNuit, color: C.jeu, fontSize: 28, fontWeight: 800, opacity: points, scale: entre(0.7, 1, points) }}>
                {vid.points}
              </div>
            </div>
          </EcranTelephone>
        </CadreAppareil>
      </div>

      {/* Le classement de la classe */}
      <div style={{ position: "absolute", left: 1430, top: 330, width: 380, opacity: progression(s, 7.2, 0.6) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 700, color: C.bleuNuit, marginBottom: 24 }}>
          <Trophy size={34} strokeWidth={2} color={C.bleuNuit} />
          {vid.classement}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 300 }}>
          {PODIUM.map(({ rang, hauteur }, i) => {
            const p = progression(s, 7.4 + i * 0.15, 1.0);
            return (
              <div key={rang} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <span style={{ width: 54, height: 54, borderRadius: "50%", background: rang === 1 ? C.jeu : C.bleuPale, border: `4px solid ${C.blanc}`, boxShadow: `0 0 0 2px ${rang === 1 ? C.jeu : C.bleuPale}`, opacity: p }} />
                <div style={{ width: "100%", height: hauteur * p, borderRadius: "16px 16px 6px 6px", background: rang === 1 ? C.jeu : C.bleuNuit, color: rang === 1 ? C.bleuNuit : C.blanc, display: "grid", placeItems: "start center", paddingTop: 14, fontSize: 34, fontWeight: 800, boxSizing: "border-box", overflow: "hidden" }}>
                  {rang}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fond>
  );
};
