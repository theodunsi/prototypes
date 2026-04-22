// URL flag readers — used for dev overrides.
// ?preview=true   → unlock the entry control immediately (skip the wait)
// ?skip-intro=true → bypass the reveal animation, go straight to main site
function read(flag) {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  const v = params.get(flag)
  return v === 'true' || v === '1'
}

export function previewMode() {
  return read('preview')
}

export function skipIntro() {
  return read('skip-intro')
}
