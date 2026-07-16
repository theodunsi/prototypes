/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // From Figma color styles (odunsi X williams), themeable via CSS vars
        background:    'var(--bg)',          // bg-main
        surface:       'var(--surface)',     // bg-subtle (cards, pills, tags)
        ink:           'var(--ink)',          // primary text
        'ink-muted':   'var(--ink-muted)',    // secondary text
        inverse:       'var(--inverse)',      // solid button bg
        'inverse-ink': 'var(--inverse-ink)',  // text on solid button
        hairline:      'var(--hairline)',     // hover wash
        accent:        '#34C759',             // Accents/Green (status dot)
      },
      fontFamily: {
        // From Figma exports
        display: ['"PP Editorial New"', 'Georgia', 'serif'],
        body:    ['"PP Neue Montreal"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
