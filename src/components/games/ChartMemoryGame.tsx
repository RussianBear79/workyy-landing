import { useMemo, useState } from 'react'

const icons = [
  { label: 'Line Chart', icon: '📈' },
  { label: 'Bar Chart', icon: '📊' },
  { label: 'Scatter Plot', icon: '🟣' },
]

type MemoryCard = {
  id: string
  label: string
  icon: string
  flipped: boolean
  matched: boolean
}

const duplicateAndShuffle = (): MemoryCard[] => {
  const duplicated = [...icons, ...icons].map((card, idx) => ({
    ...card,
    id: `${card.label}-${idx}`,
    flipped: false,
    matched: false,
  }))

  for (let i = duplicated.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[duplicated[i], duplicated[j]] = [duplicated[j], duplicated[i]]
  }
  return duplicated
}

export const ChartMemoryGame = () => {
  const [cards, setCards] = useState<MemoryCard[]>(() => duplicateAndShuffle())
  const [opened, setOpened] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isBusy, setIsBusy] = useState(false)

  const matches = useMemo(() => cards.filter((card) => card.matched).length / 2, [cards])
  const totalPairs = icons.length

  const handleFlip = (index: number) => {
    if (isBusy) return
    if (cards[index].flipped || cards[index].matched) return

    const nextCards = cards.map((card, idx) => (idx === index ? { ...card, flipped: true } : card))
    const nextOpened = [...opened, index]
    setCards(nextCards)
    setOpened(nextOpened)

    if (nextOpened.length === 2) {
      setIsBusy(true)
      setMoves((prev) => prev + 1)
      setTimeout(() => {
        const [first, second] = nextOpened
        if (nextCards[first].label === nextCards[second].label) {
          setCards((prev) =>
            prev.map((card, idx) =>
              idx === first || idx === second ? { ...card, matched: true } : card
            )
          )
        } else {
          setCards((prev) =>
            prev.map((card, idx) =>
              idx === first || idx === second ? { ...card, flipped: false } : card
            )
          )
        }
        setOpened([])
        setIsBusy(false)
      }, 650)
    }
  }

  const resetGame = () => {
    setCards(duplicateAndShuffle())
    setOpened([])
    setMoves(0)
    setIsBusy(false)
  }

  return (
    <div className="surface-panel border border-[var(--color-border)] rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
        <p>
          Pairs found:{' '}
          <span className="font-semibold text-[var(--color-accent-primary)]">
            {matches}/{totalPairs}
          </span>
        </p>
        <p>
          Moves: <span className="font-semibold">{moves}</span>
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3" role="grid" aria-label="Chart memory game">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleFlip(idx)}
            disabled={card.matched}
            className={`aspect-square rounded-xl border border-[var(--color-border)] flex items-center justify-center text-2xl transition-smooth
            ${card.flipped || card.matched ? 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]' : 'bg-[var(--color-bg-surface)]/50 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)]'}
            ${card.matched ? 'ring-2 ring-[var(--color-accent-primary)]/60' : ''}`}
            aria-pressed={card.flipped || card.matched}
          >
            {card.flipped || card.matched ? (
              <span className="sr-only">{card.label}</span>
            ) : (
              <span className="sr-only">Hidden card</span>
            )}
            <span aria-hidden="true">{card.flipped || card.matched ? card.icon : '❔'}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <p>
          {matches === totalPairs
            ? 'You rebuilt the insight board!'
            : 'Match chart types to warm up your data brain.'}
        </p>
        <button
          onClick={resetGame}
          className="px-3 py-1 rounded-md border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)] transition-smooth text-xs"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

