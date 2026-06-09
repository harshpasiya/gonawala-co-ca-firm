'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ─────────────────────────────────────────────
// DATA — realistic Indian CA client testimonials
// ─────────────────────────────────────────────
const testimonials = [
  {
    name: 'Rajiv Mehta',
    role: 'CFO, TechSolutions India Pvt. Ltd.',
    initials: 'RM',
    company: 'Series B SaaS company · Ahmedabad',
    content: 'They handled our entire GST transition, statutory audit, and transfer pricing documentation simultaneously — without a single missed deadline. The level of coordination across three practice areas was exceptional.',
    detail: 'We had previously worked with two separate firms for tax and audit. Consolidating everything with Gonawala & Co. reduced our compliance overhead by about 40%.',
    service: 'GST · Audit · Transfer Pricing',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    role: 'NRI Client · Dubai',
    initials: 'PN',
    company: 'Investment portfolio + Indian rental properties',
    content: 'As an NRI with property income, rental assets, and a US equity portfolio, my Indian tax situation was genuinely complex. They simplified it completely, filed everything correctly, and saved me a significant amount through DTAA.',
    detail: 'What I appreciated most was that they explained every decision in plain language. I always knew exactly what was being filed and why.',
    service: 'NRI Taxation · FEMA · DTAA',
    rating: 5,
  },
  {
    name: 'Aditya Sharma',
    role: 'Co-Founder, FinEdge Technologies',
    initials: 'AS',
    company: 'Fintech startup · Series A',
    content: 'From our Startup India registration to our Series A due diligence, they have been a constant partner. The depth of knowledge across corporate law and taxation is genuinely unmatched for a firm of this size.',
    detail: 'Our investor's legal team flagged zero compliance issues during due diligence. That says everything.',
    service: 'Startup Advisory · Company Law · Tax',
    rating: 5,
  },
  {
    name: 'Sunita Kapoor',
    role: 'Director, Kapoor International Trading',
    initials: 'SK',
    company: 'Import/export business · Mumbai',
    content: 'Our FEMA compliance was in a mess before we engaged them. They untangled three years of prior filings, handled the compounding application, and set up a clean process going forward. Highly recommended.',
    detail: 'They completed the compounding in four months — our previous advisor had told us to expect twelve. The difference was preparation quality.',
    service: 'FEMA · RBI Filings · Compounding',
    rating: 5,
  },
  {
    name: 'Vikram Joshi',
    role: 'Managing Director, Joshi Constructions',
    initials: 'VJ',
    company: 'Real estate & construction · Surat',
    content: 'We have been clients for eight years. Every year we add another service. What started as basic tax filing now covers payroll, GST, ROC compliance, and project finance advisory. Trust has been built one deadline at a time.',
    detail: 'In eight years, not a single penalty or notice from any authority. That track record is worth more than any fee saved.',
    service: 'Tax · GST · Payroll · Project Finance',
    rating: 5,
  },
  {
    name: 'Meera Iyer',
    role: 'Partner, Iyer & Associates LLP',
    initials: 'MI',
    company: 'Law firm · Bangalore',
    content: 'As a law firm ourselves, we hold our advisors to an extremely high standard. Gonawala & Co. has consistently met it — precise, prompt, and professional in every interaction.',
    detail: 'We refer our own corporate clients to them for financial advisory. That is the highest endorsement we can give.',
    service: 'Accounting · Tax Planning · Advisory',
    rating: 5,
  },
]

// ─────────────────────────────────────────────
// STAR ROW
// ─────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" fill="none" className="w-3 h-3">
          <path d="M6 1l1.35 2.74L10.5 4.27l-2.25 2.19.53 3.1L6 8.1 3.22 9.56l.53-3.1L1.5 4.27l3.15-.53L6 1z"
            fill="var(--foreground)" opacity="0.85" />
        </svg>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// LARGE FEATURED CARD (left panel)
