/** Icônes Lucide du menu. Les icônes animées restent sur le lanceur. */
import { Bell, BookText, CalendarDays, GraduationCap, SlidersHorizontal, Sparkles, UsersRound } from 'lucide-react';

const ICONES = {
  calendar: CalendarDays,
  school: GraduationCap,
  people: UsersRound,
  settings: SlidersHorizontal,
  campaign: Bell,
  quiz: Sparkles,
  library: BookText,
};

export default function IconeApplication({ nom }) {
  const Icone = ICONES[nom] ?? ICONES.calendar;
  return <Icone aria-hidden focusable="false" size={22} strokeWidth={1.8} />;
}
