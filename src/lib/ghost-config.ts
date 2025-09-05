// Ghost Configuration Management
// Manages user preferences and ghost protocol settings

export interface GhostConfig {
  theme: 'gothic' | 'cyber' | 'phantom'
  rain: boolean
  voice: 'crow' | 'phantom' | 'echo'
  agent: 'primus' | 'shadow' | 'void'
  memory: boolean
  glow: 'off' | 'low' | 'medium' | 'high'
  ghostMode: boolean
  soundEnabled: boolean
}

const DEFAULT_CONFIG: GhostConfig = {
  theme: 'gothic',
  rain: true,
  voice: 'crow',
  agent: 'primus',
  memory: true,
  glow: 'low',
  ghostMode: true,
  soundEnabled: false
}

// Local storage key for config persistence
const CONFIG_KEY = 'headless_horseman_config'

export class GhostConfigManager {
  private config: GhostConfig
  private listeners: ((config: GhostConfig) => void)[] = []

  constructor() {
    this.config = this.loadConfig()
  }

  private loadConfig(): GhostConfig {
    try {
      const saved = localStorage.getItem(CONFIG_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...DEFAULT_CONFIG, ...parsed }
      }
    } catch (error) {
      console.warn('Failed to load ghost config:', error)
    }
    return { ...DEFAULT_CONFIG }
  }

  private saveConfig(): void {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify(this.config))
      this.notifyListeners()
    } catch (error) {
      console.warn('Failed to save ghost config:', error)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.config))
  }

  // Public API
  getConfig(): GhostConfig {
    return { ...this.config }
  }

  updateConfig(updates: Partial<GhostConfig>): void {
    this.config = { ...this.config, ...updates }
    this.saveConfig()
  }

  resetConfig(): void {
    this.config = { ...DEFAULT_CONFIG }
    this.saveConfig()
  }

  // Specific setters for common operations
  setGhostMode(enabled: boolean): void {
    this.updateConfig({ ghostMode: enabled })
  }

  setRainEffect(enabled: boolean): void {
    this.updateConfig({ rain: enabled })
  }

  setGlowLevel(level: GhostConfig['glow']): void {
    this.updateConfig({ glow: level })
  }

  // Event subscription
  subscribe(listener: (config: GhostConfig) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  // Export/import for backup
  exportConfig(): string {
    return JSON.stringify(this.config, null, 2)
  }

  importConfig(configJson: string): boolean {
    try {
      const imported = JSON.parse(configJson)
      this.updateConfig(imported)
      return true
    } catch (error) {
      console.error('Failed to import config:', error)
      return false
    }
  }
}

// Global instance
export const ghostConfig = new GhostConfigManager()