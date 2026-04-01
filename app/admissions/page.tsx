'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle, Clock, FileText, CreditCard, Users, Award, ArrowRight, Calendar } from 'lucide-react'
import Link from 'next/link'

const steps = [
  { step: '01', icon: FileText, title: 'Choose Your Program', description: 'Browse our 180+ programs across 8 departments and select the one that aligns with your passions and career goals.' },
  { step: '02', icon: Users, title: 'Create an Account', description: 'Register on our student portal to access the application system, track your application, and receive updates.' },
  { step: '03', icon: CheckCircle, title: 'Submit Documents', description: 'Upload your transcripts, letters of recommendation, personal statement, and English proficiency scores.' },
  { step: '04', icon: CreditCard, title: 'Pay Application Fee', description: 'A non-refundable $75 application fee is required to process your application. Fee waivers available.' },
  { step: '05', icon: Clock, title: 'Await Decision', description: 'Our admissions team reviews every application holistically. Decisions are communicated within 6-8 weeks.' },
  { step: '06', icon: Award, title: 'Accept Your Offer', description: 'Congratulations! Accept your offer, arrange accommodation, and prepare for your journey at CIMS.' },
]

const requirements = {
  'Undergraduate': [
    'High school diploma or equivalent (minimum GPA 3.0)',
    'SAT/ACT scores (optional for 2026 intake)',
    'Two letters of recommendation',
    'Personal statement (500-700 words)',
    'English proficiency: IELTS 6.5+ / TOEFL 90+',
    'Official transcripts from all secondary schools',
  ],
  'Postgraduate': [
    'Bachelor\'s degree from accredited institution (GPA 3.2+)',
    'GRE/GMAT scores (program dependent)',
    'Two academic or professional references',
    'Statement of purpose (800-1000 words)',
    'English proficiency: IELTS 7.0+ / TOEFL 100+',
    'CV/Resume highlighting relevant experience',
  ],
}

const scholarships = [
  { name: 'CIMS Excellence Scholarship', value: '100% tuition', eligibility: 'Top 0.5% of applicants', color: '#D4AF37' },
  { name: 'Merit Scholarship', value: '50% tuition', eligibility: 'Top 5% of applicants', color: '#3E92CC' },
  { name: 'Need-Based Grant', value: 'Up to $20,000/yr', eligibility: 'Financial need demonstrated', color: '#10b981' },
  { name: 'STEM Excellence Award', value: '30% tuition', eligibility: 'STEM applicants, GPA 3.8+', color: '#8b5cf6' },
]

const deadlines = [
  { round: 'Early Decision', deadline: 'November 1, 2024', decision: 'December 15, 2024', note: 'Binding commitment required' },
  { round: 'Regular Decision', deadline: 'January 15, 2026', decision: 'March 31, 2026', note: 'Standard application' },
  { round: 'Late Admission', deadline: 'March 31, 2026', decision: 'May 15, 2026', note: 'Limited places available' },
]

export default function AdmissionsPage() {
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
                <Calendar className="w-3.5 h-3.5" /> Applications Open — MBBS C'11
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Start Your <span className="gradient-text-gold">CIMS</span> Journey
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
                Your application is the first step toward an extraordinary education.
                We look for curious, driven, and compassionate individuals.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-white font-semibold text-base"
                style={{ background: 'linear-gradient(135deg, #3E92CC, #0A2463)', boxShadow: '0 8px 32px rgba(62,146,204,0.35)' }}
              >
                Begin Application <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Application Steps */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Process</span>
              <h2 className="mt-2 text-4xl font-bold text-white">How to <span className="gradient-text-gold">Apply</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map(({ step, icon: Icon, title, description }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-7 border border-white/[0.06] hover:border-white/12 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl glass-gold border border-gold/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="text-4xl font-black text-white/05">{step}</span>
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section id="requirements" className="section-padding bg-surface/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Requirements</span>
              <h2 className="mt-2 text-4xl font-bold text-white">Admission <span className="gradient-text-gold">Requirements</span></h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(requirements).map(([level, reqs], i) => (
                <motion.div
                  key={level}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="glass-card rounded-2xl p-8 border border-white/[0.06]"
                >
                  <h3 className="text-white font-bold text-xl mb-6">{level} Programs</h3>
                  <ul className="space-y-3">
                    {reqs.map((req) => (
                      <li key={req} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deadlines */}
        <section className="section-padding">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Dates</span>
              <h2 className="mt-2 text-4xl font-bold text-white">Application <span className="gradient-text-gold">Deadlines</span></h2>
            </div>
            <div className="space-y-4">
              {deadlines.map(({ round, deadline, decision, note }, i) => (
                <motion.div
                  key={round}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6 border border-white/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-white font-semibold">{round}</h3>
                    <p className="text-slate-400 text-xs mt-1">{note}</p>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <span className="text-slate-500 text-xs uppercase tracking-wider block mb-1">Deadline</span>
                      <span className="text-gold font-semibold text-sm">{deadline}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs uppercase tracking-wider block mb-1">Decision</span>
                      <span className="text-accent font-semibold text-sm">{decision}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Scholarships */}
        <section id="scholarships" className="section-padding bg-surface/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Financial Aid</span>
              <h2 className="mt-2 text-4xl font-bold text-white">Scholarships & <span className="gradient-text-gold">Funding</span></h2>
              <p className="mt-3 text-slate-400 max-w-2xl mx-auto">Over $30 million in financial aid awarded annually. We believe talent should never be limited by finances.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {scholarships.map(({ name, value, eligibility, color }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-7 border border-white/[0.06] hover:border-white/12 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Award className="w-6 h-6" style={{ color }} />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{name}</h3>
                  <div className="text-2xl font-black mb-1" style={{ color }}>{value}</div>
                  <p className="text-slate-400 text-xs">{eligibility}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
