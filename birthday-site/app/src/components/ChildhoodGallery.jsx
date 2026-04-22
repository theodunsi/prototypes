import { motion } from 'framer-motion'
import { LavenderSprig, PressedDaisy, StarScatter, Heart, Butterfly } from './Sprigs.jsx'

const ease = [0.16, 1, 0.3, 1]

// Tight, overlapping cluster. Not chronological, not one-photo-per-screen.
// Position + rotation tuned by hand; all photos top-aligned so heads aren't cut.
const PHOTOS = [
  // First cluster — three photos pinned tight
  { src: '/assets/baby-pictures/95392383-9E04-485C-A08F-2E347DAA78E6.JPG', col: 'left',   row: 1, size: 'lg', tilt: -4, z: 2, caption: 'you, before anyone knew.' },
  { src: '/assets/baby-pictures/01.JPG',                                    col: 'right',  row: 1, size: 'md', tilt: 5,  z: 3, caption: null },
  { src: '/assets/baby-pictures/04.JPG',                                    col: 'mid',    row: 2, size: 'sm', tilt: -3, z: 1, caption: null },

  // second cluster
  { src: '/assets/baby-pictures/5EC39009-714F-4E64-BDAA-71658762215B.JPG',  col: 'left',   row: 3, size: 'md', tilt: 3,  z: 1, caption: 'already her.' },
  { src: '/assets/baby-pictures/07.JPG',                                    col: 'right',  row: 3, size: 'lg', tilt: -2, z: 2, caption: null },
  { src: '/assets/baby-pictures/03.JPG',                                    col: 'mid',    row: 4, size: 'sm', tilt: 4,  z: 3, caption: 'little queen.' },

  // third cluster
  { src: '/assets/baby-pictures/601901B2-44FF-4C65-8FDC-0C994A791504.JPG',  col: 'left',   row: 5, size: 'sm', tilt: -3, z: 2, caption: null },
  { src: '/assets/baby-pictures/02.JPG',                                    col: 'mid',    row: 5, size: 'md', tilt: 2,  z: 3, caption: null },
  { src: '/assets/baby-pictures/06.JPG',                                    col: 'right',  row: 6, size: 'md', tilt: -4, z: 1, caption: null },

  // closing cluster
  { src: '/assets/baby-pictures/08.JPG',                                    col: 'left',   row: 7, size: 'lg', tilt: 3,  z: 1, caption: 'before i was lucky.' },
  { src: '/assets/baby-pictures/05.JPG',                                    col: 'right',  row: 7, size: 'sm', tilt: -5, z: 2, caption: null },
]

const sizeClass = {
  sm: 'h-[180px] w-[140px] sm:h-[220px] sm:w-[170px] md:h-[240px] md:w-[190px]',
  md: 'h-[220px] w-[170px] sm:h-[280px] sm:w-[220px] md:h-[320px] md:w-[250px]',
  lg: 'h-[260px] w-[200px] sm:h-[340px] sm:w-[260px] md:h-[400px] md:w-[310px]',
}

function Frame({ src, tilt, caption, size, z }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, rotate: tilt > 0 ? tilt + 4 : tilt - 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease }}
      whileHover={{ y: -5, rotate: tilt * 0.4, zIndex: 10, transition: { duration: 0.22, ease } }}
      style={{ zIndex: z }}
      className="relative"
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
            width: 58, height: 14,
            background: 'rgba(200, 155, 60, 0.35)',
            border: '1px dashed rgba(107, 59, 94, 0.4)',
            transform: 'translateX(-50%) rotate(-5deg)',
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
      {/* ornaments */}
      <PressedDaisy className="pointer-events-none absolute" style={{ top: '8%', left: '4%', opacity: 0.7, transform: 'rotate(-18deg)' }} />
      <LavenderSprig className="pointer-events-none absolute hidden md:block" style={{ top: '24%', right: '2%', opacity: 0.75, transform: 'rotate(12deg)' }} />
      <StarScatter className="pointer-events-none absolute" style={{ top: '52%', left: '6%', opacity: 0.6 }} />
      <Butterfly className="pointer-events-none absolute hidden sm:block" style={{ top: '62%', right: '8%', opacity: 0.6 }} />
      <Heart className="pointer-events-none absolute" style={{ bottom: '14%', left: '12%', opacity: 0.6 }} />
      <PressedDaisy className="pointer-events-none absolute" style={{ bottom: '6%', right: '6%', opacity: 0.6, transform: 'rotate(18deg) scale(0.8)' }} />

      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto mb-16 max-w-3xl text-center"
      >
        <p className="font-body text-micro uppercase tracking-[0.3em] text-ash">childhood, unsorted</p>
        <h2 className="mt-5 font-display italic font-light leading-[1.02] text-iris"
          style={{ fontSize: 'clamp(2.25rem, 6.5vw, 4.25rem)' }}>
          you, before.
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-quiet italic text-ink/70">
          none of these are in order — the heart doesn’t remember that way.
        </p>
      </motion.header>

      {/* desktop: 3-column asymmetric scatter */}
      <div className="mx-auto hidden max-w-6xl md:block">
        <div className="grid grid-cols-3 items-start gap-8 lg:gap-14">
          <div className="flex flex-col gap-10 pt-8">
            {leftCol.map((p, i) => <Frame key={`l${i}`} {...p} />)}
          </div>
          <div className="flex flex-col gap-10">
            {midCol.map((p, i) => <Frame key={`m${i}`} {...p} />)}
          </div>
          <div className="flex flex-col gap-10 pt-20">
            {rightCol.map((p, i) => <Frame key={`r${i}`} {...p} />)}
          </div>
        </div>
      </div>

      {/* mobile: compact alternating scatter */}
      <div className="mx-auto flex max-w-md flex-col gap-8 md:hidden">
        {PHOTOS.map((p, i) => (
          <div key={i} className={i % 2 === 0 ? 'self-start' : 'self-end'}>
            <Frame {...p} />
          </div>
        ))}
      </div>
    </section>
  )
}
