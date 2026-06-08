'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const coreServices = [
  'Accounting & Bookkeeping',
  'Auditing & Assurance',
  'Taxation Services',
  'GST Compliance',
  'Corporate & Company Law',
  'Financial Advisory',
  'Loan & Fund Raising',
]

const specializedServices = [
  'Insolvency & Bankruptcy',
  'Startup Advisory',
  'Payroll & Labour Law',
  'Certification Services',
  'NRI Taxation',
  'FEMA Compliance',
  'Transfer Pricing',
]

const offices = [
  { city: 'Ahmedabad', detail: '4th Floor, Shivalik Plaza, Navrangpura', phone: '+91 79 4000 1234' },
  { city: 'Surat', detail: 'Ring Road, Athwalines', phone: '+91 261 400 5678' },
  { city: 'Dubai (UAE)', detail: 'DIFC, Gate Village', phone: '+971 4 400 9012' },
]

// ─────────────────────────────────────────────
// FOOTER LINK
// ─────────────────────────────────────────────
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm leading-relaxed transition-colors duration-200 flex items-center gap-1.5 group"
        style={{ color: 'var(--muted-foreground)', fontFamily: 'Poppins, sans-serif' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--foreground)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)'}
      >
        <span
          className="inline-block w-0 group-hover:w-2 h-px transition-all duration-200 flex-shrink-0"
          style={{ backgroundColor: 'var(--foreground)' }}
        />
        {children}
      </Link>
    </li>
  )
}

// ─────────────────────────────────────────────
// FOOTER COLUMN HEADING
// ─────────────────────────────────────────────
function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <h4
      className="font-semibold text-foreground mb-5 text-xs uppercase tracking-[0.2em]"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {children}
    </h4>
  )
}

// ─────────────────────────────────────────────
// SOCIAL ICON BUTTON
// ─────────────────────────────────────────────
function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-lg border border-border flex items-center justify-center transition-all duration-200"
      style={{ color: 'var(--muted-foreground)' }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--foreground)'
        el.style.backgroundColor = 'var(--foreground)'
        el.style.color = 'var(--background)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.backgroundColor = 'transparent'
        el.style.color = 'var(--muted-foreground)'
      }}
    >
      {children}
    </a>
  )
}

