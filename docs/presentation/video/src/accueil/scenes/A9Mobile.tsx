/**
 * Scène 9 (1:17 – 1:26) : le téléphone de l'étudiant. La barre du bas montre les cinq onglets visibles
 * de l'application (mobile/src/app/(onglets)/_layout.jsx) ; Semaine, Scanner et Bibliothèque défilent.
 * L'onglet des jeux est masqué dans l'application (href: null) : il n'est pas montré (correction du
 * 18 nov., question 9 du plan). Puis la fin, sur fond blanc : le logo, ses aiguilles, le nom et
 * « Parlons de votre établissement. ». Ni adresse ni magasin d'applications.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import { BookMarked } from "lucide-react";
import { C } from "../charte";
import { Apparition } from "../elements/Apparition";
import { CadreAppareil } from "../elements/CadreAppareil";
import { ColonneTexte } from "../elements/ColonneTexte";
import { EcranTelephone, ONGLET } from "../elements/EcranTelephone";
import { Fond } from "../elements/Fond";
import { LogoHorloge } from "../elements/LogoHorloge";
import { QrDessine } from "../elements/QrDessine";
import { TexteAnime } from "../elements/TexteAnime";
import { progression, useSecondes } from "../elements/temps";
import type { Textes } from "../textes";

const CHANGEMENTS = [1.8, 3.4]; // passage à la page suivante, en secondes
const ONGLETS_DES_PAGES = [ONGLET.semaine, ONGLET.scanner, ONGLET.bibliotheque];
const FIN = 5.4;

const Liste: React.FC<{ lignes: { titre: string; detail: string; fonce?: boolean }[] }> = ({ lignes }) => (
  <div style={{ padding: 18, display: "grid", gap: 12 }}>
    {lignes.map((l) => (
      <div key={l.titre + l.detail} style={{ padding: "14px 16px", borderRadius: 14, background: l.fonce ? C.bleuNuit : C.blanc, color: l.fonce ? C.blanc : C.bleuNuit, borderLeft: `6px solid ${l.fonce ? C.bleuClair : C.bleu}`, boxShadow: l.fonce ? undefined : `inset 0 0 0 1px ${C.grisTrait}` }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{l.titre}</div>
        <div style={{ fontSize: 16, marginTop: 4, opacity: 0.85 }}>{l.detail}</div>
      </div>
    ))}
  </div>
);

export const A9Mobile: React.FC<{ t: Textes }> = ({ t }) => {
  const s = useSecondes();
  const scene = t.video.scenes[8];
  const onglets = t.video.illustrations.mobile.onglets;
  const semaine = t.emploi.illustration;
  const docs = t.video.illustrations.cours.bibliotheque.documents;
  const actif = ONGLETS_DES_PAGES[CHANGEMENTS.filter((c) => s >= c).length];
  const glisse = CHANGEMENTS.reduce((total, c) => total + progression(s, c, 0.6), 0);
  const fin = progression(s, FIN, 0.7);

  const pages = [
    <Liste key="semaine" lignes={[0, 1, 2, 3, 4].map((i) => ({ titre: semaine.seances[i].titre, detail: `${semaine.heures[i % semaine.heures.length]} · ${semaine.seances[i].lieu}`, fonce: i === 0 }))} />,
    <div key="scanner" style={{ position: "absolute", inset: 0, background: C.ecran, display: "grid", placeItems: "center" }}>
      <div style={{ padding: 16, borderRadius: 18, border: `5px solid ${C.blanc}` }}>
        <QrDessine taille={190} graine={11} couleur={C.ecran} fond={C.texteSombre} />
      </div>
    </div>,
    <div key="bibliotheque" style={{ padding: 18, display: "grid", gap: 12 }}>
      {docs.map((titre, i) => (
        <div key={titre} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 16px", borderRadius: 14, background: C.blanc, boxShadow: `inset 0 0 0 1px ${C.grisTrait}` }}>
          <span style={{ width: 62, height: 84, borderRadius: 8, background: [C.bleuNuit, C.bleu, C.bleuProfond, C.ecran][i], display: "grid", placeItems: "center", color: C.bleuClair }}>
            <BookMarked size={22} strokeWidth={1.8} />
          </span>
          <span style={{ fontSize: 19, fontWeight: 600, color: C.bleuNuit }}>{titre}</span>
        </div>
      ))}
    </div>,
  ];

  return (
    <Fond ton="gris">
      <ColonneTexte titre={scene.titre} lignes={[{ texte: scene.lignes[0], debut: 1.0 }]} largeur={640} />

      <Apparition effet="grandir" debut={0.2} style={{ position: "absolute", left: 1220, top: 80 }}>
        <CadreAppareil type="telephone" largeur={430}>
          <EcranTelephone titre={onglets[actif]} onglets={onglets} actif={actif}>
            <div style={{ position: "absolute", inset: 0, display: "flex", width: `${pages.length * 100}%`, translate: `${(-glisse * 100) / pages.length}% 0px` }}>
              {pages.map((page, i) => (
                <div key={i} style={{ position: "relative", width: `${100 / pages.length}%`, height: "100%" }}>{page}</div>
              ))}
            </div>
          </EcranTelephone>
        </CadreAppareil>
      </Apparition>

      {/* La fin : le logo, le nom, la phrase de la section Contact */}
      <AbsoluteFill style={{ opacity: fin }}>
        <Fond ton="clair">
          <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", gap: 30 }}>
            <LogoHorloge largeur={320} debut={FIN + 0.2} />
            <TexteAnime variante="titre" debut={FIN + 0.8} style={{ fontSize: 150, letterSpacing: "-0.035em" }}>{t.video.scenes[0].titre}</TexteAnime>
            <TexteAnime variante="ligne" debut={FIN + 1.4} style={{ fontSize: 56, color: C.bleu, fontWeight: 600 }}>
              {scene.lignes[1]}
            </TexteAnime>
          </AbsoluteFill>
        </Fond>
      </AbsoluteFill>
    </Fond>
  );
};
