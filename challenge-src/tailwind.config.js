/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{components,src}/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#F3F4F6',
        'brand-surface': '#F9FAFB',
        'brand-primary': '#2563EB',
        'brand-secondary': '#4F46E5',
        'brand-text': '#111827',
        'brand-text-muted': '#6B7280',
        'brand-success': '#059669',
      },
    },
  },
  plugins: [],
}
