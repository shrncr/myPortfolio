"use client";

import { useState } from 'react';

interface Demo {
  id: string;
  title: string;
  description: string;
  url: string;
  isOriginal: boolean;
}

/**
 * GameDemo Component
 * Displays before/after game demos side-by-side with fullscreen capability
 * Uses unified design system tokens
 */
export default function GameDemo() {
  const [fullscreenDemo, setFullscreenDemo] = useState<Demo | null>(null);

  const demos: Demo[] = [
    {
      id: 'before',
      title: 'Before: Original HTML',
      description: '257 lines - Single file with embedded CSS/JS',
      url: 'https://shrncr.github.io/NP-Complete-Escape-Room/',
      isOriginal: true
    },
    {
      id: 'after',
      title: 'After: React + TypeScript',
      description: '2,100+ lines - Modern architecture with 40+ files',
      url: '/escape-room-migrated/index.html',
      isOriginal: false
    }
  ];

  const openFullscreen = (demo: Demo) => {
    setFullscreenDemo(demo);
  };

  const closeFullscreen = () => {
    setFullscreenDemo(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-5xl font-bold text-center mb-4 text-neutral-900 tracking-tight">
        Interactive Demo: Before and After
      </h2>
      <p className="text-center text-lg text-neutral-600 mb-16 max-w-2xl mx-auto leading-relaxed">
        Experience the transformation from a monolithic HTML file to a modern React application
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {demos.map((demo) => (
          <div
            key={demo.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
          >
            <div className="bg-gradient-to-r from-primary-200 to-secondary-200 p-6 text-slate">
              <h3 className="text-2xl font-bold mb-2">{demo.title}</h3>
              <p className="text-sm text-slate font-medium">{demo.description}</p>
            </div>

            <div className="relative h-96 bg-neutral-100 group">
              <iframe
                src={demo.url}
                title={demo.title}
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-normal flex items-center justify-center backdrop-blur-sm">
                <button
                  onClick={() => openFullscreen(demo)}
                  className="flex items-center gap-3 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:scale-105 hover:shadow-xl transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 btn-press"
                  aria-label={`View ${demo.title} in fullscreen`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                  </svg>
                  <span>View Fullscreen</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 flex justify-end">
              <span
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${
                  demo.isOriginal
                    ? 'bg-warning text-neutral-900'
                    : 'bg-success text-white'
                }`}
              >
                {demo.isOriginal ? 'Original' : 'Migrated'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenDemo && (
        <div
          className="fixed inset-0 bg-black/90 z-modal flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeFullscreen}
          role="dialog"
          aria-modal="true"
          aria-labelledby="fullscreen-title"
        >
          <div
            className="w-full h-full max-w-7xl max-h-[900px] bg-white rounded-2xl overflow-hidden flex flex-col animate-scaleIn shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white flex justify-between items-center">
              <h3 id="fullscreen-title" className="text-2xl font-bold">
                {fullscreenDemo.title}
              </h3>
              <button
                onClick={closeFullscreen}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
                aria-label="Close fullscreen"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <iframe
              src={fullscreenDemo.url}
              title={fullscreenDemo.title}
              className="flex-1 w-full border-none"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
    </div>
  );
}