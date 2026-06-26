import { motion } from 'framer-motion'

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

interface TokenCardProps {
  token: Token
  index: number
}

export default function TokenCard({ token, index }: TokenCardProps) {
  const colorMap: Record<string, { border: string; glow: string; text: string; bg: string }> = {
    cyan: {
      border: 'border-cyan-400/30',
      glow: 'hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]',
      text: 'text-cyan-400',
      bg: 'bg-cyan-400'
    },
    magenta: {
      border: 'border-fuchsia-400/30',
      glow: 'hover:shadow-[0_0_40px_rgba(255,0,255,0.15)]',
      text: 'text-fuchsia-400',
      bg: 'bg-fuchsia-400'
    },
    yellow: {
      border: 'border-yellow-400/30',
      glow: 'hover:shadow-[0_0_40px_rgba(255,255,0,0.15)]',
      text: 'text-yellow-400',
      bg: 'bg-yellow-400'
    }
  }

  const colors = colorMap[token.color] || colorMap.cyan

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className={`group relative bg-white/[0.02] border ${colors.border} rounded-xl p-4 md:p-5
                 backdrop-blur-sm cursor-pointer transition-all duration-500 ${colors.glow}
                 hover:bg-white/[0.05] hover:border-opacity-60`}
    >
      {/* Holographic shimmer effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                      -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Token Avatar */}
          <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-lg ${colors.bg}/20 flex items-center justify-center
                         border border-white/10 overflow-hidden`}>
            <span className={`font-display text-lg md:text-xl font-bold ${colors.text}`}>
              {token.symbol.charAt(0)}
            </span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>
          <div>
            <h3 className="font-display text-base md:text-lg font-bold text-white group-hover:text-white/90 transition-colors line-clamp-1">
              {token.name}
            </h3>
            <p className={`font-mono text-xs ${colors.text}`}>${token.symbol}</p>
          </div>
        </div>

        {/* Time badge */}
        <div className="font-mono text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded whitespace-nowrap">
          {token.createdAt}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-black/30 rounded-lg p-2.5 md:p-3 border border-white/5">
          <div className="font-mono text-[10px] text-gray-500 mb-1">MARKET CAP</div>
          <div className="font-display text-sm md:text-base font-bold text-white">{token.marketCap}</div>
        </div>
        <div className="bg-black/30 rounded-lg p-2.5 md:p-3 border border-white/5">
          <div className="font-mono text-[10px] text-gray-500 mb-1">HOLDERS</div>
          <div className="font-display text-sm md:text-base font-bold text-white">{token.holders.toLocaleString()}</div>
        </div>
      </div>

      {/* Creator */}
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs text-gray-500">
          by <span className="text-gray-400">{token.creator}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${colors.bg} animate-pulse`} />
          <span className="font-mono text-[10px] text-gray-500">LIVE</span>
        </div>
      </div>

      {/* Action buttons on hover */}
      <div className="absolute inset-x-4 md:inset-x-5 bottom-4 md:bottom-5 flex gap-2 opacity-0 group-hover:opacity-100
                    translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <button className={`flex-1 py-2 md:py-2.5 rounded-lg font-mono text-xs font-bold
                         ${colors.bg} text-black hover:brightness-110 transition-all min-h-[44px]`}>
          BUY
        </button>
        <button className="px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-mono text-xs border border-white/20
                         text-gray-400 hover:border-white/40 hover:text-white transition-all min-h-[44px]">
          INFO
        </button>
      </div>
    </motion.div>
  )
}
