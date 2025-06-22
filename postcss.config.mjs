/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // DISABLED PurgeCSS - Tailwind's built-in purging is more reliable for responsive classes
    // PurgeCSS was causing responsive classes to be removed in production
    // Tailwind CSS v3+ has excellent built-in purging that respects responsive variants
  },
};

export default config;
