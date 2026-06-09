'use client'

import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

// ─────────────────────────────────────────────
// FORM DATA
// ─────────────────────────────────────────────
interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  urgency: string
  message: string
}

const services = [
  'Accounting & Bookkeeping',
  'Auditing & Assurance',
  'Taxation Services',
  'GST Compliance',
  'Corporate & Company Law',
  'Financial Advisory & Planning',
  'Loan & Fund Raising',
  'Insolvency & Bankruptcy (IBC)',
  'Startup & Business Advisory',
  'Payroll & Labour Law',
  'Certification Services',
  'NRI Taxation',
  'FEMA Compliance',
  'RBI Filings & Compliances',
  'Transfer Pricing',
  'International Taxation',
  'Foreign Asset Reporting',
  'Inbound & Outbound Investment Advisory',
  'Not sure — need guidance',
]

const offices = [
  {
    city: 'Ahmedabad',
    type: 'Head Office',
    address: '4th Floor, Shivalik Plaza, Navrangpura, Ahmedabad — 380009',
    phone: '+91 79 4000 1234',
    email: 'ahmedabad@eliteca.in',
    hours: 'Mon–Sat, 9:30 AM – 6:30 PM',
  },
  {
    city: 'Surat',
    type: 'Branch Office',
    address: 'Ring Road, Athwalines, Surat — 395001',
    phone: '+91 261 400 5678',
    email: 'surat@eliteca.in',
    hours: 'Mon–Fri, 10:00 AM – 6:00 PM',
  },
  {
    city: 'Dubai (UAE)',
    type: 'Liaison Office',
    address: 'DIFC, Dubai Financial Centre, Gate Village',
    phone: '+971 4 400 9012',
    email: 'dubai@eliteca.in',
    hours: 'Sun–Thu, 9:00 AM – 5:00 PM GST',
  },
]

// ─────────────────────────────────────────────
// MAP SVG ILLUSTRATION
// ─────────────────────────────────────────────
function MapIllustration() {
  return (
    <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="800" height="400" fill="var(--muted)" />
      {/* Grid lines */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50}
          stroke="var(--border)" strokeWidth="0.8" />
      ))}
      {Array.from({ length: 17 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400"
          stroke="var(--border)" strokeWidth="0.8" />
      ))}
      {/* India outline (abstract simplified) */}
      <path d="M380 80 L420 75 L460 90 L475 120 L470 155 L455 185 L440 220 L430 255 L420 280 L410 300 L400 310 L390 300 L378 270 L365 240 L355 210 L350 180 L355 150 L365 120 L380 80Z"
        stroke="var(--foreground)" strokeWidth="1.5" fill="var(--foreground)" fillOpacity="0.04" />
      {/* Gujarat region highlight */}
      <path d="M355 155 L370 145 L390 148 L405 155 L410 170 L400 182 L385 185 L368 180 L355 170 Z"
        stroke="var(--foreground)" strokeWidth="1" fill="var(--foreground)" fillOpacity="0.08" />
      {/* Ahmedabad pin */}
      <circle cx="382" cy="165" r="6" fill="var(--foreground)" opacity="0.8" />
      <circle cx="382" cy="165" r="12" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="382" cy="165" r="20" stroke="var(--foreground)" strokeWidth="0.5" fill="none" opacity="0.15" />
      <text x="395" y="161" fontSize="9" fill="var(--foreground)" opacity="0.6" fontFamily="Poppins,sans-serif">Ahmedabad</text>
      {/* Surat pin */}
      <circle cx="375" cy="192" r="4" fill="var(--foreground)" opacity="0.6" />
      <circle cx="375" cy="192" r="9" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.2" />
      <text x="386" y="188" fontSize="8" fill="var(--foreground)" opacity="0.5" fontFamily="Poppins,sans-serif">Surat</text>
      {/* UAE / Dubai */}
      <circle cx="530" cy="155" r="4" fill="var(--foreground)" opacity="0.5" />
      <circle cx="530" cy="155" r="9" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.2" />
      <text x="540" y="151" fontSize="8" fill="var(--foreground)" opacity="0.5" fontFamily="Poppins,sans-serif">Dubai</text>
      {/* Dotted connection lines */}
      <line x1="382" y1="165" x2="530" y2="155" stroke="var(--foreground)" strokeWidth="0.8"
        strokeDasharray="4 4" opacity="0.2" />
      <line x1="382" y1="165" x2="375" y2="192" stroke="var(--foreground)" strokeWidth="0.8"
        strokeDasharray="3 3" opacity="0.2" />
      {/* Corner brackets */}
      <path d="M20 20 L20 45 M20 20 L45 20" stroke="var(--foreground)" strokeWidth="1.5" opacity="0.3" />
      <path d="M780 20 L780 45 M780 20 L755 20" stroke="var(--foreground)" strokeWidth="1.5" opacity="0.3" />
      <path d="M20 380 L20 355 M20 380 L45 380" stroke="var(--foreground)" strokeWidth="1.5" opacity="0.3" />
      <path d="M780 380 L780 355 M780 380 L755 380" stroke="var(--foreground)" strokeWidth="1.5" opacity="0.3" />
      {/* Scale bar */}
      <line x1="60" y1="360" x2="140" y2="360" stroke="var(--foreground)" strokeWidth="1" opacity="0.25" />
      <line x1="60" y1="355" x2="60" y2="365" stroke="var(--foreground)" strokeWidth="1" opacity="0.25" />
      <line x1="140" y1="355" x2="140" y2="365" stroke="var(--foreground)" strokeWidth="1" opacity="0.25" />
      <text x="100" y="375" textAnchor="middle" fontSize="8" fill="var(--muted-foreground)" opacity="0.4" fontFamily="Poppins,sans-serif">~500 km</text>
    </svg>
  )
}

