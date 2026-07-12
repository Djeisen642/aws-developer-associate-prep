import type { QuizQuestion } from '../types';
import { DEVELOPMENT_QUESTIONS } from './development';
import { SECURITY_QUESTIONS } from './security';
import { DEPLOYMENT_QUESTIONS } from './deployment';
import { TROUBLESHOOTING_QUESTIONS } from './troubleshooting';

export const QUESTIONS: QuizQuestion[] = [
  ...DEVELOPMENT_QUESTIONS,
  ...SECURITY_QUESTIONS,
  ...DEPLOYMENT_QUESTIONS,
  ...TROUBLESHOOTING_QUESTIONS,
];

export const QUESTIONS_BY_DOMAIN = QUESTIONS.reduce<Record<string, QuizQuestion[]>>((acc, q) => {
  (acc[q.domain] ??= []).push(q);
  return acc;
}, {});
