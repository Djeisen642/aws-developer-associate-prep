import { useEffect, useMemo, useState } from 'react';
import type { QuizQuestion, Domain, DomainInfo } from '../data/types';
import { recordQuizAnswer, loadProgress, getDueQuestions } from '../utils/progress';

interface Props {
  questions: QuizQuestion[];
  domains: DomainInfo[];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function isCorrectAnswer(question: QuizQuestion, chosen: number[]): boolean {
  if (chosen.length !== question.correctIndexes.length) return false;
  const correctSet = new Set(question.correctIndexes);
  return chosen.every((c) => correctSet.has(c));
}

const LENGTH_OPTIONS = [5, 10, 15, 20, 30];
const SMART_BATCH_SIZE = 20;

export default function Quiz({ questions, domains }: Props) {
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [length, setLength] = useState(10);
  const [deck, setDeck] = useState<QuizQuestion[] | null>(null);
  const [smartSession, setSmartSession] = useState(false);
  const [dueCount, setDueCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [confettiKey, setConfettiKey] = useState(0);

  const available = useMemo(
    () => (selectedDomain === 'all' ? questions : questions.filter((q) => q.domain === selectedDomain)),
    [questions, selectedDomain],
  );

  // Refresh the "due for review" count whenever we're back on the setup screen
  // (including on first mount), and auto-launch Smart Review if linked to directly.
  useEffect(() => {
    if (deck) return;
    const due = getDueQuestions(loadProgress(), questions);
    setDueCount(due.length);
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'smart' && due.length > 0) {
      launch(due.slice(0, SMART_BATCH_SIZE), true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck]);

  function launch(pool: QuizQuestion[], isSmart: boolean) {
    setDeck(pool);
    setSmartSession(isSmart);
    setIndex(0);
    setPicked([]);
    setSubmitted(false);
    setScore(0);
    setWrongIds([]);
  }

  function start() {
    launch(shuffle(available).slice(0, Math.min(length, available.length)), false);
  }

  function startSmart() {
    const due = getDueQuestions(loadProgress(), questions);
    launch(due.slice(0, SMART_BATCH_SIZE), true);
  }

  function playAgain() {
    if (smartSession) startSmart();
    else start();
  }

  function finalize(question: QuizQuestion, chosen: number[]) {
    const correct = isCorrectAnswer(question, chosen);
    setSubmitted(true);
    if (correct) {
      setScore((s) => s + 1);
      setConfettiKey((k) => k + 1);
    } else {
      setWrongIds((ids) => [...ids, question.id]);
    }
    recordQuizAnswer(question.id, correct);
  }

  function toggleChoice(question: QuizQuestion, choiceIndex: number) {
    if (submitted || !deck) return;
    const needed = question.correctIndexes.length;

    if (needed === 1) {
      // Single-answer: clicking immediately locks in and reveals, as before.
      const chosen = [choiceIndex];
      setPicked(chosen);
      finalize(question, chosen);
      return;
    }

    // Multi-select: toggle, capped at the required count.
    setPicked((prev) => {
      if (prev.includes(choiceIndex)) return prev.filter((i) => i !== choiceIndex);
      if (prev.length >= needed) return prev;
      return [...prev, choiceIndex];
    });
  }

  function submitMulti(question: QuizQuestion) {
    if (submitted || picked.length !== question.correctIndexes.length) return;
    finalize(question, picked);
  }

  function next() {
    if (!deck) return;
    setPicked([]);
    setSubmitted(false);
    setIndex((i) => i + 1);
  }

  function restart() {
    setDeck(null);
  }

  // --- Setup screen -------------------------------------------------
  if (!deck) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="card pop-in border-[var(--color-aws-orange)]/30 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <h2 className="text-xl font-extrabold text-white">Smart Review</h2>
          </div>
          <p className="mt-1 text-sm text-slate-300">
            Uses spaced repetition: questions you've missed (or haven't seen in a while) resurface, mixed across
            domains, while ones you know well fade into the background.
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--color-aws-orange)]">
            {dueCount > 0 ? `${dueCount} question${dueCount === 1 ? '' : 's'} due right now` : "You're all caught up"}
          </p>
          <button
            onClick={startSmart}
            disabled={dueCount === 0}
            className="btn-primary mt-4 w-full py-3 text-base disabled:cursor-not-allowed disabled:opacity-40"
          >
            {dueCount > 0 ? `Start Smart Review (${Math.min(dueCount, SMART_BATCH_SIZE)}) 🧠` : 'Nothing due — nice! ✅'}
          </button>
        </div>

        <div className="card pop-in mt-6 p-6 sm:p-8">
          <h2 className="text-xl font-extrabold text-white">Practice by domain</h2>
          <p className="mt-1 text-sm text-slate-300">
            Pick a domain and length, then go. Some questions ask you to select more than one answer, just like the
            real exam.
          </p>

