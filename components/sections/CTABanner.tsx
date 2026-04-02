'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'

export default function CTABanner() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden p-[1px]"
          style={{
            background: 'linear-gradient(135deg, rgba(62,146,204,0.4), rgba(212,175,55,0.3), rgba(62,146,204,0.15))',
          }}
        >
          <div
            className="relative rounded-[calc(1.5rem-1px)] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0A2463 0%, #1a3a8f 40%, #0e1f5c 70%, #080e30 100%)',
            }}
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
              animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, #3E92CC, transparent)' }}
              animate={{ opacity: [0.08, 0.16, 0.08], scale: [1, 1.12, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            <div className="grid-bg absolute inset-0 opacity-30" />

            <div className="relative px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-gold border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Applications Open — MBBS C'11
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                >
                  Begin Your Journey
                  <br />
                  <span className="gradient-text-gold">At CIMS Today</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 text-slate-300 text-lg leading-relaxed"
                >
                  Join 24,000 students from around the world. Deadline: April 31, 2026.
                  Scholarships available for exceptional candidates.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
                className="flex flex-col sm:flex-row md:flex-col gap-4 w-full md:w-auto"
              >
                <Link
                  href="/admissions"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base text-dark transition-all duration-300 hover:scale-105 whitespace-nowrap glow-pulse-gold"
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37, #f0c040)',
                  }}
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base text-white glass border border-white/20 hover:border-white/35 hover:bg-white/[0.06] transition-all duration-300 hover:scale-105 whitespace-nowrap"
                >
                  Request Information
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
