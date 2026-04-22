import { useMemo, useState } from 'react'
import Shell from './components/Shell.jsx'
import PreReveal from './components/PreReveal.jsx'
import { useMeta, firstName } from './lib/meta.js'
import { zonedDateToUTC } from './lib/time.js'
import { previewMode, skipIntro } from './lib/flags.js'

export default function App() {
  const { meta, error } = useMeta()
  const [opened, setOpened] = useState(() => skipIntro())

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

  if (!opened) {
    return (
      <Shell>
        <PreReveal
          meta={meta}
          targetUTC={targetUTC}
          forceReady={previewMode()}
          onUnlock={() => setOpened(true)}
        />
      </Shell>
    )
  }

  // Placeholder until Pass 3 builds the reveal animation + Pass 4+ build the site.
  return (
    <Shell>
      <section className="mx-auto flex min-h-dvh max-w-letter flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-body text-micro uppercase text-ash">opened</p>
        <h1 className="font-display text-5xl text-iris">happy birthday, {firstName(meta.her.name)}</h1>
        <p className="font-body text-quiet italic text-ash">(reveal animation and main site land in the next passes)</p>
      </section>
    </Shell>
  )
}
