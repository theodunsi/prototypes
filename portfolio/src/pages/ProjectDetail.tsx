import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import { useLenis } from 'lenis/react'
import Header from '../components/Header'
import { INSET } from '../lib/layout'
import { projects, recentWorks } from '../data/content'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const inView = { once: true, margin: '-80px' } as const

// A 720px-tall media box. Given a `base` path (no extension), it tries the PNG
// first, falls back to an autoplaying MP4, then to an empty placeholder.
function MediaBox({ base }: { base: string }) {
  const [kind, setKind] = useState<'img' | 'video' | 'none'>('img')
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="relative aspect-[19/12] w-full overflow-hidden rounded-[5px] bg-surface sm:aspect-auto sm:h-[720px]"
    >
      {kind === 'img' && (
        <img
          src={`${base}.png`}
          alt=""
          onError={() => setKind('video')}
          className="size-full object-cover object-center"
        />
      )}
      {kind === 'video' && (
        <video
          src={`${base}.mp4`}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setKind('none')}
          onEnded={(e) => {
            // Safety net: if a browser ever fires "ended" despite loop, restart it.
            e.currentTarget.currentTime = 0
            void e.currentTarget.play()
          }}
          className="size-full object-cover object-center"
        />
      )}
    </motion.div>
  )
}

