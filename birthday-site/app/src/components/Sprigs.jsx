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

export function Handbag({ body = '#6B3B5E', strap = '#3B2A52', buckle = '#C89B3C', dur = 15, className = '', style }) {
  return (
    <motion.svg {...drift(dur, 3, 4, 3)} viewBox="0 0 60 68" width="60" height="68" className={className} style={style} aria-hidden>
      <path d="M16 22 C 16 12, 22 6, 30 6 C 38 6, 44 12, 44 22" stroke={strap} strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="8" y="22" width="44" height="38" rx="3" fill={body} />
      <rect x="8" y="22" width="44" height="38" rx="3" fill="none" stroke={strap} strokeWidth="0.8" opacity="0.4" />
      <circle cx="30" cy="33" r="2.4" fill={buckle} />
      <path d="M28 33 L 32 33" stroke={body} strokeWidth="0.8" />
    </motion.svg>
  )
}

export function Heels({ body = '#6B3B5E', sole = '#3B2A52', accent = '#C89B3C', dur = 17, className = '', style }) {
  return (
    <motion.svg {...drift(dur, 3, 3, 4)} viewBox="0 0 80 60" width="80" height="60" className={className} style={style} aria-hidden>
      <path d="M8 42 C 14 38, 26 32, 36 26 C 46 20, 56 16, 66 14 C 72 13, 74 15, 72 20 L 68 34 C 66 40, 62 44, 56 46 L 16 52 C 10 52, 6 48, 8 42 Z"
        fill={body} />
      <path d="M56 46 L 56 58 L 62 58 L 60 48 Z" fill={sole} />
      <circle cx="66" cy="14" r="2" fill={accent} />
    </motion.svg>
  )
}

export function Lipstick({ tube = '#3B2A52', cap = '#6B3B5E', tip = '#B87A6E', dur = 13, className = '', style }) {
  return (
    <motion.svg {...drift(dur, 2, 4, 4)} viewBox="0 0 28 70" width="28" height="70" className={className} style={style} aria-hidden>
      <rect x="8" y="30" width="12" height="36" rx="1.5" fill={tube} />
      <rect x="7" y="26" width="14" height="8" rx="1" fill={cap} />
      <path d="M8 26 L 10 12 L 18 10 L 20 26 Z" fill={tip} />
      <path d="M14 6 L 14 26" stroke={tip} strokeWidth="0.5" opacity="0.6" />
    </motion.svg>
  )
}

export function PerfumeBottle({ body = '#CBB4D4', edge = '#6B3B5E', cap = '#C89B3C', dur = 19, className = '', style }) {
  return (
    <motion.svg {...drift(dur, 2, 3, 2)} viewBox="0 0 50 70" width="50" height="70" className={className} style={style} aria-hidden>
      <rect x="20" y="8" width="10" height="8" rx="1" fill={cap} />
      <rect x="22" y="16" width="6" height="6" fill={edge} />
      <path d="M10 22 L 40 22 L 42 60 Q 42 66, 36 66 L 14 66 Q 8 66, 8 60 Z" fill={body} stroke={edge} strokeWidth="1.1" opacity="0.95" />
      <ellipse cx="18" cy="32" rx="3" ry="6" fill="#FFF" opacity="0.4" />
    </motion.svg>
  )
}

export function Crown({ fill = '#C89B3C', stroke = '#6B3B5E', dur = 16, className = '', style }) {
  return (
    <motion.svg {...drift(dur, 3, 3, 3)} viewBox="0 0 80 50" width="80" height="50" className={className} style={style} aria-hidden>
      <path d="M8 42 L 14 16 L 26 30 L 40 10 L 54 30 L 66 16 L 72 42 Z" fill={fill} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="8" y="42" width="64" height="4" fill={fill} stroke={stroke} strokeWidth="1.2" />
      <circle cx="14" cy="16" r="2.5" fill="#CBB4D4" stroke={stroke} strokeWidth="0.8" />
      <circle cx="40" cy="10" r="3" fill="#B87A6E" stroke={stroke} strokeWidth="0.8" />
      <circle cx="66" cy="16" r="2.5" fill="#CBB4D4" stroke={stroke} strokeWidth="0.8" />
    </motion.svg>
  )
}

