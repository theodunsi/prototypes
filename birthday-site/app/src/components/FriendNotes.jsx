import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LavenderSprig, PressedDaisy, Heart, StarScatter, Butterfly,
  Handbag, Heels, Lipstick, PerfumeBottle, Crown, Bow, DiamondRing,
} from './Sprigs.jsx'

const ease = [0.16, 1, 0.3, 1]

const FRIENDS = [
  'bella', 'motun', 'chiedu', 'nuella', 'ada',
  'nanya', 'ona', 'dinma', 'ebube', 'seyi',
  'bola', 'toni', 'winner',
]

// Tints & tilts per card — no two cards overlap because they live in a
// masonry grid (columns) where each card occupies its own slot.
const META = [
  { tint: '#F3E4EC', rotate: -3 },
  { tint: '#FAF4E7', rotate: 2 },
  { tint: '#F6EDD6', rotate: 4 },
  { tint: '#F5E7DF', rotate: -2 },
  { tint: '#EFE3EC', rotate: 5 },
  { tint: '#F3E4EC', rotate: -4 },
  { tint: '#FAF4E7', rotate: 3 },
  { tint: '#F6EDD6', rotate: -3 },
  { tint: '#F5E7DF', rotate: 2 },
  { tint: '#EFE3EC', rotate: -5 },
  { tint: '#FAF4E7', rotate: 4 },
  { tint: '#F3E4EC', rotate: -2 },
  { tint: '#F6EDD6', rotate: 3 },
]

function displayName(slug) {
  return slug.charAt(0).toUpperCase() + slug.slice(1)
}
function renderBlocks(text) {
  return text.trim().split(/\n\s*\n/).map((block, i) => {
    const lines = block.split('\n')
    return (
      <p key={i} className="mb-3 last:mb-0">
        {lines.map((line, j) => (
          <span key={j}>{line}{j < lines.length - 1 && <br />}</span>
        ))}
      </p>
    )
  })
}

function Card({ slug, meta }) {
  const [content, setContent] = useState('')
  useEffect(() => {
    fetch(`/content/friends/${slug}.md`)
      .then((r) => (r.ok ? r.text() : ''))
      .then(setContent)
      .catch(() => setContent(''))
  }, [slug])

  if (!content) return null
  const isShort = content.length < 180

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, rotate: meta.rotate * 1.8 }}
      whileInView={{ opacity: 1, y: 0, rotate: meta.rotate }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, rotate: meta.rotate * 0.35, zIndex: 20, transition: { duration: 0.22, ease } }}
      transition={{ duration: 0.85, ease }}
      className="relative mb-10 break-inside-avoid sm:mb-12"
      style={{ background: meta.tint }}
    >
      <div
        className="relative"
        style={{
          padding: isShort ? '30px 24px 24px' : '26px 24px 22px',
          boxShadow: '0 2px 4px rgba(28,19,32,0.06), 0 22px 50px -22px rgba(28,19,32,0.35)',
        }}
      >
        <span
          aria-hidden className="absolute -top-3 left-1/2"
          style={{
            width: 72, height: 16,
            background: 'rgba(200, 155, 60, 0.32)',
            border: '1px dashed rgba(107, 59, 94, 0.35)',
            transform: 'translateX(-50%) rotate(-6deg)',
          }}
        />
        <div
          className="font-body text-ink/88"
          style={{
            fontSize: isShort ? '1.05rem' : '0.92rem',
            lineHeight: isShort ? '1.55' : '1.7',
            fontStyle: isShort ? 'italic' : 'normal',
          }}
        >
          {renderBlocks(content)}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-px flex-1 bg-mulberry/25" aria-hidden />
          <span className="font-hand text-lg text-mulberry">— {displayName(slug)}</span>
        </div>
      </div>
    </motion.article>
  )
}

export default function FriendNotes() {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-28 sm:px-8 sm:py-36"
      style={{ background: 'linear-gradient(180deg, #EFE0D5 0%, #E8D9E0 100%)' }}
    >
      {/* Girlie ornaments scattered across the whole page, not just at the edges */}
      <LavenderSprig className="pointer-events-none absolute hidden md:block" style={{ top: '5%', left: '3%', opacity: 0.7, transform: 'rotate(-14deg)' }} />
      <Crown       className="pointer-events-none absolute" style={{ top: '4%', left: '44%', opacity: 0.55, transform: 'rotate(-4deg)' }} />
      <Heels       className="pointer-events-none absolute hidden sm:block" style={{ top: '8%', right: '4%', opacity: 0.55, transform: 'rotate(8deg)' }} />
      <PerfumeBottle className="pointer-events-none absolute" style={{ top: '18%', left: '40%', opacity: 0.5, transform: 'rotate(-10deg)' }} />
      <Lipstick    className="pointer-events-none absolute" style={{ top: '24%', right: '38%', opacity: 0.55, transform: 'rotate(12deg)' }} />
      <Butterfly   className="pointer-events-none absolute hidden sm:block" style={{ top: '30%', left: '48%', opacity: 0.5 }} />
      <Heart       className="pointer-events-none absolute" style={{ top: '36%', left: '4%', opacity: 0.55, transform: 'rotate(-10deg)' }} />
      <Handbag     className="pointer-events-none absolute" style={{ top: '42%', right: '42%', opacity: 0.5, transform: 'rotate(6deg)' }} />
      <StarScatter className="pointer-events-none absolute" style={{ top: '48%', right: '3%', opacity: 0.6 }} />
      <Bow         className="pointer-events-none absolute" style={{ top: '58%', left: '44%', opacity: 0.55, transform: 'rotate(-8deg)' }} />
      <DiamondRing className="pointer-events-none absolute" style={{ top: '64%', right: '44%', opacity: 0.55, transform: 'rotate(4deg)' }} />
      <PressedDaisy className="pointer-events-none absolute" style={{ top: '72%', left: '5%', opacity: 0.6, transform: 'rotate(-18deg) scale(0.85)' }} />
      <Heels       className="pointer-events-none absolute hidden md:block" style={{ top: '80%', left: '46%', opacity: 0.5, transform: 'rotate(-14deg)' }} />
      <LavenderSprig className="pointer-events-none absolute hidden md:block" style={{ top: '84%', right: '3%', opacity: 0.55, transform: 'rotate(10deg) scale(0.75)' }} />
      <PerfumeBottle className="pointer-events-none absolute hidden sm:block" style={{ bottom: '6%', left: '42%', opacity: 0.5, transform: 'rotate(8deg) scale(0.8)' }} />
      <Crown       className="pointer-events-none absolute" style={{ bottom: '3%', right: '8%', opacity: 0.55, transform: 'rotate(10deg) scale(0.8)' }} />

      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-[1] mx-auto mb-16 max-w-3xl text-center"
      >
        <p className="font-body text-micro uppercase tracking-[0.3em] text-ash">from the people who love you</p>
        <h2 className="mt-5 font-display italic font-light leading-[1.02] text-iris"
          style={{ fontSize: 'clamp(2.25rem, 6.5vw, 4.25rem)' }}>
          your people wrote in.
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-quiet italic text-ink/70">
          i asked around. they all had something to say about you.
        </p>
      </motion.header>

      {/* masonry columns — no card overlaps another; each still tilted */}
      <div className="relative z-[1] mx-auto max-w-6xl columns-1 gap-6 sm:columns-2 sm:gap-8 lg:columns-3 lg:gap-10">
        {FRIENDS.map((slug, i) => (
          <Card key={slug} slug={slug} meta={META[i % META.length]} />
        ))}
      </div>
    </section>
  )
}
