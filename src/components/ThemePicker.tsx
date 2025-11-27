import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useTheme, themeGroups, themeOptions, type Theme } from '../contexts/ThemeContext'

export const ThemePicker = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const groupedThemes = useMemo(
    () =>
      themeGroups.map((group) => ({
        ...group,
        options: themeOptions.filter((option) => option.group === group.id),
      })),
    [],
  )

  const currentTheme = themeOptions.find((option) => option.id === theme) ?? themeOptions[0]

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return
      if (dropdownRef.current.contains(event.target as Node) || buttonRef.current?.contains(event.target as Node)) {
        return
      }
      setIsOpen(false)
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleSelect = (value: Theme) => {
    setTheme(value)
    setIsOpen(false)
    requestAnimationFrame(() => buttonRef.current?.focus())
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-text-primary)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
      >
        <span className="flex gap-1.5">
          {currentTheme.preview.map((color, idx) => (
            <span
              key={color + idx}
              aria-hidden
              className="h-3 w-3 rounded-full border border-[var(--color-border)]"
              style={{ backgroundColor: color }}
            />
          ))}
        </span>
        <span className="hidden md:inline">{currentTheme.name.split(' ')[0]}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-3 w-72 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/95 shadow-2xl backdrop-blur-xl"
          role="menu"
          aria-label="Theme options"
        >
          <div className="max-h-[70vh] overflow-y-auto p-3">
            {groupedThemes.map((group) => (
              <Fragment key={group.id}>
                <div className="px-2 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.45em] text-[var(--color-text-muted)]">
                  {group.label}
                </div>
                <div className="space-y-1.5">
                  {group.options.map((option) => {
                    const isActive = option.id === theme
                    return (
                      <button
                        key={option.id}
                        role="menuitemradio"
                        aria-checked={isActive}
                        onClick={() => handleSelect(option.id)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] ${
                          isActive
                            ? 'border-[var(--color-accent-primary)]/60 bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]'
                            : 'border-transparent text-[var(--color-text-primary)] hover:border-[var(--color-border)] hover:bg-[var(--color-bg-surface)]/60'
                        }`}
                      >
                        <span className="flex gap-1.5" aria-hidden>
                          {option.preview.map((color, idx) => (
                            <span
                              key={`${option.id}-dot-${idx}`}
                              className="h-4 w-4 rounded-full border border-[var(--color-border)]"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </span>
                        <span className="flex flex-col">
                          <span className="font-semibold leading-tight">{option.name}</span>
                          <span className="text-[11px] text-[var(--color-text-muted)] leading-tight">{option.description}</span>
                        </span>
                        {isActive && (
                          <svg className="ml-auto h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    )
                  })}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


