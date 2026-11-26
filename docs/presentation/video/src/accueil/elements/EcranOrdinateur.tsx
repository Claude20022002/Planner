/**
 * Écran de l'application web dans le cadre d'ordinateur : à gauche, le rail des six applications
 * de Planner (frontend/src/i18n/applications.fr.js), l'application ouverte en bleu ; en haut, le
 * titre de l'écran. Le contenu vient dessous. Dessiné, jamais capturé.
 */
import React from "react";
import { AbsoluteFill, Img } from "remotion";
import { BookOpen, Building2, CalendarDays, Gamepad2, Megaphone, Users } from "lucide-react";
import adresseIcone from "../../../../../../vitrine/public/logo/planner-icone.svg";
import { C, POLICE } from "../charte";

/** Une icône par application, dans l'ordre de accueil.json (video.illustrations.applications) */
export const ICONES_APPLICATIONS = [CalendarDays, BookOpen, Users, Building2, Megaphone, Gamepad2];

type Props = {
  titre: string;
  /** Indice de l'application ouverte, dans ICONES_APPLICATIONS */
  application: number;
  /** Texte discret à droite du titre (semaine, classe) */
  detail?: string;
  /** Fond du contenu */
  fond?: string;
  children?: React.ReactNode;
};

export const EcranOrdinateur: React.FC<Props> = ({ titre, application, detail, fond = C.grisFond, children }) => (
  <AbsoluteFill style={{ fontFamily: POLICE, display: "flex", flexDirection: "row", background: fond, color: C.encre }}>
    <div style={{ width: 84, background: C.bleuNuit, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, paddingTop: 18 }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: C.blanc, display: "grid", placeItems: "center", marginBottom: 10 }}>
        <Img src={adresseIcone} style={{ width: 38, height: 38 }} />
      </div>
      {ICONES_APPLICATIONS.map((Icone, i) => (
        <div
          key={i}
          style={{ width: 52, height: 52, borderRadius: 14, display: "grid", placeItems: "center", background: i === application ? C.bleu : "transparent", color: i === application ? C.blanc : C.bleuClair }}
        >
          <Icone size={28} strokeWidth={1.9} />
        </div>
      ))}
    </div>

    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
      <div style={{ height: 70, padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: C.blanc, borderBottom: `1px solid ${C.grisTrait}` }}>
        <span style={{ fontSize: 26, fontWeight: 700, color: C.bleuNuit, letterSpacing: "-0.01em" }}>{titre}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 19, fontWeight: 500, color: C.grisTexte }}>
          {detail}
          <span style={{ width: 38, height: 38, borderRadius: "50%", background: C.bleuPale, border: `2px solid ${C.blanc}`, boxShadow: `0 0 0 2px ${C.bleuPale}` }} />
        </span>
      </div>
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>{children}</div>
    </div>
  </AbsoluteFill>
);
