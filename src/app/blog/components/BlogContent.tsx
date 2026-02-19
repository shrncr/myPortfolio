"use client";

import ReactMarkdown from 'react-markdown';

interface BlogContentProps {
  content: string;
}

/**
 * BlogContent Component
 * Renders markdown blog content with Notion-inspired styling
 * Features: Clean typography, generous spacing, visual hierarchy, code highlighting
 */
export default function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 font-serif">
      <ReactMarkdown
        components={{
          // H1: Large, bold, extra spacing
          h1: ({ children }) => (
            <h1 className="font-sans text-5xl font-extrabold text-neutral-900 mt-16 mb-6 leading-tight tracking-tight first:mt-0">
              {children}
            </h1>
          ),
          
          // H2: Section headers with subtle border
          h2: ({ children }) => (
            <h2 className="font-sans text-3xl font-bold text-neutral-900 mt-16 mb-6 pb-3 border-b border-neutral-200 flex flex-wrap items-baseline gap-1">
              {children}
            </h2>
          ),
          
          // H3: Subsection headers
          h3: ({ children }) => (
            <h3 className="font-sans text-2xl font-semibold text-neutral-900 mt-12 mb-4 flex flex-wrap items-baseline gap-1">
              {children}
            </h3>
          ),
          
          // H4: Minor headers
          h4: ({ children }) => (
            <h4 className="font-sans text-xl font-semibold text-neutral-800 mt-8 mb-3 flex flex-wrap items-baseline gap-1">
              {children}
            </h4>
          ),
          
          // Paragraphs: Generous line height and spacing
          p: ({ children }) => (
            <p className="text-base text-neutral-700 leading-loose my-6 font-normal">
              {children}
            </p>
          ),
          
          // Unordered lists: Clean bullets with proper spacing
          ul: ({ children }) => (
            <ul className="my-6 space-y-3 pl-6 font-sans">
              {children}
            </ul>
          ),
          
          // Ordered lists: Clean numbers with proper spacing
          ol: ({ children }) => (
            <ol className="my-6 space-y-3 pl-6 list-decimal font-sans">
              {children}
            </ol>
          ),
          
          // List items: Comfortable spacing and markers
          li: ({ children }) => (
            <li className="text-base text-neutral-700 leading-loose pl-2 marker:text-neutral-400">
              {children}
            </li>
          ),
          
          // Inline code: Subtle background with accent color
          code: ({ inline, children }: any) =>
            inline ? (
              <code className="font-mono bg-neutral-100 text-secondary-600 rounded px-1.5 py-0.5 text-[0.9em] font-medium border border-neutral-200 whitespace-nowrap">
                {children}
              </code>
            ) : (
              <code className="font-mono block text-sm leading-relaxed">
                {children}
              </code>
            ),
          
          // Code blocks: Dark theme with syntax highlighting feel
          pre: ({ children }) => (
            <pre className="font-mono bg-neutral-900 text-neutral-100 rounded-xl p-6 overflow-x-auto my-8 shadow-xl border border-neutral-800">
              {children}
            </pre>
          ),
          
          // Blockquotes: Notion-style callout
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary-500 bg-primary-50 pl-6 pr-6 py-5 my-8 rounded-r-lg">
              <div className="text-base text-neutral-700 leading-loose">
                {children}
              </div>
            </blockquote>
          ),
          
          // Links: Underlined with hover effect
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary-600 hover:text-secondary-600 underline decoration-primary-400 decoration-2 underline-offset-2 transition-all duration-fast hover:decoration-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          
          // Strong: Bold with slightly darker color
          strong: ({ children }) => (
            <strong className="font-bold text-neutral-900">
              {children}
            </strong>
          ),
          
          // Emphasis: Italic
          em: ({ children }) => (
            <em className="italic text-neutral-700">
              {children}
            </em>
          ),
          
          // Horizontal rule: Subtle divider
          hr: () => (
            <hr className="my-12 border-t border-neutral-200" />
          ),
          
          // Images: Full width with rounded corners
          img: ({ src, alt }) => (
            <figure className="my-10">
              <img
                src={src}
                alt={alt || ''}
                className="w-full rounded-xl shadow-lg"
              />
              {alt && (
                <figcaption className="font-sans text-sm text-neutral-500 text-center mt-3 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
          
          // Tables: Clean borders and spacing
          table: ({ children }) => (
            <div className="my-8 overflow-x-auto font-sans">
              <table className="min-w-full divide-y divide-neutral-200 border border-neutral-200 rounded-lg">
                {children}
              </table>
            </div>
          ),
          
          thead: ({ children }) => (
            <thead className="bg-neutral-50">
              {children}
            </thead>
          ),
          
          tbody: ({ children }) => (
            <tbody className="bg-white divide-y divide-neutral-200">
              {children}
            </tbody>
          ),
          
          tr: ({ children }) => (
            <tr className="hover:bg-neutral-50 transition-colors duration-fast">
              {children}
            </tr>
          ),
          
          th: ({ children }) => (
            <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              {children}
            </th>
          ),
          
          td: ({ children }) => (
            <td className="px-6 py-4 text-sm text-neutral-700">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}