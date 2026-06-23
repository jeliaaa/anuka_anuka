import type { Metadata } from 'next'
//@ts-ignore next-line
import './globals.css'
import Navigation from '@/components/Navigation'
import Starfield from '@/components/FloatingPetals'

export const metadata: Metadata = {
  title: 'Our Little World',
  description: 'A private almanac for two — time, memories, and a lexicon of our own.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Starfield />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <footer className="text-center py-8 text-muted text-xs  tracking-widest ">
            me da Sen - 2026.05.22
          </footer>
        </div>
      </body>
    </html>
  )
}
