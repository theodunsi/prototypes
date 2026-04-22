import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  LavenderSprig, PressedDaisy, Heart, StarScatter, Butterfly,
  Bow, DiamondRing,
} from './Sprigs.jsx'

const ease = [0.16, 1, 0.3, 1]

// ALL 12 couple photos — split into two vertical rails on desktop.
const LEFT_RAIL = [
  '/assets/couple/IMG_1146.jpg',
  '/assets/couple/053786d2-6612-47c2-ab5e-3a9a4d7283ad.JPG',
  '/assets/couple/IMG_6491.jpg',
  '/assets/couple/6c3f2eb2-ebc6-4d3d-b179-1fc57427bd65.JPG',
  '/assets/couple/IMG_8364.jpg',
  '/assets/couple/ad8dc3be-46ff-4596-b32a-0314934288a1.JPG',
]
const RIGHT_RAIL = [
  '/assets/couple/tomiwa-1.jpg',
  '/assets/couple/IMG_1334.jpg',
  '/assets/couple/0aca0e2e-36a3-4961-ba47-5b784daa49e3.JPG',
  '/assets/couple/15fe2a4e-6e91-458c-aa61-4edebe576dbd.JPG',
  '/assets/couple/IMG_6456.jpg',
  '/assets/couple/EFD94C60-68D9-44F1-B7F8-6E0339DC7161.jpg',
]

const TILTS_L = [-4, 3, -3, 5, -2, 4]
const TILTS_R = [5, -3, 4, -4, 3, -5]

function RailPhoto({ src, tilt }) {
  return (
    <div
      className="relative mx-auto mb-14"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div
        className="relative"
        style={{
          background: '#FAF4E7',
          padding: '12px 12px 44px 12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.35), 0 40px 80px -28px rgba(0,0,0,0.7)',
        }}
      >
        <span
          aria-hidden className="absolute -top-3 left-1/2"
          style={{
            width: 72, height: 16,
            background: 'rgba(200, 155, 60, 0.42)',
            border: '1px dashed rgba(203, 180, 212, 0.5)',
            transform: 'translateX(-50%) rotate(-5deg)',
          }}
        />
        <img
          src={src} alt="" loading="lazy" decoding="async"
          width="440" height="560"
          className="block h-[360px] w-[280px] object-cover lg:h-[420px] lg:w-[320px]"
          style={{ objectPosition: 'center top', filter: 'saturate(0.96)' }}
        />
      </div>
    </div>
  )
}

function renderBlocks(text) {
  return text.trim().split(/\n\s*\n/).map((block, i) => {
    const lines = block.split('\n')
    return (
      <p key={i}>
        {lines.map((line, j) => (
          <span key={j}>{line}{j < lines.length - 1 && <br />}</span>
        ))}
      </p>
    )
  })
}

function LetterContent({ meta, compact = false }) {
  const [content, setContent] = useState('')
  useEffect(() => {
    fetch('/content/boyfriend/boyfriend-letter.md')
      .then((r) => r.text()).then(setContent).catch(() => setContent(''))
  }, [])

  const split = content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  const greeting = split[0] || ''
  const rest = split.slice(1).join('\n\n')

  return (
    <div className="text-parchment">
      <p className={`font-body uppercase tracking-[0.32em] text-bloom/70 ${compact ? 'text-[0.58rem]' : 'text-micro'}`}>
        a letter from me, to you
      </p>
      {greeting && (
        <h2
          className="mt-4 font-display italic font-light leading-[1.15] text-parchment"
          style={{ fontSize: compact ? 'clamp(1rem, 2.2vw, 1.35rem)' : 'clamp(1.75rem, 4.2vw, 2.75rem)' }}
        >
          {greeting}
        </h2>
      )}
      <div
        className={`${compact ? 'mt-4 space-y-2.5' : 'mt-10 space-y-7'} font-body text-parchment/88`}
        style={compact
          ? { fontSize: '0.78rem', lineHeight: '1.5' }
          : { fontSize: '1.125rem', lineHeight: '1.9' }}
      >
        {renderBlocks(rest)}
      </div>
      <div className={compact ? 'mt-5' : 'mt-16'}>
        <p className={`font-body italic text-parchment/60 ${compact ? 'text-[0.72rem]' : 'text-letter'}`}>
          with my whole heart,
        </p>
        <p className={`font-hand text-bloom ${compact ? 'text-xl' : 'text-3xl sm:text-4xl'}`}>
          — {meta.from.nickname || meta.from.name.split(' ')[0]}
        </p>
      </div>
    </div>
  )
}

