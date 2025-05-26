import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [glitchText, setGlitchText] = useState('SYSTEM_ONLINE')
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [matrixChars, setMatrixChars] = useState<string[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const glitchTimer = setInterval(() => {
      const phrases = ['NEURAL_LINK_ACTIVE', 'CYBERDECK_ONLINE', 'MATRIX_ACCESS', 'DATA_STREAM', 'QUANTUM_STATE']
      setGlitchText(phrases[Math.floor(Math.random() * phrases.length)])
    }, 2000)

    return () => clearInterval(glitchTimer)
  }, [])

  useEffect(() => {
    const matrixTimer = setInterval(() => {
      const chars = '0123456789ABCDEF'.split('')
      setMatrixChars(Array.from({ length: 50 }, () => chars[Math.floor(Math.random() * chars.length)]))
    }, 100)

    return () => clearInterval(matrixTimer)
  }, [])

  useEffect(() => {
    const bootSequence = [
      '> INITIALIZING CYBERDECK...',
      '> LOADING NEURAL INTERFACE...',
      '> CONNECTING TO MAINFRAME...',
      '> ENCRYPTION PROTOCOLS ACTIVE',
      '> WELCOME TO THE MATRIX'
    ]
    
    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line])
      }, index * 800)
    })
  }, [])

  const formatTime = (date: Date) => {
    const time = date.toLocaleTimeString('en-US', {
      hour12: false,
    })
    const dateStr = date.toISOString().split('T')[0]
    return {
      time,
      date: dateStr,
    }
  }

  const handleTerminalInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTerminalLines(prev => [...prev, `> ${currentInput}`, '  ACCESS_GRANTED'])
      setCurrentInput('')
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
      {/* Matrix Background */}
      <div className="absolute inset-0 opacity-10">
        {matrixChars.map((char, i) => (
          <div
            key={i}
            className="absolute text-xs animate-pulse"
            style={{
              left: `${(i % 20) * 5}%`,
              top: `${Math.floor(i / 20) * 10}%`,
              animationDelay: `${i * 0.1}s`
            }}
          >
            {char}
          </div>
        ))}
      </div>

      {/* Scanlines Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400 to-transparent opacity-5 animate-pulse" />

      <div className="relative z-10 p-8">
        {/* Header with Glitch Effect */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-cyan-400 mb-4 animate-pulse">
            ◄ CYBERDECK ►
          </h1>
          <div className="text-xl text-red-400 animate-bounce">
            [{glitchText}]
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System Clock */}
          <div className="border border-green-400 p-6 bg-black bg-opacity-80">
            <h2 className="text-cyan-400 text-xl mb-4 border-b border-cyan-400 pb-2">
              SYSTEM_CLOCK
            </h2>
            <div className="text-3xl text-green-300 font-bold">
              {formatTime(currentTime).time}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              DATE: {formatTime(currentTime).date}
            </div>
          </div>

          {/* Terminal Window */}
          <div className="border border-green-400 p-6 bg-black bg-opacity-80">
            <h2 className="text-cyan-400 text-xl mb-4 border-b border-cyan-400 pb-2">
              TERMINAL_LOG
            </h2>
            <div className="h-32 overflow-y-auto text-sm">
              {terminalLines.map((line, i) => (
                <div key={i} className="text-green-300 animate-pulse">
                  {line}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleTerminalInput}
              className="w-full bg-transparent border-b border-green-400 text-green-400 focus:outline-none mt-4 py-1"
              placeholder="> ENTER_COMMAND"
            />
          </div>

          {/* Access Links */}
          <div className="border border-green-400 p-6 bg-black bg-opacity-80">
            <h2 className="text-cyan-400 text-xl mb-4 border-b border-cyan-400 pb-2">
              NET_ACCESS
            </h2>
            <div className="space-y-3">
              <a
                className="block text-green-400 hover:text-cyan-400 hover:bg-green-400 hover:bg-opacity-10 p-2 border border-transparent hover:border-cyan-400 transition-all"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                ► REACT_DATABASE
              </a>
              <a
                className="block text-green-400 hover:text-cyan-400 hover:bg-green-400 hover:bg-opacity-10 p-2 border border-transparent hover:border-cyan-400 transition-all"
                href="https://tanstack.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ► TANSTACK_ARCHIVES
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="animate-pulse">
            MODIFY src/routes/index.tsx TO ALTER REALITY
          </p>
        </div>
      </div>
    </div>
  )
}
