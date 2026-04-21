/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C1320',
        parchment: '#F3EADA',
        paper: '#FAF4E7',
        mulberry: '#6B3B5E',
        iris: '#3B2A52',
        bloom: '#CBB4D4',
        rose: '#B87A6E',
        ochre: '#C89B3C',
        ash: '#837489',
        tape: 'rgba(200, 155, 60, 0.22)',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        hand: ['"Homemade Apple"', 'cursive'],
      },
      fontSize: {
        micro: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
        quiet: ['0.875rem', { lineHeight: '1.5rem' }],
        read: ['1.0625rem', { lineHeight: '1.85' }],
        letter: ['1.125rem', { lineHeight: '1.9' }],
      },
      maxWidth: {
        letter: '34rem',
        measure: '62ch',
      },
      borderRadius: {
        card: '2px',
      },
      boxShadow: {
        polaroid: '0 1px 2px rgba(28, 19, 32, 0.08), 0 12px 28px -14px rgba(28, 19, 32, 0.25)',
        lift: '0 2px 6px rgba(28, 19, 32, 0.06), 0 18px 40px -20px rgba(28, 19, 32, 0.22)',
      },
      transitionTimingFunction: {
        paper: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      zIndex: {
        base: '0',
        raised: '10',
        overlay: '30',
        reveal: '50',
        control: '60',
      },
    },
  },
  plugins: [],
}
