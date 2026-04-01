'use client'

import Link from 'next/link'
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'

// Inline SVG social icons (brand icons removed from lucide-react v1)
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
)
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
)

const footerLinks = {
  University: [
    { label: 'About Us', href: '/about' },
    { label: 'Leadership', href: '/about#leadership' },
    { label: 'Mission & Vision', href: '/about#mission' },
    { label: 'Rankings', href: '/about#rankings' },
    { label: 'Careers', href: '#' },
  ],
  Academics: [
    { label: 'Departments', href: '/departments' },
    { label: 'Programs', href: '/departments' },
    { label: 'Research', href: '#' },
    { label: 'Library', href: '#' },
    { label: 'Faculty', href: '#' },
  ],
  Admissions: [
    { label: 'Apply Now', href: '/admissions' },
    { label: 'Requirements', href: '/admissions#requirements' },
    { label: 'Scholarships', href: '/admissions#scholarships' },
    { label: 'Tuition & Fees', href: '/admissions#fees' },
    { label: 'Campus Tours', href: '/contact' },
  ],
  'Student Life': [
    { label: 'Events', href: '/events' },
    { label: 'Student Portal', href: '/portal' },
    { label: 'Housing', href: '#' },
    { label: 'Sports', href: '#' },
    { label: 'Clubs', href: '#' },
  ],
}

const socials = [
  { Icon: FacebookIcon, href: '#', label: 'Facebook' },
  { Icon: TwitterIcon, href: '#', label: 'Twitter' },
  { Icon: InstagramIcon, href: '#', label: 'Instagram' },
  { Icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
  { Icon: YoutubeIcon, href: '#', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark">
      {/* Newsletter strip */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg">Stay in the loop</h3>
            <p className="text-slate-400 text-sm mt-1">Get the latest news, events, and updates from CIMS University.</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field md:w-72"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-accent to-primary-light text-white text-sm font-semibold rounded-xl whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 group mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white font-bold text-xl leading-none block">CIMS</span>
                <span className="text-[10px] text-gold leading-none tracking-widest uppercase">University</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Shaping the future through education, research, and innovation since 1965.
              A legacy of excellence, a future of limitless possibilities.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { Icon: MapPin, text: 'CIMS MULTAN, MULTAN CANT' },
            { Icon: Phone, text: '+92 300 1234567' },
            { Icon: Mail, text: 'admissions@cimsuniversity.edu' },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg glass-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-gold" />
              </div>
              <span className="text-slate-400 text-sm">{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} CIMS MULTAN. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
