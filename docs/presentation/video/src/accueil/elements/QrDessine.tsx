/**
 * QR code dessiné pour l'illustration de l'appel : trois repères d'angle et des modules tirés d'une
 * graine fixe. Il ne contient aucune adresse et ne se lit pas : c'est une image, comme le reste.
 */
import React from "react";
import { C } from "../charte";

const N = 25;

/** Générateur pseudo-aléatoire déterministe : la même graine donne toujours le même dessin */
const generateur = (graine: number) => {
  let x = graine;
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x / 2147483648;
  };
};

const dansRepere = (l: number, c: number) => {
  const coins = [[0, 0], [0, N - 7], [N - 7, 0]];
  return coins.some(([l0, c0]) => l >= l0 && l < l0 + 7 && c >= c0 && c < c0 + 7);
};

const Repere: React.FC<{ x: number; y: number; m: number; couleur: string; fond: string }> = ({ x, y, m, couleur, fond }) => (
  <>
    <rect x={x} y={y} width={7 * m} height={7 * m} rx={m * 1.2} fill={couleur} />
    <rect x={x + m} y={y + m} width={5 * m} height={5 * m} rx={m * 0.8} fill={fond} />
    <rect x={x + 2 * m} y={y + 2 * m} width={3 * m} height={3 * m} rx={m * 0.6} fill={couleur} />
  </>
);

type Props = { taille: number; graine?: number; couleur?: string; fond?: string };

export const QrDessine: React.FC<Props> = ({ taille, graine = 7, couleur = C.bleuNuit, fond = C.blanc }) => {
  const m = taille / N;
  const hasard = generateur(graine);
  const modules: React.ReactNode[] = [];
  for (let l = 0; l < N; l++) {
    for (let c = 0; c < N; c++) {
      const plein = hasard() > 0.52;
      if (plein && !dansRepere(l, c)) modules.push(<rect key={`${l}-${c}`} x={c * m} y={l * m} width={m * 0.92} height={m * 0.92} rx={m * 0.25} fill={couleur} />);
    }
  }
  return (
    <svg width={taille} height={taille} viewBox={`0 0 ${taille} ${taille}`} style={{ display: "block" }}>
      <rect width={taille} height={taille} fill={fond} />
      {modules}
      <Repere x={0} y={0} m={m} couleur={couleur} fond={fond} />
      <Repere x={(N - 7) * m} y={0} m={m} couleur={couleur} fond={fond} />
      <Repere x={0} y={(N - 7) * m} m={m} couleur={couleur} fond={fond} />
    </svg>
  );
};
