import { useTheme } from '../contexts/ThemeContext'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1.5 rounded-md border border-[var(--border-color)] bg-[var(--surface-color)] hover:bg-white/10 transition text-sm flex items-center gap-2 text-[var(--text-primary)]"
      aria-pressed={isLight}
    >
      <span role="img" aria-hidden="true">
        {isLight ? '🌞' : '🌙'}
      </span>
      <span className="hidden md:inline text-xs uppercase tracking-[0.2em]">
        {isLight ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}

