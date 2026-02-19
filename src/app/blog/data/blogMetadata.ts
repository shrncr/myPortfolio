import { blogContent } from './blogContent';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  tags: string[];
  readTime: string;
  content: string;
  hasDemo: boolean;
  featured: boolean;
}

export const blogs: BlogPost[] = [
  {
    id: 'bob-migration',
    title: 'Rebuilding My Game in React: A 4-Hour Migration with IBM Bob',
    slug: 'bob-migration',
    date: '2026-02-19',
    excerpt: 'A technical post-mortem documenting the migration of a 257-line HTML file to a production-ready React application using Bob AI. Learn about configuration strategies, architectural decisions, and lessons learned from AI-assisted development.',
    tags: ['React', 'TypeScript', 'AI', 'Framework Migration', 'Bob'],
    readTime: '15 min read',
    content: blogContent,
    hasDemo: true,
    featured: true
  }
  // Add more blog posts here in the future
];

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogs.find(blog => blog.slug === slug);
};

export const getFeaturedBlogs = (): BlogPost[] => {
  return blogs.filter(blog => blog.featured);
};

export const getAllBlogs = (): BlogPost[] => {
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};