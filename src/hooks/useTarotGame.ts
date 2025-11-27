import { useMemo, useReducer } from 'react'
import {
  DrawnCard,
  evaluateReadingMood,
  getTimelineMeaning,
  pickRandomCards,
  ReadingMood,
  tarotDeck,
} from '../data/tarotCards'

export type TarotPhase = 'idle' | 'pastDrawn' | 'presentDrawn' | 'futureDrawn' | 'summary'

export type OracleExpression = 'neutral' | 'smile' | 'sad' | 'smirk'

type GameAction =
  | { type: 'DRAW_PAST' }
  | { type: 'DRAW_PRESENT' }
  | { type: 'DRAW_FUTURE' }
  | { type: 'RESET' }

export interface GameContext {
  drawnCards: {
    past?: DrawnCard
    present?: DrawnCard
    future?: DrawnCard
  }
  phase: TarotPhase
  deck: DrawnCard[]
  summary?: {
    mood: ReadingMood
    text: string
  }
  expression: OracleExpression
}

const smokeMap: Record<TarotPhase, 'A' | 'B' | 'C' | 'D'> = {
  idle: 'A',
  pastDrawn: 'B',
  presentDrawn: 'C',
  futureDrawn: 'D',
  summary: 'D',
}

const expressionByMood: Record<ReadingMood, OracleExpression> = {
  positive: 'smile',
  neutral: 'smirk',
  negative: 'sad',
}

const initialContext = (): GameContext => ({
  drawnCards: {},
  phase: 'idle',
  deck: pickRandomCards(tarotDeck),
  expression: 'neutral',
})

const tarotReducer = (state: GameContext, action: GameAction): GameContext => {
  switch (action.type) {
    case 'DRAW_PAST':
      if (state.phase !== 'idle') return state
      return {
        ...state,
        phase: 'pastDrawn',
        drawnCards: { ...state.drawnCards, past: state.deck[0] },
      }
    case 'DRAW_PRESENT':
      if (state.phase !== 'pastDrawn') return state
      return {
        ...state,
        phase: 'presentDrawn',
        drawnCards: { ...state.drawnCards, present: state.deck[1] },
      }
    case 'DRAW_FUTURE':
      if (state.phase !== 'presentDrawn') return state
      const futureDraw = state.deck[2]
      const finalCards: DrawnCard[] = [state.deck[0], state.deck[1], futureDraw]
      const mood = evaluateReadingMood(finalCards)
      return {
        ...state,
        phase: 'summary',
        drawnCards: { ...state.drawnCards, future: futureDraw },
        summary: {
          mood,
          text:
            mood === 'positive'
              ? 'The path ahead glows with possibility.'
              : mood === 'negative'
                ? 'Challenges gather—stay grounded and patient.'
                : 'Balance is in flux; discernment will steady you.',
        },
        expression: expressionByMood[mood],
      }
    case 'RESET':
      return initialContext()
    default:
      return state
  }
}

export const useTarotGame = () => {
  const [state, dispatch] = useReducer(tarotReducer, undefined, initialContext)

  const smokeLevel = smokeMap[state.phase]

  const cardMeanings = useMemo<Record<'past' | 'present' | 'future', string | undefined>>(() => {
    return {
      past: state.drawnCards.past && getTimelineMeaning(state.drawnCards.past, 'past'),
      present: state.drawnCards.present && getTimelineMeaning(state.drawnCards.present, 'present'),
      future: state.drawnCards.future && getTimelineMeaning(state.drawnCards.future, 'future'),
    }
  }, [state.drawnCards])

  return {
    state,
    smokeLevel,
    expression: state.expression,
    cards: state.drawnCards,
    cardMeanings,
    summary: state.summary,
    canDrawPast: state.phase === 'idle',
    canDrawPresent: state.phase === 'pastDrawn',
    canDrawFuture: state.phase === 'presentDrawn',
    drawPast: () => dispatch({ type: 'DRAW_PAST' }),
    drawPresent: () => dispatch({ type: 'DRAW_PRESENT' }),
    drawFuture: () => dispatch({ type: 'DRAW_FUTURE' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}


