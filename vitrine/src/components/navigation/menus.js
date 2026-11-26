// Comportement de l'en-tête, chargé par EnTete.astro : le bouton qui replie la navigation sur téléphone (il n'apparaît qu'avec JavaScript),
// un seul menu ouvert à la fois, fermeture par Échap (le focus revient au titre du menu) et par un clic ailleurs.
// Menu repliable sur téléphone : le bouton n'apparaît qu'avec JavaScript
const entete = document.querySelector('.entete');
const bouton = entete?.querySelector('.menu-bouton');
if (entete && bouton) {
  bouton.addEventListener('click', () => {
    const ouvert = bouton.getAttribute('aria-expanded') === 'true';
    bouton.setAttribute('aria-expanded', String(!ouvert));
  });
}
// Un seul menu ouvert à la fois ; Échap et un clic ailleurs le ferment, Échap rend le focus à son titre.
const menus = () => Array.from(document.querySelectorAll('.entete details[open]'));
document.addEventListener('keydown', (evenement) => {
  if (evenement.key !== 'Escape') return;
  menus().forEach((menu) => {
    menu.removeAttribute('open');
    menu.querySelector('summary')?.focus();
  });
});
document.addEventListener('click', (evenement) => {
  menus().forEach((menu) => { if (!menu.contains(evenement.target)) menu.removeAttribute('open'); });
});
document.querySelectorAll('.entete details').forEach((menu) => {
  menu.addEventListener('toggle', () => {
    if (menu.open) menus().forEach((autre) => { if (autre !== menu) autre.removeAttribute('open'); });
  });
});
