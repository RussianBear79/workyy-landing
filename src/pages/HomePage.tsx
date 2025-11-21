import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { SEOHead } from '../components/SEOHead'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { DecisionSimulator } from '../components/games/DecisionSimulator'
import { MessyDataCleanup } from '../components/games/MessyDataCleanup'
import { AnalyticsTarot } from '../components/games/AnalyticsTarot'
import { ChartMemoryGame } from '../components/games/ChartMemoryGame'

const HomePage = () => {
  const { language, content } = useLanguage()
  const { theme } = useTheme()
  const homeContent = content.home

  const getPath = (path: string) => {
    return `/${language}${path}`
  }

  return (
    <div className="min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)] transition-colors duration-300">
      <SEOHead
        title={homeContent.hero.title}
        description={homeContent.hero.description}
        path={getPath('/home')}
      />
      <Header />

      <main id="main-content" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.08),transparent_55%),radial-gradient(circle_at_bottom,_rgba(124,58,237,0.15),transparent_45%)] pointer-events-none" />
        <div className="relative z-10">
          {/* HERO */}
          <section id="hero" className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-brand-green uppercase tracking-[0.4em] text-xs mb-6">{homeContent.hero.tagline}</p>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">{homeContent.hero.title}</h1>
                <p className="text-lg text-gray-300 mb-6">{homeContent.hero.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={getPath('/pricing')}
                    className="px-6 py-3 rounded-md bg-brand-green text-[#01040f] font-semibold text-center hover:bg-green-400 transition"
                  >
                    {homeContent.hero.ctaPrimary}
                  </Link>
                  <Link
                    to={getPath('/product/canvas')}
                    className="px-6 py-3 border border-white/30 rounded-md text-center hover:border-white transition"
                  >
                    {homeContent.hero.ctaSecondary}
                  </Link>
                </div>
              </div>
              <HeroDemo language={language} />
            </div>
          </section>

          {/* BENEFITS */}
          <section
            id="benefits"
            className={`py-16 transition-colors ${theme === 'dark' ? 'bg-[#060f24]/80' : 'bg-white/80'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {homeContent.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="surface-panel p-6 rounded-2xl shadow-lg shadow-black/10"
                >
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-300">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ANALYTICS FOR EVERYONE */}
          <section
            id="analytics-for-everyone"
            className={`py-20 transition-colors ${theme === 'dark' ? 'bg-[#040a1c]' : 'bg-slate-100'}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
              <p className="text-brand-green uppercase tracking-[0.3em] text-xs mb-4">
                {homeContent.analyticsForEveryone.title}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{homeContent.analyticsForEveryone.subtitle}</h2>
              <p className="text-gray-300">{homeContent.analyticsForEveryone.description}</p>
            </div>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
              {homeContent.analyticsForEveryone.columns.map((column) => (
                <div key={column.title} className="surface-panel rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-2">{column.title}</h3>
                  <p className="text-brand-green text-xs uppercase mb-3">{column.tagline}</p>
                  <p className="text-gray-300 text-sm">{column.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES */}
          <section
            id="features"
            className={`py-20 transition-colors ${theme === 'dark' ? 'bg-[#060f24]/90' : 'bg-white'}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{homeContent.features.title}</h2>
                <p className="text-gray-300">{homeContent.features.subtitle}</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                {homeContent.features.categories.map((category) => (
                  <div key={category.heading} className="surface-panel p-6 rounded-2xl">
                    <p className="text-brand-green text-xs uppercase mb-2">{category.catchphrase}</p>
                    <h3 className="text-2xl font-semibold mb-3">{category.heading}</h3>
                    <p className="text-gray-300 mb-4 text-sm">{category.description}</p>
                    <ul className="space-y-2 text-sm text-gray-200 list-disc list-inside">
                      {category.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* MIX SECTION */}
          <section
            id="mix"
            className={`py-20 transition-colors ${theme === 'dark' ? 'bg-[#030817]' : 'bg-slate-100'}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-brand-green uppercase tracking-[0.35em] text-xs mb-4">{homeContent.mix.subtitle}</p>
                <h2 className="text-3xl font-bold mb-4">{homeContent.mix.title}</h2>
                <p className="text-gray-300 mb-6">{homeContent.mix.description}</p>
                <ul className="space-y-3 text-gray-300">
                  {homeContent.mix.points.map((point, idx) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>
              </div>
              <div className="surface-panel rounded-2xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0a132b] border border-white/5">
                    <p className="text-xs text-gray-400 mb-2">SQL CELL</p>
                    <p className="font-mono text-sm">SELECT * FROM experiments LIMIT 20</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0a132b] border border-white/5">
                    <p className="text-xs text-gray-400 mb-2">PYTHON CELL</p>
                    <p className="font-mono text-sm">df.assign(growth=df.rev.pct_change())</p>
                  </div>
                  <div className="col-span-2 p-4 rounded-xl bg-[#0a132b] border border-white/5 text-center h-32 flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-400 mb-2">STICKY NOTE</p>
                    <p className="text-sm">
                      {language === 'en'
                        ? '"Q3 growth explained by new subscription release"'
                        : '«Рост Q3 объясняется релизом новой подписки»'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PLAYGROUND */}
          <section
            id="playground"
            className={`py-20 transition-colors ${theme === 'dark' ? 'bg-[#060f24]/90' : 'bg-white'}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="text-brand-green uppercase tracking-[0.3em] text-xs mb-3">{homeContent.playground.title}</p>
                <h2 className="text-3xl font-bold mb-4">{homeContent.playground.subtitle}</h2>
                <p className="text-gray-300">{homeContent.playground.description}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {homeContent.playground.games.map((game) => (
                  <div key={game.title} className="surface-panel p-6 rounded-2xl">
                    <div className="text-3xl mb-4">{game.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">{game.description}</p>
                    <p className="text-xs text-gray-500">{game.detail}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <DecisionSimulator />
                <MessyDataCleanup />
                <AnalyticsTarot />
                <ChartMemoryGame />
              </div>
            </div>
          </section>

          {/* DESIGN SECTION */}
          <section
            id="design"
            className={`py-20 transition-colors ${theme === 'dark' ? 'bg-[#030817]' : 'bg-slate-100'}`}
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
              <p className="text-brand-green uppercase tracking-[0.3em] text-xs mb-3">{homeContent.design.title}</p>
              <h2 className="text-3xl font-bold mb-4">{homeContent.design.subtitle}</h2>
              <p className="text-gray-300">{homeContent.design.description}</p>
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
              {homeContent.design.highlights.map((highlight) => (
                <div key={highlight.title} className="surface-panel p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-300">{highlight.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FUTURE SECTION */}
          <section
            id="future"
            className={`py-20 transition-colors ${theme === 'dark' ? 'bg-[#060f24]/90' : 'bg-white'}`}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">{homeContent.future.title}</h2>
              <p className="text-gray-300 mb-8">{homeContent.future.description}</p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {homeContent.future.highlights.map((item) => (
                  <div key={item.title} className="surface-panel p-6 rounded-2xl">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-300 mb-6">{homeContent.future.cta}</p>
              <Link
                to={getPath('/pricing')}
                className="px-8 py-3 rounded-md bg-brand-green text-[#01040f] font-semibold inline-block hover:bg-green-400 transition"
              >
                {language === 'en' ? 'Create your first Canvas' : 'Создать первую канву'}
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage

type HeroStep = 'sql' | 'python' | 'result'

const heroPanels: Record<HeroStep, { label: string; snippet: string; accent: string }> = {
  sql: {
    label: 'SQL',
    snippet: `SELECT region, SUM(revenue)
FROM sales
GROUP BY 1;`,
    accent: 'from-brand-green/40 to-emerald-500/30',
  },
  python: {
    label: 'Python',
    snippet: `chart = df.assign(
    growth=df.revenue.pct_change()
).plot(kind='area')`,
    accent: 'from-purple-500/40 to-sky-400/30',
  },
  result: {
    label: 'Result',
    snippet: `Live Board → Shared story
• Line chart with annotations
• Sticky note: "Q3 growth +18%"`,
    accent: 'from-amber-400/40 to-pink-400/30',
  },
}

const heroLocale = {
  en: {
    run: 'Run canvas',
    running: 'Crunching data...',
    done: 'Result ready',
    hint: 'Toggle between SQL, Python, and the live board to see how Workyy keeps everything on the same canvas.',
  },
  ru: {
    run: 'Запустить канву',
    running: 'Обработка данных...',
    done: 'Результат готов',
    hint: 'Переключайтесь между SQL, Python и результатом, чтобы увидеть, как Workyy держит всё на одной канве.',
  },
}

const HeroDemo = ({ language }: { language: string }) => {
  const [activeStep, setActiveStep] = useState<HeroStep>('sql')
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle')

  const locale = heroLocale[language as 'en' | 'ru'] ?? heroLocale.en

  const handleRun = () => {
    setStatus('running')
    setActiveStep('python')
    setTimeout(() => {
      setActiveStep('result')
      setStatus('done')
    }, 900)
  }

  return (
    <div className="relative">
      <div className="absolute -left-12 -top-10 w-32 h-32 bg-brand-green/30 blur-3xl rounded-full" />
      <div className="absolute -right-10 -bottom-12 w-32 h-32 bg-purple-500/30 blur-3xl rounded-full" />
      <div className="relative surface-panel border border-white/10 rounded-2xl p-6 backdrop-blur space-y-5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-2">
            {(Object.keys(heroPanels) as HeroStep[]).map((step) => (
              <button
                key={step}
                onClick={() => {
                  setActiveStep(step)
                  setStatus(step === 'result' ? 'done' : 'idle')
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
                  activeStep === step ? 'bg-brand-green text-[#01040f]' : 'text-gray-300 border-white/20 hover:border-white/40'
                }`}
                aria-pressed={activeStep === step}
              >
                {heroPanels[step].label}
              </button>
            ))}
          </div>
          <button
            onClick={handleRun}
            className="px-4 py-1.5 rounded-md text-xs font-semibold bg-brand-green/80 text-[#01040f] hover:bg-brand-green transition disabled:opacity-60"
            disabled={status === 'running'}
          >
            {status === 'running' ? locale.running : status === 'done' ? locale.done : locale.run}
          </button>
        </div>
        <p className="text-xs text-gray-400" aria-live="polite">
          {status === 'running' ? locale.running : status === 'done' ? locale.done : locale.hint}
        </p>
        <div
          className={`p-4 rounded-xl border border-white/15 bg-gradient-to-br ${heroPanels[activeStep].accent} font-mono text-sm text-white whitespace-pre-wrap`}
        >
          {heroPanels[activeStep].snippet}
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs text-gray-300">
          <div className={`rounded-lg border ${activeStep === 'sql' ? 'border-brand-green/60 bg-brand-green/10' : 'border-white/10'} p-3`}>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-1 text-gray-400">01</p>
            <p>SQL query</p>
          </div>
          <div className={`rounded-lg border ${activeStep === 'python' ? 'border-purple-400/60 bg-purple-400/10' : 'border-white/10'} p-3`}>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-1 text-gray-400">02</p>
            <p>Python transform</p>
          </div>
          <div className={`rounded-lg border ${activeStep === 'result' ? 'border-amber-300/60 bg-amber-300/10' : 'border-white/10'} p-3`}>
            <p className="text-[10px] uppercase tracking-[0.3em] mb-1 text-gray-400">03</p>
            <p>{language === 'en' ? 'Shared board' : 'Общий борт'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

