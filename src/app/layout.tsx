import './globals.css'
import type { Metadata } from 'next'
import { Navbar, Provider } from '@/components'
export const metadata: Metadata = {
  title: 'Promptopia',
  description: 'Discover and share creative AI prompts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className='gradient' />
        </div>
        <main className='app'>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  )
}
