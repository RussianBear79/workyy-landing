import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  className?: string
}

type ButtonProps = BaseButtonProps &
  (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never; to?: never })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: never })
    | (Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { to: string; href?: never; onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void })
  )

const sizeClasses = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantClasses = {
  primary: 'bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)] hover:opacity-90 font-semibold',
  secondary: 'border-2 border-[var(--color-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]',
  ghost: 'text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)]',
}

export const Button = ({ variant = 'primary', size = 'md', children, className = '', href, to, ...props }: ButtonProps) => {
  const baseClasses = 'rounded-md transition-smooth inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-[var(--color-border)] focus-visible:outline-offset-2'
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}

