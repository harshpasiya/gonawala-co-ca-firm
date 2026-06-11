'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface ContactSubmission {
  name: string
  email: string
  phone: string
  service: string
  message: string
  timestamp: string
}

// ─────────────────────────────────────────────
// COUNT-UP
// ─────────────────────────────────────────────
function useCountUp(target: number, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active || target === 0) { setCount(target); return }
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1400, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target])
  return count
}

// ─────────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────────
function StatCard({
  label, rawValue, displaySuffix, detail, index, active, svg
}: {
  label: string
  rawValue: number
  displaySuffix: string
  detail: string
  index: number
  active: boolean
  svg: React.ReactNode
}) {
  const count = useCountUp(rawValue, active)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col gap-4 p-6 rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: hovered ? 'var(--card)' : 'var(--background)',
        borderColor: hovered ? 'var(--foreground)' : 'var(--border)',
        transition: 'background-color 0.22s ease, border-color 0.22s ease',
      }}
    >
      {/* Watermark */}
      <div className="absolute right-4 bottom-2 pointer-events-none select-none"
        style={{ fontSize: '64px', fontFamily: 'Poppins, sans-serif', fontWeight: 900, color: 'var(--foreground)', opacity: 0.03, lineHeight: 1 }}>
        {rawValue}{displaySuffix}
      </div>

      {/* Icon */}
      <div className="w-10 h-10 rounded-xl border border-border flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'var(--muted)' }}>
        {svg}
      </div>

      {/* Value */}
      <div>
        <div className="flex items-baseline gap-0.5 mb-1">
          <span className="font-black text-foreground tabular-nums"
            style={{ fontSize: 'clamp(30px, 4vw, 42px)', fontFamily: 'Poppins, sans-serif', lineHeight: 1 }}>
            {count}
          </span>
          <span className="font-bold text-muted-foreground text-lg">{displaySuffix}</span>
        </div>
        <p className="text-xs font-semibold text-foreground uppercase tracking-widest">{label}</p>
      </div>

      {/* Detail on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="text-xs text-muted-foreground leading-relaxed overflow-hidden"
          >
            {detail}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Bottom sweep */}
      <motion.div className="absolute bottom-0 left-0 h-[2px]"
        style={{ backgroundColor: 'var(--foreground)' }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.3 }} />
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// SUBMISSION ROW
// ─────────────────────────────────────────────
function SubmissionRow({
  submission, index, onDelete, onView
}: {
  submission: ContactSubmission
  index: number
  onDelete: (i: number) => void
  onView: (s: ContactSubmission) => void
}) {
  const ref = useRef<HTMLTableRowElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const [hovered, setHovered] = useState(false)

  const formatDate = (d: string) => {
    const date = new Date(d)
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      + ' ' + date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <motion.tr
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: hovered ? 'var(--muted)' : 'transparent', transition: 'background-color 0.15s ease' }}
      className="border-b border-border"
    >
      {/* Name */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            {submission.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <span className="text-sm font-semibold text-foreground whitespace-nowrap"
            style={{ fontFamily: 'Poppins, sans-serif' }}>
            {submission.name}
          </span>
        </div>
      </td>

      {/* Contact */}
      <td className="px-5 py-3.5">
        <div className="flex flex-col gap-0.5">
          <a href={`mailto:${submission.email}`}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors">{submission.email}</a>
          {submission.phone && (
            <a href={`tel:${submission.phone}`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors">{submission.phone}</a>
          )}
        </div>
      </td>

      {/* Service */}
      <td className="px-5 py-3.5">
        <span className="px-2.5 py-1 rounded-full border border-border text-xs text-muted-foreground whitespace-nowrap"
          style={{ fontFamily: 'Poppins, sans-serif' }}>
          {submission.service || 'General'}
        </span>
      </td>

      {/* Date */}
      <td className="px-5 py-3.5">
        <span className="text-xs text-muted-foreground whitespace-nowrap tabular-nums">
          {formatDate(submission.timestamp)}
        </span>
      </td>

      {/* Message preview */}
      <td className="px-5 py-3.5 max-w-[200px]">
        <p className="text-xs text-muted-foreground truncate">{submission.message}</p>
      </td>

      {/* Actions */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onView(submission)}
            className="w-7 h-7 rounded-lg border border-border flex items-center justify-center transition-all duration-150"
            title="View message"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--foreground)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
                stroke="var(--foreground)" strokeWidth="1.2" />
              <circle cx="8" cy="8" r="2" stroke="var(--foreground)" strokeWidth="1.2" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(index)}
            className="w-7 h-7 rounded-lg border border-border flex items-center justify-center transition-all duration-150"
            title="Delete submission"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--destructive)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'color-mix(in srgb, var(--destructive) 10%, transparent)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9"
                stroke="var(--destructive)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </td>
    </motion.tr>
  )
}

