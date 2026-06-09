'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const features = [
  {
    number: '01',
    title: 'Certified Professionals Only',
    description: 'Every client engagement is owned by a qualified CA — Fellow or Associate member of ICAI. No trainees handle client work unsupervised.',
    detail: 'We have FCA, ACA, DISA, and registered Insolvency Professionals on staff.',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="28" cy="28" r="22" stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.2" />
        <circle cx="28" cy="28" r="14" stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.35" />
        <path d="M20 28l5 5 11-11" stroke="var(--foreground)" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Response in Under 24 Hours',
    description: 'Every email and phone message receives a substantive response from a qualified CA within one business day — not a bot or coordinator.',
    detail: 'Emergency matters (income tax notices, time-bound filings) are handled same day.',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <circle cx="28" cy="28" r="18" stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.25" />
        <path d="M28 16v12l7 7" stroke="var(--foreground)" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="28" r="2" fill="var(--foreground)" opacity="0.5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Complete Confidentiality',
    description: 'Client financial data is handled under strict professional confidentiality obligations. We have never disclosed client information to any third party.',
    detail: 'All staff sign confidentiality agreements. Data stored on encrypted, access-controlled systems.',
    svg: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="16" y="26" width="24" height="16" rx="3"
          stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.25" />
        <path d="M21 26v-6a7 7 0 0114 0v6"
          stroke="var(--foreground)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />
        <circle cx="28" cy="34" r="2.5" fill="var(--foreground)" opacity="0.5" />
        <line x1="28" y1="36.5" x2="28" y2="39"
          stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Fixed-Fee Transparency',
    description: 'Every engagement is scoped and priced upfront in a written letter. No surprise invoices, no "additional hours" billing without prior agreement.',
    detail: "We have never sent an invoice that wasn't agreed to before the work began.",
    svg: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <rect x="14" y="12" width="28" height="34" rx="3"
          stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.2" />
        <line x1="20" y1="22" x2="36" y2="22" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.35" />
        <line x1="20" y1="29" x2="32" y2="29" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.35" />
        <line x1="20" y1="36" x2="28" y2="36" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.35" />
        <path d="M30 34l3 3 5-5" stroke="var(--foreground)" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// ─────────────────────────────────────────────
// FEATURE CARD
// ─────────────────────────────────────────────
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col gap-5 p-7 md:p-9 rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: hovered ? 'var(--card)' : 'transparent',
        borderColor: hovered ? 'var(--foreground)' : 'var(--border)',
        transition: 'background-color 0.22s ease, border-color 0.22s ease',
      }}
    >
      {/* Large faded watermark number */}
      <span
        className="absolute right-5 bottom-3 font-black text-foreground select-none pointer-events-none"
        style={{
          fontSize: '80px',
          fontFamily: 'Poppins, sans-serif',
          opacity: 0.03,
          lineHeight: 1,
        }}
      >
        {feature.number}
      </span>

      {/* Top row: icon + faint number */}
      <div className="flex items-start justify-between">
        <div className="relative z-10">{feature.svg}</div>
        <span
          className="font-black leading-none select-none"
          style={{
            fontSize: '40px',
            fontFamily: 'Poppins, sans-serif',
            color: 'var(--foreground)',
            opacity: 0.06,
            lineHeight: 1,
          }}
        >
          {feature.number}
        </span>
      </div>

      {/* Text block */}
      <div className="relative z-10 flex flex-col gap-2.5">
        <h3
          className="font-bold text-foreground"
          style={{ fontSize: 'clamp(18px, 2vw, 22px)', fontFamily: 'Poppins, sans-serif' }}
        >
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Expandable detail — reveals on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <div className="flex items-start gap-2 pt-2 border-t border-border mt-1">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5">
                  <circle cx="8" cy="8" r="6.5" stroke="var(--muted-foreground)" strokeWidth="1" />
                  <path d="M8 7v5M8 5v1" stroke="var(--muted-foreground)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.detail}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom sweep line on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ backgroundColor: 'var(--foreground)' }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.32 }}
      />
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// SECTION EXPORT
// ─────────────────────────────────────────────
export function WhyUsSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADING ── */}
        <div ref={headingRef} className="mb-16 md:mb-20">
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
                  Why Trust Us
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
                  Your financial success<br />is our only priority.
                </motion.h2>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base text-muted-foreground leading-relaxed lg:pb-1"
            >
              Four commitments we make to every client — not as marketing language,
              but as operational standards we are held to. Hover each card for the detail.
            </motion.p>
          </div>

          {/* Divider line that draws itself left-to-right */}
          <motion.div
            className="h-px bg-border mt-10"
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* ── FEATURE CARDS 2×2 ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}