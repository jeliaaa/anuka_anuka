'use client'

import { useRouter } from 'next/navigation'
import BinaryStar from '@/components/BinaryStar'

export default function DeniedPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-midnight px-4 text-center">
      <div className="mb-6 opacity-40">
        <BinaryStar size={56} />
      </div>
      <p className=" text-xs  tracking-widest text-quartz mb-3">wvdoma akrZalulia</p>
      <h1 className=" text-4xl sm:text-5xl font-medium text-mist mb-4">
        es gverdi SenTvis ar aris
      </h1>
      <p className="font-body text-muted text-sm max-w-xs leading-relaxed mb-10">
        swori TariRi schirdeba Sesasvlelad. stsade Tavidan.
      </p>
      <button
        onClick={() => router.push('/')}
        className=" text-xs  tracking-widest text-ember border border-ember/30 px-6 py-3 rounded-lg hover:border-ember hover:bg-midnight-2 transition-all active:scale-95"
      >
        ukan dabruneba
      </button>
    </div>
  )
}
