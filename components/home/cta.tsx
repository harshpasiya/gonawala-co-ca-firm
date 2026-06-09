'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const lines = [
    'Ready to put your',
    'finances in',
    'expert hands?',
  ]

  const trustItems = [
    { value: '< 24h', label: 'Response time' },
    { value: 'Free', label: 'First consultation' },
    { value: '15+', label: 'Years experience' },
    { value: '600+', label: 'Active clients' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-background"
    >
      {/* ── BACKGROUND LAYERS ── */}

      {/* Parallax dot grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.4,
          }}
        />
      </motion.div>

      {/* Diagonal lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="absolute h-px"
            style={{
              top: `${i * 11}%`, left: '-10%', right: '-10%',
              backgroundColor: 'var(--border)', opacity: 0.3,
              transform: 'rotate(-4deg)', transformOrigin: 'left center',
            }} />
        ))}
      </div>

      {/* Radial vignette — clears the centre */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, var(--background) 100%)',
        }}
      />

      {/* Large faded watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          style={{
            fontSize: 'clamp(80px, 18vw, 240px)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
            color: 'var(--foreground)',
            opacity: 0.025,
            letterSpacing: '-0.05em',
            whiteSpace: 'nowrap',
          }}
        >
          LET'S TALK
        </span>
      </div>

      {/* ── CONTENT ── */}
      <div
        ref={ref}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col items-center text-center gap-10">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-8 bg-foreground/40" />
            <span className="text-xs uppercase tracking-[0.26em] text-muted-foreground font-semibold">
              Get In Touch
            </span>
            <div className="h-px w-8 bg-foreground/40" />
          </motion.div>

          {/* Heading — each line slides up independently */}
          <div className="flex flex-col items-center gap-1">
            {lines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2
                  initial={{ y: 72, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.85, delay: 0.08 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black leading-[0.92] tracking-tight"
                  style={{
                    fontSize: 'clamp(40px, 7vw, 96px)',
                    fontFamily: 'Poppins, sans-serif',
                    color: i === 2 ? 'var(--muted-foreground)' : 'var(--foreground)',
                  }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.38 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
          >
            Schedule a no-obligation consultation. We'll review your current compliance posture, identify gaps, and propose a clear path forward — at no charge.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.48 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            {/* Primary */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold"
              style={{
                backgroundColor: 'var(--foreground)',
                color: 'var(--background)',
                fontFamily: 'Poppins, sans-serif',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
            >
              Schedule Consultation
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </Link>

            {/* Secondary */}
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border border-border"
              style={{
                color: 'var(--foreground)',
                fontFamily: 'Poppins, sans-serif',
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--foreground)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
            >
              Explore Services
            </Link>

            {/* Ghost */}
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-4 text-sm font-semibold transition-colors"
              style={{ color: 'var(--muted-foreground)', fontFamily: 'Poppins, sans-serif' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--foreground)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)'}
            >
              Our Story ↗
            </Link>
          </motion.div>

          {/* Trust stat strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-px border border-border rounded-2xl overflow-hidden"
          >
            {trustItems.map((item, i) => (
              <div
                key={item.label}
                className="flex flex-col items-center px-7 py-4 gap-0.5"
                style={{
                  borderRight: i < trustItems.length - 1 ? '1px solid var(--border)' : 'none',
                  backgroundColor: 'var(--card)',
                }}
              >
                <span
                  className="font-black text-foreground tabular-nums"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}
                >
                  {item.value}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ICAI badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {['ICAI Member Firm', 'RBI Empanelled', 'ISO Certified', 'Est. 2010'].map(badge => (
              <div key={badge} className="flex items-center gap-1.5 text-xs text-muted-foreground opacity-50">
                <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                {badge}
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}