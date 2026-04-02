'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import SpotlightCard from '@/components/ui/SpotlightCard'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Ahmad Durre Rehman',
    program: "MBBS Class of '10",
    year: 'Class of 2029',
    quote: 'CIMS transformed my career. The faculty are world-renowned experts who genuinely invest in your growth. I landed a role at Google before graduation.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    },
  {
    name: 'Musa',
    program: 'MBA, Business School',
    year: 'Class of 2023',
    quote: 'The global network here is unparalleled. I collaborated with students from 40+ countries, which shaped me into a truly international business leader.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Ali',
    program: 'BSc Medicine',
    year: 'Class of 2024',
    quote: 'The research opportunities here are extraordinary. I published two papers as an undergrad and worked alongside Nobel Prize-winning researchers.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  },
  {
    name: 'Musa Ayzal',
    program: 'LLB, School of Law',
    year: 'Class of 2023',
    quote: 'The moot court program and internship partnerships with top law firms gave me real-world skills that textbooks never could. Outstanding institution.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Student Stories"
          title="Voices From Our"
          titleHighlight="Community"
          description="Thousands of alumni have gone on to lead in every field. Here is what some of them say about CIMS."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <SpotlightCard className="glass-card rounded-2xl p-8 border border-white/6 hover:border-white/12 transition-all duration-300 relative">
              <Quote
                className="absolute top-6 right-6 w-10 h-10 text-accent/10"
                strokeWidth={1}
              />

              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              <p className="text-slate-300 text-base leading-relaxed mb-6">"{t.quote}"</p>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{t.program} · {t.year}</div>
                </div>
              </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
