import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export default function Closing({ meta }) {
  const closing = meta?.site?.closing || 'happy birthday, my love'
  const fromName = meta?.from?.nickname || meta?.from?.name?.split(' ')[0] || ''

  return (
    <section className="relative flex min-h-[70vh] w-full items-center justify-center px-6 py-32">
      {/* Tiny heart floating above the closing line */}
      <motion.svg
        viewBox="0 0 60 54" width="44" height="40"
        className="pointer-events-none absolute left-1/2 top-[14%] -translate-x-1/2"
        aria-hidden
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 0.85, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease }}
      >
        <path
          d="M30 48 C 10 34, 4 22, 10 12 C 16 4, 26 6, 30 14 C 34 6, 44 4, 50 12 C 56 22, 50 34, 30 48 Z"
          fill="none" stroke="#6B3B5E" strokeWidth="1.3"
        />
      </motion.svg>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.0, ease }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <h2
          className="font-display italic font-light leading-[1.05] text-iris"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', textWrap: 'balance' }}
        >
          {closing}.
        </h2>
        {fromName && (
          <p
            className="mt-10 font-hand text-mulberry"
            style={{ fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)' }}
          >
            — {fromName}
          </p>
        )}
      </motion.div>
    </section>
  )
}