export default function LetterAndUs({ meta }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  // Rails travel: start below viewport center, end above. Slightly different
  // rates so they never move in lockstep.
  const leftY  = useTransform(scrollYProgress, [0, 1], ['15vh', '-110%'])
  const rightY = useTransform(scrollYProgress, [0, 1], ['35vh', '-110%'])

  return (
    <>
      {/* DESKTOP: pinned scroll */}
      <section
        ref={sectionRef}
        className="relative hidden w-full md:block"
        style={{ height: '520vh', background: '#1A1124' }}
      >
        <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden">
          {/* bloom atmosphere — also sticky since it lives inside the sticky element */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 size-[55rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(203,180,212,0.16), transparent 65%)' }}
          />

          {/* Ornaments — palette-recolored for dark */}
          <LavenderSprig stroke="#CBB4D4" bloom="#EFE3EC"
            className="pointer-events-none absolute z-[2]" style={{ top: '4%', left: '32%', opacity: 0.55, transform: 'rotate(-10deg)' }} />
          <PressedDaisy petal="#FAF4E7" edge="#CBB4D4" center="#C89B3C"
            className="pointer-events-none absolute z-[2]" style={{ top: '6%', right: '30%', opacity: 0.55, transform: 'rotate(14deg) scale(0.85)' }} />
          <StarScatter fill="#C89B3C"
            className="pointer-events-none absolute z-[2]" style={{ top: '42%', left: '28%', opacity: 0.55 }} />
          <Butterfly wing="#CBB4D4" edge="#6B3B5E" body="#CBB4D4"
            className="pointer-events-none absolute z-[2]" style={{ top: '46%', right: '28%', opacity: 0.5 }} />
          <Heart stroke="#CBB4D4" stitch="#C89B3C"
            className="pointer-events-none absolute z-[2]" style={{ bottom: '10%', left: '30%', opacity: 0.45, transform: 'rotate(-6deg)' }} />
          <DiamondRing band="#C89B3C" stone="#CBB4D4"
            className="pointer-events-none absolute z-[2]" style={{ bottom: '8%', right: '28%', opacity: 0.5 }} />
          <Bow fill="#B87A6E" stroke="#CBB4D4"
            className="pointer-events-none absolute z-[2]" style={{ top: '22%', left: '44%', opacity: 0.45 }} />

          {/* LEFT rail — absolute, top-aligned, height from content */}
          <motion.div
            style={{ y: leftY }}
            className="absolute left-0 top-0 z-[3] w-[340px] lg:w-[380px] xl:w-[400px]"
          >
            {LEFT_RAIL.map((src, i) => (
              <RailPhoto key={src} src={src} tilt={TILTS_L[i % TILTS_L.length]} />
            ))}
          </motion.div>

          {/* RIGHT rail */}
          <motion.div
            style={{ y: rightY }}
            className="absolute right-0 top-0 z-[3] w-[340px] lg:w-[380px] xl:w-[400px]"
          >
            {RIGHT_RAIL.map((src, i) => (
              <RailPhoto key={src} src={src} tilt={TILTS_R[i % TILTS_R.length]} />
            ))}
          </motion.div>

          {/* LETTER — sits on top of rails, fixed in the middle column */}
          <div
            className="relative z-[10] mx-auto w-full max-w-[32rem] px-8"
            style={{
              maxHeight: '88vh',
              background: 'rgba(26, 17, 36, 0.88)',
              padding: '28px 32px',
              border: '1px solid rgba(203, 180, 212, 0.12)',
              backdropFilter: 'blur(2px)',
            }}
          >
            <LetterContent meta={meta} compact />
          </div>
        </div>
      </section>

      {/* MOBILE: traditional flow — no sticky (doesn't feel right on touch) */}
      <section
        className="relative w-full overflow-hidden px-6 py-32 md:hidden"
        style={{ background: '#1A1124' }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(203,180,212,0.14), transparent 65%)' }}
        />
        <LavenderSprig stroke="#CBB4D4" bloom="#EFE3EC"
          className="pointer-events-none absolute" style={{ top: '5%', left: '4%', opacity: 0.5, transform: 'rotate(-10deg)' }} />
        <Heart stroke="#CBB4D4" stitch="#C89B3C"
          className="pointer-events-none absolute" style={{ top: '25%', right: '6%', opacity: 0.5 }} />
        <StarScatter fill="#C89B3C"
          className="pointer-events-none absolute" style={{ bottom: '20%', left: '4%', opacity: 0.5 }} />
        <PressedDaisy petal="#FAF4E7" edge="#CBB4D4" center="#C89B3C"
          className="pointer-events-none absolute" style={{ bottom: '6%', right: '6%', opacity: 0.5 }} />

        <div className="relative z-[1] mx-auto mb-16 flex max-w-md flex-wrap justify-center gap-4">
          {[...LEFT_RAIL.slice(0, 3), ...RIGHT_RAIL.slice(0, 3)].map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 18, rotate: i % 2 === 0 ? -4 : 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -3 : 3 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
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
                className="block h-[120px] w-[95px] object-cover"
                style={{ objectPosition: 'center top', filter: 'saturate(0.96)' }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease }}
          className="relative z-[1] mx-auto max-w-letter"
        >
          <LetterContent meta={meta} compact={false} />
        </motion.div>
      </section>
    </>
  )
}
