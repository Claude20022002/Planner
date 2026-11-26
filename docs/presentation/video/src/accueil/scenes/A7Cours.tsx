/**
 * Scène 7 (0:56 – 1:06) : l'espace d'une classe sur l'ordinateur, ses sections et leurs liens,
 * un sondage dont les barres montent et une annonce. Sources : backend/models/SectionCours.js, SupportCours.js, Sondage.js, Annonce.js ;
 * shared/sondages.js.
 */
import React from "react";
import { Link2, Megaphone, Vote } from "lucide-react";
import { C, OMBRE } from "../charte";
import { Apparition } from "../elements/Apparition";
import { CadreAppareil } from "../elements/CadreAppareil";
import { ColonneTexte } from "../elements/ColonneTexte";
import { EcranOrdinateur } from "../elements/EcranOrdinateur";
import { Fond } from "../elements/Fond";
import { progression, useSecondes } from "../elements/temps";
import type { Textes } from "../textes";

const PARTS = [0.3, 0.55, 0.15]; // répartition du sondage, pour le dessin

export const A7Cours: React.FC<{ t: Textes }> = ({ t }) => {
  const s = useSecondes();
  const scene = t.video.scenes[6];
  const ill = t.video.illustrations.cours;
  const apps = t.video.illustrations.applications;
  const annonce = progression(s, 4.3, 0.8);
  let rang = 0;

  return (
    <Fond ton="clair">
      <ColonneTexte titre={scene.titre} lignes={[{ texte: scene.lignes[0], debut: 1.0 }]} largeur={560} />

      <Apparition effet="grandir" debut={0.3} style={{ position: "absolute", left: 760, top: 150 }}>
        <CadreAppareil largeur={1060}>
          <EcranOrdinateur titre={apps[1]} detail={ill.classe} application={1}>
            <div style={{ position: "absolute", inset: 0, padding: 22, display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20 }}>
              {/* Les sections et leurs liens */}
              <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
                {ill.sections.map((section) => (
                  <div key={section.titre} style={{ padding: "14px 18px", borderRadius: 16, background: C.blanc, boxShadow: `inset 0 0 0 1px ${C.grisTrait}` }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: C.bleuNuit, marginBottom: 8 }}>{section.titre}</div>
                    {section.supports.map((support) => {
                      const p = progression(s, 1.3 + rang++ * 0.3, 0.6);
                      return (
                        <div key={support} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", fontSize: 18, color: C.encre, opacity: p, translate: `${(1 - p) * 20}px 0px` }}>
                          <Link2 size={22} strokeWidth={1.9} color={C.bleu} />
                          {support}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Le sondage de la classe */}
              <div style={{ alignSelf: "start", padding: "18px 20px", borderRadius: 16, background: C.blanc, boxShadow: `inset 0 0 0 1px ${C.grisTrait}`, display: "grid", gap: 14 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 17, fontWeight: 700, color: C.bleu }}>
                  <Vote size={22} strokeWidth={2} />
                  {ill.sondage.titre}
                </span>
                <span style={{ fontSize: 21, fontWeight: 700, color: C.bleuNuit, lineHeight: 1.3 }}>{ill.sondage.question}</span>
                {ill.sondage.choix.map((choix, i) => (
                  <div key={choix} style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontSize: 17, color: C.encre }}>{choix}</span>
                    <div style={{ height: 14, borderRadius: 7, background: C.grisFond }}>
                      <div style={{ width: `${PARTS[i] * 100 * progression(s, 2.4 + i * 0.15, 1.6)}%`, height: "100%", borderRadius: 7, background: i === 1 ? C.bleu : C.bleuClair }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* L'annonce de l'école */}
            <div style={{ position: "absolute", right: 24, bottom: 24, width: 440, display: "flex", gap: 14, padding: "16px 20px", borderRadius: 18, background: C.bleuNuit, color: C.blanc, boxShadow: OMBRE.carte, opacity: annonce, translate: `${(1 - annonce) * 60}px 0px` }}>
              <Megaphone size={30} strokeWidth={1.9} color={C.bleuClair} style={{ flex: "none" }} />
              <span style={{ display: "grid", gap: 4 }}>
                <strong style={{ fontSize: 18 }}>{ill.annonce.titre}</strong>
                <span style={{ fontSize: 17, color: C.bleuPale, lineHeight: 1.3 }}>{ill.annonce.texte}</span>
              </span>
            </div>
          </EcranOrdinateur>
        </CadreAppareil>
      </Apparition>
    </Fond>
  );
};
