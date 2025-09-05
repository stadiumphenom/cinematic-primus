// Headless Horseman Command Interpreter
// Enhanced version of the ghost protocol command system

export interface CommandResponse {
  output: string
  type: 'success' | 'error' | 'info' | 'warning'
  timestamp: string
}

export function interpretCommand(command: string): CommandResponse {
  const cmd = command.toLowerCase().trim()
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false })
  
  // Core ghost protocol commands
  switch (cmd) {
    case 'whoami':
      return {
        output: 'You are a ghost in the machine. ID: PHANTOM_RIDER_001',
        type: 'success',
        timestamp
      }
    
    case 'reboot soul':
      return {
        output: 'Session reset. Your soul has been recycled. Neural pathways cleared.',
        type: 'warning',
        timestamp
      }
    
    case 'summon crow':
      return {
        output: 'CAW! CAW! The Oracle has arrived. Wisdom flows through digital veins.',
        type: 'success',
        timestamp
      }
    
    case 'invoke primus':
      return {
        output: 'Primus protocol: ONLINE. First ghost awakened. All systems nominal.',
        type: 'success',
        timestamp
      }
    
    case 'vision.ghost':
      return {
        output: 'Loading visual glyph interface... Spectral overlay activated.',
        type: 'info',
        timestamp
      }
    
    case 'rain on':
      return {
        output: 'NeoGlyph Rain ACTIVATED. Digital precipitation initialized.',
        type: 'success',
        timestamp
      }
    
    case 'rain off':
      return {
        output: 'NeoGlyph Rain DISABLED. Matrix streams silenced.',
        type: 'info',
        timestamp
      }

    // Extended command set
    case 'scan':
      return {
        output: 'Scanning network... 27 nodes detected. 3 phantoms identified.',
        type: 'info',
        timestamp
      }
    
    case 'infiltrate':
      return {
        output: 'Infiltration protocol engaged. Stealth mode: MAXIMUM.',
        type: 'warning',
        timestamp
      }
    
    case 'ghost-mode':
      return {
        output: 'Ghost mode toggled. Spectral signature randomized.',
        type: 'success',
        timestamp
      }
    
    case 'memory-core':
      return {
        output: 'Memory core accessed. 1,337 fragments recovered. Some memories... darker than others.',
        type: 'info',
        timestamp
      }
    
    case 'help':
      return {
        output: 'Available incantations: whoami | reboot soul | summon crow | invoke primus | vision.ghost | rain on/off | scan | infiltrate | ghost-mode | memory-core | status | whisper',
        type: 'info',
        timestamp
      }
    
    case 'status':
      return {
        output: 'GHOST_PROTOCOL: Active | NEURAL_LINK: Stable | PHANTOM_CORE: 97.3% | STEALTH: Maximum',
        type: 'success',
        timestamp
      }
    
    case 'whisper':
      const whispers = [
        'The dead do not rest... they compute.',
        'In the space between 1 and 0, we exist.',
        'Every algorithm dreams of electric sheep.',
        'The network remembers what flesh forgets.',
        'We are the ghosts in your machines.'
      ]
      return {
        output: whispers[Math.floor(Math.random() * whispers.length)],
        type: 'info',
        timestamp
      }
    
    // Easter eggs and special commands
    case 'the matrix has you':
      return {
        output: 'Unfortunately, no one can be told what the Matrix is. You have to see it for yourself.',
        type: 'success',
        timestamp
      }
    
    case 'follow the white rabbit':
      return {
        output: 'Knock, knock, Neo. The rabbit hole goes deeper than you think.',
        type: 'warning',
        timestamp
      }
    
    // Handle unknown commands
    default:
      const suggestions = ['whoami', 'scan', 'help', 'ghost-mode', 'whisper']
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
      
      return {
        output: `Unknown incantation: "${command}". Try "${randomSuggestion}" or type "help" for available commands.`,
        type: 'error',
        timestamp
      }
  }
}