// ─────────────────────────────────────────────
// 1. HERO
// ─────────────────────────────────────────────
function ContactHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-[75vh] flex items-center overflow-hidden bg-background">
      {/* Diagonal lines */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="absolute h-px"
            style={{
              top: `${i * 7.5}%`, left: '-10%', right: '-10%',
              backgroundColor: 'var(--border)', opacity: 0.4,
              transform: 'rotate(-5deg)', transformOrigin: 'left center',
            }} />
        ))}
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, var(--background) 100%)' }} />

      {/* Watermark */}
      <motion.div style={{ y, opacity }}
        className="absolute right-[-3%] top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span style={{
          fontSize: 'clamp(120px, 20vw, 300px)', fontFamily: 'Poppins, sans-serif',
          fontWeight: 900, color: 'var(--foreground)', opacity: 0.025,
          lineHeight: 0.85, letterSpacing: '-0.05em',
        }}>HELLO</span>
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="flex items-center gap-2 mb-10">
          <span className="text-xs text-muted-foreground">Home</span>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-xs text-foreground font-medium">Contact</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-20 items-end">
          <div>
            {['Let\'s talk', 'about your', 'finances.'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.08 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black leading-[0.92] tracking-tight"
                  style={{
                    fontSize: 'clamp(46px, 7.5vw, 106px)',
                    fontFamily: 'Poppins, sans-serif',
                    color: i === 2 ? 'var(--muted-foreground)' : 'var(--foreground)',
                  }}
                >{line}</motion.h1>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="flex flex-col gap-5 pb-2">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Whether you need a specific service or aren't sure where to start — reach out. A qualified CA will respond within one business day.
            </p>

            {/* Response promise cards */}
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { value: '< 24h', label: 'Response time' },
                { value: 'Free', label: 'First consultation' },
                { value: 'Direct', label: 'CA contact' },
              ].map((item) => (
                <div key={item.label}
                  className="p-3 rounded-xl border border-border bg-card text-center">
                  <p className="font-bold text-foreground text-base md:text-lg"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 2. CONTACT FORM + INFO
// ─────────────────────────────────────────────
function ContactForm() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', company: '',
    service: '', urgency: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [step, setStep] = useState<1 | 2>(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass = (field: string) => `
    w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200
    bg-background border text-foreground
    ${focusedField === field ? 'border-foreground' : 'border-border'}
  `

  return (
    <section ref={ref} className="py-16 md:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-10 lg:gap-16">

          {/* LEFT — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-foreground/50" />
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">Reach Us</span>
              </div>
              <h2 className="font-bold text-foreground leading-tight mb-4"
                style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontFamily: 'Poppins, sans-serif' }}>
                We respond to every enquiry personally.
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                No bots, no auto-replies. Every message is read by a CA and responded to with a considered reply within one business day.
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                      <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="var(--foreground)" strokeWidth="1.2" />
                      <path d="M3 7l7 5 7-5" stroke="var(--foreground)" strokeWidth="1.2" />
                    </svg>
                  ),
                  label: 'Email',
                  lines: ['info@eliteca.in', 'support@eliteca.in'],
                },
                {
                  icon: (
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                      <path d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.268-.934a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-7.18 0-13-5.82-13-13V3.5z" stroke="var(--foreground)" strokeWidth="1.2" />
                    </svg>
                  ),
                  label: 'Phone',
                  lines: ['+91 79 4000 1234 (AHM)', '+91 261 400 5678 (SRT)'],
                },
                {
                  icon: (
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                      <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" stroke="var(--foreground)" strokeWidth="1.2" />
                      <circle cx="10" cy="7" r="1.5" stroke="var(--foreground)" strokeWidth="1.2" />
                    </svg>
                  ),
                  label: 'Head Office',
                  lines: ['4th Floor, Shivalik Plaza', 'Navrangpura, Ahmedabad 380009'],
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg border border-border bg-background flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{item.label}</p>
                    {item.lines.map((l, i) => (
                      <p key={i} className="text-sm text-foreground">{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Office hours */}
            <div className="p-5 rounded-xl border border-border bg-background">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Office Hours</p>
              <div className="flex flex-col gap-2">
                {[
                  { day: 'Mon – Fri', time: '9:30 AM – 6:30 PM' },
                  { day: 'Saturday', time: '10:00 AM – 2:00 PM' },
                  { day: 'Sunday', time: 'Closed' },
                ].map(row => (
                  <div key={row.day} className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{row.day}</span>
                    <span className={row.time === 'Closed' ? 'text-muted-foreground/40' : 'text-foreground font-medium'}>
                      {row.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Step indicator */}
                  <div className="flex items-center gap-3 mb-7">
                    {[1, 2].map(s => (
                      <button key={s} onClick={() => setStep(s as 1 | 2)}
                        className="flex items-center gap-2 text-xs font-semibold transition-colors"
                        style={{ color: step === s ? 'var(--foreground)' : 'var(--muted-foreground)' }}>
                        <div className="w-6 h-6 rounded-full border flex items-center justify-center text-xs"
                          style={{
                            borderColor: step === s ? 'var(--foreground)' : 'var(--border)',
                            backgroundColor: step === s ? 'var(--foreground)' : 'transparent',
                            color: step === s ? 'var(--background)' : 'var(--muted-foreground)',
                          }}>
                          {s}
                        </div>
                        {s === 1 ? 'Your Details' : 'Your Message'}
                      </button>
                    ))}
                    <div className="flex-1 h-px bg-border" />
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <AnimatePresence mode="wait">
                      {step === 1 ? (
                        <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}
                          className="flex flex-col gap-4">

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                                Full Name <span className="text-muted-foreground/50">*</span>
                              </label>
                              <input type="text" name="name" value={formData.name} onChange={handleChange}
                                onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                                required placeholder="Raj Mehta" className={inputClass('name')} />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                                Company / Firm
                              </label>
                              <input type="text" name="company" value={formData.company} onChange={handleChange}
                                onFocus={() => setFocusedField('company')} onBlur={() => setFocusedField(null)}
                                placeholder="Mehta Enterprises" className={inputClass('company')} />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                                Email Address <span className="text-muted-foreground/50">*</span>
                              </label>
                              <input type="email" name="email" value={formData.email} onChange={handleChange}
                                onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                                required placeholder="raj@mehta.com" className={inputClass('email')} />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                                Phone Number
                              </label>
                              <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)}
                                placeholder="+91 98765 43210" className={inputClass('phone')} />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                              Service You Need
                            </label>
                            <div className="relative">
                              <select name="service" value={formData.service} onChange={handleChange}
                                onFocus={() => setFocusedField('service')} onBlur={() => setFocusedField(null)}
                                className={inputClass('service') + ' appearance-none pr-10 cursor-pointer'}>
                                <option value="">Select a service…</option>
                                {services.map(s => <option key={s} value={s}>{s}</option>)}
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                                  <path d="M4 6l4 4 4-4" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                              How Urgent Is This?
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {['Exploring', 'Within a month', 'Urgent'].map(u => (
                                <button key={u} type="button" onClick={() => setFormData(p => ({ ...p, urgency: u }))}
                                  className="py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all duration-200"
                                  style={{
                                    borderColor: formData.urgency === u ? 'var(--foreground)' : 'var(--border)',
                                    backgroundColor: formData.urgency === u ? 'var(--foreground)' : 'transparent',
                                    color: formData.urgency === u ? 'var(--background)' : 'var(--muted-foreground)',
                                  }}>
                                  {u}
                                </button>
                              ))}
                            </div>
                          </div>

                          <motion.button type="button" onClick={() => setStep(2)}
                            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                            className="w-full py-4 rounded-xl text-sm font-semibold transition-all mt-2"
                            style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)', fontFamily: 'Poppins, sans-serif' }}>
                            Continue to Message →
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                          className="flex flex-col gap-4">

                          {/* Summary of step 1 */}
                          {formData.name && (
                            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold">
                                  {formData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-foreground">{formData.name}</p>
                                  <p className="text-xs text-muted-foreground">{formData.email}</p>
                                </div>
                              </div>
                              <button type="button" onClick={() => setStep(1)}
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                                Edit
                              </button>
                            </div>
                          )}

                          <div>
                            <label className="block text-xs font-semibold text-foreground uppercase tracking-wide mb-2">
                              Your Message <span className="text-muted-foreground/50">*</span>
                            </label>
                            <textarea name="message" value={formData.message} onChange={handleChange}
                              onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                              required rows={7} placeholder="Describe your situation or question. The more detail you share, the more useful our first response will be…"
                              className={inputClass('message') + ' resize-none leading-relaxed'} />
                            <p className="text-xs text-muted-foreground mt-1.5 text-right">
                              {formData.message.length} characters
                            </p>
                          </div>

                          <div className="p-4 rounded-xl border border-border bg-background">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              By submitting, you agree that your information will be used to respond to your enquiry. We do not share client data with third parties.
                            </p>
                          </div>

                          <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(1)}
                              className="px-5 py-4 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted transition-all">
                              ← Back
                            </button>
                            <motion.button type="submit"
                              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                              className="flex-1 py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                              style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)', fontFamily: 'Poppins, sans-serif' }}>
                              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                                <path d="M3 10l7-7 7 7M10 3v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Send Enquiry
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-2xl border border-border bg-background min-h-[480px] gap-6">
                  {/* Animated checkmark */}
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full border-2 border-foreground flex items-center justify-center">
                      <motion.svg viewBox="0 0 24 24" fill="none" className="w-10 h-10"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}>
                        <motion.path d="M5 13l4 4L19 7" stroke="var(--foreground)" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }} />
                      </motion.svg>
                    </motion.div>
                    {/* Ripple */}
                    <motion.div className="absolute inset-0 rounded-full border border-foreground"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ delay: 0.5, duration: 1, repeat: Infinity, repeatDelay: 1 }} />
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground text-2xl mb-3"
                      style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Message received.
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                      A qualified CA will review your enquiry and respond within one business day. Check your inbox — including spam, just in case.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <div className="p-3 rounded-xl border border-border text-xs text-muted-foreground text-center">
                      Replied to: <span className="text-foreground font-medium">{formData.email || 'your email'}</span>
                    </div>
                  </div>

                  <button onClick={() => { setSubmitted(false); setStep(1); setFormData({ name: '', email: '', phone: '', company: '', service: '', urgency: '', message: '' }) }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                    Send another enquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 3. OFFICES SECTION
// ─────────────────────────────────────────────
function OfficesSection() {
  const [activeOffice, setActiveOffice] = useState(0)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-foreground/50" />
            <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">Our Offices</span>
          </div>
          <h2 className="font-bold text-foreground"
            style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontFamily: 'Poppins, sans-serif' }}>
            Find us in India<br />and the UAE.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 items-start">
          {/* Office cards */}
          <div className="flex flex-col gap-4">
            {offices.map((office, i) => (
              <motion.button
                key={office.city}
                onClick={() => setActiveOffice(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-left p-5 md:p-6 rounded-xl border transition-all duration-300"
                style={{
                  borderColor: activeOffice === i ? 'var(--foreground)' : 'var(--border)',
                  backgroundColor: activeOffice === i ? 'var(--card)' : 'transparent',
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground text-lg"
                        style={{ fontFamily: 'Poppins, sans-serif' }}>{office.city}</h3>
                      <span className="px-2 py-0.5 rounded-full border border-border text-xs text-muted-foreground">
                        {office.type}
                      </span>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: activeOffice === i ? 45 : 0 }} transition={{ duration: 0.25 }}
                    className="w-6 h-6 border border-border rounded-full flex items-center justify-center flex-shrink-0 text-muted-foreground text-sm">
                    +
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeOffice === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                      className="overflow-hidden">
                      <div className="flex flex-col gap-2 pt-1 border-t border-border mt-3">
                        {[
                          { icon: '📍', text: office.address },
                          { icon: '📞', text: office.phone },
                          { icon: '✉', text: office.email },
                          { icon: '🕐', text: office.hours },
                        ].map(row => (
                          <div key={row.icon} className="flex items-start gap-2 text-xs">
                            <span className="flex-shrink-0 opacity-50">{row.icon}</span>
                            <span className="text-muted-foreground leading-relaxed">{row.text}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          {/* Map illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl overflow-hidden border border-border aspect-video lg:aspect-auto lg:h-full min-h-72"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            <MapIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 4. FAQ STRIP
// ─────────────────────────────────────────────
function ContactFAQ() {
  const faqs = [
    { q: 'How quickly will I get a response?', a: 'Every enquiry receives a substantive response — not an auto-reply — within one business day. Complex queries may take up to 48 hours for a fully considered reply.' },
    { q: 'Is the first consultation free?', a: 'Yes. The initial 30-minute consultation is free and carries no obligation. We use it to understand your situation and confirm whether and how we can help.' },
    { q: 'Can I contact you for a quick one-off question?', a: 'Absolutely. Use the contact form and select "Exploring" as urgency. We will answer straightforward queries at no charge.' },
    { q: 'I am an NRI based abroad. Can you still help me?', a: 'Yes — we serve NRI clients across the UAE, UK, US, Canada, Singapore, and Australia. All communication can be handled remotely via email and video call.' },
  ]

  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-10 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-foreground/50" />
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">FAQ</span>
            </div>
            <h2 className="font-bold text-foreground leading-tight"
              style={{ fontSize: 'clamp(22px, 3.5vw, 40px)', fontFamily: 'Poppins, sans-serif' }}>
              Common questions before getting in touch.
            </h2>
          </motion.div>

          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="border border-border rounded-xl overflow-hidden"
                style={{ backgroundColor: open === i ? 'var(--background)' : 'transparent' }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.22 }}
                    className="flex-shrink-0 text-lg text-muted-foreground">+</motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// 5. BOTTOM CTA
// ─────────────────────────────────────────────
function ContactBottomCTA() {
  return (
    <section className="py-16 md:py-20 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--background) 1px, transparent 1px), linear-gradient(90deg, var(--background) 1px, transparent 1px)`,
          backgroundSize: '48px 48px', opacity: 0.03,
        }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65 }}>
          <h2 className="font-bold leading-tight mb-4"
            style={{ fontSize: 'clamp(26px, 4.5vw, 56px)', fontFamily: 'Poppins, sans-serif', color: 'var(--background)' }}>
            Prefer a call over a form?
          </h2>
          <p className="text-sm md:text-base mb-9 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Call our Ahmedabad office directly and ask to speak with the CA on duty. No appointment needed for a 10-minute conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+917940001234"
              className="px-8 py-4 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'Poppins, sans-serif' }}>
              Call +91 79 4000 1234
            </a>
            <a href="mailto:info@eliteca.in"
              className="px-8 py-4 rounded-xl text-sm font-semibold border transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'var(--background)', fontFamily: 'Poppins, sans-serif' }}>
              Email Us →
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {['ICAI Member Firm', 'RBI Empanelled', 'ISO Certified', 'Est. 2010'].map(b => (
              <div key={b} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                {b}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────────
export default function ContactContent() {
  return (
    <div className="bg-background text-foreground">
      <ContactHero />
      <ContactForm />
      <OfficesSection />
      <ContactFAQ />
      <ContactBottomCTA />
    </div>
  )
}