import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Research from './pages/Research';
import About from './pages/About';
import Partners from './pages/Partners';
import Careers from './pages/Careers';
import Investors from './pages/Investors';
import News from './pages/News';
import CaseStudies from './pages/CaseStudies';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';

// Product pages
import ProductBusiness from './pages/products/Business';
import ProductCoaching from './pages/products/CoachingIndividuals';
import ProductSchools from './pages/products/Schools';
import ProductBusinessCoaches from './pages/products/BusinessCoaches';
import ProductFamilies from './pages/products/Families';

const SUPPORTED_LANGS = ['fr', 'en', 'de', 'it'];

function AppRoutes() {
  const { i18n } = useTranslation();

  return (
    <Routes>
      {/* Redirect root to default language */}
      <Route path="/" element={<Navigate to={`/${i18n.language || 'fr'}`} replace />} />

      {/* Language-prefixed routes */}
      {SUPPORTED_LANGS.map((lang) => (
        <Route key={lang} path={`/${lang}`} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="research" element={<Research />} />
          <Route path="about" element={<About />} />
          <Route path="partners" element={<Partners />} />
          <Route path="careers" element={<Careers />} />
          <Route path="investors" element={<Investors />} />
          <Route path="news" element={<News />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="products/business" element={<ProductBusiness />} />
          <Route path="products/coaching-individuals" element={<ProductCoaching />} />
          <Route path="products/schools" element={<ProductSchools />} />
          <Route path="products/business-coaches" element={<ProductBusinessCoaches />} />
          <Route path="products/families" element={<ProductFamilies />} />
        </Route>
      ))}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
