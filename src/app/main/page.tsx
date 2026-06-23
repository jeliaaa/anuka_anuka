'use client'

import { useEffect, useState } from 'react'
import BinaryStar from '@/components/BinaryStar'

const START_DATE = new Date('2026-05-22T21:00:00')

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
  "SenTan minda viyo sul",
  "SegWam gogooo",
  "Sentan erTad bodiali yvelaze metad asworebs",
  "toooooooooo",
  "Cemi cxovreba xar",
]

export default function MainPage() {
  const [time, setTime] = useState<ReturnType<typeof getElapsed>>(null)
  const [noteIndex, setNoteIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setTime(getElapsed())
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
        { label: 'წელი', value: time.years },
        { label: 'დღე', value: time.days },
        { label: 'საათი', value: time.hours },
        { label: 'წუთი', value: time.minutes },
        { label: 'წამი', value: time.seconds },
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
        <p className="mb-3 text-amber-300 text-2xl">bednieri var 2026.05.22-dan</p>
        <h1 className=" text-4xl sm:text-5xl md:text-6xl font-medium leading-tight">
          Cemi <span className="glow-text">anuka</span> aris Cemi <span className="glow-text">varskvlavi</span>
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
                  <div className="readout  font-medium text-3xl sm:text-5xl md:text-6xl text-mist leading-none">
                    {seg.label === 'weli' ? seg.value : pad(seg.value)}
                  </div>
                  <div className="heading_text mt-2 text-[1rem] sm:text-[1.3 rem]">{seg.label}</div>
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
          <p className=" text-2xl">Cveni kronika iwyeba 2026.05.22</p>
        </div>
      )}

      {/* Rotating note */}
      <div
        className="text-center transition-opacity duration-400 min-h-[2rem]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <p className=" italic text-xl sm:text-2xl text-mist/90">
          {NOTES[noteIndex]}
        </p>
      </div>

      {/* Log start */}
      <div
        className="mt-10 surface rounded-xl px-6 py-3 text-center animate-fade-up"
        style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}
      >
        <p className="text-xl tracking-widest  text-ink/70">
          dasawyisi · <span className="font-semibold text-ink">2026.05.22</span>
        </p>
      </div>
    </div>
  )
}
