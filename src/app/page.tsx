'use client'

import { useEffect, useState } from 'react'
import BinaryStar from '@/components/BinaryStar'

// Change this to your start date/time
const START_DATE = new Date('2025-05-22T21:00:00')

type Segment = {
  label: string
  value: number
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function getElapsed() {
  const now = new Date()
  const diff = now.getTime() - START_DATE.getTime()

  if (diff < 0) return null

  const totalSeconds = Math.floor(diff / 1000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const totalHours = Math.floor(totalMinutes / 60)
  const hours = totalHours % 24
  const totalDays = Math.floor(totalHours / 24)
  const years = Math.floor(totalDays / 365)
  const days = totalDays % 365

  return { years, days, hours, minutes, seconds }
}

const NOTES = [
  "every second with you is a gift",
  "you make every moment sparkle",
  "together is my favourite place",
  "loving you is my favourite thing",
  "you are my home",
]

export default function CountdownPage() {
  const [time, setTime] = useState(getElapsed())
  const [noteIndex, setNoteIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setTime(getElapsed()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setNoteIndex(i => (i + 1) % NOTES.length)
        setVisible(true)
      }, 400)
    }, 4500)
    return () => clearInterval(cycle)
  }, [])

  const segments: Segment[] = time
    ? [
        { label: 'years', value: time.years },
        { label: 'days', value: time.days },
        { label: 'hours', value: time.hours },
        { label: 'min', value: time.minutes },
        { label: 'sec', value: time.seconds },
      ]
    : []

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-12">

      {/* Orbit graphic */}
      <div className="mb-6 animate-fade-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
        <BinaryStar size={88} />
      </div>

      {/* Header */}
      <div className="text-center mb-10 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
        <p className="tag mb-3">in continuous orbit since 2025.05.22</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium leading-tight">
          two stars, <span className="glow-text">one gravity</span>
        </h1>
      </div>

      {/* Elapsed readout */}
      {time ? (
        <div
          className="surface-dark rounded-2xl px-4 sm:px-10 py-6 sm:py-8 w-full max-w-3xl mb-10 animate-fade-up"
          style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <div className="flex flex-wrap items-end justify-center gap-x-2 sm:gap-x-6 gap-y-4">
            {segments.map((seg, i) => (
              <div key={seg.label} className="flex items-end">
                <div className="text-center px-1.5 sm:px-2">
                  <div className="readout font-display font-medium text-3xl sm:text-5xl md:text-6xl text-mist leading-none">
                    {seg.label === 'years' ? seg.value : pad(seg.value)}
                  </div>
                  <div className="tag mt-2 text-[0.6rem] sm:text-[0.65rem]">{seg.label}</div>
                </div>
                {i < segments.length - 1 && (
                  <div className="hidden sm:block text-muted text-2xl pb-5 px-1">·</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="surface-dark rounded-2xl p-8 text-center mb-10">
          <p className="font-display text-2xl">our log begins on 2025.05.22</p>
        </div>
      )}

      {/* Rotating note */}
      <div
        className="text-center transition-opacity duration-400 min-h-[2rem]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className="font-display italic text-lg sm:text-xl text-mist/90">
          &ldquo;{NOTES[noteIndex]}&rdquo;
        </p>
      </div>

      {/* Log start */}
      <div
        className="mt-10 surface rounded-xl px-6 py-3 text-center animate-fade-up"
        style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}
      >
        <p className="font-mono text-xs tracking-widest uppercase text-ink/70">
          log start &nbsp;—&nbsp; <span className="font-semibold text-ink">2025.05.22 · 21:00</span>
        </p>
      </div>
    </div>
  )
}
