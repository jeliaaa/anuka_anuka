'use client'

import { useRouter } from 'next/navigation'
import WelcomeGate from '@/components/WelcomeGate'

export default function GatePage() {
  const router = useRouter()
  return <WelcomeGate onPass={() => router.push('/main')} />
}
