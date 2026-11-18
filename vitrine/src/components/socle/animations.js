// Animations du site vitrine, avec Motion (animate, inView, scroll) : apparition au défilement,
// image qui grandit en entrant dans l'écran, aiguilles du logo qui tournent. Rien ne bouge sans la
// classe « anime », posée par le gabarit seulement si le mouvement réduit n'est pas demandé.
import { animate, inView, scroll } from 'motion';

const COURBE = [0.22, 1, 0.36, 1];

/** Fondu et léger glissement, une seule fois par élément */
const apparitions = () =>
  inView(
    '[data-apparition]',
    (element) => {
      if (element.dataset.vu) return;
      element.dataset.vu = 'oui';
      const delai = Number(element.dataset.delai || 0);
      animate(element, { opacity: [0, 1], y: [28, 0] }, { duration: 0.9, delay: delai, ease: COURBE });
    },
    { margin: '0px 0px -12% 0px' },
  );

/** L'élément grandit pendant qu'il monte vers le milieu de l'écran */
const agrandissements = () =>
  document.querySelectorAll('[data-grandir]').forEach((element) => {
    scroll(animate(element, { scale: [0.88, 1] }, { ease: 'linear' }), {
      target: element,
      offset: ['start end', 'center center'],
    });
  });

/** Les aiguilles font deux tours, puis reviennent à la position du logo */
const tournerAiguilles = (logo) => {
  const minutes = logo.querySelector('.aiguille-minutes');
  const heures = logo.querySelector('.aiguille-heures');
  if (!minutes || !heures) return;
  animate(minutes, { rotate: [-720, 0] }, { duration: 2.4, ease: COURBE });
  animate(heures, { rotate: [-60, 0] }, { duration: 2.4, ease: COURBE });
};

/** Logos animés : au chargement, puis à chaque survol */
const logos = () =>
  document.querySelectorAll('[data-logo-anime]').forEach((logo) => {
    tournerAiguilles(logo);
    logo.addEventListener('pointerenter', () => tournerAiguilles(logo));
  });

if (document.documentElement.classList.contains('anime')) {
  window.__animations = true;
  apparitions();
  agrandissements();
  logos();
}
