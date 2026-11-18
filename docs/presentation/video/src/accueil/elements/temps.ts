/**
 * Le temps dans une scène, en secondes : useSecondes() lit l'image courante, progression() rend
 * l'avancement d'un mouvement (0 avant, 1 après) avec la courbe de la charte. Les scènes écrivent
 * ainsi leurs repères en secondes, comme dans le plan (§ 4), et non en images.
 */
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COURBE, MOUVEMENT } from "../charte";

export const useSecondes = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

/** Avancement de 0 à 1 d'un mouvement qui commence à `debut` et dure `duree` secondes */
export const progression = (secondes: number, debut: number, duree: number = MOUVEMENT.apparition) =>
  interpolate(secondes, [debut, debut + duree], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: COURBE });

/** Mélange linéaire de deux valeurs selon un avancement */
export const entre = (a: number, b: number, p: number) => a + (b - a) * p;
