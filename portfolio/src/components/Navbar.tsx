import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'

export default function Navbar() {
  const location = useLocation()
  const isDetail = location.pathname.startsWith('/project/')

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-5 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <Link to="/" className="font-display text-lg font-medium text-text hover:text-accent transition-colors">
        Portfolio
      </Link>

      <nav className="flex items-center gap-6">
        {isDetail && (
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All work
          </Link>
        )}
        <a
          href="mailto:hello@portfolio.com"
          className="text-sm text-text-secondary hover:text-text transition-colors"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  )
}
