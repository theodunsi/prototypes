import { motion } from 'framer-motion'

// Hand-drawn-feeling SVGs. Every shape uses palette tokens. Nothing is symmetric.
// These drift subtly — transform + opacity only, paused by prefers-reduced-motion via CSS.

const drift = (dur, x = 6, y = 4, r = 2) => ({
  animate: { x: [0, x, -x / 2, 0], y: [0, -y, y / 2, 0], rotate: [0, r, -r / 2, 0] },
  transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' },
})

function LavenderSprig({ className = '', style }) {
  return (
    <motion.svg
      {...drift(14, 4, 6, 3)}
      viewBox="0 0 60 120" width="60" height="120"
      className={className} style={style} aria-hidden
    >
      <path d="M30 118 C 28 90, 32 70, 30 40" stroke="#6B3B5E" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M30 78 C 22 74, 18 70, 16 62" stroke="#6B3B5E" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M30 62 C 38 58, 42 54, 44 46" stroke="#6B3B5E" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M16 62 C 18 58, 22 56, 24 58" fill="#CBB4D4" opacity="0.9" />
      <path d="M44 46 C 42 42, 38 40, 36 42" fill="#CBB4D4" opacity="0.9" />
      {[4, 10, 16, 22, 28, 34].map((t, i) => (
        <g key={i} transform={`translate(${28 + (i % 2 === 0 ? -3 : 3)} ${t + 4})`}>
          <ellipse cx="0" cy="0" rx="4" ry="5.5" fill="#6B3B5E" opacity={0.75 + i * 0.03} />
          <ellipse cx="-1" cy="-1" rx="1.4" ry="2" fill="#CBB4D4" opacity="0.7" />
        </g>
      ))}
    </motion.svg>
  )
}

function PressedDaisy({ className = '', style }) {
  return (
    <motion.svg
      {...drift(17, 5, 5, 4)}
      viewBox="0 0 80 80" width="80" height="80"
      className={className} style={style} aria-hidden
    >
      <g transform="translate(40 40)">
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <ellipse
            key={i}
            cx="0" cy="-18" rx="7" ry="13"
            fill="#F3EADA"
            stroke="#B87A6E" strokeWidth="1.1"
            transform={`rotate(${deg + (i % 2 ? 4 : -4)})`}
            opacity="0.95"
          />
        ))}
        <circle r="7" fill="#C89B3C" />
        <circle r="7" fill="none" stroke="#1C1320" strokeWidth="0.6" opacity="0.3" />
      </g>
    </motion.svg>
  )
}

function Butterfly({ className = '', style }) {
  return (
    <motion.svg
      {...drift(11, 10, 8, 6)}
      viewBox="0 0 90 70" width="90" height="70"
      className={className} style={style} aria-hidden
    >
      <path d="M45 35 C 20 10, 8 18, 12 34 C 10 50, 28 54, 45 38"
        fill="#CBB4D4" stroke="#6B3B5E" strokeWidth="1.1" opacity="0.9" />
      <path d="M45 35 C 70 10, 82 18, 78 34 C 80 50, 62 54, 45 38"
        fill="#CBB4D4" stroke="#6B3B5E" strokeWidth="1.1" opacity="0.9" />
      <circle cx="24" cy="26" r="2" fill="#6B3B5E" opacity="0.6" />
      <circle cx="66" cy="26" r="2" fill="#6B3B5E" opacity="0.6" />
      <path d="M45 18 L 45 50" stroke="#3B2A52" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M42 18 C 38 12, 38 8, 42 6 M 48 18 C 52 12, 52 8, 48 6"
        stroke="#3B2A52" strokeWidth="1" fill="none" strokeLinecap="round" />
    </motion.svg>
  )
}

function CrescentMoon({ className = '', style }) {
  return (
    <motion.svg
      {...drift(20, 3, 4, 2)}
      viewBox="0 0 70 70" width="70" height="70"
      className={className} style={style} aria-hidden
    >
      <path
        d="M48 12 A 26 26 0 1 0 48 58 A 22 22 0 1 1 48 12 Z"
        fill="#F3EADA" stroke="#C89B3C" strokeWidth="1.4"
      />
      <circle cx="12" cy="14" r="1.2" fill="#C89B3C" />
      <circle cx="6" cy="40" r="1" fill="#C89B3C" />
      <circle cx="20" cy="60" r="1.3" fill="#C89B3C" />
    </motion.svg>
  )
}

function Ribbon({ className = '', style }) {
  return (
    <motion.svg
      {...drift(16, 5, 3, 3)}
      viewBox="0 0 140 60" width="140" height="60"
      className={className} style={style} aria-hidden
    >
      <path
        d="M20 30 C 40 10, 60 50, 80 30 C 100 10, 120 50, 140 30"
        stroke="#6B3B5E" strokeWidth="2" fill="none" strokeLinecap="round"
      />
      <path
        d="M22 34 C 42 14, 62 54, 82 34 C 102 14, 122 54, 142 34"
        stroke="#CBB4D4" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"
      />
    </motion.svg>
  )
}

function StarScatter({ className = '', style }) {
  const stars = [
    { x: 10, y: 20, s: 1.2 }, { x: 44, y: 8, s: 0.8 },
    { x: 72, y: 30, s: 1 }, { x: 28, y: 52, s: 0.7 },
    { x: 60, y: 62, s: 1.1 },
  ]
  return (
    <motion.svg
      {...drift(18, 2, 2, 1)}
      viewBox="0 0 90 80" width="90" height="80"
      className={className} style={style} aria-hidden
    >
      {stars.map((st, i) => (
        <g key={i} transform={`translate(${st.x} ${st.y}) scale(${st.s})`}>
          <path
            d="M0 -5 L 1.3 -1.3 L 5 0 L 1.3 1.3 L 0 5 L -1.3 1.3 L -5 0 L -1.3 -1.3 Z"
            fill="#C89B3C" opacity="0.85"
          />
        </g>
      ))}
    </motion.svg>
  )
}

