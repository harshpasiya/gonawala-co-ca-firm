'use client'

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// ─────────────────────────────────────────────
// INLINE SVG ILLUSTRATIONS — monochrome only
// ─────────────────────────────────────────────
function IllustrationFounder() {
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="400" fill="var(--muted)" />
      {/* Abstract person silhouette */}
      <circle cx="160" cy="110" r="50" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
      <circle cx="160" cy="110" r="30" stroke="var(--border)" strokeWidth="1" fill="none" />
      <circle cx="160" cy="110" r="8" fill="var(--foreground)" />
      {/* Body */}
      <path d="M110 200 Q160 170 210 200 L225 320 L95 320 Z" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
      {/* Tie / lapels */}
      <path d="M150 200 L160 240 L170 200" stroke="var(--foreground)" strokeWidth="1" fill="none" />
      {/* Horizontal rule lines — like pages */}
      <line x1="40" y1="355" x2="280" y2="355" stroke="var(--border)" strokeWidth="0.8" />
      <line x1="60" y1="370" x2="260" y2="370" stroke="var(--border)" strokeWidth="0.5" />
      {/* Corner decorative bracket */}
      <path d="M20 20 L20 50 M20 20 L50 20" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
      <path d="M300 20 L300 50 M300 20 L270 20" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
      <path d="M20 380 L20 350 M20 380 L50 380" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
      <path d="M300 380 L300 350 M300 380 L270 380" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function IllustrationOffice() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="300" fill="var(--muted)" />
      {/* Building facade */}
      <rect x="80" y="60" width="240" height="200" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
      {/* Windows grid */}
      {[0,1,2,3].map(col => [0,1,2,3,4].map(row => (
        <rect
          key={`${col}-${row}`}
          x={100 + col * 55}
          y={80 + row * 34}
          width="32"
          height="20"
          stroke="var(--border)"
          strokeWidth="1"
          fill="none"
          opacity={Math.random() > 0.5 ? 0.3 : 0.08}
        />
      )))}
      {/* Door */}
      <rect x="172" y="220" width="56" height="40" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
      {/* Roof line */}
      <path d="M60 60 L200 20 L340 60" stroke="var(--foreground)" strokeWidth="1" fill="none" />
      {/* Ground */}
      <line x1="20" y1="262" x2="380" y2="262" stroke="var(--border)" strokeWidth="1" />
      {/* Decorative columns */}
      <line x1="110" y1="60" x2="110" y2="260" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="290" y1="60" x2="290" y2="260" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="4 4" />
    </svg>
  )
}

function IllustrationTimeline() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="40" cy="40" r="28" stroke="var(--foreground)" strokeWidth="1.5" />
      <line x1="40" y1="12" x2="40" y2="40" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="40" x2="55" y2="40" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="40" cy="40" r="2.5" fill="var(--foreground)" />
    </svg>
  )
}

