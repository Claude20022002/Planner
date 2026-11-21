/** Adaptateur de recherche Personnes : mêmes textes et mêmes propriétés. */
import RechercheGestion from '../gestion/RechercheGestion';
export default function RecherchePersonnes(props) { return <RechercheGestion {...props} namespace="personnes" />; }
