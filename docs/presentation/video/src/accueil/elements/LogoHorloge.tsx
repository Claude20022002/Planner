/**
 * Logo à l'horloge, lu dans le fichier du site (vitrine/public/logo/planner-horloge.svg) : quand les
 * SVG officiels du chef le remplaceront, la vidéo suivra. Ses aiguilles font le mouvement du site
 * (animations.js, « tournerAiguilles ») : deux tours pour les minutes, un tiers d'heure pour les
 * heures, en 2,4 s. Le contrat est celui du site : les classes « aiguille-minutes » et
 * « aiguille-heures » ; sans elles, le logo reste fixe.
 */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cancelRender, continueRender, delayRender, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import adresseLogo from "../../../../../../vitrine/public/logo/planner-horloge.svg";
import { COURBE, MOUVEMENT } from "../charte";

type Props = {
  /** Largeur du logo en px */
  largeur: number;
  /** Début du tour des aiguilles, en secondes depuis le début de la séquence */
  debut?: number;
  style?: React.CSSProperties;
};

export const LogoHorloge: React.FC<Props> = ({ largeur, debut = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const conteneur = useRef<HTMLSpanElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [attente] = useState(() => delayRender("Lecture du logo du site"));

  useEffect(() => {
    fetch(adresseLogo)
      .then((reponse) => reponse.text())
      .then((texte) => {
        setSvg(texte.replace(/<!--[\s\S]*?-->/g, "").replace("<svg ", '<svg aria-hidden="true" focusable="false" width="100%" '));
        continueRender(attente);
      })
      .catch((erreur) => cancelRender(erreur));
  }, [attente]);

  const t0 = debut * fps;
  const fin = t0 + MOUVEMENT.aiguilles * fps;
  const options = { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: COURBE } as const;
  const minutes = interpolate(frame, [t0, fin], [-720, 0], options);
  const heures = interpolate(frame, [t0, fin], [-60, 0], options);

  // Les aiguilles sont dans le SVG inséré tel quel : on les tourne à chaque image, avant l'affichage
  useLayoutEffect(() => {
    const tourner = (classe: string, angle: number) => {
      const aiguille = conteneur.current?.querySelector<SVGGElement>(`.${classe}`);
      if (!aiguille) return;
      aiguille.style.transformBox = "fill-box";
      aiguille.style.transformOrigin = "center";
      aiguille.style.rotate = `${angle}deg`;
    };
    tourner("aiguille-minutes", minutes);
    tourner("aiguille-heures", heures);
  }, [svg, minutes, heures]);

  return (
    <span
      ref={conteneur}
      style={{ display: "block", width: largeur, lineHeight: 0, ...style }}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
};
