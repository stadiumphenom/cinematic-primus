import { useState, useEffect } from 'react'
import { ghostConfig, GhostConfig } from '../lib/ghost-config'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Download, Upload, RotateCcw } from 'lucide-react'

interface ConfigPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function ConfigPanel({ isOpen, onClose }: ConfigPanelProps) {
  const [config, setConfig] = useState<GhostConfig>(ghostConfig.getConfig())

  useEffect(() => {
    const unsubscribe = ghostConfig.subscribe(newConfig => {
      setConfig(newConfig)
    })
    return unsubscribe
  }, [])

  const handleConfigChange = (key: keyof GhostConfig, value: any) => {
    ghostConfig.updateConfig({ [key]: value })
  }

  const handleExport = () => {
    const configJson = ghostConfig.exportConfig()
    const blob = new Blob([configJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ghost_protocol_config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          if (ghostConfig.importConfig(content)) {
            console.log('Configuration imported successfully')
          } else {
            console.error('Failed to import configuration')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleReset = () => {
    ghostConfig.resetConfig()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 backdrop-blur-sm border border-emerald-400/30 text-emerald-400 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-emerald-400 font-mono text-xl">
            GHOST PROTOCOL CONFIGURATION
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-2">
            <label className="text-emerald-400/70 font-mono text-sm">VISUAL_THEME</label>
            <Select
              value={config.theme}
              onValueChange={(value: GhostConfig['theme']) => handleConfigChange('theme', value)}
            >
              <SelectTrigger className="bg-black/60 border-emerald-400/30 text-emerald-400 font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-emerald-400/30">
                <SelectItem value="gothic" className="text-emerald-400 font-mono">Gothic Protocol</SelectItem>
                <SelectItem value="cyber" className="text-emerald-400 font-mono">Cyber Phantom</SelectItem>
                <SelectItem value="phantom" className="text-emerald-400 font-mono">Pure Phantom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Switches */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-emerald-400/70 font-mono text-sm">MATRIX_RAIN</label>
                <Switch
                  checked={config.rain}
                  onCheckedChange={(checked) => handleConfigChange('rain', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-emerald-400/70 font-mono text-sm">GHOST_MODE</label>
                <Switch
                  checked={config.ghostMode}
                  onCheckedChange={(checked) => handleConfigChange('ghostMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-emerald-400/70 font-mono text-sm">MEMORY_CORE</label>
                <Switch
                  checked={config.memory}
                  onCheckedChange={(checked) => handleConfigChange('memory', checked)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-emerald-400/70 font-mono text-sm">VOICE_ORACLE</label>
                <Select
                  value={config.voice}
                  onValueChange={(value: GhostConfig['voice']) => handleConfigChange('voice', value)}
                >
                  <SelectTrigger className="bg-black/60 border-emerald-400/30 text-emerald-400 font-mono text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-emerald-400/30">
                    <SelectItem value="crow" className="text-emerald-400 font-mono">Crow Oracle</SelectItem>
                    <SelectItem value="phantom" className="text-emerald-400 font-mono">Phantom Voice</SelectItem>
                    <SelectItem value="echo" className="text-emerald-400 font-mono">Digital Echo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-emerald-400/70 font-mono text-sm">AGENT_TYPE</label>
                <Select
                  value={config.agent}
                  onValueChange={(value: GhostConfig['agent']) => handleConfigChange('agent', value)}
                >
                  <SelectTrigger className="bg-black/60 border-emerald-400/30 text-emerald-400 font-mono text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-emerald-400/30">
                    <SelectItem value="primus" className="text-emerald-400 font-mono">Primus Core</SelectItem>
                    <SelectItem value="shadow" className="text-emerald-400 font-mono">Shadow Walker</SelectItem>
                    <SelectItem value="void" className="text-emerald-400 font-mono">Void Dancer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Glow Level */}
          <div className="space-y-2">
            <label className="text-emerald-400/70 font-mono text-sm">SPECTRAL_GLOW</label>
            <Select
              value={config.glow}
              onValueChange={(value: GhostConfig['glow']) => handleConfigChange('glow', value)}
            >
              <SelectTrigger className="bg-black/60 border-emerald-400/30 text-emerald-400 font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-emerald-400/30">
                <SelectItem value="off" className="text-emerald-400 font-mono">Disabled</SelectItem>
                <SelectItem value="low" className="text-emerald-400 font-mono">Subtle Glow</SelectItem>
                <SelectItem value="medium" className="text-emerald-400 font-mono">Medium Aura</SelectItem>
                <SelectItem value="high" className="text-emerald-400 font-mono">Full Spectral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-emerald-400/20">
            <Button
              onClick={handleExport}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10 font-mono"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
            
            <Button
              onClick={handleImport}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-emerald-400/40 text-emerald-400 hover:bg-emerald-400/10 font-mono"
            >
              <Upload className="w-4 h-4" />
              Import
            </Button>
            
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-red-400/40 text-red-400 hover:bg-red-400/10 font-mono ml-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>

          <div className="text-xs text-emerald-400/40 font-mono">
            Configuration is automatically saved to local neural storage.
            Export your config to preserve it across ghost sessions.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}