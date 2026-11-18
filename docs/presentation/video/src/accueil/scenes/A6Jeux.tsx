/**
 * Scène 6 (0:46 – 0:56), accent « jeu » : des cartes de jeux se rangent (noms tirés des catalogues) ;
 * puis le terminal Linux au tableau, et le téléphone d'un étudiant qui propose une commande, jouée
 * ensuite par la classe. Sources : shared/simulations/catalogue.js, l. 17 (dix simulations) ;
 * shared/jeux/catalogue.js, l. 12 à 24 (terminal, modes individuel et collectif) ;
 * mobile/src/app/jeu-direct/[id].jsx.
 */
import React from "react";
import { Cpu, Database, ListTodo, Network, Send, ShieldCheck, SquareTerminal } from "lucide-react";
import { C } from "../charte";
import { Apparition } from "../elements/Apparition";
import { CadreAppareil } from "../elements/CadreAppareil";
import { ColonneTexte } from "../elements/ColonneTexte";
import { EcranOrdinateur } from "../elements/EcranOrdinateur";
import { EcranTelephone } from "../elements/EcranTelephone";
import { Fond } from "../elements/Fond";
import { progression, useSecondes } from "../elements/temps";
import type { Textes } from "../textes";

const ICONES = [SquareTerminal, Database, Network, Cpu, ListTodo, ShieldCheck];
const MONO = "ui-monospace, Consolas, 'Cascadia Mono', monospace";

/** Texte tapé lettre par lettre entre `debut` et `debut + duree` */
const tape = (texte: string, s: number, debut: number, duree: number) => texte.slice(0, Math.round(texte.length * progression(s, debut, duree)));

export const A6Jeux: React.FC<{ t: Textes }> = ({ t }) => {
  const s = useSecondes();
  const scene = t.video.scenes[5];
  const ill = t.video.illustrations.jeux;
  const sortieCartes = progression(s, 4.3, 0.6);
  const tableau = progression(s, 4.6, 1.1);
  const [cd, ls, proposee] = ill.commandes;
  const envoi = progression(s, 8.6, 0.3);

  return (
    <Fond ton="gris">
      <ColonneTexte titre={scene.titre} lignes={[{ texte: scene.lignes[0], debut: 1.0 }, { texte: scene.lignes[1], debut: 5.2 }]} largeur={600} />

      {/* Les cartes de jeux */}
      <div style={{ position: "absolute", left: 840, top: 200, width: 960, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 26, opacity: 1 - sortieCartes, scale: 1 - sortieCartes * 0.06 }}>
        {ill.cartes.map((nom, i) => {
          const Icone = ICONES[i];
          const p = progression(s, 0.6 + i * 0.18, 0.8);
          const premier = i === 0;
          return (
            <div key={nom} style={{ height: 300, borderRadius: 28, overflow: "hidden", background: C.blanc, boxShadow: "0 18px 40px -22px rgb(23 57 92 / 40%)", opacity: p, translate: `0px ${(1 - p) * 60}px` }}>
              <div style={{ height: 170, display: "grid", placeItems: "center", background: premier ? C.ecran : i % 2 ? C.bleuNuit : C.bleu, color: premier ? C.jeu : C.blanc }}>
                <Icone size={84} strokeWidth={1.5} />
              </div>
              <div style={{ padding: "22px 24px", fontSize: 28, fontWeight: 700, color: C.bleuNuit, lineHeight: 1.2 }}>{nom}</div>
            </div>
          );
        })}
      </div>

      {/* Le terminal au tableau */}
      <div style={{ position: "absolute", left: 830, top: 150, opacity: tableau, scale: 0.88 + tableau * 0.12 }}>
        <CadreAppareil largeur={880}>
          <EcranOrdinateur titre={ill.tableau} application={5} fond={C.ecran}>
            <div style={{ position: "absolute", inset: 0, padding: "30px 34px", fontFamily: MONO, fontSize: 30, lineHeight: 1.6, color: C.texteSombre }}>
              <div><span style={{ color: C.jeu }}>~ $</span> {tape(cd, s, 5.8, 0.8)}</div>
              {s > 6.8 && <div><span style={{ color: C.jeu }}>~/{cd.split(" ")[1]} $</span> {tape(ls, s, 7.0, 0.6)}</div>}
              {s > 9.0 && <div><span style={{ color: C.jeu }}>~/{cd.split(" ")[1]} $</span> {tape(proposee, s, 9.0, 0.5)}</div>}
              <span style={{ display: "inline-block", width: 16, height: 32, background: C.bleuClair, opacity: Math.floor(s * 2) % 2 ? 1 : 0.2 }} />
            </div>
          </EcranOrdinateur>
        </CadreAppareil>
      </div>

      {/* Le téléphone d'un étudiant, qui propose une commande à la classe */}
      <Apparition effet="grandir" debut={6.2} style={{ position: "absolute", left: 1560, top: 500 }}>
        <CadreAppareil type="telephone" largeur={300}>
          <EcranTelephone titre={ill.cartes[0]}>
            <div style={{ position: "absolute", inset: 0, padding: "24px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
              <span style={{ fontSize: 18, fontWeight: 600, color: C.grisTexte }}>{ill.proposer}</span>
              <div style={{ padding: "14px 14px", borderRadius: 14, background: C.blanc, border: `2px solid ${C.bleu}`, fontFamily: MONO, fontSize: 20, color: C.bleuNuit, minHeight: 28 }}>
                {tape(proposee, s, 7.4, 1.0)}
              </div>
              <div style={{ alignSelf: "flex-end", display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 999, background: C.jeu, color: C.bleuNuit, fontSize: 19, fontWeight: 700, scale: 1 - envoi * 0.08 * (1 - progression(s, 8.9, 0.3)) }}>
                <Send size={20} strokeWidth={2.2} />
                {ill.envoyer}
              </div>
            </div>
          </EcranTelephone>
        </CadreAppareil>
      </Apparition>
    </Fond>
  );
};
