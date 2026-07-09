import { useEffect, useState } from 'react';
import type { DomainInfo, QuizQuestion } from '../data/types';
import {
  loadProgress,
  computeStreak,
  computeDomainStats,
  resetProgress,
  type ProgressState,
  type DomainStats,
} from '../utils/progress';

interface Props {
  domains: DomainInfo[];
  questions: QuizQuestion[];
  totalFlashcards: number;
}

export default function ProgressDashboard({ domains, questions, totalFlashcards }: Props) {
  const [state, setState] = useState<ProgressState | null>(null);

  useEffect(() => {
    setState(loadProgress());
  }, []);

  if (!state) {
    return <div className="mx-auto max-w-3xl text-center text-slate-400">Loading your progress…</div>;
  }

  const questionsByDomain = domains.reduce<Record<string, QuizQuestion[]>>((acc, d) => {
    acc[d.id] = questions.filter((q) => q.domain === d.id);
    return acc;
  }, {});
  const domainStats: DomainStats[] = computeDomainStats(state, questionsByDomain);

  const totalAttempted = Object.keys(state.quiz).length;
  const totalCorrect = Object.values(state.quiz).filter((r) => r.lastCorrect).length;
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const streak = computeStreak(state.sessionDates);

  const cardsReviewed = Object.keys(state.flashcards).length;
  const cardsKnown = Object.values(state.flashcards).filter((r) => r.lastKnew).length;

  const weakest = [...domainStats]
    .filter((d) => d.attempted > 0)
    .sort((a, b) => a.accuracy - b.accuracy)[0];

  function handleReset() {
    if (window.confirm('Reset all quiz and flashcard progress? This cannot be undone.')) {
      setState(resetProgress());
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="Day streak" value={`${streak} 🔥`} />
        <StatTile label="Quiz accuracy" value={totalAttempted > 0 ? `${overallAccuracy}%` : '—'} />
        <StatTile label="Questions seen" value={`${totalAttempted} / ${questions.length}`} />
        <StatTile
          label="Cards known"
          value={cardsReviewed > 0 ? `${cardsKnown} / ${cardsReviewed}` : `0 / ${totalFlashcards}`}
        />
      </div>

      {weakest && (
        <div className="card pop-in mt-6 flex items-center gap-4 p-5">
          <span className="text-3xl">🎯</span>
          <div>
            <p className="font-bold text-white">Focus area: {domains.find((d) => d.id === weakest.domain)?.label}</p>
            <p className="text-sm text-slate-400">
              Currently at {weakest.accuracy}% accuracy — drill this domain in Quiz Mode.
            </p>
          </div>
        </div>
      )}

      <div className="card mt-6 p-5 sm:p-6">
        <h3 className="font-bold text-white">Domain mastery</h3>
        <div className="mt-4 flex flex-col gap-4">
          {domainStats.map((d) => {
            const info = domains.find((x) => x.id === d.domain)!;
            return (
              <div key={d.domain}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">
                    {info.icon} {info.label}
                  </span>
                  <span className="text-slate-400">
                    {d.attempted > 0 ? `${d.accuracy}% · ${d.attempted}/${d.total} attempted` : 'Not started'}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${d.attempted > 0 ? d.accuracy : 0}%`,
                      backgroundColor: info.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {(totalAttempted > 0 || cardsReviewed > 0) && (
        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
          <p>Progress is stored locally in your browser — nothing leaves your device.</p>
          <button onClick={handleReset} className="font-semibold text-slate-400 underline decoration-dotted hover:text-slate-200">
            Reset progress
          </button>
        </div>
      )}

      {totalAttempted === 0 && cardsReviewed === 0 && (
        <p className="mt-6 text-center text-sm text-slate-400">
          No activity yet — hit Quiz Mode or Flashcards to start building your stats!
        </p>
      )}
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4 text-center">
      <p className="text-2xl font-black text-white sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
    </div>
  );
}