function TapeStrip({ className = '', style, label }) {
  return (
    <div
      className={`pointer-events-none select-none px-3 py-1.5 ${className}`}
      style={{
        background: 'rgba(200, 155, 60, 0.22)',
        border: '1px dashed rgba(107, 59, 94, 0.25)',
        ...style,
      }}
      aria-hidden
    >
      <span className="font-hand text-[0.7rem] text-mulberry">{label}</span>
    </div>
  )
}

function MiniPolaroid({ src, alt, caption, className = '', style, dur = 19 }) {
  return (
    <motion.div
      {...drift(dur, 4, 4, 2)}
      className={`pointer-events-none relative ${className}`}
      style={{
        background: '#FAF4E7',
        padding: '6px 6px 22px 6px',
        boxShadow: '0 1px 2px rgba(28,19,32,0.08), 0 12px 28px -14px rgba(28,19,32,0.28)',
        ...style,
      }}
      aria-hidden
    >
      {/* tape strip pinning the photo */}
      <span
        className="absolute -top-2 left-1/2 -translate-x-1/2"
        style={{
          width: 26, height: 10,
          background: 'rgba(200, 155, 60, 0.32)',
          border: '1px dashed rgba(107, 59, 94, 0.35)',
          transform: 'translateX(-50%) rotate(-6deg)',
        }}
        aria-hidden
      />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width="100"
        height="120"
        style={{
          display: 'block',
          width: '100px',
          height: '120px',
          objectFit: 'cover',
          filter: 'saturate(0.92) contrast(0.97)',
        }}
      />
      <span
        className="absolute left-0 right-0 text-center font-hand text-[0.62rem] text-mulberry"
        style={{ bottom: 4 }}
      >
        {caption}
      </span>
    </motion.div>
  )
}

function Heart({ className = '', style }) {
  return (
    <motion.svg
      {...drift(13, 3, 4, 5)}
      viewBox="0 0 60 54" width="60" height="54"
      className={className} style={style} aria-hidden
    >
      <path
        d="M30 48 C 10 34, 4 22, 10 12 C 16 4, 26 6, 30 14 C 34 6, 44 4, 50 12 C 56 22, 50 34, 30 48 Z"
        fill="none" stroke="#6B3B5E" strokeWidth="1.3"
      />
      <path
        d="M20 16 C 22 14, 25 14, 26 16"
        fill="none" stroke="#CBB4D4" strokeWidth="1" strokeLinecap="round"
      />
    </motion.svg>
  )
}

export default function Ornaments() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      {/* Corners and edges — deliberately asymmetric */}
      <LavenderSprig
        className="absolute"
        style={{ top: '6%', left: '-8px', transform: 'rotate(-14deg)', opacity: 0.85 }}
      />
      <PressedDaisy
        className="absolute hidden sm:block"
        style={{ top: '8%', right: '6%', transform: 'rotate(12deg)', opacity: 0.9 }}
      />
      <Butterfly
        className="absolute"
        style={{ top: '22%', right: '-10px', opacity: 0.75 }}
      />
      <CrescentMoon
        className="absolute hidden sm:block"
        style={{ top: '14%', left: '10%', opacity: 0.9 }}
      />
      <StarScatter
        className="absolute"
        style={{ top: '40%', left: '4%', opacity: 0.8 }}
      />
      <Heart
        className="absolute"
        style={{ bottom: '18%', right: '8%', transform: 'rotate(-8deg)', opacity: 0.7 }}
      />
      <PressedDaisy
        className="absolute"
        style={{ bottom: '6%', left: '10%', transform: 'rotate(-18deg) scale(0.8)', opacity: 0.8 }}
      />
      <Ribbon
        className="absolute hidden md:block"
        style={{ bottom: '10%', right: '-20px', opacity: 0.55 }}
      />
      <LavenderSprig
        className="absolute hidden md:block"
        style={{ bottom: '2%', right: '30%', transform: 'rotate(12deg) scale(0.7)', opacity: 0.55 }}
      />

      {/* Tape strips with tiny handwritten notes — anchors the scrapbook feeling */}
      <TapeStrip
        className="absolute hidden sm:block"
        style={{ top: '3%', left: '36%', transform: 'rotate(-4deg)' }}
        label="for tom"
      />
      <TapeStrip
        className="absolute hidden sm:block"
        style={{ bottom: '4%', left: '42%', transform: 'rotate(3deg)' }}
        label="04·23·26"
      />

      {/* Three little polaroids of her — peeking like photos pinned to the page */}
      <div
        className="absolute hidden sm:block"
        style={{ top: '14%', right: '14%', transform: 'rotate(8deg)' }}
      >
        <MiniPolaroid
          src="/assets/celebrant/tomiwa-1.JPG"
          alt="Tomiwa"
          caption="my girl"
          dur={21}
        />
      </div>
      <div
        className="absolute"
        style={{ top: '46%', left: '17%', transform: 'rotate(-7deg)' }}
      >
        <MiniPolaroid
          src="/assets/celebrant/9ed59943-040c-4d43-b0a6-feb00487acb4.JPG"
          alt="Tomiwa"
          caption="her"
          dur={17}
        />
      </div>
      <div
        className="absolute hidden md:block"
        style={{ bottom: '14%', right: '22%', transform: 'rotate(-4deg)' }}
      >
        <MiniPolaroid
          src="/assets/celebrant/tomiwa-with-food.JPG"
          alt="Tomiwa"
          caption="favourite human"
          dur={23}
        />
      </div>
    </div>
  )
}
