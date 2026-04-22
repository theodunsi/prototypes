// Single Audio element shared across the app — created lazily so nothing
// loads until she actually presses the button.
let el = null
let playing = false
const listeners = new Set()

function ensure() {
  if (el) return el
  el = new Audio('/assets/audio/reveal.mp3')
  el.volume = 0.3
  el.loop = true
  el.preload = 'none'
  el.addEventListener('ended', () => { playing = false; emit() })
  return el
}

export function play() {
  const a = ensure()
  const p = a.play()
  if (p && typeof p.then === 'function') {
    p.then(() => { playing = true; emit() }).catch(() => { playing = false; emit() })
  } else {
    playing = true; emit()
  }
}

export function pause() {
  if (!el) return
  el.pause()
  playing = false
  emit()
}

export function toggle() {
  playing ? pause() : play()
}

export function isPlaying() {
  return playing
}

export function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function emit() {
  listeners.forEach((fn) => fn(playing))
}
