import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { LanguageToggle } from './LanguageToggle'
import { ThemePicker } from './ThemePicker'
import { useActiveRoute } from '../hooks/useActiveRoute'

const primaryNav = [
  { label: 'Product', path: '/product/canvas' },
  { label: 'Solutions', path: '/use-cases' },
  { label: 'Learn', path: '/resources/docs' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'For Teams', path: '/use-cases' },
]

const utilityLinks = [
  { label: 'Docs', path: '/resources/docs' },
  { label: 'Blog', path: '/resources/templates' },
]

export const Header = () => {
  const { language } = useLanguage()
  const { isActive } = useActiveRoute()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleMobileLinkClick = () => setMobileMenuOpen(false)
  const getPath = (path: string) => `/${language}${path}`
  const skipLabel = language === 'en' ? 'Skip to content' : 'Перейти к контенту'

  const desktopLinkClass = (path: string) =>
    `transition-smooth ${
      isActive(path)
        ? 'text-[var(--color-accent-primary)] font-medium'
        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
    }`

  const mobileLinks = [...primaryNav, ...utilityLinks, { label: language === 'en' ? 'Login' : 'Войти', path: '/login' }]

  return (
    <>
      <a href="#main-content" className="skip-link">
        {skipLabel}
      </a>
      <header className="sticky top-0 z-50 header-surface backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={getPath('/home')} className="text-2xl font-bold text-[var(--color-accent-primary)]">
              Workyy
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              {primaryNav.map((item) => (
                <Link key={item.label} to={getPath(item.path)} className={desktopLinkClass(item.path)}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4 text-sm">
              {utilityLinks.map((item) => (
                <Link key={item.label} to={getPath(item.path)} className={desktopLinkClass(item.path)}>
                  {item.label}
                </Link>
              ))}
              <Link to={getPath('/login')} className={desktopLinkClass('/login')}>
                {language === 'en' ? 'Login' : 'Войти'}
              </Link>
              <ThemePicker />
              <LanguageToggle />
              <Link
                to={getPath('/pricing')}
                className="px-4 py-2 rounded-md border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold hover:border-[var(--color-accent-primary)] transition-smooth"
              >
                {language === 'en' ? 'Start Free Workspace' : 'Создать workspace'}
              </Link>
              <Link
                to={getPath('/pricing')}
                className="px-4 py-2 rounded-md bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)] font-semibold hover:opacity-90 transition-smooth"
              >
                {language === 'en' ? 'Launch a Demo Board' : 'Открыть демо-доску'}
              </Link>
            </div>
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-smooth"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />
              <div
                ref={mobileMenuRef}
                className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-[var(--color-bg-root)] border-t border-[var(--color-border)] z-50 overflow-y-auto"
              >
                <div className="px-4 py-6 space-y-4 text-sm text-[var(--color-text-primary)]">
                  {mobileLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={getPath(item.path)}
                      onClick={handleMobileLinkClick}
                      className={`block px-4 py-3 rounded-md min-h-[44px] flex items-center transition-smooth ${
                        isActive(item.path)
                          ? 'bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] font-medium'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="flex items-center gap-3 px-4 py-2">
                    <ThemePicker />
                    <LanguageToggle />
                  </div>
                  <Link
                    to={getPath('/pricing')}
                    onClick={handleMobileLinkClick}
                    className="block text-center rounded-md border border-[var(--color-border)] text-[var(--color-text-primary)] py-3 font-semibold hover:border-[var(--color-accent-primary)] transition-smooth min-h-[44px] flex items-center justify-center mx-4"
                  >
                    {language === 'en' ? 'Start Free Workspace' : 'Создать workspace'}
                  </Link>
                  <Link
                    to={getPath('/pricing')}
                    onClick={handleMobileLinkClick}
                    className="block text-center rounded-md bg-[var(--color-accent-primary)] text-[var(--color-text-on-accent)] py-3 font-semibold hover:opacity-90 transition-smooth min-h-[44px] flex items-center justify-center mx-4"
                  >
                    {language === 'en' ? 'Launch a Demo Board' : 'Открыть демо-доску'}
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  )
}

