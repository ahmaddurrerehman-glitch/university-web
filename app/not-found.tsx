import Link from 'next/link'
import { GraduationCap, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-black text-white/[0.04] select-none mb-6">404</div>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-primary-light text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
