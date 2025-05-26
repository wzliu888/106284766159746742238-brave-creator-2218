import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: CyberMatrix,
})

interface TerminalLine {
  id: number
  text: string
  type: 'system' | 'warning' | 'success' | 'error' | 'data'
  timestamp: string
}

interface SystemStat {
  label: string
  value: number
  max: number
  unit: string
  color: string
}

function CyberMatrix() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([])
  const [systemStats, setSystemStats] = useState<SystemStat[]>([
    { label: 'CPU', value: 45, max: 100, unit: '%', color: 'from-cyan-500 to-blue-500' },
    { label: 'RAM', value: 67, max: 100, unit: '%', color: 'from-green-500 to-emerald-500' },
    { label: 'NET', value: 23, max: 100, unit: 'Mb/s', color: 'from-purple-500 to-pink-500' },
    { label: 'SYN', value: 89, max: 100, unit: '%', color: 'from-orange-500 to-red-500' },
  ])
  const [glitchActive, setGlitchActive] = useState(false)
  const [matrixRain, setMatrixRain] = useState<string[]>([])

  const terminalMessages = [
    { text: '> NEURAL LINK ESTABLISHED', type: 'success' as const },
    { text: '> QUANTUM ENCRYPTION ACTIVE', type: 'system' as const },
    { text: '> DATA STREAM: SYNCHRONIZED', type: 'data' as const },
    { text: '> FIREWALL STATUS: OPTIMAL', type: 'success' as const },
    { text: '! ANOMALY DETECTED: SECTOR 7', type: 'warning' as const },
    { text: '> CYBER DEFENSE: ONLINE', type: 'system' as const },
    { text: '> MATRIX ACCESS: GRANTED', type: 'success' as const },
    { text: 'X CONNECTION UNSTABLE', type: 'error' as const },
    { text: '> RETINAL SCAN: APPROVED', type: 'data' as const },
    { text: '> GHOST PROTOCOL: INITIATED', type: 'system' as const },
  ]

  const matrixChars = '01'

  const generateMatrixRain = useCallback(() => {
    const columns = 20
    const newRain = Array.from({ length: columns }, () => 
      Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => 
        matrixChars[Math.floor(Math.random() * matrixChars.length)]
      ).join('')
    )
    setMatrixRain(newRain)
  }, [])

  const addTerminalLine = useCallback((message: typeof terminalMessages[0]) => {
    const newLine: TerminalLine = {
      id: Date.now() + Math.random(),
      text: message.text,
      type: message.type,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
    }
    
    setTerminalLines(prev => {
      const updated = [...prev, newLine]
      return updated.length > 8 ? updated.slice(-8) : updated
    })
  }, [])

  const updateSystemStats = useCallback(() => {
    setSystemStats(prev => prev.map(stat => ({
      ...stat,
      value: Math.max(10, Math.min(stat.max, stat.value + (Math.random() - 0.5) * 20))
    })))
  }, [])

  const triggerGlitch = useCallback(() => {
    setGlitchActive(true)
    setTimeout(() => setGlitchActive(false), 200)
  }, [])

  useEffect(() => {
    const timeTimer = setInterval(() => setCurrentTime(new Date()), 1000)
    const terminalTimer = setInterval(() => {
      const randomMessage = terminalMessages[Math.floor(Math.random() * terminalMessages.length)]
      addTerminalLine(randomMessage)
    }, 2000)
    const statsTimer = setInterval(updateSystemStats, 1500)
    const glitchTimer = setInterval(() => {
      if (Math.random() < 0.1) triggerGlitch()
    }, 3000)
    const matrixTimer = setInterval(generateMatrixRain, 500)

    generateMatrixRain()
    addTerminalLine({ text: '> SYSTEM INITIALIZATION COMPLETE', type: 'success' })

    return () => {
      clearInterval(timeTimer)
      clearInterval(terminalTimer)
      clearInterval(statsTimer)
      clearInterval(glitchTimer)
      clearInterval(matrixTimer)
    }
  }, [addTerminalLine, updateSystemStats, triggerGlitch, generateMatrixRain])

  const formatTime = (date: Date) => {
    return {
      time: date.toLocaleTimeString('en-US', { hour12: false }),
      date: date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      }),
    }
  }

  const getTypeColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'success': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'error': return 'text-red-400'
      case 'data': return 'text-blue-400'
      default: return 'text-cyan-400'
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden relative">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {matrixRain.map((column, i) => (
          <div
            key={i}
            className="absolute top-0 font-mono text-xs animate-pulse"
            style={{
              left: `${(i * 5)}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '2s'
            }}
          >
            {column.split('').map((char, j) => (
              <div
                key={j}
                className="block opacity-70"
                style={{
                  animationDelay: `${j * 0.05}s`,
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className={`grid grid-cols-12 gap-4 p-6 h-screen ${glitchActive ? 'animate-pulse filter hue-rotate-180' : ''}`}>
        
        {/* Header Section */}
        <div className="col-span-12 border border-cyan-500 bg-black bg-opacity-80 p-4 rounded-lg shadow-lg shadow-cyan-500/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="font-mono text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                CYBER.MATRIX.NET
              </span>
            </div>
            <div className="text-right font-mono">
              <div className="text-2xl font-bold text-cyan-400">
                {formatTime(currentTime).time}
              </div>
              <div className="text-sm text-gray-400">
                {formatTime(currentTime).date.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* System Stats */}
        <div className="col-span-6 border border-green-500 bg-black bg-opacity-80 p-4 rounded-lg shadow-lg shadow-green-500/20">
          <h3 className="text-green-400 font-mono mb-3 text-lg font-bold">SYSTEM METRICS</h3>
          <div className="space-y-3">
            {systemStats.map((stat) => (
              <div key={stat.label} className="flex justify-between items-center">
                <span className="font-mono text-sm text-gray-300">{stat.label}:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-800 rounded overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color} transition-all duration-500 rounded`}
                      style={{ width: `${(stat.value / stat.max) * 100}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs w-12 text-right">
                    {Math.round(stat.value)}{stat.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Output */}
        <div className="col-span-6 border border-purple-500 bg-black bg-opacity-80 p-4 rounded-lg shadow-lg shadow-purple-500/20">
          <h3 className="text-purple-400 font-mono mb-3 text-lg font-bold">NEURAL INTERFACE</h3>
          <div className="space-y-1 text-xs font-mono h-32 overflow-hidden">
            {terminalLines.map((line) => (
              <div key={line.id} className="flex items-center space-x-2">
                <span className="text-gray-500 text-xs">[{line.timestamp}]</span>
                <span className={getTypeColor(line.type)}>{line.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Central Display */}
        <div className="col-span-8 border border-blue-500 bg-black bg-opacity-80 p-6 rounded-lg shadow-lg shadow-blue-500/20 flex flex-col justify-center items-center">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-2 border-cyan-500 rounded-full animate-spin" style={{ animationDuration: '4s' }} />
              <div className="absolute inset-2 border-2 border-green-400 rounded-full animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
              <div className="absolute inset-4 border-2 border-purple-400 rounded-full animate-spin" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full animate-pulse flex items-center justify-center">
                  <span className="text-black font-bold text-xl">Ψ</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 mb-4">
              QUANTUM NEXUS
            </h2>
            
            <p className="text-gray-400 mb-6 font-mono">
              Reality.exe has stopped working. Welcome to the Matrix.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <a
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cyan-500 bg-black bg-opacity-60 p-3 rounded-lg hover:bg-cyan-500 hover:text-black transition-all duration-300 font-mono text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/50"
              >
                <div className="text-sm font-bold mb-1">REACT.NET</div>
                <div className="text-xs opacity-80">Neural Framework</div>
              </a>
              <a
                href="https://tanstack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-purple-500 bg-black bg-opacity-60 p-3 rounded-lg hover:bg-purple-500 hover:text-black transition-all duration-300 font-mono text-purple-400 hover:shadow-lg hover:shadow-purple-500/50"
              >
                <div className="text-sm font-bold mb-1">TANSTACK</div>
                <div className="text-xs opacity-80">Data Conduit</div>
              </a>
            </div>
          </div>
        </div>

        {/* Code Matrix */}
        <div className="col-span-4 border border-red-500 bg-black bg-opacity-80 p-4 rounded-lg shadow-lg shadow-red-500/20">
          <h3 className="text-red-400 font-mono mb-3 text-lg font-bold">CODE.MATRIX</h3>
          <div className="text-xs font-mono space-y-1 text-gray-500">
            <div className="text-green-400">&gt; src/routes/index.tsx</div>
            <div className="text-yellow-400">function CyberMatrix() &#123;</div>
            <div className="pl-4 text-cyan-400">const [reality, setReality] = useState(false)</div>
            <div className="pl-4 text-purple-400">const [matrix, setMatrix] = useState(true)</div>
            <div className="pl-4 text-green-400">return &lt;Enlightenment /&gt;</div>
            <div className="text-yellow-400">&#125;</div>
            <div className="mt-2 text-red-400">// The Matrix has you...</div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="col-span-12 border border-gray-500 bg-black bg-opacity-80 p-2 rounded-lg text-center">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-green-400">STATUS: CONNECTED</span>
            <span className="text-yellow-400">PROTOCOL: HTTPS/3.0</span>
            <span className="text-cyan-400">ENCRYPTION: AES-256-QUANTUM</span>
            <span className="text-purple-400">LOCATION: SECTOR-7</span>
          </div>
        </div>
      </div>
    </div>
  )
}
