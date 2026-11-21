/** Livre animé, adapté de lucide-animated (book-text.tsx, MIT). */
import CadreIcone from './CadreIcone';

const LIVRE = { repos: { rotate: 0 }, survol: { rotate: [0, -7, 5, 0] } };

export default function LivreAnime(props) {
  return (
    <CadreIcone {...props} variants={LIVRE}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20M8 11h8M8 7h6" />
    </CadreIcone>
  );
}
