import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

function renderBlocks(text) {
  return text.trim().split(/\n\s*\n/).map((block, i) => {
    const lines = block.split('\n')
    return (
      <p key={i} className="text-letter leading-[1.9]">
        {lines.map((line, j) => (
          <span key={j}>
            {line}
            {j < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    )
  })
}

export default function Letter({ meta }) {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/content/boyfriend/boyfriend-letter.md')
      .then((r) => r.text())
      .then((t) => setContent(t))
      .catch(() => setContent(''))
  }, [])

  // Peel the opening line — "To My Ethereal Queen ," — for display treatment
  const split = content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  const greeting = split[0] || ''
  const rest = split.slice(1).join('\n\n')

  return (
    <section className="relative w-full px-6 py-40 sm:py-48">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease }}
        className="mx-auto max-w-letter"
      >
        <p className="font-body text-micro uppercase tracking-[0.3em] text-ash">
          a letter from me, to you
        </p>

        {greeting && (
          <h2
            className="mt-10 font-display italic font-light leading-[1.1] text-iris"
            style={{ fontSize: 'clamp(1.75rem, 4.2vw, 2.75rem)' }}
          >
            {greeting}
          </h2>
        )}

        <div className="mt-10 space-y-7 font-body text-ink/88">
          {renderBlocks(rest)}
        </div>

        <div className="mt-16 flex flex-col gap-1">
          <p className="font-body text-letter italic text-ink/70">
            with my whole heart,
          </p>
          <p className="font-hand text-3xl text-mulberry sm:text-4xl">
            — {meta.from.nickname || meta.from.name.split(' ')[0]}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
