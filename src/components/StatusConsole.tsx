import { useEffect, useState } from 'react'
import { CommandResponse } from '../lib/command-interpreter'
import { supabase } from '../lib/supabase'

interface LogEntry {
  id: number
  timestamp: string
  type: 'info' | 'warning' | 'error' | 'success' | 'command' | 'ghost_whisper'
  message: string
}

interface StatusConsoleProps {
  newCommand?: { command: string; response: CommandResponse }
  className?: string
}

export function StatusConsole({ newCommand, className = '' }: StatusConsoleProps) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 1, timestamp: '23:47:12', type: 'success', message: 'Neural interface initialized successfully' },
    { id: 2, timestamp: '23:47:15', type: 'info', message: 'Ghost protocol activated - stealth mode enabled' },
    { id: 3, timestamp: '23:47:18', type: 'warning', message: 'Encrypted channel established - unauthorized access detected' },
    { id: 4, timestamp: '23:47:22', type: 'info', message: 'Memory core synchronization at 97.3%' },
    { id: 5, timestamp: '23:47:28', type: 'success', message: 'Phantom rider protocol online' },
  ])

  useEffect(() => {
    if (newCommand) {
      const commandLog: LogEntry = {
        id: Date.now(),
        timestamp: newCommand.response.timestamp,
        type: 'command',
        message: `> ${newCommand.command}`
      }
      
      const responseLog: LogEntry = {
        id: Date.now() + 1,
        timestamp: newCommand.response.timestamp,
        type: newCommand.response.type,
        message: newCommand.response.output
      }
      
      setLogs(prev => [...prev.slice(-8), commandLog, responseLog])
    }
  }, [newCommand])

  // Ghost whispers subscription
  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    const setupSubscription = async () => {
      const subscription = supabase.channel('ghosts')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'logs' }, payload => {
          if (payload.new && payload.new.type === 'ghost_whisper') {
            const ghostLog: LogEntry = {
              id: payload.new.id,
              timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
              type: 'ghost_whisper',
              message: `👻 ${payload.new.message}`
            }
            setLogs(prev => [...prev.slice(-9), ghostLog])
          }
        })
        .subscribe()

      const result = await subscription
      if (result && result.unsubscribe) {
        unsubscribe = result.unsubscribe
      }
    }

    setupSubscription()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  useEffect(() => {
    // Simulate periodic system messages
    const interval = setInterval(() => {
      const messages = [
        'System heartbeat - all modules operational',
        'Scanning for anomalous network activity...',
        'Memory defragmentation in progress',
        'Ghost signatures detected in subsector 7',
        'Quantum encryption keys rotated successfully',
        'Neural pathway optimization complete',
        'Spectral analysis of local network traffic',
        'Phantom protocols maintaining stealth integrity'
      ]
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      const newLog: LogEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: Math.random() > 0.8 ? 'warning' : 'info',
        message: randomMessage
      }
      
      setLogs(prev => [...prev.slice(-9), newLog])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'error': return 'text-red-400'
      case 'warning': return 'text-yellow-400'
      case 'success': return 'text-emerald-400'
      case 'command': return 'text-purple-400'
      case 'ghost_whisper': return 'text-purple-400/80'
      default: return 'text-emerald-400/70'
    }
  }

  const getLogPrefix = (type: LogEntry['type']) => {
    switch (type) {
      case 'error': return '[ERROR]'
      case 'warning': return '[WARN]'
      case 'success': return '[OK]'
      case 'command': return '[CMD]'
      case 'ghost_whisper': return '[GHOST]'
      default: return '[INFO]'
    }
  }

  return (
    <div className={`bg-black/60 backdrop-blur-sm border border-emerald-400/20 rounded-lg p-4 h-80 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-emerald-400 font-mono text-sm">SYSTEM_LOG</h3>
        <div className="text-emerald-400/40 font-mono text-xs">
          LIVE_FEED
          <span className="ml-2 w-2 h-2 bg-emerald-400 rounded-full inline-block animate-pulse"></span>
        </div>
      </div>
      
      <div className="h-full overflow-hidden">
        <div className="space-y-1 font-mono text-xs">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-300">
              <span className="text-emerald-400/40 shrink-0">
                [{log.timestamp}]
              </span>
              <span className={`shrink-0 ${getLogColor(log.type)}`}>
                {getLogPrefix(log.type)}
              </span>
              <span className={`${getLogColor(log.type)} break-words`}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-emerald-400/10">
        <div className="text-emerald-400/30 font-mono text-xs">
          Buffer: {logs.length}/10 | Memory: 2.7GB/8GB | CPU: 12.4%
        </div>
      </div>
    </div>
  )
}