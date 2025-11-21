import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { SEOHead } from '../components/SEOHead'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

const PricingPage = () => {
  const { language, content } = useLanguage()
  const pricingContent = content.pricing

  const getPath = (path: string) => {
    return `/${language}${path}`
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Demo Request Submitted:', formData)
    alert(language === 'en' ? 'Your demo request has been sent!' : 'Ваш запрос на демо отправлен!')
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  return (
    <div className="bg-[#01040f] text-white min-h-screen">
      <SEOHead
        title={pricingContent.title}
        description={pricingContent.description}
        path={getPath('/pricing')}
      />
      <Header />

      <main className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.08),transparent_55%),radial-gradient(circle_at_bottom,_rgba(124,58,237,0.15),transparent_45%)] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{pricingContent.title}</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">{pricingContent.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {pricingContent.plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-[#07122b] rounded-2xl p-8 border ${
                  plan.highlight ? 'border-brand-green shadow-lg shadow-brand-green/20' : 'border-white/10'
                } flex flex-col`}
              >
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-5xl font-bold text-brand-green mb-2">{plan.price}</p>
                <ul className="space-y-3 text-gray-200 flex-grow mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-brand-green mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.cta === 'Contact Sales' ? '#contact-form' : '#'}
                  className={`block w-full text-center py-3 rounded-md font-semibold transition ${
                    plan.highlight
                      ? 'bg-brand-green text-[#01040f] hover:bg-green-400'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  onClick={plan.cta === 'Contact Sales' ? undefined : (e) => {
                    e.preventDefault()
                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <div id="contact-form" className="bg-[#07122b] rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">
              {language === 'en' ? 'Contact us for a Demo' : 'Связаться для демо'}
            </h2>
            <p className="text-gray-300 text-center mb-8">
              {language === 'en'
                ? 'Interested in an Enterprise plan or a personalized walkthrough? Fill out the form below, and we'll get in touch.'
                : 'Заинтересованы в Enterprise-плане или персональной демонстрации? Заполните форму ниже, и мы свяжемся с вами.'}
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'en' ? 'Your Name' : 'Ваше имя'}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 focus:ring-brand-green focus:border-brand-green outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'en' ? 'Work Email' : 'Рабочий email'}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 focus:ring-brand-green focus:border-brand-green outline-none"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'en' ? 'Company Name' : 'Название компании'}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 focus:ring-brand-green focus:border-brand-green outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {language === 'en' ? 'Your Message (Optional)' : 'Ваше сообщение (необязательно)'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-md bg-white/5 border border-white/10 focus:ring-brand-green focus:border-brand-green outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-md bg-brand-green text-[#01040f] font-semibold hover:bg-green-400 transition"
              >
                {language === 'en' ? 'Request a Demo' : 'Запросить демо'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PricingPage

