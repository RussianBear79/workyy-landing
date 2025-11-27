import { ReactNode, HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'warm'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

const variantClasses = {
  default: 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)]',
  primary: 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)]',
  secondary: 'bg-[var(--color-accent-secondary)]/20 text-[var(--color-accent-secondary)]',
  warm: 'bg-[var(--color-accent-warm)]/20 text-[var(--color-accent-warm)]',
}

export const Badge = ({ variant = 'default', children, className = '', ...props }: BadgeProps) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold'
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}