// ─────────────────────────────────────────────
// MESSAGE MODAL
// ─────────────────────────────────────────────
function MessageModal({ submission, onClose }: { submission: ContactSubmission; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const formatDate = (d: string) => new Date(d).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'color-mix(in srgb, var(--foreground) 30%, transparent)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-border overflow-hidden"
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              {submission.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>{submission.name}</p>
              <p className="text-xs text-muted-foreground">{formatDate(submission.timestamp)}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center transition-all"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--foreground)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}>
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M3 3l10 10M13 3L3 13" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-px border-b border-border" style={{ backgroundColor: 'var(--border)' }}>
          {[
            { label: 'Email', value: submission.email },
            { label: 'Phone', value: submission.phone || '—' },
            { label: 'Service', value: submission.service || 'General' },
          ].map(item => (
            <div key={item.label} className="px-5 py-3" style={{ backgroundColor: 'var(--card)' }}>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{item.label}</p>
              <p className="text-sm text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="px-6 py-5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Message</p>
          <p className="text-sm text-foreground leading-relaxed">{submission.message}</p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-5 flex gap-3">
          <a href={`mailto:${submission.email}`}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center transition-all"
            style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)', fontFamily: 'Poppins, sans-serif' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}>
            Reply via Email →
          </a>
          {submission.phone && (
            <a href={`tel:${submission.phone}`}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center border border-border transition-all"
              style={{ color: 'var(--foreground)', fontFamily: 'Poppins, sans-serif' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--foreground)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}>
              Call
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────
export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [viewingSubmission, setViewingSubmission] = useState<ContactSubmission | null>(null)
  const [filterService, setFilterService] = useState<string>('All')
  const [search, setSearch] = useState('')

  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' })

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
      setSubmissions(saved)
    } catch { setSubmissions([]) }
  }, [])

  const handleDelete = (index: number) => {
    const updated = submissions.filter((_, i) => i !== index)
    setSubmissions(updated)
    try { localStorage.setItem('contactSubmissions', JSON.stringify(updated)) } catch {}
  }

  // Stats
  const totalInquiries = submissions.length
  const uniqueServices = new Set(submissions.map(s => s.service).filter(Boolean)).size
  const latestDate = submissions.length
    ? new Date(Math.max(...submissions.map(s => new Date(s.timestamp).getTime())))
        .toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
    : '—'

  // Filter
  const allServices = ['All', ...Array.from(new Set(submissions.map(s => s.service || 'General').filter(Boolean)))]
  const filtered = submissions.filter(s => {
    const matchService = filterService === 'All' || (s.service || 'General') === filterService
    const matchSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.message.toLowerCase().includes(search.toLowerCase())
    return matchService && matchSearch
  })

  return (
    <div className="bg-background min-h-screen relative">
      {/* Dot grid background */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.25 }} />
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 100% 60% at 50% 0%, transparent 40%, var(--background) 100%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center flex-shrink-0"
                style={{ fontFamily: 'Poppins, sans-serif' }}>
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <rect x="2" y="3" width="16" height="13" rx="2" stroke="var(--background)" strokeWidth="1.3" />
                  <path d="M6 8h8M6 12h5" stroke="var(--background)" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <div className="h-px w-8 bg-foreground/30" />
              <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                Admin Panel
              </span>
            </div>
            <h1 className="font-bold text-foreground leading-tight"
              style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontFamily: 'Poppins, sans-serif' }}>
              Enquiry Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Contact form submissions from Gonawala & Co. website
            </p>
          </div>

          {/* Export button */}
          <button
            onClick={() => {
              const csv = [
                ['Name', 'Email', 'Phone', 'Service', 'Message', 'Date'].join(','),
                ...submissions.map(s => [s.name, s.email, s.phone, s.service, `"${s.message.replace(/"/g, '""')}"`, new Date(s.timestamp).toLocaleString()].join(','))
              ].join('\n')
              const blob = new Blob([csv], { type: 'text/csv' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url; a.download = 'enquiries.csv'; a.click()
              URL.revokeObjectURL(url)
            }}
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-semibold transition-all"
            style={{ color: 'var(--foreground)', fontFamily: 'Poppins, sans-serif' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--foreground)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M8 2v8M5 7l3 3 3-3M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export CSV
          </button>
        </motion.div>

        {/* ── STAT CARDS ── */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard label="Total Enquiries" rawValue={totalInquiries} displaySuffix=""
            detail="All contact form submissions received via the website."
            index={0} active={statsInView}
            svg={<svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" stroke="var(--foreground)" strokeWidth="1.3"/><path d="M3 7l7 5 7-5" stroke="var(--foreground)" strokeWidth="1.3"/></svg>}
          />
          <StatCard label="Service Categories" rawValue={uniqueServices} displaySuffix=""
            detail="Number of distinct services enquired about."
            index={1} active={statsInView}
            svg={<svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><rect x="2" y="10" width="4" height="8" rx="1" stroke="var(--foreground)" strokeWidth="1.3"/><rect x="8" y="6" width="4" height="12" rx="1" stroke="var(--foreground)" strokeWidth="1.3"/><rect x="14" y="2" width="4" height="16" rx="1" stroke="var(--foreground)" strokeWidth="1.3"/></svg>}
          />
          <StatCard label="Latest Enquiry" rawValue={0} displaySuffix={latestDate}
            detail="Date of the most recent contact form submission."
            index={2} active={statsInView}
            svg={<svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><circle cx="10" cy="10" r="7" stroke="var(--foreground)" strokeWidth="1.3"/><path d="M10 6v4l2.5 2.5" stroke="var(--foreground)" strokeWidth="1.3" strokeLinecap="round"/></svg>}
          />
        </div>

        {/* ── TABLE ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-2xl border border-border overflow-hidden"
          style={{ backgroundColor: 'var(--card)' }}
        >
          {/* Table header */}
          <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-bold text-foreground text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Enquiries
              <span className="ml-2 text-sm text-muted-foreground font-normal">
                ({filtered.length}{filtered.length !== submissions.length ? ` of ${submissions.length}` : ''})
              </span>
            </h2>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Search */}
              <div className="relative">
                <svg viewBox="0 0 16 16" fill="none" className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none">
                  <circle cx="6.5" cy="6.5" r="4.5" stroke="var(--muted-foreground)" strokeWidth="1.2" />
                  <path d="M10 10l3 3" stroke="var(--muted-foreground)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Search…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-2 rounded-lg text-xs outline-none"
                  style={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    color: 'var(--foreground)',
                    fontFamily: 'Poppins, sans-serif',
                    width: '160px',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--foreground)'}
                  onBlur={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
                />
              </div>

              {/* Service filter */}
              {allServices.length > 1 && (
                <div className="flex gap-1 flex-wrap">
                  {allServices.slice(0, 4).map(s => (
                    <button key={s} onClick={() => setFilterService(s)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                      style={{
                        backgroundColor: filterService === s ? 'var(--foreground)' : 'var(--muted)',
                        color: filterService === s ? 'var(--background)' : 'var(--muted-foreground)',
                        fontFamily: 'Poppins, sans-serif',
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Table body */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--muted)' }}>
                <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                    stroke="var(--muted-foreground)" strokeWidth="1.3" />
                  <path d="M3 7l7 5 7-5" stroke="var(--muted-foreground)" strokeWidth="1.3" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {submissions.length === 0 ? 'No enquiries yet' : 'No results found'}
              </p>
              <p className="text-xs text-muted-foreground">
                {submissions.length === 0
                  ? 'Submissions will appear here once visitors use the contact form.'
                  : 'Try a different search or filter.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    {['Name', 'Contact', 'Service', 'Date', 'Message', 'Actions'].map(col => (
                      <th key={col} className="px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                        style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub, i) => (
                    <SubmissionRow
                      key={sub.timestamp + i}
                      submission={sub}
                      index={i}
                      onDelete={() => handleDelete(submissions.indexOf(sub))}
                      onView={setViewingSubmission}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* ── NOTICE ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-start gap-3 p-4 rounded-xl border border-border"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5">
            <circle cx="8" cy="8" r="6.5" stroke="var(--muted-foreground)" strokeWidth="1" />
            <path d="M8 7v5M8 5v1" stroke="var(--muted-foreground)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Demo mode.</span> Submissions are stored in your browser's localStorage.
            In production, replace localStorage with a server-side database (Supabase, PlanetScale, MongoDB Atlas etc.)
            and add authentication to protect this route.
          </p>
        </motion.div>

      </div>

      {/* ── MESSAGE MODAL ── */}
      <AnimatePresence>
        {viewingSubmission && (
          <MessageModal
            submission={viewingSubmission}
            onClose={() => setViewingSubmission(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}