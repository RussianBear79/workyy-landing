import { useLanguage } from '../contexts/LanguageContext'
import { SEOHead } from '../components/SEOHead'
import { NotebookDemo } from '../components/NotebookDemo'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { AnimatedCard } from '../components/ui/AnimatedCard'

const heroContent = {
  eyebrow: 'Workyy Croc Co-Pilot',
  headline: 'Analytics that feel like play, powered by a limitless canvas + SQL/Python cells.',
  subheadline:
    'One browser surface replaces notebooks, BI dashboards, and scattered whiteboards so you explore, build, and collaborate faster.',
  ctas: {
    primary: 'Try the Interactive Demo',
    secondary: 'Start Free Workspace',
    tertiary: 'Watch the 60-second overview',
  },
  supporting: [
    'No setup: drop in CSVs or connect Snowflake, BigQuery, or Postgres in minutes.',
    'Boards save every code cell, chart, sticky note, and drawing so teams can re-run the exact state later.',
  ],
  animation: {
    scene:
      'Midnight-blue gradient canvas with floating SQL/Python cells, charts, sticky notes, and the board gallery in view. Two cursors glide in real time.',
    characters: [
      'Cursor labeled "You" guiding the main query.',
      'Neon-green pixel crocodile labeled "Workyy Croc (AI)" with a sparkle trail.',
    ],
    states: [
      'State A: You type SELECT and pause. Croc autocomplete pops in, inserts the cohort query, and drops a sticky note saying "Need revenue by cohort?"',
      'State B: Croc drags a mini bar chart tile beneath the SQL cell. A magnetic snap line glows to show the perfect layout.',
      'State C: You hover a chart point. Croc pulses the 18% spike and whispers "+18% vs Q2. Want to annotate?"',
      'State D: Croc stacks three snapshots into a "Past / Present / Future" column, winks, and a tooltip appears: "Workspace saved—share link ready."',
    ],
  },
}

const socialProofLogos = [
  'Helios Pay',
  'Nuo Commerce',
  'Shenzhen Nebula Analytics (深星数据)',
  'Atlas Freight',
  'Bloomly Health',
  'Voltwave Gaming',
]

const valueProps = [
  {
    title: 'Unified canvas',
    description: 'SQL, Python, charts, sticky notes, and sketches live on the same infinite surface.',
  },
  {
    title: 'Faster experimentation',
    description: 'Run cells inline, compare snapshots, and fork boards without duplicating files.',
  },
  {
    title: 'Collaboration built-in',
    description: 'Comment threads, live cursors, emoji reacts, and @mentions replace endless slide decks.',
  },
  {
    title: 'Reproducible analytics',
    description: 'Boards freeze inputs, outputs, and layout so teams can re-run or audit any moment.',
  },
]

const howSteps = [
  {
    title: 'Drop in your data',
    description: 'Connect Snowflake, BigQuery, Postgres, or drag-and-drop CSV/Parquet files. Workyy profiles them instantly.',
    icon: '⬆️',
  },
  {
    title: 'Build with SQL or Python cells',
    description: 'Compose queries, import pandas, call plotting libraries, and keep results runnable.',
    icon: '🧠',
  },
  {
    title: 'Arrange the canvas',
    description: 'Snap KPIs, charts, sticky notes, and drawings into flexible frames for storytelling.',
    icon: '🗂️',
  },
  {
    title: 'Share a living board',
    description: 'Invite teammates with view/edit controls, save snapshots, and present live.',
    icon: '🔗',
  },
]

const featureGroups = [
  {
    title: 'Canvas & Layout',
    bullets: [
      'Infinite, zoomable surface with magnetic guides.',
      'Frames + presentation mode for narrative walkthroughs.',
      'Sticky notes, freehand drawing, screenshots, and callouts.',
      'Snapshot timeline to compare experiments side-by-side.',
      'Templates for metrics reviews, growth experiments, and incident retros.',
    ],
  },
  {
    title: 'Code & Data',
    bullets: [
      'Dual SQL/Python runtime with shared variables.',
      'Warehouse connectors plus CSV/Parquet uploads.',
      'Rich table and chart result viewers with pivot cards.',
      'Versioned cells with undo history.',
      'Inline data profiling and schema explorer.',
    ],
  },
  {
    title: 'Collaboration',
    bullets: [
      'Live multi-cursor editing (Croc gets an avatar).',
      'Comment threads, @mentions, task checklists, and reactions.',
      'Board-level permissions for view/comment/edit.',
      'Board gallery with search, favorites, and pins.',
      'Slack/Teams-friendly share links.',
    ],
  },
  {
    title: 'Governance & Reliability',
    bullets: [
      'Role-based access control plus SSO/SAML.',
      'Audit logs at board and cell level.',
      'Scheduled refreshes, quotas, and alerts.',
      'Encrypted storage with optional VPC peering.',
      'Export boards to PDF, PNG, or JSON for compliance.',
    ],
  },
]

