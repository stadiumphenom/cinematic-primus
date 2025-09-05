import { useState } from 'react'
import { signIn } from '../lib/supabase'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (user: any) => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const { error, user, magicLinkSent } = await signIn(email, password)
      
      if (error) {
        setMessage('Authentication failed - credentials invalid')
        setMessageType('error')
      } else if (magicLinkSent) {
        setMessage('Magic link sent to your neural interface. Check your quantum inbox.')
        setMessageType('success')
      } else if (user) {
        setMessage(`Welcome back, ghost ${user.email}`)
        setMessageType('success')
        setTimeout(() => {
          onSuccess(user)
          onClose()
        }, 1500)
      }
    } catch (err) {
      setMessage('Connection to the ghost realm failed')
      setMessageType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 backdrop-blur-sm border border-emerald-400/30 text-emerald-400">
        <DialogHeader>
          <DialogTitle className="text-emerald-400 font-mono text-xl">
            GHOST AUTHENTICATION
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-emerald-400/70 font-mono text-sm">
              NEURAL_ID (Email)
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ghost@phantom.net"
              className="bg-black/60 border-emerald-400/30 text-emerald-400 font-mono"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-emerald-400/70 font-mono text-sm">
              SOUL_KEY (Password)
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="bg-black/60 border-emerald-400/30 text-emerald-400 font-mono"
              required
            />
          </div>

          {message && (
            <div className={`text-sm font-mono p-3 rounded border ${
              messageType === 'error' 
                ? 'text-red-400 border-red-400/30 bg-red-400/10' 
                : 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
            }`}>
              {message}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-emerald-400/20 hover:bg-emerald-400/30 border border-emerald-400/40 text-emerald-400 font-mono"
            >
              {isLoading ? 'CONNECTING...' : 'AUTHENTICATE'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-purple-400/40 text-purple-400 hover:bg-purple-400/10 font-mono"
            >
              ABORT
            </Button>
          </div>

          <div className="text-xs text-emerald-400/40 font-mono mt-4">
            First time? Enter any email/password - the ghost protocol will adapt.
            <br />
            Failed login triggers automatic magic link fallback.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}