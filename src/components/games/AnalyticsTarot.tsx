import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

export const AnalyticsTarot = () => {
  const { language } = useLanguage()
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)

  const cards = [
    {
      title: language === 'en' ? 'Data Magician' : 'Маг данных',
      advice:
        language === 'en'
          ? 'Start with a simple SQL query. Break complex tasks into small nodes.'
          : 'Начните с простого SQL-запроса. Разбейте сложную задачу на маленькие узлы.',
      icon: '🔮',
    },
    {
      title: language === 'en' ? 'Visualization Empress' : 'Императрица визуализации',
      advice:
        language === 'en'
          ? "Don't forget charts. Data should tell a story."
          : 'Не забывайте про графики. Данные должны рассказывать историю.',
      icon: '📊',
    },
    {
      title: language === 'en' ? 'Python Emperor' : 'Император Python',
      advice:
        language === 'en'
          ? 'Use Python for complex transformations. SQL for queries.'
          : 'Используйте Python для сложных трансформаций. SQL для выборок.',
      icon: '🐍',
    },
    {
      title: language === 'en' ? 'Collaboration Priestess' : 'Жрица коллаборации',
      advice:
        language === 'en'
          ? 'Share boards with your team. Collaboration speeds up analysis.'
          : 'Делитесь досками с командой. Совместная работа ускоряет анализ.',
      icon: '👥',
    },
    {
      title: language === 'en' ? 'Results Chariot' : 'Колесница результатов',
      advice:
        language === 'en'
          ? 'Save intermediate results. They will be useful for the next step.'
          : 'Сохраняйте промежуточные результаты. Они пригодятся для следующего шага.',
      icon: '⚡',
    },
  ]

  const drawCard = () => {
    if (isFlipping) return
    setIsFlipping(true)
    const randomIndex = Math.floor(Math.random() * cards.length)
    setSelectedCard(randomIndex)
    setTimeout(() => setIsFlipping(false), 400)
  }

  return (
    <div className="surface-panel border border-[var(--color-border)] rounded-2xl p-6 flex flex-col items-center text-center gap-4">
      <div className="text-5xl">🎴</div>
      {selectedCard === null ? (
        <>
          <p className="text-[var(--color-text-secondary)] text-sm">
            {language === 'en' ? 'Draw a card — get an analytics tip.' : 'Вытащите карту — получите аналитический совет.'}
          </p>
          <button
            onClick={drawCard}
            className="px-4 py-2 rounded-md bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)] font-semibold hover:opacity-90 transition-smooth"
          >
            {language === 'en' ? 'Draw Card' : 'Вытянуть карту'}
          </button>
        </>
      ) : (
        <div className={`space-y-2 ${isFlipping ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
          <div className="text-4xl mb-2">{cards[selectedCard].icon}</div>
          <p className="font-semibold text-lg text-[var(--color-text-primary)]">{cards[selectedCard].title}</p>
          <p className="text-sm text-[var(--color-text-secondary)]">{cards[selectedCard].advice}</p>
          <button
            onClick={drawCard}
            className="px-4 py-2 rounded-md border border-[var(--color-border)] text-sm hover:bg-[var(--color-bg-surface)] transition-smooth"
          >
            {language === 'en' ? 'Another one' : 'Ещё одну'}
          </button>
        </div>
      )}
    </div>
  )
}

