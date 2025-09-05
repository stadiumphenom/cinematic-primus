import { useState, useEffect } from 'react'
import { Skull } from 'lucide-react'
import { ghostConfig } from '../lib/ghost-config'

interface GhostModeToggleProps {
  className?: string
}

export function GhostModeToggle({ className = '' }: GhostModeToggleProps) {
  const [ghostMode, setGhostMode] = useState(ghostConfig.getConfig().ghostMode)

  useEffect(() => {
    const unsubscribe = ghostConfig.subscribe(config => {
      setGhostMode(config.ghostMode)
    })
    return unsubscribe
  }, [])

  const handleToggle = () => {
    ghostConfig.setGhostMode(!ghostMode)
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`font-mono text-sm transition-colors ${
        ghostMode ? 'text-emerald-400' : 'text-emerald-400/40'
      }`}>
        GHOST_MODE
      </span>
      
      <button
        onClick={handleToggle}
        className={`relative w-14 h-7 rounded-full border transition-all duration-300 ${
          ghostMode 
            ? 'bg-emerald-400/20 border-emerald-400/40' 
            : 'bg-gray-700/40 border-gray-600/40'
        }`}
      >
        <div className={`absolute top-1 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
          ghostMode 
            ? 'left-8 bg-emerald-400' 
            : 'left-1 bg-gray-500'
        }`}>
          <Skull 
            className={`w-3 h-3 transition-colors ${
              ghostMode ? 'text-black' : 'text-gray-300'
            }`}
          />
        </div>
      </button>

      {ghostMode && (
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
          <span className="font-mono text-xs text-emerald-400/60">ACTIVE</span>
        </div>
      )}
    </div>
  )
}