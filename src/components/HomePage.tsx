import { useEffect, useRef, useState } from 'react'

const navMenus = [
  {
    id: 'product',
    label: 'Product',
    links: [
      { href: '/product/canvas', label: 'The Canvas' },
      { href: '/product/workflows', label: 'Workflows' },
      { href: '/product/ai-agents', label: 'AI Agents' },
      { href: '/product/integrations', label: 'Integrations' },
    ],
  },
  {
    id: 'learn',
    label: 'Learn',
    links: [
      { href: '/learn/docs', label: 'Docs' },
      { href: '/learn/guides', label: 'Guides' },
      { href: '/learn/tutorials', label: 'Tutorials' },
      { href: '/learn/webinars', label: 'Webinars' },
    ],
  },
  {
    id: 'pricing',
    label: 'Pricing',
    links: [
      { href: '/pricing/teams', label: 'For teams' },
      { href: '/pricing/startups', label: 'For startups' },
      { href: '/pricing/enterprise', label: 'Enterprise' },
    ],
  },
]

const benefitHighlights = [
  {
    title: 'No-Code & Pro-Code',
    description: 'Дружелюбный UI для быстрых набросков или SQL/Python, когда нужна глубина.',
    icon: '🧠',
  },
  {
    title: 'Interactive Canvas',
    description: 'Перетаскивайте клетки, графики и заметки на бесконечной канве.',
    icon: '🧩',
  },
  {
    title: 'Built for Everyone',
    description: 'Комфортно менеджерам, мощно аналитикам. Одна среда для всей команды.',
    icon: '🤝',
  },
  {
    title: 'Real-Time Results',
    description: 'Запускайте код и сразу видьте обновлённые визуализации и выводы.',
    icon: '⚡',
  },
]

const analyticsColumns = [
  {
    title: 'Inclusivity',
    tagline: 'If you can use a whiteboard, you can use Workyy.',
    body: 'Перетащите данные, добавьте заметки и чарты в пару кликов — без кривой обучения.',
  },
  {
    title: 'Power',
    tagline: 'Under the hood, it’s a serious data workstation.',
    body: 'SQL и Python-ячейки с подключениями к БД и любимым библиотекам — ноутбук и BI в одном.',
  },
  {
    title: 'Collaboration',
    tagline: 'Skip the email back-and-forth.',
    body: 'Делитесь досками, комментируйте прямо рядом с графиками и оставляйте стикеры.',
  },
]

const featureBlocks = [
  {
    heading: 'Interactive Canvas',
    catchphrase: 'Your Analysis, Your Way',
    bullets: [
      'Свободное расположение блоков, масштабирование и нарративное повествование.',
      'Рисование и подсветка для лучшего сторителлинга данных.',
    ],
  },
  {
    heading: 'Coding Environment',
    catchphrase: 'Code When You Need It',
    bullets: [
      'SQL и Python клетки с индивидуальными кнопками запуска.',
      'Вывод результатов под каждой клеткой — таблицы, графики, метрики.',
      'Подключения к Postgres, Snowflake, BigQuery или загрузка CSV.',
    ],
  },
  {
    heading: 'Organization & Save',
    catchphrase: 'Projects at a Glance',
    bullets: [
      'Домашняя страница со списком всех досок и быстрым созданием новых.',
      'Снапшоты «Freeze this moment», чтобы фиксировать версии презентаций.',
      'Редактируйте или удаляйте элементы без риска: канва мотивирует экспериментировать.',
    ],
  },
  {
    heading: 'Annotations & Notes',
    catchphrase: 'Your Insights, Your Words',
    bullets: [
      'Цифровые стикеры и текстовые блоки рядом с данными сохраняют контекст.',
      'Планы по добавлению тегов и упоминаний коллег — канва станет общим полем.',
    ],
  },
]

