/**
 * Scène 3 (0:18 – 0:27) : sur le téléphone de l'étudiant, la séance de physique quitte le mardi
 * pour le jeudi, et la notification arrive. À gauche, les quatre étapes du report s'allument
 * (accueil.json, report.etapes). Sources : backend/controllers/demandeReportController.js,
 * backend/services/planning/reportDecision.js, backend/services/planning/seances.js
 * (notifierChangementSeance).
 */
import React from "react";
import { BellRing, Check } from "lucide-react";
import { C, OMBRE } from "../charte";
import { Apparition } from "../elements/Apparition";
import { CadreAppareil } from "../elements/CadreAppareil";
import { ColonneTexte } from "../elements/ColonneTexte";
import { EcranTelephone } from "../elements/EcranTelephone";
import { Fond } from "../elements/Fond";
import { entre, progression, useSecondes } from "../elements/temps";
import type { Textes } from "../textes";

const Carte: React.FC<{ titre: string; detail: string; fonce?: boolean; style?: React.CSSProperties }> = ({ titre, detail, fonce, style }) => (
  <div
    style={{
      position: "absolute", left: 20, right: 20, height: 92, borderRadius: 16, padding: "14px 18px", boxSizing: "border-box",
      background: fonce ? C.bleuNuit : C.blanc, color: fonce ? C.blanc : C.bleuNuit, borderLeft: `6px solid ${fonce ? C.bleuClair : C.bleu}`,
      boxShadow: fonce ? undefined : `inset 0 0 0 1px ${C.grisTrait}`, ...style,
    }}
  >
    <div style={{ fontSize: 21, fontWeight: 700 }}>{titre}</div>
    <div style={{ fontSize: 17, marginTop: 6, opacity: 0.85 }}>{detail}</div>
  </div>
);

const Jour: React.FC<{ nom: string; haut: number }> = ({ nom, haut }) => (
  <div style={{ position: "absolute", left: 24, top: haut, fontSize: 18, fontWeight: 700, color: C.grisTexte, textTransform: "uppercase", letterSpacing: "0.04em" }}>{nom}</div>
);

export const A3Report: React.FC<{ t: Textes }> = ({ t }) => {
  const s = useSecondes();
  const scene = t.video.scenes[2];
  const ill = t.video.illustrations.report;
  const semaine = t.emploi.illustration;
  const physique = semaine.seances[1];
  const deplacement = progression(s, 2.6, 1.3);
  const levee = progression(s, 2.2, 0.4) * (1 - progression(s, 3.7, 0.4));
  const notification = progression(s, 4.6, 0.8);

  return (
    <Fond ton="clair">
      <ColonneTexte titre={scene.titre} lignes={[{ texte: scene.lignes[0], debut: 1.0 }]} largeur={760}>
        <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
          {t.report.etapes.map((etape, i) => {
            const p = progression(s, 2.6 + i * 1.05, 0.5);
            return (
              <div
                key={etape.titre}
                style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "12px 20px 12px 14px", borderRadius: 999, fontSize: 24, fontWeight: 600,
                  background: p > 0.5 ? C.bleuNuit : C.grisFond, color: p > 0.5 ? C.blanc : C.grisTexte, opacity: entre(0.55, 1, p), scale: entre(0.96, 1, p),
                }}
              >
                <span style={{ width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", background: p > 0.5 ? C.bleuClair : C.grisTrait, color: C.bleuNuit }}>
                  {p > 0.5 ? <Check size={20} strokeWidth={3} /> : <span style={{ fontSize: 17 }}>{i + 1}</span>}
                </span>
                {etape.titre}
              </div>
            );
          })}
        </div>
      </ColonneTexte>

      <Apparition effet="grandir" debut={0.3} style={{ position: "absolute", left: 1300, top: 90 }}>
        <CadreAppareil type="telephone" largeur={420}>
          <EcranTelephone titre={ill.ecran} onglets={t.video.illustrations.mobile.onglets} actif={0}>
            <Jour nom={ill.jours[0]} haut={22} />
            <Carte titre={semaine.seances[2].titre} detail={`${semaine.heures[2]} · ${semaine.seances[2].lieu}`} style={{ top: 168 }} />
            <Jour nom={ill.jours[1]} haut={300} />
            <Carte titre={semaine.seances[3].titre} detail={`${semaine.heures[0]} · ${semaine.seances[3].lieu}`} style={{ top: 340 }} />
            {/* La place du jeudi après-midi, où la séance va se poser */}
            <div style={{ position: "absolute", left: 20, right: 20, top: 444, height: 92, borderRadius: 16, border: `3px dashed ${C.bleuClair}`, opacity: 1 - deplacement }} />
            {/* La séance déplacée : du mardi 10:30 au jeudi 14:00 */}
            <Carte
              fonce
              titre={physique.titre}
              detail={`${deplacement < 0.5 ? semaine.heures[1] : semaine.heures[2]} · ${physique.lieu}`}
              style={{ top: entre(60, 444, deplacement), scale: 1 + levee * 0.05, boxShadow: levee > 0 ? OMBRE.carte : undefined, zIndex: 2 }}
            />

            {/* La notification, qui descend du haut de l'écran */}
            <div
              style={{
                position: "absolute", left: 14, right: 14, top: 12, zIndex: 3, display: "flex", gap: 14, padding: "16px 18px", borderRadius: 20,
                background: "rgb(255 255 255 / 97%)", boxShadow: OMBRE.appareil, opacity: notification, translate: `0px ${(notification - 1) * 120}px`,
              }}
            >
              <span style={{ width: 46, height: 46, flex: "none", borderRadius: 12, background: C.bleu, color: C.blanc, display: "grid", placeItems: "center" }}>
                <BellRing size={26} strokeWidth={2} />
              </span>
              <span style={{ display: "grid", gap: 4 }}>
                <strong style={{ fontSize: 19, color: C.encre }}>{ill.notification.titre}</strong>
                <span style={{ fontSize: 17, color: C.grisTexte, lineHeight: 1.3 }}>{ill.notification.texte}</span>
              </span>
            </div>
          </EcranTelephone>
        </CadreAppareil>
      </Apparition>
    </Fond>
  );
};
