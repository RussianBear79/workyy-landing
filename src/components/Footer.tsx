import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const footerCopy = {
  en: {
    brandTitle: 'Workyy',
    brandDescription: 'Mixed SQL + Python nodes, DAGs, and collaborative analytics on one canvas.',
    columns: [
      {
        title: 'Product',
        links: [
          { path: '/product/canvas', label: 'Canvas & Cells' },
          { path: '/product/collaboration', label: 'Collaboration' },
          { path: '/product/performance', label: 'Performance' },
          { path: '/integrations/postgres', label: 'Integrations' },
        ],
      },
      {
        title: 'Solutions',
        links: [
          { path: '/use-cases/data-analysis', label: 'Data Teams' },
          { path: '/use-cases/product-analytics', label: 'Product Analytics' },
          { path: '/use-cases/finance-ops', label: 'RevOps & Finance' },
          { path: '/use-cases', label: 'Startups' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { path: '/resources/docs', label: 'Docs' },
          { path: '/resources/templates', label: 'Tutorials & Templates' },
          { path: '/resources/security', label: 'Security' },
          { path: '/resources/privacy', label: 'Privacy & Terms' },
        ],
      },
      {
        title: 'Company',
        links: [
          { path: '/about', label: 'About' },
          { path: '/careers', label: 'Careers' },
          { path: '/changelog', label: 'Changelog' },
          { path: '/roadmap', label: 'Roadmap' },
        ],
      },
    ],
    social: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com' },
      { label: 'Twitter/X', href: 'https://twitter.com' },
      { label: 'YouTube', href: 'https://youtube.com' },
      { label: 'Discord', href: 'https://discord.com' },
    ],
    cta: {
      title: 'Ready to build your first board?',
      subtitle: 'Launch Workyy, invite Croc, and start exploring data together.',
      action: 'Launch Workyy',
    },
  },
  ru: {
    brandTitle: 'Workyy',
    brandDescription: 'SQL и Python ячейки, DAG и совместная аналитика на одном полотне.',
    columns: [
      {
        title: 'Продукт',
        links: [
          { path: '/product/canvas', label: 'Канва и ячейки' },
          { path: '/product/collaboration', label: 'Коллаборация' },
          { path: '/product/performance', label: 'Производительность' },
          { path: '/integrations/postgres', label: 'Интеграции' },
        ],
      },
      {
        title: 'Решения',
        links: [
          { path: '/use-cases/data-analysis', label: 'Аналитические команды' },
          { path: '/use-cases/product-analytics', label: 'Product analytics' },
          { path: '/use-cases/finance-ops', label: 'RevOps и финансы' },
          { path: '/use-cases', label: 'Стартапы' },
        ],
      },
      {
        title: 'Ресурсы',
        links: [
          { path: '/resources/docs', label: 'Документация' },
          { path: '/resources/templates', label: 'Туториалы и шаблоны' },
          { path: '/resources/security', label: 'Безопасность' },
          { path: '/resources/privacy', label: 'Политика и условия' },
        ],
      },
      {
        title: 'Компания',
        links: [
          { path: '/about', label: 'О нас' },
          { path: '/careers', label: 'Карьера' },
          { path: '/changelog', label: 'Changelog' },
          { path: '/roadmap', label: 'Дорожная карта' },
        ],
      },
    ],
    social: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com' },
      { label: 'Twitter/X', href: 'https://twitter.com' },
      { label: 'YouTube', href: 'https://youtube.com' },
      { label: 'Discord', href: 'https://discord.com' },
    ],
    cta: {
      title: 'Готовы создать первую доску?',
      subtitle: 'Запустите Workyy, пригласите Croc и исследуйте данные вместе.',
      action: 'Запустить Workyy',
    },
  },
}

export const Footer = () => {
  const { language } = useLanguage()
  const copy = footerCopy[language as 'en' | 'ru'] ?? footerCopy.en

  const getPath = (path: string) => {
    return `/${language}${path}`
  }

  return (
    <footer className="border-t border-[var(--color-border)] py-16 transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div className="col-span-2 md:col-span-2 space-y-3">
            <h3 className="text-2xl font-bold text-[var(--color-accent-primary)]">{copy.brandTitle}</h3>
            <p className="text-[var(--color-text-muted)]">{copy.brandDescription}</p>
          </div>
          {copy.columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">{column.title}</h4>
              <ul className="space-y-2 text-[var(--color-text-muted)]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={getPath(link.path)} className="hover:text-[var(--color-text-primary)] transition-smooth">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-3">{language === 'en' ? 'Social' : 'Соцсети'}</h4>
            <ul className="space-y-2 text-[var(--color-text-muted)]">
              {copy.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[var(--color-text-primary)] transition-smooth"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold text-[var(--color-text-primary)]">{copy.cta.title}</p>
            <p className="text-[var(--color-text-muted)] text-sm">{copy.cta.subtitle}</p>
          </div>
          <Link
            to={getPath('/pricing')}
            className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)] font-semibold hover:opacity-90 transition-smooth"
          >
            {copy.cta.action}
          </Link>
        </div>
      </div>
    </footer>
  )
}
