import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Pass 3 — dramatic but on-theme. Four polaroids tumble in around a massive
// HAPPY BIRTHDAY treatment. Same scrapbook vocabulary as the rest of the site.

const ease = [0.16, 1, 0.3, 1]

const REVEAL_PHOTOS = [
  {
    src: '/assets/celebrant/tomiwa-1.JPG',
    pos: { top: '8%', left: '4%' },        // top-left
    fromX: -120, fromY: -80, fromR: -28, toR: -9,
    dur: 14, delay: 1.1,
  },
  {
    src: '/assets/celebrant/tomiwa-02.JPG',
    pos: { top: '6%', right: '5%' },       // top-right
    fromX: 120, fromY: -90, fromR: 32, toR: 10,
    dur: 16, delay: 1.25,
  },
  {
    src: '/assets/celebrant/tomiwa-with-food.JPG',
    pos: { bottom: '8%', left: '6%' },     // bottom-left
    fromX: -130, fromY: 100, fromR: 30, toR: -7,
    dur: 18, delay: 1.4,
    hideMobile: true,
  },
  {
    src: '/assets/celebrant/b54b35e6-a219-409f-af66-eb5f6c741bd8.JPG',
    pos: { bottom: '10%', right: '6%' },   // bottom-right
    fromX: 130, fromY: 90, fromR: -28, toR: 8,
    dur: 15, delay: 1.55,
    hideMobile: true,
  },
]

function RevealPolaroid({ src, pos, fromX, fromY, fromR, toR, dur, delay, hideMobile }) {
  return (
    <motion.div
      className={`pointer-events-none absolute ${hideMobile ? 'hidden sm:block' : ''}`}
      style={pos}
      initial={{ opacity: 0, x: fromX, y: fromY, rotate: fromR, scale: 0.7 }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: toR, scale: 1 }}
      transition={{ duration: 0.95, delay, ease }}
      aria-hidden
    >
      {/* Inner wrap drifts gently after the tumble has landed */}
      <motion.div
        animate={{ y: [0, -4, 3, 0], rotate: [0, 1.5, -1, 0] }}
        transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 }}
        className="relative"
        style={{
          background: '#FAF4E7',
          padding: '8px 8px 26px 8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.18), 0 22px 50px -22px rgba(0,0,0,0.55)',
        }}
      >
        {/* tape */}
        <span
          className="absolute -top-2 left-1/2"
          style={{
            width: 32, height: 12,
            background: 'rgba(200, 155, 60, 0.45)',
            border: '1px dashed rgba(107, 59, 94, 0.45)',
            transform: 'translateX(-50%) rotate(-5deg)',
          }}
          aria-hidden
        />
        <img
          src={src}
          alt=""
          loading="eager"
          decoding="async"
          width="120"
          height="150"
          className="block size-[110px] object-cover sm:size-[140px] md:size-[160px]"
          style={{ filter: 'saturate(0.95) contrast(0.98)' }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Reveal({ fullName, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      <motion.div
        key="reveal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.55, ease }}
        className="fixed inset-0 z-reveal overflow-hidden"
        style={{ background: '#1A1124' }}
      >
        {/* Soft mulberry bloom — keeps the dark surface alive */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(203,180,212,0.22), transparent 65%)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease }}
        />

        {/* Polaroids around the type */}
        {REVEAL_PHOTOS.map((p, i) => (
          <RevealPolaroid key={i} {...p} />
        ))}

        {/* Centerpiece: HAPPY BIRTHDAY type */}
        <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 28, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.35, ease }}
            className="font-display italic font-light leading-[0.95] text-parchment"
            style={{
              fontSize: 'clamp(3rem, 13vw, 9rem)',
              letterSpacing: '-0.025em',
            }}
          >
            Happy
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 28, scale: 0.86 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.7, ease }}
            className="font-display font-light uppercase leading-[0.95] text-parchment"
            style={{
              fontSize: 'clamp(3.25rem, 14vw, 10rem)',
              letterSpacing: '-0.04em',
            }}
          >
            Birthday
          </motion.span>

          {/* Hand-drawn ochre underline that draws in */}
          <motion.svg
            viewBox="0 0 220 8" width="220" height="8"
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.6, ease }}
            aria-hidden
          >
            <motion.path
              d="M 4 4 C 60 1, 120 7, 216 3"
              stroke="#C89B3C"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.85, delay: 1.6, ease }}
            />
          </motion.svg>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.2, ease }}
            className="mt-3 max-w-[90vw] font-display uppercase text-bloom/85"
            style={{
              fontSize: 'clamp(0.7rem, 1.7vw, 1rem)',
              letterSpacing: '0.32em',
              textWrap: 'balance',
            }}
            aria-label={fullName}
          >
            {fullName}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.6, ease }}
            className="mt-1 font-hand text-rose/90"
            style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)' }}
          >
            my Tom Tom · the love of my life
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
