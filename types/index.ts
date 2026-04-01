export interface Department {
  id: string
  name: string
  description: string
  icon: string
  color: string
  students: number
  programs: number
  faculty: number
  slug: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  category: 'event' | 'news' | 'announcement'
  image_url?: string
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  program: string
  year: string
  quote: string
  avatar?: string
  rating: number
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface Profile {
  id: string
  full_name: string
  email: string
  role: 'student' | 'admin'
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export interface StatItem {
  value: string
  label: string
  icon: string
}
