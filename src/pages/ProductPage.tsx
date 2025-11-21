import { useParams, Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { SEOHead } from '../components/SEOHead'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const ProductPage = () => {
  const { section } = useParams<{ section?: string }>()
  const { language, content } = useLanguage()
  const productContent = content.product

  const getPath = (path: string) => {
    return `/${language}${path}`
  }

  const sections = [
    { id: 'canvas', content: productContent.canvas },
    { id: 'collaboration', content: productContent.collaboration },
    { id: 'performance', content: productContent.performance },
  ]

  const currentSection = section ? sections.find((s) => s.id === section) : null
  const displaySection = currentSection || sections[0]

  return (
    <div className="bg-[#01040f] text-white min-h-screen">
      <SEOHead
        title={`${displaySection.content.title} - Product`}
        description={displaySection.content.description}
        path={getPath(`/product/${displaySection.id}`)}
      />
      <Header />

      <main className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.08),transparent_55%),radial-gradient(circle_at_bottom,_rgba(124,58,237,0.15),transparent_45%)] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-12 flex gap-4 border-b border-white/10 pb-4">
            {sections.map((s) => (
              <Link
                key={s.id}
                to={getPath(`/product/${s.id}`)}
                className={`px-4 py-2 rounded-md transition ${
                  (section === s.id || (!section && s.id === 'canvas'))
                    ? 'bg-brand-green text-[#01040f]'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {s.content.title}
              </Link>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-6">{displaySection.content.title}</h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">{displaySection.content.description}</p>
              <Link
                to={getPath('/pricing')}
                className="inline-block px-6 py-3 rounded-md bg-brand-green text-[#01040f] font-semibold hover:bg-green-400 transition"
              >
                {displaySection.content.cta}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductPage

