import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { blogs } from "../data/blogData";
import SEO from "../components/SEO";
import type { TranslationData } from "../data/data";

interface BlogPostPageProps {
  t?: TranslationData;
  lang: 'en' | 'id';
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // If no slug is provided (e.g., from /blog), default to the first/latest post
  const activeId = slug || blogs[0].id;
  const post = blogs.find((b) => b.id === activeId);

  // Get other topics for the sidebar
  const otherTopics = blogs.filter((b) => b.id !== activeId).slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeId]);

  if (!post) {
    return (
      <div className="pt-32 pb-20 px-4 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-serif text-[#1c1209] mb-4">
          {lang === 'en' ? 'Article not found' : 'Artikel tidak ditemukan'}
        </h1>
        <p className="text-stone-600 mb-8">
          {lang === 'en' ? 'Sorry, the article you are looking for could not be found.' : 'Maaf, artikel yang Anda cari tidak dapat ditemukan.'}
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-800 text-white rounded-lg hover:bg-emerald-900 transition-colors"
        >
          <ArrowLeft size={18} />
          {lang === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.translations[lang].title,
        text: post.translations[lang].excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'en' ? "Link copied to clipboard!" : "Link disalin ke clipboard!");
    }
  };

  return (
    <div className="bg-[#fafaf9] min-h-screen pt-32 md:pt-48 pb-20">
      <SEO 
        title={`${post.translations[lang].title} | Annise Herbal Blog`}
        description={post.translations[lang].excerpt}
        canonical={`https://anniseherbal.com/blog/${post.id}`}
        image={post.imageUrl || undefined}
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* MAIN ARTICLE CONTENT */}
          <article className="lg:w-2/3 xl:w-3/4">
            {/* Header */}
            <header className="mb-8 lg:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1c1209] leading-tight mb-6">
                {post.translations[lang].title}
              </h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-stone-200">
                <div className="flex items-center gap-6 text-sm text-stone-500 font-medium">
                  <span className="flex items-center gap-2">
                    <Calendar size={16} className="text-emerald-700" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <User size={16} className="text-emerald-700" />
                    {post.author}
                  </span>
                </div>
                
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 text-sm text-stone-600 hover:text-emerald-800 transition-colors font-medium bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm hover:shadow"
                  title="Share article"
                >
                  <Share2 size={16} />
                  {lang === 'en' ? 'Share' : 'Bagikan'}
                </button>
              </div>
            </header>

            {/* Featured Image Placeholder (Modern Look) */}
            <div className="w-full h-[300px] md:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden mb-12 bg-stone-100 flex items-center justify-center relative shadow-sm border border-stone-200/50">
                <div className="absolute inset-0 bg-linear-to-tr from-emerald-900/5 to-transparent" />
                {post.imageUrl ? (
                  <img 
                    src={post.imageUrl} 
                    alt={post.translations[lang].title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-8">
                    <span className="text-stone-300 font-serif italic text-2xl md:text-4xl opacity-40 font-bold tracking-wider">Annise Herbal</span>
                  </div>
                )}
            </div>

            {/* Typography-optimized Content */}
            <div className="prose prose-lg md:prose-xl prose-stone max-w-none">
              {post.translations[lang].content.map((paragraph, index) => {
                // Check if it's a list item starting with hyphen
                if (paragraph.trim().startsWith("- ")) {
                  return (
                    <li key={index} className="text-stone-700 ml-6 mb-3 px-2">
                      {paragraph.substring(2)}
                    </li>
                  );
                }
                
                // Identify headings: Short, no ending punctuation, not entirely lowercase
                const isHeading = paragraph.length > 0 && paragraph.length < 80 && !/[.!?]$/.test(paragraph.trim()) && paragraph.toLowerCase() !== paragraph;
                
                if (isHeading) {
                  return (
                    <h3 key={index} className="text-2xl md:text-3xl font-serif font-bold text-[#1c1209] mt-12 mb-6 leading-snug">
                      {paragraph}
                    </h3>
                  );
                }

                // First paragraph drop cap or styling
                if (index === 0 && paragraph.length > 50) {
                  return (
                    <p key={index} className="leading-relaxed mb-8 text-xl md:text-2xl font-serif text-[#1c1209]/80">
                      {paragraph}
                    </p>
                  );
                }

                // Regular paragraphs
                return (
                  <p key={index} className="text-stone-700 leading-relaxed mb-6 font-medium text-[1.05rem] md:text-lg">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="lg:w-1/3 xl:w-1/4 mt-12 lg:mt-0">
            <div className="sticky top-32">
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6 border-b border-stone-200 pb-4">
                {lang === 'en' ? 'Other Topics' : 'Topik Lainnya'}
              </h3>
              
              <div className="flex flex-col gap-6">
                {otherTopics.map((topic) => (
                  <Link 
                    key={topic.id} 
                    to={`/blog/${topic.id}`}
                    className="group block bg-white rounded-2xl p-5 border border-stone-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-3 font-medium">
                       <Calendar size={12} />
                       {topic.date}
                    </div>
                    <h4 className="text-lg font-bold text-[#1c1209] mb-3 group-hover:text-emerald-800 transition-colors leading-snug line-clamp-2">
                      {topic.translations[lang].title}
                    </h4>
                    <p className="text-stone-500 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {topic.translations[lang].excerpt}
                    </p>
                    <span className="text-sm font-bold text-emerald-700 group-hover:text-emerald-900 flex items-center gap-1">
                      {lang === 'en' ? 'Read Topic' : 'Baca Topik'} <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>

              {/* Newsletter / CTA widget in sidebar */}
              <div className="mt-10 bg-emerald-900 rounded-2xl p-6 text-white text-center shadow-lg shadow-emerald-900/20">
                <h4 className="font-serif text-2xl mb-3">
                  {lang === 'en' ? 'Get Healthy Tips' : 'Dapatkan Tips Sehat'}
                </h4>
                <p className="text-emerald-100 text-sm mb-6 leading-relaxed">
                  {lang === 'en' ? 'Subscribe to receive the latest articles and exclusive offers straight to your inbox.' : 'Berlangganan untuk menerima artikel terbaru dan penawaran eksklusif langsung ke email Anda.'}
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder={lang === 'en' ? 'Email Address' : 'Alamat Email'}
                    className="w-full bg-emerald-800/50 border border-emerald-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-emerald-300/50 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <button className="w-full bg-white text-emerald-900 font-bold rounded-xl py-3 hover:bg-emerald-50 transition-colors shadow-sm">
                    {lang === 'en' ? 'Subscribe' : 'Berlangganan'}
                  </button>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
