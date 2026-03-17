import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Menu, X, ChevronDown, Globe, Brain, Building2, GraduationCap,
  Users, Briefcase, Heart, Linkedin, Facebook, Instagram, Mail
} from 'lucide-react';

const SUPPORTED_LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'it', label: 'IT' },
];

const productItems = [
  { key: 'business', path: 'products/business', icon: Building2 },
  { key: 'coaching', path: 'products/coaching-individuals', icon: Users },
  { key: 'schools', path: 'products/schools', icon: GraduationCap },
  { key: 'businessCoaches', path: 'products/business-coaches', icon: Briefcase },
  { key: 'families', path: 'products/families', icon: Heart },
];

export default function Layout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaMenuRef = useRef(null);
  const megaMenuTimeout = useRef(null);
  const langMenuRef = useRef(null);

  const currentLang = i18n.language?.substring(0, 2) || 'fr';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setLangMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setMegaMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const pathLang = location.pathname.split('/')[1];
    if (['fr', 'en', 'de', 'it'].includes(pathLang) && pathLang !== currentLang) {
      i18n.changeLanguage(pathLang);
    }
  }, [location.pathname, currentLang, i18n]);

  const langPrefix = `/${currentLang}`;

  const switchLanguage = (langCode) => {
    const pathWithoutLang = location.pathname.replace(/^\/(fr|en|de|it)/, '');
    i18n.changeLanguage(langCode);
    navigate(`/${langCode}${pathWithoutLang}`);
    setLangMenuOpen(false);
  };

  const isActive = (path) => location.pathname === `${langPrefix}${path}`;

  const navLinks = [
    { label: t('nav.research'), path: '/research' },
    { label: t('nav.resources'), children: [
      { label: t('nav.news'), path: '/news' },
      { label: t('nav.caseStudies'), path: '/case-studies' },
      { label: t('nav.faq'), path: '/faq' },
    ]},
    { label: t('nav.about'), children: [
      { label: t('nav.aboutBraincore'), path: '/about' },
      { label: t('nav.partners'), path: '/partners' },
      { label: t('nav.careers'), path: '/careers' },
    ]},
    { label: t('nav.investors'), path: '/investors' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const handleMegaMenuEnter = () => {
    clearTimeout(megaMenuTimeout.current);
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(true), 200);
  };

  const handleMegaMenuLeave = () => {
    clearTimeout(megaMenuTimeout.current);
    megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 150);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">Skip to content</a>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'}`}>
        <nav className="container-site" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to={langPrefix} className="flex items-center gap-2 cursor-pointer" aria-label="BrainCore Home">
              <Brain className="w-8 h-8 text-primary-600" />
              <span className="text-xl font-display font-bold text-dark-800">BrainCore</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <div ref={megaMenuRef} className="relative" onMouseEnter={handleMegaMenuEnter} onMouseLeave={handleMegaMenuLeave}>
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${location.pathname.includes('/products') ? 'text-primary-600 bg-primary-50' : 'text-dark-700 hover:text-primary-600 hover:bg-gray-50'}`}
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                  aria-expanded={megaMenuOpen}
                  aria-haspopup="true"
                >
                  {t('nav.products')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {megaMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 animate-fade-in-down">
                    {productItems.map(({ key, path, icon: Icon }) => (
                      <Link key={key} to={`${langPrefix}/${path}`} className="flex items-start gap-3 p-3 rounded-lg hover:bg-light-200 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <div className="font-medium text-dark-800 text-sm">{t(`products.${key}.name`)}</div>
                          <div className="text-xs text-dark-500 mt-0.5">{t(`products.${key}.short`)}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map((link) =>
                link.children ? (
                  <NavDropdown key={link.label} label={link.label} items={link.children} langPrefix={langPrefix} isActive={isActive} />
                ) : (
                  <Link key={link.path} to={`${langPrefix}${link.path}`} className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${isActive(link.path) ? 'text-primary-600 bg-primary-50' : 'text-dark-700 hover:text-primary-600 hover:bg-gray-50'}`}>
                    {link.label}
                  </Link>
                )
              )}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <div ref={langMenuRef} className="relative">
                <button onClick={() => setLangMenuOpen(!langMenuOpen)} className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-dark-600 hover:text-primary-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" aria-label="Change language">
                  <Globe className="w-4 h-4" />
                  {currentLang.toUpperCase()}
                  <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {langMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[80px] animate-fade-in-down">
                    {SUPPORTED_LANGS.map(({ code, label }) => (
                      <button key={code} onClick={() => switchLanguage(code)} className={`block w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors ${currentLang === code ? 'text-primary-600 bg-primary-50 font-medium' : 'text-dark-700 hover:bg-gray-50'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a href="#" className="px-4 py-2 text-sm font-medium text-dark-700 hover:text-primary-600 transition-colors cursor-pointer">{t('nav.signIn')}</a>
              <Link to={`${langPrefix}/contact`} className="btn-primary text-sm !py-2 !px-4">{t('nav.bookDemo')}</Link>
            </div>

            <button className="lg:hidden p-2 text-dark-700 hover:text-primary-600 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in-down">
            <div className="container-site py-4 space-y-1">
              <MobileAccordion label={t('nav.products')}>
                {productItems.map(({ key, path, icon: Icon }) => (
                  <Link key={key} to={`${langPrefix}/${path}`} className="flex items-center gap-3 py-2 px-4 text-sm text-dark-600 hover:text-primary-600 cursor-pointer">
                    <Icon className="w-4 h-4" />
                    {t(`products.${key}.name`)}
                  </Link>
                ))}
              </MobileAccordion>

              {navLinks.map((link) =>
                link.children ? (
                  <MobileAccordion key={link.label} label={link.label}>
                    {link.children.map((child) => (
                      <Link key={child.path} to={`${langPrefix}${child.path}`} className="block py-2 px-4 text-sm text-dark-600 hover:text-primary-600 cursor-pointer">
                        {child.label}
                      </Link>
                    ))}
                  </MobileAccordion>
                ) : (
                  <Link key={link.path} to={`${langPrefix}${link.path}`} className="block py-2.5 px-3 text-sm font-medium text-dark-700 hover:text-primary-600 rounded-lg cursor-pointer">
                    {link.label}
                  </Link>
                )
              )}

              <div className="flex items-center gap-2 py-2.5 px-3">
                <Globe className="w-4 h-4 text-dark-500" />
                {SUPPORTED_LANGS.map(({ code, label }) => (
                  <button key={code} onClick={() => switchLanguage(code)} className={`px-2 py-1 text-xs font-medium rounded cursor-pointer ${currentLang === code ? 'bg-primary-600 text-white' : 'text-dark-600 hover:bg-gray-100'}`}>
                    {label}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-2">
                <a href="#" className="block text-center py-2.5 text-sm font-medium text-dark-700 hover:text-primary-600 cursor-pointer">{t('nav.signIn')}</a>
                <Link to={`${langPrefix}/contact`} className="btn-primary w-full text-center text-sm">{t('nav.bookDemo')}</Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        <Outlet />
      </main>

      <footer className="bg-dark-800 text-white">
        <div className="container-site py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <Link to={langPrefix} className="flex items-center cursor-pointer">
                <img src="/logo-white.png" alt="BrainCore" className="h-8" />
              </Link>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{t('footer.description')}</p>
              <div className="flex gap-3 mt-4">
                <a href="https://www.linkedin.com/company/braincore/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer" aria-label="LinkedIn"><Linkedin className="w-4 h-4" /></a>
                <a href="https://www.facebook.com/people/BrainCore/61565885942602/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
                <a href="https://www.instagram.com/braincore_ch/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2.5">
                {[
                  { label: t('nav.products'), path: '/products/business' },
                  { label: t('nav.research'), path: '/research' },
                  { label: t('nav.aboutBraincore'), path: '/about' },
                  { label: t('nav.partners'), path: '/partners' },
                  { label: t('nav.investors'), path: '/investors' },
                  { label: t('nav.contact'), path: '/contact' },
                ].map(({ label, path }) => (
                  <li key={path}><Link to={`${langPrefix}${path}`} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">{t('nav.resources')}</h3>
              <ul className="space-y-2.5">
                {[
                  { label: t('nav.news'), path: '/news' },
                  { label: t('nav.caseStudies'), path: '/case-studies' },
                  { label: t('nav.faq'), path: '/faq' },
                  { label: t('nav.careers'), path: '/careers' },
                ].map(({ label, path }) => (
                  <li key={path}><Link to={`${langPrefix}${path}`} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">{t('nav.contact')}</h3>
              <a href="mailto:info@braincore.ch" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"><Mail className="w-4 h-4" />info@braincore.ch</a>
              <div className="mt-6">
                <h4 className="font-medium text-sm text-gray-300 mb-2">{t('footer.newsletter.title')}</h4>
                <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder={t('footer.newsletter.placeholder')} className="flex-1 px-3 py-2 bg-dark-700 rounded-lg text-sm text-white placeholder-gray-500 border border-dark-600 focus:border-primary-500 focus:outline-none" aria-label={t('footer.newsletter.placeholder')} />
                  <button type="submit" className="px-3 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors cursor-pointer">{t('footer.newsletter.subscribe')}</button>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">{t('footer.copyright', { year: new Date().getFullYear() })}</p>
            <div className="flex gap-4 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors cursor-pointer">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-gray-300 transition-colors cursor-pointer">{t('footer.terms')}</a>
              <a href="#" className="hover:text-gray-300 transition-colors cursor-pointer">{t('footer.legal')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function NavDropdown({ label, items, langPrefix, isActive }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const timeout = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => { clearTimeout(timeout.current); timeout.current = setTimeout(() => setOpen(true), 200); }} onMouseLeave={() => { clearTimeout(timeout.current); timeout.current = setTimeout(() => setOpen(false), 150); }}>
      <button onClick={() => setOpen(!open)} className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${items.some((item) => isActive(item.path)) ? 'text-primary-600 bg-primary-50' : 'text-dark-700 hover:text-primary-600 hover:bg-gray-50'}`} aria-expanded={open} aria-haspopup="true">
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 min-w-[200px] animate-fade-in-down">
          {items.map(({ label: itemLabel, path }) => (
            <Link key={path} to={`${langPrefix}${path}`} className={`block px-4 py-2.5 text-sm cursor-pointer transition-colors ${isActive(path) ? 'text-primary-600 bg-primary-50 font-medium' : 'text-dark-700 hover:bg-gray-50 hover:text-primary-600'}`}>
              {itemLabel}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileAccordion({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-2.5 px-3 text-sm font-medium text-dark-700 hover:text-primary-600 rounded-lg cursor-pointer" aria-expanded={open}>
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pl-2 pb-2 animate-fade-in">{children}</div>}
    </div>
  );
}
