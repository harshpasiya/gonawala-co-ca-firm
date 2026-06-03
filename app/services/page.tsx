import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FloatingButtons } from '@/components/floating-buttons'
import ServicesContent from '@/components/pages/services-content'

export const metadata = {
  title: 'Services - Elite CA Services',
  description: 'Explore our comprehensive chartered accountancy services including tax planning, auditing, payroll management, and more.',
}

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <ServicesContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
