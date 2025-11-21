import { Helmet } from 'react-helmet-async'
import { useLanguage } from '../contexts/LanguageContext'
import { useLocation } from 'react-router-dom'

interface SEOHeadProps {
  title: string
  description: string
  path?: string
}

export const SEOHead = ({ title, description, path }: SEOHeadProps) => {
  const { language } = useLanguage()
  const location = useLocation()
  const currentPath = path || location.pathname

  // Remove language prefix for base URL
  const basePath = currentPath.replace(/^\/(en|ru)/, '') || '/home'
  const baseUrl = 'https://workyy.com'
  const enUrl = `${baseUrl}/en${basePath}`
  const ruUrl = `${baseUrl}/ru${basePath}`

  return (
    <Helmet>
      <html lang={language} />
      <title>{title} | Workyy</title>
      <meta name="description" content={description} />
      <link rel="alternate" hreflang="en" href={enUrl} />
      <link rel="alternate" hreflang="ru" href={ruUrl} />
      <link rel="alternate" hreflang="x-default" href={enUrl} />
      <link rel="canonical" href={language === 'en' ? enUrl : ruUrl} />
    </Helmet>
  )
}