// ─────────────────────────────────────────────
// SECTION 1 — CINEMATIC HERO
// ─────────────────────────────────────────────
function AboutHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center overflow-hidden bg-background">
      {/* Animated diagonal stripe background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px"
            style={{
              top: `${i * 7.5}%`,
              left: '-10%',
              right: '-10%',
              backgroundColor: 'var(--border)',
              opacity: 0.5,
              transform: 'rotate(-8deg)',
              transformOrigin: 'left center',
            }}
          />
        ))}
      </motion.div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, var(--background) 100%)' }}
      />

      {/* Giant watermark year */}
      <motion.div
        style={{ y: bgY, opacity }}
        className="absolute right-[-5%] bottom-0 pointer-events-none select-none"
      >
        <span
          style={{
            fontSize: 'clamp(160px, 28vw, 380px)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 900,
            color: 'var(--foreground)',
            opacity: 0.025,
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
          }}
        >
          2010
        </span>
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="h-px w-10 bg-foreground/50" />
          <span className="text-xs uppercase tracking-[0.28em] text-muted-foreground font-semibold">
            Chartered Accountants · Since 2010
          </span>
        </motion.div>

        {/* Main heading — editorial split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-16 items-end">
          <div>
            {['The firm', 'behind the', 'numbers.'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{ y: 90, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black leading-[0.9] tracking-tight"
                  style={{
                    fontSize: 'clamp(52px, 9vw, 124px)',
                    fontFamily: 'Poppins, sans-serif',
                    color: i === 2 ? 'var(--muted-foreground)' : 'var(--foreground)',
                  }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col gap-6 pb-2 lg:pb-4"
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Elite CA Services was founded on a single belief: that every business deserves the same quality of financial counsel that Fortune 500 companies get — delivered with rigour, transparency, and genuine care.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Over fifteen years, we have grown from a two-person practice into a full-service CA firm with specialists across twelve practice areas, serving clients from Ahmedabad to Dubai.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Est. 2010 · Ahmedabad</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-foreground/40 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SECTION 2 — FOUNDER STORY (horizontal scroll feel)
// ─────────────────────────────────────────────
function FounderStory() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 md:py-36 bg-card border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-20 items-center">

          {/* Left — portrait illustration with decorative frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Offset decorative border */}
            <div
              className="absolute inset-0 rounded-2xl border border-border"
              style={{ transform: 'translate(12px, 12px)' }}
            />
            <div className="relative rounded-2xl overflow-hidden border border-border aspect-[4/5]">
              <IllustrationFounder />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-5 -right-4 bg-foreground text-background rounded-xl px-5 py-4 shadow-xl"
            >
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Founded by</p>
              <p className="text-sm font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Raj Sharma, FCA</p>
            </motion.div>
          </motion.div>

          {/* Right — narrative text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-7"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-foreground/50" />
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">Our Story</span>
            </div>

            <h2
              className="font-bold text-foreground leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontFamily: 'Poppins, sans-serif' }}
            >
              Built from a ledger<br />and a conviction.
            </h2>

            <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                Raj Sharma passed his CA finals in 2008 and spent two years inside a Big Four firm watching small businesses get generic advice from junior associates. He knew they deserved better.
              </p>
              <p>
                In 2010, he opened a 200 sq ft office in Ahmedabad with one desk, one shelf of tax commentaries, and a promise: every client would speak directly to a qualified CA — not a trainee, not a coordinator.
              </p>
              <p>
                Fifteen years later, that promise still governs every engagement. We have grown, but we have not scaled in the direction most firms scale — toward volume. We scale toward depth.
              </p>
            </div>

            {/* Signature-style quote */}
            <blockquote className="border-l-2 border-foreground pl-5 py-1">
              <p className="text-sm md:text-base text-foreground font-medium leading-relaxed italic">
                "A CA who only files your returns is a typist with credentials. We aim to be the person you call before you make a decision — not after."
              </p>
              <cite className="text-xs text-muted-foreground mt-2 block not-italic">— Raj Sharma, Founder</cite>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SECTION 3 — NUMBERS THAT MATTER (count-up)
// ─────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

