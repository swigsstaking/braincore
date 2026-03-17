import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { CheckCircle, ArrowRight, Target, Lightbulb, BarChart3, ChevronDown } from 'lucide-react';

const BusinessCoaches = () => {
  const { t, i18n } = useTranslation();
  const challenges = t('products.businessCoaches.challenges.items', { returnObjects: true });
  const differenceItems = t('products.businessCoaches.difference.items', { returnObjects: true });
  const faqItems = t('products.businessCoaches.faq', { returnObjects: true });
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <SEOHead page="products-business-coaches" />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark-800 to-primary-800 text-white py-24 md:py-32">
        <div className="container-site">
          <div className="max-w-3xl">
            <p className="text-primary-200 font-semibold mb-2">{t('products.businessCoaches.name')}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              {t('products.businessCoaches.hero')}
            </h1>
            <p className="text-xl text-light-300 mb-8">
              {t('products.businessCoaches.intro')}
            </p>
            <Link
              to={`/${i18n.language}/contact`}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
            >
              {t('common.bookDemo')}
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title font-display">{t('products.businessCoaches.challenges.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {Array.isArray(challenges) &&
              challenges.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-light-200 rounded-lg p-5">
                  <Target className="text-primary-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-dark-700 font-medium">{item}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section bg-light-200">
        <div className="container-site text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Lightbulb className="text-primary-600" size={30} />
          </div>
          <h2 className="section-title font-display">{t('products.businessCoaches.solution.title')}</h2>
          <p className="text-dark-600 text-lg leading-relaxed">
            {t('products.businessCoaches.solution.description')}
          </p>
        </div>
      </section>

      {/* Why Different */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title font-display">{t('products.businessCoaches.difference.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {Array.isArray(differenceItems) &&
              differenceItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-light-200 rounded-lg p-5">
                  <CheckCircle className="text-accent-500 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-dark-700 font-medium">{item}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section bg-light-200">
        <div className="container-site text-center max-w-3xl mx-auto">
          <div className="w-14 h-14 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="text-accent-600" size={30} />
          </div>
          <h2 className="section-title font-display">{t('products.businessCoaches.outcomes.title')}</h2>
          <p className="text-dark-600 text-lg leading-relaxed">
            {t('products.businessCoaches.outcomes.description')}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-site max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title font-display">{t('common.faqSectionTitle')}</h2>
          </div>
          <div className="space-y-4">
            {Array.isArray(faqItems) &&
              faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-light-300 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-light-100 transition-colors cursor-pointer"
                  >
                    <h3 className="font-display font-bold text-dark-800 text-lg">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      size={22}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-5 pb-5 text-dark-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-dark-800 text-white">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">
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
            <Link
              to={`/${i18n.language}/contact`}
              className="inline-flex items-center gap-2 bg-white text-dark-800 px-8 py-3 rounded-lg font-semibold hover:bg-light-100 transition-colors cursor-pointer"
            >
              {t('common.requestInfo')}
            </Link>
            <Link
              to={`/${i18n.language}/contact`}
              className="inline-flex items-center gap-2 border border-light-400 text-light-200 px-8 py-3 rounded-lg font-semibold hover:bg-dark-700 transition-colors cursor-pointer"
            >
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessCoaches;