const personas = [
  {
    title: 'Data Analysts',
    struggle: 'Tab overload and switching between SQL editors, notebooks, and slides.',
    help: 'Run code, annotate, and present on one surface while Croc documents the steps.',
  },
  {
    title: 'Analytics Engineers',
    struggle: 'Notebooks get messy, collaboration is clunky, and version control is painful.',
    help: 'Component-based boards, reproducible runs, Git-friendly exports, and Croc auto-organizing cells.',
  },
  {
    title: 'Product Managers',
    struggle: 'Waiting on decks, unclear context around metrics, limited experimentation.',
    help: 'Comment directly on charts, watch live experiments, and pin user stories next to data.',
  },
  {
    title: 'Founders & Small Teams',
    struggle: 'Limited ops headcount yet urgent need for answers.',
    help: 'Start from templates, connect spreadsheets, and let Croc summarize trends instantly.',
  },
]

const comparisonRows = [
  {
    tool: 'Hex',
    shines: 'Great SQL/Python notebooks with BI sharing.',
    workyy: 'Adds infinite canvas storytelling and an AI Croc co-pilot for layout and insights.',
  },
  {
    tool: 'Observable',
    shines: 'JS-centric notebooks and custom visualization playground.',
    workyy: 'Focuses on SQL/Python, broader data teams, and reproducible board snapshots.',
  },
  {
    tool: 'Notion AI',
    shines: 'Flexible docs and task management.',
    workyy: 'Runs code, renders charts, and keeps living analytics instead of static notes.',
  },
  {
    tool: 'Classic BI',
    shines: 'Pixel-perfect dashboards and executive reporting.',
    workyy: 'Blends dashboards with notebooks and freeform exploration for ad-hoc experiments.',
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    audience: 'Solo analysts or hobby projects.',
    bullets: ['Unlimited boards', 'File uploads + Croc suggestions', 'Community support'],
  },
  {
    name: 'Team',
    audience: 'Growing data pods that need governance.',
    bullets: ['Warehouse connectors', 'Shared workspaces + role-based access', 'Snapshot history + template gallery'],
  },
  {
    name: 'Pro',
    audience: 'Departments, ops teams, and enterprise pilots.',
    bullets: ['SSO/SAML + audit logs', 'Scheduled refresh and quotas', 'Premium support + success partner'],
  },
]

const faqs = [
  {
    question: 'Is my data secure?',
    answer:
      'Yes. Workyy encrypts data in transit and at rest, follows SOC 2-ready practices, and offers private networking for enterprise plans.',
  },
  {
    question: 'Which databases and files are supported?',
    answer:
      'Snowflake, BigQuery, Redshift, Postgres, MySQL, plus CSV, TSV, and Parquet uploads. ODBC/JDBC via secure tunnel is available.',
  },
  {
    question: 'Can I control who edits a board?',
    answer:
      'Set per-board roles (view, comment, edit), invite via SSO, and audit every interaction. Public read-only links are also available.',
  },
  {
    question: 'What does the Workyy Croc do?',
    answer:
      'Croc suggests SQL snippets, explains charts, highlights anomalies, and helps tidy the canvas—always respecting your workspace permissions.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Starter is free forever. Team and Pro plans include a 14-day trial, and enterprise pilots include success support.',
  },
  {
    question: 'How does live collaboration work?',
    answer:
      'Multi-cursor editing, comments, sticky notes, and meeting embeds keep everyone in sync. Boards update instantly for all viewers.',
  },
  {
    question: 'Can I export or archive work?',
    answer: 'Export boards to PDF/PNG for exec readouts or JSON for downstream pipelines. Scheduled exports support compliance workflows.',
  },
]

