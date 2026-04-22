import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Treats her full name with reverence: dark midnight backdrop, three words
// appearing one at a time in Fraunces, then everything dissolves into the
// main site. Pure typography — no ornaments, no flourish.

const ease = [0.16, 1, 0.3, 1]

const backdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease } },
  exit: { opacity: 0, transition: { duration: 0.7, ease } },
}

const heading = {
  hidden: { opacity: 0 },
  show: (i) => ({
    opacity: 1,
    transition: { duration: 0.65, ease, delay: i },
  }),
  exit: { opacity: 0, transition: { duration: 0.6, ease } },
}

const word = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease, delay: i },
  }),
  exit: { opacity: 0, transition: { duration: 0.6, ease } },
}

export default function Reveal({ fullName, onDone }) {
  // BODUDE OOREOLUWATOMIWA EMMANUELLA → ['BODUDE','OOREOLUWATOMIWA','EMMANUELLA']
  const parts = (fullName || '').trim().split(/\s+/)
  const longest = parts.reduce((a, b) => (b.length > a.length ? b : a), '')

  useEffect(() => {
    const t = setTimeout(onDone, 3700)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      <motion.div
        key="reveal"
        variants={backdrop}
        initial="hidden"
        animate="show"
        exit="exit"
        className="fixed inset-0 z-reveal flex items-center justify-center px-6 py-10"
        style={{ background: '#1A1124' }}
      >
        {/* Single quiet bloom — keeps the dark surface alive without a gradient */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(203,180,212,0.18), transparent 65%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease }}
        />

        <div className="relative flex flex-col items-center gap-10 text-center">
          <motion.p
            variants={heading}
            initial="hidden"
            animate="show"
            exit="exit"
            custom={0.35}
            className="font-display text-quiet italic tracking-[0.16em] text-bloom/85"
          >
            happy birthday,
          </motion.p>

          <h1
            className="flex flex-col items-center gap-2 sm:gap-3"
            aria-label={fullName}
          >
            {parts.map((w, i) => {
              const isLong = w === longest && parts.length > 1
              return (
                <motion.span
                  key={`${w}-${i}`}
                  variants={word}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  custom={0.85 + i * 0.32}
                  className={[
                    'font-display font-light leading-[1.02] tracking-tight text-parchment',
                    isLong
                      ? 'text-[clamp(1.5rem,6vw,4rem)]'
                      : 'text-[clamp(2rem,8vw,5.5rem)]',
                  ].join(' ')}
                  style={{ textWrap: 'balance' }}
                >
                  {w}
                </motion.span>
              )
            })}
          </h1>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
