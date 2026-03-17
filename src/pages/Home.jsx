import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  GraduationCap,
  Briefcase,
  Heart,
  ArrowRight,
  Quote,
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import heroMainImg from '../assets/images/hero-main.jpg';
import interdisciplinaryImg from '../assets/images/interdisciplinary.jpg';

const Home = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const audiences = [
    {
      icon: Building2,
      label: t('products.business.name'),
      short: t('products.business.short'),
      to: `/${lang}/products/business`,
    },
    {
      icon: Users,
      label: t('products.coaching.name'),
      short: t('products.coaching.short'),
      to: `/${lang}/products/coaching-individuals`,
    },
    {
      icon: GraduationCap,
      label: t('products.schools.name'),
      short: t('products.schools.short'),
      to: `/${lang}/products/schools`,
    },
    {
      icon: Briefcase,
      label: t('products.businessCoaches.name'),
      short: t('products.businessCoaches.short'),
      to: `/${lang}/products/business-coaches`,
    },
    {
      icon: Heart,
      label: t('products.families.name'),
      short: t('products.families.short'),
      to: `/${lang}/products/families`,
    },
  ];

  const steps = t('home.howItWorks.steps', { returnObjects: true });

  const testimonials = t('home.testimonials.items', { returnObjects: true });

  return (
    <>
      <SEOHead page="home" />

      {/* ========== HERO SECTION ========== */}
      <section className="relative bg-gradient-to-br from-dark-800 to-primary-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Background image overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${heroMainImg})` }}
          aria-hidden="true"
        />
        <div className="relative container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                {t('home.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl font-display text-primary-200 mb-4">
                {t('home.hero.subtitle')}
              </p>
              <p className="text-lg text-light-200/80 mb-8 max-w-xl">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to={`/${lang}/contact`} className="btn-cta">
                  {t('home.hero.cta1')}
                  <ArrowRight size={20} />
                </Link>
                <Link to={`/${lang}/products/business`} className="btn-outline-white">
                  {t('home.hero.cta2')}
                </Link>
              </div>
            </div>

            {/* Video embed placeholder */}
            <div className="bg-dark-800/60 rounded-2xl aspect-video flex items-center justify-center border border-white/10">
              <span className="text-white/40 text-sm">{t('home.video.placeholder')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== AUDIENCE SECTION ========== */}
      <section className="section bg-light-200">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('home.audience.title')}</h2>
            <p className="section-subtitle mx-auto">
              {t('home.audience.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {audiences.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.to} to={item.to} className="card-bordered text-center group">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-100 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-200">
                    <Icon
                      size={28}
                      className="text-primary-600 group-hover:text-white transition-colors duration-200"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-dark-800 mb-1">
                    {item.label}
                  </h3>
                  <p className="text-sm text-dark-500">{item.short}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-16">
            <h2 className="section-title">{t('home.howItWorks.title')}</h2>
            <p className="section-subtitle mx-auto">
              {t('home.howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(steps) &&
              steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-display font-bold">
                    {index + 1}
                  </div>
                  <h3 className="font-display font-semibold text-dark-800 text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-dark-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ========== SCIENCE / CREDIBILITY ========== */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-600 text-sm font-semibold mb-4">
                {t('home.science.label')}
              </div>
              <h2 className="section-title">{t('home.science.title')}</h2>
              <p className="section-subtitle mb-4">
                {t('home.science.subtitle')}
              </p>
              <p className="text-dark-500 mb-8 leading-relaxed">
                {t('home.science.description')}
              </p>
              <Link
                to={`/${lang}/research`}
                className="btn-primary"
              >
                {t('home.science.cta')}
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-200 to-primary-400 rounded-2xl opacity-20 blur-xl" />
              <img
                src={interdisciplinaryImg}
                alt="BrainCore interdisciplinary research"
                className="relative rounded-2xl w-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="section bg-light-200">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('home.testimonials.title')}</h2>
            <p className="section-subtitle mx-auto">
              {t('home.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(testimonials) && testimonials.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-light-300"
              >
                <Quote
                  size={32}
                  className="text-primary-300 mb-4"
                />
                <p className="text-dark-600 mb-6 italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <p className="font-display font-semibold text-dark-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-dark-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PARTNERS ========== */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('home.partners.title')}</h2>
            <p className="section-subtitle mx-auto">
              {t('home.partners.subtitle')}
            </p>
          </div>

          {/* Placeholder logo grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-32 h-16 bg-light-200 rounded-lg flex items-center justify-center"
              >
                <span className="text-dark-400 text-xs">{t('home.partners.placeholder', { number: i })}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="section bg-dark-800 text-white">
        <div className="container-site text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('home.finalCta.title')}
          </h2>
          <p className="text-lg text-light-200/70 mb-10 max-w-2xl mx-auto">
            {t('home.finalCta.subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={`/${lang}/contact`} className="btn-cta">
              {t('home.finalCta.cta1')}
              <ArrowRight size={20} />
            </Link>
            <Link to={`/${lang}/contact`} className="btn-outline-white">
              {t('home.finalCta.cta2')}
            </Link>
            <Link to={`/${lang}/products/business`} className="btn-outline-white">
              {t('home.finalCta.cta3')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
