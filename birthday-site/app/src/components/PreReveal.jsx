import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { firstName } from '../lib/meta.js'
import { pad } from '../lib/time.js'
import { useCountdown } from '../hooks/useCountdown.js'

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] },
  }),
}

function Cell({ value, label }) {
  return (
    <div className="flex w-20 flex-col items-center gap-1.5 sm:w-24">
      <span className="font-display text-5xl font-light tabular-nums text-iris sm:text-6xl">
        {pad(value)}
      </span>
      <span className="font-body text-micro uppercase text-ash">{label}</span>
    </div>
  )
}

export default function PreReveal({ meta, targetUTC, forceReady = false, onUnlock }) {
  const live = useCountdown(targetUTC)
  const ready = forceReady || live.ready
  const her = firstName(meta.her.name)

  return (
    <section className="relative mx-auto flex min-h-dvh max-w-letter flex-col items-center justify-center gap-14 px-6 py-20 text-center">
      {/* Slow ambient bloom — purely opacity, off the compositor only */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bloom/20 blur-3xl"
        animate={{ opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.p
        variants={fade} initial="hidden" animate="show" custom={0}
        className="font-body text-micro uppercase text-ash"
      >
        a small thing, made for one person
      </motion.p>

      <motion.h1
        variants={fade} initial="hidden" animate="show" custom={1}
        className="font-display text-4xl font-light leading-[1.05] tracking-tight text-iris sm:text-6xl"
      >
        something for {her},
        <br />
        <span className="italic text-mulberry">when the day arrives.</span>
      </motion.h1>

      <motion.div
        variants={fade} initial="hidden" animate="show" custom={2}
        className="flex items-center justify-center gap-3 sm:gap-5"
      >
        <Cell value={live.days} label="days" />
        <span className="font-display text-3xl text-bloom" aria-hidden>·</span>
        <Cell value={live.hours} label="hours" />
        <span className="font-display text-3xl text-bloom" aria-hidden>·</span>
        <Cell value={live.minutes} label="min" />
        <span className="font-display text-3xl text-bloom" aria-hidden>·</span>
        <Cell value={live.seconds} label="sec" />
      </motion.div>

      <motion.div
        variants={fade} initial="hidden" animate="show" custom={3}
        className="flex flex-col items-center gap-4 pt-2"
      >
        <button
          type="button"
          onClick={ready ? onUnlock : undefined}
          aria-disabled={!ready}
          aria-label={ready ? `Open ${her}'s gift` : 'Locked until her birthday'}
          className={[
            'group relative inline-flex items-center gap-3 rounded-card border px-7 py-3.5',
            'font-body text-quiet uppercase tracking-[0.18em]',
            'transition-colors duration-150 ease-paper',
            ready
              ? 'cursor-pointer border-iris/70 bg-iris text-paper hover:bg-mulberry'
              : 'cursor-not-allowed border-ink/15 bg-paper/60 text-ash',
          ].join(' ')}
        >
          {!ready && <Lock className="size-3.5" aria-hidden strokeWidth={1.6} />}
          <span>{ready ? 'open' : 'locked'}</span>
        </button>

        <p className="max-w-xs font-body text-quiet italic text-ash">
          {ready
            ? 'it’s time. press it whenever you’re ready.'
            : 'it opens at midnight, your time.'}
        </p>
      </motion.div>
    </section>
  )
}
