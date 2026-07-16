import { type Variants } from 'motion/react'

// Shared "fade up into place" entrance, reused across cards/sections
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Container that staggers its children's entrance
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

// Viewport config shared by every scroll-triggered reveal
export const inView = { once: true, margin: '-80px' } as const
