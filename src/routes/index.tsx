import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import logo from '../logo.svg'

const TIME_ZONES = [
  { label: 'Local', value: Intl.DateTimeFormat().resolvedOptions().timeZone },
  { label: 'UTC', value: 'UTC' },
  { label: 'New York', value: 'America/New_York' },
  { label: 'London', value: 'Europe/London' },
  { label: 'Tokyo', value: 'Asia/Tokyo' },
]

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedTimeZone, setSelectedTimeZone] = useState(TIME_ZONES[0].value)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      timeZone: selectedTimeZone,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: selectedTimeZone,
    })
  }

  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)]">
        <img
          src={logo}
          className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          <span className="block mb-4 text-2xl font-mono bg-black bg-opacity-30 px-4 py-2 rounded-lg">
            {formatTime(currentTime)}
            <select 
              value={selectedTimeZone}
              onChange={(e) => setSelectedTimeZone(e.target.value)}
              className="block mt-2 text-sm bg-black bg-opacity-50 text-gray-300 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {TIME_ZONES.map((tz) => (
                <option 
                  key={tz.value} 
                  value={tz.value}
                  className="bg-gray-800 text-white"
                >
                  {tz.label}
                </option>
              ))}
            </select>
            <span className="block text-lg text-gray-300 mt-1">
              {formatDate(currentTime)}
            </span>
          </span>
        </p>
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
      </header>
    </div>
  )
}
