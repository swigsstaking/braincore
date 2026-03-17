import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import humanismImg from '../assets/images/humanism.jpg';
import visionImg from '../assets/images/vision1.jpg';

const Research = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <SEOHead page="research" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-800 via-primary-800 to-primary-600 text-white py-20 md:py-28">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('research.title')}
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            {t('research.subtitle')}
          </p>
        </div>
      </section>

      {/* Introduction to Neurofeedback */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title font-display">{t('research.intro.title')}</h2>
              <p className="section-subtitle">
                {t('research.intro.description')}
              </p>
              <p className="text-dark-600 leading-relaxed">
                {t('research.intro.description')}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={humanismImg}
                alt={t('research.intro.title')}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section bg-light-200">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-lg">
              <img
                src={visionImg}
                alt={t('research.methodology.title')}
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="section-title font-display">{t('research.methodology.title')}</h2>
              <p className="section-subtitle">
                {t('research.methodology.description')}
              </p>
              <p className="text-dark-600 leading-relaxed">
                {t('research.methodology.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title font-display">{t('research.innovation.title')}</h2>
              <p className="section-subtitle">
                {t('research.innovation.description')}
              </p>
              <p className="text-dark-600 leading-relaxed mb-6">
                {t('research.innovation.description')}
              </p>
              <Link
                to={`/${i18n.language}/contact`}
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
              >
                {t('common.contactUs')}
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={humanismImg}
                alt={t('research.innovation.title')}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Research;
