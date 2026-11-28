// Commande des boucles de modules. Le fichier n'est chargé qu'au moment de lire.
import { videoPeutPartirSeule } from '../accueil/videoAutoplay.js';

function preparer(figure) {
  const ecran = figure.querySelector('[data-ecran]');
  const video = ecran.querySelector('video');
  const bouton = figure.querySelector('[data-commande]');
  const libelle = bouton.querySelector('[data-libelle]');
  const iconeLire = bouton.querySelector('[data-icone-lire]');
  const iconePause = bouton.querySelector('[data-icone-pause]');
  const mouvement = matchMedia('(prefers-reduced-motion: reduce)');
  const petitEcran = matchMedia('(width < 48rem)');
  let pauseVoulue = false;

  function commande(lecture) {
    libelle.textContent = lecture ? figure.dataset.pause : figure.dataset.lire;
    iconeLire.hidden = lecture;
    iconePause.hidden = !lecture;
  }

  function lire() {
    if (!video.hasAttribute('src')) video.src = figure.dataset.fichier;
    video.play().catch(() => commande(!video.paused));
  }

  video.addEventListener('play', () => commande(true));
  video.addEventListener('playing', () => { figure.dataset.imageVideo = ''; });
  video.addEventListener('pause', () => commande(false));
  video.addEventListener('error', () => {
    delete figure.dataset.imageVideo;
    // Le prochain clic permet de retenter le chargement après une erreur réseau.
    video.removeAttribute('src');
    video.load();
    commande(false);
  });

  bouton.addEventListener('click', () => {
    pauseVoulue = !video.paused;
    if (pauseVoulue) video.pause();
    else lire();
  });
  bouton.hidden = false;

  if (!('IntersectionObserver' in window)) return;
  new IntersectionObserver(([entree]) => {
    if (!entree.isIntersecting) {
      video.pause();
      return;
    }
    const connexion = navigator.connection;
    const lectureAutomatique = videoPeutPartirSeule({
      reduit: mouvement.matches,
      economie: connexion?.saveData,
      mobile: petitEcran.matches,
      effectiveType: connexion?.effectiveType,
    });
    if (entree.intersectionRatio >= 0.5 && !pauseVoulue && lectureAutomatique && video.paused) lire();
  }, { threshold: [0, 0.5] }).observe(ecran);
}

document.querySelectorAll('[data-boucle]').forEach(preparer);