// ─────────────────────────────────────────────
// MAIN FOOTER
// ─────────────────────────────────────────────
export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer
      ref={ref}
      className="relative bg-background border-t border-border overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.3,
        }}
      />
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 100%, transparent 40%, var(--background) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── TOP BRAND STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="py-14 md:py-16 border-b border-border grid grid-cols-1 lg:grid-cols-[50%_50%] gap-10 items-center"
        >
          {/* Left — brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--foreground)' }}
              >
                <span
                  className="font-black text-base leading-none"
                  style={{ color: 'var(--background)', fontFamily: 'Poppins, sans-serif' }}
                >
                  G
                </span>
              </div>
              <div>
                <p className="font-bold text-foreground text-lg leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Gonawala & Co.
                </p>
                <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]" style={{ fontSize: '10px' }}>
                  Chartered Accountants
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Full-service CA firm delivering tax planning, audit, GST compliance, and cross-border advisory — since 2010.
            </p>
            {/* ICAI badge row */}
            <div className="flex flex-wrap gap-2 mt-1">
              {['ICAI Member', 'RBI Empanelled', 'Est. 2010'].map(badge => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-full border border-border text-xs text-muted-foreground"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right — newsletter CTA */}
          <div className="flex flex-col gap-3 lg:pl-12">
            <p className="font-semibold text-foreground text-base" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Weekly tax & compliance digest
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Deadline reminders, regulatory updates, and one practical tip — every Monday.
            </p>
            <div className="flex gap-2 mt-1">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  backgroundColor: 'var(--muted)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                  fontFamily: 'Poppins, sans-serif',
                }}
                onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--foreground)'}
                onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
              />
              <button
                className="px-5 py-2.5 rounded-xl text-sm font-semibold flex-shrink-0 transition-all duration-200"
                style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)', fontFamily: 'Poppins, sans-serif' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.85'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted-foreground opacity-60">No spam. Unsubscribe anytime.</p>
          </div>
        </motion.div>

        {/* ── MAIN LINK GRID ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 md:py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-border"
        >
          {/* Navigate */}
          <div>
            <ColHead>Navigate</ColHead>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <FooterLink key={link.href} href={link.href}>{link.label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <ColHead>Core Services</ColHead>
            <ul className="space-y-2.5">
              {coreServices.map(s => (
                <FooterLink key={s} href="/services">{s}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Specialized */}
          <div>
            <ColHead>Specialized</ColHead>
            <ul className="space-y-2.5">
              {specializedServices.map(s => (
                <FooterLink key={s} href="/services">{s}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <ColHead>Offices</ColHead>
            <div className="flex flex-col gap-5">
              {offices.map((o, i) => (
                <motion.div
                  key={o.city}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex flex-col gap-0.5"
                >
                  <p className="text-sm font-semibold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {o.city}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{o.detail}</p>
                  <a
                    href={`tel:${o.phone.replace(/\s/g, '')}`}
                    className="text-xs transition-colors duration-150"
                    style={{ color: 'var(--muted-foreground)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--foreground)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)'}
                  >
                    {o.phone}
                  </a>
                </motion.div>
              ))}

              {/* Email */}
              <div className="flex flex-col gap-0.5 mt-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontSize: '10px' }}>Email</p>
                {['info@eliteca.in', 'support@eliteca.in'].map(email => (
                  <a key={email} href={`mailto:${email}`}
                    className="text-xs transition-colors duration-150"
                    style={{ color: 'var(--muted-foreground)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--foreground)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)'}
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── LARGE WORDMARK ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="pt-6 pb-2 overflow-hidden select-none pointer-events-none"
          aria-hidden
        >
          <p
            className="font-black text-foreground leading-none tracking-tighter whitespace-nowrap"
            style={{
              fontSize: 'clamp(44px, 8vw, 110px)',
              fontFamily: 'Poppins, sans-serif',
              opacity: 0.04,
              letterSpacing: '-0.04em',
            }}
          >
            Gonawala & Co. CA Services
          </p>
        </motion.div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border"
        >
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
            <span>© 2025 Gonawala & Co. All rights reserved.</span>
            <span className="hidden sm:inline text-border">·</span>
            <Link href="/privacy"
              className="transition-colors duration-150 hover:text-foreground"
              style={{ color: 'var(--muted-foreground)' }}>
              Privacy Policy
            </Link>
            <Link href="/terms"
              className="transition-colors duration-150 hover:text-foreground"
              style={{ color: 'var(--muted-foreground)' }}>
              Terms of Use
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">
            {/* LinkedIn */}
            <SocialBtn href="https://linkedin.com" label="LinkedIn">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                <path d="M5 7h2v8H5V7zM6 4a1.25 1.25 0 110 2.5A1.25 1.25 0 016 4zM9 7h2v1.1c.3-.5 1-1.1 2.2-1.1 2.3 0 2.8 1.5 2.8 3.5V15h-2v-4c0-.9 0-2-1.3-2-1.3 0-1.5 1-1.5 2v4H9V7z"
                  fill="currentColor" />
              </svg>
            </SocialBtn>
            {/* Twitter / X */}
            <SocialBtn href="https://twitter.com" label="Twitter">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                <path d="M3 3l5.5 7.5L3 17h2l4-5 4 5h3l-5.7-7.8L16.5 3h-2l-3.6 4.5L7 3H3z"
                  fill="currentColor" />
              </svg>
            </SocialBtn>
            {/* Instagram */}
            <SocialBtn href="https://instagram.com" label="Instagram">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                <rect x="3" y="3" width="14" height="14" rx="4"
                  stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="10" r="3"
                  stroke="currentColor" strokeWidth="1.5" />
                <circle cx="14.5" cy="5.5" r="0.75" fill="currentColor" />
              </svg>
            </SocialBtn>
            {/* WhatsApp */}
            <SocialBtn href="https://wa.me/917940001234" label="WhatsApp">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                <path d="M10 2a8 8 0 00-6.93 11.97L2 18l4.17-1.09A8 8 0 1010 2z"
                  stroke="currentColor" strokeWidth="1.4" />
                <path d="M7.5 9.5c.3.6 1 1.8 2 2 .5.1.9-.2 1.1-.5.1-.2 0-.5-.2-.6l-.7-.4c-.2-.1-.4 0-.5.1l-.2.2c-.1.1-.3.1-.4 0-.4-.3-.8-.7-1-1.1-.1-.2 0-.3.1-.4l.2-.2c.1-.1.2-.3.1-.5l-.4-.7c-.1-.2-.4-.3-.6-.2-.3.2-.6.6-.5 1.1.1.3.2.8.5 1.2z"
                  fill="currentColor" />
              </svg>
            </SocialBtn>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}