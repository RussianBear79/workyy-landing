import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { SEOHead } from '../components/SEOHead'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { DecisionSimulator } from '../components/games/DecisionSimulator'
import { MessyDataCleanup } from '../components/games/MessyDataCleanup'
import { AnalyticsTarot } from '../components/games/AnalyticsTarot'

const HomePage = () => {
  const { language, content } = useLanguage()
  const homeContent = content.home

  const getPath = (path: string) => {
    return `/${language}${path}`
  }

  return (
    <div className="bg-[#01040f] text-white min-h-screen">
      <SEOHead
        title={homeContent.hero.title}
        description={homeContent.hero.description}
        path={getPath('/home')}
      />
      <Header />

      <main className="relative overflow-hidden">
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
              <div className="relative">
                <div className="absolute -left-12 -top-10 w-32 h-32 bg-brand-green/30 blur-3xl rounded-full" />
                <div className="absolute -right-10 -bottom-12 w-32 h-32 bg-purple-500/30 blur-3xl rounded-full" />
                <div className="relative border border-white/10 bg-white/5 rounded-2xl p-6 backdrop-blur">
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                      <div className="text-xs text-gray-300 mb-2">SQL CELL</div>
                      <p className="font-mono text-sm text-white">
                        SELECT region, SUM(revenue) FROM sales GROUP BY 1;
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white">
                        →
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                      <div className="text-xs text-gray-300 mb-2">PYTHON CELL</div>
                      <p className="font-mono text-sm text-white">chart = df.plot(kind='line')</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-xs text-gray-300 mb-3">RESULT</div>
                      <div className="h-32 rounded-lg bg-gradient-to-r from-brand-green/40 to-purple-500/40 flex items-center justify-center">
                        {language === 'en' ? 'Live Chart' : 'Живой график'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BENEFITS */}
          <section id="benefits" className="py-16 bg-[#060f24]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {homeContent.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20"
                >
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-300">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ANALYTICS FOR EVERYONE */}
          <section id="analytics-for-everyone" className="py-20 bg-[#040a1c]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
              <p className="text-brand-green uppercase tracking-[0.3em] text-xs mb-4">
                {homeContent.analyticsForEveryone.title}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{homeContent.analyticsForEveryone.subtitle}</h2>
              <p className="text-gray-300">{homeContent.analyticsForEveryone.description}</p>
            </div>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
              {homeContent.analyticsForEveryone.columns.map((column) => (
                <div
                  key={column.title}
                  className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6"
                >
                  <h3 className="text-xl font-semibold mb-2">{column.title}</h3>
                  <p className="text-brand-green text-xs uppercase mb-3">{column.tagline}</p>
                  <p className="text-gray-300 text-sm">{column.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES */}
          <section id="features" className="py-20 bg-[#060f24]/90">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">{homeContent.features.title}</h2>
                <p className="text-gray-300">{homeContent.features.subtitle}</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                {homeContent.features.categories.map((category) => (
                  <div key={category.heading} className="p-6 rounded-2xl border border-white/10 bg-white/5">
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
          <section id="mix" className="py-20 bg-[#030817]">
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
              <div className="rounded-2xl border border-white/10 p-6 bg-gradient-to-br from-white/10 to-transparent">
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
          <section id="playground" className="py-20 bg-[#060f24]/90">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="text-brand-green uppercase tracking-[0.3em] text-xs mb-3">{homeContent.playground.title}</p>
                <h2 className="text-3xl font-bold mb-4">{homeContent.playground.subtitle}</h2>
                <p className="text-gray-300">{homeContent.playground.description}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {homeContent.playground.games.map((game) => (
                  <div key={game.title} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                    <div className="text-3xl mb-4">{game.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
                    <p className="text-sm text-gray-300 mb-2">{game.description}</p>
                    <p className="text-xs text-gray-500">{game.detail}</p>
                  </div>
                ))}
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                <DecisionSimulator />
                <MessyDataCleanup />
                <AnalyticsTarot />
              </div>
            </div>
          </section>

          {/* DESIGN SECTION */}
          <section id="design" className="py-20 bg-[#030817]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
              <p className="text-brand-green uppercase tracking-[0.3em] text-xs mb-3">{homeContent.design.title}</p>
              <h2 className="text-3xl font-bold mb-4">{homeContent.design.subtitle}</h2>
              <p className="text-gray-300">{homeContent.design.description}</p>
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
              {homeContent.design.highlights.map((highlight) => (
                <div key={highlight.title} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-300">{highlight.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FUTURE SECTION */}
          <section id="future" className="py-20 bg-[#060f24]/90">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">{homeContent.future.title}</h2>
              <p className="text-gray-300 mb-8">{homeContent.future.description}</p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {homeContent.future.highlights.map((item) => (
                  <div key={item.title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
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

