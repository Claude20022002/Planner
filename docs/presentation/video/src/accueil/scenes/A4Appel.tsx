/**
 * Scène 4 (0:27 – 0:36), sur bleu nuit, en deux temps (EP-18, correction du 18 nov., question 8 du
 * plan). D'abord l'écran projeté de l'enseignant montre le QR code de l'appel et le temps avant le
 * prochain code (il change toutes les 30 secondes : le décompte suit le vrai temps) ; un téléphone le
 * scanne, la présence est notée, le nombre de présents monte. Puis l'écran passe à la liste de la
 * classe : trois boutons par étudiant, toujours visibles (présent, en retard, absent) ; un étudiant
 * est mis en retard, un autre absent. Les étudiants n'ont pas de nom : un avatar et une barre.
 * Textes de l'illustration du site (accueil.json, appel.illustration) et de video.illustrations.appel.
 * Sources : backend/services/presences/appel.js, l. 10 à 13 ; frontend/src/components/appel/LigneAppel.jsx.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { CircleCheck, UserRound } from "lucide-react";
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
const MANUEL = 5.0; // passage à l'appel à la main, en secondes
type Statut = "present" | "retard" | "absent";
/** Les étudiants de la liste : largeur de la barre du nom, et le statut choisi à la main (avec l'instant) */
const LIGNES: { nom: number; change?: { statut: Statut; a: number } }[] = [
  { nom: 190 },
  { nom: 150, change: { statut: "retard", a: MANUEL + 1.3 } },
  { nom: 210 },
  { nom: 170, change: { statut: "absent", a: MANUEL + 2.2 } },
];
const STATUTS: Statut[] = ["present", "retard", "absent"];

/** Un coin du viseur du scanner */
const Coin: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div style={{ position: "absolute", width: 46, height: 46, borderColor: C.blanc, borderStyle: "solid", borderWidth: 0, ...style }} />
);

/** Liste d'appel de l'enseignant : chaque étudiant et ses trois boutons, comme LigneAppel.jsx */
const ListeAppel: React.FC<{ s: number; libelles: Record<Statut, string> }> = ({ s, libelles }) => (
  <div style={{ position: "absolute", inset: 0, display: "grid", alignContent: "center", gap: 12, padding: "0 36px" }}>
    {LIGNES.map((ligne, i) => {
      const statut: Statut = ligne.change && s >= ligne.change.a ? ligne.change.statut : "present";
      const appui = ligne.change ? progression(s, ligne.change.a - 0.15, 0.3) * (1 - progression(s, ligne.change.a + 0.15, 0.3)) : 0;
      return (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 16px", borderRadius: 16, background: C.blanc, boxShadow: `inset 0 0 0 1px ${C.grisTrait}` }}>
          <span style={{ width: 46, height: 46, borderRadius: 23, background: C.grisFond, color: C.bleu, display: "grid", placeItems: "center", flex: "none" }}>
            <UserRound size={26} strokeWidth={2} />
          </span>
          <span style={{ width: ligne.nom, height: 14, borderRadius: 7, background: C.grisTrait }} />
          <span style={{ marginLeft: "auto", display: "flex", gap: 8, scale: 1 - appui * 0.05 }}>
            {STATUTS.map((v) => (
              <span
                key={v}
                style={{
                  padding: "9px 16px", borderRadius: 999, fontSize: 18, fontWeight: 600, whiteSpace: "nowrap",
                  background: v === statut ? C.bleu : C.blanc, color: v === statut ? C.blanc : C.grisTexte,
                  boxShadow: v === statut ? undefined : `inset 0 0 0 1px ${C.grisTrait}`,
                }}
              >
                {libelles[v]}
              </span>
            ))}
          </span>
        </div>
      );
    })}
  </div>
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
  const main = progression(s, MANUEL, 0.6); // 0 : le QR code ; 1 : la liste à la main

  return (
    <Fond ton="sombre">
      <ColonneTexte
        ton="sombre"
        titre={scene.titre}
        lignes={[{ texte: scene.lignes[0], debut: 1.0 }, { texte: scene.lignes[1], debut: MANUEL + 0.3 }]}
        largeur={560}
      />

      <Apparition effet="grandir" debut={0.3} style={{ position: "absolute", left: 680, top: 140 }}>
        <CadreAppareil largeur={900}>
          <EcranOrdinateur titre={ill.cours} detail={ill.detail} application={0} fond={main > 0 ? C.grisFond : C.blanc}>
            <div style={{ position: "absolute", inset: 0, opacity: main, translate: `0px ${(1 - main) * 24}px` }}>
              <ListeAppel s={s} libelles={t.video.illustrations.appel.statuts} />
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 36, padding: "0 36px", opacity: 1 - main, background: C.blanc }}>
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

      {/* Le téléphone de l'étudiant, en mode scanner, devant l'écran projeté ; il s'efface pour l'appel à la main */}
      <AbsoluteFill style={{ opacity: 1 - main }}>
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
      </AbsoluteFill>
    </Fond>
  );
};
