// A loading overlay for a media box: an opaque surface with a soft breathing
// sheen (the "pulse" loader). Sits on top of the media while it downloads and
// fades out once it's ready. Place it as the last child of a `relative` box.
export default function PulseLoader({ show }: { show: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 bg-surface transition-opacity duration-500 ease-out ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="media-pulse absolute inset-0" />
    </div>
  )
}
