import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: CyberApp,
})

function CyberApp() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [matrixChars, setMatrixChars] = useState('')
  const [glitchText, setGlitchText] = useState('SYSTEM.ONLINE')
  const [cpuUsage, setCpuUsage] = useState(Math.floor(Math.random() * 60) + 20)
  const [memUsage, setMemUsage] = useState(Math.floor(Math.random() * 40) + 30)
  const [networkPulse, setNetworkPulse] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setCpuUsage(prev => Math.max(10, Math.min(100, prev + (Math.random() - 0.5) * 10)))
      setMemUsage(prev => Math.max(10, Math.min(100, prev + (Math.random() - 0.5) * 8)))
      setNetworkPulse(prev => (prev + 1) % 100)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const matrixInterval = setInterval(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
      const newChars = Array.from({ length: 20 }, () => 
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('')
      setMatrixChars(newChars)
    }, 150)

    const glitchInterval = setInterval(() => {
      const phrases = ['SYSTEM.ONLINE', 'NEURAL.LINK.ACTIVE', 'QUANTUM.PROCESSING', 'CYBER.INTERFACE']
      setGlitchText(phrases[Math.floor(Math.random() * phrases.length)])
    }, 3000)

    return () => {
      clearInterval(matrixInterval)
      clearInterval(glitchInterval)
    }
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      const lines = [
        '> Initializing quantum processors...',
        '> Loading neural networks... OK',
        '> Establishing secure connection...',
        '> Cyber protocol activated.',
        '> Welcome to the Matrix.'
      ]
      
      let lineIndex = 0
      const typeInterval = setInterval(() => {
        if (lineIndex < lines.length && terminalRef.current) {
          const newLine = document.createElement('div')
          newLine.textContent = lines[lineIndex]
          newLine.className = 'text-green-400 mb-1 opacity-0 animate-pulse'
          terminalRef.current.appendChild(newLine)
          setTimeout(() => newLine.classList.remove('opacity-0'), 100)
          lineIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 800)

      return () => clearInterval(typeInterval)
    }
  }, [])

  const formatTime = (date: Date) => {
    const time = date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    const dateStr = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    return { time, date: dateStr }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-xs animate-pulse"
            style={{
              left: `${i * 2}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {matrixChars.charAt(i % matrixChars.length)}
          </div>
        ))}
      </div>

      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header HUD */}
        <div className="flex justify-between items-start mb-8">
          <div className="border border-green-400 p-4 bg-black bg-opacity-80">
            <div className="text-xs mb-2 text-green-300">SYSTEM STATUS</div>
            <div className="flex gap-4">
              <div>
                <span className="text-red-400">CPU:</span> {cpuUsage.toFixed(1)}%
                <div className="w-16 h-2 bg-gray-800 mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-red-500 transition-all duration-1000"
                    style={{ width: `${cpuUsage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <span className="text-blue-400">MEM:</span> {memUsage.toFixed(1)}%
                <div className="w-16 h-2 bg-gray-800 mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000"
                    style={{ width: `${memUsage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-green-400 p-4 bg-black bg-opacity-80">
            <div className="text-xs mb-2 text-green-300">CHRONOMETER</div>
            <div className="text-2xl font-bold text-green-400 mb-1">
              {formatTime(currentTime).time}
            </div>
            <div className="text-sm text-green-300">
              {formatTime(currentTime).date}
            </div>
          </div>
        </div>

        {/* Main Display */}
        <div className="text-center mb-8">
          <div className="mb-8">
            <div className="text-6xl font-bold mb-4 text-green-400 animate-pulse">
              <span className="inline-block transform hover:scale-110 transition-transform duration-300">C</span>
              <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-75">Y</span>
              <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-150">B</span>
              <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-225">E</span>
              <span className="inline-block transform hover:scale-110 transition-transform duration-300 delay-300">R</span>
            </div>
            <div className="text-2xl mb-4 text-blue-400" style={{textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'}}>
              {glitchText}
            </div>
          </div>

          {/* Pulsing Network Indicator */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-ping"></div>
              <div className="absolute inset-4 border border-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-8 border border-red-400 rounded-full animate-bounce"></div>
              <div className="absolute inset-12 bg-green-400 rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                NET
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Output */}
        <div className="border border-green-400 p-4 mb-8 bg-black bg-opacity-90 h-40 overflow-hidden">
          <div className="text-xs mb-2 text-green-300">TERMINAL OUTPUT</div>
          <div ref={terminalRef} className="text-sm"></div>
          <div className="flex items-center mt-2">
            <span className="text-green-400 mr-2">root@cyberspace:~$</span>
            <div className="w-2 h-4 bg-green-400 animate-pulse"></div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-8 mb-8">
          <a
            className="border border-green-400 px-6 py-2 hover:bg-green-400 hover:text-black transition-colors duration-300 transform hover:scale-105"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            [REACT.DOCS]
          </a>
          <a
            className="border border-blue-400 px-6 py-2 hover:bg-blue-400 hover:text-black transition-colors duration-300 transform hover:scale-105"
            href="https://tanstack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            [TANSTACK.CORE]
          </a>
        </div>

        {/* Bottom Status Bar */}
        <div className="border-t border-green-400 pt-4 text-center">
          <div className="text-xs text-green-300 mb-2">
            MODIFY src/routes/index.tsx TO REPROGRAM THE MATRIX
          </div>
          <div className="flex justify-center gap-4 text-xs">
            <span className="text-green-400">█ ONLINE</span>
            <span className="text-blue-400">█ SECURE</span>
            <span className="text-purple-400">█ QUANTUM</span>
            <span className="animate-pulse text-red-400">█ NEURAL_LINK</span>
          </div>
        </div>
      </div>
    </div>
  )
}
