import { motion } from 'framer-motion'

// Shared ornament atoms used across sections. Every one accepts palette overrides
// so they can live on parchment OR on the dark letter section.
const drift = (dur, x = 4, y = 4, r = 2) => ({
  animate: { x: [0, x, -x / 2, 0], y: [0, -y, y / 2, 0], rotate: [0, r, -r / 2, 0] },
  transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' },
})

export function LavenderSprig({
  stroke = '#6B3B5E', bloom = '#CBB4D4', dur = 14,
  className = '', style,
}) {
  return (
    <motion.svg
      {...drift(dur, 4, 6, 3)}
      viewBox="0 0 60 120" width="60" height="120"
      className={className} style={style} aria-hidden
    >
      <path d="M30 118 C 28 90, 32 70, 30 40" stroke={stroke} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M30 78 C 22 74, 18 70, 16 62" stroke={stroke} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M30 62 C 38 58, 42 54, 44 46" stroke={stroke} strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M16 62 C 18 58, 22 56, 24 58" fill={bloom} opacity="0.9" />
      <path d="M44 46 C 42 42, 38 40, 36 42" fill={bloom} opacity="0.9" />
      {[4, 10, 16, 22, 28, 34].map((t, i) => (
        <g key={i} transform={`translate(${28 + (i % 2 === 0 ? -3 : 3)} ${t + 4})`}>
          <ellipse rx="4" ry="5.5" fill={stroke} opacity={0.78 + i * 0.025} />
          <ellipse cx="-1" cy="-1" rx="1.4" ry="2" fill={bloom} opacity="0.7" />
        </g>
      ))}
    </motion.svg>
  )
}

export function PressedDaisy({
  petal = '#F3EADA', edge = '#B87A6E', center = '#C89B3C', dur = 17,
  className = '', style,
}) {
  return (
    <motion.svg
      {...drift(dur, 4, 5, 4)}
      viewBox="0 0 80 80" width="80" height="80"
      className={className} style={style} aria-hidden
    >
      <g transform="translate(40 40)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse key={i} cx="0" cy="-18" rx="7" ry="13"
            fill={petal} stroke={edge} strokeWidth="1.1"
            transform={`rotate(${deg + (i % 2 ? 4 : -4)})`} opacity="0.95" />
        ))}
        <circle r="7" fill={center} />
      </g>
    </motion.svg>
  )
}

export function Butterfly({
  wing = '#CBB4D4', edge = '#6B3B5E', body = '#3B2A52', dur = 11,
  className = '', style,
}) {
  return (
    <motion.svg
      {...drift(dur, 10, 8, 6)}
      viewBox="0 0 90 70" width="90" height="70"
      className={className} style={style} aria-hidden
    >
      <path d="M45 35 C 20 10, 8 18, 12 34 C 10 50, 28 54, 45 38"
        fill={wing} stroke={edge} strokeWidth="1.1" opacity="0.9" />
      <path d="M45 35 C 70 10, 82 18, 78 34 C 80 50, 62 54, 45 38"
        fill={wing} stroke={edge} strokeWidth="1.1" opacity="0.9" />
      <path d="M45 18 L 45 50" stroke={body} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M42 18 C 38 12, 38 8, 42 6 M 48 18 C 52 12, 52 8, 48 6"
        stroke={body} strokeWidth="1" fill="none" strokeLinecap="round" />
    </motion.svg>
  )
}

export function CrescentMoon({
  fill = '#F3EADA', stroke = '#C89B3C', dust = '#C89B3C', dur = 20,
  className = '', style,
}) {
  return (
    <motion.svg
      {...drift(dur, 3, 4, 2)}
      viewBox="0 0 70 70" width="70" height="70"
      className={className} style={style} aria-hidden
    >
      <path
        d="M48 12 A 26 26 0 1 0 48 58 A 22 22 0 1 1 48 12 Z"
        fill={fill} stroke={stroke} strokeWidth="1.4"
      />
      <circle cx="12" cy="14" r="1.2" fill={dust} />
      <circle cx="6" cy="40" r="1" fill={dust} />
      <circle cx="20" cy="60" r="1.3" fill={dust} />
    </motion.svg>
  )
}

export function StarScatter({ fill = '#C89B3C', dur = 18, className = '', style }) {
  const stars = [
    { x: 10, y: 20, s: 1.2 }, { x: 44, y: 8, s: 0.8 },
    { x: 72, y: 30, s: 1 }, { x: 28, y: 52, s: 0.7 },
    { x: 60, y: 62, s: 1.1 },
  ]
  return (
    <motion.svg
      {...drift(dur, 2, 2, 1)}
      viewBox="0 0 90 80" width="90" height="80"
      className={className} style={style} aria-hidden
    >
      {stars.map((st, i) => (
        <g key={i} transform={`translate(${st.x} ${st.y}) scale(${st.s})`}>
          <path
            d="M0 -5 L 1.3 -1.3 L 5 0 L 1.3 1.3 L 0 5 L -1.3 1.3 L -5 0 L -1.3 -1.3 Z"
            fill={fill} opacity="0.85"
          />
        </g>
      ))}
    </motion.svg>
  )
}

export function Heart({
  stroke = '#6B3B5E', stitch = '#CBB4D4', dur = 13,
  className = '', style,
}) {
  return (
    <motion.svg
      {...drift(dur, 3, 4, 5)}
      viewBox="0 0 60 54" width="60" height="54"
      className={className} style={style} aria-hidden
    >
      <path
        d="M30 48 C 10 34, 4 22, 10 12 C 16 4, 26 6, 30 14 C 34 6, 44 4, 50 12 C 56 22, 50 34, 30 48 Z"
        fill="none" stroke={stroke} strokeWidth="1.3"
      />
      <path
        d="M20 16 C 22 14, 25 14, 26 16"
        fill="none" stroke={stitch} strokeWidth="1" strokeLinecap="round"
      />
    </motion.svg>
  )
}

export function Ribbon({ stroke = '#6B3B5E', accent = '#CBB4D4', dur = 16, className = '', style }) {
  return (
    <motion.svg
      {...drift(dur, 5, 3, 3)}
      viewBox="0 0 140 60" width="140" height="60"
      className={className} style={style} aria-hidden
    >
      <path d="M20 30 C 40 10, 60 50, 80 30 C 100 10, 120 50, 140 30"
        stroke={stroke} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M22 34 C 42 14, 62 54, 82 34 C 102 14, 122 54, 142 34"
        stroke={accent} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
    </motion.svg>
  )
}
