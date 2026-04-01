'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerSchema, type RegisterFormData } from '@/lib/validations'
import { GraduationCap, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'One uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'One number', ok: /[0-9]/.test(password) },
  ]
  return (
    <div className="mt-2 space-y-1.5">
      {checks.map(({ label, ok }) => (
        <div key={label} className={`flex items-center gap-2 text-xs ${ok ? 'text-green-400' : 'text-slate-500'}`}>
          <CheckCircle className={`w-3 h-3 ${ok ? 'opacity-100' : 'opacity-30'}`} />
          {label}
        </div>
      ))}
    </div>
  )
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const password = watch('password', '')

  const onSubmit = async (data: RegisterFormData) => {
    setAuthError('')
    try {
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.fullName },
        },
      })
      if (error) {
        setAuthError(error.message)
        return
      }
      setSuccess(true)
    } catch {
      setAuthError('An unexpected error occurred. Please try again.')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Registration Successful!</h2>
          <p className="text-slate-400 mb-6">
            Check your email inbox for a verification link. Once verified, you can sign in to your student portal.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-primary-light text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Go to Sign In
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #060610 0%, #0A2463 50%, #080e30 100%)' }}>
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative flex flex-col justify-center px-14">
          <Link href="/" className="flex items-center gap-3 mb-14">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white font-bold text-xl block">CIMS</span>
              <span className="text-gold text-[10px] tracking-widest uppercase">University</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Join <span className="gradient-text-gold">24,000+</span><br />students at CIMS
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            Create your student account to access courses, events, and everything your CIMS journey has to offer.
          </p>
          <div className="space-y-3">
            {['Free to register', 'Instant portal access', 'Connect with campus life', 'Track your applications'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-300 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-dark overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">CIMS</span>
          </Link>

          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400 mb-8">Start your CIMS journey today.</p>

          {authError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
            >
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{authError}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
              <input
                {...register('fullName')}
                placeholder="John Smith"
                autoComplete="name"
                className={`input-field ${errors.fullName ? 'error' : ''}`}
              />
              {errors.fullName && <p className="mt-1.5 text-xs text-red-400">{errors.fullName.message}</p>}
            </div>

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
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
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
              {password && <PasswordStrength password={password} />}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Repeat your password"
                autoComplete="new-password"
                className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
              />
              {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            <p className="text-xs text-slate-500">
              By registering, you agree to our{' '}
              <a href="#" className="text-slate-400 hover:text-white underline">Terms of Service</a> and{' '}
              <a href="#" className="text-slate-400 hover:text-white underline">Privacy Policy</a>.
            </p>

            <Button type="submit" size="lg" loading={isSubmitting} fullWidth>
              Create My Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-accent hover:text-accent-light font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
