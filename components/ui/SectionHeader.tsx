import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  badge?: string
  title: string
  titleHighlight?: string
  description?: string
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', 'max-w-3xl', centered && 'mx-auto', className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-gold border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
        {title}{' '}
        {titleHighlight && (
          <span className="gradient-text-gold">{titleHighlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-slate-400 text-lg leading-relaxed">{description}</p>
      )}
    </div>
  )
}