          <div className="mt-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">Domain</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDomain('all')}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                  selectedDomain === 'all'
                    ? 'bg-[var(--color-aws-orange)] text-[var(--color-aws-navy)]'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10'
                }`}
              >
                🌎 All domains
              </button>
              {domains.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDomain(d.id)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    selectedDomain === d.id
                      ? 'bg-[var(--color-aws-orange)] text-[var(--color-aws-navy)]'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {d.icon} {d.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">How many questions?</p>
            <div className="flex flex-wrap gap-2">
              {LENGTH_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setLength(n)}
                  className={`h-10 w-14 rounded-lg text-sm font-bold transition ${
                    length === n
                      ? 'bg-[var(--color-aws-orange)] text-[var(--color-aws-navy)]'
                      : 'bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-400">{available.length} questions available in this domain.</p>

          <button
            onClick={start}
            disabled={available.length === 0}
            className="btn-primary mt-6 w-full py-3 text-base disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start quiz 🚀
          </button>
        </div>
      </div>
    );
  }

  // --- Results screen -------------------------------------------------
  if (index >= deck.length) {
    const pct = Math.round((score / deck.length) * 100);
    const verdict = pct >= 90 ? '🏆 Cert-ready!' : pct >= 70 ? '💪 Solid work' : pct >= 50 ? '📚 Keep grinding' : '🔁 Review time';
    return (
      <div className="card pop-in mx-auto max-w-xl p-6 text-center sm:p-8">
        <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-aws-orange)]">
          {smartSession ? '🧠 Review complete' : 'Quiz complete'}
        </p>
        <p className="mt-2 text-5xl font-black text-white">{pct}%</p>
        <p className="mt-1 text-slate-300">
          {score} / {deck.length} correct
        </p>
        <p className="mt-4 text-xl font-bold text-white">{verdict}</p>

        {smartSession ? (
          <p className="mt-4 text-sm text-slate-400">
            {score > 0 && `${score} correct answer${score === 1 ? '' : 's'} just got pushed further out. `}
            {wrongIds.length > 0 &&
              `${wrongIds.length} miss${wrongIds.length === 1 ? '' : 'es'} will come back around soon.`}
          </p>
        ) : (
          wrongIds.length > 0 && (
            <p className="mt-4 text-sm text-slate-400">
              Missed: {wrongIds.length} question{wrongIds.length === 1 ? '' : 's'}. Check the cheat sheets for a refresher.
            </p>
          )
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button onClick={playAgain} className="btn-primary px-6 py-2.5">
            Play again 🔁
          </button>
          <button
            onClick={restart}
            className="rounded-xl bg-white/5 px-6 py-2.5 font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Change settings
          </button>
        </div>
      </div>
    );
  }

  // --- Question screen -------------------------------------------------
  const question = deck[index];
  const domainInfo = domains.find((d) => d.id === question.domain);
  const needed = question.correctIndexes.length;
  const isMulti = needed > 1;
  const correctSet = new Set(question.correctIndexes);
  const correct = submitted && isCorrectAnswer(question, picked);

  return (
    <div className="pop-in mx-auto max-w-xl" key={question.id}>
      <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
        <span>
          {smartSession && '🧠 '}Question {index + 1} / {deck.length}
        </span>
        <span className="font-semibold text-[var(--color-aws-orange)]">
          {domainInfo?.icon} {domainInfo?.shortLabel}
        </span>
      </div>
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[var(--color-aws-orange)] transition-all"
          style={{ width: `${(index / deck.length) * 100}%` }}
        />
      </div>

      <div className="card relative overflow-hidden p-6 sm:p-8">
        {confettiKey > 0 && correct && <Confetti key={confettiKey} />}

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-white sm:text-xl">{question.question}</h3>
        </div>
        {isMulti && (
          <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[var(--color-aws-orange)]">
            Select {needed} answers {!submitted && `(${picked.length}/${needed} chosen)`}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-3">
          {question.choices.map((choice, i) => {
            const isCorrectChoice = correctSet.has(i);
            const isPicked = picked.includes(i);
            const disableUnpicked = isMulti && !submitted && !isPicked && picked.length >= needed;

            let style = 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-100';
            if (submitted) {
              if (isCorrectChoice) {
                style = 'border-[var(--color-correct)] bg-[var(--color-correct)]/15 text-white';
              } else if (isPicked) {
                style = 'border-[var(--color-incorrect)] bg-[var(--color-incorrect)]/15 text-white';
              } else {
                style = 'border-white/5 bg-white/5 text-slate-400';
              }
            } else if (isPicked) {
              style = 'border-[var(--color-aws-orange)] bg-[var(--color-aws-orange)]/10 text-white';
            }

            return (
              <button
                key={i}
                onClick={() => toggleChoice(question, i)}
                disabled={submitted || disableUnpicked}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition sm:text-base ${style} ${
                  submitted && isPicked && !isCorrectChoice ? 'shake' : ''
                } ${disableUnpicked ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                {isMulti && (
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs ${
                      isPicked || (submitted && isCorrectChoice)
                        ? 'border-current bg-current/20'
                        : 'border-slate-500'
                    }`}
                  >
                    {(isPicked || (submitted && isCorrectChoice)) && '✓'}
                  </span>
                )}
                <span>{choice}</span>
              </button>
            );
          })}
        </div>

        {isMulti && !submitted && (
          <button
            onClick={() => submitMulti(question)}
            disabled={picked.length !== needed}
            className="btn-primary mt-5 w-full py-3 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit answer
          </button>
        )}

        {submitted && (
          <div className="pop-in mt-5 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-200">
            <p className="mb-1 font-bold text-white">{correct ? '✅ Correct!' : '❌ Not quite.'}</p>
            <p>{question.explanation}</p>
          </div>
        )}

        {submitted && (
          <button onClick={next} className="btn-primary mt-5 w-full py-3">
            {index + 1 === deck.length ? 'See results' : 'Next question →'}
          </button>
        )}
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.2,
        color: ['#ff9900', '#22c55e', '#38bdf8', '#f472b6'][i % 4],
        size: 6 + Math.random() * 6,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
