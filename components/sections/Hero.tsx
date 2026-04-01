'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Award, Users, BookOpen, Globe } from 'lucide-react'

const floatingStats = [
  { icon: Users, value: '24,000+', label: 'Students' },
  { icon: Award, value: '#12', label: 'World Ranking' },
  { icon: BookOpen, value: '180+', label: 'Programs' },
  { icon: Globe, value: '95%', label: 'Employment Rate' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Decorative orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3E92CC, transparent)' }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl"
        style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-gold border border-gold/20 text-gold text-sm font-medium mb-8"
          >
            <Award className="w-4 h-4" />
            Ranked #12 Globally — Times Higher Education 2024
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
          >
            <span className="text-white">Shape Your</span>
            <br />
            <span className="gradient-text">Future Here</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            CIMS empowers the next generation of leaders, innovators, and changemakers
            through world-class education, cutting-edge research, and a global community.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold text-base transition-all duration-200 hover:scale-105 hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, #3E92CC, #0A2463)',
                boxShadow: '0 8px 32px rgba(62,146,204,0.35)',
              }}
            >
              Apply for MBBS C'11
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base glass border border-white/10 text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200"
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
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500"
          >
            {['QS World Ranked', 'Accredited AACSB', 'Research Excellence', 'Global Alumni Network'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Floating stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {floatingStats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card rounded-2xl p-5 text-center border border-white/[0.06] hover:border-white/10 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl glass-gold flex items-center justify-center mx-auto mb-3">
                <Icon className="w-4 h-4 text-gold" />
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-slate-400 mt-1">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-slate-500 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-accent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
