import { useEffect, useRef } from 'react'

interface MatrixRainProps {
  className?: string
}

export function MatrixRain({ className = '' }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix characters - mix of letters, numbers, symbols, and glyphs
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'
    
    // Create three layers with different properties
    const layers = [
      { 
        drops: [], 
        fontSize: 14, 
        speed: 1, 
        color: '#00e2ff', 
        opacity: 0.8,
        density: 0.6
      },
      { 
        drops: [], 
        fontSize: 12, 
        speed: 1.5, 
        color: '#b46bff', 
        opacity: 0.6,
        density: 0.4
      },
      { 
        drops: [], 
        fontSize: 10, 
        speed: 2.2, 
        color: '#00e2ff', 
        opacity: 0.4,
        density: 0.3
      }
    ]

    // Initialize drops for each layer
    layers.forEach(layer => {
      const columns = Math.floor(canvas.width / layer.fontSize)
      layer.drops = Array(Math.floor(columns * layer.density)).fill(1).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        chars: Array(Math.floor(Math.random() * 20) + 10).fill('').map(() => 
          chars[Math.floor(Math.random() * chars.length)]
        )
      }))
    })

    const animate = () => {
      // Create trailing effect with semi-transparent black
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      layers.forEach(layer => {
        ctx.font = `${layer.fontSize}px 'JetBrains Mono', 'Courier New', monospace`
        
        layer.drops.forEach(drop => {
          // Add subtle glow effect
          ctx.shadowColor = layer.color
          ctx.shadowBlur = 2
          
          drop.chars.forEach((char, i) => {
            const alpha = layer.opacity * (1 - (i / drop.chars.length) * 0.8)
            ctx.fillStyle = layer.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
            
            // Occasionally use glitch red for dramatic effect
            if (Math.random() < 0.001) {
              ctx.fillStyle = '#ff4e4e' + Math.floor(alpha * 255).toString(16).padStart(2, '0')
            }
            
            ctx.fillText(char, drop.x, drop.y + i * layer.fontSize)
          })

          // Reset drop when it goes off screen
          if (drop.y > canvas.height + drop.chars.length * layer.fontSize) {
            drop.y = -drop.chars.length * layer.fontSize
            drop.x = Math.random() * canvas.width
            drop.chars = Array(Math.floor(Math.random() * 20) + 10).fill('').map(() => 
              chars[Math.floor(Math.random() * chars.length)]
            )
          }

          drop.y += layer.speed
        })
        
        ctx.shadowBlur = 0
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  )
}