import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { ArrowRight } from 'lucide-react';

const CaseStudies = () => {
  const { t, i18n } = useTranslation();
  const caseStudies = t('caseStudies.items', { returnObjects: true }) || [];

  return (
    <>
      <SEOHead page="case-studies" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-28">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('caseStudies.title')}
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            {t('caseStudies.subtitle')}
          </p>
        </div>
      </section>

      {/* Case Study Cards */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-light-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-2 bg-primary-600"></div>
                <div className="p-6">
                  <p className="text-sm text-primary-600 font-semibold mb-1">{study.client}</p>
                  <h3 className="font-display font-bold text-dark-800 text-xl mb-3">
                    {study.title}
                  </h3>
                  <p className="text-xs font-semibold text-dark-500 uppercase mb-1">{t('caseStudies.challengeLabel')}</p>
                  <p className="text-dark-600 text-sm mb-4">{study.challenge}</p>
                  <div className="border-t border-light-400 pt-4">
                    <p className="text-sm font-semibold text-dark-700 mb-2">{t('caseStudies.resultsLabel')}</p>
                    <div className="space-y-2">
                      {study.results.map((result, rIndex) => (
                        <div
                          key={rIndex}
                          className="flex items-center gap-2"
                        >
                          <div className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0"></div>
                          <span className="text-dark-700 text-sm font-medium">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-dark-800 text-white">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {t('home.finalCta.title')}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to={`/${i18n.language}/contact`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
