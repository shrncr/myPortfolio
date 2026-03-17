"use client";

export default function ScrollToTopButton() {
  return (
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
  );
}