/**
 * Scène 8 (1:06 – 1:17) : d'abord l'établissement sur l'ordinateur (deux campus et leur temps de
 * trajet, l'occupation des salles, une session d'examen et ses surveillances) ; puis, sur bleu nuit,
 * la sécurité : un code de vérification à six chiffres et les trois rôles. Sources :
 * backend/models/Salle.js, SessionExamen.js, Surveillance.js, Campus.js, TrajetCampus.js ;
 * backend/services/mfa.js ; backend/middleware/roleMiddleware.js ; backend/services/ia/consigne.js.
 */
import React from "react";
import { Building2, ClipboardCheck, GraduationCap, Route, ShieldCheck, UserRound, Users } from "lucide-react";
import { AbsoluteFill } from "remotion";
import { C } from "../charte";
import { Apparition } from "../elements/Apparition";
import { CadreAppareil } from "../elements/CadreAppareil";
import { ColonneTexte } from "../elements/ColonneTexte";
import { EcranOrdinateur } from "../elements/EcranOrdinateur";
import { EcranTelephone } from "../elements/EcranTelephone";
import { Fond } from "../elements/Fond";
import { Pastille } from "../elements/Pastille";
import { entre, progression, useSecondes } from "../elements/temps";
import type { Textes } from "../textes";

const OCCUPATION = [0.82, 0.64, 0.47, 0.71]; // pour le dessin
const CODE = "482913"; // chiffres d'exemple
const SECURITE = 5.8; // passage au bleu nuit, en secondes
const ICONES_ROLES = [GraduationCap, UserRound, Users];

const Campus: React.FC<{ nom: string; p: number }> = ({ nom, p }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 16, background: C.blanc, boxShadow: `inset 0 0 0 1px ${C.grisTrait}`, opacity: p, scale: entre(0.9, 1, p) }}>
    <span style={{ width: 48, height: 48, borderRadius: 12, background: C.bleuNuit, color: C.blanc, display: "grid", placeItems: "center" }}>
      <Building2 size={28} strokeWidth={1.8} />
    </span>
    <span style={{ fontSize: 21, fontWeight: 700, color: C.bleuNuit }}>{nom}</span>
  </div>
);

