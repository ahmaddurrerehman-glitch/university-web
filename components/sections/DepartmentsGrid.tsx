'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Cpu, Beaker, Stethoscope, Scale, PenTool, BarChart3, Globe2, Music } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import SpotlightCard from '@/components/ui/SpotlightCard'

const departments = [
  { name: 'Engineering & Technology', icon: Cpu, color: '#3E92CC', students: 4200, programs: 18, slug: 'engineering' },
  { name: 'Sciences & Research', icon: Beaker, color: '#10b981', students: 3100, programs: 14, slug: 'sciences' },
  { name: 'Medicine & Health', icon: Stethoscope, color: '#ef4444', students: 2800, programs: 12, slug: 'medicine' },
  { name: 'Law & Governance', icon: Scale, color: '#D4AF37', students: 1900, programs: 8, slug: 'law' },
  { name: 'Arts & Design', icon: PenTool, color: '#8b5cf6', students: 2100, programs: 16, slug: 'arts' },
  { name: 'Business & Economics', icon: BarChart3, color: '#f97316', students: 5200, programs: 22, slug: 'business' },
  { name: 'International Studies', icon: Globe2, color: '#06b6d4', students: 1600, programs: 10, slug: 'international' },
  { name: 'Humanities & Music', icon: Music, color: '#ec4899', students: 1400, programs: 12, slug: 'humanities' },
]

export default function DepartmentsGrid() {
  return (
    <section className="section-padding bg-surface/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Academics"
          title="Explore Our"
          titleHighlight="Departments"
          description="Eight world-class faculties offering over 180 undergraduate and postgraduate programs across every discipline."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {departments.map((dept, i) => {
            const Icon = dept.icon
            return (
              <motion.div
                key={dept.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link href={`/departments#${dept.slug}`} className="group block h-full">
                  <SpotlightCard
                    className="glass-card rounded-2xl border border-white/6 group-hover:border-white/15 transition-all duration-300 group-hover:-translate-y-1.5 h-full"
                    spotlightColor={`${dept.color}18`}
                  >
                    <div className="p-6 h-full flex flex-col">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${dept.color}18`, border: `1px solid ${dept.color}30` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: dept.color }} />
                      </div>

                      <h3 className="text-white font-semibold text-base mb-1 group-hover:text-accent transition-colors">
                        {dept.name}
                      </h3>

                      <div className="flex gap-4 mt-3 text-xs text-slate-500">
                        <span>{dept.students.toLocaleString()} students</span>
                        <span>·</span>
                        <span>{dept.programs} programs</span>
                      </div>

                      <div
                        className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1"
                        style={{ color: dept.color }}
                      >
                        Explore <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/10 text-slate-300 hover:text-white hover:border-accent/30 hover:bg-accent/5 text-sm font-medium transition-all duration-300 hover:scale-105"
          >
            View All Departments <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
