'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CTABanner from '@/components/sections/CTABanner'
import { Award, Target, Eye, Heart, Users, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const values = [
  { icon: Award, title: 'Excellence', description: 'We hold ourselves to the highest standards in teaching, research, and service to society.', color: '#D4AF37' },
  { icon: Target, title: 'Innovation', description: 'We encourage bold thinking, creative problem-solving, and the pursuit of knowledge beyond boundaries.', color: '#3E92CC' },
  { icon: Eye, title: 'Integrity', description: 'We act with honesty, transparency, and accountability in everything we do.', color: '#10b981' },
  { icon: Heart, title: 'Inclusion', description: 'We celebrate diversity and create an environment where every person can thrive.', color: '#8b5cf6' },
]

const leadership = [
  {
    name: 'Prof. Dr. BarqiMon',
    role: 'President & Vice-Chancellor',
    bio: 'Oxford PhD, 30+ years in academia and research leadership.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Dr. ABdul Rafay',
    role: 'Provost & Academic VP',
    bio: 'Harvard, MIT. Expert in academic policy and curriculum excellence.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Dr. Ali Shan',
    role: 'VP Research & Innovation',
    bio: 'Stanford PhD. Led $200M in research grants and 15 patents.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
  {
    name: 'Prof. Asad Zaman',
    role: 'VP Student Experience',
    bio: 'Cambridge MA. Pioneer in student wellbeing and career services.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
  },
]

const milestones = [
  { year: '2015', event: 'Founded as CIMS with 500 students and 3 departments.' },
  { year: '2016', event: 'Received full university status and launched the School of Medicine.' },
  { year: '2019', event: 'Opened the International Research Campus and entered global rankings.' },
  { year: '2022', event: 'Crossed 10,000 enrolled students; launched online learning platform.' },
  { year: '2023', event: 'Ranked Top 20 globally in engineering; $100M endowment milestone.' },
  { year: '2025', event: 'Launched $50M AI Research Institute; 24,000 students, 120+ global partners.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-gold border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
                Est. 2015
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                About <span className="gradient-text-gold">CIMS </span>
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                For 60 years, CIMS has been at the vanguard of higher education —
                producing graduates who lead, innovate, and make the world better.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" className="section-padding">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                label: 'Our Mission',
                color: '#3E92CC',
                text: 'To advance knowledge through transformative education and research, preparing students to become ethical leaders who contribute meaningfully to their communities and the world.',
              },
              {
                icon: Eye,
                label: 'Our Vision',
                color: '#D4AF37',
                text: 'To be recognized globally as a university of distinction — one that is defined by the depth of our scholarship, the impact of our research, and the achievement of our graduates.',
              },
            ].map(({ icon: Icon, label, color, text }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card rounded-2xl p-10 border border-white/[0.06]"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{label}</h2>
                <p className="text-slate-400 text-base leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-surface/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">What We Stand For</span>
              <h2 className="mt-2 text-4xl font-bold text-white">Our Core <span className="gradient-text-gold">Values</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map(({ icon: Icon, title, description, color }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-7 border border-white/[0.06] hover:border-white/12 transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                    <Icon className="w-6 h-6" style={{ color }} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* History Timeline */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Since 2015</span>
              <h2 className="mt-2 text-4xl font-bold text-white">Our <span className="gradient-text-gold">Journey</span></h2>
            </div>
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-gold/40 to-transparent" />
              <div className="space-y-10">
                {milestones.map(({ year, event }, i) => (
                  <motion.div
                    key={year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12'}`}>
                      <div className="glass-card rounded-xl p-5 border border-white/[0.06] inline-block text-left">
                        <div className="text-gold font-bold text-lg mb-1">{year}</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{event}</p>
                      </div>
                    </div>
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-accent bg-dark" />
                    <div className="pl-12 md:hidden">
                      <div className="text-gold font-bold text-lg mb-1">{year}</div>
                      <p className="text-slate-400 text-sm leading-relaxed">{event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership" className="section-padding bg-surface/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">Leadership</span>
              <h2 className="mt-2 text-4xl font-bold text-white">Meet Our <span className="gradient-text-gold">Leaders</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.map(({ name, role, bio, image }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/12 transition-all duration-300 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-semibold text-base">{name}</h3>
                    <p className="text-accent text-xs mt-1 font-medium">{role}</p>
                    <p className="text-slate-400 text-xs mt-3 leading-relaxed">{bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
