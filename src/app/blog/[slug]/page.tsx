"use client";

import { use } from 'react';
import Link from 'next/link';
import { getBlogBySlug } from '../data/blogMetadata';
import GameDemo from '../components/GameDemo';
import BlogContent from '../components/BlogContent';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <h1 className="text-5xl font-bold text-neutral-900 mb-6">Blog Post Not Found</h1>
          <p className="text-lg text-neutral-600 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 hover:text-secondary-600 font-semibold transition-colors duration-fast group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-4 py-2"
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
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
      {/* Breadcrumb Navigation */}
      <nav className="max-w-7xl mx-auto px-6 pt-8 pb-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-neutral-600 hover:text-primary-600 transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md px-2 py-1"
            >
              Home
            </Link>
          </li>
          <li className="text-neutral-400">/</li>
          <li>
            <Link
              href="/blog"
              className="text-neutral-600 hover:text-primary-600 transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md px-2 py-1"
            >
              Blog
            </Link>
          </li>
          <li className="text-neutral-400">/</li>
          <li className="text-neutral-900 font-medium truncate max-w-xs" aria-current="page">
            {blog.title}
          </li>
        </ol>
      </nav>

      {/* Back to Blog Link */}
      <div className="max-w-7xl mx-auto px-6 pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-fast group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-3 py-2"
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
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 py-12 text-center animate-slideDown">
        <div className="flex justify-center items-center gap-3 text-sm text-neutral-600 mb-6">
          <time dateTime={blog.date} className="font-medium">
            {new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span className="text-neutral-400">·</span>
          <span className="font-semibold text-primary-600">{blog.readTime}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-8 leading-tight tracking-tight">
          {blog.title}
        </h1>

        <div className="flex flex-wrap justify-center gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white text-primary-700 rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:scale-105 transition-all duration-fast"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Demo Section */}
      {blog.hasDemo && (
        <section className="bg-white border-y border-neutral-200 py-16 shadow-sm">
          <GameDemo />
        </section>
      )}

      {/* Blog Content */}
      <section className="bg-white py-16">
        <BlogContent content={blog.content} />
      </section>

      {/* Footer Navigation */}
      <footer className="max-w-4xl mx-auto px-6 py-16 text-center border-t border-neutral-200 bg-white">
        <div className="space-y-6">
          <p className="text-neutral-600 text-lg">
            Thanks for reading! Check out more articles below.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center text-primary-600 hover:text-secondary-600 font-semibold text-lg transition-colors duration-fast group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-4 py-2"
          >
            <svg
              className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform duration-fast"
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
            Back to All Posts
          </Link>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 hover:scale-110 transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 z-sticky"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}