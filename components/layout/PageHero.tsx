'use client'

import dynamic from 'next/dynamic'
import { ReactNode } from 'react'

const Aurora = dynamic(() => import('@/components/react-bits/Aurora'), {
  ssr: false,
  loading: () => null,
})

interface PageHeroProps {
  children: ReactNode
  className?: string
  minHeight?: string
  intensity?: 'subtle' | 'strong'
}

export default function PageHero({
  children,
  className = '',
  minHeight = '38vh',
  intensity = 'strong',
}: PageHeroProps) {
  const amplitude = intensity === 'strong' ? 1.1 : 0.6
  const blend = intensity === 'strong' ? 0.45 : 0.28
  const overlay = intensity === 'strong'
    ? 'rgba(6,6,16,0.72) 0%, rgba(6,6,16,0.55) 50%, rgba(6,6,16,0.78) 100%'
    : 'rgba(6,6,16,0.80) 0%, rgba(6,6,16,0.65) 50%, rgba(6,6,16,0.82) 100%'

  return (
    <section
      className={`relative overflow-hidden flex items-center ${className}`}
      style={{ minHeight }}
    >
      {/* Aurora WebGL background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={['#2D0000', '#8B0000', '#DC143C']}
          amplitude={amplitude}
          blend={blend}
          speed={0.55}
        />
      </div>

      {/* Dark overlay + grid */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: `linear-gradient(180deg, ${overlay})` }}
      />
      <div className="absolute inset-0 z-[1] grid-bg opacity-20" />

      {/* Content */}
      <div className="relative z-[2] w-full">
        {children}
      </div>
    </section>
  )
}
