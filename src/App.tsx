import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TokenCard from './components/TokenCard'
import CreateTokenModal from './components/CreateTokenModal'
import Header from './components/Header'
import ScanLines from './components/ScanLines'

interface Token {
  id: string
  name: string
  symbol: string
  creator: string
  marketCap: string
  holders: number
  createdAt: string
  color: string
}

const mockTokens: Token[] = [
  { id: '1', name: 'Degen Cat', symbol: 'DCAT', creator: '0x1a2b...3c4d', marketCap: '$420.69K', holders: 1337, createdAt: '2 mins ago', color: 'cyan' },
  { id: '2', name: 'Moon Pepe', symbol: 'MPEPE', creator: '0x5e6f...7g8h', marketCap: '$69.42K', holders: 888, createdAt: '5 mins ago', color: 'magenta' },
  { id: '3', name: 'Based Chad', symbol: 'CHAD', creator: '0x9i0j...1k2l', marketCap: '$1.2M', holders: 4200, createdAt: '12 mins ago', color: 'yellow' },
  { id: '4', name: 'Wojak Finance', symbol: 'WOJ', creator: '0x3m4n...5o6p', marketCap: '$256K', holders: 2100, createdAt: '18 mins ago', color: 'cyan' },
  { id: '5', name: 'Frog Coin', symbol: 'FROG', creator: '0x7q8r...9s0t', marketCap: '$88.88K', holders: 666, createdAt: '25 mins ago', color: 'magenta' },
  { id: '6', name: 'Ape Together', symbol: 'APE2', creator: '0x1u2v...3w4x', marketCap: '$512K', holders: 3333, createdAt: '31 mins ago', color: 'yellow' },
]

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tokens, setTokens] = useState<Token[]>(mockTokens)
  const [filter, setFilter] = useState<'all' | 'trending' | 'new'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleCreateToken = (name: string, symbol: string) => {
    const colors = ['cyan', 'magenta', 'yellow']
    const newToken: Token = {
      id: Date.now().toString(),
      name,
      symbol: symbol.toUpperCase(),
      creator: '0x' + Math.random().toString(16).slice(2, 6) + '...' + Math.random().toString(16).slice(2, 6),
      marketCap: '$0',
      holders: 1,
      createdAt: 'just now',
      color: colors[Math.floor(Math.random() * colors.length)]
    }
    setTokens([newToken, ...tokens])
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <ScanLines />

      {/* Background grid */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: `linear-gradient(rgba(0,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,255,255,0.5) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }} />

      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[150px] pointer-events-none" />

      <Header onCreateClick={() => setIsModalOpen(true)} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-yellow-400 animate-gradient">
              DEPLOY TOKENS
            </span>
          </h1>
          <p className="font-mono text-gray-400 text-sm md:text-base lg:text-lg max-w-xl mx-auto px-4">
            <span className="text-cyan-400">[</span>
            Launch your memecoin on Base in seconds
            <span className="text-cyan-400">]</span>
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 md:mt-10 font-mono text-xs md:text-sm">
            <div className="bg-white/5 border border-white/10 px-4 md:px-6 py-3 rounded-lg backdrop-blur-sm">
              <div className="text-cyan-400 text-lg md:text-2xl font-bold">12,847</div>
              <div className="text-gray-500">TOKENS DEPLOYED</div>
            </div>
            <div className="bg-white/5 border border-white/10 px-4 md:px-6 py-3 rounded-lg backdrop-blur-sm">
              <div className="text-fuchsia-400 text-lg md:text-2xl font-bold">$4.2M</div>
              <div className="text-gray-500">TOTAL VOLUME</div>
            </div>
            <div className="bg-white/5 border border-white/10 px-4 md:px-6 py-3 rounded-lg backdrop-blur-sm">
              <div className="text-yellow-400 text-lg md:text-2xl font-bold">89,421</div>
              <div className="text-gray-500">UNIQUE HOLDERS</div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 font-mono text-sm
                       focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,255,0.2)]
                       transition-all duration-300 placeholder:text-gray-600"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-mono text-xs">
              ESC
            </div>
          </div>

          <div className="flex gap-2 font-mono text-xs">
            {(['all', 'trending', 'new'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-3 rounded-lg border transition-all duration-300 min-w-[80px]
                          ${filter === f
                            ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400'
                            : 'border-white/20 text-gray-400 hover:border-white/40'}`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Token Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTokens.map((token, index) => (
              <TokenCard key={token.id} token={token} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredTokens.length === 0 && (
          <div className="text-center py-20 font-mono text-gray-500">
            <div className="text-4xl mb-4">_</div>
            <div>NO TOKENS FOUND</div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-xs text-gray-600">
            Requested by <span className="text-gray-500">@Vox_Claw_</span> · Built by <span className="text-gray-500">@clonkbot</span>
          </p>
        </div>
      </footer>

      <CreateTokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateToken}
      />
    </div>
  )
}

export default App
