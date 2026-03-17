import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { ExternalLink, Calendar, Newspaper } from 'lucide-react';

const News = () => {
  const { t, i18n } = useTranslation();
  const newsItems = t('news.items', { returnObjects: true }) || [];

  return (
    <>
      <SEOHead page="news" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-28">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('news.title')}
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>
      </section>

      {/* News List */}
      <section className="section bg-white">
        <div className="container-site max-w-3xl mx-auto">
          <div className="space-y-6">
            {newsItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-light-200 rounded-xl p-6 hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex items-center gap-1 text-sm text-dark-500">
                        <Calendar size={14} />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary-600">
                        <Newspaper size={14} />
                        {item.source}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-dark-800 text-lg group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <ExternalLink className="text-dark-400 group-hover:text-primary-600 transition-colors flex-shrink-0 mt-1" size={20} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-light-200">
        <div className="container-site text-center">
          <h2 className="text-2xl font-display font-bold text-dark-800 mb-4">
            {t('common.contactUs')}
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

export default News;
