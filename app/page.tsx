import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FloatingButtons } from '@/components/floating-buttons'
import { CookieConsent } from '@/components/cookie-consent'
import { HeroSection } from '@/components/home/hero'
import { SocialProofSection } from '@/components/home/social-proof'
import { ServicesSection } from '@/components/home/services'
import { WhyUsSection } from '@/components/home/why-us'
import { ProcessSection } from '@/components/home/process'
import { TestimonialsSection } from '@/components/home/testimonials'
import { CTASection } from '@/components/home/cta'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        <SocialProofSection />
        <ServicesSection />
        <WhyUsSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingButtons />
      <CookieConsent />
    </>
  )
}
