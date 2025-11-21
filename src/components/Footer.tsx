import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export const Footer = () => {
  const { language } = useLanguage()

  const getPath = (path: string) => {
    return `/${language}${path}`
  }

  const footerColumns = [
    {
      title: 'PRODUCT',
      links: [
        { path: '/product/canvas', label: 'The Canvas' },
        { path: '/product/collaboration', label: 'Collaboration' },
        { path: '/product/performance', label: 'Performance' },
        { path: '/pricing', label: 'Pricing' },
        { path: '/changelog', label: 'Changelog' },
        { path: '/roadmap', label: 'Roadmap' },
      ],
    },
    {
      title: 'USE CASES',
      links: [
        { path: '/use-cases/data-analysis', label: 'Data analysis' },
        { path: '/use-cases/self-serve', label: 'Self-serve analytics' },
        { path: '/use-cases/reporting', label: 'Reporting' },
        { path: '/use-cases/data-modeling', label: 'Data modeling' },
        { path: '/use-cases/product-analytics', label: 'Product analytics' },
        { path: '/use-cases/finance-ops', label: 'Finance & Ops' },
      ],
    },
    {
      title: 'COMPARE',
      links: [
        { path: '/compare/classic-bi', label: language === 'en' ? 'Workyy vs. Classic BI' : 'Workyy vs. классические BI' },
        { path: '/compare/notebooks', label: language === 'en' ? 'Workyy vs. Notebooks' : 'Workyy vs. ноутбуки' },
        { path: '/compare/small-teams', label: language === 'en' ? 'Workyy for Small Teams' : 'Workyy для маленьких команд' },
        { path: '/compare/startups', label: language === 'en' ? 'Workyy for Startups' : 'Workyy для стартапов' },
      ],
    },
    {
      title: 'INTEGRATIONS',
      links: [
        { path: '/integrations/postgres', label: 'Postgres' },
        { path: '/integrations/snowflake', label: 'Snowflake' },
        { path: '/integrations/bigquery', label: 'BigQuery' },
        { path: '/integrations/mysql', label: 'MySQL' },
        { path: '/integrations/csv', label: 'CSV / файлы' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { path: '/resources/security', label: 'Security' },
        { path: '/resources/privacy', label: 'Privacy Policy' },
        { path: '/resources/terms', label: 'Terms of Use' },
      ],
    },
  ]

  return (
    <footer className="bg-[#01040f] border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-2xl font-bold text-brand-green mb-4">Workyy</h3>
          <p className="text-gray-400 text-sm">
            {language === 'en'
              ? 'Mixed SQL and Python nodes, DAG and collaborative analytics on one canvas.'
              : 'Смешанные SQL и Python узлы, DAG и совместная аналитика на одной канве.'}
          </p>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h4 className="font-semibold text-white mb-4">{column.title}</h4>
            <ul className="space-y-2 text-gray-400">
              {column.links.map((link) => (
                <li key={link.path}>
                  <Link to={getPath(link.path)} className="hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

