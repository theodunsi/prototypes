// ── Edit your site content here ────────────────────────────────
// Everything the homepage renders pulls from this file, so you can
// update copy, links and project titles without touching the layout.

export const profile = {
  email: 'opemipoodunsi428@gmail.com',
  available: true,
  headline:
    'Snr Product Designer crafting unique & usable product and web experiences for startups',
  bio: {
    // Parts marked `muted: true` render at 50% opacity (your name highlight)
    parts: [
      { text: "I'm " },
      { text: 'Opemipo', muted: true },
      { text: ' Michael ' },
      { text: 'Odunsi', muted: true },
      {
        text: ', a designer who builds. I turn ideas into real, usable products, not just polished mockups, crafting experiences that feel effortless and human, the kind people return to, not just register for.',
      },
    ],
  },
}

// [WHO AM I] skill tags
export const tags = [
  'Branding & visual identity',
  'User experience analysis',
  'Creative copywriting',
  'Cross platform mobile apps',
  'Digital product design',
  'Interaction design',
  'Component libraries',
  'Responsive development',
  'Vibecoding',
]

// RECENT WORKS — drop an `image` path (in /public) when you have one.
// `sub` = italic muted descriptor after the title. `fit` = 'contain' shows the
// whole image (letterboxed), 'cover' fills/crops (default).
type Work = { title: string; sub?: string; image: string; fit?: 'cover' | 'contain'; slug?: string }

export const recentWorks: Work[] = [
  {
    title: 'Anyday',
    sub: 'Unified webops built on Sanity',
    image: '/assets/images/anyday/anyday-preview.png',
    slug: 'anyday',
  },
  {
    title: 'LoopTag',
    sub: 'Helping lost items find their way back',
    image: '/assets/images/loop/loop-preview2.png',
    slug: 'loop',
  },
  {
    title: 'NovaMed',
    sub: 'Operating system for modern healthcare',
    image: '/assets/images/novamed.png',
    slug: 'novamed',
  },
  {
    title: 'Nexus UI',
    sub: 'Customizable components engineered for modern AI experiences',
    image: '/assets/images/nexus-ui/nexus-ui-preview.png',
    slug: 'nexus-ui',
  },
]

// FUN EXPLORATIONS — media-only tiles (autoplaying interaction clips)
export const explorations = [
  { image: '/assets/images/explorations/menu-interation.mp4' },
  { image: '/assets/images/explorations/cursor-interaction.mp4' },
  { image: '/assets/images/explorations/view-interaction.mp4' },
  { image: '/assets/images/explorations/scroll-interaction.mp4' },
  { image: '/assets/images/explorations/button-interaction.mp4' },
  { image: '/assets/images/explorations/footer-interaction.mp4' },
]

export const socials = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/opemipoodunsi/' },
  { label: 'TELEGRAM', href: 'https://t.me/theodunsi' },
  { label: 'GITHUB', href: 'https://github.com/theodunsi' },
]

// PROJECTS ARCHIVE — Recent-Works-style tiles; videos play on hover (poster shown otherwise).
// Title = first word (plain white) + rest (muted italic), like the home cards.
// Voiceover (04) is intentionally moved to the end.
const AP = '/assets/images/projects-archive'
type ArchiveItem = { image: string; poster: string; title: string; sub?: string }
export const archive: ArchiveItem[] = [
  { image: `${AP}/01.mp4`, poster: `${AP}/01-poster.jpg`, title: 'Red', sub: 'fintech landing page' },
  { image: `${AP}/02.mp4`, poster: `${AP}/02-poster.jpg`, title: 'Validify', sub: 'landing page' },
  { image: `${AP}/03.mp4`, poster: `${AP}/03-poster.jpg`, title: 'Moshood', sub: 'Sanusi personal portfolio' },
  { image: `${AP}/05.mp4`, poster: `${AP}/05-poster.jpg`, title: 'Maven', sub: 'e-commerce site' },
  { image: `${AP}/06.mp4`, poster: `${AP}/06-poster.jpg`, title: 'Validify', sub: 'email verification platform' },
  { image: `${AP}/04.mp4`, poster: `${AP}/04-poster.jpg`, title: 'Voiceover' },
]

// ── Project detail pages ───────────────────────────────────────
// `link` present → the button reads "LIVE SITE" (clickable). Absent → "COMING SOON".
// Media boxes on the detail page are placeholders for now (media coming later).
// `gallery` = the media rows AFTER the hero. The hero is always the first
// full-width box (image 01). Each 'full' row = one box; each 'pair' row = two
// (left then right). Images auto-fill in reading order from
// /assets/images/<slug>/01.png, 02.png, … (2x PNGs, dropped in as you have them).
type Row = 'full' | 'pair'

export type Project = {
  slug: string
  title: string
  tags: string[]
  description: string
  link?: string
  gallery?: Row[]
}

export const projects: Project[] = [
  {
    slug: 'novamed',
    title: 'NovaMed',
    tags: ['Branding', 'Website'],
    description:
      'I designed the logo and marketing landing page for NovaMed Health, a B2B SaaS platform that helps multi-location clinics and hospital networks manage patient intake, scheduling, and compliance documentation from a single dashboard.',
    // hero(01) → pair(02,03) → full(04) → pair(05,06) → full(07)
    gallery: ['pair', 'full', 'pair', 'full'],
  },
  {
    slug: 'loop',
    title: 'Loop Tag',
    tags: ['Branding', 'Website'],
    description:
      'Brand identity and waitlist page for LoopTag, a startup whose scannable tags help lost items get returned to their owners.',
    // hero(01) → pair(02,03) → full(04) → full(05) → full(06) → full(07) → full(08)
    gallery: ['pair', 'full', 'full', 'full', 'full', 'full'],
  },
  {
    slug: 'anyday',
    title: 'Anyday',
    tags: ['Branding', 'Website'],
    description:
      'I created the brand assets and refreshed the website for Anyday — a studio building unified, Sanity-powered WebOps systems for companies managing sites at scale.',
    // hero(01) → full(02) → full(03) → full(04) → full(05) → full(06) → full(07) → full(08)
    // All 8 assets are landscape (~3:2), so every row is full-width.
    gallery: ['full', 'full', 'full', 'full', 'full', 'full', 'full'],
  },
  {
    slug: 'nexus-ui',
    title: 'Nexus UI',
    tags: ['Design system', 'Component library'],
    link: 'https://nexus-ui.dev/',
    description:
      'Nexus UI is a component library for building AI products, co-founded with a friend. I owned design end-to-end — defining the token system, building the token library, designing the full component set, and creating the documentation site that hosts them.',
    // hero(01) → full(02) → full(03) → full(04) → full(05) → full(06) → full(07)
    // All 7 assets are landscape (~3:2), so every row is full-width — a paired
    // row is portrait (564×720) and would crop them.
    gallery: ['full', 'full', 'full', 'full', 'full', 'full'],
  },
]
