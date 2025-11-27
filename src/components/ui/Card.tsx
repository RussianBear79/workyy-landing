import { ReactNode, HTMLAttributes } from 'react'

type CardVariant = 'default' | 'elevated' | 'bordered'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  children: ReactNode
}

const variantClasses = {
  default: 'surface-panel',
  elevated: 'surface-panel shadow-theme-lg',
  bordered: 'surface-panel border-2 border-[var(--color-accent-primary)]/30',
}

export const Card = ({ variant = 'default', children, className = '', ...props }: CardProps) => {
  const baseClasses =
    'rounded-2xl p-6 transition-smooth will-change-transform will-change-shadow hover:-translate-y-1 hover:shadow-theme-lg'
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

