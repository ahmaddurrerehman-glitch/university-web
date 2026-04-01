'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import { formatDateShort } from '@/lib/utils'

const news = [
  {
    id: '1',
    title: 'CIMS Launches $50M AI Research Institute',
    description: 'A landmark investment in artificial intelligence research, placing CIMS at the forefront of AI innovation and education globally.',
    date: '2025-01-15',
    category: 'news',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop',
  },
  {
    id: '2',
    title: 'Annual Science & Innovation Expo 2025',
    description: 'Students and faculty showcase breakthrough research projects across engineering, medicine, environmental science, and beyond.',
    date: '2025-02-08',
    category: 'event',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop',
  },
  {
    id: '3',
    title: 'Dr. Elena Ross Wins Prestigious Fulbright Award',
    description: 'Professor of Environmental Science Dr. Elena Ross has been awarded the Fulbright Scholarship for her groundbreaking climate research.',
    date: '2025-01-28',
    category: 'announcement',
    image: 'https://images.unsplash.com/photo-1532094349884-543559872de7?w=800&h=450&fit=crop',
  },
]

const categoryColors: Record<string, string> = {
  news: '#3E92CC',
  event: '#D4AF37',
  announcement: '#10b981',
}

export default function NewsSection() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <SectionHeader
            badge="Latest"
            title="News &"
            titleHighlight="Events"
            description="Stay updated with the latest from across campus."
            centered={false}
          />
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors whitespace-nowrap"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/events#${item.id}`} className="group block h-full">
                <div className="glass-card rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-white/12 transition-all duration-300 group-hover:translate-y-[-4px] h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDateShort(item.date)}
                    </div>
                    <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-1">{item.description}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-accent text-sm font-medium">
                      Read More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
