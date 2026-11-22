/** Adaptateur Personnes : conserve les clés de comptes et les messages du pilote. */
import ListeGestion from '../gestion/ListeGestion';
export default function ListePersonnes(props) {
  return <ListeGestion {...props} cleLigne={(ligne) => ligne.id_user} namespace="personnes" />;
}
