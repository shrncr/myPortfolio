"use client";

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import NextImage from 'next/image';
import type { ComponentPropsWithoutRef } from 'react'

interface BlogContentProps {
  content: string;
  widgets?: Record<string, string>;
}

// Widget component that renders HTML and executes scripts
function WidgetRenderer({ widgetId, html }: { widgetId: string; html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Extract and execute scripts
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    const scripts = tempDiv.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      // Remove script from temp div
      oldScript.remove();
    });

    // Set the HTML without scripts first
    if (containerRef.current) {
      containerRef.current.innerHTML = tempDiv.innerHTML;
      
      // Then append and execute scripts
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        containerRef.current?.appendChild(newScript);
      });
    }
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="widget-container my-8"
      data-widget={widgetId}
    />
  );
}

/**
 * BlogContent Component
 * Renders markdown blog content with Notion-inspired styling
 * Features: Clean typography, generous spacing, visual hierarchy, code highlighting
 */
export default function BlogContent({ content, widgets }: BlogContentProps) {
  const articleRef = useRef<HTMLElement>(null);

  // Split content by widget markers and create an array of content pieces and widgets
  const contentParts: Array<{ type: 'markdown' | 'widget'; content: string; widgetId?: string }> = [];
  
  if (widgets) {
    const widgetRegex = /::widget:([a-z-]+)::/g;
    let lastIndex = 0;
    let match;

    while ((match = widgetRegex.exec(content)) !== null) {
      // Add markdown content before this widget
      if (match.index > lastIndex) {
        contentParts.push({
          type: 'markdown',
          content: content.slice(lastIndex, match.index)
        });
      }
      
      // Add widget
      const widgetId = match[1];
      if (widgets[widgetId]) {
        contentParts.push({
          type: 'widget',
          content: widgets[widgetId],
          widgetId
        });
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining markdown content
    if (lastIndex < content.length) {
      contentParts.push({
        type: 'markdown',
        content: content.slice(lastIndex)
      });
    }
  } else {
    contentParts.push({ type: 'markdown', content });
  }


const markdownComponents = {
  h1: ({ children }: ComponentPropsWithoutRef<'h1'>) => (
    <h1 className="font-sans text-5xl font-extrabold text-neutral-900 mt-16 mb-6 leading-tight tracking-tight first:mt-0">
      {children}
    </h1>
  ),

  h2: ({ children }: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="font-sans text-3xl font-bold text-neutral-900 mt-16 mb-6 pb-3 border-b border-neutral-200 flex flex-wrap items-baseline gap-1">
      {children}
    </h2>
  ),

  h3: ({ children }: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="font-sans text-2xl font-semibold text-neutral-900 mt-12 mb-4 flex flex-wrap items-baseline gap-1">
      {children}
    </h3>
  ),

  h4: ({ children }: ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="font-sans text-xl font-semibold text-neutral-800 mt-8 mb-3 flex flex-wrap items-baseline gap-1">
      {children}
    </h4>
  ),
    
    // Paragraphs: Generous line height and spacing
    p: ({ children }: any) => (
      <p className="text-base text-neutral-700 leading-loose my-6 font-normal">
        {children}
      </p>
    ),
    
    // Unordered lists: Clean bullets with proper spacing
    ul: ({ children }: any) => (
      <ul className="my-6 space-y-3 pl-6 font-sans">
        {children}
      </ul>
    ),
    
    // Ordered lists: Clean numbers with proper spacing
    ol: ({ children }: any) => (
      <ol className="my-6 space-y-3 pl-6 list-decimal font-sans">
        {children}
      </ol>
    ),
    
    // List items: Comfortable spacing and markers
    li: ({ children }: any) => (
      <li className="text-base text-neutral-700 leading-loose pl-2 marker:text-neutral-400">
        {children}
      </li>
    ),
    
    // Inline code: Subtle background with accent color
    code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) =>
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
    pre: ({ children }: any) => (
      <pre className="font-mono bg-neutral-900 text-neutral-100 rounded-xl p-6 overflow-x-auto my-8 shadow-xl border border-neutral-800">
        {children}
      </pre>
    ),
    
    // Blockquotes: Notion-style callout
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-500 bg-primary-50 pl-6 pr-6 py-5 my-8 rounded-r-lg">
        <div className="text-base text-neutral-700 leading-loose">
          {children}
        </div>
      </blockquote>
    ),
    
    // Links: Underlined with hover effect
    a: ({ href, children }: any) => (
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
    strong: ({ children }: any) => (
      <strong className="font-bold text-neutral-900">
        {children}
      </strong>
    ),
    
    // Emphasis: Italic
    em: ({ children }: any) => (
      <em className="italic text-neutral-700">
        {children}
      </em>
    ),
    
    // Horizontal rule: Subtle divider
    hr: () => (
      <hr className="my-12 border-t border-neutral-200" />
    ),
    
    // Images: Full width with rounded corners
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <figure className="my-10">
        <NextImage
          src={src || ''}
          alt={alt || ''}
          width={1200}
          height={675}
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
    table: ({ children }: any) => (
      <div className="my-8 overflow-x-auto font-sans">
        <table className="min-w-full divide-y divide-neutral-200 border border-neutral-200 rounded-lg">
          {children}
        </table>
      </div>
    ),
    
    thead: ({ children }: any) => (
      <thead className="bg-neutral-50">
        {children}
      </thead>
    ),
    
    tbody: ({ children }: any) => (
      <tbody className="bg-white divide-y divide-neutral-200">
        {children}
      </tbody>
    ),
    
    tr: ({ children }: any) => (
      <tr className="hover:bg-neutral-50 transition-colors duration-fast">
        {children}
      </tr>
    ),
    
    th: ({ children }: any) => (
      <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
        {children}
      </th>
    ),
    
    td: ({ children }: any) => (
      <td className="px-6 py-4 text-sm text-neutral-700">
        {children}
      </td>
    ),
  };

  return (
    <article ref={articleRef} className="max-w-3xl mx-auto px-6 py-12 font-serif">
      {contentParts.map((part, index) => {
        if (part.type === 'widget' && part.widgetId) {
          return (
            <WidgetRenderer
              key={`widget-${part.widgetId}-${index}`}
              widgetId={part.widgetId}
              html={part.content}
            />
          );
        } else {
          return (
            <ReactMarkdown
              key={`markdown-${index}`}
              components={markdownComponents}
            >
              {part.content}
            </ReactMarkdown>
          );
        }
      })}
    </article>
  );
}