const designHighlights = [
  {
    title: 'Northern Lights Palette',
    description: 'Фон «midnight blue» и неоновые лучи зелёного, бирюзового и пурпурного, как полярное сияние.',
  },
  {
    title: 'Glow Moments',
    description: 'Активные элементы подсвечены мягким свечением, чтобы направлять внимание.',
  },
  {
    title: 'Theme Flexibility',
    description: 'Light- и neutral-режимы в планах: «your data, your style».',
  },
]

const futureHighlights = [
  { title: 'Real-time Collaboration', detail: 'Многопользовательское редактирование, комментарии и роли доступа.' },
  { title: 'AI Guidance', detail: 'Авто-резюме, подсказки по следующим шагам, генерация презентаций.' },
  { title: 'Deeper Integrations', detail: 'Новые коннекторы, авто-обновления и встроенные каталоги данных.' },
]

const playgroundCards = [
  {
    key: 'sim',
    title: 'Decision Simulator',
    description: 'Подвиньте ползунки бюджета и конверсии — график меняется мгновенно.',
    badge: 'Scenario Play',
  },
  {
    key: 'cleanup',
    title: 'Messy Data Cleanup',
    description: 'Найдите пропуски и выбросы, чтобы привести набор данных к порядку.',
    badge: 'Puzzle',
  },
  {
    key: 'tarot',
    title: 'Insight Tarot',
    description: 'Вытяните карту «Прошлое / Настоящее / Будущее» и ловите аналитический совет.',
    badge: 'For Fun',
  },
] as const

