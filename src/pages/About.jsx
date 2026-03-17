import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import humanismImg from '../assets/images/humanism.jpg';
import { Heart, BookOpen, Lightbulb, FlaskConical, User } from 'lucide-react';

const valueIcons = [Heart, BookOpen, Lightbulb, FlaskConical];

const About = () => {
  const { t, i18n } = useTranslation();
  const values = t('about.values.items', { returnObjects: true });

  const teamPlaceholders = t('about.team.members', { returnObjects: true }) || [];

  return (
    <>
      <SEOHead page="about" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-28">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('about.title')}
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title font-display">{t('about.mission.title')}</h2>
              <p className="text-dark-600 text-lg leading-relaxed">
                {t('about.mission.description')}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={humanismImg}
                alt={t('about.mission.title')}
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section bg-light-200">
        <div className="container-site text-center max-w-3xl mx-auto">
          <h2 className="section-title font-display">{t('about.vision.title')}</h2>
          <p className="section-subtitle">
            {t('about.vision.description')}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title font-display">{t('about.values.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(values) &&
              values.map((value, index) => {
                const Icon = valueIcons[index] || Heart;
                return (
                  <div
                    key={index}
                    className="bg-light-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-primary-600" size={28} />
                    </div>
                    <h3 className="font-display font-bold text-dark-800 text-lg mb-2">
                      {value.title}
                    </h3>
                    <p className="text-dark-600 text-sm">{value.description}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-light-200">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title font-display">{t('about.team.title')}</h2>
            <p className="section-subtitle mx-auto">{t('about.team.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamPlaceholders.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-primary-600" size={36} />
                </div>
                <h3 className="font-display font-bold text-dark-800 mb-1">{member.name}</h3>
                <p className="text-dark-600 text-sm">{member.role}</p>
              </div>
            ))}
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

export default About;
