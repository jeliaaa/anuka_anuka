'use client'

import { useEffect, useState } from 'react'

// 💕 Change this to your start date/time
const START_DATE = new Date('2025-05-22T21:00:00')

type TimeUnit = {
  label: string
  value: number
  emoji: string
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

const MESSAGES = [
  "every second with you is a gift 💝",
  "you make every moment sparkle ✨",
  "together is my favourite place 🌸",
  "loving you is my favourite thing 💕",
  "you are my home 🏡💖",
]

export default function CountdownPage() {
  const [time, setTime] = useState(getElapsed())
  const [msgIndex, setMsgIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setTime(getElapsed()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length)
        setVisible(true)
      }, 400)
    }, 4000)
    return () => clearInterval(cycle)
  }, [])

  const units: TimeUnit[] = time
    ? [
        { label: 'years',   value: time.years,   emoji: '🌟' },
        { label: 'days',    value: time.days,    emoji: '🌸' },
        { label: 'hours',   value: time.hours,   emoji: '💫' },
        { label: 'minutes', value: time.minutes, emoji: '🌷' },
        { label: 'seconds', value: time.seconds, emoji: '💕' },
      ]
    : []

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-12">

      {/* Header */}
      <div className="text-center mb-12 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
        <p className="font-body text-blush-400 text-sm tracking-widest uppercase mb-3">we have been together for</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold shimmer-text leading-tight">
          a beautiful journey
        </h1>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-blush-300" />
          <span className="text-xl animate-heart-beat">💖</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-blush-300" />
        </div>
      </div>

      {/* Countdown grid */}
      {time ? (
        <div className="grid grid-cols-5 gap-2 sm:gap-4 w-full max-w-3xl mb-12">
          {units.map((unit, i) => (
            <div
              key={unit.label}
              className="animate-fade-up"
              style={{ animationDelay: `${0.2 + i * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
            >
              <div className="glass rounded-2xl sm:rounded-3xl p-3 sm:p-6 text-center card-hover border border-blush-200/60 shadow-lg shadow-blush-100/50">
                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{unit.emoji}</div>
                <div className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-blush-500 count-num leading-none">
                  {unit.label === 'seconds' || unit.label === 'minutes' || unit.label === 'hours'
                    ? pad(unit.value)
                    : unit.value}
                </div>
                <div className="font-body text-blush-400 text-xs sm:text-sm mt-1 sm:mt-2 capitalize">
                  {unit.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-3xl p-8 text-center mb-12 border border-blush-200">
          <p className="font-display text-2xl text-blush-500">Our adventure begins on May 22nd 💕</p>
        </div>
      )}

      {/* Rotating message */}
      <div
        className="text-center transition-opacity duration-400"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className="font-display italic text-lg sm:text-xl text-blush-500">
          {MESSAGES[msgIndex]}
        </p>
      </div>

      {/* Date started */}
      <div
        className="mt-10 glass rounded-2xl px-6 py-4 border border-blush-200/60 text-center animate-fade-up"
        style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}
      >
        <p className="font-body text-blush-400 text-xs sm:text-sm">
          started on <span className="font-semibold text-blush-500">May 22nd, 2025 at 9:00 PM</span> 🌙
        </p>
      </div>
    </div>
  )
}
