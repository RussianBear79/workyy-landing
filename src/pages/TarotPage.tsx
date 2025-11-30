import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SEOHead } from '../components/SEOHead'
import { useLanguage } from '../contexts/LanguageContext'
import { TarotGame } from '../components/tarot/TarotGame'

export default function TarotPage() {
  const { language } = useLanguage()
  const navigate = useNavigate()

  const getPath = (path: string) => `/${language}${path}`

  useEffect(() => {
    console.log('✅ TarotPage loaded')
  }, [])

  return (
    <>
      <SEOHead
        title={language === 'en' ? 'Workyy Tarot Oracle' : 'Таро-оракул Workyy'}
        description={
          language === 'en'
            ? 'Draw Past, Present, and Future cards with the Workyy oracle.'
            : 'Получите прошлое, настоящее и будущее с оракулом Workyy.'
        }
        path={getPath('/tarot')}
      />
      <div className="tarot-shell">
        <button className="tarot-shell__back" onClick={() => navigate(getPath('/home'))}>
          ← {language === 'en' ? 'Back' : 'Назад'}
        </button>
        <TarotGame />
      </div>
    </>
  )
}


