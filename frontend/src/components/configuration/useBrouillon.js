/** Le brouillon de la page « Configuration », tenu par l'écran (brouillon.js) ; rien n'est gardé dans le navigateur. */
import { useMemo, useReducer } from 'react';
import { BROUILLON_VIDE, compter, reduireBrouillon } from './brouillon';

export default function useBrouillon() {
    const [brouillon, envoyer] = useReducer(reduireBrouillon, BROUILLON_VIDE);
    const actions = useMemo(
        () => ({
            poser: (id, valeur, enVigueur) => envoyer({ type: 'poser', id, valeur, enVigueur }),
            revenir: (id) => envoyer({ type: 'revenir', id }),
            retirer: (id, remettre = false) => envoyer({ type: 'retirer', id, remettre }),
            vider: () => envoyer({ type: 'vider' }),
        }),
        []
    );
    return { brouillon, nombre: compter(brouillon), ...actions };
}
