import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { firstName } from '../lib/meta.js'
import { LavenderSprig, PressedDaisy, StarScatter, Heart, Balloon, Cake } from './Sprigs.jsx'

const ease = [0.16, 1, 0.3, 1]

export default function Hero({ meta }) {
  const her = firstName(meta.her.name)
  const { scrollY } = useScroll()
  const cueOpacity = useTransform(scrollY, [0, 160], [1, 0])

  return (
    <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden px-6 py-24">
      {/* ambient bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(203,180,212,0.25), transparent 60%)' }}
      />

      {/* scatter */}
      <LavenderSprig className="pointer-events-none absolute hidden md:block" style={{ top: '6%', left: '3%', transform: 'rotate(-14deg)', opacity: 0.8 }} />
      <Balloon className="pointer-events-none absolute hidden sm:block" style={{ top: '4%', right: '6%', transform: 'rotate(12deg)', opacity: 0.75 }} />
      <StarScatter className="pointer-events-none absolute" style={{ top: '46%', left: '3%', opacity: 0.7 }} />
      <Heart className="pointer-events-none absolute" style={{ bottom: '22%', right: '5%', transform: 'rotate(-10deg)', opacity: 0.7 }} />
      <Cake className="pointer-events-none absolute hidden md:block" style={{ bottom: '6%', left: '5%', transform: 'rotate(-6deg)', opacity: 0.7 }} />
      <PressedDaisy className="pointer-events-none absolute hidden lg:block" style={{ bottom: '4%', right: '4%', transform: 'rotate(10deg) scale(0.75)', opacity: 0.55 }} />

      {/* vertical date stamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.8, ease }}
        className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 md:block"
        aria-hidden
      >
        <p className="font-body text-micro uppercase tracking-[0.5em] text-ash" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          04 · 24 · 2026
        </p>
      </motion.div>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 text-center md:flex-row md:items-center md:justify-center md:gap-16">
        {/* TYPE COLUMN — centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="order-2 flex flex-col items-center text-center md:order-1 md:flex-1"
        >
          <p className="font-body text-micro uppercase tracking-[0.3em] text-ash">
            for my ethereal queen —
          </p>

          <h1 className="mt-6 font-display font-light leading-[0.94] tracking-tight text-iris">
            <span className="block italic text-iris/90" style={{ fontSize: 'clamp(1.5rem, 4.5vw, 2.5rem)' }}>
              Happy Birthday,
            </span>
            <span className="relative mt-2 block">
              <span
                className="relative z-10 block text-mulberry"
                style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)', letterSpacing: '-0.04em' }}
              >
                {her}.
              </span>
              <motion.svg
                viewBox="0 0 360 18"
                className="absolute -bottom-2 left-1/2 w-[min(90%,15rem)] -translate-x-1/2"
                height="18" aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1, ease }}
              >
                <motion.path
                  d="M 4 10 C 60 2, 140 18, 210 8 C 280 0, 330 14, 356 9"
                  stroke="#C89B3C" strokeWidth="2.4" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, delay: 1.1, ease }}
                />
              </motion.svg>
            </span>
          </h1>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-8 bg-mulberry/40" aria-hidden />
            <span className="font-display text-micro uppercase tracking-[0.4em] text-mulberry">twenty three</span>
            <span className="h-px w-8 bg-mulberry/40" aria-hidden />
          </div>

          <p className="mt-6 max-w-sm font-body text-letter italic text-ink/80">
            today is all about you, my love. i made this with my whole chest.
          </p>

          <p className="mt-2 font-hand text-mulberry" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)' }}>
            — Tiger
          </p>
        </motion.div>

        {/* PHOTO COLUMN — smaller, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -1.8 }}
          transition={{ duration: 1.1, ease, delay: 0.25 }}
          className="order-1 mx-auto w-fit md:order-2"
        >
          <motion.div
            animate={{ y: [0, -5, 3, 0], rotate: [0, 0.6, -0.4, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="relative"
            style={{
              background: '#FAF4E7',
              padding: '14px 14px 60px 14px',
              boxShadow: '0 4px 8px rgba(28,19,32,0.1), 0 45px 90px -36px rgba(28,19,32,0.4)',
            }}
          >
            <span
              aria-hidden
              className="absolute -top-3 left-1/2"
              style={{
                width: 80, height: 18,
                background: 'rgba(200, 155, 60, 0.4)',
                border: '1px dashed rgba(107, 59, 94, 0.5)',
                transform: 'translateX(-50%) rotate(-4deg)',
              }}
            />
            <span
              aria-hidden
              className="absolute -right-3 -top-3 flex size-10 items-center justify-center rounded-full bg-mulberry font-body text-[0.5rem] uppercase tracking-[0.18em] text-parchment"
              style={{ transform: 'rotate(12deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.12)' }}
            >
              04·24
            </span>
            {/* Crown sitting on her head — extends above the polaroid frame */}
            <svg
              viewBox="0 0 80 50" width="86" height="54"
              className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2"
              style={{ top: 182, transform: 'translateX(calc(-50% + 44px)) rotate(20deg)', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))' }}
              aria-hidden
            >
              <path d="M8 42 L 14 16 L 26 30 L 40 10 L 54 30 L 66 16 L 72 42 Z"
                fill="#C89B3C" stroke="#3B2A52" strokeWidth="1.4" strokeLinejoin="round" />
              <rect x="8" y="42" width="64" height="5" fill="#C89B3C" stroke="#3B2A52" strokeWidth="1.4" />
              <circle cx="14" cy="16" r="2.8" fill="#CBB4D4" stroke="#3B2A52" strokeWidth="0.9" />
              <circle cx="40" cy="10" r="3.4" fill="#B87A6E" stroke="#3B2A52" strokeWidth="0.9" />
              <circle cx="66" cy="16" r="2.8" fill="#CBB4D4" stroke="#3B2A52" strokeWidth="0.9" />
            </svg>
            <img
              src="/assets/celebrant/tomiwa-02.JPG"
              alt={`${her}, the love of my life`}
              width="440" height="560"
              loading="eager" fetchpriority="high" decoding="async"
              className="block h-[320px] w-[250px] object-cover sm:h-[400px] sm:w-[310px] md:h-[460px] md:w-[360px]"
              style={{ objectPosition: 'center top', filter: 'saturate(0.95) contrast(0.98)' }}
            />
            <span
              className="absolute bottom-5 left-0 right-0 text-center font-hand text-mulberry"
              style={{ fontSize: '1rem' }}
            >
              my girl, my peace ✿
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue — fades as you scroll */}
      <motion.div
        style={{ opacity: cueOpacity }}
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
