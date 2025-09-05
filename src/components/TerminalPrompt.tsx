import { useState, useEffect } from 'react'
import { interpretCommand, CommandResponse } from '../lib/command-interpreter'

interface TerminalPromptProps {
  onCommand?: (command: string, response: CommandResponse) => void
  className?: string
}

export function TerminalPrompt({ onCommand, className = '' }: TerminalPromptProps) {
  const [input, setInput] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const command = input.trim()
      const response = interpretCommand(command)
      
      // Add to command history
      setCommandHistory(prev => [...prev.slice(-19), command]) // Keep last 20 commands
      setHistoryIndex(-1)
      
      onCommand?.(command, response)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <div className={`bg-black/80 backdrop-blur-sm border border-emerald-400/30 rounded-lg p-6 shadow-2xl shadow-emerald-400/10 ${className}`}>
      <div className="mb-4">
        <div className="text-emerald-400/70 text-sm font-mono mb-2">
          GHOST_PROTOCOL://system/interface/v0.4-beta
        </div>
        <div className="text-purple-400/60 text-xs font-mono">
          [AUTHENTICATED] | [STEALTH_MODE] | [NEURAL_LINK_ACTIVE]
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-emerald-400 font-mono mr-3 text-lg">
          ghost@horseman:~$
        </span>
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent text-emerald-400 font-mono text-lg outline-none w-full placeholder-emerald-400/30"
            placeholder="execute command..."
            spellCheck={false}
            autoComplete="off"
          />
          <span 
            className={`absolute text-emerald-400 font-mono text-lg ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}
            style={{ left: `${input.length * 0.6}em` }}
          >
            █
          </span>
        </div>
      </form>
      
      <div className="mt-4 text-xs font-mono text-emerald-400/40">
        Available: [scan], [infiltrate], [ghost-mode], [memory-core], [help]
      </div>
    </div>
  )
}