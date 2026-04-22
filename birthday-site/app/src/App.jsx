import { useMemo, useState } from 'react'
import Shell from './components/Shell.jsx'
import PreReveal from './components/PreReveal.jsx'
import Reveal from './components/Reveal.jsx'
import Hero from './components/Hero.jsx'
import ChildhoodGallery from './components/ChildhoodGallery.jsx'
import FriendNotes from './components/FriendNotes.jsx'
import Couple from './components/Couple.jsx'
import Letter from './components/Letter.jsx'
import Closing from './components/Closing.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import { useMeta } from './lib/meta.js'
import { zonedDateToUTC } from './lib/time.js'
import { previewMode, skipIntro } from './lib/flags.js'

const STAGE = { GATE: 'gate', REVEAL: 'reveal', SITE: 'site' }

export default function App() {
  const { meta, error } = useMeta()
  const [stage, setStage] = useState(() => (skipIntro() ? STAGE.SITE : STAGE.GATE))

  const targetUTC = useMemo(() => {
    if (!meta) return null
    return zonedDateToUTC(meta.her.birthdate, meta.her.timezone)
  }, [meta])

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
          onUnlock={() => setStage(STAGE.REVEAL)}
        />
      )}

      {stage === STAGE.REVEAL && (
        <Reveal
          fullName={meta.her.name}
          onDone={() => setStage(STAGE.SITE)}
        />
      )}

      {stage === STAGE.SITE && (
        <>
          <Hero meta={meta} />
          <ChildhoodGallery />
          <FriendNotes />
          <Couple />
          <Letter meta={meta} />
          <Closing meta={meta} />
          <MusicToggle />
        </>
      )}
    </Shell>
  )
}
