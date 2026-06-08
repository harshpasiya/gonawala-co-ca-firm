'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────
// SERVICE DATA — inline SVGs replace broken images
// ─────────────────────────────────────────────
const services = [
  {
    title: 'Bookkeeping',
    description: 'Maintenance of financial records with organised, accurate, and timely data — giving you a clear picture of your business at any point in time.',
    tag: 'Core Service',
    svg: (
      <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="260" fill="var(--muted)" />
        {/* Ledger columns */}
        {[60, 160, 260, 340].map((x, i) => (
          <line key={i} x1={x} y1="30" x2={x} y2="230"
            stroke="var(--border)" strokeWidth="0.8" />
        ))}
        {/* Ledger rows */}
        {[50, 80, 110, 140, 170, 200, 230].map((y, i) => (
          <line key={i} x1="40" y1={y} x2="360" y2={y}
            stroke="var(--border)" strokeWidth="0.8" />
        ))}
        {/* Header row fill */}
        <rect x="40" y="30" width="320" height="20" fill="var(--foreground)" opacity="0.06" />
        {/* Column header labels */}
        {['Date', 'Description', 'Debit', 'Credit'].map((label, i) => (
          <text key={label} x={[55, 130, 230, 310][i]} y="44"
            fontSize="8" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">
            {label}
          </text>
        ))}
        {/* Data rows — filled cells */}
        {[0,1,2,3,4].map(row => (
          <g key={row}>
            <rect x="41" y={51 + row * 30} width="118" height="28"
              fill="var(--foreground)" opacity={0.02 + row * 0.01} />
            <rect x="161" y={51 + row * 30} width="98" height="28"
              fill="var(--foreground)" opacity={0.015 + row * 0.008} />
            <rect x="261" y={51 + row * 30} width="78" height="28"
              fill="var(--foreground)" opacity={0.025 + row * 0.01} />
          </g>
        ))}
        {/* Sum symbol */}
        <text x="196" y="248" textAnchor="middle" fontSize="18" fontWeight="700"
          fill="var(--foreground)" fontFamily="Poppins,sans-serif" opacity="0.15">∑</text>
        {/* Corner brackets */}
        <path d="M14 14 L14 34 M14 14 L34 14" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
        <path d="M386 14 L386 34 M386 14 L366 14" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
        <path d="M14 246 L14 226 M14 246 L34 246" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
        <path d="M386 246 L386 226 M386 246 L366 246" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
      </svg>
    ),
  },
  {
    title: 'Tax Advisory',
    description: 'Expert guidance for strategic tax planning and compliance management — identifying every legal saving before the financial year closes.',
    tag: 'Core Service',
    svg: (
      <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="260" fill="var(--muted)" />
        {/* Axes */}
        <line x1="50" y1="30" x2="50" y2="220" stroke="var(--foreground)" strokeWidth="1" opacity="0.35" />
        <line x1="50" y1="220" x2="370" y2="220" stroke="var(--foreground)" strokeWidth="1" opacity="0.35" />
        {/* Horizontal grid */}
        {[60,100,140,180].map(y => (
          <line key={y} x1="50" y1={y} x2="370" y2={y} stroke="var(--border)" strokeWidth="0.7" />
        ))}
        {/* Tax savings bars */}
        {[
          { x: 70, before: 160, after: 120 },
          { x: 130, before: 140, after: 95 },
          { x: 190, before: 170, after: 115 },
          { x: 250, before: 130, after: 80 },
          { x: 310, before: 155, after: 100 },
        ].map((bar, i) => (
          <g key={i}>
            <rect x={bar.x} y={bar.before} width="22" height={220 - bar.before}
              fill="var(--foreground)" opacity="0.09" rx="2" />
            <rect x={bar.x + 24} y={bar.after} width="22" height={220 - bar.after}
              fill="var(--foreground)" opacity="0.18" rx="2" />
          </g>
        ))}
        {/* Saving line */}
        <polyline points="81,160 141,140 201,170 261,130 321,155"
          stroke="var(--foreground)" strokeWidth="1" fill="none" strokeDasharray="3 3" opacity="0.3" />
        <polyline points="105,120 165,95 225,115 285,80 345,100"
          stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
        {[105,165,225,285,345].map((x,i) => {
          const ys = [120,95,115,80,100]
          return <circle key={i} cx={x} cy={ys[i]} r="3.5"
            fill="var(--background)" stroke="var(--foreground)" strokeWidth="1.5" />
        })}
        {/* Legend */}
        <rect x="55" y="236" width="10" height="8" rx="1" fill="var(--foreground)" opacity="0.12" />
        <text x="70" y="244" fontSize="8" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">Before</text>
        <rect x="120" y="236" width="10" height="8" rx="1" fill="var(--foreground)" opacity="0.22" />
        <text x="135" y="244" fontSize="8" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">After Advisory</text>
        {/* Corner brackets */}
        <path d="M14 14 L14 34 M14 14 L34 14" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
        <path d="M386 14 L386 34 M386 14 L366 14" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
        <path d="M14 246 L14 226 M14 246 L34 246" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
        <path d="M386 246 L386 226 M386 246 L366 246" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
      </svg>
    ),
  },
  {
    title: 'Audit & Assurance',
    description: 'Comprehensive audits that ensure financial integrity, accuracy, and regulatory compliance — delivered with professional scepticism and documented rigour.',
    tag: 'Core Service',
    svg: (
      <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="260" fill="var(--muted)" />
        {/* Document */}
        <rect x="100" y="30" width="160" height="200" rx="5"
          stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.25" />
        {/* Document lines */}
        {[65,85,105,125,145,165,185].map((y,i) => (
          <line key={i} x1="120" y1={y} x2={[220,240,230,215,235,200,225][i]} y2={y}
            stroke="var(--border)" strokeWidth="1" />
        ))}
        {/* Magnifying glass */}
        <circle cx="272" cy="130" r="55"
          stroke="var(--foreground)" strokeWidth="2" fill="none" opacity="0.2" />
        <circle cx="272" cy="130" r="38"
          stroke="var(--foreground)" strokeWidth="1.5" fill="none" opacity="0.35" />
        <circle cx="272" cy="130" r="18"
          fill="var(--foreground)" opacity="0.06" />
        <line x1="300" y1="158" x2="330" y2="192"
          stroke="var(--foreground)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        {/* Checkmarks inside magnifier */}
        <path d="M258 128 L266 136 L286 118"
          stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        {/* Corner brackets */}
        <path d="M14 14 L14 34 M14 14 L34 14" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
        <path d="M386 14 L386 34 M386 14 L366 14" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
        <path d="M14 246 L14 226 M14 246 L34 246" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
        <path d="M386 246 L386 226 M386 246 L366 246" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.25" />
      </svg>
    ),
  },
]

