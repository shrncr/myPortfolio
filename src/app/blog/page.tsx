"use client";

import Link from 'next/link';
import { getAllBlogs } from './data/blogMetadata';

export default function BlogListPage() {
  const blogs = getAllBlogs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="text-center mb-20 animate-slideDown">
          <h1 className="text-6xl font-extrabold text-neutral-900 mb-6 tracking-tight">
            Blog
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Technical articles, project post-mortems, and development insights
          </p>
        </header>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={blog.id}
              className="bg-white rounded-xl shadow-md overflow-hidden card-hover group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {blog.featured && (
                <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg">
                  Featured
                </span>
              )}

              <div className="p-6">
                {/* Meta */}
                <div className="flex justify-between items-center mb-4 text-sm text-neutral-500">
                  <time dateTime={blog.date} className="font-medium">
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <span className="text-primary-600 font-semibold">{blog.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-neutral-900 mb-3 leading-tight group-hover:text-primary-600 transition-colors duration-normal">
                  <Link href={`/blog/${blog.slug}`} className="focus:outline-none focus:underline">
                    {blog.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-neutral-600 leading-relaxed mb-6 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium hover:bg-primary-100 transition-colors duration-fast"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-secondary-600 transition-colors duration-fast group/link focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
                >
                  Read Article
                  <svg
                    className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-fast"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Back to Portfolio Link */}
        <div className="text-center mt-20">
          <Link
            href="/"
            className="inline-flex items-center text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-fast group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-4 py-2"
          >
            <svg
              className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-fast"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}