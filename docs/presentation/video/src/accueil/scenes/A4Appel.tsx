/**
 * Scène 4 (0:27 – 0:36), sur bleu nuit : l'écran projeté de l'enseignant montre le QR code de
 * l'appel et le temps avant le prochain code (il change toutes les 30 secondes : le décompte suit
 * le vrai temps) ; un téléphone le scanne, la présence est notée, le nombre de présents monte.
 * Textes de l'illustration du site (accueil.json, appel.illustration).
 * Source : backend/services/presences/appel.js, l. 10 à 13.
 */
import React from "react";
import { CircleCheck } from "lucide-react";
import { C } from "../charte";
import { Apparition } from "../elements/Apparition";
import { CadreAppareil } from "../elements/CadreAppareil";
import { ColonneTexte } from "../elements/ColonneTexte";
import { EcranOrdinateur } from "../elements/EcranOrdinateur";
import { EcranTelephone } from "../elements/EcranTelephone";
import { Fond } from "../elements/Fond";
import { QrDessine } from "../elements/QrDessine";
import { entre, progression, useSecondes } from "../elements/temps";
import type { Textes } from "../textes";

const PERIODE = 30; // secondes : appel.js, FENETRE_MS

/** Un coin du viseur du scanner */
const Coin: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div style={{ position: "absolute", width: 46, height: 46, borderColor: C.blanc, borderStyle: "solid", borderWidth: 0, ...style }} />
);

export const A4Appel: React.FC<{ t: Textes }> = ({ t }) => {
  const s = useSecondes();
  const scene = t.video.scenes[3];
  const ill = t.appel.illustration;
  const restant = Math.max(0, Math.ceil(PERIODE - 4 - s)); // le code a été affiché il y a 4 s
  const scan = progression(s, 3.4, 0.5);
  const total = Number(ill.compte.match(/\d+/g)?.[1] ?? 32);
  const final = Number(ill.compte.match(/\d+/)?.[0] ?? 28);
  const presents = Math.round(entre(final - 8, final, progression(s, 3.6, 3)));
  const rayon = 34;
  const tour = 2 * Math.PI * rayon;

  return (
    <Fond ton="sombre">
      <ColonneTexte ton="sombre" titre={scene.titre} lignes={[{ texte: scene.lignes[0], debut: 1.0 }]} largeur={560} />

      <Apparition effet="grandir" debut={0.3} style={{ position: "absolute", left: 680, top: 140 }}>
        <CadreAppareil largeur={900}>
          <EcranOrdinateur titre={ill.cours} detail={ill.detail} application={0} fond={C.blanc}>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 36, padding: "0 36px" }}>
              <div style={{ padding: 16, borderRadius: 24, background: C.blanc, boxShadow: `0 0 0 2px ${C.grisTrait}` }}>
                <QrDessine taille={270} graine={11} />
              </div>
              <div style={{ display: "grid", gap: 26, flex: 1 }}>
                <div style={{ fontSize: 25, fontWeight: 600, color: C.bleuNuit, lineHeight: 1.3 }}>{ill.consigne}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <svg width={84} height={84} viewBox="0 0 84 84">
                    <circle cx={42} cy={42} r={rayon} fill="none" stroke={C.grisTrait} strokeWidth={8} />
                    <circle cx={42} cy={42} r={rayon} fill="none" stroke={C.bleu} strokeWidth={8} strokeLinecap="round" strokeDasharray={tour} strokeDashoffset={tour * (1 - restant / PERIODE)} transform="rotate(-90 42 42)" />
                    <text x={42} y={50} textAnchor="middle" fontSize={24} fontWeight={700} fill={C.bleuNuit}>{restant}</text>
                  </svg>
                  <span style={{ fontSize: 21, color: C.grisTexte }}>{t.video.illustrations.appel.renouvellement} {restant} s</span>
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: C.bleuNuit }}>{ill.compte.replace(/\d+/, String(presents))}</span>
                  <div style={{ height: 14, borderRadius: 7, background: C.grisTrait, overflow: "hidden" }}>
                    <div style={{ width: `${(presents / total) * 100}%`, height: "100%", borderRadius: 7, background: C.bleu }} />
                  </div>
                </div>
              </div>
            </div>
          </EcranOrdinateur>
        </CadreAppareil>
      </Apparition>

      {/* Le téléphone de l'étudiant, en mode scanner, devant l'écran projeté */}
      <Apparition effet="grandir" debut={1.4} style={{ position: "absolute", left: 1610, top: 360 }}>
        <CadreAppareil type="telephone" largeur={290}>
          <EcranTelephone plein>
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <div style={{ position: "relative", width: 210, height: 210, display: "grid", placeItems: "center", scale: entre(1, 0.94, scan) }}>
                <div style={{ opacity: 0.85 }}>
                  <QrDessine taille={170} graine={11} couleur={C.ecran} fond={C.texteSombre} />
                </div>
                <Coin style={{ left: 0, top: 0, borderLeftWidth: 6, borderTopWidth: 6, borderTopLeftRadius: 16 }} />
                <Coin style={{ right: 0, top: 0, borderRightWidth: 6, borderTopWidth: 6, borderTopRightRadius: 16 }} />
                <Coin style={{ left: 0, bottom: 0, borderLeftWidth: 6, borderBottomWidth: 6, borderBottomLeftRadius: 16 }} />
                <Coin style={{ right: 0, bottom: 0, borderRightWidth: 6, borderBottomWidth: 6, borderBottomRightRadius: 16 }} />
              </div>
            </div>
            {/* Présence notée */}
            <div
              style={{
                position: "absolute", left: 18, right: 18, bottom: 40, display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderRadius: 18,
                background: C.blanc, color: C.bleuNuit, fontSize: 19, fontWeight: 700, opacity: scan, translate: `0px ${(1 - scan) * 30}px`,
              }}
            >
              <CircleCheck size={28} strokeWidth={2.2} color={C.bleu} />
              {t.video.illustrations.appel.presence}
            </div>
          </EcranTelephone>
        </CadreAppareil>
      </Apparition>
    </Fond>
  );
};
