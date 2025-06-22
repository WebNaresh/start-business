/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' && {
      '@fullhuman/postcss-purgecss': {
        content: [
          './app/**/*.{js,ts,jsx,tsx,mdx}',
          './pages/**/*.{js,ts,jsx,tsx,mdx}',
          './components/**/*.{js,ts,jsx,tsx,mdx}',
          './src/**/*.{js,ts,jsx,tsx,mdx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: [
          // Essential classes that might be dynamically generated
          'animate-pulse',
          'animate-spin',
          'animate-bounce',
          'animate-fade-in-up',
          'animate-shimmer',
          'hover-lift',
          /^bg-blue-/,
          /^text-blue-/,
          /^border-blue-/,
          /^line-clamp-/,
          // Framer Motion classes
          /^motion-/,
          // Dynamic classes
          /^grid-cols-/,
          /^gap-/,
          /^space-/,
        ],
        blocklist: [
          // Remove unused animation classes
          'animate-blob',
          'float-animation',
          'animation-delay-2000',
          'animation-delay-4000',
          'animate-scale-in',
          'animate-fade-in-left',
          'animate-fade-in-right',
          'animate-pulse-glow',
          'hover-scale',
          'hover-glow',
        ],
      },
    }),
  },
};

export default config;
