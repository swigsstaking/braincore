import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useContact } from '../hooks/useContact';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const contactMutation = useContact();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('contact.validation.nameMin');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.validation.emailInvalid');
    }

    if (formData.phone.trim() && !/^[+]?[\d\s()-]{7,20}$/.test(formData.phone)) {
      newErrors.phone = t('contact.validation.phoneInvalid');
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = t('contact.validation.inquiryRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.validation.messageMin');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await contactMutation.mutateAsync(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' });
      setErrors({});
    } catch (error) {
      console.error('Contact form error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const inquiryOptions = ['demo', 'info', 'partnership', 'support', 'other'];

  return (
    <>
      <SEOHead page="contact" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-20">
        <div className="container-site">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="section-title font-display mb-8">{t('contact.title')}</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-dark-800 mb-1">Email</h3>
                    <a
                      href="mailto:info@braincore.ch"
                      className="text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
                    >
                      info@braincore.ch
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 bg-light-200 rounded-xl">
                <h3 className="font-display font-bold text-dark-800 mb-2">
                  {t('common.bookDemo')}
                </h3>
                <p className="text-dark-600 mb-4">
                  {t('contact.subtitle')}
                </p>
                <Link
                  to={`/${i18n.language}/contact`}
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 cursor-pointer"
                >
                  {t('common.learnMore')} &rarr;
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {submitted ? (
                <div className="bg-accent-50 border border-accent-200 rounded-xl p-8 text-center">
                  <CheckCircle className="text-accent-500 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-display font-bold text-accent-800 mb-2">
                    {t('contact.form.success')}
                  </h3>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-accent-600 hover:text-accent-700 font-semibold cursor-pointer"
                  >
                    {t('contact.form.name')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-700 mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.name ? 'border-red-400' : 'border-light-400'
                      }`}
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark-700 mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.email ? 'border-red-400' : 'border-light-400'
                      }`}
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-dark-700 mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.phone ? 'border-red-400' : 'border-light-400'
                      }`}
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-dark-700 mb-2">
                      {t('contact.form.inquiryType')} *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors cursor-pointer ${
                        errors.inquiryType ? 'border-red-400' : 'border-light-400'
                      }`}
                    >
                      <option value="">{t('contact.form.inquiryPlaceholder')}</option>
                      {inquiryOptions.map((option) => (
                        <option key={option} value={option}>
                          {t(`contact.form.inquiryOptions.${option}`)}
                        </option>
                      ))}
                    </select>
                    {errors.inquiryType && (
                      <p className="mt-1 text-sm text-red-600">{errors.inquiryType}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark-700 mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none ${
                        errors.message ? 'border-red-400' : 'border-light-400'
                      }`}
                      placeholder={t('contact.form.messagePlaceholder')}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Error state */}
                  {contactMutation.isError && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                      <AlertCircle size={20} />
                      <span>{t('contact.form.error')}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {contactMutation.isPending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
