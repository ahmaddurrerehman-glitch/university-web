import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-gradient-to-r from-accent to-primary-light text-white hover:opacity-90 shadow-lg hover:shadow-accent/30',
      secondary:
        'glass border border-white/10 text-white hover:border-white/20 hover:bg-white/[0.08]',
      ghost:
        'text-slate-300 hover:text-white hover:bg-white/[0.06]',
      gold:
        'bg-gradient-to-r from-gold to-gold-light text-dark hover:opacity-90 shadow-lg hover:shadow-gold/30',
      danger:
        'bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30',
    }

    const sizes = {
      sm: 'px-3.5 py-2 text-xs',
      md: 'px-5 py-2.5 text-sm',
      lg: 'px-7 py-3.5 text-base',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
