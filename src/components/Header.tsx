import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

export const Header = () => {
  const { language, content } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navMenus = [
    {
      id: 'product',
      label: 'Product',
      links: [
        { path: '/product/canvas', label: 'The Canvas' },
        { path: '/product/collaboration', label: 'Collaboration' },
        { path: '/product/performance', label: 'Performance' },
      ],
    },
    {
      id: 'learn',
      label: 'Learn',
      links: [
        { path: '/changelog', label: 'Changelog' },
        { path: '/roadmap', label: 'Roadmap' },
      ],
    },
    {
      id: 'pricing',
      label: 'Pricing',
      links: [
        { path: '/pricing', label: 'View Pricing' },
      ],
    },
  ]

  const handleDropdownToggle = (menu: string) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu))
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getPath = (path: string) => {
    return `/${language}${path}`
  }

  const skipLabel = language === 'en' ? 'Skip to content' : 'Перейти к контенту'

  return (
    <>
      <a href="#main-content" className="skip-link">
        {skipLabel}
      </a>
      <header className="sticky top-0 z-50 header-surface backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={getPath('/home')} className="text-2xl font-bold text-brand-green">
            Workyy
          </Link>
          <nav ref={dropdownRef} className="hidden md:flex items-center space-x-8 text-sm">
            {navMenus.map((menu) => (
              <div key={menu.id} className="relative">
                <button
                  onClick={() => handleDropdownToggle(menu.id)}
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition"
                >
                  {menu.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === menu.id && (
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-white/10 bg-[#07122b] shadow-lg">
                    {menu.links.map((link) => (
                      <Link
                        key={link.path}
                        to={getPath(link.path)}
                        className="block px-4 py-2 text-gray-300 hover:bg-white/10 transition"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to={getPath('/use-cases')} className="text-gray-300 hover:text-white transition">
              Use cases
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <LanguageToggle />
            <Link
              to={getPath('/pricing')}
              className="px-4 py-2 rounded-md bg-brand-green text-[#01040f] font-semibold hover:bg-green-400 transition"
            >
              {language === 'en' ? 'Try Demo' : 'Попробовать демо'}
            </Link>
          </div>
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden text-gray-300 hover:text-white transition"
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
          <div className="md:hidden border-t border-white/10 py-4 space-y-3 text-sm text-gray-200">
            {navMenus.map((menu) => (
              <div key={menu.id}>
                <div className="font-semibold mb-2">{menu.label}</div>
                {menu.links.map((link) => (
                  <Link key={link.path} to={getPath(link.path)} className="block pl-4 py-1 text-gray-300">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link to={getPath('/use-cases')} className="block">
              Use cases
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            <Link
              to={getPath('/pricing')}
              className="block text-center rounded-md bg-brand-green text-[#01040f] py-2 font-semibold"
            >
              {language === 'en' ? 'Try Demo' : 'Попробовать демо'}
            </Link>
          </div>
        )}
      </div>
    </header>
    </>
  )
}

