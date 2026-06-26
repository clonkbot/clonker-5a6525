import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CreateTokenModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string, symbol: string) => void
}

export default function CreateTokenModal({ isOpen, onClose, onCreate }: CreateTokenModalProps) {
  const [name, setName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [step, setStep] = useState(1)
  const [isDeploying, setIsDeploying] = useState(false)

  const handleSubmit = () => {
    if (!name || !symbol) return
    setIsDeploying(true)
    setTimeout(() => {
      onCreate(name, symbol)
      setName('')
      setSymbol('')
      setStep(1)
      setIsDeploying(false)
    }, 2000)
  }

  const handleClose = () => {
    setName('')
    setSymbol('')
    setStep(1)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-50 inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                     w-auto md:w-full md:max-w-lg bg-black border border-white/10 rounded-2xl
                     shadow-[0_0_100px_rgba(0,255,255,0.1)] overflow-hidden
                     flex flex-col max-h-[calc(100vh-2rem)] md:max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-white/10 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-white">
                    DEPLOY TOKEN
                  </h2>
                  <p className="font-mono text-xs text-gray-500 mt-1">
                    STEP {step}/2 · {step === 1 ? 'TOKEN INFO' : 'CONFIRM'}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-500 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '50%' }}
                  animate={{ width: step === 1 ? '50%' : '100%' }}
                  className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4 md:space-y-5"
                  >
                    <div>
                      <label className="block font-mono text-xs text-gray-400 mb-2">
                        TOKEN NAME
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Degen Cat"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:py-4
                                 font-mono text-base text-white placeholder:text-gray-600
                                 focus:outline-none focus:border-cyan-400 focus:bg-cyan-400/5
                                 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-gray-400 mb-2">
                        TOKEN SYMBOL
                      </label>
                      <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase().slice(0, 8))}
                        placeholder="e.g. DCAT"
                        maxLength={8}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 md:py-4
                                 font-mono text-base text-white placeholder:text-gray-600
                                 focus:outline-none focus:border-cyan-400 focus:bg-cyan-400/5
                                 transition-all duration-300 uppercase"
                      />
                      <p className="font-mono text-[10px] text-gray-600 mt-2">
                        MAX 8 CHARACTERS
                      </p>
                    </div>

                    {/* Preview */}
                    {name && symbol && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-cyan-400/10 to-fuchsia-400/10 border border-white/10
                                 rounded-lg p-4"
                      >
                        <div className="font-mono text-xs text-gray-500 mb-2">PREVIEW</div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center
                                       border border-cyan-400/30">
                            <span className="font-display text-lg font-bold text-cyan-400">
                              {symbol.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-display font-bold text-white">{name}</div>
                            <div className="font-mono text-xs text-cyan-400">${symbol}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 md:space-y-5"
                  >
                    {/* Summary */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <div className="font-mono text-xs text-gray-500 mb-3">TOKEN DETAILS</div>
                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-sm">
                          <span className="text-gray-400">Name</span>
                          <span className="text-white">{name}</span>
                        </div>
                        <div className="flex justify-between font-mono text-sm">
                          <span className="text-gray-400">Symbol</span>
                          <span className="text-cyan-400">${symbol}</span>
                        </div>
                        <div className="flex justify-between font-mono text-sm">
                          <span className="text-gray-400">Network</span>
                          <span className="text-white">Base</span>
                        </div>
                        <div className="flex justify-between font-mono text-sm">
                          <span className="text-gray-400">Total Supply</span>
                          <span className="text-white">1,000,000,000</span>
                        </div>
                      </div>
                    </div>

                    {/* Fees */}
                    <div className="bg-fuchsia-400/10 border border-fuchsia-400/20 rounded-lg p-4">
                      <div className="flex justify-between font-mono text-sm">
                        <span className="text-gray-400">Deployment Fee</span>
                        <span className="text-fuchsia-400">FREE</span>
                      </div>
                    </div>

                    {/* Warning */}
                    <div className="font-mono text-xs text-gray-500 text-center">
                      By deploying, you agree to the terms of service.
                      Token deployments are irreversible.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-white/10 shrink-0">
              <div className="flex flex-col sm:flex-row gap-3">
                {step === 2 && (
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 md:py-4 rounded-lg font-mono text-sm border border-white/20
                             text-gray-400 hover:border-white/40 hover:text-white transition-all
                             order-2 sm:order-1 min-h-[48px]"
                  >
                    BACK
                  </button>
                )}
                <button
                  onClick={() => {
                    if (step === 1 && name && symbol) setStep(2)
                    else if (step === 2) handleSubmit()
                  }}
                  disabled={!name || !symbol || isDeploying}
                  className={`flex-1 py-3 md:py-4 rounded-lg font-mono text-sm font-bold
                           transition-all duration-300 flex items-center justify-center gap-2
                           min-h-[48px] order-1 sm:order-2
                           ${name && symbol
                             ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black hover:brightness-110'
                             : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}
                >
                  {isDeploying ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                      />
                      DEPLOYING...
                    </>
                  ) : step === 1 ? (
                    'CONTINUE'
                  ) : (
                    'DEPLOY TOKEN'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
