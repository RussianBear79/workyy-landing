import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'

export type Theme =
  | 'aurora-dark'
  | 'aurora-light'
  | 'pastel-sunset'
  | 'pastel-peach'
  | 'pastel-sand'
  | 'dev-dark'
  | 'dev-light'
  | 'lined-warm'

export type ThemeGroupId = 'aurora' | 'pastel' | 'dev' | 'lined'

interface ThemeTokens {
  primaryBg: string
  cardBg: string
  gradient: string
  textMain: string
  textMuted: string
  accent: string
  accentSoft: string
  border: string
}

export interface ThemeConfigEntry {
  id: Theme
  name: string
  group: ThemeGroupId
  description: string
  preview: string[]
  tokens: ThemeTokens
}

export const themeGroups: Array<{ id: ThemeGroupId; label: string; description: string }> = [
  {
    id: 'aurora',
    label: 'Aurora',
    description: 'Default Workyy palette inspired by the northern lights.',
  },
  { id: 'pastel', label: 'Pastel Studio', description: 'Soft gradients for calm storytelling.' },
  { id: 'dev', label: 'Dev Grid', description: 'Operator themes built for long coding sessions.' },
  { id: 'lined', label: 'Lined Journals', description: 'Warm lined-paper motif for sketching ideas.' },
]

export const themeConfig: Record<Theme, ThemeConfigEntry> = {
  'aurora-dark': {
    id: 'aurora-dark',
    name: 'Aurora Dark',
    group: 'aurora',
    description: 'Default Croc palette with neon accents over a midnight backdrop.',
    preview: ['#01040f', '#22c55e', '#a855f7'],
    tokens: {
      primaryBg: '#01040f',
      cardBg: '#02091c',
      gradient: 'linear-gradient(135deg, #01040f, #050c1f)',
      textMain: '#f8fafc',
      textMuted: '#94a3b8',
      accent: '#22c55e',
      accentSoft: '#4ade80',
      border: 'rgba(148,163,184,0.35)',
    },
  },
  'aurora-light': {
    id: 'aurora-light',
    name: 'Aurora Light',
    group: 'aurora',
    description: 'Bright counterpart with glassy surfaces and northern-lights hues.',
    preview: ['#f8fafc', '#22c55e', '#a855f7'],
    tokens: {
      primaryBg: '#f8fafc',
      cardBg: '#ffffff',
      gradient: 'linear-gradient(135deg, #e2e8f0, #f8fafc)',
      textMain: '#0f172a',
      textMuted: '#475569',
      accent: '#22c55e',
      accentSoft: '#86efac',
      border: 'rgba(15, 23, 42, 0.14)',
    },
  },
  'pastel-sunset': {
    id: 'pastel-sunset',
    name: 'Pastel Sunset',
    group: 'pastel',
    description: 'Peach + coral blend inspired by sunset dashboards.',
    preview: ['#fff7ed', '#ff8c69', '#ffb6c1'],
    tokens: {
      primaryBg: '#fff7ed',
      cardBg: '#fff4e7',
      gradient: 'linear-gradient(120deg, #ffe5d0, #fff7ed)',
      textMain: '#431407',
      textMuted: '#7c2d12',
      accent: '#ff8c69',
      accentSoft: '#ffb6c1',
      border: 'rgba(255, 140, 105, 0.35)',
    },
  },
  'pastel-peach': {
    id: 'pastel-peach',
    name: 'Pastel Peach',
    group: 'pastel',
    description: 'Dreamy peach + amber palette for calm work modes.',
    preview: ['#fff5e6', '#ffa07a', '#ffb347'],
    tokens: {
      primaryBg: '#fff5e6',
      cardBg: '#fff0d6',
      gradient: 'linear-gradient(120deg, #ffe0ba, #fff5e6)',
      textMain: '#451a03',
      textMuted: '#78350f',
      accent: '#ffa07a',
      accentSoft: '#ffb347',
      border: 'rgba(255, 160, 122, 0.35)',
    },
  },
  'pastel-sand': {
    id: 'pastel-sand',
    name: 'Pastel Sand',
    group: 'pastel',
    description: 'Warm sand and driftwood neutrals for note-taking canvases.',
    preview: ['#fdf6e3', '#d4a574', '#e6c79a'],
    tokens: {
      primaryBg: '#fdf6e3',
      cardBg: '#f6e7cb',
      gradient: 'linear-gradient(120deg, #f1deb6, #fdf6e3)',
      textMain: '#451a03',
      textMuted: '#7c470f',
      accent: '#d4a574',
      accentSoft: '#e6c79a',
      border: 'rgba(212, 165, 116, 0.35)',
    },
  },
  'dev-dark': {
    id: 'dev-dark',
    name: 'Dev Dark Grid',
    group: 'dev',
    description: 'High-contrast studio feel with electric blues and reds.',
    preview: ['#050a14', '#3b82f6', '#ef4444'],
    tokens: {
      primaryBg: '#050a14',
      cardBg: '#080f23',
      gradient: 'linear-gradient(135deg, #050a14, #0a1630)',
      textMain: '#f1f5f9',
      textMuted: '#94a3b8',
      accent: '#3b82f6',
      accentSoft: '#60a5fa',
      border: 'rgba(59, 130, 246, 0.35)',
    },
  },
  'dev-light': {
    id: 'dev-light',
    name: 'Dev Light Grid',
    group: 'dev',
    description: 'Tooling-forward but bright, with blueprint blues.',
    preview: ['#eff6ff', '#2563eb', '#f97316'],
    tokens: {
      primaryBg: '#eff6ff',
      cardBg: '#e2ecff',
      gradient: 'linear-gradient(135deg, #dbeafe, #eff6ff)',
      textMain: '#0f172a',
      textMuted: '#1e293b',
      accent: '#2563eb',
      accentSoft: '#60a5fa',
      border: 'rgba(37, 99, 235, 0.35)',
    },
  },
  'lined-warm': {
    id: 'lined-warm',
    name: 'Lined Warm',
    group: 'lined',
    description: 'Notebook-inspired strokes with cozy orange ink.',
    preview: ['#fff8f0', '#f4c38c', '#ed8936'],
    tokens: {
      primaryBg: '#fff8f0',
      cardBg: '#ffeeda',
      gradient: 'linear-gradient(135deg, #ffdcb8, #fff8f0)',
      textMain: '#1c0a04',
      textMuted: '#732a12',
      accent: '#ed8936',
      accentSoft: '#f6ad55',
      border: 'rgba(237, 137, 54, 0.35)',
    },
  },
}

export const themeOptions = Object.values(themeConfig)
const AVAILABLE_THEMES = themeOptions.map((option) => option.id)

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void // Keep for backward compatibility
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'aurora-dark'
  const stored = window.localStorage.getItem('workyy-theme')
  if (stored === 'dark') return 'aurora-dark'
  if (stored === 'light') return 'aurora-light'
  if (stored && AVAILABLE_THEMES.includes(stored as Theme)) {
    return stored as Theme
  }
  return 'aurora-dark'
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => getStoredTheme())

  useEffect(() => {
    window.localStorage.setItem('workyy-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => setThemeState(newTheme)
  const toggleTheme = () => setThemeState((prev) => (prev === 'aurora-dark' ? 'aurora-light' : 'aurora-dark'))

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

