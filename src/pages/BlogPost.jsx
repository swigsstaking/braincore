import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const BlogPost = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/public/blog/${slug}`);
      if (!res.ok) throw new Error('Post not found');
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="section bg-white">
        <div className="container-site max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="bg-light-200 rounded h-10 mb-4 w-3/4" />
            <div className="bg-light-200 rounded h-4 mb-8 w-1/3" />
            <div className="bg-light-200 rounded-xl h-64 mb-8" />
            <div className="space-y-3">
              <div className="bg-light-200 rounded h-4" />
              <div className="bg-light-200 rounded h-4" />
              <div className="bg-light-200 rounded h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="section bg-white">
        <div className="container-site max-w-3xl mx-auto text-center py-16">
          <h1 className="text-2xl font-display font-bold text-dark-800 mb-4">
            {t('notFound.title')}
          </h1>
          <p className="text-dark-500 mb-8">{t('notFound.description')}</p>
          <Link
            to={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
          >
            <ArrowLeft size={18} />
            {t('common.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead page="blog" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-24">
        <div className="container-site max-w-3xl mx-auto">
          <Link
            to={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            {t('common.back')}
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-primary-100">
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar size={16} />
                {formatDate(post.publishedAt)}
              </span>
            )}
            {post.author && (
              <span className="flex items-center gap-1.5">
                <User size={16} />
                {post.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section bg-white">
        <div className="container-site max-w-3xl mx-auto">
          {post.featuredImage && (
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full rounded-xl mb-10 shadow-lg"
            />
          )}

          {post.excerpt && (
            <p className="text-lg text-dark-600 font-medium mb-8 leading-relaxed border-l-4 border-primary-500 pl-4">
              {post.excerpt}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none text-dark-700 leading-relaxed
              prose-headings:font-display prose-headings:text-dark-800
              prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-dark-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-light-300">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={16} className="text-dark-500" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 bg-primary-50 text-primary-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <Link
              to={`/${lang}/blog`}
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              <ArrowLeft size={18} />
              {t('common.back')}
            </Link>
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
            to={`/${lang}/contact`}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors cursor-pointer"
          >
            {t('common.contactUs')}
          </Link>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