export function Bow({ fill = '#B87A6E', stroke = '#6B3B5E', dur = 14, className = '', style }) {
  return (
    <motion.svg {...drift(dur, 3, 3, 4)} viewBox="0 0 70 50" width="70" height="50" className={className} style={style} aria-hidden>
      <path d="M35 25 C 20 10, 6 12, 8 25 C 6 38, 20 40, 35 25 Z" fill={fill} stroke={stroke} strokeWidth="1.1" />
      <path d="M35 25 C 50 10, 64 12, 62 25 C 64 38, 50 40, 35 25 Z" fill={fill} stroke={stroke} strokeWidth="1.1" />
      <ellipse cx="35" cy="25" rx="4" ry="5" fill={stroke} />
      <path d="M33 30 L 28 44 M 37 30 L 42 44" stroke={stroke} strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </motion.svg>
  )
}

export function DiamondRing({ band = '#C89B3C', stone = '#CBB4D4', edge = '#6B3B5E', dur = 18, className = '', style }) {
  return (
    <motion.svg {...drift(dur, 2, 2, 3)} viewBox="0 0 60 60" width="60" height="60" className={className} style={style} aria-hidden>
      <ellipse cx="30" cy="42" rx="16" ry="5.5" fill="none" stroke={band} strokeWidth="3" />
      <path d="M22 22 L 30 12 L 38 22 L 34 30 L 30 34 L 26 30 Z" fill={stone} stroke={edge} strokeWidth="1" />
      <path d="M22 22 L 30 34 M 38 22 L 30 34 M 22 22 L 38 22" stroke={edge} strokeWidth="0.6" opacity="0.5" />
    </motion.svg>
  )
}

export function Cake({
  base = '#6B3B5E', mid = '#B87A6E', top = '#CBB4D4',
  candle = '#C89B3C', flame = '#B87A6E', edge = '#3B2A52',
  dur = 16, className = '', style,
}) {
  return (
    <motion.svg {...drift(dur, 3, 4, 2)} viewBox="0 0 80 90" width="80" height="90" className={className} style={style} aria-hidden>
      {/* plate */}
      <ellipse cx="40" cy="82" rx="30" ry="3" fill={edge} opacity="0.4" />
      {/* bottom tier */}
      <rect x="8" y="58" width="64" height="22" rx="2" fill={base} stroke={edge} strokeWidth="0.8" />
      <path d="M10 62 Q 18 58, 26 62 T 42 62 T 58 62 T 72 62" stroke={top} strokeWidth="1.4" fill="none" opacity="0.6" />
      {/* middle tier */}
      <rect x="18" y="40" width="44" height="20" rx="2" fill={mid} stroke={edge} strokeWidth="0.8" />
      <path d="M20 44 Q 26 40, 32 44 T 44 44 T 56 44 T 62 44" stroke={top} strokeWidth="1.2" fill="none" opacity="0.5" />
      {/* top tier */}
      <rect x="28" y="26" width="24" height="16" rx="1.5" fill={top} stroke={edge} strokeWidth="0.8" />
      {/* candles */}
      <rect x="32" y="16" width="2.5" height="12" fill={candle} />
      <rect x="39" y="14" width="2.5" height="14" fill={candle} />
      <rect x="46" y="16" width="2.5" height="12" fill={candle} />
      {/* flames */}
      <path d="M33 16 Q 31 12, 33 8 Q 35 12, 33 16 Z" fill={flame} />
      <path d="M40 14 Q 38 10, 40 6 Q 42 10, 40 14 Z" fill={flame} />
      <path d="M47 16 Q 45 12, 47 8 Q 49 12, 47 16 Z" fill={flame} />
    </motion.svg>
  )
}

