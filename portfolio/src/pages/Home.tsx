import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { profile, tags, recentWorks, explorations, socials } from '../data/content'
import Header from '../components/Header'
import MediaTile from '../components/MediaTile'
import { INSET } from '../lib/layout'
import { fadeUp, stagger, inView } from '../lib/motion'

// Remembers the home scroll position so returning from a project restores it
let homeScrollY = 0

// Motion-enabled Link so animated buttons still navigate client-side
const MotionLink = motion.create(Link)

// Reveals its children with a fade-up the first time they scroll into view.
// Self-contained so it never depends on a parent passing state down.
function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={inView} className={className}>
      {children}
    </motion.div>
  )
}

// ── Small building blocks ──────────────────────────────────────

// Uppercase section label (PP Neue Montreal 12px). Defaults to the muted tone;
// pass className to override (e.g. text-ink for a primary heading).
function SectionLabel({ children, className = 'text-ink-muted' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[12px] uppercase tracking-[0.08em] select-none ${className}`}>
      {children}
    </p>
  )
}

// White pill button used for the CTAs
function PillButton({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className="inline-flex h-11 items-center gap-1 rounded-full bg-inverse px-5 text-[14px] font-medium text-inverse-ink sm:h-[32px] sm:px-3"
    >
      <img src="/assets/icons/mail.svg" alt="" className="size-4" style={{ filter: 'var(--icon-invert)' }} />
      {label}
    </motion.a>
  )
}

// Secondary-style pill (same as the project pages) that copies the email address.
// On click the label swaps to "COPIED" and the pill contracts to fit it.
// `popLayout` pulls the outgoing label out of layout flow the moment it starts
// exiting, so the button's `layout` width animates once, smoothly — with the
// default `wait` mode it stalls for the exit, then snaps.
function CopyEmailButton() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      return // clipboard blocked (e.g. insecure origin) — leave the label alone
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2000)
  }

  // Don't fire the reset after the component is gone
  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <motion.button
      type="button"
      onClick={copy}
      layout
      transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      aria-label={`Copy email address ${profile.email}`}
      className="inline-flex h-11 w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-surface px-5 text-[14px] font-medium uppercase text-ink transition-colors hover:bg-hairline sm:h-[32px] sm:px-3"
    >
      {/* Icon crossfades copy → check. Both are absolutely stacked in a fixed
          16px box so the swap can't nudge the button's width mid-animation. */}
      <span className="relative size-4 shrink-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={copied ? 'check' : 'copy'}
            src={copied ? '/assets/icons/check.svg' : '/assets/icons/copy.svg'}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'linear' }}
            className="absolute inset-0 size-4"
          />
        </AnimatePresence>
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? 'copied' : 'idle'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'linear' }}
          className="whitespace-nowrap"
        >
          {copied ? 'Copied!' : 'Copy email address'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

// A Fun Explorations tile — an autoplaying clip that zooms into a large modal on click.
// The video lifts out via a unique layoutId; the box holds its grid space.
function ExplorationTile({
  src,
  index,
  open,
  onOpen,
}: {
  src: string
  index: number
  open: boolean
  onOpen: () => void
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      className="relative aspect-[3/2] w-full cursor-pointer overflow-hidden rounded-[5px] bg-surface"
    >
      {!open && (
        <motion.video
          layoutId={`explore-${index}`}
          src={src}
          data-click-sound
          autoPlay
          muted
          loop
          playsInline
          onClick={onOpen}
          onEnded={(e) => {
            e.currentTarget.currentTime = 0
            void e.currentTarget.play()
          }}
          style={{ borderRadius: 5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 size-full object-cover"
        />
      )}
    </motion.div>
  )
}

// Live clock in West Africa Time, e.g. "10:01PM"
function useWatClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Africa/Lagos',
        })
          .format(new Date())
          .replace(' ', '')
      )
    tick()
    const id = setInterval(tick, 1000 * 30)
    return () => clearInterval(id)
  }, [])
  return time
}

// ── Page ───────────────────────────────────────────────────────

export default function Home() {
  const reduce = useReducedMotion()
  const time = useWatClock()
  const lenis = useLenis()
  const [photoOpen, setPhotoOpen] = useState(false)
  const [zoomIndex, setZoomIndex] = useState<number | null>(null)

  // Remember scroll while on home; restore it whenever we return here (e.g. the
  // project back button, which always goes to home). Fresh loads start at top
  // because homeScrollY is 0 until the visitor scrolls.
  useEffect(() => {
    const y = homeScrollY
    if (y > 0) {
      // Re-measure and re-apply over a few frames: coming from a short project
      // page (e.g. Anyday, no boxes) leaves Lenis with a stale, shorter height
      // that would otherwise clamp the restore to the top.
      const restore = (tries: number) => {
        if (lenis) {
          lenis.resize()
          lenis.scrollTo(y, { immediate: true, force: true })
        } else {
          window.scrollTo(0, y)
        }
        if (tries > 0) requestAnimationFrame(() => restore(tries - 1))
      }
      requestAnimationFrame(() => requestAnimationFrame(() => restore(4)))
    }
    const save = () => {
      homeScrollY = window.scrollY
    }
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [lenis])

  // Close any open easter-egg overlay (hero photo or an exploration) on Escape or scroll
  useEffect(() => {
    if (!photoOpen && zoomIndex === null) return
    const close = () => {
      setPhotoOpen(false)
      setZoomIndex(null)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', close, { passive: true })
    window.addEventListener('touchmove', close, { passive: true })
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', close)
      window.removeEventListener('touchmove', close)
    }
  }, [photoOpen, zoomIndex])

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] bg-background pb-[100px]">
      <Header />

      {/* Hero */}
      <section className={`flex flex-col gap-[50px] py-[50px] ${INSET}`}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex flex-col items-start gap-8"
        >
          <h1 className="max-w-[480px] font-display text-[36px] leading-[1.1] text-ink">
            {/* Profile photo sits inline as the first "word" of the headline.
                The span holds the inline space; the image lifts out on click (easter egg). */}
            <span className="relative mr-2 inline-block size-[34px] translate-y-[4px] align-baseline">
              {!photoOpen && (
                <motion.img
                  layoutId="hero-profile"
                  src="/assets/images/profile-img.png"
                  alt="Opemipo Odunsi"
                  onClick={() => setPhotoOpen(true)}
                  style={{ borderRadius: 6 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 size-full cursor-pointer object-cover"
                />
              )}
            </span>
            {profile.headline}
            {/* Flower trio, gently floating */}
            <span className="ml-2 inline-flex translate-y-[4px] items-center gap-[5px] align-baseline">
              {['red', 'yellow', 'blue'].map((c) => (
                <motion.img
                  key={c}
                  src={`/assets/icons/flower-${c}.svg`}
                  alt=""
                  className="size-7 cursor-pointer"
                  // Static until hovered; then spins continuously, and eases back to rest on mouse-out
                  whileHover={reduce ? undefined : { rotate: 360, transition: { duration: 1.1, repeat: Infinity, ease: 'linear' } }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              ))}
            </span>
          </h1>
          <PillButton label="DISCUSS A PROJECT" href={`mailto:${profile.email}`} />
        </motion.div>

        {/* Hero showreel — full 4:3 video, poster shows instantly while it buffers */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="aspect-[4/3] w-full overflow-hidden rounded-[5px] bg-surface"
        >
          <video
            src="/assets/images/explorations/showreel-26.mp4"
            poster="/assets/images/explorations/showreel-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            onEnded={(e) => {
              e.currentTarget.currentTime = 0
              void e.currentTarget.play()
            }}
            className="size-full object-cover"
          />
        </motion.div>
      </section>

      {/* Recent works */}
      <section className={`py-[50px] ${INSET}`}>
        <Reveal>
          <SectionLabel className="text-ink">
            Recent <span className="italic text-ink-muted">Works</span>
          </SectionLabel>
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-[60px] grid grid-cols-1 gap-x-3 gap-y-8 sm:grid-cols-2"
        >
          {recentWorks.map((w) => (
            <MediaTile
              key={w.title}
              image={w.image}
              title={w.title}
              sub={w.sub}
              fit={w.fit}
              href={w.slug ? `/project/${w.slug}` : undefined}
            />
          ))}
        </motion.div>
        <div className="mt-[60px] flex justify-center">
          <MotionLink
            to="/archive"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="inline-flex h-11 items-center gap-1 rounded-full bg-inverse px-5 text-[14px] font-medium text-inverse-ink sm:h-[32px] sm:px-3"
          >
            SEE PROJECTS ARCHIVE
            <img
              src="/assets/icons/arrow-back.svg"
              alt=""
              className="size-4 rotate-180"
              style={{ filter: 'brightness(0)' }}
            />
          </MotionLink>
        </div>
      </section>

      {/* Who am I */}
      <section className={`flex flex-col gap-12 py-[50px] lg:flex-row lg:justify-between ${INSET}`}>
        {/* Label + pills. On desktop this is a real left column (justify-between
            spreads label to top, pills to bottom). On mobile it becomes `contents`
            so its children flow into the section flex and can be ordered around the
            bio — giving the mobile stack: label → bio → pills. */}
        <div className="contents lg:flex lg:flex-col lg:justify-between lg:max-w-[349px]">
          <Reveal className="order-1 lg:order-none">
            <SectionLabel>[Who am I]</SectionLabel>
          </Reveal>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="order-3 flex flex-wrap gap-2 lg:order-none"
          >
            {tags.map((tag) => (
              <motion.span
                key={tag}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                className="flex h-9 items-center rounded-[7px] bg-surface px-4 text-[15px] capitalize text-ink transition-colors hover:bg-hairline"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Bio — sits between label and pills on mobile (order-2), right column on desktop */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="order-2 max-w-[400px] font-display text-[36px] leading-[1.1] text-ink lg:order-none"
        >
          {profile.bio.parts.map((part, i) => (
            <span key={i} className={part.muted ? 'text-ink-muted' : undefined}>
              {part.text}
            </span>
          ))}
        </motion.p>
      </section>

      {/* Explorations */}
      <section className={`py-[50px] ${INSET}`}>
        <Reveal>
          <SectionLabel className="text-ink">
            Fun <span className="italic text-ink-muted">Explorations</span>
          </SectionLabel>
        </Reveal>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-[60px] grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2"
        >
          {explorations.map((e, i) => (
            <ExplorationTile
              key={i}
              src={e.image}
              index={i}
              open={zoomIndex === i}
              onOpen={() => setZoomIndex(i)}
            />
          ))}
        </motion.div>
      </section>

      {/* Contact CTA */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className={`flex flex-col items-center gap-8 py-[50px] text-center ${INSET}`}
      >
        <motion.p variants={fadeUp} className="max-w-[440px] font-display text-[36px] leading-[1.1] text-ink">
          Let's discuss how i can make your product better
        </motion.p>
        <motion.div variants={fadeUp}>
          <CopyEmailButton />
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className={`flex flex-col items-center gap-6 pt-12 text-[13px] uppercase tracking-[0.06em] text-ink-muted sm:flex-row sm:gap-0 ${INSET}`}>
        {/* Equal-width side columns keep ©2026 at the exact page center */}
        <div className="flex items-center gap-4 order-2 sm:order-1 sm:flex-1">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
              {s.label}
            </a>
          ))}
        </div>
        <span className="order-1 sm:order-2">©2026</span>
        <div className="flex items-center gap-1.5 order-3 sm:flex-1 sm:justify-end">
          <span className="text-ink">{time}</span>
          <span className="size-[3px] rounded-full bg-ink-muted" />
          <span>WAT</span>
        </div>
      </footer>

      {/* Easter egg: click the hero photo → it morphs into a 200px modal over a blurred backdrop.
          Portaled to <body> so it's outside the (occasionally filtered) #root — that keeps its
          position:fixed anchored to the viewport. The backdrop (fades) and the image (morphs via
          layoutId) are separate layers, so only one element ever holds the shared layoutId at a time. */}
      {createPortal(
        <>
          <AnimatePresence>
            {photoOpen && (
              <motion.div
                key="photo-backdrop"
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={() => setPhotoOpen(false)}
              />
            )}
          </AnimatePresence>
          {photoOpen && (
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
              <motion.img
                layoutId="hero-profile"
                src="/assets/images/profile-img.png"
                alt="Opemipo Odunsi"
                style={{ borderRadius: 20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto size-[200px] object-cover"
              />
            </div>
          )}
        </>,
        document.body
      )}

      {/* Easter egg: click a Fun Exploration → its clip zooms into a large centered modal.
          Same pattern as the hero photo — portaled to <body>, separate backdrop + media layers. */}
      {createPortal(
        <>
          <AnimatePresence>
            {zoomIndex !== null && (
              <motion.div
                key="explore-backdrop"
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={() => setZoomIndex(null)}
              />
            )}
          </AnimatePresence>
          {zoomIndex !== null && (
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.video
                layoutId={`explore-${zoomIndex}`}
                src={explorations[zoomIndex].image}
                autoPlay
                muted
                loop
                playsInline
                onEnded={(e) => {
                  e.currentTarget.currentTime = 0
                  void e.currentTarget.play()
                }}
                style={{ borderRadius: 8 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                // Mobile: match the tile's 3:2 so the morph is a clean translate (no
                // aspect squish / crop reframe). Desktop keeps the wide 16:10 modal.
                className="pointer-events-auto aspect-[3/2] w-full max-w-[1340px] object-cover sm:aspect-[16/10]"
              />
            </div>
          )}
        </>,
        document.body
      )}
    </main>
  )
}
