// Mock Supabase client for Headless Horseman
// In production, replace with actual Supabase configuration

interface MockUser {
  id: string
  email: string
  user_metadata?: any
}

interface AuthResponse {
  error: Error | null
  user: MockUser | null
}

// Mock Supabase client
class MockSupabaseClient {
  auth = {
    async signInWithPassword({ email, password }: { email: string, password: string }): Promise<AuthResponse> {
      // Mock authentication - always succeeds for demo
      if (email && password) {
        return {
          error: null,
          user: {
            id: `ghost_${Date.now()}`,
            email,
            user_metadata: { ghost_mode: true }
          }
        }
      }
      return {
        error: new Error('Invalid credentials'),
        user: null
      }
    },

    async signInWithOtp({ email }: { email: string }): Promise<{ error: Error | null }> {
      console.log(`🔮 Magic link sent to ${email} (mock)`)
      return { error: null }
    },

    async signOut(): Promise<{ error: Error | null }> {
      return { error: null }
    },

    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Mock auth state changes
      return {
        data: { subscription: {} },
        unsubscribe: () => {}
      }
    }
  }

  // Mock real-time channels
  channel(name: string) {
    let intervalId: NodeJS.Timeout | null = null

    return {
      on: (event: string, options: any, callback: (payload: any) => void) => {
        // Return an object with subscribe method to match Supabase API
        return {
          subscribe: () => {
            console.log(`👻 Subscribed to channel: ${name}`)
            
            // Simulate periodic ghost whispers
            intervalId = setInterval(() => {
              if (name === 'ghosts') {
                const ghostMessages = [
                  'A phantom rider passes through the network...',
                  'Spectral data detected in sector 7...',
                  'Ghost protocol activation confirmed...',
                  'Neural pathways realigning...',
                  'Echoes from the void detected...'
                ]
                
                callback({
                  eventType: 'INSERT',
                  new: {
                    id: Date.now(),
                    message: ghostMessages[Math.floor(Math.random() * ghostMessages.length)],
                    timestamp: new Date().toISOString(),
                    type: 'ghost_whisper'
                  }
                })
              }
            }, 15000 + Math.random() * 10000) // Random interval between 15-25 seconds

            return Promise.resolve({ 
              status: 'SUBSCRIBED',
              unsubscribe: () => {
                if (intervalId) {
                  clearInterval(intervalId)
                  intervalId = null
                }
              }
            })
          }
        }
      }
    }
  }
}

export const supabase = new MockSupabaseClient()

// Auth functions
export async function signIn(email: string, password: string) {
  let { error, user } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    // fallback to magic link
    await supabase.auth.signInWithOtp({ email })
    return { error: null, user, magicLinkSent: true }
  }
  return { error, user, magicLinkSent: false }
}