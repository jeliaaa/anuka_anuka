import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import FloatingPetals from '@/components/FloatingPetals'

export const metadata: Metadata = {
  title: 'Our Little World 💕',
  description: 'A little corner of the internet just for us',
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
        <FloatingPetals />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <footer className="text-center py-6 text-blush-400 text-sm font-body">
            <span className="animate-heart-beat inline-block">💕</span>
            {' '}made with love, just for us{' '}
            <span className="animate-heart-beat inline-block" style={{ animationDelay: '0.7s' }}>💕</span>
          </footer>
        </div>
      </body>
    </html>
  )
}