// ─────────────────────────────────────────────
// SERVICE CARD
// ─────────────────────────────────────────────
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })

  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  })
  // Gentle parallax on the SVG — ±20px only
  const svgY = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col gap-0"
    >
      {/* SVG illustration panel */}
      <div ref={scrollRef} className="relative overflow-hidden rounded-2xl border border-border"
        style={{ backgroundColor: 'var(--muted)' }}>

        {/* Offset decorative border */}
        <div className="absolute inset-0 rounded-2xl border border-border pointer-events-none"
          style={{ transform: 'translate(6px, 6px)', zIndex: 0, opacity: 0.4 }} />

        <motion.div style={{ y: svgY }} className="relative z-10 aspect-video">
          {service.svg}
        </motion.div>

        {/* Hover shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          initial={{ x: '-100%', opacity: 0 }}
          whileHover={{ x: '100%', opacity: 1 }}
          transition={{ duration: 0.6, ease: 'linear' }}
          style={{
            background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--foreground) 6%, transparent), transparent)',
            zIndex: 20,
          }}
        />

        {/* Tag badge */}
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg border border-border text-xs font-semibold"
          style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'Poppins, sans-serif' }}>
          {service.tag}
        </div>

        {/* Large number watermark */}
        <div className="absolute bottom-3 right-4 font-black pointer-events-none select-none"
          style={{
            fontSize: '64px', fontFamily: 'Poppins, sans-serif',
            color: 'var(--foreground)', opacity: 0.04, lineHeight: 1,
          }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Text below image */}
      <div className="pt-6 flex flex-col gap-3">
        {/* Number + title row */}
        <div className="flex items-baseline gap-3">
          <span className="font-black text-foreground/10 leading-none select-none flex-shrink-0"
            style={{ fontSize: '32px', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-bold text-foreground"
            style={{ fontSize: 'clamp(20px, 2.5vw, 26px)', fontFamily: 'Poppins, sans-serif' }}>
            {service.title}
          </h3>
        </div>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        {/* Animated underline that grows on card inView */}
        <motion.div className="h-px bg-foreground"
          initial={{ width: 0 }}
          animate={inView ? { width: '36px' } : {}}
          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
        />
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────
export function ServicesSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADING ── */}
        <div ref={headingRef} className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-8 lg:gap-16 items-end">

            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={headingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="h-px w-8 bg-foreground/50" />
                <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-semibold">
                  Services Overview
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: 60, opacity: 0 }}
                  animate={headingInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bold text-foreground leading-tight"
                  style={{ fontSize: 'clamp(30px, 5vw, 60px)', fontFamily: 'Poppins, sans-serif' }}
                >
                  Structured support across accounting, tax, and reporting.
                </motion.h2>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col gap-5 lg:pb-1"
            >
              <p className="text-base text-muted-foreground leading-relaxed">
                From foundational bookkeeping to strategic tax planning and comprehensive audit services, we deliver financial excellence at every level of your business.
              </p>
              <Link href="/services"
                className="self-start inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-sm font-semibold text-foreground hover:bg-muted hover:border-foreground transition-all"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                View All 18 Services →
              </Link>
            </motion.div>
          </div>

          {/* Divider line draws itself */}
          <motion.div className="h-px bg-border mt-10"
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* ── SERVICE CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* ── BOTTOM CTA STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-border"
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground">
              These are 3 of 18 services we offer.
            </p>
            <p className="text-xs text-muted-foreground">
              From GST compliance to cross-border investment advisory.
            </p>
          </div>
          <Link
            href="/services"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-xl text-sm font-semibold hover:bg-foreground/90 transition-all hover:shadow-lg"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Explore All Services
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}