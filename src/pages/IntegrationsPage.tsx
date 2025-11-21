import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { SEOHead } from '../components/SEOHead'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const IntegrationsPage = () => {
  const { integration } = useParams<{ integration?: string }>()
  const { language, content } = useLanguage()
  const integrationsContent = content.integrations

  const getPath = (path: string) => {
    return `/${language}${path}`
  }

  const integrationKeys = ['postgres', 'snowflake', 'bigquery', 'mysql', 'csv']
  const currentIntegration = integration && integrationKeys.includes(integration) ? integrationsContent[integration] : null

  if (currentIntegration) {
    return (
      <div className="bg-[#01040f] text-white min-h-screen">
        <SEOHead
          title={currentIntegration.title}
          description={currentIntegration.description}
          path={getPath(`/integrations/${integration}`)}
        />
        <Header />

        <main className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.08),transparent_55%),radial-gradient(circle_at_bottom,_rgba(124,58,237,0.15),transparent_45%)] pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-6">{currentIntegration.title}</h1>
            <p className="text-lg text-gray-300 leading-relaxed">{currentIntegration.description}</p>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-[#01040f] text-white min-h-screen">
      <SEOHead
        title="Integrations"
        description="Connect Workyy to your data sources."
        path={getPath('/integrations')}
      />
      <Header />

      <main className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.08),transparent_55%),radial-gradient(circle_at_bottom,_rgba(124,58,237,0.15),transparent_45%)] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'en' ? 'Integrations' : 'Интеграции'}
            </h1>
            <p className="text-gray-300">
              {language === 'en'
                ? 'Connect Workyy to your favorite data sources.'
                : 'Подключите Workyy к вашим источникам данных.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrationKeys.map((key) => {
              const integ = integrationsContent[key]
              return (
                <Link
                  key={key}
                  to={getPath(`/integrations/${key}`)}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{integ.title}</h3>
                  <p className="text-sm text-gray-300">{integ.description.substring(0, 150)}...</p>
                </Link>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default IntegrationsPage

