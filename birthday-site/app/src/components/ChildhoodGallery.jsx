import { motion } from 'framer-motion'
import {
  LavenderSprig, PressedDaisy, StarScatter, Heart, Butterfly,
  Bow, Handbag, Lipstick, Crown,
} from './Sprigs.jsx'

const ease = [0.16, 1, 0.3, 1]

// 9 photos (two removed from the folder). Tight 3-column scatter — no dead space
// to the right of any card because each card's column is sized to the photo.
const PHOTOS = [
  { src: '/assets/baby-pictures/95392383-9E04-485C-A08F-2E347DAA78E6.JPG', col: 'left',  size: 'lg', tilt: -4, caption: 'you, before anyone knew.' },
  { src: '/assets/baby-pictures/01.JPG',                                    col: 'right', size: 'md', tilt: 5,  caption: null },
  { src: '/assets/baby-pictures/04.JPG',                                    col: 'mid',   size: 'sm', tilt: -3, caption: null },
  { src: '/assets/baby-pictures/5EC39009-714F-4E64-BDAA-71658762215B.JPG',  col: 'left',  size: 'md', tilt: 3,  caption: 'already her.' },
  { src: '/assets/baby-pictures/07.JPG',                                    col: 'right', size: 'lg', tilt: -2, caption: null },
  { src: '/assets/baby-pictures/03.JPG',                                    col: 'mid',   size: 'sm', tilt: 4,  caption: 'little queen.' },
  { src: '/assets/baby-pictures/02.JPG',                                    col: 'left',  size: 'sm', tilt: -3, caption: null },
  { src: '/assets/baby-pictures/06.JPG',                                    col: 'mid',   size: 'md', tilt: 2,  caption: null },
  { src: '/assets/baby-pictures/05.JPG',                                    col: 'right', size: 'md', tilt: -5, caption: null },
]

const sizeClass = {
  sm: 'h-[200px] w-[155px] sm:h-[230px] sm:w-[180px] md:h-[260px] md:w-[200px]',
  md: 'h-[240px] w-[185px] sm:h-[300px] sm:w-[230px] md:h-[340px] md:w-[260px]',
  lg: 'h-[280px] w-[215px] sm:h-[360px] sm:w-[275px] md:h-[420px] md:w-[320px]',
}

function Frame({ src, tilt, caption, size }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, rotate: tilt > 0 ? tilt + 4 : tilt - 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -5, rotate: tilt * 0.4, zIndex: 10, transition: { duration: 0.22, ease } }}
      transition={{ duration: 0.85, ease }}
      className="relative w-fit"
    >
      <div
        className="relative"
        style={{
          background: '#FAF4E7',
          padding: '10px 10px 36px 10px',
          boxShadow: '0 3px 6px rgba(28,19,32,0.08), 0 26px 56px -24px rgba(28,19,32,0.38)',
        }}
      >
        <span
          aria-hidden className="absolute -top-3 left-1/2"
          style={{
            width: 80, height: 18,
            background: 'rgba(200, 155, 60, 0.4)',
            border: '1px dashed rgba(107, 59, 94, 0.5)',
            transform: 'translateX(-50%) rotate(-4deg)',
          }}
        />
        <img
          src={src} alt="" loading="lazy" decoding="async"
          width="400" height="520"
          className={`block object-cover ${sizeClass[size]}`}
          style={{ objectPosition: 'center top', filter: 'saturate(0.92) contrast(0.97)' }}
        />
        {caption && (
          <span
            className="absolute bottom-3 left-0 right-0 text-center font-hand text-mulberry"
            style={{ fontSize: '0.9rem' }}
          >
            {caption}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function ChildhoodGallery() {
  const leftCol = PHOTOS.filter((p) => p.col === 'left')
  const midCol = PHOTOS.filter((p) => p.col === 'mid')
  const rightCol = PHOTOS.filter((p) => p.col === 'right')

  return (
    <section
      className="relative w-full overflow-hidden px-4 py-28 sm:px-8 sm:py-36"
      style={{ background: 'linear-gradient(180deg, #F3EADA 0%, #EFE0D5 100%)' }}
    >
      {/* Ornaments scattered all over the page, not just at the edges */}
      <PressedDaisy className="pointer-events-none absolute" style={{ top: '6%', left: '5%', opacity: 0.7, transform: 'rotate(-18deg)' }} />
      <Crown       className="pointer-events-none absolute hidden sm:block" style={{ top: '4%', left: '48%', opacity: 0.6, transform: 'rotate(-6deg)' }} />
      <LavenderSprig className="pointer-events-none absolute hidden md:block" style={{ top: '10%', right: '4%', opacity: 0.75, transform: 'rotate(12deg)' }} />
      <Bow         className="pointer-events-none absolute" style={{ top: '22%', left: '42%', opacity: 0.6, transform: 'rotate(6deg)' }} />
      <StarScatter className="pointer-events-none absolute" style={{ top: '32%', left: '3%', opacity: 0.6 }} />
      <Butterfly   className="pointer-events-none absolute hidden sm:block" style={{ top: '36%', right: '7%', opacity: 0.6 }} />
      <Handbag     className="pointer-events-none absolute" style={{ top: '50%', left: '46%', opacity: 0.55, transform: 'rotate(-8deg)' }} />
      <Heart       className="pointer-events-none absolute" style={{ top: '62%', left: '4%', opacity: 0.6, transform: 'rotate(-10deg)' }} />
      <Lipstick    className="pointer-events-none absolute" style={{ top: '70%', right: '46%', opacity: 0.6, transform: 'rotate(14deg)' }} />
      <PressedDaisy className="pointer-events-none absolute hidden sm:block" style={{ top: '78%', right: '5%', opacity: 0.6, transform: 'rotate(20deg) scale(0.85)' }} />
      <StarScatter className="pointer-events-none absolute" style={{ bottom: '10%', left: '38%', opacity: 0.55 }} />
      <Heart       className="pointer-events-none absolute" style={{ bottom: '6%', right: '10%', opacity: 0.55, transform: 'rotate(10deg) scale(0.8)' }} />

      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-[1] mx-auto mb-16 max-w-3xl text-center"
      >
        <p className="font-body text-micro uppercase tracking-[0.3em] text-ash">growing up</p>
        <h2 className="mt-5 font-display italic font-light leading-[1.02] text-iris"
          style={{ fontSize: 'clamp(2.25rem, 6.5vw, 4.25rem)' }}>
          you, before.
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-quiet italic text-ink/70">
          none of these are in order — the heart doesn’t remember that way.
        </p>
      </motion.header>

      {/* desktop: 3-column grid, each column hugs its photo widths (no dead space) */}
      <div className="relative z-[1] mx-auto hidden max-w-6xl md:flex md:justify-center md:gap-10 lg:gap-16">
        <div className="flex flex-col items-center gap-12 pt-10">
          {leftCol.map((p, i) => <Frame key={`l${i}`} {...p} />)}
        </div>
        <div className="flex flex-col items-center gap-12">
          {midCol.map((p, i) => <Frame key={`m${i}`} {...p} />)}
        </div>
        <div className="flex flex-col items-center gap-12 pt-24">
          {rightCol.map((p, i) => <Frame key={`r${i}`} {...p} />)}
        </div>
      </div>

      {/* mobile: compact alternating stagger */}
      <div className="relative z-[1] mx-auto flex max-w-md flex-col gap-8 md:hidden">
        {PHOTOS.map((p, i) => (
          <div key={i} className={i % 2 === 0 ? 'self-start' : 'self-end'}>
            <Frame {...p} />
          </div>
        ))}
      </div>
    </section>
  )
}