export function Balloon({
  body = '#6B3B5E', highlight = '#CBB4D4', string = '#3B2A52',
  dur = 15, className = '', style,
}) {
  return (
    <motion.svg {...drift(dur, 4, 6, 5)} viewBox="0 0 60 110" width="60" height="110" className={className} style={style} aria-hidden>
      <ellipse cx="30" cy="38" rx="22" ry="28" fill={body} />
      <ellipse cx="22" cy="28" rx="4" ry="6" fill={highlight} opacity="0.45" />
      <path d="M28 65 L 32 65 L 34 70 L 26 70 Z" fill={body} stroke={string} strokeWidth="0.6" />
      <path d="M30 70 Q 26 82, 32 92 Q 28 100, 30 108" stroke={string} strokeWidth="1" fill="none" strokeLinecap="round" />
    </motion.svg>
  )
}

export function PartyPopper({
  cone = '#6B3B5E', cord = '#3B2A52',
  a = '#C89B3C', b = '#CBB4D4', c = '#B87A6E',
  dur = 13, className = '', style,
}) {
  return (
    <motion.svg {...drift(dur, 3, 4, 4)} viewBox="0 0 90 90" width="90" height="90" className={className} style={style} aria-hidden>
      {/* cone */}
      <path d="M12 80 L 38 60 L 52 74 L 26 84 Z" fill={cone} stroke={cord} strokeWidth="1" />
      {/* streamers / confetti */}
      <path d="M42 58 C 48 44, 58 38, 68 34" stroke={a} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M46 56 C 54 48, 64 48, 74 50" stroke={b} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M44 52 C 52 36, 58 28, 58 18" stroke={c} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* confetti bits */}
      <circle cx="60" cy="20" r="2" fill={a} />
      <rect x="72" y="30" width="3" height="3" fill={b} transform="rotate(20 73 31)" />
      <circle cx="80" cy="42" r="1.8" fill={c} />
      <rect x="66" y="46" width="3" height="3" fill={a} transform="rotate(-15 67 47)" />
      <circle cx="54" cy="26" r="1.5" fill={b} />
      <rect x="78" y="52" width="2.5" height="2.5" fill={c} transform="rotate(35 79 53)" />
    </motion.svg>
  )
}

export function GiftBox({
  box = '#3B2A52', ribbon = '#C89B3C', accent = '#CBB4D4',
  dur = 17, className = '', style,
}) {
  return (
    <motion.svg {...drift(dur, 2, 3, 2)} viewBox="0 0 70 70" width="70" height="70" className={className} style={style} aria-hidden>
      <rect x="8" y="26" width="54" height="38" rx="1" fill={box} />
      <rect x="31" y="26" width="8" height="38" fill={ribbon} />
      <rect x="8" y="41" width="54" height="6" fill={ribbon} />
      <path d="M35 26 C 28 18, 20 18, 22 26 M 35 26 C 42 18, 50 18, 48 26" stroke={ribbon} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="31" cy="22" rx="6" ry="4" fill={ribbon} />
      <ellipse cx="39" cy="22" rx="6" ry="4" fill={ribbon} />
      <circle cx="35" cy="22" r="2" fill={accent} />
    </motion.svg>
  )
}

export function Candle({
  wax = '#CBB4D4', wick = '#3B2A52', flame = '#C89B3C',
  dur = 14, className = '', style,
}) {
  return (
    <motion.svg {...drift(dur, 2, 3, 3)} viewBox="0 0 30 80" width="30" height="80" className={className} style={style} aria-hidden>
      <rect x="10" y="28" width="10" height="46" rx="1" fill={wax} stroke="#6B3B5E" strokeWidth="0.8" />
      <ellipse cx="15" cy="28" rx="5" ry="1.4" fill={wax} stroke="#6B3B5E" strokeWidth="0.8" />
      <rect x="14" y="20" width="2" height="8" fill={wick} />
      <path d="M15 20 Q 11 12, 15 4 Q 19 12, 15 20 Z" fill={flame} />
      <path d="M15 18 Q 13 14, 15 8 Q 17 14, 15 18 Z" fill="#B87A6E" opacity="0.8" />
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
