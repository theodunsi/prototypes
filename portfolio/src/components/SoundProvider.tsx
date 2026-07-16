import { createContext, useContext, useEffect, useRef, useState } from 'react'

type SoundCtx = { enabled: boolean; toggle: () => void }

const SoundContext = createContext<SoundCtx>({ enabled: false, toggle: () => {} })

// eslint-disable-next-line react-refresh/only-export-components
export function useSound() {
  return useContext(SoundContext)
}

// Site sound is OFF by default (browsers block autoplay-with-audio anyway, and
// surprise music is a bad first impression). The volume toggle opts in: it loops
// the background music and enables a subtle click sound on links/buttons.
export default function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const enabledRef = useRef(false)
  const bgmRef = useRef<HTMLAudioElement | null>(null)
  const clickRef = useRef<HTMLAudioElement | null>(null)

  // Create audio elements once. BGM doesn't preload (5.6MB) until opted in.
  useEffect(() => {
    const bgm = new Audio('/assets/audio/background-music.mp3')
    bgm.loop = true
    bgm.volume = 0.1
    bgm.preload = 'none'
    bgmRef.current = bgm

    // Safety net: if the browser ever fires "ended" despite loop=true, restart it.
    // The music should only ever stop when the visitor toggles sound off.
    const replay = () => {
      bgm.currentTime = 0
      bgm.play().catch(() => {})
    }
    bgm.addEventListener('ended', replay)

    const click = new Audio('/assets/audio/mouse-click.wav')
    click.volume = 0.15
    click.preload = 'auto'
    clickRef.current = click

    return () => {
      bgm.removeEventListener('ended', replay)
      bgm.pause()
    }
  }, [])

  // Toggle drives the audio SYNCHRONOUSLY inside the click gesture. Mobile
  // browsers (iOS Safari especially) block play() that runs later in a useEffect
  // because it's no longer tied to the user's tap — which is why sound worked on
  // desktop but not on phones. The ref avoids a stale-state read.
  const toggle = () => {
    const next = !enabledRef.current
    enabledRef.current = next
    const bgm = bgmRef.current
    if (bgm) {
      if (next) bgm.play().catch(() => {})
      else bgm.pause()
    }
    setEnabled(next)
  }

  // Subtle click sound on interactive elements, only while sound is on
  useEffect(() => {
    if (!enabled) return
    const onPointerDown = (e: PointerEvent) => {
      // Desktop only — no click sound for touch taps (i.e. on mobile)
      if (e.pointerType === 'touch') return
      const target = e.target as HTMLElement | null
      if (!target?.closest('a, button, [data-click-sound]')) return
      const click = clickRef.current
      if (!click) return
      click.currentTime = 0
      click.play().catch(() => {})
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [enabled])

  return (
    <SoundContext.Provider value={{ enabled, toggle }}>
      {children}
    </SoundContext.Provider>
  )
}
