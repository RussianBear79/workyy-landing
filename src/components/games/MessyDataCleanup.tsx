import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

type Step = 1 | 2 | 3
type Action = string

interface DataRow {
  id: number
  week: string
  value: number | null
  category: string
  status: 'ok' | 'missing' | 'outlier' | 'inconsistent'
}

const initialData: DataRow[] = [
  { id: 1, week: 'Week 1', value: 120, category: 'United States', status: 'ok' },
  { id: 2, week: 'Week 2', value: 138, category: 'United States', status: 'ok' },
  { id: 3, week: 'Week 3', value: null, category: 'US', status: 'missing' },
  { id: 4, week: 'Week 4', value: 860, category: 'United States', status: 'outlier' },
  { id: 5, week: 'Week 5', value: 160, category: 'USA', status: 'inconsistent' },
  { id: 6, week: 'Week 6', value: null, category: 'United States', status: 'missing' },
  { id: 7, week: 'Week 7', value: 145, category: 'United States', status: 'ok' },
  { id: 8, week: 'Week 8', value: 920, category: 'US', status: 'outlier' },
  { id: 9, week: 'Week 9', value: 152, category: 'United States', status: 'ok' },
  { id: 10, week: 'Week 10', value: null, category: 'United States', status: 'missing' },
]

const stepActions: Record<Step, Action[]> = {
  1: [
    'Drop rows with missing values',
    'Fill with mean',
    'Fill with median',
    'Fill with most frequent',
  ],
  2: [
    'Cap outliers (5th-95th percentile)',
    'Remove outliers',
    'Log transform',
    'Keep as is',
  ],
  3: [
    'Normalize category labels',
    'Merge similar categories',
    'Create "Other" category',
    'Keep as is',
  ],
}

const correctActions: Record<Step, Action> = {
  1: 'Fill with median',
  2: 'Cap outliers (5th-95th percentile)',
  3: 'Normalize category labels',
}

