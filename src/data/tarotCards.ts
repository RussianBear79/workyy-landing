export type TarotArcana = 'major' | 'minor'
export type TarotSuit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type ReadingMood = 'positive' | 'neutral' | 'negative'
export type CardOrientation = 'upright' | 'reversed'

export interface TarotCard {
  id: string
  name: string
  arcana: TarotArcana
  suit?: TarotSuit
  keywords: string[]
  upright: {
    meaningPast: string
    meaningPresent: string
    meaningFuture: string
    mood: ReadingMood
  }
  reversed: {
    meaningPast: string
    meaningPresent: string
    meaningFuture: string
    mood: ReadingMood
  }
}

export const tarotDeck: TarotCard[] = [
  {
    id: 'major-00-fool',
    name: 'The Fool',
    arcana: 'major',
    keywords: ['potential', 'journey', 'risk'],
    upright: {
      meaningPast: 'A fearless leap in your past set this entire arc in motion.',
      meaningPresent: 'Stay curious; a light heart keeps today’s path fluid.',
      meaningFuture: 'A doorway opens if you travel lightly and trust yourself.',
      mood: 'positive',
    },
    reversed: {
      meaningPast: 'Impulsive choices left loose threads behind.',
      meaningPresent: 'Check your footing—enthusiasm needs a little grounding.',
      meaningFuture: 'Pause before you leap or you may miss a crucial cue.',
      mood: 'neutral',
    },
  },
  {
    id: 'major-02-high-priestess',
    name: 'The High Priestess',
    arcana: 'major',
    keywords: ['intuition', 'mystery', 'inner voice'],
    upright: {
      meaningPast: 'You heeded a whisper others couldn’t hear.',
      meaningPresent: 'Listen inward; truth arrives in stillness.',
      meaningFuture: 'Secrets reveal themselves when you stay receptive.',
      mood: 'positive',
    },
    reversed: {
      meaningPast: 'A quiet warning was ignored, blurring hindsight.',
      meaningPresent: 'Noise drowns intuition. Reduce inputs to find clarity.',
      meaningFuture: 'Hidden knowledge stays veiled until you align with it.',
      mood: 'neutral',
    },
  },
  {
    id: 'major-13-death',
    name: 'Death',
    arcana: 'major',
    keywords: ['ending', 'rebirth', 'transition'],
    upright: {
      meaningPast: 'You shed something heavy to reclaim energy.',
      meaningPresent: 'Metamorphosis is underway—cooperate with it.',
      meaningFuture: 'Rebirth arrives after the last thread is released.',
      mood: 'neutral',
    },
    reversed: {
      meaningPast: 'Clinging delayed an inevitable ending.',
      meaningPresent: 'Stagnation sets in if you keep resisting change.',
      meaningFuture: 'A gentle push will be required to move ahead.',
      mood: 'negative',
    },
  },
  {
    id: 'minor-cups-ace',
    name: 'Ace of Cups',
    arcana: 'minor',
    suit: 'cups',
    keywords: ['emotion', 'intuition', 'offer'],
    upright: {
      meaningPast: 'A heartfelt opening in the past colors today’s hope.',
      meaningPresent: 'Compassion overflows—share the feeling.',
      meaningFuture: 'Expect new connection or inspiration to bloom.',
      mood: 'positive',
    },
    reversed: {
      meaningPast: 'Unspoken feelings created quiet distance.',
      meaningPresent: 'Emotions need tending before they spill over.',
      meaningFuture: 'Love appears but only if you unclog the channel.',
      mood: 'neutral',
    },
  },
  {
    id: 'minor-swords-ten',
    name: 'Ten of Swords',
    arcana: 'minor',
    suit: 'swords',
    keywords: ['closure', 'release', 'overwhelm'],
    upright: {
      meaningPast: 'A hard stop forced you to reinvent.',
      meaningPresent: 'The worst is cresting—exhale and let it pass.',
      meaningFuture: 'Clear skies appear once you accept the ending.',
      mood: 'negative',
    },
    reversed: {
      meaningPast: 'You avoided rock bottom but healing still lingers.',
      meaningPresent: 'Slowly rise; small motions rebuild strength.',
      meaningFuture: 'Recovery accelerates if you practice compassion.',
      mood: 'neutral',
    },
  },
  {
    id: 'minor-wands-six',
    name: 'Six of Wands',
    arcana: 'minor',
    suit: 'wands',
    keywords: ['victory', 'recognition', 'momentum'],
    upright: {
      meaningPast: 'Past wins taught you how to celebrate progress.',
      meaningPresent: 'Spotlight energy surrounds you—own it.',
      meaningFuture: 'Momentum carries you into a public triumph.',
      mood: 'positive',
    },
    reversed: {
      meaningPast: 'Recognition was delayed, breeding quiet doubt.',
      meaningPresent: 'You may be chasing external approval over truth.',
      meaningFuture: 'Realign intent so the right audience notices.',
      mood: 'neutral',
    },
  },
]

export interface DrawnCard {
  card: TarotCard
  orientation: CardOrientation
}

export const pickRandomCards = (deck: TarotCard[], allowReversed = true): DrawnCard[] => {
  const shuffled = [...deck].sort(() => Math.random() - 0.5)
  const draws = shuffled.slice(0, 3)
  return draws.map((card) => {
    const isReversed = allowReversed ? Math.random() > 0.5 : false
    return {
      card,
      orientation: isReversed ? 'reversed' : 'upright',
    }
  })
}

const moodWeights: Record<ReadingMood, number> = {
  positive: 1,
  neutral: 0,
  negative: -1,
}

export const evaluateReadingMood = (cards: DrawnCard[]): ReadingMood => {
  const total = cards.reduce((sum, draw) => {
    const meta = draw.card[draw.orientation]
    return sum + moodWeights[meta.mood]
  }, 0)

  if (total > 0) return 'positive'
  if (total < 0) return 'negative'
  return 'neutral'
}

export const getTimelineMeaning = (draw: DrawnCard, slot: 'past' | 'present' | 'future') => {
  const block = draw.card[draw.orientation]
  switch (slot) {
    case 'past':
      return block.meaningPast
    case 'present':
      return block.meaningPresent
    case 'future':
      return block.meaningFuture
  }
}



