import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

interface GlitchText {
  text: string
  isGlitching: boolean
}

const CyberTerminal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-black border border-cyan-500 rounded-md p-4 font-mono text-green-400 shadow-[0_0_20px_rgba(0,255,255,0.5)]">
      <div className="absolute top-2 left-2 flex space-x-1">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  )
}

const NeonButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative inline-block px-6 py-3 font-mono text-cyan-400 border border-cyan-400 bg-black hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] group"
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
    </a>
  )
}

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [glitchText, setGlitchText] = useState<GlitchText>({ text: 'CYBER_NEXUS_TERMINAL', isGlitching: false })
  const [systemStatus, setSystemStatus] = useState('ONLINE')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const glitchTimer = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchText({ text: generateGlitchText('CYBER_NEXUS_TERMINAL'), isGlitching: true })
        setTimeout(() => {
          setGlitchText({ text: 'CYBER_NEXUS_TERMINAL', isGlitching: false })
        }, 200)
      }
    }, 2000)

    const statusTimer = setInterval(() => {
      const statuses = ['ONLINE', 'SCANNING...', 'SECURE', 'ENCRYPTED', 'NEURAL_LINK_ACTIVE']
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 3000)

    return () => {
      clearInterval(timer)
      clearInterval(glitchTimer)
      clearInterval(statusTimer)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01アイウエオカキクケコサシスセソタツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#00ff00'
      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)
    return () => clearInterval(interval)
  }, [])

  const generateGlitchText = (original: string) => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~`'
    return original.split('').map(char => 
      Math.random() < 0.3 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
    ).join('')
  }

  const formatTime = (date: Date) => {
    const time = date.toLocaleTimeString('en-US', {
      hour12: true,
    })
    const dateStr = date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
    return {
      time,
      date: dateStr,
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30 pointer-events-none"
      />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-8 max-w-4xl w-full">
          <div className="mb-12">
            <h1 className={`text-6xl font-bold mb-4 tracking-wider ${
              glitchText.isGlitching 
                ? 'animate-pulse text-red-500 filter blur-sm' 
                : 'text-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.5)]'
            }`}>
              {glitchText.text}
            </h1>
            <div className="text-yellow-400 text-sm tracking-widest animate-pulse">
              [ SYSTEM_STATUS: {systemStatus} ]
            </div>
          </div>

          <CyberTerminal>
            <div className="space-y-4">
              <div className="text-cyan-300 text-xl">
                > TEMPORAL_COORDINATES:
              </div>
              <div className="ml-4 space-y-2">
                <div className="text-green-300 text-3xl font-bold tracking-wider animate-pulse">
                  {formatTime(currentTime).time}
                </div>
                <div className="text-yellow-300 text-lg">
                  {formatTime(currentTime).date}
                </div>
              </div>
              
              <div className="border-t border-gray-600 pt-4 mt-6">
                <div className="text-cyan-300">
                  > DEVELOPMENT_MODE: <span className="text-green-400">ACTIVE</span>
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  Edit <span className="text-cyan-400">src/routes/index.tsx</span> to modify neural pathways
                </div>
              </div>
            </div>
          </CyberTerminal>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <NeonButton href="https://reactjs.org">
              [ ACCESS_REACT_MAINFRAME ]
            </NeonButton>
            <NeonButton href="https://tanstack.com">
              [ ENTER_TANSTACK_GRID ]
            </NeonButton>
          </div>

          <div className="mt-16 text-xs text-gray-500 animate-pulse">
            <div>NEURAL_INTERFACE v2.1.47 | SECURITY_LEVEL: MAXIMUM</div>
            <div className="mt-1">CONNECTION: SECURED | ENCRYPTION: AES-256 | FIREWALL: ACTIVE</div>
          </div>
        </div>
      </div>
    </div>
  )
}