export const MessyDataCleanup = () => {
  const { language } = useLanguage()
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState<DataRow[]>(initialData)
  const [selectedAction, setSelectedAction] = useState<Action | null>(null)
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set())

  const locale = {
    en: {
      title: 'Data Cleanup Wizard',
      step1: 'Step 1: Missing Values',
      step2: 'Step 2: Outliers',
      step3: 'Step 3: Categories',
      apply: 'Apply',
      next: 'Next Step',
      reset: 'Reset',
      summary: 'Summary',
      cleaned: 'You cleaned',
      missingValues: 'missing values',
      reduced: 'reduced',
      outliers: 'outliers',
      fixed: 'fixed',
      inconsistent: 'inconsistent categories',
      correct: 'Correct!',
      incorrect: 'Try again',
      hint: 'Hint',
    },
    ru: {
      title: 'Мастер очистки данных',
      step1: 'Шаг 1: Пропущенные значения',
      step2: 'Шаг 2: Выбросы',
      step3: 'Шаг 3: Категории',
      apply: 'Применить',
      next: 'Следующий шаг',
      reset: 'Сбросить',
      summary: 'Итог',
      cleaned: 'Вы очистили',
      missingValues: 'пропущенных значений',
      reduced: 'уменьшили',
      outliers: 'выбросов',
      fixed: 'исправили',
      inconsistent: 'непоследовательных категорий',
      correct: 'Правильно!',
      incorrect: 'Попробуйте ещё раз',
      hint: 'Подсказка',
    },
  }[language]

  const calculateStats = () => {
    const missing = data.filter((r) => r.status === 'missing').length
    const outliers = data.filter((r) => r.status === 'outlier').length
    const inconsistent = data.filter((r) => r.status === 'inconsistent').length
    return { missing, outliers, inconsistent }
  }

  const handleApply = () => {
    if (!selectedAction) return

    const isCorrect = selectedAction === correctActions[step]

    if (isCorrect) {
      let newData = [...data]

      if (step === 1) {
        // Fill missing with median
        const values = newData.filter((r) => r.value !== null).map((r) => r.value as number)
        const median = values.sort((a, b) => a - b)[Math.floor(values.length / 2)]
        newData = newData.map((row) =>
          row.status === 'missing' ? { ...row, value: median, status: 'ok' } : row
        )
      } else if (step === 2) {
        // Cap outliers
        const values = newData.filter((r) => r.value !== null).map((r) => r.value as number)
        const sorted = [...values].sort((a, b) => a - b)
        const p5 = sorted[Math.floor(sorted.length * 0.05)]
        const p95 = sorted[Math.floor(sorted.length * 0.95)]
        newData = newData.map((row) => {
          if (row.status === 'outlier' && row.value !== null) {
            const capped = Math.max(p5, Math.min(p95, row.value))
            return { ...row, value: capped, status: 'ok' }
          }
          return row
        })
      } else if (step === 3) {
        // Normalize categories
        newData = newData.map((row) => {
          if (row.status === 'inconsistent') {
            return { ...row, category: 'United States', status: 'ok' }
          }
          return row
        })
      }

      setData(newData)
      setCompletedSteps(new Set([...completedSteps, step]))
      setFeedback({
        message: locale.correct,
        type: 'success',
      })
    } else {
      setFeedback({
        message: locale.incorrect,
        type: 'error',
      })
    }
  }

  const handleNext = () => {
    if (step < 3) {
      setStep((s) => (s + 1) as Step)
      setSelectedAction(null)
      setFeedback(null)
    }
  }

  const handleReset = () => {
    setData(initialData)
    setStep(1)
    setSelectedAction(null)
    setFeedback(null)
    setCompletedSteps(new Set())
  }

  const stats = calculateStats()
  const progress = (completedSteps.size / 3) * 100
  const isComplete = completedSteps.size === 3

  return (
    <div className="surface-panel border border-[var(--color-border)] rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">{locale.title}</h3>
        {/* Progress Bar */}
        <div className="w-full bg-[var(--color-bg-surface)] rounded-full h-2 mb-2">
          <div
            className="bg-[var(--color-accent-primary)] h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-[var(--color-text-muted)]">
          {Math.round(progress)}% {language === 'en' ? 'complete' : 'завершено'}
        </p>
      </div>

      {/* Stepper */}
      <div className="flex justify-between mb-6 text-xs">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 text-center">
            <div
              className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center font-semibold ${
                completedSteps.has(s as Step)
                  ? 'bg-[var(--color-success)] text-[var(--color-text-on-accent)]'
                  : s === step
                  ? 'bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)]'
                  : 'bg-[var(--color-bg-surface)] text-[var(--color-text-muted)]'
              }`}
            >
              {s}
            </div>
            <p className="text-[var(--color-text-muted)]">
              {locale[`step${s}` as keyof typeof locale]}
            </p>
          </div>
        ))}
      </div>

      {isComplete ? (
        <div className="text-center space-y-4">
          <p className="text-2xl font-bold text-[var(--color-success)] mb-4">
            {language === 'en' ? 'All done!' : 'Готово!'}
          </p>
          <div className="surface-panel rounded-lg p-4 space-y-2">
            <p className="text-sm font-semibold mb-2">{locale.summary}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {locale.cleaned} {stats.missing} {locale.missingValues}, {locale.reduced} {stats.outliers}{' '}
              {locale.outliers}, {locale.fixed} {stats.inconsistent} {locale.inconsistent}.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-md bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)] font-semibold hover:opacity-90 transition-smooth"
          >
            {locale.reset}
          </button>
        </div>
      ) : (
        <>
          {/* Action Selection */}
          <div className="mb-4">
            <p className="text-sm text-[var(--color-text-muted)] mb-3">
              {language === 'en'
                ? `Choose the best action for ${locale[`step${step}` as keyof typeof locale].toLowerCase()}:`
                : `Выберите лучшее действие для ${locale[`step${step}` as keyof typeof locale].toLowerCase()}:`}
            </p>
            <div className="space-y-2">
              {stepActions[step].map((action) => (
                <label
                  key={action}
                  className={`block px-4 py-3 rounded-lg border cursor-pointer transition-smooth ${
                    selectedAction === action
                      ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10'
                      : 'border-[var(--color-border)] hover:border-[var(--color-accent-primary)]/40'
                  }`}
                >
                  <input
                    type="radio"
                    name={`step-${step}`}
                    value={action}
                    checked={selectedAction === action}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-[var(--color-text-primary)]">{action}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mb-4 p-3 rounded-lg border ${
                feedback.type === 'success'
                  ? 'bg-[var(--color-success)]/20 border-[var(--color-success)]/30 text-[var(--color-success)]'
                  : 'bg-[var(--color-danger)]/20 border-[var(--color-danger)]/30 text-[var(--color-danger)]'
              }`}
            >
              <p className="text-sm font-semibold">{feedback.message}</p>
            </div>
          )}

          {/* Data Preview */}
          <div className="mb-4">
            <p className="text-xs text-[var(--color-text-muted)] mb-2">
              {language === 'en' ? 'Data Preview' : 'Превью данных'}
            </p>
            <div className="surface-panel rounded-lg p-2 max-h-48 overflow-y-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                    <th className="text-left pb-1">{language === 'en' ? 'Week' : 'Неделя'}</th>
                    <th className="text-left pb-1">{language === 'en' ? 'Value' : 'Значение'}</th>
                    <th className="text-left pb-1">{language === 'en' ? 'Category' : 'Категория'}</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-text-secondary)]">
                  {data.map((row) => (
                    <tr
                      key={row.id}
                      className={`border-b border-[var(--color-border)] ${
                        row.status !== 'ok' ? 'opacity-60' : ''
                      }`}
                    >
                      <td className="py-1">{row.week}</td>
                      <td className="py-1">
                        {row.value ?? '—'}
                        {row.status === 'outlier' && (
                          <span className="ml-1 text-[var(--color-warning)]">⚠</span>
                        )}
                        {row.status === 'missing' && (
                          <span className="ml-1 text-[var(--color-danger)]">✕</span>
                        )}
                      </td>
                      <td className="py-1">
                        {row.category}
                        {row.status === 'inconsistent' && (
                          <span className="ml-1 text-[var(--color-warning)]">⚠</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleApply}
              disabled={!selectedAction}
              className="flex-1 px-4 py-2 rounded-md bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)] font-semibold hover:opacity-90 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {locale.apply}
            </button>
            {completedSteps.has(step) && step < 3 && (
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-md border border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] transition-smooth"
              >
                {locale.next}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
