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

function buildParticles(n) {
  const arr = []
  for (let i = 0; i < n; i++) {
    const angle = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.55
    const distance = 90 + Math.random() * 130
    const Shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
    arr.push({
      id: i,
      Shape,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      endX: Math.cos(angle) * distance,
      endY: Math.sin(angle) * distance + 60,  // gravity-tilt downward
      spin: (Math.random() - 0.5) * 540,
      delay: Math.random() * 0.08,
    })
  }
  return arr
}

export default function Confetti({ originX, originY, onDone }) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const particles = useMemo(() => buildParticles(reduce ? 0 : 32), [reduce])

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 200 : 1500)
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
              duration: 1.4,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
              opacity: { duration: 1.4, times: [0, 0.1, 0.7, 1] },
            }}
          >
            <Shape color={p.color} />
          </motion.div>
        )
      })}
    </div>
  )
}