export const A8Etablissement: React.FC<{ t: Textes }> = ({ t }) => {
  const s = useSecondes();
  const scene = t.video.scenes[7];
  const ill = t.video.illustrations.etablissement;
  const sec = t.video.illustrations.securite;
  const trajet = progression(s, 1.5, 0.9);
  const sombre = progression(s, SECURITE, 0.7);

  return (
    <Fond ton="clair">
      <ColonneTexte titre={scene.titre} titreFin={SECURITE - 0.4} lignes={[{ texte: scene.lignes[0], debut: 1.0, fin: SECURITE - 0.4 }]} largeur={560} />

      <Apparition effet="grandir" debut={0.3} style={{ position: "absolute", left: 760, top: 150 }}>
        <CadreAppareil largeur={1060}>
          <EcranOrdinateur titre={t.video.illustrations.applications[3]} application={3}>
            <div style={{ position: "absolute", inset: 0, padding: 24, display: "grid", gridTemplateRows: "auto 1fr", gap: 22 }}>
              {/* Deux campus, reliés par leur temps de trajet */}
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <Campus nom={ill.campus[0]} p={progression(s, 1.0, 0.7)} />
                <div style={{ flex: 1, position: "relative", height: 60, display: "flex", alignItems: "center" }}>
                  <div style={{ width: "100%", borderTop: `5px dashed ${C.bleuClair}`, clipPath: `inset(0 ${(1 - trajet) * 100}% 0 0)` }} />
                  <span style={{ position: "absolute", left: "50%", top: "50%", translate: "-50% -50%", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 999, background: C.bleuPale, color: C.bleuNuit, fontSize: 19, fontWeight: 700, opacity: trajet }}>
                    <Route size={20} strokeWidth={2} />
                    {ill.trajet}
                  </span>
                </div>
                <Campus nom={ill.campus[1]} p={progression(s, 1.2, 0.7)} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 22, alignItems: "start" }}>
                {/* Occupation des salles */}
                <div style={{ padding: "24px 26px", borderRadius: 16, background: C.blanc, boxShadow: `inset 0 0 0 1px ${C.grisTrait}`, display: "grid", gap: 26 }}>
                  <span style={{ fontSize: 21, fontWeight: 700, color: C.bleuNuit }}>{ill.occupation}</span>
                  {ill.salles.map((salle, i) => (
                    <div key={salle} style={{ display: "grid", gridTemplateColumns: "170px 1fr", alignItems: "center", gap: 14, fontSize: 20, color: C.encre }}>
                      {salle}
                      <div style={{ height: 22, borderRadius: 11, background: C.grisFond }}>
                        <div style={{ width: `${OCCUPATION[i] * 100 * progression(s, 2.0 + i * 0.15, 1.4)}%`, height: "100%", borderRadius: 8, background: i % 2 ? C.bleuClair : C.bleu }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Une session d'examen et ses surveillances */}
                <div style={{ padding: "26px 26px", borderRadius: 16, background: C.bleuNuit, color: C.blanc, display: "grid", gap: 18, opacity: progression(s, 3.0, 0.8), translate: `0px ${(1 - progression(s, 3.0, 0.8)) * 30}px` }}>
                  <ClipboardCheck size={34} strokeWidth={1.8} color={C.bleuClair} />
                  <span style={{ fontSize: 21, fontWeight: 700 }}>{ill.examen.titre}</span>
                  <span style={{ fontSize: 18, color: C.bleuPale, lineHeight: 1.35 }}>{ill.examen.detail}</span>
                  <span style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    {[0, 1, 2].map((i) => (
                      <span key={i} style={{ width: 40, height: 40, borderRadius: "50%", background: C.bleuClair, border: `3px solid ${C.bleuNuit}`, marginLeft: i ? -12 : 0, opacity: progression(s, 3.6 + i * 0.15, 0.5) }} />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </EcranOrdinateur>
        </CadreAppareil>
      </Apparition>

      {/* La sécurité, sur bleu nuit */}
      <AbsoluteFill style={{ opacity: sombre }}>
        <Fond ton="sombre">
          <ColonneTexte ton="sombre" lignes={[{ texte: scene.lignes[1], debut: SECURITE + 0.5 }]} largeur={760}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {sec.roles.map((role, i) => {
                const Icone = ICONES_ROLES[i];
                const p = progression(s, SECURITE + 2.6 + i * 0.2, 0.6);
                return (
                  <Pastille key={role} ton="bleu" taille={28} icone={<Icone size={26} strokeWidth={2} />} style={{ opacity: p, scale: entre(0.9, 1, p) }}>
                    {role}
                  </Pastille>
                );
              })}
            </div>
          </ColonneTexte>

          <Apparition effet="grandir" debut={SECURITE + 0.4} style={{ position: "absolute", left: 1300, top: 110 }}>
            <CadreAppareil type="telephone" largeur={400}>
              <EcranTelephone titre={sec.code} fond={C.blanc}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 70, gap: 34 }}>
                  <span style={{ width: 120, height: 120, borderRadius: 34, background: C.bleuPale, color: C.bleuNuit, display: "grid", placeItems: "center" }}>
                    <ShieldCheck size={68} strokeWidth={1.6} />
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    {CODE.split("").map((chiffre, i) => {
                      const visible = s >= SECURITE + 1.3 + i * 0.22;
                      return (
                        <span key={i} style={{ width: 46, height: 62, borderRadius: 12, display: "grid", placeItems: "center", fontSize: 32, fontWeight: 700, color: C.bleuNuit, background: C.grisFond, boxShadow: `inset 0 0 0 2px ${visible ? C.bleu : C.grisTrait}` }}>
                          {visible ? chiffre : ""}
                        </span>
                      );
                    })}
                  </div>
                  {/* Valider : le bouton s'enfonce une fois les six chiffres saisis */}
                  <div style={{ width: "82%", padding: "18px 0", borderRadius: 999, textAlign: "center", fontSize: 22, fontWeight: 700, color: C.blanc, background: s >= SECURITE + 2.8 ? C.bleuProfond : C.bleu, opacity: s >= SECURITE + 2.6 ? 1 : 0.5, scale: 1 - 0.04 * progression(s, SECURITE + 2.8, 0.2) * (1 - progression(s, SECURITE + 3.0, 0.3)) }}>
                    {sec.valider}
                  </div>
                </div>
              </EcranTelephone>
            </CadreAppareil>
          </Apparition>
        </Fond>
      </AbsoluteFill>
    </Fond>
  );
};
