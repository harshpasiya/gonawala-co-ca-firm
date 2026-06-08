'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

// ─────────────────────────────────────────────
// DATA — replaced image-dependent features with
// CA-relevant content + inline SVG illustrations
// ─────────────────────────────────────────────
const features = [
  {
    title: 'Real-Time Compliance Tracking',
    description:
      'Every GST return, TDS filing, and ROC deadline is tracked in a live dashboard shared with your team. You always know what is filed, what is pending, and what is due next — without chasing anyone.',
    bullets: ['GST & TDS deadline calendar', 'Automated filing confirmations', 'Notice & response tracking'],
    position: 'left',
    svg: (
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="320" fill="var(--muted)" />
        {/* Grid background */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="40" y1={50 + i * 38} x2="440" y2={50 + i * 38}
            stroke="var(--border)" strokeWidth="0.8" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 50} y1="50" x2={40 + i * 50} y2="278"
            stroke="var(--border)" strokeWidth="0.8" />
        ))}
        {/* Bar chart */}
        {[
          { x: 65, h: 80 }, { x: 115, h: 120 }, { x: 165, h: 95 },
          { x: 215, h: 150 }, { x: 265, h: 110 }, { x: 315, h: 170 },
          { x: 365, h: 130 }, { x: 415, h: 190 },
        ].map((bar, i) => (
          <rect key={i} x={bar.x} y={278 - bar.h} width="32" height={bar.h}
            fill="var(--foreground)" opacity={0.05 + i * 0.018} rx="3" />
        ))}
        {/* Rising line graph */}
        <polyline
          points="81,230 131,195 181,210 231,155 281,175 331,120 381,140 431,90"
          stroke="var(--foreground)" strokeWidth="2" fill="none" />
        {[81,131,181,231,281,331,381,431].map((x, i) => {
          const ys = [230, 195, 210, 155, 175, 120, 140, 90]
          return (
            <circle key={i} cx={x} cy={ys[i]} r="4"
              fill="var(--background)" stroke="var(--foreground)" strokeWidth="1.5" />
          )
        })}
        {/* Axes */}
        <line x1="40" y1="50" x2="40" y2="278" stroke="var(--foreground)" strokeWidth="1" opacity="0.4" />
        <line x1="40" y1="278" x2="440" y2="278" stroke="var(--foreground)" strokeWidth="1" opacity="0.4" />
        {/* Tooltip */}
        <rect x="300" y="95" width="110" height="48" rx="6"
          fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
        <text x="312" y="115" fontSize="9" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif">GSTR-3B Filed</text>
        <text x="312" y="132" fontSize="13" fontWeight="700" fill="var(--foreground)" fontFamily="Poppins,sans-serif">On Time ✓</text>
        {/* Corner brackets */}
        <path d="M18 18 L18 40 M18 18 L40 18" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
        <path d="M462 18 L462 40 M462 18 L440 18" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
        <path d="M18 302 L18 280 M18 302 L40 302" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
        <path d="M462 302 L462 280 M462 302 L440 302" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: 'Expert CA Consultation — Direct Access',
    description:
      'Every client at our firm is assigned a qualified CA as their primary contact — not a relationship manager, not a trainee. You call, they answer. All advisory is provided by the person who signed your audit report.',
    bullets: ['Dedicated CA for every client', 'Direct phone & email access', 'Same-day responses on working days'],
    position: 'right',
    svg: (
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="320" fill="var(--muted)" />
        {/* Abstract mesh lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={i * 65} y1="0" x2={i * 65 + 40} y2="320"
            stroke="var(--border)" strokeWidth="0.7" />
        ))}
        {/* Central person */}
        <circle cx="240" cy="110" r="40" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
        <circle cx="240" cy="110" r="22" fill="var(--foreground)" opacity="0.07" />
        <circle cx="240" cy="95" r="14" stroke="var(--foreground)" strokeWidth="1.2" fill="none" />
        <path d="M210 140 Q240 120 270 140 L278 190 L202 190 Z"
          stroke="var(--foreground)" strokeWidth="1.2" fill="none" />
        {/* Credential badge */}
        <rect x="262" y="72" width="55" height="22" rx="4"
          fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
        <text x="268" y="87" fontSize="9" fontWeight="700" fill="var(--foreground)" fontFamily="Poppins,sans-serif">FCA · DISA</text>
        {/* Connecting spokes to clients */}
        {[
          { cx: 90, cy: 100 }, { cx: 80, cy: 220 },
          { cx: 390, cy: 100 }, { cx: 400, cy: 220 },
          { cx: 240, cy: 270 },
        ].map((node, i) => (
          <g key={i}>
            <line x1="240" y1="140" x2={node.cx} y2={node.cy}
              stroke="var(--foreground)" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
            <circle cx={node.cx} cy={node.cy} r="18"
              stroke="var(--border)" strokeWidth="1" fill="var(--background)" />
            <circle cx={node.cx} cy={node.cy - 6} r="7"
              stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.4" />
            <path d={`M${node.cx - 10} ${node.cy + 10} Q${node.cx} ${node.cy + 2} ${node.cx + 10} ${node.cy + 10}`}
              stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.4" />
          </g>
        ))}
        {/* Corner brackets */}
        <path d="M18 18 L18 40 M18 18 L40 18" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
        <path d="M462 18 L462 40 M462 18 L440 18" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
        <path d="M18 302 L18 280 M18 302 L40 302" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
        <path d="M462 302 L462 280 M462 302 L440 302" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: 'Proactive Regulatory Compliance',
    description:
      'We do not wait for notices. Our compliance calendar triggers internal reviews 30 days before every major deadline. When the law changes, we update your filings — before the change causes a problem.',
    bullets: ['30-day advance internal review', 'Instant regulatory change alerts', 'Zero penalties track record — 5 years'],
    position: 'left',
    svg: (
      <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="320" fill="var(--muted)" />
        {/* Calendar grid */}
        <rect x="60" y="40" width="360" height="240" rx="8"
          stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.2" />
        {/* Header bar */}
        <rect x="60" y="40" width="360" height="36" rx="8"
          fill="var(--foreground)" opacity="0.06" />
        <line x1="60" y1="76" x2="420" y2="76" stroke="var(--border)" strokeWidth="1" />
        <text x="240" y="64" textAnchor="middle" fontSize="11" fontWeight="600"
          fill="var(--foreground)" fontFamily="Poppins,sans-serif" opacity="0.6">March 2025</text>
        {/* Day columns */}
        {['M','T','W','T','F','S','S'].map((d, i) => (
          <text key={i} x={90 + i * 50} y="96" textAnchor="middle" fontSize="9"
            fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif">{d}</text>
        ))}
        {/* Day cells */}
        {Array.from({ length: 28 }).map((_, i) => {
          const col = i % 7
          const row = Math.floor(i / 7)
          const cx = 90 + col * 50
          const cy = 120 + row * 42
          const day = i + 1
          const isDeadline = [7, 15, 20, 28].includes(day)
          const isPast = day < 12
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r="14"
                fill={isDeadline ? 'var(--foreground)' : 'none'}
                opacity={isDeadline ? 0.12 : 0}
                stroke={isDeadline ? 'var(--foreground)' : 'none'}
                strokeWidth={isDeadline ? 1 : 0} />
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10"
                fill={isDeadline ? 'var(--foreground)' : isPast ? 'var(--muted-foreground)' : 'var(--foreground)'}
                fontFamily="Poppins,sans-serif"
                opacity={isPast ? 0.35 : 0.7}
                fontWeight={isDeadline ? '700' : '400'}>
                {day}
              </text>
              {isPast && (
                <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy}
                  stroke="var(--foreground)" strokeWidth="0.8" opacity="0.2" />
              )}
            </g>
          )
        })}
        {/* Deadline label */}
        <rect x="290" y="108" width="90" height="22" rx="4"
          fill="var(--background)" stroke="var(--border)" strokeWidth="1" />
        <text x="335" y="123" textAnchor="middle" fontSize="8"
          fill="var(--foreground)" fontFamily="Poppins,sans-serif">GSTR-3B Due</text>
        <line x1="290" y1="119" x2="278" y2="119" stroke="var(--border)" strokeWidth="0.8" />
        {/* Corner brackets */}
        <path d="M18 18 L18 40 M18 18 L40 18" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
        <path d="M462 18 L462 40 M462 18 L440 18" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
        <path d="M18 302 L18 280 M18 302 L40 302" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
        <path d="M462 302 L462 280 M462 302 L440 302" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.3" />
      </svg>
    ),
  },
]

