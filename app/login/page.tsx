'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loginSchema, type LoginFormData } from '@/lib/validations'
import { GraduationCap, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setAuthError('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })
      if (error) {
        setAuthError(error.message)
        return
      }
      router.push('/portal')
      router.refresh()
    } catch {
      setAuthError('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060610 0%, #0A2463 50%, #080e30 100%)' }}>
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #3E92CC, transparent)' }}
        />
        <div className="relative flex flex-col justify-center px-16">
          <Link href="/" className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl block">CIMS</span>
              <span className="text-gold text-[10px] tracking-widest uppercase">University</span>
            </div>
          </Link>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Welcome back to<br /><span className="gradient-text-gold">your campus</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Access your courses, grades, events, and everything your academic life has to offer.
          </p>
          <div className="mt-12 space-y-4">
            {['Access course materials & grades', 'View your schedule & timetable', 'Connect with faculty & peers', 'Track applications & results'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-dark">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-lg block">CIMS</span>
            </div>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-slate-400 mb-8">Enter your credentials to access your portal.</p>

          {authError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{authError}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                {...register('email')}
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                className={`input-field ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-xs text-accent hover:text-accent-light transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`input-field pr-11 ${errors.password ? 'error' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <Button type="submit" size="lg" loading={isSubmitting} fullWidth className="mt-2">
              Sign In to Portal
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link href="/register" className="text-accent hover:text-accent-light font-medium transition-colors">
              Register now
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-slate-600">
            For admissions enquiries, visit our{' '}
            <Link href="/admissions" className="text-slate-500 hover:text-slate-400 underline transition-colors">
              Admissions page
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
