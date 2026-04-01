'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { contactSchema, type ContactFormData } from '@/lib/validations'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'CIMS Multan , Multan Cantt', color: '#3E92CC' },
  { icon: Phone, label: 'Phone', value: '+1 (800) CIMS-UNI\n+1 (212) 555-0100', color: '#D4AF37' },
  { icon: Mail, label: 'Email', value: 'info@cimsuniversity.edu\nadmissions@cimsuniversity.edu', color: '#10b981' },
  { icon: Clock, label: 'Office Hours', value: 'Mon–Fri: 8:00 AM – 6:00 PM\nSat: 9:00 AM – 1:00 PM', color: '#8b5cf6' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Contact form submitted:', data)
    setSubmitted(true)
    reset()
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 hero-glow" />
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative max-w-7xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Get in <span className="gradient-text-gold">Touch</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                We'd love to hear from you. Our team is available to answer your questions and guide your journey to CIMS.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-padding">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
                <p className="text-slate-400 text-sm">Reach us through any of these channels and we'll respond within 24 hours.</p>
              </div>

              {contactInfo.map(({ icon: Icon, label, value, color }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-5 border border-white/[0.06] flex gap-4"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{label}</div>
                    <p className="text-slate-200 text-sm whitespace-pre-line">{value}</p>
                  </div>
                </motion.div>
              ))}

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-52 glass-card flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">Interactive map</p>
                  <p className="text-xs mt-1">1 CIMS Multan </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card rounded-2xl p-8 border border-white/[0.06]"
              >
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-accent text-sm font-medium hover:text-accent-light transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-8">Send Us a Message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                          <input
                            {...register('name')}
                            placeholder="John Smith"
                            className={`input-field ${errors.name ? 'error' : ''}`}
                          />
                          {errors.name && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="john@example.com"
                            className={`input-field ${errors.email ? 'error' : ''}`}
                          />
                          {errors.email && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                        <input
                          {...register('subject')}
                          placeholder="Admissions inquiry / General question"
                          className={`input-field ${errors.subject ? 'error' : ''}`}
                        />
                        {errors.subject && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.subject.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                        <textarea
                          {...register('message')}
                          rows={6}
                          placeholder="Tell us how we can help you..."
                          className={`input-field resize-none ${errors.message ? 'error' : ''}`}
                        />
                        {errors.message && (
                          <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        loading={isSubmitting}
                        fullWidth
                        className="mt-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
