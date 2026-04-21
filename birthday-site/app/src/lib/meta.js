import { useEffect, useState } from 'react'

export function useMeta() {
  const [meta, setMeta] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('/content/meta.json')
      .then((r) => {
        if (!r.ok) throw new Error('meta.json missing')
        return r.json()
      })
      .then((data) => {
        if (!cancelled) setMeta(data)
      })
      .catch((e) => {
        if (!cancelled) setError(e)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { meta, error }
}

export function firstName(fullName) {
  if (!fullName) return ''
  return fullName.split(/\s+/)[0]
}
