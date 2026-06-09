'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

// ─────────────────────────────────────────────
// DATA — images replaced with inline SVGs
// ─────────────────────────────────────────────
const processSteps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We start with a thorough discussion about your financial situation, compliance posture, and goals. No templates, no assumptions — every conversation starts from scratch.',
    sub: 'Free, 30-minute initial call with a qualified CA.',
    svg: (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="300" fill="var(--muted)" />
        {/* Dot grid */}
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 13 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={20 + c * 38} cy={20 + r * 38} r="1.2"
              fill="var(--border)" opacity="0.6" />
          ))
        )}
        {/* Two speech bubbles suggesting a conversation */}
        <rect x="60" y="60" width="180" height="90" rx="12"
          stroke="var(--foreground)" strokeWidth="1.5" fill="none" opacity="0.25" />
        <path d="M80 150 L75 165 L100 150" stroke="var(--foreground)" strokeWidth="1.2"
          fill="none" opacity="0.2" />
        {/* Bubble lines */}
        {[88, 108, 128].map((y, i) => (
          <line key={i} x1="80" y1={y} x2={[200, 180, 160][i]} y2={y}
            stroke="var(--foreground)" strokeWidth="1" opacity="0.3" />
        ))}
        {/* Response bubble — right side */}
        <rect x="240" y="120" width="180" height="90" rx="12"
          stroke="var(--foreground)" strokeWidth="1.5" fill="var(--foreground)" fillOpacity="0.04" opacity="0.9" />
        <path d="M400 120 L405 105 L380 120" stroke="var(--foreground)" strokeWidth="1.2"
          fill="none" opacity="0.2" />
        {[148, 168, 188].map((y, i) => (
          <line key={i} x1="260" y1={y} x2={[390, 370, 340][i]} y2={y}
            stroke="var(--foreground)" strokeWidth="1" opacity="0.3" />
        ))}
        {/* Two abstract people silhouettes */}
        <circle cx="110" cy="235" r="18" stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.2" />
        <path d="M80 275 Q110 250 140 275" stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.2" />
        <circle cx="370" cy="235" r="18" stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.2" />
        <path d="M340 275 Q370 250 400 275" stroke="var(--foreground)" strokeWidth="1.2" fill="none" opacity="0.2" />
        {/* Corner brackets */}
        <path d="M16 16 L16 36 M16 16 L36 16" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M464 16 L464 36 M464 16 L444 16" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M16 284 L16 264 M16 284 L36 284" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M464 284 L464 264 M464 284 L444 284" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Analysis',
    description: 'We conduct a comprehensive review of your financial records, prior filings, compliance history, and liability exposure — identifying every opportunity and risk before proposing a path forward.',
    sub: 'You receive a written gap-analysis report within 5 working days.',
    svg: (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="300" fill="var(--muted)" />
        {/* Grid axes */}
        <line x1="60" y1="40" x2="60" y2="250" stroke="var(--foreground)" strokeWidth="1" opacity="0.3" />
        <line x1="60" y1="250" x2="420" y2="250" stroke="var(--foreground)" strokeWidth="1" opacity="0.3" />
        {/* Grid lines */}
        {[80,120,160,200,240].map(y => (
          <line key={y} x1="60" y1={y} x2="420" y2={y} stroke="var(--border)" strokeWidth="0.7" />
        ))}
        {/* Bar chart — before advisory */}
        {[
          { x: 85, h: 120 }, { x: 145, h: 95 }, { x: 205, h: 140 },
          { x: 265, h: 80 }, { x: 325, h: 110 }, { x: 385, h: 160 },
        ].map((b, i) => (
          <rect key={i} x={b.x} y={250 - b.h} width="28" height={b.h} rx="3"
            fill="var(--foreground)" opacity={0.06 + i * 0.015} />
        ))}
        {/* Trend line */}
        <polyline points="99,175 159,205 219,145 279,195 339,165 399,120"
          stroke="var(--foreground)" strokeWidth="1" fill="none" strokeDasharray="4 3" opacity="0.25" />
        {/* Rising analysis line */}
        <polyline points="99,200 159,180 219,155 279,130 339,100 399,75"
          stroke="var(--foreground)" strokeWidth="2" fill="none" />
        {[99,159,219,279,339,399].map((x, i) => {
          const ys = [200,180,155,130,100,75]
          return <circle key={i} cx={x} cy={ys[i]} r="4"
            fill="var(--background)" stroke="var(--foreground)" strokeWidth="1.5" />
        })}
        {/* Magnifier over data */}
        <circle cx="340" cy="100" r="35" stroke="var(--foreground)" strokeWidth="1.5" fill="none" opacity="0.18" />
        <circle cx="340" cy="100" r="22" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.28" />
        <line x1="358" y1="118" x2="378" y2="140" stroke="var(--foreground)" strokeWidth="2.5"
          strokeLinecap="round" opacity="0.35" />
        {/* Corner brackets */}
        <path d="M16 16 L16 36 M16 16 L36 16" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M464 16 L464 36 M464 16 L444 16" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M16 284 L16 264 M16 284 L36 284" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M464 284 L464 264 M464 284 L444 284" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Strategy',
    description: 'Based on our analysis, we develop a written financial strategy with clear recommendations, implementation timelines, and fee proposals — all in plain language, no jargon.',
    sub: 'Fixed-fee engagement letter agreed before any execution begins.',
    svg: (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="300" fill="var(--muted)" />
        {/* Document stack */}
        <rect x="180" y="55" width="170" height="210" rx="6"
          stroke="var(--foreground)" strokeWidth="0.8" fill="var(--foreground)" fillOpacity="0.03" opacity="0.5"
          style={{ transform: 'rotate(3deg)', transformOrigin: '265px 160px' }} />
        <rect x="172" y="50" width="170" height="210" rx="6"
          stroke="var(--foreground)" strokeWidth="1" fill="var(--foreground)" fillOpacity="0.04" opacity="0.6"
          style={{ transform: 'rotate(1.5deg)', transformOrigin: '257px 155px' }} />
        {/* Main document */}
        <rect x="155" y="45" width="170" height="210" rx="6"
          stroke="var(--foreground)" strokeWidth="1.5" fill="var(--background)" fillOpacity="0.06" />
        {/* Document header */}
        <rect x="155" y="45" width="170" height="28" rx="6"
          fill="var(--foreground)" opacity="0.08" />
        <line x1="155" y1="73" x2="325" y2="73" stroke="var(--foreground)" strokeWidth="0.5" opacity="0.3" />
        <text x="175" y="63" fontSize="8" fontWeight="600" fill="var(--foreground)"
          fontFamily="Poppins,sans-serif" opacity="0.5">ENGAGEMENT PROPOSAL</text>
        {/* Document lines */}
        {[90, 108, 126, 144, 162, 180, 198, 216].map((y, i) => (
          <line key={i} x1="172" y1={y} x2={[290, 310, 280, 300, 270, 295, 285, 260][i]} y2={y}
            stroke="var(--border)" strokeWidth="0.9" />
        ))}
        {/* Checkbox items */}
        {[230, 245].map((y, i) => (
          <g key={i}>
            <rect x="172" y={y - 8} width="10" height="10" rx="2"
              stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M174 {y-3} L176 {y-1} L180 {y-5}"
              stroke="var(--foreground)" strokeWidth="1" opacity={i === 0 ? 0.5 : 0} />
            <line x1="187" y1={y - 2} x2={[240, 225][i]} y2={y - 2}
              stroke="var(--border)" strokeWidth="0.9" />
          </g>
        ))}
        {/* Signature line */}
        <line x1="172" y1="258" x2="260" y2="258" stroke="var(--foreground)" strokeWidth="0.8" opacity="0.3" />
        <text x="172" y="253" fontSize="7" fill="var(--muted-foreground)"
          fontFamily="Poppins,sans-serif" opacity="0.4">Signature</text>
        {/* Corner brackets */}
        <path d="M16 16 L16 36 M16 16 L36 16" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M464 16 L464 36 M464 16 L444 16" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M16 284 L16 264 M16 284 L36 284" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M464 284 L464 264 M464 284 L444 284" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Execution',
    description: 'We implement every deliverable with quality checks at each stage. All filings are reviewed by a senior CA before submission. You receive confirmation and documentation for every action taken.',
    sub: '100% on-time filings — not a single statutory deadline missed in 5 years.',
    svg: (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="480" height="300" fill="var(--muted)" />
        {/* Horizontal process pipeline */}
        <line x1="60" y1="150" x2="420" y2="150" stroke="var(--border)" strokeWidth="1.5" />
        {/* Stage nodes */}
        {[80, 190, 300, 410].map((x, i) => (
          <g key={i}>
            {/* Filled for completed, outline for in-progress */}
            <circle cx={x} cy="150" r={i < 3 ? 22 : 18}
              fill={i < 3 ? 'var(--foreground)' : 'var(--background)'}
              stroke="var(--foreground)" strokeWidth={i < 3 ? 0 : 1.5}
              opacity={i < 3 ? 0.15 : 0.4} />
            <circle cx={x} cy="150" r={i < 3 ? 14 : 12}
              fill={i < 3 ? 'var(--foreground)' : 'none'}
              stroke={i < 3 ? 'none' : 'var(--foreground)'}
              strokeWidth={i < 3 ? 0 : 1}
              opacity={i < 3 ? 0.5 : 0.3} />
            {/* Checkmarks for done, number for current */}
            {i < 3 ? (
              <path d={`M${x - 7} 150 L${x - 2} 155 L${x + 7} 143`}
                stroke="var(--foreground)" strokeWidth="1.5" fill="none" opacity="0.8"
                strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <text x={x} y="155" textAnchor="middle" fontSize="10" fontWeight="700"
                fill="var(--foreground)" fontFamily="Poppins,sans-serif" opacity="0.6">04</text>
            )}
            {/* Stage labels below */}
            <text x={x} y="188" textAnchor="middle" fontSize="9"
              fill="var(--foreground)" fontFamily="Poppins,sans-serif"
              opacity={i < 3 ? 0.4 : 0.65}>
              {['Scope','Prepare','Review','Submit'][i]}
            </text>
          </g>
        ))}
        {/* Progress fill on line */}
        <line x1="60" y1="150" x2="330" y2="150" stroke="var(--foreground)" strokeWidth="2" opacity="0.3" />
        {/* Calendar / deadline indicator */}
        <rect x="170" y="50" width="140" height="70" rx="6"
          stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.18" />
        <line x1="170" y1="68" x2="310" y2="68" stroke="var(--foreground)" strokeWidth="0.8" opacity="0.2" />
        <text x="240" y="62" textAnchor="middle" fontSize="8" fontWeight="600"
          fill="var(--foreground)" fontFamily="Poppins,sans-serif" opacity="0.4">DUE DATE MET</text>
        {/* Tick mark large */}
        <path d="M210 95 L230 115 L270 78"
          stroke="var(--foreground)" strokeWidth="2.5" fill="none" opacity="0.2"
          strokeLinecap="round" strokeLinejoin="round" />
        {/* Corner brackets */}
        <path d="M16 16 L16 36 M16 16 L36 16" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M464 16 L464 36 M464 16 L444 16" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M16 284 L16 264 M16 284 L36 284" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
        <path d="M464 284 L464 264 M464 284 L444 284" stroke="var(--foreground)" strokeWidth="1.2" opacity="0.22" />
      </svg>
    ),
  },
]

