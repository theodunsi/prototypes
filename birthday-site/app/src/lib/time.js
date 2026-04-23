// Compute the UTC instant for a wall-clock date in a specific IANA timezone.
// We want her local midnight on her birthday — regardless of where the visitor is.
export function zonedDateToUTC(isoDate, timeZone) {
  const [y, m, d] = isoDate.split('-').map(Number)
  // First guess: treat the wall time as if it were UTC.
  const guess = Date.UTC(y, m - 1, d, 0, 0, 0)
  // Find what wall time that UTC instant actually shows in the target zone.
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  })
  const parts = Object.fromEntries(
    fmt.formatToParts(new Date(guess)).filter(p => p.type !== 'literal').map(p => [p.type, p.value])
  )
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour) === 24 ? 0 : Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  )
  // Offset between our guess and what the zone actually showed = the zone's offset from UTC.
  const offset = asUTC - guess
  return guess - offset
}

export function diffParts(ms) {
  const total = Math.max(0, ms)
  const days = Math.floor(total / 86_400_000)
  const hours = Math.floor((total % 86_400_000) / 3_600_000)
  // totalHours rolls days into hours so a day-less display still reads correctly
  const totalHours = Math.floor(total / 3_600_000)
  const minutes = Math.floor((total % 3_600_000) / 60_000)
  const seconds = Math.floor((total % 60_000) / 1_000)
  return { days, hours, totalHours, minutes, seconds, total }
}

export function pad(n) {
  return String(n).padStart(2, '0')
}
