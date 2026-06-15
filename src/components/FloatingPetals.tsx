'use client'

import { useEffect, useState } from 'react'

const PETALS = ['🌸', '🌺', '💮', '🌷', '💕', '✨', '💖', '🍀']

type Petal = {
  id: number
  emoji: string
  left: number
  delay: number
  duration: number
  size: number
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([])

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      emoji: PETALS[i % PETALS.length],
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 0.8 + Math.random() * 0.8,
    }))
    setPetals(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute"
          style={{
            left: `${p.left}%`,
            top: '-30px',
            fontSize: `${p.size}rem`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
      {/* Static soft blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blush-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-blush-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-slow" />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '3s' }} />
    </div>
  )
}
