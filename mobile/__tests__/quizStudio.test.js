import { cheminQuiz, codeQuizSaisi, codeQuizScanne, destinationQuiz } from '../src/quiz/studio';

/** QR d'un quiz du Studio diffusé par l'enseignant (src/quiz/studio.js, R-10). */

test('QR de quiz du Studio reconnu ; appel, jeu, ClassQuiz et autres adresses ignorés', () => {
  expect(codeQuizScanne('https://planner.finadmintech.fr/quiz/code/KM7Q2X')).toBe('KM7Q2X');
  expect(codeQuizScanne('https://planner.finadmintech.fr/quiz/code/KM7Q2X?ref=qr')).toBe('KM7Q2X');
  expect(codeQuizScanne('https://planner.finadmintech.fr/jeux/session/KM7Q2X')).toBeNull();
  expect(codeQuizScanne('https://quiz.finadmintech.fr/play?pin=482913')).toBeNull();
  expect(codeQuizScanne('42.1739.abcDEF_ghiJKL-mnoPQR')).toBeNull();
  expect(codeQuizScanne('https://planner.finadmintech.fr/quiz/code/km7q2x')).toBeNull();
  expect(codeQuizScanne('https://planner.finadmintech.fr/quiz/code/KM7Q2X/autre')).toBeNull();
  expect(codeQuizScanne(null)).toBeNull();
});

test('le quiz s’ouvre sur le chemin du site, pas sur l’adresse lue', () => {
  expect(cheminQuiz('KM7Q2X')).toBe('/quiz/code/KM7Q2X');
});

test('la saisie normalise les minuscules et les espaces extérieurs', () => {
  expect(codeQuizSaisi(' km7q2x ')).toBe('KM7Q2X');
  expect(codeQuizSaisi('KM7-2X')).toBeNull();
  expect(codeQuizSaisi('KM7Q2XX')).toBeNull();
});

test('seul un mode confirmé ouvre le direct ou le navigateur', () => {
  expect(destinationQuiz({ mode: 'direct', id_session: 42 }, 'KM7Q2X')).toEqual({ ecran: '/quiz-direct/42' });
  expect(destinationQuiz({ mode: 'rythme', id_session: 42 }, 'KM7Q2X')).toEqual({ web: '/quiz/code/KM7Q2X' });
  expect(destinationQuiz({ mode: 'direct' }, 'KM7Q2X')).toBeNull();
  expect(destinationQuiz(null, 'KM7Q2X')).toBeNull();
});
