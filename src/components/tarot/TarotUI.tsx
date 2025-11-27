import { CardSlot } from './CardSlot'
import type { GameContext, TarotPhase } from '../../hooks/useTarotGame'

interface TarotUIProps {
  phase: TarotPhase
  cards: GameContext['drawnCards']
  meanings: Record<'past' | 'present' | 'future', string | undefined>
  summary?: GameContext['summary']
  onDrawPast: () => void
  onDrawPresent: () => void
  onDrawFuture: () => void
  onReset: () => void
}

const slotOrder: Array<{ label: 'Past' | 'Present' | 'Future'; key: keyof GameContext['drawnCards'] }> = [
  { label: 'Past', key: 'past' },
  { label: 'Present', key: 'present' },
  { label: 'Future', key: 'future' },
]

const primaryCopy = {
  idle: 'Draw the Past card to start',
  pastDrawn: 'Reveal the Present insight',
  presentDrawn: 'Draw the Future card to complete the reading',
  futureDrawn: 'Reading complete',
  summary: 'Reading complete',
} as const

const actionLabel = {
  idle: 'Draw Past',
  pastDrawn: 'Draw Present',
  presentDrawn: 'Draw Future',
  futureDrawn: 'Summarize',
  summary: 'Draw Again',
}

export function TarotUI({
  phase,
  cards,
  meanings,
  summary,
  onDrawPast,
  onDrawPresent,
  onDrawFuture,
  onReset,
}: TarotUIProps) {
  const activeCopy = primaryCopy[phase]
  const renderCTA = () => {
    switch (phase) {
      case 'idle':
        return (
          <button className="tarot-btn tarot-btn--primary" onClick={onDrawPast}>
            {actionLabel[phase]}
          </button>
        )
      case 'pastDrawn':
        return (
          <button className="tarot-btn tarot-btn--primary" onClick={onDrawPresent}>
            {actionLabel[phase]}
          </button>
        )
      case 'presentDrawn':
        return (
          <button className="tarot-btn tarot-btn--primary" onClick={onDrawFuture}>
            {actionLabel[phase]}
          </button>
        )
      case 'summary':
        return (
          <button className="tarot-btn tarot-btn--primary" onClick={onReset}>
            {actionLabel[phase]}
          </button>
        )
      default:
        return null
    }
  }

  return (
    <section className="tarot-ui">
      <header className="tarot-ui__header">
        <p className="tarot-ui__stage">{activeCopy}</p>
        {renderCTA()}
      </header>

      <div className="tarot-ui__slots">
        {slotOrder.map(({ label, key }) => (
          <CardSlot
            key={label}
            label={label}
            card={cards[key]}
            meaning={meanings[key]}
            isActive={
              (label === 'Past' && phase === 'idle') ||
              (label === 'Present' && phase === 'pastDrawn') ||
              (label === 'Future' && phase === 'presentDrawn')
            }
          />
        ))}
      </div>

      <article className="tarot-ui__copy">
        {summary ? (
          <>
            <p className="tarot-ui__mood">Overall mood: {summary.mood}</p>
            <p className="tarot-ui__summary">{summary.text}</p>
            <div className="tarot-ui__actions">
              <button className="tarot-btn tarot-btn--primary" onClick={onReset}>
                Draw Again
              </button>
            </div>
          </>
        ) : (
          <ul>
            {slotOrder.map(({ label, key }) => (
              <li key={label} className={cards[key] ? 'visible' : 'muted'}>
                <span>{label}:</span> {meanings[key] || 'Awaiting draw...'}
              </li>
            ))}
          </ul>
        )}
      </article>
    </section>
  )
}


