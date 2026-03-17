import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Home, ShoppingBag, Mail } from 'lucide-react';

const NotFound = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <SEOHead page="not-found" />

      <section className="min-h-[60vh] flex items-center bg-light-200">
        <div className="container-site text-center py-20">
          <h1 className="text-8xl md:text-9xl font-display font-bold text-primary-600 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark-800 mb-4">
            {t('notFound.title')}
          </h2>
          <p className="text-lg text-dark-600 max-w-lg mx-auto mb-10">
            {t('notFound.description')}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to={`/${i18n.language}`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
            >
              <Home size={20} />
              {t('notFound.backHome')}
            </Link>
            <Link
              to={`/${i18n.language}/products/business`}
              className="inline-flex items-center gap-2 bg-white text-dark-800 px-6 py-3 rounded-lg font-semibold border border-light-400 hover:bg-light-100 transition-colors cursor-pointer"
            >
              <ShoppingBag size={20} />
              {t('notFound.products')}
            </Link>
            <Link
              to={`/${i18n.language}/contact`}
              className="inline-flex items-center gap-2 bg-white text-dark-800 px-6 py-3 rounded-lg font-semibold border border-light-400 hover:bg-light-100 transition-colors cursor-pointer"
            >
              <Mail size={20} />
              {t('notFound.contact')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
