import { Suspense } from 'react'
import { OracleCanvas } from './OracleCanvas'
import { TarotUI } from './TarotUI'
import { useTarotGame } from '../../hooks/useTarotGame'

export function TarotGame() {
  const {
    state,
    smokeLevel,
    expression,
    cards,
    cardMeanings,
    summary,
    drawPast,
    drawPresent,
    drawFuture,
    reset,
  } = useTarotGame()

  return (
    <div className="tarot-grid">
      <Suspense fallback={<div className="oracle-canvas oracle-canvas--loading">Summoning oracle…</div>}>
        <OracleCanvas smokeLevel={smokeLevel} expression={expression} />
      </Suspense>
      <TarotUI
        phase={state.phase}
        cards={cards}
        meanings={cardMeanings as Record<'past' | 'present' | 'future', string | undefined>}
        summary={summary}
        onDrawPast={drawPast}
        onDrawPresent={drawPresent}
        onDrawFuture={drawFuture}
        onReset={reset}
      />
    </div>
  )
}


