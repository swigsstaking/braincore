import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PenLine, Calendar, ArrowRight, User } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import seoData from '../data/seo.json';

const API_URL = import.meta.env.VITE_API_URL || 'https://swigs.online/api';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const { data: siteData } = useQuery({
    queryKey: ['siteInfo', seoData.site.slug],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/public/sites/${seoData.site.slug}`);
      if (!res.ok) throw new Error('Failed to fetch site');
      const json = await res.json();
      return json.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog', siteData?._id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/public/blog?siteId=${siteData._id}`);
      if (!res.ok) throw new Error('Failed to fetch blog posts');
      const json = await res.json();
      return json.data || [];
    },
    enabled: !!siteData?._id,
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

  return (
    <>
      <SEOHead page="blog" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 md:py-28">
        <div className="container-site text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section bg-white">
        <div className="container-site">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-light-200 rounded-xl h-48 mb-4" />
                  <div className="bg-light-200 rounded h-6 mb-2 w-3/4" />
                  <div className="bg-light-200 rounded h-4 mb-2" />
                  <div className="bg-light-200 rounded h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : !posts || posts.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-primary-100 flex items-center justify-center">
                <PenLine className="w-10 h-10 text-primary-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-dark-800 mb-4">
                {t('blog.comingSoon')}
              </h2>
              <p className="text-dark-500 mb-8 leading-relaxed">
                {t('blog.comingSoonDescription')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  to={`/${lang}/blog/${post.slug}`}
                  className="group bg-white rounded-xl border border-light-300 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.featuredImage && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-sm text-dark-500">
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {post.author}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-dark-800 text-lg mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-dark-500 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-primary-50 text-primary-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-semibold">
                      {t('common.readMore')}
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
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

export default Blog;
