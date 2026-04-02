import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GlobalBackground from '@/components/layout/GlobalBackground'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CIMS — Excellence in Education',
    template: '%s | CIMS',
  },
  description:
    'CIMS — A world-class institution committed to academic excellence, groundbreaking research, and developing the leaders of tomorrow.',
  keywords: ['university', 'higher education', 'admissions', 'research', 'campus'],
  openGraph: {
    title: 'CIMS',
    description: 'Excellence in Education',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-dark text-slate-100 antialiased">
        {/* Global red aurora — appears on every page */}
        <GlobalBackground />
        {children}
      </body>
    </html>
  )
}
