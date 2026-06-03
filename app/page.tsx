import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FloatingButtons } from '@/components/floating-buttons'
import { CookieConsent } from '@/components/cookie-consent'
import { HeroSection } from '@/components/home/hero'
import { SocialProofSection } from '@/components/home/social-proof'
import { FeaturesSection } from '@/components/home/features'
import { ServicesSection } from '@/components/home/services'
import { GallerySection } from '@/components/home/gallery'
import { StatsEnhancedSection } from '@/components/home/stats-enhanced'
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
        <FeaturesSection />
        <ServicesSection />
        <GallerySection />
        <StatsEnhancedSection />
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
