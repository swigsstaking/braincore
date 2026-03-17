import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Building2, GraduationCap, Briefcase, School, Beaker } from 'lucide-react';

const categoryIcons = {
  research: Beaker,
  clinical: Building2,
  corporate: Briefcase,
  education: GraduationCap,
};

const Partners = () => {
  const { t, i18n } = useTranslation();
  const partnerItems = t('partners.items', { returnObjects: true }) || [];
  const [activeFilter, setActiveFilter] = useState('all');

  const categoryKeys = ['research', 'clinical', 'corporate', 'education'];

  const filtered = activeFilter === 'all'
    ? partnerItems
    : partnerItems.filter((p) => p.category === activeFilter);

  return (
    <>
      <SEOHead page="partners" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-28">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('partners.title')}
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeFilter === 'all' ? 'bg-primary-600 text-white' : 'bg-light-200 text-dark-600 hover:bg-light-300'}`}
            >
              {t('partners.allFilter')}
            </button>
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeFilter === key ? 'bg-primary-600 text-white' : 'bg-light-200 text-dark-600 hover:bg-light-300'}`}
              >
                {t(`partners.categories.${key}`)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(filtered) && filtered.map((partner, index) => {
              const Icon = categoryIcons[partner.category] || Building2;
              return (
                <div
                  key={index}
                  className="bg-light-200 border border-light-300 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-primary-600" size={28} />
                  </div>
                  <h3 className="font-display font-bold text-dark-800 mb-1">{partner.name}</h3>
                  <p className="text-xs text-primary-600 font-medium mb-2">{t(`partners.categories.${partner.category}`)}</p>
                  <p className="text-dark-600 text-sm">{partner.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-dark-800 text-white">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
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

export default Partners;
