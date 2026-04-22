export default function Shell({ children }) {
  // `overflow-x: clip` contains horizontal overflow WITHOUT turning this into a
  // scroll container — which would otherwise silently break `position: sticky`
  // on any descendant (like the pinned letter section).
  return (
    <main className="relative min-h-dvh w-full" style={{ overflowX: 'clip' }}>
      {children}
    </main>
  )
}
