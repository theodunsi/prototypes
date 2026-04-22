import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

// Particle shapes pulled from the same vocabulary as the page ornaments —
// tiny hearts, petals, daisies, stars, dots. All palette colors only.
const COLORS = ['#6B3B5E', '#CBB4D4', '#B87A6E', '#C89B3C', '#3B2A52']

function ShapeHeart({ color }) {
  return (
    <svg viewBox="0 0 20 18" width="14" height="14" aria-hidden>
      <path
        d="M10 16 C 3 11, 1 7, 3 4 C 5 1, 8 2, 10 5 C 12 2, 15 1, 17 4 C 19 7, 17 11, 10 16 Z"
        fill={color}
      />
    </svg>
  )
}
function ShapePetal({ color }) {
  return (
    <svg viewBox="0 0 14 24" width="10" height="16" aria-hidden>
      <ellipse cx="7" cy="12" rx="5" ry="11" fill={color} opacity="0.95" />
    </svg>
  )
}
function ShapeStar({ color }) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden>
      <path
        d="M8 0 L 9.6 6.4 L 16 8 L 9.6 9.6 L 8 16 L 6.4 9.6 L 0 8 L 6.4 6.4 Z"
        fill={color}
      />
    </svg>
  )
}
function ShapeDot({ color }) {
  return (
    <svg viewBox="0 0 10 10" width="8" height="8" aria-hidden>
      <circle cx="5" cy="5" r="4" fill={color} />
    </svg>
  )
}
function ShapeDaisy({ color }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
      <g transform="translate(12 12)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0" cy="-6" rx="2.4" ry="4"
            fill={color} opacity="0.95"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="2" fill="#C89B3C" />
      </g>
    </svg>
  )
}

const SHAPES = [ShapeHeart, ShapePetal, ShapeStar, ShapeDot, ShapeDaisy]

function buildParticles(n, originY) {
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const vw = typeof window !== 'undefined' ? window.innerWidth : 800
  // Reach: enough that upward-flying particles graze the top of the viewport.
  const upReach = Math.max(originY - 24, 320)            // px upward room
  const sideReach = Math.min(vw * 0.48, 540)             // px sideways room
  const arr = []
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.5
    const Shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    // Scale each particle independently for X and Y so the burst fills the
    // page properly (taller than it is wide, since the button sits low).
    const distY = upReach * (0.55 + Math.random() * 0.45)
    const distX = sideReach * (0.45 + Math.random() * 0.55)
    arr.push({
      id: i,
      Shape,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      endX: cos * distX,
      // Gravity adds positive y; reduce it so upward particles still fly high
      endY: sin * distY + Math.max(60, vh * 0.08),
      spin: (Math.random() - 0.5) * 720,
      delay: Math.random() * 0.05,
    })
  }
  return arr
}

export default function Confetti({ originX, originY, onDone }) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const particles = useMemo(
    () => buildParticles(reduce ? 0 : 56, originY),
    [reduce, originY],
  )

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 200 : 2000)
    return () => clearTimeout(t)
  }, [onDone, reduce])

  if (reduce || !particles.length) return null

  return (
    <div
      className="pointer-events-none fixed z-control"
      style={{ left: originX, top: originY }}
      aria-hidden
    >
      {particles.map((p) => {
        const Shape = p.Shape
        return (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: 0, top: 0, transform: 'translate(-50%, -50%)' }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{
              x: p.endX,
              y: p.endY,
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.85],
              rotate: p.spin,
            }}
            transition={{
              duration: 1.9,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 1.9, times: [0, 0.08, 0.7, 1] },
            }}
          >
            <Shape color={p.color} />
          </motion.div>
        )
      })}
    </div>
  )
}
