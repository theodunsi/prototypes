import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

// Not chronological. Shuffled once, kept stable so the page reads the same
// way each visit. Captions used sparingly — quiet, in my voice.
const PHOTOS = [
  { src: '/assets/baby-pictures/95392383-9E04-485C-A08F-2E347DAA78E6.JPG', size: 'lg', align: 'center', tilt: -2, caption: null },
  { src: '/assets/baby-pictures/01.JPG',                                    size: 'md', align: 'left',   tilt: 3,  caption: 'you, before anyone knew.' },
  { src: '/assets/baby-pictures/04.JPG',                                    size: 'sm', align: 'right',  tilt: -4, caption: null },
  { src: '/assets/baby-pictures/5EC39009-714F-4E64-BDAA-71658762215B.JPG',  size: 'md', align: 'center', tilt: 2,  caption: null },
  { src: '/assets/baby-pictures/07.JPG',                                    size: 'lg', align: 'right',  tilt: -3, caption: 'already her.' },
  { src: '/assets/baby-pictures/03.JPG',                                    size: 'sm', align: 'left',   tilt: 4,  caption: null },
  { src: '/assets/baby-pictures/601901B2-44FF-4C65-8FDC-0C994A791504.JPG',  size: 'md', align: 'center', tilt: -2, caption: 'little queen.' },
  { src: '/assets/baby-pictures/02.JPG',                                    size: 'sm', align: 'right',  tilt: 3,  caption: null },
  { src: '/assets/baby-pictures/06.JPG',                                    size: 'md', align: 'left',   tilt: -4, caption: null },
  { src: '/assets/baby-pictures/08.JPG',                                    size: 'lg', align: 'center', tilt: 2,  caption: 'before i was lucky.' },
  { src: '/assets/baby-pictures/05.JPG',                                    size: 'sm', align: 'right',  tilt: -3, caption: null },
]

const sizeClass = {
  sm: 'h-[240px] w-[190px] sm:h-[280px] sm:w-[220px] md:h-[320px] md:w-[250px]',
  md: 'h-[300px] w-[240px] sm:h-[360px] sm:w-[280px] md:h-[420px] md:w-[330px]',
  lg: 'h-[340px] w-[270px] sm:h-[440px] sm:w-[340px] md:h-[520px] md:w-[400px]',
}

const alignClass = {
  left: 'md:mr-auto md:ml-[6%]',
  center: 'md:mx-auto',
  right: 'md:ml-auto md:mr-[6%]',
}

function Frame({ src, tilt, caption, size }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26, rotate: tilt > 0 ? tilt + 4 : tilt - 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease }}
      className="relative mx-auto w-fit"
    >
      <div
        className="relative"
        style={{
          background: '#FAF4E7',
          padding: '12px 12px 48px 12px',
          boxShadow: '0 3px 6px rgba(28,19,32,0.08), 0 30px 70px -28px rgba(28,19,32,0.35)',
        }}
      >
        <span
          aria-hidden
          className="absolute -top-3 left-1/2"
          style={{
            width: 62, height: 16,
            background: 'rgba(200, 155, 60, 0.35)',
            border: '1px dashed rgba(107, 59, 94, 0.4)',
            transform: 'translateX(-50%) rotate(-5deg)',
          }}
        />
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          width="400"
          height="520"
          className={`block object-cover ${sizeClass[size]}`}
          style={{ filter: 'saturate(0.92) contrast(0.97)' }}
        />
        {caption && (
          <span
            className="absolute bottom-4 left-0 right-0 text-center font-hand text-mulberry"
            style={{ fontSize: '0.95rem' }}
          >
            {caption}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function ChildhoodGallery() {
  return (
    <section className="relative w-full px-6 py-32 sm:py-40">
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto mb-24 max-w-3xl text-center"
      >
        <p className="font-body text-micro uppercase tracking-[0.3em] text-ash">
          childhood, unsorted
        </p>
        <h2
          className="mt-6 font-display italic font-light leading-[1.02] text-iris"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
        >
          you, before.
        </h2>
        <p className="mx-auto mt-6 max-w-lg font-body text-letter italic text-ink/75">
          none of these are in order — the heart doesn’t remember that way.
        </p>
      </motion.header>

      <div className="mx-auto flex max-w-5xl flex-col gap-20 sm:gap-28">
        {PHOTOS.map((p, i) => (
          <div key={i} className={alignClass[p.align]}>
            <Frame {...p} />
          </div>
        ))}
      </div>
    </section>
  )
}
