// Îlot « Pourquoi Planner » (VIT-20, § 4.8). Avant l'hydratation, et sans JavaScript, il rend le tableau de repli reçu en enfants
// (TableauComparatif et CartesComparatif, VIT-14). Ensuite : un onglet par approche, la colonne choisie glisse à côté de celle
// de Planner et les cases apparaissent ligne après ligne ; le dernier onglet (« Critère ») montre un critère à la fois, Planner
// face aux quatre approches. Textes : ceux de comparer.json. Mouvement : `animate` de Motion, sans boucle ; aucun mouvement si le
// mouvement réduit est demandé.
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'motion';
import './comparatif-interactif.css';

const reduit = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fait entrer des éléments : fondu et glissement de 200 à 300 ms, avec un décalage par rang */
const entrer = (elements, decalage = 0.04) => {
  if (reduit() || !elements.length) return;
  animate(elements, { opacity: [0, 1], x: [16, 0] }, { duration: 0.25, delay: stagger(decalage), ease: 'easeOut' });
};

export default function ComparatifInteractif({ titre, critereLibelle, approches, lignes, children }) {
  const [pret, setPret] = useState(false);
  const [actif, setActif] = useState(1); // 1 à 4 : une approche ; 0 : le mode « Critère »
  const [ligne, setLigne] = useState(0);
  const zone = useRef(null);
  const onglets = useRef([]);
  useEffect(() => setPret(true), []);
  useEffect(() => {
    if (pret && zone.current) entrer(Array.from(zone.current.querySelectorAll('[data-entree]')));
  }, [pret, actif, ligne]);
  // Un vrai bloc autour du repli : un élément « display: contents » n'a pas de boîte, et client:visible ne le verrait jamais
  if (!pret) return <div className="comparatif-repli">{children}</div>;

  const ordre = [1, 2, 3, 4, 0];
  const nom = (i) => (i === 0 ? critereLibelle : approches[i]);
  const choisir = (i, focus) => {
    setActif(i);
    if (focus) onglets.current[ordre.indexOf(i)]?.focus();
  };
  const touche = (evenement, rang) => {
    const cibles = { ArrowRight: (rang + 1) % ordre.length, ArrowLeft: (rang + ordre.length - 1) % ordre.length, Home: 0, End: ordre.length - 1 };
    if (!(evenement.key in cibles)) return;
    evenement.preventDefault();
    choisir(ordre[cibles[evenement.key]], true);
  };

  const courante = lignes[ligne];
  return (
    <div className="comparatif-interactif">
      <div className="onglets" role="tablist" aria-label={titre}>
        {ordre.map((i, rang) => (
          <button key={i} ref={(n) => (onglets.current[rang] = n)} type="button" role="tab" id={`comparatif-onglet-${i}`}
            aria-selected={actif === i} aria-controls="comparatif-panneau" tabIndex={actif === i ? 0 : -1}
            onClick={() => choisir(i)} onKeyDown={(e) => touche(e, rang)}>{nom(i)}</button>
        ))}
      </div>
      <div id="comparatif-panneau" role="tabpanel" aria-labelledby={`comparatif-onglet-${actif}`} ref={zone}>
        {actif === 0 ? (
          <div>
            <label className="critere-choix">
              <span>{critereLibelle}</span>
              <select value={ligne} onChange={(e) => setLigne(Number(e.target.value))}>
                {lignes.map((l, i) => <option key={l.cle} value={i}>{l.critere}</option>)}
              </select>
            </label>
            <h3 aria-live="polite">{courante.critere}</h3>
            <dl className="cases">
              {courante.cases.map((c, i) => (
                <div key={i} className={i === 0 ? 'case planner' : 'case'} data-entree>
                  <dt>{approches[i]}</dt>
                  <dd><span className="mot">{c.mot}</span><span className="texte">{c.texte}</span></dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <div>
            <h3 aria-live="polite">{approches[0]} · {approches[actif]}</h3>
            <table>
              <thead>
                <tr><th scope="col">{critereLibelle}</th><th scope="col" className="planner">{approches[0]}</th><th scope="col">{approches[actif]}</th></tr>
              </thead>
              <tbody>
                {lignes.map((l) => (
                  <tr key={l.cle} data-entree>
                    <th scope="row">{l.critere}</th>
                    <td className="planner">{l.cases[0].mot}</td>
                    <td>{l.cases[actif].mot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
