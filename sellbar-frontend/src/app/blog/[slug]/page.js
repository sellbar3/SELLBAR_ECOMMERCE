import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ChevronRight, 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Smartphone, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { BLOG_POSTS, getBlogPostBySlug } from '@/lib/blogData';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Article Not Found | Sellbar.in' };

  return {
    title: `${post.title} | Sellbar Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostDetailPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#13b59b] transition">Home</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/blog" className="hover:text-[#13b59b] transition">Blog</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-slate-900 font-bold truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#13b59b] transition mb-6"
        >
          <ArrowLeft size={14} /> Back to all articles
        </Link>

        {/* Article header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#13b59b] text-xs font-black border border-emerald-100">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar size={13} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Clock size={13} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between pt-6 border-t border-slate-100 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-[#13b59b] font-black flex items-center justify-center text-sm">
                {post.author[0]}
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">{post.author}</div>
                <div className="text-[11px] text-slate-400">{post.authorRole}</div>
              </div>
            </div>

            {post.tags && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-100">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Article content */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* CTA Banner */}
        <div className="mt-8 bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/10 text-teal-300 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              Instant Valuation
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to turn your old phone into instant cash?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Get an accurate AI-calculated price quote and free doorstep pickup in Bettiah, Bagaha, Motihari and all across Bihar.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/sell-old-mobile-phone"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#13b59b] hover:bg-[#0fa088] text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                <Smartphone size={15} /> Check Resale Value
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition backdrop-blur-xs"
              >
                <ShoppingBag size={15} /> Browse Refurbished Store
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-12 space-y-6">
            <h3 className="text-lg font-black text-slate-900">Recommended Next Reads</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#13b59b] hover:shadow-md transition group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-black uppercase text-[#13b59b] tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-[#13b59b] transition mt-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#13b59b]">
                    <span>Read Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
