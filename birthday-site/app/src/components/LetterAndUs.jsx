import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LavenderSprig, PressedDaisy, Heart, StarScatter } from './Sprigs.jsx'

const ease = [0.16, 1, 0.3, 1]

// Couple photos scattered in the left/right margins of the letter column.
// Tuned by hand so none of them block reading space on any viewport.
const LEFT_PHOTOS = [
  { src: '/assets/couple/IMG_1146.jpg', top: '4%',  left: '2%',  tilt: -5, size: 'md' },
  { src: '/assets/couple/IMG_6491.jpg', top: '38%', left: '1%',  tilt: 3,  size: 'sm' },
  { src: '/assets/couple/IMG_8364.jpg', top: '72%', left: '3%',  tilt: -4, size: 'md' },
]
const RIGHT_PHOTOS = [
  { src: '/assets/couple/053786d2-6612-47c2-ab5e-3a9a4d7283ad.JPG', top: '10%', right: '2%', tilt: 4,  size: 'sm' },
  { src: '/assets/couple/0aca0e2e-36a3-4961-ba47-5b784daa49e3.JPG', top: '48%', right: '1%', tilt: -3, size: 'md' },
  { src: '/assets/couple/15fe2a4e-6e91-458c-aa61-4edebe576dbd.JPG', top: '80%', right: '3%', tilt: 5,  size: 'sm' },
]
const MOBILE_CLUSTER = [
  '/assets/couple/IMG_1146.jpg',
  '/assets/couple/053786d2-6612-47c2-ab5e-3a9a4d7283ad.JPG',
  '/assets/couple/IMG_6491.jpg',
  '/assets/couple/0aca0e2e-36a3-4961-ba47-5b784daa49e3.JPG',
]

const sizeClass = {
  sm: 'h-[140px] w-[110px] lg:h-[180px] lg:w-[140px]',
  md: 'h-[180px] w-[140px] lg:h-[220px] lg:w-[170px]',
}

function ScatteredPolaroid({ src, tilt, size, style }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-0"
      style={style}
      initial={{ opacity: 0, y: 20, rotate: tilt + (tilt > 0 ? 4 : -4) }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease }}
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, -4, 3, 0], rotate: [0, 1, -0.6, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
        className="relative"
        style={{
          background: '#FAF4E7',
          padding: '8px 8px 26px 8px',
          boxShadow: '0 3px 6px rgba(0,0,0,0.35), 0 30px 60px -24px rgba(0,0,0,0.65)',
        }}
      >
        <span
          aria-hidden className="absolute -top-2 left-1/2"
          style={{
            width: 42, height: 12,
            background: 'rgba(200, 155, 60, 0.4)',
            border: '1px dashed rgba(203, 180, 212, 0.5)',
            transform: 'translateX(-50%) rotate(-5deg)',
          }}
        />
        <img
          src={src} alt="" loading="lazy" decoding="async"
          width="300" height="360"
          className={`block object-cover ${sizeClass[size]}`}
          style={{ objectPosition: 'center top', filter: 'saturate(0.96)' }}
        />
      </motion.div>
    </motion.div>
  )
}

function renderBlocks(text) {
  return text.trim().split(/\n\s*\n/).map((block, i) => {
    const lines = block.split('\n')
    return (
      <p key={i} className="text-letter leading-[1.95]">
        {lines.map((line, j) => (
          <span key={j}>{line}{j < lines.length - 1 && <br />}</span>
        ))}
      </p>
    )
  })
}

export default function LetterAndUs({ meta }) {
  const [content, setContent] = useState('')
  useEffect(() => {
    fetch('/content/boyfriend/boyfriend-letter.md')
      .then((r) => r.text()).then(setContent).catch(() => setContent(''))
  }, [])

  const split = content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  const greeting = split[0] || ''
  const rest = split.slice(1).join('\n\n')

  return (
    <section
      className="relative w-full overflow-hidden px-6 py-40 sm:py-48"
      style={{ background: '#1A1124' }}
    >
      {/* bloom atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(203,180,212,0.14), transparent 65%)' }}
      />

      {/* ornaments — lighter on dark */}
      <LavenderSprig
        stroke="#CBB4D4" bloom="#EFE3EC"
        className="pointer-events-none absolute hidden md:block"
        style={{ top: '6%', left: '3%', opacity: 0.55, transform: 'rotate(-12deg)' }}
      />
      <PressedDaisy
        petal="#FAF4E7" edge="#CBB4D4" center="#C89B3C"
        className="pointer-events-none absolute hidden md:block"
        style={{ top: '10%', right: '4%', opacity: 0.55, transform: 'rotate(14deg) scale(0.8)' }}
      />
      <Heart
        stroke="#CBB4D4" stitch="#C89B3C"
        className="pointer-events-none absolute"
        style={{ top: '38%', left: '8%', opacity: 0.35, transform: 'rotate(-6deg)' }}
      />
      <StarScatter
        fill="#C89B3C"
        className="pointer-events-none absolute"
        style={{ bottom: '14%', right: '10%', opacity: 0.55 }}
      />
      <LavenderSprig
        stroke="#CBB4D4" bloom="#EFE3EC"
        className="pointer-events-none absolute hidden lg:block"
        style={{ bottom: '4%', left: '5%', opacity: 0.45, transform: 'rotate(8deg) scale(0.75)' }}
      />

      {/* Scattered couple polaroids — desktop only, in the side margins */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {LEFT_PHOTOS.map((p, i) => (
          <ScatteredPolaroid key={`l${i}`} {...p} style={{ top: p.top, left: p.left }} />
        ))}
        {RIGHT_PHOTOS.map((p, i) => (
          <ScatteredPolaroid key={`r${i}`} {...p} style={{ top: p.top, right: p.right }} />
        ))}
      </div>

      {/* Mobile cluster of couple photos above the letter */}
      <div className="mx-auto mb-16 flex max-w-md flex-wrap justify-center gap-4 md:hidden">
        {MOBILE_CLUSTER.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 18, rotate: (i % 2 === 0 ? -4 : 4) }}
            whileInView={{ opacity: 1, y: 0, rotate: (i % 2 === 0 ? -3 : 3) }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease, delay: i * 0.1 }}
            className="relative"
            style={{
              background: '#FAF4E7',
              padding: '6px 6px 22px 6px',
              boxShadow: '0 3px 6px rgba(0,0,0,0.35), 0 20px 40px -18px rgba(0,0,0,0.6)',
            }}
          >
            <img
              src={src} alt="" loading="lazy" decoding="async"
              width="200" height="240"
              className="block h-[110px] w-[88px] object-cover"
              style={{ objectPosition: 'center top', filter: 'saturate(0.96)' }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease }}
        className="relative z-10 mx-auto max-w-letter"
      >
        <p className="font-body text-micro uppercase tracking-[0.32em] text-bloom/70">
          a letter from me, to you
        </p>

        {greeting && (
          <h2
            className="mt-8 font-display italic font-light leading-[1.1] text-parchment"
            style={{ fontSize: 'clamp(1.75rem, 4.2vw, 2.75rem)' }}
          >
            {greeting}
          </h2>
        )}

        <div className="mt-10 space-y-7 font-body text-parchment/88">
          {renderBlocks(rest)}
        </div>

        <div className="mt-16 flex flex-col gap-1">
          <p className="font-body text-letter italic text-parchment/60">
            with my whole heart,
          </p>
          <p className="font-hand text-3xl text-bloom sm:text-4xl">
            — {meta.from.nickname || meta.from.name.split(' ')[0]}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
