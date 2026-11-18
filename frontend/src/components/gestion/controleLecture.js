/** Garde les seules réponses correspondant au dernier chargement demandé. */
export function creerControleLecture() {
  let generation = 0;
  return {
    commencer() { const courante = ++generation; return () => courante === generation; },
    invalider() { generation += 1; },
  };
}
