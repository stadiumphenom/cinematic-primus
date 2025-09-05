import { useState } from 'react'
import { MatrixRain } from './components/MatrixRain'
import { HorseSkull } from './components/HorseSkull'
import { TerminalPrompt } from './components/TerminalPrompt'
import { StatusConsole } from './components/StatusConsole'
import { SidePanel } from './components/SidePanel'
import { GhostModeToggle } from './components/GhostModeToggle'
import { AuthModal } from './components/AuthModal'
import { ConfigPanel } from './components/ConfigPanel'
import { CommandResponse } from './lib/command-interpreter'

export default function App() {
  const [lastCommand, setLastCommand] = useState<{ command: string; response: CommandResponse } | undefined>()
  const [showAuth, setShowAuth] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [user, setUser] = useState(null)

  const handleCommand = (command: string, response: CommandResponse) => {
    setLastCommand({ command, response })
    
    // Special commands that trigger UI actions
    if (command.toLowerCase() === 'ghost-mode') {
      // Ghost mode toggle is handled by the toggle component itself
    } else if (command.toLowerCase() === 'authenticate' || command.toLowerCase() === 'login') {
      setShowAuth(true)
    }
  }

  const handleAuthSuccess = (userData: any) => {
    setUser(userData)
    console.log('Ghost authenticated:', userData)
  }

  return (
    <div className="min-h-screen bg-gradient-radial from-black via-gray-950 to-black relative overflow-hidden font-mono">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6 flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-6">
            <HorseSkull />
            <div>
              <h1 className="text-4xl font-mono text-emerald-400 tracking-wider">
                HEADLESS HORSEMAN
                <span className="text-purple-400/60 text-lg ml-2">v0.4-β</span>
              </h1>
              <p className="text-emerald-400/60 font-mono text-sm mt-1 tracking-widest uppercase">
                Ghost Protocol Activated
              </p>
            </div>
          </div>
          
          {/* Ghost Mode Toggle */}
          <GhostModeToggle />
        </header>

        {/* Main Interface */}
        <main className="flex-1 p-6 flex flex-col items-center justify-center gap-8 max-w-6xl mx-auto w-full">
          {/* Central Terminal */}
          <div className="w-full max-w-2xl">
            <TerminalPrompt onCommand={handleCommand} />
          </div>

          {/* Status Console */}
          <div className="w-full max-w-4xl">
            <StatusConsole newCommand={lastCommand} />
          </div>

          {/* Ambient Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl text-xs font-mono">
            <div className="bg-black/40 backdrop-blur-sm border border-emerald-400/10 rounded p-3">
              <div className="text-emerald-400/60 mb-2">NEURAL_LINK</div>
              <div className="text-emerald-400">STATUS: CONNECTED</div>
              <div className="text-purple-400/60">BANDWIDTH: 2.4Gbps</div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm border border-emerald-400/10 rounded p-3">
              <div className="text-emerald-400/60 mb-2">PHANTOM_CORE</div>
              <div className="text-emerald-400">INTEGRITY: 97.3%</div>
              <div className="text-purple-400/60">TEMPERATURE: 23°C</div>
            </div>
            
            <div className="bg-black/40 backdrop-blur-sm border border-emerald-400/10 rounded p-3">
              <div className="text-emerald-400/60 mb-2">STEALTH_MODE</div>
              <div className="text-emerald-400">ENCRYPTION: AES-256</div>
              <div className="text-purple-400/60">SIGNATURE: MASKED</div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 bg-black/60 backdrop-blur-sm border-t border-emerald-400/10">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="font-mono text-xs text-emerald-400/40">
              Powered by <span className="text-emerald-400">EchoSoul</span> | 
              Neural Interface v0.4-beta | 
              Build 2024.09.05
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-emerald-400/40">
              <span>UPTIME: 127:34:12</span>
              <span>MEM: 2.7GB/8GB</span>
              <span>PROC: 12.4%</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Side Panel */}
      <SidePanel 
        onConfigClick={() => setShowConfig(true)}
        onAuthClick={() => setShowAuth(true)}
      />

      {/* Subtle ambient elements */}
      <div className="fixed top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent"></div>
      <div className="fixed bottom-1/4 right-20 w-px h-24 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"></div>
      
      {/* Occasional glitch effects */}
      <div className="fixed top-20 right-1/3 w-2 h-px bg-red-500/60 animate-pulse opacity-30"></div>
      <div className="fixed bottom-40 left-1/4 w-px h-3 bg-red-500/40 animate-pulse opacity-20"></div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Configuration Panel */}
      <ConfigPanel
        isOpen={showConfig}
        onClose={() => setShowConfig(false)}
      />
    </div>
  )
}