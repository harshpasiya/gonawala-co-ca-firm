import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FloatingButtons } from '@/components/floating-buttons'
import AboutContent from '@/components/pages/about-content'

export const metadata = {
  title: 'About Us - Elite CA Services',
  description: 'Learn about our team, experience, and commitment to excellence in chartered accountancy.',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <AboutContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