// Footer nav pill. Disabled (50% opacity) when there's nowhere to go.
function NavButton({
  label,
  icon,
  iconRight = false,
  to,
  onClick,
  className = '',
}: {
  label: string
  icon: string
  iconRight?: boolean
  to?: string
  onClick?: () => void
  className?: string
}) {
  const disabled = !to && !onClick
  const cls = `inline-flex h-11 items-center justify-center gap-1 rounded-full bg-surface px-5 text-[14px] font-medium uppercase text-ink transition-colors hover:bg-hairline sm:h-[32px] sm:px-3 ${
    disabled ? 'pointer-events-none opacity-50' : ''
  } ${className}`
  const img = <img src={icon} alt="" className="size-4" />
  const inner = (
    <>
      {!iconRight && img}
      {label}
      {iconRight && img}
    </>
  )
  if (to) return <Link to={to} className={cls}>{inner}</Link>
  return (
    <button onClick={onClick} className={cls} disabled={disabled}>
      {inner}
    </button>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const lenis = useLenis()
  // Start each project at the top (router doesn't reset scroll between pages)
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [slug, lenis])
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  if (!project) {
    return (
      <main className="mx-auto flex min-h-screen max-w-[1440px] flex-col bg-background">
        <Header />
        <div className={`flex flex-1 flex-col items-center justify-center gap-6 ${INSET}`}>
          <p className="font-display text-[36px] leading-[1.1] text-ink">Project not found</p>
          <Link
            to="/"
            className="inline-flex h-11 items-center rounded-full bg-surface px-5 text-[14px] font-medium uppercase text-ink transition-colors hover:bg-hairline sm:h-[32px] sm:px-3"
          >
            Back to home
          </Link>
        </div>
      </main>
    )
  }

  // Previous/Next follow the homepage Recent Works order (the sequence the
  // visitor browses), not the internal projects[] order — so reordering the
  // cards reorders navigation too, and the two can never disagree.
  const order = recentWorks.map((w) => w.slug).filter((s): s is string => !!s)
  const orderIndex = order.indexOf(slug ?? '')
  const prevSlug = orderIndex > 0 ? order[orderIndex - 1] : null
  const nextSlug = orderIndex >= 0 && orderIndex < order.length - 1 ? order[orderIndex + 1] : null
  const hasLink = !!project.link

  // Build the media boxes in reading order and assign numbered file paths:
  // hero = 01, then each gallery row (full = 1 box, pair = 2, left→right).
  // An explicitly empty gallery ([]) = no media yet → render no boxes at all.
  const rows = project.gallery ?? ['pair', 'full', 'pair', 'full']
  const hasMedia = rows.length > 0
  let counter = 0
  const nextBase = () =>
    `/assets/images/${project.slug}/${String(++counter).padStart(2, '0')}`
  const heroBase = nextBase()
  const galleryRows = rows.map((row) =>
    row === 'full'
      ? { type: 'full' as const, bases: [nextBase()] }
      : { type: 'pair' as const, bases: [nextBase(), nextBase()] }
  )

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] bg-background">
      <Header />

      {/* Content */}
      <section className={`relative pt-[50px] ${INSET}`}>
        <div className="flex flex-col gap-3">
          {/* Intro: back+action row, title, pills, supporting text — then hero media */}
          <div className="flex flex-col gap-[50px]">
            <div className="flex flex-col gap-6">
              {/* Row: back button (left) ↔ visit/coming-soon button (right) */}
              <div className="flex items-center justify-between gap-4">
                <Link
                  to="/"
                  aria-label="Back to home"
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-surface transition-colors hover:bg-hairline"
                >
                  <img src="/assets/icons/arrow-back.svg" alt="" className="size-5" />
                </Link>

                {/* COMING SOON (muted, static) → VISIT SITE (primary, clickable) once a link exists */}
                {hasLink ? (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className="inline-flex h-11 w-fit items-center gap-1 rounded-full bg-inverse px-5 text-[14px] font-medium uppercase text-inverse-ink sm:h-[32px] sm:px-3"
                  >
                    <img
                      src="/assets/icons/link.svg"
                      alt=""
                      className="size-4"
                      style={{ filter: 'brightness(0)' }}
                    />
                    Visit site
                  </motion.a>
                ) : (
                  <span className="inline-flex h-11 w-fit items-center gap-1 rounded-full bg-surface px-5 text-[14px] font-medium uppercase text-ink-muted sm:h-[32px] sm:px-3">
                    <img src="/assets/icons/link.svg" alt="" className="size-4 opacity-50" />
                    Coming soon
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-display text-[28px] leading-none text-ink">{project.title}</h1>

              {/* Pills */}
              <div className="flex flex-wrap items-center gap-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex h-[30px] items-center rounded-[6px] bg-surface px-3 text-[14px] uppercase text-ink"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Supporting text */}
              <p className="max-w-[1140px] text-[15px] leading-[1.4] text-ink-muted">
                {project.description}
              </p>
            </div>

            {/* Hero media (01) */}
            {hasMedia && <MediaBox base={heroBase} />}
          </div>

          {/* Gallery — full rows and 2-up pairs, auto-filled by number */}
          {hasMedia &&
            galleryRows.map((row, i) =>
              row.type === 'full' ? (
                <MediaBox key={i} base={row.bases[0]} />
              ) : (
                <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <MediaBox base={row.bases[0]} />
                  <MediaBox base={row.bases[1]} />
                </div>
              )
            )}
        </div>
      </section>

      {/* Nav footer — desktop: 3 across (Previous · Back to top · Next).
          Mobile: Back to top full-width on top, Previous + Next share the row below
          (generous vertical gap between the two rows). */}
      <footer className={`flex flex-wrap items-center gap-x-3 gap-y-8 pt-[100px] pb-[100px] sm:flex-nowrap sm:justify-between sm:gap-0 ${INSET}`}>
        <NavButton
          label="Previous"
          icon="/assets/icons/arrow-back.svg"
          to={prevSlug ? `/project/${prevSlug}` : undefined}
          className="order-2 flex-1 sm:order-none sm:flex-none"
        />
        <NavButton
          label="Back to top"
          icon="/assets/icons/arrow-up.svg"
          onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
          className="order-1 w-full sm:order-none sm:w-auto"
        />
        <NavButton
          label="Next"
          icon="/assets/icons/arrow-left.svg"
          iconRight
          to={nextSlug ? `/project/${nextSlug}` : undefined}
          className="order-3 flex-1 sm:order-none sm:flex-none"
        />
      </footer>
    </main>
  )
}
