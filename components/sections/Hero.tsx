'use client'

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { useCallback, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Award, Users, BookOpen, Globe } from 'lucide-react'
import dynamic from 'next/dynamic'

const Aurora = dynamic(() => import('@/components/react-bits/Aurora'), { ssr: false, loading: () => null })
const ClickSpark = dynamic(() => import('@/components/react-bits/ClickSpark'), { ssr: false, loading: () => null })

const floatingStats = [
  { icon: Users, value: '24,000+', label: 'Students' },
  { icon: Award, value: '#12', label: 'World Ranking' },
  { icon: BookOpen, value: '180+', label: 'Programs' },
  { icon: Globe, value: '95%', label: 'Employment Rate' },
]

const particles = [
  { size: 3, left: '12%', top: '22%', delay: 0, duration: 4.2, red: true },
  { size: 5, left: '82%', top: '18%', delay: 0.6, duration: 5.1, red: false },
  { size: 3, left: '76%', top: '68%', delay: 1.1, duration: 3.8, red: true },
  { size: 4, left: '8%', top: '72%', delay: 1.6, duration: 4.7, red: false },
  { size: 5, left: '48%', top: '88%', delay: 0.9, duration: 5.3, red: true },
  { size: 3, left: '62%', top: '28%', delay: 0.4, duration: 4.0, red: false },
  { size: 4, left: '28%', top: '8%', delay: 1.3, duration: 4.5, red: true },
  { size: 3, left: '92%', top: '50%', delay: 0.7, duration: 3.6, red: false },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 25 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 25 })
  const spotlightBg = useMotionTemplate`radial-gradient(900px circle at ${smoothX}px ${smoothY}px, rgba(220,20,60,0.06), transparent 50%)`

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Aurora WebGL background — RED (strong in hero) */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={['#3D0000', '#8B0000', '#DC143C']}
          amplitude={1.4}
          blend={0.55}
          speed={0.7}
        />
      </div>

      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'linear-gradient(180deg, rgba(6,6,16,0.82) 0%, rgba(6,6,16,0.62) 50%, rgba(6,6,16,0.88) 100%)'
      }} />
      <div className="absolute inset-0 z-[1] grid-bg opacity-25" />
      <div className="noise-overlay z-[2]" />

      {/* Mouse-follow spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: spotlightBg }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full z-[2] pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: p.red ? '#DC143C' : '#D4AF37',
            boxShadow: `0 0 ${p.size * 4}px ${p.red ? 'rgba(220,20,60,0.9)' : 'rgba(212,175,55,0.8)'}`,
          }}
          animate={{ y: [0, -(12 + p.size * 2), 4, 0], opacity: [0.4, 0.9, 0.5, 0.4] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ClickSpark — only inside hero for performance */}
      <ClickSpark sparkColor="#DC143C" sparkSize={9} sparkRadius={20} sparkCount={8} duration={420}>
        <div className="relative z-[3] max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-4xl mx-auto text-center">

            {/* Badge — CSS shimmer (no JS animation loop) */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold border border-gold/20 mb-8"
            >
              <Award className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="shiny-gold text-sm font-medium">
                Ranked #12 Globally — Times Higher Education 2024
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            </motion.div>

            {/* Heading — line 1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white"
            >
              Shape Your
            </motion.h1>

            {/* Heading — line 2 gradient, FIXED */}
            <div className="flex flex-wrap justify-center gap-[0.3em] text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mt-0">
              {['Future', 'Here'].map((word, i) => (
                <motion.span
                  key={word}
                  className="gradient-text-crimson"
                  initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.65, delay: 0.28 + i * 0.13, ease: 'easeOut' }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-6 text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
            >
              CIMS empowers the next generation of leaders, innovators, and changemakers
              through world-class education, cutting-edge research, and a global community.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.68 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all duration-300 hover:scale-105 glow-pulse-crimson"
                style={{ background: 'linear-gradient(135deg, #8B0000, #DC143C, #FF4500)' }}
              >
                Apply for MBBS C'11
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base glass border border-white/10 text-white hover:border-crimson/30 hover:bg-crimson/5 transition-all duration-300 hover:scale-105"
              >
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-3 h-3 text-white ml-0.5" />
                </span>
                Watch Campus Tour
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.88 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500"
            >
              {['QS World Ranked', 'Accredited AACSB', 'Research Excellence', 'Global Alumni Network'].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.95 + i * 0.07 }}
                  className="flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-crimson" />
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {floatingStats.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="glass-card rounded-2xl p-5 text-center border border-white/6 hover:border-crimson/25 transition-all duration-300 group cursor-default"
              >
                <div className="w-9 h-9 rounded-xl glass-crimson flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-4 h-4 text-crimson" />
                </div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-slate-400 mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ClickSpark>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[3] pointer-events-none"
      >
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-1 h-2 rounded-full bg-crimson"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
