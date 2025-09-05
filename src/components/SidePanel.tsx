import { useState } from 'react'
import { 
  Cpu, 
  Ghost, 
  FileText, 
  Settings, 
  HardDrive,
  ChevronRight,
  User
} from 'lucide-react'

interface SidePanelProps {
  className?: string
  onConfigClick?: () => void
  onAuthClick?: () => void
}

export function SidePanel({ className = '', onConfigClick, onAuthClick }: SidePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const menuItems = [
    { icon: Cpu, label: 'Modules', id: 'modules', action: () => console.log('Accessing modules...') },
    { icon: Ghost, label: 'Ghosts', id: 'ghosts', action: () => console.log('Accessing ghosts...') },
    { icon: FileText, label: 'Logs', id: 'logs', action: () => console.log('Accessing logs...') },
    { icon: Settings, label: 'Config', id: 'config', action: onConfigClick },
    { icon: HardDrive, label: 'Memory Core', id: 'memory', action: () => console.log('Accessing memory core...') },
    { icon: User, label: 'Auth', id: 'auth', action: onAuthClick },
  ]

  return (
    <div 
      className={`fixed right-0 top-0 h-full z-50 ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={`h-full bg-black/80 backdrop-blur-sm border-l border-emerald-400/20 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-emerald-400/10">
          <div className="flex items-center gap-3">
            <ChevronRight 
              className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
            {isExpanded && (
              <span className="text-emerald-400 font-mono text-sm">NEURAL_MENU</span>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-400/10 transition-all duration-200 group"
              onClick={item.action}
            >
              <item.icon className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
              {isExpanded && (
                <span className="text-emerald-400 font-mono text-sm group-hover:text-emerald-300">
                  {item.label}
                </span>
              )}
              {!isExpanded && (
                <div className="fixed left-20 bg-black/90 backdrop-blur-sm border border-emerald-400/30 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-emerald-400 font-mono text-xs whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="absolute bottom-4 left-0 right-0 p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            {isExpanded && (
              <span className="text-emerald-400/60 font-mono text-xs">
                SYSTEM_READY
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}