import { useEffect, useState } from 'react';
import type { Flashcard, Domain, DomainInfo } from '../data/types';
import { recordFlashcardReview } from '../utils/progress';

interface Props {
  cards: Flashcard[];
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

export default function Flashcards({ cards, domains }: Props) {
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [deck, setDeck] = useState<Flashcard[]>(cards);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knewCount, setKnewCount] = useState(0);
  const [learningCount, setLearningCount] = useState(0);

  // Shuffle client-side only, after hydration, so SSR and initial client markup match.
  useEffect(() => {
    setDeck(shuffle(cards));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetDeck(domain: Domain | 'all') {
    setSelectedDomain(domain);
    const pool = domain === 'all' ? cards : cards.filter((c) => c.domain === domain);
    setDeck(shuffle(pool));
    setIndex(0);
    setFlipped(false);
    setKnewCount(0);
    setLearningCount(0);
  }

  function mark(knew: boolean) {
    const card = deck[index];
    recordFlashcardReview(card.id, knew);
    if (knew) setKnewCount((c) => c + 1);
    else setLearningCount((c) => c + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  const done = index >= deck.length;
  const card = !done ? deck[index] : null;
  const domainInfo = card ? domains.find((d) => d.id === card.domain) : null;

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => resetDeck('all')}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
            selectedDomain === 'all'
              ? 'bg-[var(--color-aws-orange)] text-[var(--color-aws-navy)]'
              : 'bg-white/5 text-slate-200 hover:bg-white/10'
          }`}
        >
          🌎 All ({cards.length})
        </button>
        {domains.map((d) => (
          <button
            key={d.id}
            onClick={() => resetDeck(d.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              selectedDomain === d.id
                ? 'bg-[var(--color-aws-orange)] text-[var(--color-aws-navy)]'
                : 'bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            {d.icon} {d.shortLabel} ({cards.filter((c) => c.domain === d.id).length})
          </button>
        ))}
      </div>

      {done ? (
        <div className="card pop-in p-8 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-aws-orange)]">Deck complete</p>
          <p className="mt-2 text-4xl font-black text-white">
            {knewCount} / {deck.length}
          </p>
          <p className="mt-1 text-slate-300">cards you already knew 🎉</p>
          {learningCount > 0 && (
            <p className="mt-3 text-sm text-slate-400">{learningCount} still need review — shuffle again to drill them.</p>
          )}
          <button onClick={() => resetDeck(selectedDomain)} className="btn-primary mt-6 px-6 py-2.5">
            Shuffle & restart 🔀
          </button>
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
            <span>
              Card {index + 1} / {deck.length}
            </span>
            <span className="font-semibold text-[var(--color-aws-orange)]">
              {domainInfo?.icon} {domainInfo?.shortLabel}
            </span>
          </div>

          <button
            onClick={() => setFlipped((f) => !f)}
            className="card flex min-h-[220px] w-full flex-col items-center justify-center p-8 text-center transition hover:border-[var(--color-aws-orange)]/40"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              {flipped ? 'Answer' : 'Term / Concept'}
            </p>
            <p className="mt-4 text-lg font-semibold text-white sm:text-xl">{flipped ? card!.back : card!.front}</p>
            <p className="mt-6 text-xs text-slate-500">Tap card to {flipped ? 'flip back' : 'reveal answer'}</p>
          </button>

          {flipped ? (
            <div className="pop-in mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={() => mark(false)}
                className="rounded-xl border border-[var(--color-incorrect)]/40 bg-[var(--color-incorrect)]/10 py-3 font-semibold text-white transition hover:bg-[var(--color-incorrect)]/20"
              >
                😅 Still learning
              </button>
              <button
                onClick={() => mark(true)}
                className="rounded-xl border border-[var(--color-correct)]/40 bg-[var(--color-correct)]/10 py-3 font-semibold text-white transition hover:bg-[var(--color-correct)]/20"
              >
                ✅ I knew it
              </button>
            </div>
          ) : (
            <p className="mt-4 text-center text-sm text-slate-500">Think it through, then flip the card.</p>
          )}
        </>
      )}
    </div>
  );
}
