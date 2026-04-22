import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { firstName } from '../lib/meta.js'

const ease = [0.16, 1, 0.3, 1]

// Small on-brand ornaments for the hero spread
function LavenderSprig({ className, style }) {
  return (
    <svg viewBox="0 0 60 120" width="60" height="120" className={className} style={style} aria-hidden>
      <path d="M30 118 C 28 90, 32 70, 30 40" stroke="#6B3B5E" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M30 78 C 22 74, 18 70, 16 62" stroke="#6B3B5E" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M30 62 C 38 58, 42 54, 44 46" stroke="#6B3B5E" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M16 62 C 18 58, 22 56, 24 58" fill="#CBB4D4" opacity="0.9" />
      <path d="M44 46 C 42 42, 38 40, 36 42" fill="#CBB4D4" opacity="0.9" />
      {[4, 10, 16, 22, 28, 34].map((t, i) => (
        <g key={i} transform={`translate(${28 + (i % 2 === 0 ? -3 : 3)} ${t + 4})`}>
          <ellipse cx="0" cy="0" rx="4" ry="5.5" fill="#6B3B5E" opacity={0.78 + i * 0.025} />
          <ellipse cx="-1" cy="-1" rx="1.4" ry="2" fill="#CBB4D4" opacity="0.7" />
        </g>
      ))}
    </svg>
  )
}
function PressedDaisy({ className, style }) {
  return (
    <svg viewBox="0 0 80 80" width="80" height="80" className={className} style={style} aria-hidden>
      <g transform="translate(40 40)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse key={i} cx="0" cy="-18" rx="7" ry="13"
            fill="#F3EADA" stroke="#B87A6E" strokeWidth="1.1"
            transform={`rotate(${deg + (i % 2 ? 4 : -4)})`} opacity="0.95" />
        ))}
        <circle r="7" fill="#C89B3C" />
      </g>
    </svg>
  )
}

export default function Hero({ meta }) {
  const her = firstName(meta.her.name)

  return (
    <section className="relative w-full overflow-hidden px-6 py-24 sm:px-10 md:min-h-dvh md:px-16 md:py-20">
      {/* Ambient bloom behind the whole spread */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[20%] top-[30%] -z-10 size-[42rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(203,180,212,0.22), transparent 60%)' }}
      />

      {/* Scattered botanical accents */}
      <LavenderSprig
        className="pointer-events-none absolute hidden md:block"
        style={{ top: '8%', left: '2%', transform: 'rotate(-12deg)', opacity: 0.85 }}
      />
      <PressedDaisy
        className="pointer-events-none absolute hidden sm:block"
        style={{ top: '14%', right: '12%', transform: 'rotate(14deg) scale(0.9)', opacity: 0.75 }}
      />
      <PressedDaisy
        className="pointer-events-none absolute"
        style={{ bottom: '12%', left: '6%', transform: 'rotate(-22deg) scale(0.75)', opacity: 0.7 }}
      />
      <LavenderSprig
        className="pointer-events-none absolute hidden lg:block"
        style={{ bottom: '4%', right: '4%', transform: 'rotate(10deg) scale(0.8)', opacity: 0.55 }}
      />

      {/* Vertical date stamp — editorial touch */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.8, ease }}
        className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 md:block"
        aria-hidden
      >
        <p
          className="font-body text-micro uppercase tracking-[0.5em] text-ash"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          04 · 24 · 2026
        </p>
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-[1.15fr_1fr] md:gap-24">
        {/* TYPE COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="relative order-2 md:order-1"
        >
          <p className="font-body text-micro uppercase tracking-[0.3em] text-ash">
            for my ethereal queen —
          </p>

          <h1 className="mt-8 font-display font-light leading-[0.92] tracking-tight text-iris">
            <span
              className="block italic text-iris/90"
              style={{ fontSize: 'clamp(2.25rem, 7vw, 4.25rem)' }}
            >
              Happy Birthday,
            </span>
            <span className="relative mt-2 block">
              <span
                className="relative z-10 block text-mulberry"
                style={{
                  fontSize: 'clamp(4.5rem, 15vw, 10rem)',
                  letterSpacing: '-0.04em',
                }}
              >
                {her}.
              </span>
              {/* Ochre handwritten squiggle underline */}
              <motion.svg
                viewBox="0 0 360 18"
                className="absolute -bottom-3 left-0 w-[min(100%,22rem)]"
                height="18"
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1, ease }}
              >
                <motion.path
                  d="M 4 10 C 60 2, 140 18, 210 8 C 280 0, 330 14, 356 9"
                  stroke="#C89B3C"
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 1.1, ease }}
                />
              </motion.svg>
            </span>
          </h1>

          {/* Roman numeral ornamental accent */}
          <div className="mt-10 flex items-center gap-4">
            <span className="h-px w-12 bg-mulberry/40" aria-hidden />
            <span className="font-display text-micro uppercase tracking-[0.4em] text-mulberry">
              twenty three
            </span>
          </div>

          <p className="mt-6 max-w-md font-body text-letter italic text-ink/80">
            today is all about you, my love. i made this with my whole chest.
          </p>

          <p className="mt-2 font-hand text-mulberry" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}>
            — Tiger
          </p>
        </motion.div>

        {/* PHOTO COLUMN — bigger, tilted, with tape and handwritten caption */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -1.8 }}
          transition={{ duration: 1.1, ease, delay: 0.25 }}
          className="order-1 mx-auto w-fit md:order-2 md:mx-0 md:ml-auto"
        >
          <motion.div
            animate={{ y: [0, -5, 3, 0], rotate: [0, 0.6, -0.4, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="relative"
            style={{
              background: '#FAF4E7',
              padding: '18px 18px 76px 18px',
              boxShadow: '0 4px 8px rgba(28,19,32,0.1), 0 55px 100px -40px rgba(28,19,32,0.4)',
            }}
          >
            {/* tape strip */}
            <span
              aria-hidden
              className="absolute -top-4 left-1/2"
              style={{
                width: 96, height: 22,
                background: 'rgba(200, 155, 60, 0.4)',
                border: '1px dashed rgba(107, 59, 94, 0.5)',
                transform: 'translateX(-50%) rotate(-4deg)',
              }}
            />
            {/* corner stamp */}
            <span
              aria-hidden
              className="absolute -right-3 -top-3 flex size-12 items-center justify-center rounded-full bg-mulberry font-body text-[0.55rem] uppercase tracking-[0.18em] text-parchment"
              style={{ transform: 'rotate(12deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.12)' }}
            >
              04·24
            </span>
            <img
              src="/assets/celebrant/tomiwa-02.JPG"
              alt={`${her}, the love of my life`}
              width="560"
              height="700"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="block h-[420px] w-[320px] object-cover sm:h-[540px] sm:w-[420px] md:h-[640px] md:w-[500px]"
              style={{ filter: 'saturate(0.95) contrast(0.98)' }}
            />
            {/* handwritten caption */}
            <span
              className="absolute bottom-6 left-0 right-0 text-center font-hand text-mulberry"
              style={{ fontSize: '1.15rem' }}
            >
              my girl, my peace ✿
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-ash"
        >
          <span className="font-body text-micro uppercase tracking-[0.3em]">keep reading</span>
          <ChevronDown className="size-4" strokeWidth={1.4} />
        </motion.div>
      </motion.div>
    </section>
  )
}
