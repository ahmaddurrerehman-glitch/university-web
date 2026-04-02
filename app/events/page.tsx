'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { Calendar, Tag, Search, ArrowRight, Clock, MapPin } from 'lucide-react'
import { formatDateShort } from '@/lib/utils'
import PageHero from '@/components/layout/PageHero'

const allEvents = [
  {
    id: '1',
    title: 'CIMS Launches $50M AI Research Institute',
    description: 'A landmark investment in artificial intelligence research, placing CIMS at the forefront of AI innovation and education globally. The institute will focus on machine learning, robotics, and ethical AI development.',
    date: '2025-01-15',
    category: 'news',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop',
    location: 'Main Campus',
  },
  {
    id: '2',
    title: 'Annual Science & Innovation Expo 2025',
    description: 'Students and faculty showcase breakthrough research projects across engineering, medicine, environmental science, and beyond. Open to the public. Free entry.',
    date: '2025-02-08',
    category: 'event',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop',
    location: 'Grand Hall, Building A',
    time: '9:00 AM – 6:00 PM',
  },
  {
    id: '3',
    title: 'Dr. Elena Ross Wins Prestigious Fulbright Award',
    description: 'Professor of Environmental Science Dr. Elena Ross has been awarded the Fulbright Scholarship for her groundbreaking climate research on carbon sequestration in tropical regions.',
    date: '2025-01-28',
    category: 'announcement',
    image: 'https://images.unsplash.com/photo-1532094349884-543559872de7?w=800&h=450&fit=crop',
    location: 'Science Faculty',
  },
  {
    id: '4',
    title: 'International Student Welcome Week 2025',
    description: 'A week-long orientation and celebration for new international students. Campus tours, cultural showcases, networking events, and more.',
    date: '2025-02-17',
    category: 'event',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=450&fit=crop',
    location: 'University Square',
    time: 'All Day',
  },
  {
    id: '5',
    title: 'Applications Now Open for Fall 2025 Intake',
    description: 'We are now accepting applications for all undergraduate and postgraduate programs for the Fall 2025 academic year. Early decision deadline is November 1.',
    date: '2025-01-01',
    category: 'announcement',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop',
    location: 'Online',
  },
  {
    id: '6',
    title: 'CIMS Business School: Global Finance Summit',
    description: 'Join leading figures from global finance, central banking, and fintech for a day of panels, workshops, and networking at our annual Global Finance Summit.',
    date: '2025-02-25',
    category: 'event',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop',
    location: 'Business School Auditorium',
    time: '10:00 AM – 7:00 PM',
  },
]

const categories = ['all', 'news', 'event', 'announcement']

const categoryColors: Record<string, string> = {
  news: '#3E92CC',
  event: '#D4AF37',
  announcement: '#10b981',
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = allEvents.filter((e) => {
    const matchesCategory = activeCategory === 'all' || e.category === activeCategory
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero minHeight="0" className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                News & <span className="gradient-text-crimson">Events</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Stay connected with everything happening across campus and beyond.
              </p>
            </motion.div>
          </div>
        </PageHero>

        {/* Filters */}
        <section className="sticky top-[60px] z-30 border-b border-white/[0.06] backdrop-blur-xl bg-dark/80">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all ${
                    activeCategory === cat
                      ? 'bg-accent text-white'
                      : 'glass text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-9 text-sm py-2"
              />
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-40" />
                <p className="text-lg">No results found. Try a different search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item, i) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-card rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/12 transition-all duration-300 hover:translate-y-[-4px] flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                      <div
                        className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                        style={{
                          background: `${categoryColors[item.category]}20`,
                          border: `1px solid ${categoryColors[item.category]}40`,
                          color: categoryColors[item.category],
                        }}
                      >
                        <Tag className="w-3 h-3" />
                        {item.category}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDateShort(item.date)}
                        </span>
                        {item.time && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {item.time}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold text-base leading-snug mb-2 flex-1">{item.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{item.description}</p>
                      <button className="mt-4 flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-2.5 transition-all">
                        Read More <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
