import { useState, useEffect } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

type Difficulty = 'beginner' | 'analyst' | 'lead'

interface DifficultyConfig {
  budgetRange: [number, number]
  conversionRange: [number, number]
  cpcRange: [number, number]
  targetROI: number
  minConversions?: number
  maxBudget?: number
}

const difficultyConfigs: Record<Difficulty, DifficultyConfig> = {
  beginner: {
    budgetRange: [10, 200],
    conversionRange: [1, 8],
    cpcRange: [0.5, 3],
    targetROI: 1.2,
  },
  analyst: {
    budgetRange: [50, 500],
    conversionRange: [2, 10],
    cpcRange: [1, 5],
    targetROI: 1.5,
    minConversions: 100,
  },
  lead: {
    budgetRange: [100, 1000],
    conversionRange: [3, 12],
    cpcRange: [2, 8],
    targetROI: 2.0,
    minConversions: 200,
    maxBudget: 800,
  },
}

export const DecisionSimulator = () => {
  const { language } = useLanguage()
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner')
  const [budget, setBudget] = useState(40)
  const [conversion, setConversion] = useState(3.5)
  const [cpc, setCpc] = useState(2.0)
  const [hasRun, setHasRun] = useState(false)

  const config = difficultyConfigs[difficulty]

  // Reset values when difficulty changes
  useEffect(() => {
    setBudget(Math.round((config.budgetRange[0] + config.budgetRange[1]) / 2))
    setConversion((config.conversionRange[0] + config.conversionRange[1]) / 2)
    setCpc((config.cpcRange[0] + config.cpcRange[1]) / 2)
    setHasRun(false)
  }, [difficulty])

  const visitors = Math.round(budget * 1000 / cpc)
  const conversions = Math.round(visitors * (conversion / 100))
  const avgOrderValue = 42
  const revenue = conversions * avgOrderValue
  const roi = budget > 0 ? revenue / (budget * 1000) : 0

  // Calculate score (0-100)
  const calculateScore = (): number => {
    let score = 0
    
    // ROI component (60 points)
    if (roi >= config.targetROI) {
      score += 60
    } else if (roi >= config.targetROI * 0.8) {
      score += 40
    } else if (roi >= config.targetROI * 0.6) {
      score += 20
    }

    // Conversions component (if required)
    if (config.minConversions) {
      if (conversions >= config.minConversions) {
        score += 30
      } else if (conversions >= config.minConversions * 0.8) {
        score += 15
      }
    } else {
      score += 30 // Free points if no min requirement
    }

    // Budget constraint (if required)
    if (config.maxBudget) {
      if (budget <= config.maxBudget) {
        score += 10
      }
    } else {
      score += 10
    }

    return Math.min(100, score)
  }

  const score = hasRun ? calculateScore() : 0

  // Get feedback message
  const getFeedback = (): { message: string; type: 'success' | 'warning' | 'error' } => {
    if (!hasRun) {
      return { message: '', type: 'success' }
    }

    const roiMet = roi >= config.targetROI
    const conversionsMet = !config.minConversions || conversions >= config.minConversions
    const budgetMet = !config.maxBudget || budget <= config.maxBudget

    if (roiMet && conversionsMet && budgetMet) {
      return {
        message: language === 'en'
          ? 'Excellent! You\'re hitting all targets with strong ROI.'
          : 'Отлично! Вы достигаете всех целей с сильным ROI.',
        type: 'success',
      }
    }

    if (roiMet && !conversionsMet) {
      return {
        message: language === 'en'
          ? 'Good ROI, but you\'re missing target conversions. Try increasing budget or improving conversion rate.'
          : 'Хороший ROI, но вы не достигаете целевых конверсий. Попробуйте увеличить бюджет или улучшить конверсию.',
        type: 'warning',
      }
    }

    if (!roiMet && conversionsMet) {
      return {
        message: language === 'en'
          ? 'High conversions but ROI is weak. Try reducing spend or improving conversion efficiency.'
          : 'Высокие конверсии, но ROI слабый. Попробуйте снизить расходы или улучшить эффективность конверсии.',
        type: 'warning',
      }
    }

    if (!roiMet && !conversionsMet) {
      return {
        message: language === 'en'
          ? 'You\'re under budget but missing targets. Consider adjusting your strategy.'
          : 'Вы в рамках бюджета, но не достигаете целей. Рассмотрите корректировку стратегии.',
        type: 'error',
      }
    }

    return {
      message: language === 'en'
        ? 'Review your settings to optimize performance.'
        : 'Пересмотрите настройки для оптимизации производительности.',
      type: 'warning',
    }
  }

  const feedback = getFeedback()

  // Store best score
  useEffect(() => {
    if (hasRun && score > 0) {
      const key = `decision-simulator-best-${difficulty}`
      const currentBest = localStorage.getItem(key)
      if (!currentBest || score > parseInt(currentBest)) {
        localStorage.setItem(key, score.toString())
      }
    }
  }, [score, hasRun, difficulty])

  const bestScore = parseInt(localStorage.getItem(`decision-simulator-best-${difficulty}`) || '0')

  const handleRun = () => {
    setHasRun(true)
  }

  const locale = {
    en: {
      difficulty: 'Difficulty',
      beginner: 'Beginner',
      analyst: 'Analyst',
      lead: 'Lead',
      budget: 'Marketing Budget',
      conversion: 'Conversion Rate',
      cpc: 'Cost per Click',
      visitors: 'Visitors',
      conversions: 'Conversions',
      revenue: 'Revenue',
      roi: 'ROI',
      score: 'Score',
      bestScore: 'Best',
      run: 'Run Simulation',
      feedback: 'Feedback',
    },
    ru: {
      difficulty: 'Сложность',
      beginner: 'Начинающий',
      analyst: 'Аналитик',
      lead: 'Руководитель',
      budget: 'Маркетинговый бюджет',
      conversion: 'Конверсия',
      cpc: 'Стоимость клика',
      visitors: 'Посетителей',
      conversions: 'Конверсий',
      revenue: 'Выручка',
      roi: 'ROI',
      score: 'Оценка',
      bestScore: 'Лучший',
      run: 'Запустить симуляцию',
      feedback: 'Обратная связь',
    },
  }[language]

  return (
    <div className="surface-panel border border-[var(--color-border)] rounded-2xl p-6 flex flex-col gap-4">
      {/* Difficulty Selector */}
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">{locale.difficulty}</p>
        <div className="flex gap-2">
          {(['beginner', 'analyst', 'lead'] as Difficulty[]).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficulty(diff)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-smooth ${
                difficulty === diff
                  ? 'bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)]'
                  : 'bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)]/80'
              }`}
            >
              {locale[diff]}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-1">{locale.budget}</p>
        <input
          type="range"
          min={config.budgetRange[0]}
          max={config.budgetRange[1]}
          value={budget}
          onChange={(e) => {
            setBudget(Number(e.target.value))
            setHasRun(false)
          }}
          className="w-full accent-[var(--color-accent-primary)]"
        />
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{budget}K $</p>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-1">{locale.conversion}</p>
        <input
          type="range"
          min={config.conversionRange[0]}
          max={config.conversionRange[1]}
          step={0.1}
          value={conversion}
          onChange={(e) => {
            setConversion(Number(e.target.value))
            setHasRun(false)
          }}
          className="w-full accent-[var(--color-accent-secondary)]"
        />
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{conversion.toFixed(1)}%</p>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-1">{locale.cpc}</p>
        <input
          type="range"
          min={config.cpcRange[0]}
          max={config.cpcRange[1]}
          step={0.1}
          value={cpc}
          onChange={(e) => {
            setCpc(Number(e.target.value))
            setHasRun(false)
          }}
          className="w-full accent-[var(--color-accent-warm)]"
        />
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">${cpc.toFixed(2)}</p>
      </div>

      {/* Run Button */}
      <button
        onClick={handleRun}
        className="px-4 py-2 rounded-md bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)] font-semibold hover:opacity-90 transition-smooth"
      >
        {locale.run}
      </button>

      {/* Results */}
      {hasRun && (
        <div className="mt-2 space-y-3">
          <div>
            <p className="text-xs uppercase text-[var(--color-accent-primary)] tracking-[0.3em] mb-2">
              {locale.score}: {score}/100
            </p>
            {bestScore > 0 && (
              <p className="text-xs text-[var(--color-text-muted)]">
                {locale.bestScore}: {bestScore}/100
              </p>
            )}
          </div>
          <div className="surface-panel rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-[var(--color-text-muted)]">{locale.visitors}</p>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">{visitors.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-[var(--color-text-muted)]">{locale.conversions}</p>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">{conversions.toLocaleString()}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-[var(--color-text-muted)]">{locale.revenue}</p>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">${revenue.toLocaleString()}</p>
            </div>
            <div className="flex justify-between border-t border-[var(--color-border)] pt-2">
              <p className="text-sm text-[var(--color-text-muted)]">{locale.roi}</p>
              <p className={`text-lg font-bold ${
                roi >= config.targetROI
                  ? 'text-[var(--color-success)]'
                  : roi >= config.targetROI * 0.8
                  ? 'text-[var(--color-warning)]'
                  : 'text-[var(--color-danger)]'
              }`}>
                {roi.toFixed(2)}x
              </p>
            </div>
          </div>
          {feedback.message && (
            <div className={`p-3 rounded-lg border ${
              feedback.type === 'success'
                ? 'bg-[var(--color-success)]/20 border-[var(--color-success)]/30 text-[var(--color-success)]'
                : feedback.type === 'warning'
                ? 'bg-[var(--color-warning)]/20 border-[var(--color-warning)]/30 text-[var(--color-warning)]'
                : 'bg-[var(--color-danger)]/20 border-[var(--color-danger)]/30 text-[var(--color-danger)]'
            }`}>
              <p className="text-xs font-semibold mb-1">{locale.feedback}</p>
              <p className="text-xs">{feedback.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