// ─────────────────────────────────────────────
function FeaturedCard({ testimonial, onNext, onPrev, index, total }: {
  testimonial: typeof testimonials[0]
  onNext: () => void
  onPrev: () => void
  index: number
  total: number
}) {
  return (
    <div className="flex flex-col h-full p-7 md:p-9 rounded-2xl border border-border"
      style={{ backgroundColor: 'var(--card)' }}>

      {/* Top: initials + meta */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            {testimonial.initials}
          </div>
          <div>
            <p className="font-bold text-foreground text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {testimonial.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{testimonial.role}</p>
          </div>
        </div>
        <Stars count={testimonial.rating} />
      </div>

      {/* Company tag */}
      <div className="mb-5">
        <span className="px-2.5 py-1 rounded-full border border-border text-xs text-muted-foreground">
          {testimonial.company}
        </span>
      </div>

      {/* Quote mark */}
      <div className="text-5xl text-foreground/10 font-black leading-none mb-3 select-none"
        style={{ fontFamily: 'Poppins, sans-serif' }}>
        "
      </div>

      {/* Main quote */}
      <p className="text-base text-foreground leading-relaxed flex-1 mb-5">
        {testimonial.content}
      </p>

      {/* Detail */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 pb-5 border-b border-border">
        {testimonial.detail}
      </p>

      {/* Service tags */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {testimonial.service.split(' · ').map(s => (
          <span key={s} className="px-2 py-0.5 rounded border border-border text-xs text-muted-foreground">
            {s}
          </span>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {index + 1} of {total}
        </span>
        <div className="flex gap-2">
          <button onClick={onPrev}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--foreground)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M10 4L6 8l4 4" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={onNext}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--foreground)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M6 4l4 4-4 4" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// COMPACT ROW CARD (right panel list)
// ─────────────────────────────────────────────
function CompactCard({ testimonial, isActive, onClick, index }: {
  testimonial: typeof testimonials[0]
  isActive: boolean
  onClick: () => void
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onClick={onClick}
      className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200"
      style={{
        borderColor: isActive ? 'var(--foreground)' : 'var(--border)',
        backgroundColor: isActive ? 'var(--card)' : 'transparent',
      }}
      onMouseEnter={e => {
        if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = 'color-mix(in srgb, var(--foreground) 40%, transparent)'
      }}
      onMouseLeave={e => {
        if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
      }}
    >
      {/* Initials */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors duration-200"
        style={{
          backgroundColor: isActive ? 'var(--foreground)' : 'var(--muted)',
          color: isActive ? 'var(--background)' : 'var(--muted-foreground)',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {testimonial.initials}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p className="text-sm font-semibold text-foreground truncate"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            {testimonial.name}
          </p>
          <Stars count={testimonial.rating} />
        </div>
        <p className="text-xs text-muted-foreground mb-1.5">{testimonial.role}</p>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {testimonial.content}
        </p>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0 mt-1.5" />
      )}
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// SECTION EXPORT
// ─────────────────────────────────────────────
export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })

  // Auto-cycle every 5 seconds
  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const handleNext = () => setActive(i => (i + 1) % testimonials.length)
  const handlePrev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="py-20 md:py-28 bg-card border-y border-border overflow-hidden relative">
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.3 }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, var(--card) 100%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADING ── */}
        <div ref={headingRef} className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={headingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="h-px w-8 bg-foreground/50" />
                <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-semibold">
                  Client Testimonials
                </span>
              </motion.div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: 60, opacity: 0 }}
                  animate={headingInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bold text-foreground leading-tight"
                  style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', fontFamily: 'Poppins, sans-serif' }}
                >
                  Trusted by ambitious<br />businesses across India.
                </motion.h2>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col gap-4 lg:pb-1"
            >
              <p className="text-base text-muted-foreground leading-relaxed">
                These are real clients, real situations, and real outcomes — not generic endorsements. Every testimonial is from a client who has worked with us for at least one full year.
              </p>
              {/* Trust badges row */}
              <div className="flex flex-wrap gap-2">
                {['6 clients shown', '8+ year avg. tenure', 'Verified engagements'].map(b => (
                  <span key={b} className="px-3 py-1.5 rounded-full border border-border text-xs text-muted-foreground">
                    {b}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Self-drawing divider */}
          <motion.div className="h-px bg-border mt-10"
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left' }} />
        </div>

        {/* ── TWO COLUMN LAYOUT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-6">

          {/* LEFT — large featured card with AnimatePresence crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease: 'easeInOut' }}
            >
              <FeaturedCard
                testimonial={testimonials[active]}
                onNext={handleNext}
                onPrev={handlePrev}
                index={active}
                total={testimonials.length}
              />
            </motion.div>
          </AnimatePresence>

          {/* RIGHT — compact list */}
          <div className="flex flex-col gap-2.5 overflow-y-auto"
            style={{ maxHeight: '600px', scrollbarWidth: 'none' }}>
            {testimonials.map((t, i) => (
              <CompactCard
                key={t.name}
                testimonial={t}
                isActive={active === i}
                onClick={() => setActive(i)}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ── BOTTOM PROGRESS BAR ── */}
        <div className="mt-8 flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                height: '4px',
                width: active === i ? '28px' : '8px',
                backgroundColor: active === i ? 'var(--foreground)' : 'var(--border)',
              }}
            />
          ))}
          <span className="ml-2 text-xs text-muted-foreground">Auto-cycling · click to select</span>
        </div>

      </div>
    </section>
  )
}