// ─────────────────────────────────────────────
// FEATURE CARD
// ─────────────────────────────────────────────
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const scrollRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  })
  // Subtle SVG parallax — much gentler than original (±30px not ±100px)
  const svgY = useTransform(scrollYProgress, [0, 1], [30, -30])

  const isLeft = feature.position === 'left'

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
    >
      {/* SVG illustration panel */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`relative ${!isLeft ? 'md:order-2' : ''}`}
      >
        {/* Offset decorative border */}
        <div
          className="absolute inset-0 rounded-2xl border border-border"
          style={{ transform: isLeft ? 'translate(10px, 10px)' : 'translate(-10px, 10px)', zIndex: 0 }}
        />
        {/* Main illustration box */}
        <motion.div
          style={{ y: svgY }}
          className="relative rounded-2xl overflow-hidden border border-border aspect-video"
          style={{ backgroundColor: 'var(--muted)', zIndex: 1 }}
        >
          {feature.svg}

          {/* Feature number watermark */}
          <div
            className="absolute top-4 right-5 font-black text-foreground select-none pointer-events-none"
            style={{
              fontSize: '72px',
              fontFamily: 'Poppins, sans-serif',
              opacity: 0.04,
              lineHeight: 1,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
        </motion.div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`flex flex-col gap-6 ${!isLeft ? 'md:order-1' : ''}`}
      >
        {/* Number + eyebrow */}
        <div className="flex items-center gap-3">
          <span
            className="font-black text-foreground/10 leading-none select-none"
            style={{ fontSize: '56px', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Heading */}
        <h3
          className="font-bold text-foreground leading-tight"
          style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontFamily: 'Poppins, sans-serif' }}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Bullet points */}
        <div className="flex flex-col gap-2.5">
          {feature.bullets.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.35 + i * 0.08 }}
              className="flex items-start gap-3"
            >
              <div className="w-5 h-5 rounded-full border border-foreground/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3">
                  <path d="M2 5l2 2 4-4" stroke="var(--foreground)" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm text-foreground/70 leading-relaxed">{b}</span>
            </motion.div>
          ))}
        </div>

        {/* Animated underline accent */}
        <motion.div
          className="h-px bg-foreground"
          initial={{ width: 0 }}
          animate={inView ? { width: '48px' } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────
export function FeaturesSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div ref={headingRef} className="mb-20 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">

            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={headingInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-8 bg-foreground/50" />
                <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground font-semibold">
                  How We Work
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: 60, opacity: 0 }}
                  animate={headingInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bold text-foreground leading-tight"
                  style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontFamily: 'Poppins, sans-serif' }}
                >
                  Built for modern<br />accountancy.
                </motion.h2>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed lg:pb-2"
            >
              Three capabilities that define how we serve clients differently — from real-time compliance visibility to direct CA access and proactive regulatory management.
            </motion.p>
          </div>

          {/* Full-width divider line that draws itself */}
          <motion.div
            className="h-px bg-border mt-12"
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Feature cards */}
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}