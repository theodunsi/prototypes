import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

// Filenames (no extensions) — becomes the signature at the bottom of each card
const FRIENDS = [
  'bella', 'chiedu', 'motun', 'nanya', 'ada',
  'nuella', 'bola', 'ebube', 'dinma', 'seyi',
  'ona', 'winner',
]

// Rotations and tints keyed by index so the scatter is stable across loads
const TINTS = [
  { bg: '#FAF4E7', tint: 'none' },      // paper
  { bg: '#F3E4EC', tint: 'bloom' },     // soft lilac
  { bg: '#F5E7DF', tint: 'rose' },      // warm rose
  { bg: '#F6EDD6', tint: 'ochre' },     // warm gold
  { bg: '#EFE3EC', tint: 'mulberry' },  // dusty purple
]
const ROTATIONS = [-3, 2, -2, 3, -1, 2, -3, 1, -2, 3, -1, 2]

function displayName(slug) {
  return slug.charAt(0).toUpperCase() + slug.slice(1)
}

// Split plain text into paragraphs, preserving in-paragraph line breaks.
function renderBlocks(text) {
  return text.trim().split(/\n\s*\n/).map((block, i) => {
    const lines = block.split('\n')
    return (
      <p key={i} className="mb-4 last:mb-0">
        {lines.map((line, j) => (
          <span key={j}>
            {line}
            {j < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    )
  })
}

function Card({ slug, index }) {
  const [content, setContent] = useState('')
  const tint = TINTS[index % TINTS.length]
  const rotate = ROTATIONS[index % ROTATIONS.length]

  useEffect(() => {
    fetch(`/content/friends/${slug}.md`)
      .then((r) => (r.ok ? r.text() : ''))
      .then(setContent)
      .catch(() => setContent(''))
  }, [slug])

  if (!content) return null

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, rotate: rotate * 1.8 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease }}
      className="relative mx-auto w-full max-w-[24rem] break-inside-avoid"
      style={{
        background: tint.bg,
        padding: '26px 26px 22px 26px',
        boxShadow: '0 2px 4px rgba(28,19,32,0.06), 0 22px 44px -22px rgba(28,19,32,0.3)',
      }}
    >
      <span
        aria-hidden
        className="absolute -top-3 left-1/2"
        style={{
          width: 70, height: 16,
          background: 'rgba(200, 155, 60, 0.32)',
          border: '1px dashed rgba(107, 59, 94, 0.35)',
          transform: 'translateX(-50%) rotate(-6deg)',
        }}
      />
      <div className="font-body text-[0.95rem] leading-[1.75] text-ink/85">
        {renderBlocks(content)}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-mulberry/25" aria-hidden />
        <span className="font-hand text-xl text-mulberry">— {displayName(slug)}</span>
      </div>
    </motion.article>
  )
}

export default function FriendNotes() {
  return (
    <section className="relative w-full px-6 py-32 sm:py-40">
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto mb-20 max-w-3xl text-center"
      >
        <p className="font-body text-micro uppercase tracking-[0.3em] text-ash">
          from the people who love you
        </p>
        <h2
          className="mt-6 font-display italic font-light leading-[1.02] text-iris"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
        >
          your people wrote in.
        </h2>
        <p className="mx-auto mt-6 max-w-lg font-body text-letter italic text-ink/75">
          i asked around. they all had something to say about you.
        </p>
      </motion.header>

      <div className="mx-auto max-w-5xl columns-1 gap-8 sm:columns-2 sm:gap-10 lg:columns-3">
        {FRIENDS.map((slug, i) => (
          <div key={slug} className="mb-8 sm:mb-10">
            <Card slug={slug} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