function StatCard({ value, suffix, label, detail, index }: {
  value: number; suffix: string; label: string; detail: string; index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(value, 1800, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-7 md:p-9 rounded-2xl border border-border bg-card overflow-hidden hover:border-foreground transition-colors duration-300"
    >
      {/* Background number watermark */}
      <span
        className="absolute right-4 top-2 font-black text-foreground select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-[0.04]"
        style={{
          fontSize: 'clamp(60px, 8vw, 100px)',
          fontFamily: 'Poppins, sans-serif',
          opacity: 0.025,
          lineHeight: 1,
        }}
      >
        {value}{suffix}
      </span>

      <div className="relative z-10">
        <div
          className="font-black text-foreground tabular-nums leading-none mb-3"
          style={{ fontSize: 'clamp(42px, 6vw, 72px)', fontFamily: 'Poppins, sans-serif' }}
        >
          {count}{suffix}
        </div>
        <p className="text-sm font-semibold text-foreground uppercase tracking-widest mb-2">{label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{detail}</p>
      </div>
    </motion.div>
  )
}

function NumbersSection() {
  const stats = [
    { value: 15, suffix: '+', label: 'Years in Practice', detail: 'Founded 2010. Operating continuously without a single year of negative growth.' },
    { value: 600, suffix: '+', label: 'Active Clients', detail: 'Across 14 industries — manufacturing, IT, real estate, startups, NRIs, and HNIs.' },
    { value: 40, suffix: '+', label: 'CA & Tax Professionals', detail: 'Fellows, associates, tax specialists, FEMA advisors, and insolvency professionals.' },
    { value: 18, suffix: '', label: 'Service Offerings', detail: 'Across three practice areas: Core, Specialized, and International advisory.' },
    { value: 98, suffix: '%', label: 'Client Retention', detail: 'Clients who engaged us for one service typically expand to three within two years.' },
    { value: 100, suffix: '%', label: 'On-Time Filings', detail: 'Not a single statutory deadline missed in the last five years across all clients.' },
  ]

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-foreground/50" />
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">By The Numbers</span>
          </div>
          <h2
            className="font-bold text-foreground"
            style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', fontFamily: 'Poppins, sans-serif' }}
          >
            Fifteen years of numbers<br />that speak for themselves.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SECTION 4 — TIMELINE (scroll-driven reveal)
// ─────────────────────────────────────────────
function TimelineSection() {
  const milestones = [
    {
      year: '2010',
      title: 'The First Office',
      body: 'Raj Sharma opens a solo practice in Navrangpura, Ahmedabad. First three clients: a textile trader, a construction contractor, and a medical practitioner.',
      side: 'left',
    },
    {
      year: '2012',
      title: '100 Clients',
      body: 'The firm crosses 100 active clients and hires its first two associate CAs. A proper office with four desks replaces the original single-desk setup.',
      side: 'right',
    },
    {
      year: '2014',
      title: 'GST Advisory Cell Formed',
      body: 'Two years before GST actually launches, we form a dedicated indirect tax practice to prepare clients for the transition. First mover advantage.',
      side: 'left',
    },
    {
      year: '2017',
      title: 'GST Goes Live',
      body: 'All 200+ clients are GST-registered and filing-ready on Day 1 of the new regime. Zero late registrations, zero penalty notices.',
      side: 'right',
    },
    {
      year: '2019',
      title: 'International Practice Launch',
      body: 'FEMA, transfer pricing, and NRI taxation practice formally launched. First overseas client onboarded from Dubai.',
      side: 'left',
    },
    {
      year: '2021',
      title: 'IBC & Insolvency Wing',
      body: 'Two registered Insolvency Professionals join the team. First CIRP mandate handled successfully within IBC timeline.',
      side: 'right',
    },
    {
      year: '2023',
      title: '500+ Clients',
      body: 'Active client base crosses 500 across 14 sectors. Team grows to 40+ professionals. Second city office opened in Surat.',
      side: 'left',
    },
    {
      year: '2025',
      title: 'Today',
      body: 'Full-service CA firm with 18 service offerings across three practice areas, serving clients across India, the UAE, the UK, and the US.',
      side: 'right',
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-card border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-foreground/50" />
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">Our Journey</span>
          </div>
          <h2
            className="font-bold text-foreground"
            style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', fontFamily: 'Poppins, sans-serif' }}
          >
            Fifteen years,<br />one milestone at a time.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Centre line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-10 lg:space-y-0">
            {milestones.map((m, i) => {
              const ref = useRef<HTMLDivElement>(null)
              const inView = useInView(ref, { once: true, margin: '-80px' })
              const isLeft = m.side === 'left'

              return (
                <div
                  key={m.year}
                  ref={ref}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 items-center ${i % 2 === 0 ? '' : ''}`}
                >
                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`${isLeft ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-2 lg:text-left'} mb-4 lg:mb-0 lg:py-8`}
                  >
                    <div className={`inline-flex flex-col ${isLeft ? 'lg:items-end' : 'lg:items-start'} gap-2`}>
                      <span
                        className="font-black text-foreground/20"
                        style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}
                      >
                        {m.year}
                      </span>
                      <div className={`p-5 md:p-6 rounded-xl border border-border bg-background max-w-sm ${isLeft ? 'lg:ml-auto' : ''}`}>
                        <p className="text-sm font-bold text-foreground mb-2">{m.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{m.body}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Centre node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-foreground bg-background z-10"
                  />

                  {/* Spacer for opposite column */}
                  {isLeft ? <div className="lg:col-start-2" /> : <div className="lg:col-start-1 lg:row-start-1" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SECTION 5 — TEAM
// ─────────────────────────────────────────────
function TeamSection() {
  const members = [
    {
      name: 'Raj Sharma',
      credential: 'FCA, DISA',
      role: 'Founder & Managing Partner',
      focus: 'Tax Planning, M&A Advisory, International Structuring',
      years: 15,
      bio: 'Qualified in 2008. 15 years of practice spanning corporate tax, M&A, and cross-border advisory. Former Big Four associate.',
    },
    {
      name: 'Priya Patel',
      credential: 'FCA, CFP',
      role: 'Partner — Financial Advisory',
      focus: 'Financial Planning, Business Valuation, Project Finance',
      years: 11,
      bio: 'Specialises in business valuation and financial modelling for startups and mid-size businesses seeking institutional funding.',
    },
    {
      name: 'Amit Kumar',
      credential: 'ACA, DISA',
      role: 'Partner — Indirect Tax',
      focus: 'GST, Customs, Excise, E-commerce Taxation',
      years: 9,
      bio: 'Led the firm\'s GST advisory cell since its formation in 2014. Handled over 300 GST registrations and 15+ GST audits.',
    },
    {
      name: 'Sunita Mehta',
      credential: 'FCA',
      role: 'Partner — International Practice',
      focus: 'FEMA, Transfer Pricing, NRI Advisory, RBI Filings',
      years: 8,
      bio: 'Previously with a boutique international tax firm. Expert in inbound FDI structures and transfer pricing documentation.',
    },
    {
      name: 'Vikram Joshi',
      credential: 'ACA, IP (IBBI)',
      role: 'Partner — Insolvency & Restructuring',
      focus: 'IBC Proceedings, Corporate Restructuring, Liquidation',
      years: 7,
      bio: 'Registered Insolvency Professional (IBBI). Has led four CIRP processes and two voluntary liquidations to successful conclusion.',
    },
    {
      name: 'Lisa Wong',
      credential: 'ACA',
      role: 'Manager — Payroll & Compliance',
      focus: 'Payroll, PF, ESIC, Labour Law, Statutory Compliance',
      years: 5,
      bio: 'Manages payroll compliance for 80+ clients across five states. Specialist in the new Labour Codes implementation.',
    },
  ]

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-foreground/50" />
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">The Team</span>
          </div>
          <h2
            className="font-bold text-foreground"
            style={{ fontSize: 'clamp(28px, 4.5vw, 56px)', fontFamily: 'Poppins, sans-serif' }}
          >
            Partners who own<br />every mandate personally.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onHoverStart={() => setHoveredIdx(i)}
              onHoverEnd={() => setHoveredIdx(null)}
              className="group relative rounded-2xl border border-border overflow-hidden cursor-default"
              style={{ backgroundColor: hoveredIdx === i ? 'var(--card)' : 'var(--background)' }}
            >
              {/* Portrait illustration area */}
              <div
                className="relative h-36 overflow-hidden"
                style={{ backgroundColor: 'var(--muted)' }}
              >
                {/* Abstract portrait — initials + geometric shapes */}
                <svg viewBox="0 0 300 144" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="300" height="144" fill="var(--muted)" />
                  {/* Abstract mesh lines */}
                  {Array.from({ length: 6 }).map((_, li) => (
                    <line
                      key={li}
                      x1={li * 55}
                      y1="0"
                      x2={li * 55 + 30}
                      y2="144"
                      stroke="var(--border)"
                      strokeWidth="0.8"
                    />
                  ))}
                  {/* Large initial */}
                  <text
                    x="150"
                    y="100"
                    textAnchor="middle"
                    fontSize="88"
                    fontWeight="900"
                    fontFamily="Poppins, sans-serif"
                    fill="var(--foreground)"
                    opacity="0.08"
                  >
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </text>
                  {/* Circle accent */}
                  <circle cx="150" cy="72" r="40" stroke="var(--border)" strokeWidth="1" fill="none" />
                  <circle cx="150" cy="72" r="20" stroke="var(--foreground)" strokeWidth="0.8" fill="none" />
                </svg>

                {/* Years badge */}
                <div className="absolute top-3 right-3 bg-foreground text-background rounded-lg px-2.5 py-1">
                  <span className="text-xs font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{m.years}y</span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-foreground text-base">{m.name}</h3>
                  <span className="text-xs text-muted-foreground font-mono flex-shrink-0 mt-0.5">{m.credential}</span>
                </div>
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-3">{m.role}</p>

                <AnimatePresence>
                  {hoveredIdx === i ? (
                    <motion.p
                      key="bio"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28 }}
                      className="text-xs text-muted-foreground leading-relaxed overflow-hidden"
                    >
                      {m.bio}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="focus"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-muted-foreground leading-relaxed"
                    >
                      {m.focus}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom border accent on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-foreground"
                animate={{ width: hoveredIdx === i ? '100%' : '0%' }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SECTION 6 — VALUES (full bleed, editorial)
// ─────────────────────────────────────────────
function ValuesSection() {
  const values = [
    {
      number: '01',
      title: 'Integrity before convenience',
      body: "We will tell you something you don't want to hear before we file something that's technically correct but strategically wrong. Our reputation is measured in decades, not engagements.",
    },
    {
      number: '02',
      title: 'Expertise that goes deep',
      body: 'Every partner in this firm has spent the bulk of their career going deep into one practice area. We do not believe in generalists handling complex specialised work.',
    },
    {
      number: '03',
      title: 'Clarity over jargon',
      body: "If you leave a meeting with us not understanding exactly what we said and why, we have failed. Financial complexity is our problem to solve, not yours to decode.",
    },
    {
      number: '04',
      title: 'Relationships over transactions',
      body: "The best advice we've ever given clients wasn't billable. It was in a five-minute phone call that prevented a bad decision. That's the kind of practice we run.",
    },
  ]

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-28 bg-foreground overflow-hidden relative">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--background) 1px, transparent 1px), linear-gradient(90deg, var(--background) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          opacity: 0.03,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }} />
            <span
              className="text-xs uppercase tracking-[0.22em] font-semibold"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Our Values
            </span>
          </div>
          <h2
            className="font-bold leading-tight"
            style={{
              fontSize: 'clamp(28px, 4.5vw, 56px)',
              fontFamily: 'Poppins, sans-serif',
              color: 'var(--background)',
            }}
          >
            What we believe<br />shapes how we work.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {values.map((v, i) => {
            const isHovered = hoveredIdx === i

            return (
              <motion.div
                key={v.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onHoverStart={() => setHoveredIdx(i)}
                onHoverEnd={() => setHoveredIdx(null)}
                className="relative p-7 md:p-8 rounded-2xl overflow-hidden cursor-default"
                style={{
                  backgroundColor: isHovered
                    ? 'rgba(255,255,255,0.09)'
                    : 'rgba(255,255,255,0.04)',
                  border: isHovered
                    ? '1px solid rgba(255,255,255,0.18)'
                    : '1px solid rgba(255,255,255,0.08)',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease',
                }}
              >
                {/* Number watermark — brightens on hover */}
                <span
                  className="absolute top-4 right-5 font-black select-none pointer-events-none"
                  style={{
                    fontSize: '52px',
                    fontFamily: 'Poppins, sans-serif',
                    lineHeight: 1,
                    color: 'var(--background)',
                    opacity: isHovered ? 0.12 : 0.05,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {v.number}
                </span>

                {/* Animated left accent bar */}
                <motion.div
                  className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--background)' }}
                  animate={{ opacity: isHovered ? 0.5 : 0, scaleY: isHovered ? 1 : 0.4 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative z-10 pl-3">
                  {/* Title — fully bright white always, slightly brighter on hover */}
                  <h3
                    className="font-bold mb-3"
                    style={{
                      fontSize: '18px',
                      fontFamily: 'Poppins, sans-serif',
                      color: 'var(--background)',
                      opacity: isHovered ? 1 : 0.85,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {v.title}
                  </h3>

                  {/* Body — dim by default, clearly visible on hover */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: 'var(--background)',
                      opacity: isHovered ? 0.7 : 0.35,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {v.body}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
// ─────────────────────────────────────────────
// SECTION 7 — OFFICE / PRESENCE
// ─────────────────────────────────────────────
function PresenceSection() {
  const offices = [
    {
      city: 'Ahmedabad',
      type: 'Head Office',
      address: '4th Floor, Shivalik Plaza, Navrangpura',
      phone: '+91 79 4000 1234',
      since: 2010,
    },
    {
      city: 'Surat',
      type: 'Branch Office',
      address: 'Ring Road, Athwalines, Surat',
      phone: '+91 261 400 5678',
      since: 2023,
    },
    {
      city: 'Dubai (UAE)',
      type: 'Liaison Office',
      address: 'DIFC, Dubai Financial Centre',
      phone: '+971 4 400 9012',
      since: 2022,
    },
  ]

  return (
    <section className="py-20 md:py-24 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-foreground/50" />
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">Where We Are</span>
            </div>
            <h2
              className="font-bold text-foreground leading-tight mb-6"
              style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontFamily: 'Poppins, sans-serif' }}
            >
              Two offices in India.<br />One foot in the Gulf.
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
              We serve clients across India from our Ahmedabad headquarters and Surat branch. Our Dubai liaison office supports the large NRI community in the UAE with India-side tax and FEMA advisory.
            </p>

            {/* Illustration */}
            <div className="rounded-2xl overflow-hidden border border-border aspect-video">
              <IllustrationOffice />
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            {offices.map((o, i) => (
              <motion.div
                key={o.city}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="group p-6 rounded-xl border border-border bg-background hover:border-foreground transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>{o.city}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">{o.type} · Since {o.since}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-foreground group-hover:border-foreground transition-colors duration-300">
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 group-hover:hidden">
                      <circle cx="8" cy="8" r="3" stroke="var(--muted-foreground)" strokeWidth="1.5" />
                      <circle cx="8" cy="8" r="6.5" stroke="var(--border)" strokeWidth="1" />
                    </svg>
                    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 hidden group-hover:block">
                      <circle cx="8" cy="8" r="3" fill="var(--background)" />
                    </svg>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{o.address}</p>
                <p className="text-sm text-foreground font-medium">{o.phone}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SECTION 8 — FINAL CTA
// ─────────────────────────────────────────────
function AboutCTA() {
  return (
    <section className="py-20 md:py-24 bg-background border-t border-border relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.4,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, var(--background) 40%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-foreground/40" />
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">Work With Us</span>
            <div className="h-px w-8 bg-foreground/40" />
          </div>
          <h2
            className="font-bold text-foreground leading-tight mb-5"
            style={{ fontSize: 'clamp(30px, 5vw, 60px)', fontFamily: 'Poppins, sans-serif' }}
          >
            Ready to meet the<br />team behind the work?
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            Book a 30-minute introductory call with a relevant partner — no commitment, no pitch. Just an honest conversation about your financial situation and how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-foreground text-background rounded-xl text-sm font-semibold hover:bg-foreground/90 transition-all hover:shadow-xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Schedule a Call
            </a>
            <a
              href="/services"
              className="px-8 py-4 border border-border text-foreground rounded-xl text-sm font-semibold hover:bg-muted hover:border-foreground transition-all"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Explore Our Services →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────
export default function AboutContent() {
  return (
    <div className="bg-background text-foreground">
      <AboutHero />
      <FounderStory />
      <NumbersSection />
      <TimelineSection />
      <TeamSection />
      <ValuesSection />
      <PresenceSection />
      <AboutCTA />
    </div>
  )
}