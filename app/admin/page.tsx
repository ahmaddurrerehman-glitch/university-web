'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { eventSchema, type EventFormData } from '@/lib/validations'
import { formatDateShort } from '@/lib/utils'
import {
  GraduationCap, Plus, Pencil, Trash2, X, LogOut,
  Newspaper, Users, Calendar, BarChart3, Shield, CheckCircle, AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const mockEvents = [
  { id: '1', title: 'CIMS Launches $50M AI Research Institute', date: '2025-01-15', category: 'news', created_at: '2025-01-10' },
  { id: '2', title: 'Annual Science & Innovation Expo 2025', date: '2025-02-08', category: 'event', created_at: '2025-01-12' },
  { id: '3', title: 'Dr. Elena Ross Wins Prestigious Fulbright Award', date: '2025-01-28', category: 'announcement', created_at: '2025-01-20' },
]

const stats = [
  { label: 'Total Students', value: '24,183', icon: Users, color: '#3E92CC' },
  { label: 'Published Events', value: '6', icon: Calendar, color: '#D4AF37' },
  { label: 'News Articles', value: '24', icon: Newspaper, color: '#10b981' },
  { label: 'Inquiries', value: '142', icon: BarChart3, color: '#8b5cf6' },
]

type Event = { id: string; title: string; date: string; category: string; created_at: string }

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkAdmin() {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { router.push('/login'); return }
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
        if (profile?.role !== 'admin') { router.push('/portal'); return }
        setAuthorized(true)
      } catch {
        // Demo mode if Supabase not configured
        setAuthorized(true)
      } finally {
        setLoading(false)
      }
    }
    checkAdmin()
  }, [router])

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: { category: 'event' },
  })

  const onSubmit = async (data: EventFormData) => {
    await new Promise((r) => setTimeout(r, 600))
    if (editingId) {
      setEvents((prev) => prev.map((e) => e.id === editingId ? { ...e, ...data } : e))
      showToast('success', 'Event updated successfully')
    } else {
      setEvents((prev) => [...prev, { id: Date.now().toString(), ...data, created_at: new Date().toISOString() }])
      showToast('success', 'Event created successfully')
    }
    reset()
    setShowForm(false)
    setEditingId(null)
  }

  const handleEdit = (event: Event) => {
    setEditingId(event.id)
    setValue('title', event.title)
    setValue('date', event.date)
    setValue('category', event.category as EventFormData['category'])
    setValue('description', '')
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
    setDeleteId(null)
    showToast('success', 'Event deleted')
  }

  if (loading) {
    return <div className="min-h-screen bg-dark flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" /></div>
  }

  if (!authorized) return null

  return (
    <div className="min-h-screen bg-dark">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border shadow-xl ${
              toast.type === 'success'
                ? 'bg-green-500/15 border-green-500/30 text-green-400'
                : 'bg-red-500/15 border-red-500/30 text-red-400'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-card rounded-2xl p-8 border border-white/[0.08] max-w-sm w-full text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Delete Event?</h3>
              <p className="text-slate-400 text-sm mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button variant="secondary" fullWidth onClick={() => setDeleteId(null)}>Cancel</Button>
                <Button variant="danger" fullWidth onClick={() => handleDelete(deleteId)}>Delete</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="border-b border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-white font-bold">CIMS</span>
            <span className="text-xs text-gold ml-1.5">Admin</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-green-500/20 text-green-400 text-xs font-semibold">
            <Shield className="w-3 h-3" />
            Admin Access
          </div>
          <button
            onClick={async () => {
              try {
                const { createClient } = await import('@/lib/supabase/client')
                await createClient().auth.signOut()
              } catch {}
              router.push('/')
            }}
            className="p-2 rounded-lg glass text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Manage content, view stats, and control the university website.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
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
        </div>

        {/* Events Manager */}
        <div className="glass-card rounded-2xl border border-white/[0.06] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
            <div>
              <h2 className="text-lg font-semibold text-white">Events & News</h2>
              <p className="text-slate-500 text-xs mt-0.5">{events.length} entries published</p>
            </div>
            <Button
              onClick={() => { reset({ category: 'event' }); setEditingId(null); setShowForm(true) }}
              size="sm"
            >
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>

          {/* Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-b border-white/[0.06] overflow-hidden"
              >
                <div className="px-6 py-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-white font-semibold">{editingId ? 'Edit Event' : 'Create New Event'}</h3>
                    <button onClick={() => { setShowForm(false); setEditingId(null); reset() }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                        <input {...register('title')} placeholder="Event title" className={`input-field ${errors.title ? 'error' : ''}`} />
                        {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
                        <input {...register('date')} type="date" className={`input-field ${errors.date ? 'error' : ''}`} />
                        {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                        <select {...register('category')} className="input-field">
                          <option value="event">Event</option>
                          <option value="news">News</option>
                          <option value="announcement">Announcement</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                        <textarea {...register('description')} rows={3} placeholder="Write a description..." className={`input-field resize-none ${errors.description ? 'error' : ''}`} />
                        {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" loading={isSubmitting}>
                        {editingId ? 'Save Changes' : 'Publish Event'}
                      </Button>
                      <Button variant="secondary" type="button" onClick={() => { setShowForm(false); setEditingId(null); reset() }}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Created</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="font-medium text-white max-w-xs truncate">{event.title}</td>
                    <td>{formatDateShort(event.date)}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                        event.category === 'news' ? 'bg-accent/15 text-accent' :
                        event.category === 'event' ? 'bg-gold/15 text-gold' :
                        'bg-green-500/15 text-green-400'
                      }`}>
                        {event.category}
                      </span>
                    </td>
                    <td className="text-slate-500 text-sm">{formatDateShort(event.created_at)}</td>
                    <td>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 rounded-lg glass text-slate-400 hover:text-white transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteId(event.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
