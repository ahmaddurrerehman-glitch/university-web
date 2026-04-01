'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABanner from '@/components/sections/CTABanner'
import { Cpu, Beaker, Stethoscope, Scale, PenTool, BarChart3, Globe2, Music, ArrowRight, Users, BookOpen, FlaskConical } from 'lucide-react'

const departments = [
  {
    id: 'engineering',
    name: 'Engineering & Technology',
    icon: Cpu,
    color: '#3E92CC',
    description: 'From civil and mechanical to software and AI, our engineering programs are designed to solve the world\'s greatest challenges.',
    students: 4200,
    programs: ['BSc Computer Science', 'MEng Software Engineering', 'BSc Civil Engineering', 'MSc Artificial Intelligence', 'BSc Electrical Engineering', 'PhD Research Programs'],
    highlights: ['#5 in Engineering globally', '95% employment rate', '$20M annual research budget'],
  },
  {
    id: 'sciences',
    name: 'Sciences & Research',
    icon: Beaker,
    color: '#10b981',
    description: 'Explore the frontiers of biology, chemistry, physics, and environmental science with access to world-class laboratories.',
    students: 3100,
    programs: ['BSc Biology', 'BSc Chemistry', 'MSc Environmental Science', 'BSc Physics', 'MSc Biotechnology', 'PhD Science Programs'],
    highlights: ['350+ active research projects', '12 Nobel Prize collaborators', 'ISO-certified labs'],
  },
  {
    id: 'medicine',
    name: 'Medicine & Health Sciences',
    icon: Stethoscope,
    color: '#ef4444',
    description: 'Train to become the next generation of healthcare professionals and medical researchers in our state-of-the-art medical school.',
    students: 2800,
    programs: ['MBBS Medicine', 'BSc Nursing', 'MSc Public Health', 'BSc Pharmacy', 'MSc Physiotherapy', 'PhD Medical Research'],
    highlights: ['Affiliated with 5 teaching hospitals', '99% USMLE pass rate', 'Simulation labs'],
  },
  {
    id: 'law',
    name: 'Law & Governance',
    icon: Scale,
    color: '#D4AF37',
    description: 'Our law school produces barristers, solicitors, and legal scholars who shape justice, policy, and governance worldwide.',
    students: 1900,
    programs: ['LLB Law', 'LLM International Law', 'LLM Corporate Law', 'MBA + JD Dual Degree', 'MSc Criminology', 'PhD Legal Studies'],
    highlights: ['Ranked #8 law school', 'National Moot Court champions', 'Top 50 firm partnerships'],
  },
  {
    id: 'arts',
    name: 'Arts & Design',
    icon: PenTool,
    color: '#8b5cf6',
    description: 'A creative haven for designers, filmmakers, architects, and artists. Push the boundaries of visual culture and expression.',
    students: 2100,
    programs: ['BA Fine Arts', 'BSc Architecture', 'BA Graphic Design', 'BA Film Studies', 'MA Interior Design', 'MFA Creative Arts'],
    highlights: ['6 fully equipped studios', 'Annual international showcase', 'Industry mentorship program'],
  },
  {
    id: 'business',
    name: 'Business & Economics',
    icon: BarChart3,
    color: '#f97316',
    description: 'The CIMS Business School is a powerhouse of entrepreneurship, finance, and management education with a global outlook.',
    students: 5200,
    programs: ['BBA Business Admin', 'MBA Full-Time', 'MSc Finance', 'BSc Economics', 'MSc Data Analytics', 'Executive MBA'],
    highlights: ['AACSB & EQUIS accredited', 'Fortune 500 recruiters on campus', 'Startup incubator'],
  },
  {
    id: 'international',
    name: 'International Studies',
    icon: Globe2,
    color: '#06b6d4',
    description: 'Gain a nuanced understanding of global politics, diplomacy, development, and international relations.',
    students: 1600,
    programs: ['BA International Relations', 'MSc Global Affairs', 'BA Political Science', 'MA Diplomacy', 'BA Languages', 'MA Development Studies'],
    highlights: ['UN official partner university', '40+ exchange countries', '20 language offerings'],
  },
  {
    id: 'humanities',
    name: 'Humanities & Music',
    icon: Music,
    color: '#ec4899',
    description: 'Study the depths of human history, philosophy, literature, and musical expression in a rigorous and inspiring environment.',
    students: 1400,
    programs: ['BA History', 'BA Philosophy', 'BA English Literature', 'BMus Music', 'MA Cultural Studies', 'PhD Humanities'],
    highlights: ['World-class concert hall', 'Publishing research journal', 'Award-winning faculty'],
  },
]

export default function DepartmentsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-gold border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
                180+ Programs
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Our <span className="gradient-text-gold">Departments</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Eight world-class faculties. Endless possibilities. Find your path.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Departments */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto space-y-8">
            {departments.map((dept, i) => {
              const Icon = dept.icon
              return (
                <motion.div
                  key={dept.id}
                  id={dept.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass-card rounded-2xl p-8 border border-white/[0.06] hover:border-white/12 transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{ background: `${dept.color}18`, border: `1px solid ${dept.color}30` }}
                        >
                          <Icon className="w-7 h-7" style={{ color: dept.color }} />
                        </div>
                        <div>
                          <h2 className="text-white font-bold text-xl">{dept.name}</h2>
                          <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-1">
                            <Users className="w-3 h-3" />
                            {dept.students.toLocaleString()} students
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mb-5">{dept.description}</p>
                      <div className="space-y-2">
                        {dept.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dept.color }} />
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right - Programs */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300 font-semibold text-sm">Available Programs</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {dept.programs.map((prog) => (
                          <div
                            key={prog}
                            className="px-4 py-3 rounded-xl text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer group flex items-center justify-between"
                            style={{ background: `${dept.color}0a`, border: `1px solid ${dept.color}18` }}
                          >
                            {prog}
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" style={{ color: dept.color }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
