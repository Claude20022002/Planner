/**
 * Écran d'application dans le cadre de téléphone : barre d'état, en-tête avec l'icône de Planner et
 * le titre de l'écran, le contenu, puis les onglets du bas (ceux de l'application mobile,
 * mobile/src/app/(onglets)/). Dessiné, jamais capturé.
 */
import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { BatteryFull, CalendarDays, CircleUser, LayoutDashboard, ScanQrCode, SignalHigh, Wifi } from "lucide-react";
import adresseIcone from "../../../../../../vitrine/public/logo/planner-icone.svg";
import { C, POLICE } from "../charte";

/**
 * Les onglets montrés dans accueil.json (video.illustrations.mobile.onglets) : Tableau, Semaine, Scanner, Compte.
 */
export const ICONES_ONGLETS = [LayoutDashboard, CalendarDays, ScanQrCode, CircleUser];
/** Indices des onglets dans cette liste */
export const ONGLET = { tableau: 0, semaine: 1, scanner: 2, compte: 3 } as const;

type Props = {
  titre?: string;
  /** Libellés des onglets ; sans valeur, pas de barre d'onglets */
  onglets?: string[];
  /** Indice de l'onglet actif */
  actif?: number;
  /** Fond du contenu ; gris-fond par défaut, comme les écrans de l'application */
  fond?: string;
  /** Écran plein (caméra du scanner) : ni en-tête ni fond clair */
  plein?: boolean;
  children?: React.ReactNode;
};

export const EcranTelephone: React.FC<Props> = ({ titre, onglets, actif = 0, fond = C.grisFond, plein = false, children }) => (
  <AbsoluteFill style={{ fontFamily: POLICE, background: plein ? C.ecran : fond, color: C.encre, display: "flex", flexDirection: "column" }}>
    {/* Barre d'état : l'heure à gauche, réseau et batterie à droite, de part et d'autre de la caméra */}
    <div style={{ height: 52, padding: "16px 30px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 19, fontWeight: 600, color: plein ? C.blanc : C.encre }}>
      <span>08:30</span>
      <span style={{ display: "flex", gap: 6 }}>
        <SignalHigh size={20} strokeWidth={2.4} />
        <Wifi size={20} strokeWidth={2.4} />
        <BatteryFull size={22} strokeWidth={2} />
      </span>
    </div>

    {titre && !plein && (
      <div style={{ padding: "14px 24px 16px", display: "flex", alignItems: "center", gap: 12, background: C.blanc, borderBottom: `1px solid ${C.grisTrait}` }}>
        <Img src={adresseIcone} style={{ width: 36, height: 36 }} />
        <span style={{ fontSize: 25, fontWeight: 700, color: C.bleuNuit, letterSpacing: "-0.01em" }}>{titre}</span>
      </div>
    )}

    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>{children}</div>

    {onglets && (
      <div style={{ display: "flex", justifyContent: "space-around", padding: "12px 6px 22px", background: C.blanc, borderTop: `1px solid ${C.grisTrait}` }}>
        {onglets.map((libelle, i) => {
          const Icone = ICONES_ONGLETS[i % ICONES_ONGLETS.length];
          const couleur = i === actif ? C.bleu : C.grisTexte;
          return (
            <div key={libelle} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: couleur, fontSize: 13, fontWeight: i === actif ? 700 : 500, whiteSpace: "nowrap" }}>
              <Icone size={26} strokeWidth={i === actif ? 2.2 : 1.8} />
              {libelle}
            </div>
          );
        })}
      </div>
    )}
  </AbsoluteFill>
);
