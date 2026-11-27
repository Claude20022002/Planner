// Vérifie la reprise du joueur quand l’accusé de réception d’une réponse se perd.
import { create, act } from 'react-test-renderer';
import { AppState } from 'react-native';
import useDirect from '../src/quiz/useDirect';
import { lireDirect, rejoindreDirect, repondreDirect } from '../src/api/donnees';

jest.mock('../src/api/donnees', () => ({
  lireDirect: jest.fn(),
  rejoindreDirect: jest.fn(),
  repondreDirect: jest.fn(),
}));

const question = { etape: 'question', index: 0, version: 2, question: { type: 'choix_unique' }, repondu: false };
let joueur;
let arbre;

function Joueur() {
  joueur = useDirect(42, 'Erreur', 'Connexion interrompue');
  return null;
}

beforeEach(() => {
  jest.resetAllMocks();
  jest.useFakeTimers();
  AppState.currentState = 'active';
  jest.spyOn(AppState, 'addEventListener').mockReturnValue({ remove: jest.fn() });
  global.IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  if (arbre) act(() => arbre.unmount());
  arbre = null;
  jest.restoreAllMocks();
  jest.useRealTimers();
  delete global.IS_REACT_ACT_ENVIRONMENT;
});

async function rejoindre() {
  rejoindreDirect.mockResolvedValue(question);
  await act(async () => { arbre = create(<Joueur />); });
}

test.each([true, false])('un accusé perdu déclenche une lecture complète avec réponse enregistrée = %s', async (repondu) => {
  await rejoindre();
  repondreDirect.mockRejectedValueOnce({ code: 'RESEAU' });
  lireDirect.mockRejectedValueOnce({ code: 'RESEAU' });
  lireDirect.mockResolvedValueOnce({ ...question, repondu });

  await act(async () => { await joueur.envoyer('A'); });
  expect(joueur.verification).toBe(true);
  expect(joueur.erreur).toBe('Connexion interrompue');
  await act(async () => { await joueur.envoyer('A'); });
  expect(repondreDirect).toHaveBeenCalledTimes(1);

  await act(async () => { jest.advanceTimersByTime(1000); });
  expect(lireDirect.mock.calls).toEqual([[42, undefined], [42, undefined]]);
  expect(joueur.verification).toBe(false);
  expect(joueur.vue.repondu).toBe(repondu);

  repondreDirect.mockResolvedValueOnce({ envoyee: true });
  await act(async () => { await joueur.envoyer('A'); });
  expect(repondreDirect).toHaveBeenCalledTimes(repondu ? 1 : 2);
});

test('une question fermée reste verrouillée après la lecture complète', async () => {
  await rejoindre();
  repondreDirect.mockRejectedValueOnce({ code: 'QUESTION_FERMEE' });
  lireDirect.mockResolvedValueOnce({ ...question, etape: 'correction', version: 3 });

  await act(async () => { await joueur.envoyer('A'); });
  expect(joueur.vue.etape).toBe('correction');
  await act(async () => { await joueur.envoyer('A'); });
  expect(repondreDirect).toHaveBeenCalledTimes(1);
});

test('un refus de groupe ne relance pas la demande d’entrée', async () => {
  rejoindreDirect.mockRejectedValueOnce({ statut: 403, message: 'Ce quiz est réservé à une autre classe' });
  await act(async () => { arbre = create(<Joueur />); });
  await act(async () => { jest.advanceTimersByTime(3000); });
  expect(rejoindreDirect).toHaveBeenCalledTimes(1);
  expect(joueur.erreur).toBe('Ce quiz est réservé à une autre classe');
});
