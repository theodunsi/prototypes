import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

// Intimate cluster — smaller photos, tight composition, varied tilts.
const PHOTOS = [
  { src: '/assets/couple/IMG_1146.jpg',                                 tilt: -3 },
  { src: '/assets/couple/053786d2-6612-47c2-ab5e-3a9a4d7283ad.JPG',     tilt: 2 },
  { src: '/assets/couple/IMG_6491.jpg',                                 tilt: -2 },
  { src: '/assets/couple/0aca0e2e-36a3-4961-ba47-5b784daa49e3.JPG',     tilt: 3 },
  { src: '/assets/couple/IMG_8364.jpg',                                 tilt: -4 },
  { src: '/assets/couple/15fe2a4e-6e91-458c-aa61-4edebe576dbd.JPG',     tilt: 2 },
]

function Frame({ src, tilt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: tilt + (tilt > 0 ? 4 : -4) }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, rotate: tilt * 0.5, transition: { duration: 0.25, ease } }}
      transition={{ duration: 0.85, ease }}
      className="relative mx-auto w-fit"
    >
      <div
        className="relative"
        style={{
          background: '#FAF4E7',
          padding: '10px 10px 36px 10px',
          boxShadow: '0 3px 6px rgba(28,19,32,0.08), 0 24px 52px -24px rgba(28,19,32,0.35)',
        }}
      >
        <span
          aria-hidden
          className="absolute -top-3 left-1/2"
          style={{
            width: 58, height: 14,
            background: 'rgba(200, 155, 60, 0.3)',
            border: '1px dashed rgba(107, 59, 94, 0.4)',
            transform: 'translateX(-50%) rotate(-5deg)',
          }}
        />
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          width="320"
          height="380"
          className="block h-[220px] w-[180px] object-cover sm:h-[280px] sm:w-[230px] md:h-[320px] md:w-[260px]"
          style={{ filter: 'saturate(0.95) contrast(0.98)' }}
        />
      </div>
    </motion.div>
  )
}

export default function Couple() {
  return (
    <section className="relative w-full px-6 py-32 sm:py-40">
      <motion.header
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto mb-20 max-w-3xl text-center"
      >
        <p className="font-body text-micro uppercase tracking-[0.3em] text-ash">
          you and me
        </p>
        <h2
          className="mt-6 font-display italic font-light leading-[1.02] text-iris"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
        >
          us.
        </h2>
        <p className="mx-auto mt-6 max-w-lg font-body text-letter italic text-ink/75">
          a couple of moments i keep coming back to.
        </p>
      </motion.header>

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 sm:gap-14 md:grid-cols-3">
        {PHOTOS.map((p, i) => (
          <Frame key={i} {...p} />
        ))}
      </div>
    </section>
  )
}
