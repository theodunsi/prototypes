import { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import * as audio from '../lib/audio.js'

export default function MusicToggle() {
  const [on, setOn] = useState(() => audio.isPlaying())

  useEffect(() => {
    return audio.subscribe(setOn)
  }, [])

  return (
    <button
      type="button"
      onClick={audio.toggle}
      aria-label={on ? 'Mute the music' : 'Play the music'}
      className="fixed bottom-5 right-5 z-control flex size-11 items-center justify-center rounded-full border border-ink/10 bg-paper/90 text-iris shadow-polaroid backdrop-blur-sm transition-colors duration-150 ease-paper hover:border-mulberry/50 hover:text-mulberry sm:bottom-8 sm:right-8"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {on ? <Volume2 className="size-[18px]" strokeWidth={1.6} /> : <VolumeX className="size-[18px]" strokeWidth={1.6} />}
    </button>
  )
}
