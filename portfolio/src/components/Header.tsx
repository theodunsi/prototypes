import { motion, useReducedMotion } from 'motion/react'
import { profile } from '../data/content'
import { INSET } from '../lib/layout'
import { useSound } from './SoundProvider'

// Shared top bar: availability status (left) + sound mute toggle (right).
// Used by both the home page and project detail pages so they stay in sync.
export default function Header() {
  const reduce = useReducedMotion()
  const { enabled, toggle } = useSound()

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-center justify-between pt-5 pb-8 sm:pb-12 ${INSET}`}
    >
      <div className="flex items-center gap-2">
        <span
          className="size-[12px] rounded-full bg-accent"
          style={{ animation: reduce ? undefined : 'status-pulse 2s ease-out infinite' }}
        />
        <span className="text-[12px] uppercase tracking-[0.04em] text-ink">
          {profile.available ? 'Available for work' : 'Currently booked'}
        </span>
      </div>
      <button
        onClick={toggle}
        className="grid size-11 cursor-pointer place-items-center rounded-full bg-surface transition-colors hover:bg-hairline sm:size-10"
        aria-label={enabled ? 'Mute' : 'Unmute'}
        aria-pressed={enabled}
      >
        {/* Instant swap — no transition. Muted by default → mute icon shows. */}
        <img
          src={enabled ? '/assets/icons/volume-high.svg' : '/assets/icons/volume-mute.svg'}
          alt=""
          className="size-5"
        />
      </button>
    </motion.header>
  )
}
