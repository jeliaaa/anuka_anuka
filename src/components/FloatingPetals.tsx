'use client'

import { useEffect, useState } from 'react'
import BinaryStar from './BinaryStar'

type Star = {
  id: number
  left: number
  top: number
  size: number
  duration: number
  delay: number
}

export default function Starfield() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5,
    }))
    setStars(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map(s => (
        <span
          key={s.id}
          className="star twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* Ambient glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[28rem] h-[28rem] bg-ember/10 rounded-full blur-3xl drift" />
      <div className="absolute bottom-[-10%] left-[-8%] w-96 h-96 bg-quartz/10 rounded-full blur-3xl drift" style={{ animationDelay: '3s' }} />

      {/* Ambient orbit, tucked in a corner */}
      <div className="hidden md:block absolute bottom-10 right-10 opacity-40">
        <BinaryStar size={140} />
      </div>
    </div>
  )
}
