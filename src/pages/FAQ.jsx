import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const faqItems = t('faq.items', { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <SEOHead page="faq" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-28">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('faq.title')}
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section bg-white">
        <div className="container-site max-w-3xl mx-auto">
          <div className="space-y-4">
            {Array.isArray(faqItems) &&
              faqItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-light-300 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-light-100 transition-colors cursor-pointer"
                  >
                    <h3 className="font-display font-bold text-dark-800 text-lg">
                      {item.question}
                    </h3>
                    <ChevronDown
                      className={`text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      size={22}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
      <section className="section bg-light-200">
        <div className="container-site text-center">
          <h2 className="text-2xl font-display font-bold text-dark-800 mb-4">
            {t('home.finalCta.title')}
          </h2>
          <Link
            to={`/${i18n.language}/contact`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
          >
            {t('common.contactUs')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default FAQ;
