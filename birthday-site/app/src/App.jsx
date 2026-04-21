import Shell from './components/Shell.jsx'
import { useMeta, firstName } from './lib/meta.js'

export default function App() {
  const { meta, error } = useMeta()

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

  if (!meta) {
    return (
      <Shell>
        <div className="flex min-h-dvh items-center justify-center" />
      </Shell>
    )
  }

  return (
    <Shell>
      <section className="mx-auto flex min-h-dvh max-w-letter flex-col items-center justify-center gap-12 px-6 py-24 text-center">
        <p className="font-body text-micro uppercase text-ash">token preview</p>

        <h1 className="font-display text-5xl font-light leading-[1.05] tracking-tight text-iris md:text-7xl">
          for {firstName(meta.her.name)}
        </h1>

        <p className="font-body text-letter italic text-ink/85">
          {meta.site.tagline}
        </p>

        <p className="font-hand text-2xl text-mulberry">
          — {firstName(meta.from.name)}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
          {[
            ['parchment', '#F3EADA'],
            ['paper', '#FAF4E7'],
            ['ink', '#1C1320'],
            ['iris', '#3B2A52'],
            ['mulberry', '#6B3B5E'],
            ['bloom', '#CBB4D4'],
            ['rose', '#B87A6E'],
            ['ochre', '#C89B3C'],
            ['ash', '#837489'],
          ].map(([name, hex]) => (
            <div key={name} className="flex flex-col items-center gap-1.5">
              <span
                className="size-10 rounded-card shadow-polaroid ring-1 ring-ink/5"
                style={{ background: hex }}
                aria-hidden
              />
              <span className="font-body text-micro uppercase text-ash">{name}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 pt-4">
          <p className="font-display text-2xl text-iris">Fraunces — display</p>
          <p className="font-body text-read text-ink/80">
            Source Serif 4 — body. Reads like a printed page.
          </p>
          <p className="font-hand text-xl text-mulberry">Homemade Apple — sign-off</p>
        </div>
      </section>
    </Shell>
  )
}
