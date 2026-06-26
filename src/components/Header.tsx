import { useState } from 'react'
import { motion } from 'framer-motion'

interface HeaderProps {
  onCreateClick: () => void
}

export default function Header({ onCreateClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-3"
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-lg rotate-45" />
              <div className="absolute inset-1 bg-black rounded-md rotate-45" />
              <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 to-fuchsia-500 rounded-sm rotate-45" />
            </div>
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight">
              <span className="text-cyan-400">CLON</span>
              <span className="text-fuchsia-400">KER</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-sm">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors glitch-hover">
              EXPLORE
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors glitch-hover">
              TRENDING
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors glitch-hover">
              MY TOKENS
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCreateClick}
              className="relative group px-4 md:px-6 py-2.5 md:py-3 font-mono text-xs md:text-sm font-bold rounded-lg
                       bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black
                       hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span className="hidden sm:inline">+</span> CREATE
              </span>
            </motion.button>

            <button className="hidden md:flex items-center gap-2 px-4 py-2.5 border border-white/20 rounded-lg
                             font-mono text-xs text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400
                             transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              0x1a2b...3c4d
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 py-4"
          >
            <nav className="flex flex-col gap-4 font-mono text-sm">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors py-2">
                EXPLORE
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors py-2">
                TRENDING
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors py-2">
                MY TOKENS
              </a>
              <button className="flex items-center gap-2 px-4 py-3 border border-white/20 rounded-lg
                               font-mono text-xs text-gray-400 w-full justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                0x1a2b...3c4d
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
