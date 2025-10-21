module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0f0f0f',
        'bg-secondary': '#1a1a1a',
        'bg-tertiary': '#252525',
        'bg-hover': '#2d2d2d',
        'text-primary': '#e8e8e8',
        'text-secondary': '#a0a0a0',
        'border-color': '#2d2d2d',
        'accent-color': '#6366f1',
        'accent-hover': '#5558e3',
      },
      fontFamily: {
        main: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', '"Apple Color Emoji"', 'Arial', 'sans-serif', '"Segoe UI Emoji"', '"Segoe UI Symbol"'],
      },
    },
  },
  plugins: [],
}
