'use client'

import dynamic from 'next/dynamic'

const Aurora = dynamic(() => import('@/components/react-bits/Aurora'), {
  ssr: false,
  loading: () => null,
})

export default function GlobalBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <Aurora
        colorStops={['#1A0000', '#4D0000', '#700000']}
        amplitude={0.45}
        blend={0.22}
        speed={0.28}
      />
      {/* Dark overlay keeps all pages readable */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(6,6,16,0.72)' }}
      />
    </div>
  )
}
