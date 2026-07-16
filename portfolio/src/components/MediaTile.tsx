import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { fadeUp } from '../lib/motion'
import { useMediaLoaded } from '../lib/media'
import PulseLoader from './PulseLoader'

// A project / showreel media tile (image or video) with an optional title
// underneath. If `href` is set, the whole tile links to that page.
//
// Videos always autoplay. When `hoverPlay` is set the tile drops the zoom-in
// (the parent coordinates playback instead) and reports its <video> element +
// hover events upward via `registerVideo` / `onHoverStart` / `onHoverEnd`, so a
// parent can solo the hovered clip and pause the rest.
//
// Used by Recent Works (home) and the Projects Archive.
export default function MediaTile({
  image,
  title,
  sub,
  fit = 'cover',
  href,
  hoverPlay = false,
  poster,
  registerVideo,
  onHoverStart,
  onHoverEnd,
}: {
  image?: string
  title?: string
  sub?: string
  fit?: 'cover' | 'contain'
  href?: string
  hoverPlay?: boolean
  poster?: string
  registerVideo?: (el: HTMLVideoElement | null) => void
  onHoverStart?: () => void
  onHoverEnd?: () => void
}) {
  const isVideo = !!image && /\.(mp4|webm)$/i.test(image)
  const localRef = useRef<HTMLVideoElement>(null)
  const { loaded, setLoaded, setEl } = useMediaLoaded()
  // Hover-play tiles keep a fixed frame (the parent coordinates which one plays);
  // other tiles get the subtle zoom-in.
  const zoom = hoverPlay ? '' : 'transition-transform duration-500 ease-out group-hover:scale-[1.04]'
  const inner = (
    <motion.div
      variants={fadeUp}
      className="group cursor-pointer"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[5px] bg-surface">
        {image ? (
          isVideo ? (
            <video
              ref={(el) => {
                localRef.current = el
                registerVideo?.(el)
                setEl(el)
              }}
              src={image}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setLoaded(true)}
              onEnded={(e) => {
                e.currentTarget.currentTime = 0
                void e.currentTarget.play()
              }}
              className={`size-full object-cover object-center ${zoom}`}
            />
          ) : (
            <img
              ref={setEl}
              src={image}
              alt={title ?? ''}
              onLoad={() => setLoaded(true)}
              className={`size-full object-center ${zoom} ${
                fit === 'contain' ? 'object-contain' : 'object-cover'
              }`}
            />
          )
        ) : (
          // Empty placeholder — subtle sheen on hover until media is added
          <div className="size-full transition-colors duration-300 group-hover:bg-hairline" />
        )}
        {/* Poster-backed tiles (archive) already show a frame instantly, so the
            pulse is only for tiles without one (Recent Works images). */}
        {image && !poster && <PulseLoader show={!loaded} />}
      </div>
      {title && (
        <p className="mt-6 text-[14px] uppercase text-ink">
          {title}
          {sub && <span className="italic text-ink-muted"> {sub}</span>}
        </p>
      )}
    </motion.div>
  )
  return href ? (
    <Link to={href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  )
}
