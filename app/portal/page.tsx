'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  GraduationCap, BookOpen, Calendar, Bell, Settings, LogOut,
  TrendingUp, Clock, CheckCircle, Award, FileText, MessageSquare,
  ChevronRight, User
} from 'lucide-react'

const mockCourses = [
  { code: 'CS401', name: 'Advanced Algorithms', instructor: 'Dr. Park', grade: 'A', progress: 75, color: '#3E92CC' },
  { code: 'CS402', name: 'Machine Learning', instructor: 'Dr. Johnson', grade: 'A-', progress: 60, color: '#D4AF37' },
  { code: 'CS403', name: 'Cloud Architecture', instructor: 'Prof. Williams', grade: 'B+', progress: 85, color: '#10b981' },
  { code: 'CS404', name: 'Cybersecurity', instructor: 'Dr. Martinez', grade: 'A', progress: 50, color: '#8b5cf6' },
]

const mockAnnouncements = [
  { id: 1, text: 'CS401 midterm exam scheduled for Feb 15th. Study guide posted on portal.', time: '2 hours ago', unread: true },
  { id: 2, text: 'Library hours extended during exam period: 7 AM – 12 AM daily.', time: '1 day ago', unread: true },
  { id: 3, text: 'Career fair: 50+ companies visiting campus on March 3rd. Register now.', time: '2 days ago', unread: false },
]

const mockUpcoming = [
  { title: 'CS402 Assignment Due', date: 'Tomorrow, 11:59 PM', type: 'assignment' },
  { title: 'Academic Advisor Meeting', date: 'Feb 10, 2:00 PM', type: 'meeting' },
  { title: 'CS401 Midterm Exam', date: 'Feb 15, 9:00 AM', type: 'exam' },
]

export default function PortalPage() {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setUser({
          email: user.email || '',
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
        })
      } catch {
        // If Supabase not configured, show demo mode
        setUser({ email: 'demo@cims.edu', name: 'Demo Student' })
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {}
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/[0.06] px-4 py-6 fixed h-full">
        <Link href="/" className="flex items-center gap-2.5 px-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-white font-bold">CIMS</span>
            <span className="text-gold text-[9px] tracking-widest uppercase block">Student Portal</span>
          </div>
        </Link>

        <nav className="space-y-1 flex-1">
          {[
            { icon: TrendingUp, label: 'Dashboard', active: true },
            { icon: BookOpen, label: 'My Courses' },
            { icon: Calendar, label: 'Schedule' },
            { icon: FileText, label: 'Grades' },
            { icon: Bell, label: 'Announcements' },
            { icon: MessageSquare, label: 'Messages' },
            { icon: Award, label: 'Achievements' },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-accent/15 text-accent border border-accent/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="space-y-1 mt-4 pt-4 border-t border-white/[0.06]">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/[0.08] transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white"
            >
              Good morning, {user?.name} 👋
            </motion.h1>
            <p className="text-slate-400 text-sm mt-1">Spring Semester 2025 — Week 4</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="w-10 h-10 rounded-xl glass-gold border border-gold/20 flex items-center justify-center">
              <User className="w-4 h-4 text-gold" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'GPA', value: '3.82', icon: TrendingUp, color: '#3E92CC' },
            { label: 'Courses', value: '4', icon: BookOpen, color: '#D4AF37' },
            { label: 'Credits Earned', value: '72', icon: CheckCircle, color: '#10b981' },
            { label: 'Year', value: '3rd', icon: Award, color: '#8b5cf6' },
          ].map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 border border-white/[0.06]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-400 text-xs">{label}</span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}18` }}>
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white">{value}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Courses */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Current Courses</h2>
              <button className="text-accent text-sm hover:text-accent-light transition-colors flex items-center gap-1">
                View all <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-4">
              {mockCourses.map((course, i) => (
                <motion.div
                  key={course.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="glass-card rounded-2xl p-5 border border-white/[0.06] hover:border-white/12 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md"
                          style={{ background: `${course.color}18`, color: course.color }}>
                          {course.code}
                        </span>
                        <span className="text-xs text-slate-500">{course.instructor}</span>
                      </div>
                      <h3 className="text-white font-medium text-sm">{course.name}</h3>
                    </div>
                    <span className="text-xl font-bold" style={{ color: course.color }}>{course.grade}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${course.progress}%`, background: course.color }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 flex-shrink-0">{course.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Upcoming */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Upcoming</h2>
              <div className="space-y-3">
                {mockUpcoming.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="glass-card rounded-xl p-4 border border-white/[0.06] flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg glass-gold border border-gold/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-medium">{item.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{item.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Announcements</h2>
              <div className="space-y-3">
                {mockAnnouncements.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className={`glass-card rounded-xl p-4 border transition-all ${
                      item.unread ? 'border-accent/20' : 'border-white/[0.06]'
                    }`}
                  >
                    {item.unread && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mb-2" />
                    )}
                    <p className="text-slate-300 text-xs leading-relaxed">{item.text}</p>
                    <p className="text-slate-600 text-xs mt-2">{item.time}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
