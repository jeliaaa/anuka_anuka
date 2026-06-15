'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Heart, Image, BookOpen } from 'lucide-react'

const tabs = [
  { href: '/',          label: 'Our Time',   icon: Heart,    emoji: '💕' },
  { href: '/gallery',   label: 'Gallery',    icon: Image,    emoji: '🌸' },
  { href: '/dictionary',label: 'Dictionary', icon: BookOpen, emoji: '✨' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-blush-200/60 shadow-sm shadow-blush-100">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Title */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl animate-heart-beat">💖</span>
          <span className="font-accent text-blush-500 text-lg hidden sm:block group-hover:text-blush-600 transition-colors">
            our little world
          </span>
        </Link>

        {/* Tabs */}
        <div className="flex items-center gap-1 sm:gap-2">
          {tabs.map(({ href, label, emoji }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-blush-400 text-white shadow-md shadow-blush-200'
                    : 'text-blush-500 hover:bg-blush-100 hover:text-blush-600'
                  }
                `}
              >
                <span>{emoji}</span>
                <span className="nav-label">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
