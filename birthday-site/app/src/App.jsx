import { useMemo, useState } from 'react'
import Shell from './components/Shell.jsx'
import PreReveal from './components/PreReveal.jsx'
import Reveal from './components/Reveal.jsx'
import Hero from './components/Hero.jsx'
import Letter from './components/Letter.jsx'
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
          <Letter meta={meta} />
          <section className="flex min-h-[40vh] items-center justify-center px-6 py-32 text-center">
            <p className="font-body text-quiet italic text-ash">
              (through the years, the two of us, friend notes and closing — next passes)
            </p>
          </section>
          <MusicToggle />
        </>
      )}
    </Shell>
  )
}