const HomePage = () => {
  const { language } = useLanguage()

  const getPath = (path: string) => `/${language}${path}`

  return (
    <>
      <SEOHead
        title="Workyy | Collaborative analytics canvas"
        description="Workyy mixes SQL, Python, notes, and canvas storytelling with a friendly crocodile co-pilot."
        path={getPath('/home')}
      />
      <div className="marketing-theme">
        <main className="landing">
          {/* Section: Hero */}
          <AnimatedSection className="section hero-section" id="hero">
            <div className="section-inner two-column">
              <div className="hero-copy space-y-6">
                <p className="eyebrow">{heroContent.eyebrow}</p>
                <h1>{heroContent.headline}</h1>
                <p className="lead">{heroContent.subheadline}</p>
                <div className="flex flex-wrap gap-3 hero-ctas">
                  <a className="btn primary" href={getPath('/pricing')}>
                    {heroContent.ctas.primary}
                  </a>
                  <a className="btn secondary" href={getPath('/pricing')}>
                    {heroContent.ctas.secondary}
                  </a>
                  <a className="btn text" href={getPath('/resources/templates')}>
                    {heroContent.ctas.tertiary}
                  </a>
                </div>
                <ul className="list-disc pl-5 text-[var(--color-text-secondary)] space-y-2">
                  {heroContent.supporting.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="hero-board space-y-4">
                <div className="surface-panel rounded-2xl border border-[var(--color-border)] p-4 space-y-3">
                  <p className="eyebrow text-sm">Hero animation direction</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{heroContent.animation.scene}</p>
                  <div>
                    <p className="font-semibold text-sm mb-1">Characters</p>
                    <ul className="text-sm text-[var(--color-text-secondary)] list-disc pl-5 space-y-1">
                      {heroContent.animation.characters.map((char) => (
                        <li key={char}>{char}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-1">States / micro-interactions</p>
                    <ol className="text-sm text-[var(--color-text-secondary)] list-decimal pl-5 space-y-1">
                      {heroContent.animation.states.map((state) => (
                        <li key={state}>{state}</li>
                      ))}
                    </ol>
                  </div>
                </div>
                <NotebookDemo />
              </div>
            </div>
          </AnimatedSection>

          {/* Section: Trusted by */}
          <AnimatedSection className="section social-proof-section" id="trusted">
            <div className="section-inner text-center space-y-4">
              <p className="eyebrow">Trusted by data-driven teams</p>
              <div className="logo-row">
                {socialProofLogos.map((logo) => (
                  <span key={logo}>{logo}</span>
                ))}
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Trusted by data-driven teams from fintech to marketplace ops, APAC to North America.
              </p>
            </div>
          </AnimatedSection>

          {/* Section: Why Workyy */}
          <AnimatedSection className="section value-grid" id="benefits">
            <div className="section-inner">
              <div className="section-heading">
                <p className="eyebrow">Why Workyy</p>
                <h2>Boards built for code + context</h2>
              </div>
              <div className="cards-grid cards-grid-4">
                {valueProps.map((card, index) => (
                  <AnimatedCard key={card.title} delay={index * 60} className="card">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Section: How it works */}
          <AnimatedSection className="section how-it-works" id="how-it-works">
            <div className="section-inner">
              <div className="section-heading">
                <p className="eyebrow">How it works</p>
                <h2>From data drop to living board in four moves</h2>
              </div>
              <div className="cards-grid cards-grid-4">
                {howSteps.map((step, index) => (
                  <AnimatedCard key={step.title} delay={index * 80} className="card">
                    <span className="text-3xl" aria-hidden>
                      {step.icon}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Section: Feature grid */}
          <AnimatedSection className="section feature-showcase" id="features">
            <div className="section-inner">
              <div className="section-heading">
                <p className="eyebrow">Feature grid</p>
                <h2>Everything you need to explore, explain, and ship insights</h2>
              </div>
              <div className="cards-grid cards-grid-2">
                {featureGroups.map((group, index) => (
                  <AnimatedCard key={group.title} delay={index * 60} className="card feature">
                    <h3>{group.title}</h3>
                    <ul className="space-y-2 text-sm text-[var(--color-text-secondary)] list-disc pl-5">
                      {group.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Section: Built for... */}
          <AnimatedSection className="section personas" id="personas">
            <div className="section-inner">
              <div className="section-heading">
                <p className="eyebrow">Built for…</p>
                <h2>Different personas, one crocodile wingmate</h2>
              </div>
              <div className="personas-grid">
                {personas.map((persona, index) => (
                  <AnimatedCard key={persona.title} delay={index * 50} className="card">
                    <h3>{persona.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)] mb-2">Struggle: {persona.struggle}</p>
                    <p>{persona.help}</p>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Section: Comparison */}
          <AnimatedSection className="section comparison" id="comparison">
            <div className="section-inner">
              <div className="section-heading">
                <p className="eyebrow">How Workyy compares</p>
                <h2>Canvas + notebook hybrid vs. the rest</h2>
              </div>
              <div className="table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Tool</th>
                      <th>Where they shine</th>
                      <th>Where Workyy wins</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.tool}>
                        <td>{row.tool}</td>
                        <td>{row.shines}</td>
                        <td>{row.workyy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>

          {/* Section: Pricing */}
          <AnimatedSection className="section pricing-teaser" id="pricing">
            <div className="section-inner">
              <div className="section-heading">
                <p className="eyebrow">Pricing</p>
                <h2>Plans that scale with your team</h2>
              </div>
              <div className="cards-grid pricing-grid">
                {pricingPlans.map((plan, index) => (
                  <AnimatedCard key={plan.name} delay={index * 70} className="card feature space-y-4">
                    <div>
                      <p className="eyebrow text-sm">{plan.audience}</p>
                      <h3>{plan.name}</h3>
                    </div>
                    <ul className="list-disc pl-5 text-sm text-[var(--color-text-secondary)] space-y-2">
                      {plan.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </AnimatedCard>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <a className="btn primary" href={getPath('/pricing')}>
                  See detailed pricing
                </a>
                <a className="btn secondary" href={getPath('/pricing')}>
                  Talk to sales
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Section: FAQ */}
          <AnimatedSection className="section faq" id="faq">
            <div className="section-inner">
              <div className="section-heading">
                <p className="eyebrow">FAQ</p>
                <h2>Answers before you board the Croc express</h2>
              </div>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <AnimatedCard key={faq.question} delay={index * 60} className="card">
                    <h3>{faq.question}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">{faq.answer}</p>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Section: Footer */}
          <footer className="section footer-section">
            <div className="section-inner footer-inner">
              <p className="eyebrow">Workyy</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                Built for teams who want analytics canvases that feel playful yet precise. © {new Date().getFullYear()}{' '}
                Workyy.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}

export default HomePage

