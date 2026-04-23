import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

// Two corner cannons. Each fires palette-true particles diagonally up and
// inward, peaking near the top of the viewport, then falling back down with
// gravity. Shapes are pulled from the same vocabulary as the page ornaments.

const COLORS = ['#6B3B5E', '#CBB4D4', '#B87A6E', '#C89B3C', '#3B2A52']

function ShapeHeart({ color }) {
  return (
    <svg viewBox="0 0 20 18" width="16" height="16" aria-hidden>
      <path d="M10 16 C 3 11, 1 7, 3 4 C 5 1, 8 2, 10 5 C 12 2, 15 1, 17 4 C 19 7, 17 11, 10 16 Z" fill={color} />
    </svg>
  )
}
function ShapePetal({ color }) {
  return (
    <svg viewBox="0 0 14 24" width="12" height="20" aria-hidden>
      <ellipse cx="7" cy="12" rx="5" ry="11" fill={color} opacity="0.95" />
    </svg>
  )
}
function ShapeStar({ color }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
      <path d="M8 0 L 9.6 6.4 L 16 8 L 9.6 9.6 L 8 16 L 6.4 9.6 L 0 8 L 6.4 6.4 Z" fill={color} />
    </svg>
  )
}
function ShapeDot({ color }) {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden>
      <circle cx="5" cy="5" r="4" fill={color} />
    </svg>
  )
}
function ShapeDaisy({ color }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <g transform="translate(12 12)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="0" cy="-6" rx="2.4" ry="4"
            fill={color} opacity="0.95" transform={`rotate(${deg})`} />
        ))}
        <circle r="2" fill="#C89B3C" />
      </g>
    </svg>
  )
}

const SHAPES = [ShapeHeart, ShapePetal, ShapeStar, ShapeDot, ShapeDaisy]

// Build a side's worth of particles. Each particle has an arc (apex near the
// top of the viewport) and lands somewhere below the start point.
function buildSide(side, count) {
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const arr = []
  for (let i = 0; i < count; i++) {
    const sideMul = side === 'left' ? 1 : -1
    // 50–82° from horizontal — steeply upward but inward
    const angleDeg = 50 + Math.random() * 32
    const angleRad = (angleDeg * Math.PI) / 180
    // Speed scaled to viewport height — peak reaches ~80–105% of vh
    const speed = vh * (0.95 + Math.random() * 0.55)
    const vx = sideMul * Math.cos(angleRad) * speed
    const vy = -Math.sin(angleRad) * speed     // negative = up in CSS
    // Apex point (around 50% of duration)
    const apexX = vx * 0.55
    const apexY = vy * 0.6
    // Final landing — past the start, well below it
    const finalX = vx * 1.1
    const finalY = vh * 0.4 + Math.random() * vh * 0.45
    // Mid-fall point so the curve actually arcs (not a triangle)
    const midX = (apexX + finalX) * 0.5
    const midY = apexY * 0.25
    arr.push({
      id: `${side}-${i}`,
      Shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      x: [0, apexX * 0.35, apexX, midX, finalX],
      y: [0, apexY * 0.7, apexY, midY, finalY],
      spin: (Math.random() - 0.5) * 1080,
      delay: Math.random() * 0.18,
      duration: 2.6 + Math.random() * 1.1,
    })
  }
  return arr
}

function Particle({ p }) {
  const Shape = p.Shape
  return (
    <motion.div
      className="absolute"
      style={{ left: 0, top: 0 }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.6, rotate: 0 }}
      animate={{
        x: p.x, y: p.y, rotate: p.spin,
        opacity: [0, 1, 1, 1, 0],
        scale: [0.6, 1.05, 1, 1, 0.85],
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        times: [0, 0.18, 0.5, 0.78, 1],
        ease: 'linear',
      }}
    >
      <Shape color={p.color} />
    </motion.div>
  )
}

export default function Confetti({ onDone }) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const left = useMemo(() => (reduce ? [] : buildSide('left', 42)), [reduce])
  const right = useMemo(() => (reduce ? [] : buildSide('right', 42)), [reduce])

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 200 : 3700)
    return () => clearTimeout(t)
  }, [onDone, reduce])

  if (reduce || (left.length === 0 && right.length === 0)) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-control" aria-hidden>
      <div className="absolute" style={{ left: 16, bottom: 16 }}>
        {left.map((p) => <Particle key={p.id} p={p} />)}
      </div>
      <div className="absolute" style={{ right: 16, bottom: 16 }}>
        {right.map((p) => <Particle key={p.id} p={p} />)}
      </div>
    </div>
  )
}
