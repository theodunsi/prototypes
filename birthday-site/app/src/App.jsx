import { useEffect, useMemo, useState } from 'react'
import Shell from './components/Shell.jsx'
import PreReveal from './components/PreReveal.jsx'
import Reveal from './components/Reveal.jsx'
import Hero from './components/Hero.jsx'
import ChildhoodGallery from './components/ChildhoodGallery.jsx'
import FriendNotes from './components/FriendNotes.jsx'
import LetterAndUs from './components/LetterAndUs.jsx'
import Closing from './components/Closing.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import { useMeta } from './lib/meta.js'
import { zonedDateToUTC } from './lib/time.js'
import { previewMode, skipIntro } from './lib/flags.js'
import * as audio from './lib/audio.js'
import Confetti from './components/Confetti.jsx'

const STAGE = { GATE: 'gate', REVEAL: 'reveal', SITE: 'site' }

export default function App() {
  const { meta, error } = useMeta()
  const [stage, setStage] = useState(() => (skipIntro() ? STAGE.SITE : STAGE.GATE))
  const [burst, setBurst] = useState(false)

  // Press handler: confetti fires from screen corners, audio kicks in,
  // page advances to the reveal after a beat so the cannons are visible
  // launching from the gate.
  const handleUnlock = () => {
    setBurst(true)
    audio.play()
    // Confetti pops out and fades; wait for the burst to clear before advancing
    setTimeout(() => setStage(STAGE.REVEAL), 2500)
  }

  const targetUTC = useMemo(() => {
    if (!meta) return null
    return zonedDateToUTC(meta.her.birthdate, meta.her.timezone)
  }, [meta])

  // Once the day arrives, every refresh skips the countdown and goes straight
  // to the reveal. Preview mode is exempt so Tiger can still test the gate.
  useEffect(() => {
    if (!meta || !targetUTC) return
    if (stage !== STAGE.GATE) return
    if (previewMode()) return
    if (Date.now() >= targetUTC) {
      setStage(STAGE.REVEAL)
      audio.play()
    }
  }, [meta, targetUTC, stage])

  if (error) {
    return (
      <Shell>
        <div className="flex min-h-dvh items-center justify-center px-6 text-center">
          <p className="font-body text-quiet text-ash">
            something went quiet — couldn't read the words for today.
          </p>
        </div>
      </Shell>
    )
  }

  if (!meta) return <Shell><div className="min-h-dvh" /></Shell>

  return (
    <Shell>
      {stage === STAGE.GATE && (
        <PreReveal
          meta={meta}
          targetUTC={targetUTC}
          forceReady={previewMode()}
          onUnlock={handleUnlock}
        />
      )}

      {stage === STAGE.REVEAL && (
        <Reveal fullName={meta.her.name} onDone={() => setStage(STAGE.SITE)} />
      )}

      {stage === STAGE.SITE && (
        <>
          <Hero meta={meta} />
          <ChildhoodGallery />
          <FriendNotes />
          <LetterAndUs meta={meta} />
          <Closing meta={meta} />
          <MusicToggle />
        </>
      )}

      {/* Confetti lives at the App level so it keeps playing through the
          stage transition from gate → reveal */}
      {burst && <Confetti onDone={() => setBurst(false)} />}
    </Shell>
  )
}
