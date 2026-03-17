import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { TrendingUp, Cpu, ArrowRight } from 'lucide-react';

const Investors = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <SEOHead page="investors" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-800 via-dark-700 to-primary-800 text-white py-24 md:py-32">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('investors.title')}
          </h1>
          <p className="text-xl md:text-2xl text-light-300 max-w-3xl mx-auto">
            {t('investors.subtitle')}
          </p>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-primary-600" size={30} />
              </div>
              <h2 className="section-title font-display">{t('investors.market.title')}</h2>
              <p className="text-dark-600 text-lg leading-relaxed">
                {t('investors.market.description')}
              </p>
            </div>
            <div className="bg-light-200 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {(t('investors.stats', { returnObjects: true }) || []).map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl font-display font-bold text-primary-600">{stat.value}</p>
                    <p className="text-dark-600 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Advantages */}
      <section className="section bg-light-200">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="space-y-4">
                {(t('investors.techAdvantages', { returnObjects: true }) || []).map(
                  (item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-accent-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-dark-700 font-medium">{item}</p>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="text-primary-600" size={30} />
              </div>
              <h2 className="section-title font-display">{t('investors.technology.title')}</h2>
              <p className="text-dark-600 text-lg leading-relaxed">
                {t('investors.technology.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-dark-800 text-white">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {t('investors.cta')}
          </h2>
          <Link
            to={`/${i18n.language}/contact`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
          >
            {t('common.contactUs')}
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Investors;
