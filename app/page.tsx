import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import StatsSection from '@/components/sections/StatsSection'
import DepartmentsGrid from '@/components/sections/DepartmentsGrid'
import NewsSection from '@/components/sections/NewsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTABanner from '@/components/sections/CTABanner'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <DepartmentsGrid />
        <NewsSection />
        <TestimonialsSection />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
