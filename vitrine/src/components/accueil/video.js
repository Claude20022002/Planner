// Vidéo de l'accueil (VIT-08, plan § 6) : rien n'est chargé avant que la section arrive à l'écran ;
// la vidéo part seule, sans le son et une fois, quand la moitié est visible, et se met en pause hors
// de l'écran. Avec le mouvement réduit ou l'économie de données, rien ne part seul : l'image fixe
// reste, et le bouton « Lire la vidéo » la lance. Sur un écran de moins de 48rem, ou si la
// connexion est lente (slow-2g, 2g, 3g), rien ne part seul non plus. Une pause demandée n'est jamais reprise d'office.
// Fichier : MP4 720p par défaut ; WebM 1080p sur un écran d'au moins 1280 px qui lit le VP9 (question 7).
import { videoPeutPartirSeule } from './videoAutoplay.js';

const GRAND_ECRAN = '(min-width: 80rem)';
const MOBILE = '(max-width: 48rem)';
const VP9 = 'video/webm; codecs="vp9"';

const preparer = (figure) => {
  const video = figure.querySelector('video');
  const bouton = figure.querySelector('[data-commande]');
  const libelle = bouton.querySelector('[data-libelle]');
  const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const economie = navigator.connection?.saveData === true;
  const mobile = matchMedia(MOBILE).matches;
  const seule = videoPeutPartirSeule({
    reduit,
    economie,
    mobile,
    effectiveType: navigator.connection?.effectiveType,
  });
  let pauseVoulue = false; // la personne a mis en pause : on ne relance pas d'office
  let pauseHorsEcran = false;

  const etat = (nom) => {
    figure.dataset.etat = nom;
    const action = nom === 'lecture' ? 'pause' : nom === 'fin' ? 'revoir' : 'lire';
    libelle.textContent = action === 'lire' && mobile && figure.dataset.lireMobile
      ? figure.dataset.lireMobile
      : figure.dataset[action];
    bouton.querySelectorAll('[data-icone]').forEach((icone) => { icone.hidden = icone.dataset.icone !== action; });
  };

  const charger = () => {
    if (video.src) return;
    const grand = matchMedia(GRAND_ECRAN).matches && video.canPlayType(VP9) !== '';
    video.src = grand ? figure.dataset.webm : figure.dataset.mp4;
  };

  const lire = () => {
    charger();
    // Lecture refusée par le navigateur : le bouton reste « Lire la vidéo »
    video.play().catch(() => etat(video.ended ? 'fin' : 'attente'));
  };

  video.addEventListener('play', () => etat('lecture'));
  video.addEventListener('pause', () => { if (!video.ended) etat('pause'); });
  video.addEventListener('ended', () => etat('fin'));

  bouton.addEventListener('click', () => {
    if (figure.dataset.etat === 'lecture') {
      pauseVoulue = true;
      video.pause();
      return;
    }
    pauseVoulue = false;
    if (video.ended) video.currentTime = 0;
    lire();
  });

  bouton.hidden = false;
  etat('attente');

  if (!seule || !('IntersectionObserver' in window)) return;

  new IntersectionObserver(
    ([entree]) => {
      if (entree.isIntersecting) charger();
      const visible = entree.intersectionRatio >= 0.5;
      if (visible && !pauseVoulue && !video.ended && (figure.dataset.etat === 'attente' || pauseHorsEcran)) {
        pauseHorsEcran = false;
        lire();
      } else if (!visible && figure.dataset.etat === 'lecture') {
        pauseHorsEcran = true;
        video.pause();
      }
    },
    { threshold: [0, 0.5] },
  ).observe(figure.querySelector('.ecran'));
};

document.querySelectorAll('[data-video]').forEach(preparer);
