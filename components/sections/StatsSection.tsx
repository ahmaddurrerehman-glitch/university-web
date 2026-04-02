'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Trophy, Users, BookOpen, Globe, Building2, FlaskConical } from 'lucide-react'
import SpotlightCard from '@/components/ui/SpotlightCard'

const stats = [
  { icon: Users, value: 24000, suffix: '+', label: 'Enrolled Students', color: '#3E92CC' },
  { icon: BookOpen, value: 180, suffix: '+', label: 'Academic Programs', color: '#D4AF37' },
  { icon: Trophy, value: 60, suffix: '+', label: 'Years of Excellence', color: '#10b981' },
  { icon: Globe, value: 120, suffix: '+', label: 'Partner Universities', color: '#8b5cf6' },
  { icon: FlaskConical, value: 350, suffix: '+', label: 'Research Projects', color: '#f97316' },
  { icon: Building2, value: 95, suffix: '%', label: 'Graduate Employment', color: '#ec4899' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = (target / duration) * 16
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, transparent, rgba(10,36,99,0.15), transparent)'
      }} />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">By the Numbers</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">
            A Legacy of <span className="gradient-text-gold">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map(({ icon: Icon, value, suffix, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <SpotlightCard
                className="glass-card rounded-2xl border border-white/6 hover:border-white/15 transition-all duration-300 group cursor-default"
                spotlightColor={`${color}20`}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="p-6 text-center"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${color}18`, border: `1px solid ${color}25` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    <CountUp target={value} suffix={suffix} />
                  </div>
                  <div className="text-xs text-slate-400 leading-snug">{label}</div>
                </motion.div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
