import { useEffect, useState } from 'react'
import { diffParts } from '../lib/time.js'

// Ticks every second toward a target UTC ms. Returns the broken-down diff and
// a boolean that flips true once the moment arrives.
export function useCountdown(targetUTC) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!targetUTC) return
    const tick = () => setNow(Date.now())
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetUTC])

  const remaining = targetUTC ? targetUTC - now : 0
  const parts = diffParts(remaining)
  return { ...parts, ready: remaining <= 0 }
}
