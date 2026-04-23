import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

// Two corner cannons. Each particle shoots out in a single smooth ease-out
// arc (no fall-back, no keyframes mid-flight) and fades as it reaches its
// peak distance. Reads as a real confetti pop, not a triangle wave.

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

function buildSide(side, count) {
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const arr = []
  for (let i = 0; i < count; i++) {
    const sideMul = side === 'left' ? 1 : -1
    // 30°–85° from horizontal — wide spread, mostly upward
    const angleDeg = 30 + Math.random() * 55
    const angleRad = (angleDeg * Math.PI) / 180
    // Distance scaled to viewport — peaks vary so the burst feels uneven
    const distance = vh * (0.7 + Math.random() * 0.65)
    arr.push({
      id: `${side}-${i}`,
      Shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      targetX: sideMul * Math.cos(angleRad) * distance,
      targetY: -Math.sin(angleRad) * distance,   // upward only
      spin: (Math.random() - 0.5) * 720,
      delay: Math.random() * 0.12,
      duration: 1.6 + Math.random() * 0.6,
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
        x: p.targetX,
        y: p.targetY,
        rotate: p.spin,
        opacity: [0, 1, 1, 0],
        scale: [0.6, 1, 1, 0.85],
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        ease: [0.22, 1, 0.36, 1],   // smooth ease-out — fast burst, decelerates
        opacity: { duration: p.duration, delay: p.delay, times: [0, 0.12, 0.6, 1] },
        scale:   { duration: p.duration, delay: p.delay, times: [0, 0.15, 0.6, 1] },
      }}
    />
  )
}

// Render the shape inside a wrapper so framer transforms compose cleanly
function ParticleWrap({ p }) {
  const Shape = p.Shape
  return (
    <motion.div
      className="absolute"
      style={{ left: 0, top: 0 }}
      initial={{ x: 0, y: 0, opacity: 0, scale: 0.6, rotate: 0 }}
      animate={{
        x: p.targetX,
        y: p.targetY,
        rotate: p.spin,
        opacity: [0, 1, 1, 0],
        scale: [0.6, 1, 1, 0.85],
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: p.duration, delay: p.delay, times: [0, 0.12, 0.65, 1] },
        scale:   { duration: p.duration, delay: p.delay, times: [0, 0.15, 0.65, 1] },
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

  const left = useMemo(() => (reduce ? [] : buildSide('left', 36)), [reduce])
  const right = useMemo(() => (reduce ? [] : buildSide('right', 36)), [reduce])

  useEffect(() => {
    const t = setTimeout(onDone, reduce ? 200 : 2400)
    return () => clearTimeout(t)
  }, [onDone, reduce])

  if (reduce || (left.length === 0 && right.length === 0)) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-control" aria-hidden>
      <div className="absolute" style={{ left: 16, bottom: 16 }}>
        {left.map((p) => <ParticleWrap key={p.id} p={p} />)}
      </div>
      <div className="absolute" style={{ right: 16, bottom: 16 }}>
        {right.map((p) => <ParticleWrap key={p.id} p={p} />)}
      </div>
    </div>
  )
}
