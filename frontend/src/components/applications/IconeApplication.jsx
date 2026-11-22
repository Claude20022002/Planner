/** Icônes Lucide partagées par le lanceur et le menu d’application. */
import { Bell, BookText, CalendarDays, GraduationCap, SlidersHorizontal, Sparkles, UsersRound } from 'lucide-react';
import ClocheAnimee from './icones/ClocheAnimee';
import LivreAnime from './icones/LivreAnime';
import CalendrierAnime from './icones/CalendrierAnime';
import DiplomeAnime from './icones/DiplomeAnime';
import ReglagesAnimes from './icones/ReglagesAnimes';
import EtincellesAnimees from './icones/EtincellesAnimees';
import PersonnesAnimees from './icones/PersonnesAnimees';

const ICONES = {
  calendar: [CalendarDays, CalendrierAnime],
  school: [GraduationCap, DiplomeAnime],
  people: [UsersRound, PersonnesAnimees],
  settings: [SlidersHorizontal, ReglagesAnimes],
  campaign: [Bell, ClocheAnimee],
  quiz: [Sparkles, EtincellesAnimees],
  library: [BookText, LivreAnime],
};

export default function IconeApplication({ nom, animee = false }) {
  const paire = ICONES[nom] ?? ICONES.calendar;
  const Icone = paire[animee ? 1 : 0];
  return <Icone aria-hidden focusable="false" size={22} strokeWidth={1.8} />;
}
