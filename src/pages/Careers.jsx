import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { CheckCircle, Briefcase } from 'lucide-react';

const Careers = () => {
  const { t, i18n } = useTranslation();
  const whyItems = t('careers.why.items', { returnObjects: true });

  return (
    <>
      <SEOHead page="careers" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-28">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('careers.title')}
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            {t('careers.subtitle')}
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="section bg-white">
        <div className="container-site max-w-3xl mx-auto text-center">
          <h2 className="section-title font-display">{t('careers.culture.title')}</h2>
          <p className="section-subtitle">
            {t('careers.culture.description')}
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="section bg-light-200">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title font-display">{t('careers.why.title')}</h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {Array.isArray(whyItems) &&
              whyItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white rounded-lg p-5 shadow-sm"
                >
                  <CheckCircle className="text-accent-500 flex-shrink-0 mt-0.5" size={22} />
                  <p className="text-dark-700 font-medium">{item}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title font-display">{t('careers.openRoles')}</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-light-200 rounded-xl p-8 text-center">
              <Briefcase className="text-dark-400 mx-auto mb-4" size={40} />
              <p className="text-dark-600">
                {t('careers.noRoles')}{' '}
                <a
                  href="mailto:info@braincore.ch"
                  className="text-primary-600 hover:text-primary-700 font-semibold cursor-pointer"
                >
                  info@braincore.ch
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-primary-600 text-white">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {t('home.finalCta.title')}
          </h2>
          <Link
            to={`/${i18n.language}/contact`}
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors cursor-pointer"
          >
            {t('common.contactUs')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Careers;
