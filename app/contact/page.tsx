import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FloatingButtons } from '@/components/floating-buttons'
import ContactContent from '@/components/pages/contact-content'

export const metadata = {
  title: 'Contact Us - Elite CA Services',
  description: 'Get in touch with our expert team for personalized chartered accountancy solutions.',
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <ContactContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
