import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LavenderSprig, PressedDaisy, Heart, StarScatter, Ribbon } from './Sprigs.jsx'

const ease = [0.16, 1, 0.3, 1]

// filename → capitalised signature
const FRIENDS = [
  'bella', 'motun', 'chiedu', 'nuella', 'ada',
  'nanya', 'ona', 'dinma', 'ebube', 'seyi',
  'bola', 'toni', 'winner',
]

// Hand-placed layout: each card has its own column span, offset, rotation, tint.
// This gives the section the scattered "corkboard" feel — no grid uniformity.
const LAYOUT = [
  { col: 1, span: 4, offsetY:   0, rotate: -3, tint: '#F3E4EC' }, // bella
  { col: 6, span: 4, offsetY:  40, rotate: 2,  tint: '#FAF4E7' }, // motun
  { col: 10,span: 3, offsetY: -20, rotate: 4,  tint: '#F6EDD6' }, // chiedu
  { col: 2, span: 4, offsetY:  60, rotate: -2, tint: '#F5E7DF' }, // nuella
  { col: 7, span: 3, offsetY:  30, rotate: 5,  tint: '#EFE3EC' }, // ada
  { col: 10,span: 3, offsetY:  90, rotate: -4, tint: '#F3E4EC' }, // nanya
  { col: 1, span: 3, offsetY: 150, rotate: 3,  tint: '#FAF4E7' }, // ona
  { col: 5, span: 4, offsetY: 110, rotate: -3, tint: '#F6EDD6' }, // dinma
  { col: 10,span: 3, offsetY: 170, rotate: 2,  tint: '#F5E7DF' }, // ebube
  { col: 2, span: 3, offsetY: 220, rotate: -5, tint: '#EFE3EC' }, // seyi
  { col: 6, span: 3, offsetY: 200, rotate: 4,  tint: '#FAF4E7' }, // bola
  { col: 9, span: 3, offsetY: 240, rotate: -2, tint: '#F3E4EC' }, // toni
  { col: 4, span: 4, offsetY: 280, rotate: 3,  tint: '#F6EDD6' }, // winner
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

function Card({ slug, layout }) {
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
      initial={{ opacity: 0, y: 24, rotate: layout.rotate * 1.8 }}
      whileInView={{ opacity: 1, y: 0, rotate: layout.rotate }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4, rotate: layout.rotate * 0.35, zIndex: 20, transition: { duration: 0.22, ease } }}
      transition={{ duration: 0.85, ease }}
      className="relative break-inside-avoid"
      style={{ background: layout.tint }}
    >
      <div
        className="relative"
        style={{
          padding: isShort ? '32px 26px 28px' : '26px 24px 22px',
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
      style={{
        background: 'linear-gradient(180deg, #EFE0D5 0%, #E8D9E0 100%)',
      }}
    >
      {/* ornaments */}
      <LavenderSprig className="pointer-events-none absolute hidden md:block" style={{ top: '8%', left: '2%', opacity: 0.7, transform: 'rotate(-14deg)' }} />
      <Ribbon className="pointer-events-none absolute hidden lg:block" style={{ top: '5%', right: '3%', opacity: 0.45 }} />
      <Heart className="pointer-events-none absolute" style={{ top: '40%', left: '4%', opacity: 0.55, transform: 'rotate(-10deg)' }} />
      <StarScatter className="pointer-events-none absolute" style={{ top: '55%', right: '5%', opacity: 0.6 }} />
      <PressedDaisy className="pointer-events-none absolute" style={{ bottom: '10%', left: '6%', opacity: 0.65, transform: 'rotate(-22deg) scale(0.8)' }} />
      <LavenderSprig className="pointer-events-none absolute hidden md:block" style={{ bottom: '4%', right: '3%', opacity: 0.55, transform: 'rotate(10deg) scale(0.75)' }} />

      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto mb-20 max-w-3xl text-center"
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

      {/* desktop: hand-placed scattered corkboard */}
      <div className="relative mx-auto hidden max-w-6xl md:block" style={{ minHeight: '1600px' }}>
        <div className="grid grid-cols-12 gap-4">
          {FRIENDS.map((slug, i) => {
            const L = LAYOUT[i] || LAYOUT[LAYOUT.length - 1]
            return (
              <div
                key={slug}
                className="relative"
                style={{
                  gridColumn: `${L.col} / span ${L.span}`,
                  marginTop: `${L.offsetY}px`,
                }}
              >
                <Card slug={slug} layout={L} />
              </div>
            )
          })}
        </div>
      </div>

      {/* mobile: compact stagger */}
      <div className="mx-auto flex max-w-md flex-col gap-6 md:hidden">
        {FRIENDS.map((slug, i) => {
          const L = LAYOUT[i] || LAYOUT[0]
          return (
            <div key={slug} className={i % 2 === 0 ? 'self-start' : 'self-end'}>
              <Card slug={slug} layout={L} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
