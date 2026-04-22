import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { firstName } from '../lib/meta.js'

const ease = [0.16, 1, 0.3, 1]

export default function Hero({ meta }) {
  const her = firstName(meta.her.name)

  return (
    <section className="relative flex min-h-dvh w-full items-center px-6 py-24 sm:px-10 md:px-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-[1.1fr_1fr] md:gap-20">
        {/* TYPE COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="order-2 md:order-1"
        >
          <p className="font-body text-micro uppercase tracking-[0.22em] text-ash">
            for my ethereal queen —
          </p>

          <h1 className="mt-6 font-display font-light leading-[0.98] tracking-tight text-iris">
            <span className="block italic" style={{ fontSize: 'clamp(2.25rem, 7vw, 4.5rem)' }}>
              Happy Birthday,
            </span>
            <span
              className="mt-1 block text-mulberry"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 7rem)', letterSpacing: '-0.035em' }}
            >
              {her}.
            </span>
          </h1>

          <p className="mt-7 max-w-md font-body text-letter italic text-ink/80">
            today is all about you, my love. i made this with my whole chest.
          </p>

          <p className="mt-2 font-hand text-mulberry" style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)' }}>
            — Tiger
          </p>
        </motion.div>

        {/* PHOTO COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 1.1, ease, delay: 0.25 }}
          className="order-1 mx-auto w-fit md:order-2 md:mx-0 md:ml-auto"
        >
          <div
            className="relative"
            style={{
              background: '#FAF4E7',
              padding: '14px 14px 64px 14px',
              boxShadow: '0 3px 6px rgba(28,19,32,0.08), 0 40px 80px -32px rgba(28,19,32,0.35)',
            }}
          >
            {/* tape strip */}
            <span
              aria-hidden
              className="absolute -top-3 left-1/2"
              style={{
                width: 72, height: 18,
                background: 'rgba(200, 155, 60, 0.35)',
                border: '1px dashed rgba(107, 59, 94, 0.45)',
                transform: 'translateX(-50%) rotate(-4deg)',
              }}
            />
            <img
              src="/assets/celebrant/tomiwa-02.JPG"
              alt={`${her}, the love of my life`}
              width="440"
              height="560"
              loading="eager"
              fetchpriority="high"
              decoding="async"
              className="block h-[360px] w-[280px] object-cover sm:h-[440px] sm:w-[340px] md:h-[520px] md:w-[400px]"
              style={{ filter: 'saturate(0.95) contrast(0.98)' }}
            />
            {/* handwritten caption */}
            <span
              className="absolute bottom-5 left-0 right-0 text-center font-hand text-mulberry"
              style={{ fontSize: '1rem' }}
            >
              my girl, my peace ✿
            </span>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.4, ease }}
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
