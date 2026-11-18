/** Icônes partagées entre le lanceur et le menu contextuel. */
import { CalendarMonth, School, People, Tune, Campaign, Quiz, LocalLibrary } from '@mui/icons-material';
const ICONES = { calendar: CalendarMonth, school: School, people: People, settings: Tune, campaign: Campaign, quiz: Quiz, library: LocalLibrary };
export default function IconeApplication({ nom, sx }) {
  const Icone = ICONES[nom] ?? CalendarMonth;
  return <Icone aria-hidden sx={sx} />;
}
