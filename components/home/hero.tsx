'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const words = ['Compliance.', 'Clarity.', 'Confidence.', 'Growth.']
  const [wordIdx, setWordIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      ref={ref}
      className="min-h-screen relative overflow-hidden pt-16 flex items-center bg-background"
    >
      {/* ── BACKGROUND: same style as other pages (diagonal lines + dot grid) ── */}

      {/* Diagonal ruled lines */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y: bgY }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="absolute h-px"
            style={{
              top: `${i * 6.5}%`, left: '-10%', right: '-10%',
              backgroundColor: 'var(--border)', opacity: 0.45,
              transform: 'rotate(-6deg)', transformOrigin: 'left center',
            }} />
        ))}
      </motion.div>

      {/* Dot grid */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }} />

      {/* Radial vignette — clears the centre for readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, var(--background) 100%)',
        }} />

      {/* Bottom fade */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 60%, var(--background) 100%)' }} />

      {/* Large watermark */}
      <div className="absolute right-[-3%] bottom-[8%] z-[1] pointer-events-none select-none"
        style={{
          fontSize: 'clamp(140px, 24vw, 340px)',
          fontFamily: 'Poppins, sans-serif', fontWeight: 900,
          color: 'var(--foreground)', opacity: 0.025,
          lineHeight: 0.85, letterSpacing: '-0.06em',
        }}>
        CA
      </div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-0 pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-20 items-center">

          {/* LEFT — headline + CTA */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-8 bg-foreground/40" />
              <span className="text-xs uppercase tracking-[0.28em] text-foreground/50 font-semibold">
                Professional CA Services · Est. 2010
              </span>
            </motion.div>

            {/* Line 1 */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="font-black text-foreground leading-[0.9] tracking-tight"
                style={{ fontSize: 'clamp(48px, 8vw, 112px)', fontFamily: 'Poppins, sans-serif' }}
              >
                Clarity in
              </motion.h1>
            </div>

            {/* Line 2 */}
            <div className="overflow-hidden mb-3">
              <motion.h1
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.13, ease: [0.16, 1, 0.3, 1] }}
                className="font-black text-foreground leading-[0.9] tracking-tight"
                style={{ fontSize: 'clamp(48px, 8vw, 112px)', fontFamily: 'Poppins, sans-serif' }}
              >
                Numbers.
              </motion.h1>
            </div>

            {/* Cycling word */}
            <div className="overflow-hidden mb-8"
              style={{ height: 'clamp(52px, 8.5vw, 118px)' }}>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={wordIdx}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black leading-[0.9] tracking-tight"
                  style={{
                    fontSize: 'clamp(48px, 8vw, 112px)',
                    fontFamily: 'Poppins, sans-serif',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {words[wordIdx]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38 }}
              className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-lg mb-9"
            >
              Comprehensive tax planning, auditing, GST compliance, and strategic financial advisory — delivered by practising CAs who take your success personally.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/services"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-foreground text-background rounded-xl text-sm font-semibold hover:bg-foreground/90 transition-all hover:shadow-xl"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                Explore Services
                <motion.span className="inline-block"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
                  →
                </motion.span>
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-border text-foreground rounded-xl text-sm font-semibold hover:bg-muted hover:border-foreground transition-all"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                Free Consultation
              </Link>
              <Link href="/about"
                className="inline-flex items-center justify-center px-7 py-4 text-foreground/50 text-sm font-semibold hover:text-foreground transition-colors"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                Our Story ↗
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — static info cards (NO floating animation) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col gap-4 relative"
          >
            {/* Card 1 — practice area tags */}
            <div className="p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-md">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">
                Practice Areas
              </p>
              <div className="flex flex-wrap gap-2">
                {['Tax Planning', 'GST', 'Audit', 'FEMA', 'NRI Advisory', 'IBC', 'Transfer Pricing'].map(tag => (
                  <span key={tag}
                    className="px-2.5 py-1 rounded-full border border-border text-xs text-foreground/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2 — on-time filings */}
            <div className="p-5 rounded-2xl border border-border bg-background/80 backdrop-blur-md flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path d="M9 12l2 2 4-4" stroke="var(--background)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 3H7a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V7l-3-4z" stroke="var(--background)" strokeWidth="1.2" />
                  <path d="M12 3v4h4" stroke="var(--background)" strokeWidth="1.2" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">100% On-Time Filings</p>
                <p className="text-xs text-muted-foreground mt-0.5">Not a single deadline missed in 5 years</p>
              </div>
            </div>

            {/* Card 3 — response time */}
            <div className="p-5 rounded-2xl border border-border bg-background/80 backdrop-blur-md flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <circle cx="10" cy="10" r="7" stroke="var(--foreground)" strokeWidth="1.3" />
                  <path d="M10 6v4l2.5 2.5" stroke="var(--foreground)" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">Response in &lt; 24 hours</p>
                <p className="text-xs text-muted-foreground mt-0.5">Direct CA contact — no coordinators</p>
              </div>
            </div>

            {/* Decorative offset border */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-border pointer-events-none"
              style={{ zIndex: -1, opacity: 0.3 }} />
          </motion.div>
        </div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-transparent via-foreground/30 to-transparent"
        />
        <span className="text-xs uppercase tracking-widest text-foreground/25">Scroll</span>
      </motion.div>
    </section>
  )
}
