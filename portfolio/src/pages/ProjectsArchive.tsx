import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import Header from '../components/Header'
import MediaTile from '../components/MediaTile'
import { INSET } from '../lib/layout'
import { stagger, inView } from '../lib/motion'
import { archive } from '../data/content'

export default function ProjectsArchive() {
  const lenis = useLenis()
  // Start at the top on load
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [lenis])

  // All tiles autoplay together. Hovering one solos it (pauses the rest);
  // leaving resumes everyone. `active === null` means "no hover — play all".
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const setActive = (active: number | null) => {
    videos.current.forEach((v, i) => {
      if (!v) return
      if (active === null || i === active) void v.play().catch(() => {})
      else v.pause()
    })
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1440px] bg-background pb-[100px]">
      <Header />

      {/* Same top offset as the project pages (pt-[50px] after the header) */}
      <section className={`relative pt-[50px] ${INSET}`}>
        {/* Back button — outdented to the left, beside the first box */}
        <Link
          to="/"
          aria-label="Back to home"
          className="absolute top-[50px] left-6 grid h-[30px] w-[40px] place-items-center rounded-full bg-surface transition-colors hover:bg-hairline sm:left-10 lg:left-20 xl:left-[94px]"
        >
          <img src="/assets/icons/arrow-back.svg" alt="" className="size-4" />
        </Link>

        {/* Recent-Works-style grid — pt clearance on mobile so it clears the back button */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid grid-cols-1 gap-x-3 gap-y-8 pt-12 sm:grid-cols-2 lg:pt-0"
        >
          {archive.map((item, i) => (
            <MediaTile
              key={i}
              image={item.image}
              poster={item.poster}
              title={item.title}
              sub={item.sub}
              hoverPlay
              registerVideo={(el) => {
                videos.current[i] = el
              }}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
            />
          ))}
        </motion.div>
      </section>
    </main>
  )
}
