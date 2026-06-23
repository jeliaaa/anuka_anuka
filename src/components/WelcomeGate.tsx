'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type Star = { w: number; h: number; top: string; left: string; delay: string }

function makeStars(): Star[] {
  return Array.from({ length: 40 }, () => ({
    w: Math.random() * 2 + 1,
    h: Math.random() * 2 + 1,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
  }))
}

export default function WelcomeGate({ onPass }: { onPass: () => void }) {
  const [showModal, setShowModal] = useState(false)
  const [date, setDate] = useState('')
  const [stars, setStars] = useState<Star[]>([])
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setStars(makeStars())
  }, [])
  const router = useRouter()

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    card.style.transform = `perspective(900px) rotateX(${-y * 18}deg) rotateY(${x * 18}deg) scale(1.04)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  function handleCheck() {
    if (date === '2026-05-22') {
      setShowModal(false)
      onPass()
    } else {
      router.push('/denied')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight cursor-pointer overflow-hidden"
      onClick={() => !showModal && setShowModal(true)}
    >
      {/* subtle star dots — client-only to avoid hydration mismatch */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-mist animate-twinkle"
            style={{ width: s.w, height: s.h, top: s.top, left: s.left, animationDelay: s.delay, opacity: 0.2 }}
          />
        ))}
      </div>

      {/* floating wrapper — provides the up/down drift */}
      <div className="animate-float">
        {/* 3D tilt card */}
        <div
          ref={cardRef}
          className="select-none transition-transform duration-300"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <h1
            className="font-medium text-center leading-tight"
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              color: '#ece8df',
              textShadow:
                '0 0 40px rgba(236,232,223,0.25), 0 0 100px rgba(232,168,87,0.12)',
              transform: 'translateZ(100px)'
            }}
          >
            gamarjoba
            <br />
            anuka
          </h1>
        </div>
      </div>

      {/* click hint */}
      <p
        className="absolute bottom-10 text-xs  tracking-widest text-muted animate-pulse"
        style={{ pointerEvents: 'none' }}
      >
        sadme daklike
      </p>

      {/* date modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-midnight/80 backdrop-blur-sm p-4"
          onClick={e => e.stopPropagation()}
        >
          <div className="surface rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl">
            <p className=" text-2xl mb-1">ra TariRia dRes?</p>
            <p className=" text-xs text-muted tracking-widest mb-6">
              airCie swori TariRi
            </p>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full font-mono px-4 py-3 rounded-lg border border-parchment-dim bg-white text-ink  text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-ember/40"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-lg border border-midnight-3 text-muted  text-xs  tracking-widest hover:text-ink transition-all"
              >
                gauqmeba
              </button>
              <button
                onClick={handleCheck}
                disabled={!date}
                className="flex-1 py-3 rounded-lg bg-ink text-parchment  text-xs  tracking-widest hover:bg-ink/80 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              >
                Sesvla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
