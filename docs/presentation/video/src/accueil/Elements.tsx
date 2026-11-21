/**
 * Banc d'essai des éléments de la vidéo de l'accueil (VIT-08, étape 2) : fonds, logo animé, textes,
 * cadres d'appareils et pastilles, réunis sur une image pour les relire dans Remotion Studio avant
 * d'écrire les scènes. N'est pas rendu pour le site. Les textes sont des repères, pas ceux de la vidéo.
 */
import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { C } from "./charte";
import { Apparition } from "./elements/Apparition";
import { CadreAppareil } from "./elements/CadreAppareil";
import { Fond } from "./elements/Fond";
import { LogoHorloge } from "./elements/LogoHorloge";
import { Pastille, ECART_PASTILLES } from "./elements/Pastille";
import { TexteAnime } from "./elements/TexteAnime";

export const DUREE_ELEMENTS = 8; // secondes

/** Un écran d'exemple : quelques blocs aux couleurs de la charte, sans texte réel */
const EcranExemple: React.FC = () => (
  <AbsoluteFill style={{ padding: 36, gap: 18, display: "flex", flexDirection: "column" }}>
    <div style={{ height: 40, width: "40%", borderRadius: 10, background: C.bleuNuit }} />
    <div style={{ display: "flex", gap: 18, flex: 1 }}>
      {[C.bleuNuit, C.bleuPale, C.grisFond, C.bleuPale, C.bleuNuit].map((couleur, i) => (
        <div key={i} style={{ flex: 1, borderRadius: 14, background: couleur, borderLeft: `6px solid ${C.bleu}` }} />
      ))}
    </div>
  </AbsoluteFill>
);

export const Elements: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Fond ton="gris">
      {/* Colonne de gauche : logo, titre, ligne, légende, pastilles */}
      <Sequence premountFor={fps} name="Textes et logo">
        <AbsoluteFill style={{ padding: "60px 0 0 140px", gap: 24, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <LogoHorloge largeur={300} debut={0.2} />
          <TexteAnime variante="titre" debut={0.6} largeur={820}>Titre de scène, sur deux lignes.</TexteAnime>
          <TexteAnime variante="ligne" debut={1.2} largeur={820}>Une ligne de texte qui suit le titre, douze mots au plus.</TexteAnime>
          <TexteAnime variante="legende" debut={1.8} largeur={820}>Légende ou mention</TexteAnime>
          <Apparition debut={2.4} style={{ display: "flex", gap: ECART_PASTILLES }}>
            <Pastille>Bleu</Pastille>
            <Pastille ton="plein">Plein</Pastille>
            <Pastille ton="jeu">Jeu</Pastille>
          </Apparition>
        </AbsoluteFill>
      </Sequence>

      {/* Colonne de droite : ordinateur, et téléphone devant lui */}
      <Sequence from={Math.round(0.8 * fps)} premountFor={fps} name="Appareils">
        <AbsoluteFill>
          <Apparition effet="grandir" style={{ position: "absolute", left: 1010, top: 210 }}>
            <CadreAppareil largeur={800}>
              <EcranExemple />
            </CadreAppareil>
          </Apparition>
          <Apparition effet="grandir" debut={0.5} style={{ position: "absolute", left: 1560, top: 300 }}>
            <CadreAppareil type="telephone" largeur={240}>
              <AbsoluteFill style={{ padding: "48px 18px", gap: 14, display: "flex", flexDirection: "column" }}>
                <div style={{ height: 26, width: "60%", borderRadius: 8, background: C.bleuNuit }} />
                {[C.bleuPale, C.grisFond, C.bleuPale].map((couleur, i) => (
                  <div key={i} style={{ height: 80, borderRadius: 12, background: couleur, borderLeft: `5px solid ${C.bleu}` }} />
                ))}
              </AbsoluteFill>
            </CadreAppareil>
          </Apparition>
        </AbsoluteFill>
      </Sequence>

      {/* Bandeau sombre : le ton des sections « sombre » du site */}
      <Sequence from={Math.round(4.5 * fps)} premountFor={fps} name="Ton sombre">
        <Apparition style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 210 }}>
          <Fond ton="sombre">
            <AbsoluteFill style={{ padding: "48px 140px", gap: 10, display: "flex", flexDirection: "column" }}>
              <TexteAnime variante="ligne" ton="sombre" debut={0.3} style={{ color: C.blanc, fontWeight: 700 }}>Titre sur bleu nuit</TexteAnime>
              <TexteAnime variante="legende" ton="sombre" debut={0.6}>Texte second en bleu pâle</TexteAnime>
            </AbsoluteFill>
          </Fond>
        </Apparition>
      </Sequence>
    </Fond>
  );
};
