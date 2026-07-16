import { useEffect, useRef, useState } from 'react'

function isReady(el: HTMLImageElement | HTMLVideoElement): boolean {
  return el instanceof HTMLImageElement
    ? el.complete && el.naturalWidth > 0
    : el.readyState >= 2 // HAVE_CURRENT_DATA — first frame available
}

// Tracks whether a media element has loaded, for driving the pulse loader.
//
// A cached image/video often finishes BEFORE React attaches its onLoad handler,
// so that event never fires and the loader would be stuck. This re-checks
// readiness right after mount and, if not ready, attaches its own one-shot
// listener — so it works for both cached and streaming media.
//
// Attach `setEl` as the media element's ref; render <PulseLoader show={!loaded} />.
export function useMediaLoaded() {
  const [loaded, setLoaded] = useState(false)
  const elRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    if (isReady(el)) {
      setLoaded(true)
      return
    }
    const event = el instanceof HTMLImageElement ? 'load' : 'loadeddata'
    const onReady = () => setLoaded(true)
    el.addEventListener(event, onReady, { once: true })
    return () => el.removeEventListener(event, onReady)
  }, [])

  const setEl = (el: HTMLImageElement | HTMLVideoElement | null) => {
    elRef.current = el
  }

  return { loaded, setLoaded, setEl }
}
