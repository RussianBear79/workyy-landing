import type { DrawnCard } from '../../data/tarotCards'

type SlotType = 'Past' | 'Present' | 'Future'

interface CardSlotProps {
  label: SlotType
  card?: DrawnCard
  meaning?: string
  isActive?: boolean
  onClick?: () => void
}

export function CardSlot({ label, card, meaning, isActive, onClick }: CardSlotProps) {
  return (
    <div
      className={`card-slot ${isActive ? 'card-slot--active' : ''}`}
      role={card ? 'button' : undefined}
      tabIndex={card ? 0 : -1}
      onClick={card ? onClick : undefined}
    >
      <p className="card-slot__label">{label}</p>
      {card ? (
        <div className="card-slot__card">
          <p className="card-slot__title">{card.card.name}</p>
          <p className="card-slot__keywords">{card.card.keywords.join(' · ')}</p>
          {meaning && <p className="card-slot__meaning">{meaning}</p>}
        </div>
      ) : (
        <div className="card-slot__placeholder">
          <span className="card-slot__hint">Tap to draw</span>
        </div>
      )}
    </div>
  )
}


