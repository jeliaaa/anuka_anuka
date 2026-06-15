'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BinaryStar from './BinaryStar'

const tabs = [
  { href: '/',           label: 'our time', index: '01' },
  { href: '/gallery',    label: 'the archive', index: '02' },
  { href: '/dictionary', label: 'the lexicon', index: '03' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-midnight/80 backdrop-blur-md border-b border-midnight-3">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <BinaryStar size={26} />
          <span className="font-display text-mist text-base tracking-wide group-hover:text-ember transition-colors hidden sm:block">
            our little world
          </span>
        </Link>

        {/* Tabs */}
        <div className="flex items-center gap-1 sm:gap-2">
          {tabs.map(({ href, label, index }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`
                  relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md text-sm font-mono transition-all duration-200
                  ${isActive
                    ? 'text-ember'
                    : 'text-muted hover:text-mist'
                  }
                `}
              >
                <span className="text-[0.65rem] tracking-widest opacity-60">{index}</span>
                <span className="nav-label tracking-wide">{label}</span>
                {isActive && (
                  <span className="absolute left-3 right-3 -bottom-px h-px bg-ember" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