const WorkyyHomePage = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeGame, setActiveGame] = useState<typeof playgroundCards[number]['key']>('sim')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleDropdown = (menu: string) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu))
  }

  return (
    <div className="bg-[#010513] text-white min-h-screen">
      <header className="sticky top-0 z-50 bg-[#010513]/85 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-2xl font-bold text-brand-green">
              Workyy
            </a>
            <nav ref={dropdownRef} className="hidden md:flex items-center space-x-8 text-sm">
              {navMenus.map((menu) => (
                <div key={menu.id} className="relative">
                  <button
                    onClick={() => toggleDropdown(menu.id)}
                    className="flex items-center gap-1 text-gray-300 hover:text-white transition"
                  >
                    {menu.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openDropdown === menu.id && (
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-white/10 bg-[#06102a] shadow-2xl">
                      {menu.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2 text-gray-300 hover:bg-white/10 transition"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <a href="/use-cases" className="text-gray-300 hover:text-white transition">
                Use cases
              </a>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <a href="/demo" className="text-gray-300 hover:text-white transition">
                Посмотреть пример доски
              </a>
              <a
                href="/try-demo"
                className="px-4 py-2 rounded-md bg-brand-green text-[#010513] font-semibold hover:bg-green-500 transition"
              >
                Попробовать демо
              </a>
            </div>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden text-gray-300 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4 space-y-3 text-sm text-gray-200">
              {['Product', 'Learn', 'Pricing', 'Use cases'].map((item) => (
                <a key={item} href="/" className="block">
                  {item}
                </a>
              ))}
              <a
                href="/try-demo"
                className="block text-center rounded-md bg-brand-green text-[#010513] py-2 font-semibold"
              >
                Попробовать демо
              </a>
            </div>
          )}
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),transparent_55%),radial-gradient(circle_at_bottom,_rgba(124,58,237,0.15),transparent_45%)] pointer-events-none" />
        <div className="relative z-10">
          {/* HERO */}
          <section className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-brand-green uppercase tracking-[0.35em] text-xs mb-6">Workyy</p>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">Business Analytics for Everyone.</h1>
                <p className="text-lg text-gray-300 mb-6">
                  Превратите данные в инсайты с свободой белой доски и мощью кодинга — всё в одной платформе.
                  Workyy смешивает дашборды, заметки и код на одной живой канве.
                </p>
                <p className="text-gray-400 mb-8">
                  «Turn your data into insights with the freedom of a whiteboard and the power of coding – all in one
                  platform.»
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/signup"
                    className="px-6 py-3 rounded-md bg-brand-green text-[#010513] font-semibold text-center hover:bg-green-500 transition"
                  >
                    Попробовать Workyy
                  </a>
                  <a
                    href="/demo-canvas"
                    className="px-6 py-3 border border-white/30 rounded-md text-center hover:border-white transition"
                  >
                    Посмотреть канву
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-12 -top-10 w-32 h-32 bg-brand-green/30 blur-3xl rounded-full" />
                <div className="absolute -right-10 -bottom-12 w-32 h-32 bg-purple-500/30 blur-3xl rounded-full" />
                <div className="relative border border-white/10 bg-white/5 rounded-2xl p-6 backdrop-blur">
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                      <div className="text-xs text-gray-300 mb-2">SQL CELL</div>
                      <p className="font-mono text-sm text-white">SELECT region, sum(revenue) FROM sales GROUP BY 1;</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white">
                        →
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 border border-white/10">
                      <div className="text-xs text-gray-300 mb-2">PYTHON CELL</div>
                      <p className="font-mono text-sm text-white">chart = df.plot(kind='area')</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="text-xs text-gray-300 mb-3">RESULT</div>
                      <div className="h-32 rounded-lg bg-gradient-to-r from-brand-green/40 to-purple-500/40 flex items-center justify-center">
                        Живой график
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BENEFITS */}
          <section className="py-16 bg-[#07122b]/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefitHighlights.map((benefit) => (
                <div key={benefit.title} className="p-6 rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20">
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-300">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ANALYTICS FOR EVERYONE */}
          <section className="py-20 bg-[#030817]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
              <p className="text-brand-green uppercase tracking-[0.3em] text-xs mb-4">Analytics for Everyone</p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Empower Every User</h2>
              <p className="text-gray-300">
                Workyy соединяет визуальный подход и кодовую мощь, чтобы каждый мог исследовать данные.
              </p>
            </div>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
              {analyticsColumns.map((column) => (
                <div key={column.title} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6">
                  <h3 className="text-xl font-semibold mb-2">{column.title}</h3>
                  <p className="text-brand-green text-xs uppercase mb-3">{column.tagline}</p>
                  <p className="text-gray-300 text-sm">{column.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES */}
          <section className="py-20 bg-[#07122b]/80">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What You Can Do with Workyy</h2>
                <p className="text-gray-300">Функционал MVP v0.2 — теперь с маркетинговым посылом.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                {featureBlocks.map((block) => (
                  <div key={block.heading} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                    <p className="text-brand-green text-xs uppercase mb-2">{block.catchphrase}</p>
                    <h3 className="text-2xl font-semibold mb-3">{block.heading}</h3>
                    <ul className="space-y-2 text-sm text-gray-200 list-disc list-inside">
                      {block.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* MIX */}
          <section className="py-20 bg-[#020713]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-brand-green uppercase tracking-[0.3em] text-xs mb-4">Where Coding Meets Creativity</p>
                <h2 className="text-3xl font-bold mb-4">The Perfect Mix — Code + Dashboard</h2>
                <p className="text-gray-300 mb-6">
                  Не нужно переключаться между SQL-редактором, ноутбуком и BI. Workyy показывает запросы, визуализации и заметки на одном холсте.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li>• Пишите запрос и сразу видьте график рядом.</li>
                  <li>• Добавляйте заметки и стрелки, чтобы объяснить выводы.</li>
                  <li>• Делитесь доской — коллеги увидят и путь мысли, и результат.</li>
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
                    <p className="text-sm">«Рост Q3 объясняется запуском новой подписки»</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PLAYGROUND */}
          <section className="py-20 bg-[#07122b]/85">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="text-brand-green uppercase tracking-[0.3em] text-xs mb-3">Workyy Playground</p>
                <h2 className="text-3xl font-bold mb-4">Игровые мини-песочницы</h2>
                <p className="text-gray-300">
                  Попробуйте аналитическое мышление на практике — игры вдохновляют исследовать данные.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {playgroundCards.map((card) => (
                  <button
                    key={card.key}
                    onClick={() => setActiveGame(card.key)}
                    className={`text-left p-6 rounded-2xl border transition ${
                      activeGame === card.key ? 'border-brand-green bg-white/10' : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <p className="text-xs uppercase text-brand-green mb-2">{card.badge}</p>
                    <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-300">{card.description}</p>
                  </button>
                ))}
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {activeGame === 'sim' && <DecisionSimulator />}
                {activeGame === 'cleanup' && <DataCleanupChallenge />}
                {activeGame === 'tarot' && <InsightTarot />}
              </div>
            </div>
          </section>

          {/* DESIGN */}
          <section className="py-20 bg-[#030817]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
              <p className="text-brand-green uppercase tracking-[0.3em] text-xs mb-3">Aurora Inspired Interface</p>
              <h2 className="text-3xl font-bold mb-4">Дизайн, вдохновлённый полярным сиянием</h2>
              <p className="text-gray-300">
                Midnight blue фон и неоновые акценты создают вдохновение и контраст, не утомляя глаза.
              </p>
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
              {designHighlights.map((highlight) => (
                <div key={highlight.title} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                  <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-300">{highlight.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FUTURE CTA */}
          <section className="py-20 bg-[#07122b]/80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">Дальше больше</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {futureHighlights.map((item) => (
                  <div key={item.title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-300 mb-6">
                Transform the way you work with data — с Workyy следующая инсайт-сессия начинается уже сегодня.
              </p>
              <a
                href="/signup"
                className="px-8 py-3 rounded-md bg-brand-green text-[#010513] font-semibold inline-block hover:bg-green-500 transition"
              >
                Создать первую канву
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-[#010513] border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-brand-green mb-4">Workyy</h3>
            <p className="text-gray-400 text-sm">
              Смешанные SQL и Python узлы, DAG и совместная аналитика на одной канве.
            </p>
          </div>
          {[
            {
              title: 'PRODUCT',
              links: ['The Canvas', 'Collaboration', 'Performance', 'Pricing', 'Changelog', 'Roadmap'],
            },
            {
              title: 'USE CASES',
              links: ['Data analysis', 'Self-serve analytics', 'Reporting', 'Data modeling', 'Product analytics', 'Finance & Ops'],
            },
            {
              title: 'COMPARE',
              links: ['Workyy vs. классические BI', 'Workyy vs. ноутбуки', 'Workyy для маленьких команд', 'Workyy для стартапов'],
            },
            {
              title: 'INTEGRATIONS',
              links: ['Postgres', 'Snowflake', 'BigQuery', 'MySQL', 'CSV / файлы'],
            },
            {
              title: 'RESOURCES',
              links: ['Docs', 'Blog', 'Security', 'Privacy Policy', 'Terms of Use'],
            },
          ].map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-white mb-4">{column.title}</h4>
              <ul className="space-y-2 text-gray-400">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="/" className="hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  )
}

const DecisionSimulator = () => {
  const [budget, setBudget] = useState(40)
  const [conversion, setConversion] = useState(3.5)
  const visitors = 1200 + budget * 18
  const projectedRevenue = Math.round(visitors * (conversion / 100) * 45)

  return (
    <div className="bg-[#020713] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
      <div>
        <p className="text-sm text-gray-400 mb-1">Маркетинговый бюджет</p>
        <input
          type="range"
          min={10}
          max={100}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-brand-green"
        />
        <p className="text-sm text-gray-300 mt-1">{budget} тыс. $</p>
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-1">Конверсия</p>
        <input
          type="range"
          min={1}
          max={7}
          step={0.1}
          value={conversion}
          onChange={(e) => setConversion(Number(e.target.value))}
          className="w-full accent-purple-400"
        />
        <p className="text-sm text-gray-300 mt-1">{conversion.toFixed(1)}%</p>
      </div>
      <div className="mt-2">
        <p className="text-xs uppercase text-brand-green tracking-[0.3em] mb-2">Projection</p>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-sm text-gray-400">Посетителей</p>
          <p className="text-2xl font-bold">{visitors.toLocaleString('ru-RU')}</p>
          <p className="text-sm text-gray-400 mt-4">Прогноз выручки</p>
          <p className="text-3xl font-bold text-brand-green">${projectedRevenue.toLocaleString('en-US')}</p>
        </div>
      </div>
    </div>
  )
}

const DataCleanupChallenge = () => {
  const initialRows = [
    { id: 1, label: 'Week 1', value: 120, status: 'ok' },
    { id: 2, label: 'Week 2', value: 138, status: 'ok' },
    { id: 3, label: 'Week 3', value: null, status: 'missing' },
    { id: 4, label: 'Week 4', value: 860, status: 'outlier' },
    { id: 5, label: 'Week 5', value: 160, status: 'ok' },
  ]
  const [rows, setRows] = useState(initialRows)

  const handleFix = (id: number) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row
        if (row.status === 'missing') return { ...row, value: 145, status: 'ok' }
        if (row.status === 'outlier') return { ...row, value: 150, status: 'ok' }
        return row
      })
    )
  }

  const dirtyLeft = rows.filter((row) => row.status !== 'ok').length

  return (
    <div className="bg-[#020713] border border-white/10 rounded-2xl p-6">
      <p className="text-sm text-gray-400 mb-4">Уберите неровности данных</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400">
            <th className="text-left pb-2">Неделя</th>
            <th className="text-left pb-2">Значение</th>
            <th className="text-right pb-2">Действие</th>
          </tr>
        </thead>
        <tbody className="text-gray-200">
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-white/10">
              <td className="py-2">{row.label}</td>
              <td className="py-2">
                {row.value ?? '—'}{' '}
                {row.status !== 'ok' && <span className="text-xs text-brand-green uppercase">{row.status}</span>}
              </td>
              <td className="py-2 text-right">
                {row.status !== 'ok' ? (
                  <button onClick={() => handleFix(row.id)} className="text-xs text-brand-green hover:text-white transition">
                    Fix
                  </button>
                ) : (
                  <span className="text-xs text-gray-500">clean</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-400 mt-4">
        {dirtyLeft === 0 ? 'Готово! Набор можно анализировать.' : `Осталось очистить строк: ${dirtyLeft}`}
      </p>
    </div>
  )
}

const InsightTarot = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const cards = [
    {
      title: 'Маг данных',
      advice: 'Начните с простого SQL-запроса. Разбейте сложную задачу на маленькие узлы.',
      icon: '🔮',
    },
    {
      title: 'Императрица визуализации',
      advice: 'Не забывайте про графики. Данные должны рассказывать историю.',
      icon: '📊',
    },
    {
      title: 'Император Python',
      advice: 'Используйте Python для сложных трансформаций. SQL для выборок.',
      icon: '🐍',
    },
    {
      title: 'Жрица коллаборации',
      advice: 'Делитесь досками с командой и получайте обратную связь быстрее.',
      icon: '👥',
    },
    {
      title: 'Колесница результатов',
      advice: 'Сохраняйте промежуточные результаты. Они понадобятся для следующей итерации.',
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
    <div className="bg-[#020713] border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
      <div className="text-5xl">🎴</div>
      {selectedCard === null ? (
        <>
          <p className="text-gray-300 text-sm">Вытащите карту — получите аналитический совет.</p>
          <button
            onClick={drawCard}
            className="px-4 py-2 rounded-md bg-brand-green text-[#010513] font-semibold hover:bg-green-500 transition"
          >
            Вытянуть карту
          </button>
        </>
      ) : (
        <div className={`space-y-2 ${isFlipping ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
          <div className="text-4xl mb-2">{cards[selectedCard].icon}</div>
          <p className="font-semibold text-lg">{cards[selectedCard].title}</p>
          <p className="text-sm text-gray-300">{cards[selectedCard].advice}</p>
          <button
            onClick={drawCard}
            className="px-4 py-2 rounded-md border border-white/30 text-sm hover:bg-white/10 transition"
          >
            Ещё одну
          </button>
        </div>
      )}
    </div>
  )
}

export default WorkyyHomePage