// ─────────────────────────────────────────────
// STEP ROW
// ─────────────────────────────────────────────
function StepRow({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const svgRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: svgRef,
    offset: ['start end', 'end start'],
  })
  // Gentle parallax ±24px
  const svgY = useTransform(scrollYProgress, [0, 1], [24, -24])

  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
    >
      {/* SVG PANEL */}
      <motion.div
        ref={svgRef}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`relative ${!isLeft ? 'md:order-2' : ''}`}
      >
        {/* Offset shadow border */}
        <div
          className="absolute inset-0 rounded-2xl border border-border pointer-events-none"
          style={{
            transform: isLeft ? 'translate(10px, 10px)' : 'translate(-10px, 10px)',
            zIndex: 0, opacity: 0.45,
          }}
        />
        <motion.div
          className="relative rounded-2xl overflow-hidden border border-border aspect-video"
          style={{ backgroundColor: 'var(--muted)', zIndex: 1,  y: svgY  }}
        >
          {step.svg}
          {/* Faint step number watermark */}
          <div
            className="absolute top-4 right-5 font-black text-foreground pointer-events-none select-none"
            style={{ fontSize: '72px', fontFamily: 'Poppins, sans-serif', opacity: 0.04, lineHeight: 1 }}
          >
            {step.number}
          </div>
        </motion.div>
      </motion.div>

      {/* TEXT PANEL */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`flex flex-col gap-6 ${!isLeft ? 'md:order-1' : ''}`}
      >
        {/* Step number + rule */}
        <div className="flex items-center gap-3">
          <span
            className="font-black text-foreground leading-none select-none"
            style={{ fontSize: '56px', fontFamily: 'Poppins, sans-serif', opacity: 0.08, lineHeight: 1 }}
          >
            {step.number}
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Heading */}
        <h3
          className="font-bold text-foreground leading-tight"
          style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontFamily: 'Poppins, sans-serif' }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {step.description}
        </p>

        {/* Sub-detail pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-start gap-2.5 p-3.5 rounded-xl border border-border"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5">
            <circle cx="8" cy="8" r="6.5" stroke="var(--foreground)" strokeWidth="1" opacity="0.4" />
            <path d="M8 5v4l2.5 2.5" stroke="var(--foreground)" strokeWidth="1.2"
              strokeLinecap="round" opacity="0.5" />
          </svg>
          <p className="text-xs text-muted-foreground leading-relaxed">{step.sub}</p>
        </motion.div>

        {/* Animated underline */}
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
// SECTION EXPORT
// ─────────────────────────────────────────────
export function ProcessNewSection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-60px' })

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HEADING ── */}
        <div ref={headingRef} className="mb-20 md:mb-28">
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
                  Our Execution Process
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
                  Four steps to<br />financial excellence.
                </motion.h2>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base text-muted-foreground leading-relaxed lg:pb-1"
            >
              Every client engagement follows the same four-stage process — from the first call to the final filing. Transparent, documented, and accountable at every step.
            </motion.p>
          </div>

          {/* Self-drawing divider */}
          <motion.div
            className="h-px bg-border mt-10"
            initial={{ scaleX: 0 }}
            animate={headingInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* ── STEP ROWS ── */}
        <div className="space-y-24 md:space-y-32">
          {processSteps.map((step, index) => (
            <StepRow key={step.number} step={step} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}