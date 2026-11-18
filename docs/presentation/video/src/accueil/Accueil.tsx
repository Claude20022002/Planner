/**
 * Vidéo de présentation de l'accueil du site (VIT-08) : neuf scènes, sans voix ni musique, aux
 * couleurs de shared/charte, textes de vitrine/src/i18n/<langue>/accueil.json. Plan :
 * docs/conception/vitrine/vit-08-video-presentation.md, § 4. Chaque scène entre par un fondu de
 * 0,5 s posé sur la fin de la précédente ; la durée totale est la somme des durées du plan.
 */
import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { C } from "./charte";
import { progression, useSecondes } from "./elements/temps";
import { textes, type Langue, type Textes } from "./textes";
import { A1Ouverture } from "./scenes/A1Ouverture";
import { A2EmploiDuTemps } from "./scenes/A2EmploiDuTemps";
import { A3Report } from "./scenes/A3Report";
import { A4Appel } from "./scenes/A4Appel";
import { A5Quiz } from "./scenes/A5Quiz";
import { A6Jeux } from "./scenes/A6Jeux";
import { A7Cours } from "./scenes/A7Cours";
import { A8Etablissement } from "./scenes/A8Etablissement";
import { A9Mobile } from "./scenes/A9Mobile";

const FONDU = 0.5; // secondes

/** Les scènes et leur durée en secondes, dans l'ordre validé par le chef (plan, § 4) */
export const SCENES: { nom: string; duree: number; Scene: React.FC<{ t: Textes }> }[] = [
  { nom: "1 · Ouverture", duree: 6, Scene: A1Ouverture },
  { nom: "2 · Emploi du temps", duree: 12, Scene: A2EmploiDuTemps },
  { nom: "3 · Report", duree: 9, Scene: A3Report },
  { nom: "4 · Appel", duree: 9, Scene: A4Appel },
  { nom: "5 · Quiz", duree: 10, Scene: A5Quiz },
  { nom: "6 · Jeux", duree: 10, Scene: A6Jeux },
  { nom: "7 · Espace de cours", duree: 10, Scene: A7Cours },
  { nom: "8 · Établissement et sécurité", duree: 11, Scene: A8Etablissement },
  { nom: "9 · Téléphone et fin", duree: 9, Scene: A9Mobile },
];

export const DUREE_ACCUEIL = SCENES.reduce((total, scene) => total + scene.duree, 0);

/** Fondu d'entrée d'une scène, sauf la première */
const Entree: React.FC<{ premiere: boolean; children: React.ReactNode }> = ({ premiere, children }) => {
  const s = useSecondes();
  return <AbsoluteFill style={{ opacity: premiere ? 1 : progression(s, 0, FONDU) }}>{children}</AbsoluteFill>;
};

export const Accueil: React.FC<{ langue: Langue }> = ({ langue }) => {
  const { fps } = useVideoConfig();
  const t = textes(langue);
  let debut = 0;

  return (
    <AbsoluteFill style={{ background: C.blanc }}>
      {SCENES.map(({ nom, duree, Scene }, i) => {
        const derniere = i === SCENES.length - 1;
        const sequence = (
          <Sequence key={nom} name={nom} from={Math.round(debut * fps)} durationInFrames={Math.round((duree + (derniere ? 0 : FONDU)) * fps)} premountFor={fps}>
            <Entree premiere={i === 0}>
              <Scene t={t} />
            </Entree>
          </Sequence>
        );
        debut += duree;
        return sequence;
      })}
    </AbsoluteFill>
  );
};
