import { useMemo, useState } from 'react';
import type { QuizQuestion, Domain, DomainInfo } from '../data/types';
import { recordQuizAnswer } from '../utils/progress';

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

const LENGTH_OPTIONS = [5, 10, 15, 20];

export default function Quiz({ questions, domains }: Props) {
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [length, setLength] = useState(10);
  const [deck, setDeck] = useState<QuizQuestion[] | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [confettiKey, setConfettiKey] = useState(0);

  const available = useMemo(
    () => (selectedDomain === 'all' ? questions : questions.filter((q) => q.domain === selectedDomain)),
    [questions, selectedDomain],
  );

  function start() {
    const pool = shuffle(available).slice(0, Math.min(length, available.length));
    setDeck(pool);
    setIndex(0);
    setSelected(null);
    setScore(0);
    setWrongIds([]);
  }

  function choose(choiceIndex: number) {
    if (selected !== null || !deck) return;
    const question = deck[index];
    const correct = choiceIndex === question.correctIndex;
    setSelected(choiceIndex);
    if (correct) {
      setScore((s) => s + 1);
      setConfettiKey((k) => k + 1);
    } else {
      setWrongIds((ids) => [...ids, question.id]);
    }
    recordQuizAnswer(question.id, correct);
  }

  function next() {
    if (!deck) return;
    setSelected(null);
    setIndex((i) => i + 1);
  }

  function restart() {
    setDeck(null);
  }

  // --- Setup screen -------------------------------------------------
  if (!deck) {
    return (
      <div className="card pop-in mx-auto max-w-xl p-6 sm:p-8">
        <h2 className="text-2xl font-extrabold text-white">Quiz Mode</h2>
        <p className="mt-1 text-sm text-slate-300">
          Pick a domain and length, then go. Explanations follow every answer.
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
    );
  }

  // --- Results screen -------------------------------------------------
  if (index >= deck.length) {
    const pct = Math.round((score / deck.length) * 100);
    const verdict = pct >= 90 ? '🏆 Cert-ready!' : pct >= 70 ? '💪 Solid work' : pct >= 50 ? '📚 Keep grinding' : '🔁 Review time';
    return (
      <div className="card pop-in mx-auto max-w-xl p-6 text-center sm:p-8">
        <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-aws-orange)]">Quiz complete</p>
        <p className="mt-2 text-5xl font-black text-white">{pct}%</p>
        <p className="mt-1 text-slate-300">
          {score} / {deck.length} correct
        </p>
        <p className="mt-4 text-xl font-bold text-white">{verdict}</p>

        {wrongIds.length > 0 && (
          <p className="mt-4 text-sm text-slate-400">
            Missed: {wrongIds.length} question{wrongIds.length === 1 ? '' : 's'}. Check the cheat sheets for a refresher.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button onClick={start} className="btn-primary px-6 py-2.5">
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

  return (
    <div className="pop-in mx-auto max-w-xl" key={question.id}>
      <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
        <span>
          Question {index + 1} / {deck.length}
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
        {confettiKey > 0 && selected !== null && selected === question.correctIndex && (
          <Confetti key={confettiKey} />
        )}
        <h3 className="text-lg font-bold text-white sm:text-xl">{question.question}</h3>

        <div className="mt-5 flex flex-col gap-3">
          {question.choices.map((choice, i) => {
            const isCorrect = i === question.correctIndex;
            const isSelected = i === selected;
            let style = 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-100';
            if (selected !== null) {
              if (isCorrect) {
                style = 'border-[var(--color-correct)] bg-[var(--color-correct)]/15 text-white';
              } else if (isSelected) {
                style = 'border-[var(--color-incorrect)] bg-[var(--color-incorrect)]/15 text-white';
              } else {
                style = 'border-white/5 bg-white/5 text-slate-400';
              }
            }
            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={selected !== null}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition sm:text-base ${style} ${
                  isSelected && !isCorrect ? 'shake' : ''
                }`}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="pop-in mt-5 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-200">
            <p className="mb-1 font-bold text-white">
              {selected === question.correctIndex ? '✅ Correct!' : '❌ Not quite.'}
            </p>
            <p>{question.explanation}</p>
          </div>
        )}

        {selected !== null && (
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
