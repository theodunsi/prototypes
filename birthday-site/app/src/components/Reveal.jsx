import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Pass 3 (rev) — name is the dominant element, "happy birthday" sits as a
// handwritten greeting above it. Polaroids tumble in larger around the type.

const ease = [0.16, 1, 0.3, 1]

const REVEAL_PHOTOS = [
  {
    src: '/assets/celebrant/tomiwa-1.JPG',
    pos: { top: '6%', left: '4%' },
    fromX: -120, fromY: -80, fromR: -28, toR: -9,
    dur: 14, delay: 1.1,
  },
  {
    src: '/assets/celebrant/tomiwa-02.JPG',
    pos: { top: '4%', right: '5%' },
    fromX: 120, fromY: -90, fromR: 32, toR: 10,
    dur: 16, delay: 1.25,
  },
  {
    src: '/assets/celebrant/tomiwa-with-food.JPG',
    pos: { bottom: '6%', left: '5%' },
    fromX: -130, fromY: 100, fromR: 30, toR: -7,
    dur: 18, delay: 1.4,
    hideMobile: true,
  },
  {
    src: '/assets/celebrant/b54b35e6-a219-409f-af66-eb5f6c741bd8.JPG',
    pos: { bottom: '8%', right: '5%' },
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
      <motion.div
        animate={{ y: [0, -4, 3, 0], rotate: [0, 1.5, -1, 0] }}
        transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay: delay + 1 }}
        className="relative"
        style={{
          background: '#FAF4E7',
          padding: '10px 10px 32px 10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.18), 0 22px 50px -22px rgba(0,0,0,0.55)',
        }}
      >
        <span
          className="absolute -top-2 left-1/2"
          style={{
            width: 36, height: 13,
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
          width="180"
          height="220"
          className="block size-[140px] object-cover sm:size-[180px] md:size-[210px]"
          style={{ filter: 'saturate(0.95) contrast(0.98)' }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Reveal({ fullName, onDone }) {
  const parts = (fullName || '').trim().split(/\s+/)
  const longest = parts.reduce((a, b) => (b.length > a.length ? b : a), '')

  useEffect(() => {
    const t = setTimeout(onDone, 4800)
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
          className="pointer-events-none absolute left-1/2 top-1/2 size-[55rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(203,180,212,0.22), transparent 65%)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease }}
        />

        {/* Polaroids around the type */}
        {REVEAL_PHOTOS.map((p, i) => (
          <RevealPolaroid key={i} {...p} />
        ))}

        {/* Centerpiece: handwritten greeting above, NAME dominant, signed below */}
        <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center gap-3 px-4 text-center sm:gap-4">
          {/* greeting — handwritten, small, sits as a header */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="font-hand text-bloom"
            style={{ fontSize: 'clamp(1.1rem, 3vw, 2rem)' }}
          >
            happy birthday,
          </motion.span>

          {/* her name — DOMINANT, three stacked words in Fraunces */}
          <h1
            className="flex flex-col items-center gap-1 sm:gap-2"
            aria-label={fullName}
          >
            {parts.map((w, i) => {
              const isLong = w === longest && parts.length > 1
              return (
                <motion.span
                  key={`${w}-${i}`}
                  initial={{ opacity: 0, y: 28, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.85, delay: 0.75 + i * 0.32, ease }}
                  className="font-display font-light leading-[0.95] text-parchment"
                  style={{
                    fontSize: isLong
                      ? 'clamp(1.85rem, 8.5vw, 6rem)'
                      : 'clamp(2.75rem, 13.5vw, 9.5rem)',
                    letterSpacing: '-0.035em',
                    textWrap: 'balance',
                  }}
                >
                  {w}
                </motion.span>
              )
            })}
          </h1>

          {/* Hand-drawn ochre underline that draws after the name lands */}
          <motion.svg
            viewBox="0 0 220 8" width="220" height="8"
            className="mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 2.0, ease }}
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
              transition={{ duration: 0.85, delay: 2.0, ease }}
            />
          </motion.svg>

          {/* Sign-off — handwritten, intimate */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 2.5, ease }}
            className="mt-1 font-hand text-rose"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          >
            my Tom Tom
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
