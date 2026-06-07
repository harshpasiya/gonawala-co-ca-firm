'use client'

import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
interface BlogPost {
  id: string
  title: string
  excerpt: string
  fullExcerpt: string
  category: string
  author: string
  authorRole: string
  date: string
  readTime: string
  tags: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top Tax Strategies to Maximise Your Business Deductions in FY 2024–25',
    excerpt: 'Legal methods to reduce your tax burden and maximise deductions before the financial year closes.',
    fullExcerpt: 'With the financial year drawing to a close, most business owners leave significant deductions on the table simply because they were not aware in time. This guide walks through the most impactful — and entirely legal — strategies to reduce your net tax liability.',
    category: 'Tax Planning',
    author: 'Raj Sharma',
    authorRole: 'Founder & Managing Partner',
    date: 'Mar 15, 2024',
    readTime: '8 min',
    tags: ['Income Tax', 'Deductions', 'FY 2024-25'],
  },
  {
    id: '2',
    title: 'GST Compliance in 2024: Changes, Deadlines, and What Most Businesses Get Wrong',
    excerpt: 'Complete guide to GST compliance, the recent GSTR-9 updates, and the five most common filing mistakes.',
    fullExcerpt: 'Three amendments to GST rules took effect in the first quarter of 2024, yet most small businesses are still filing as if nothing changed. Here is what you need to know before your next GSTR-3B due date.',
    category: 'GST',
    author: 'Amit Kumar',
    authorRole: 'Partner — Indirect Tax',
    date: 'Mar 12, 2024',
    readTime: '10 min',
    tags: ['GST', 'GSTR-9', 'Compliance'],
  },
  {
    id: '3',
    title: 'Financial Planning for Founders: What to Fix Before Your Series A',
    excerpt: 'Strategic financial planning for startups — the compliance and structuring issues investors will ask about.',
    fullExcerpt: 'Investors conducting due diligence on Series A candidates in India consistently flag the same set of issues — most of which are fixable in 60 days if you start early enough. Here is the definitive pre-fundraise checklist.',
    category: 'Advisory',
    author: 'Priya Patel',
    authorRole: 'Partner — Financial Advisory',
    date: 'Mar 10, 2024',
    readTime: '6 min',
    tags: ['Startups', 'Fundraising', 'Due Diligence'],
  },
  {
    id: '4',
    title: 'NRI Tax Filing in India: Residential Status, DTAA, and the Mistakes That Attract Notices',
    excerpt: 'The complete guide for non-resident Indians navigating Indian income tax obligations in 2024.',
    fullExcerpt: 'The Income Tax department sent over 35,000 notices to NRIs in FY 2023-24 — the majority for residential status misclassification or undisclosed foreign assets. This guide explains how to stay fully compliant.',
    category: 'International',
    author: 'Sunita Mehta',
    authorRole: 'Partner — International Practice',
    date: 'Mar 08, 2024',
    readTime: '12 min',
    tags: ['NRI', 'DTAA', 'Foreign Assets'],
  },
  {
    id: '5',
    title: 'Payroll Compliance Under the New Labour Codes: What Changes for Employers',
    excerpt: 'The four new Labour Codes will reshape how Indian employers calculate wages, PF, and leave entitlements.',
    fullExcerpt: 'The consolidation of 29 central labour laws into four codes will have significant implications for how employers structure salaries, calculate PF contributions, and maintain statutory records. Here is a practical breakdown.',
    category: 'Payroll',
    author: 'Lisa Wong',
    authorRole: 'Manager — Payroll & Compliance',
    date: 'Mar 05, 2024',
    readTime: '9 min',
    tags: ['Labour Codes', 'PF', 'ESIC'],
  },
  {
    id: '6',
    title: 'Transfer Pricing Documentation: The Form 3CEB Filing Guide for FY 2024-25',
    excerpt: 'Step-by-step guide to transfer pricing documentation requirements and common compliance pitfalls.',
    fullExcerpt: 'Transfer pricing assessments have become one of the most litigated areas of Indian corporate taxation. Getting your TP documentation right from the outset is far cheaper than defending it after the fact. Here is what your Form 3CEB needs to contain.',
    category: 'International',
    author: 'Sunita Mehta',
    authorRole: 'Partner — International Practice',
    date: 'Mar 01, 2024',
    readTime: '11 min',
    tags: ['Transfer Pricing', 'Form 3CEB', 'MNE'],
  },
  {
    id: '7',
    title: 'IBC 2016 for Creditors: How to File an Application and What to Expect',
    excerpt: 'A practical guide for financial and operational creditors initiating insolvency proceedings under the IBC.',
    fullExcerpt: 'The IBC framework has materially improved recovery rates for creditors in India — but only for those who navigate the process correctly. This guide covers the operational creditor demand notice, Section 7 vs Section 9 applications, and what to expect at the NCLT.',
    category: 'Advisory',
    author: 'Vikram Joshi',
    authorRole: 'Partner — Insolvency',
    date: 'Feb 26, 2024',
    readTime: '13 min',
    tags: ['IBC', 'NCLT', 'Creditors'],
  },
  {
    id: '8',
    title: 'FEMA Compounding: What It Is, When You Need It, and How to Apply',
    excerpt: 'Everything about FEMA contraventions, RBI compounding orders, and how to regularise past violations.',
    fullExcerpt: 'Many Indian businesses discover FEMA violations years after they occurred — often during M&A due diligence. The compounding mechanism exists to regularise these without criminal prosecution, but the process requires precision.',
    category: 'International',
    author: 'Sunita Mehta',
    authorRole: 'Partner — International Practice',
    date: 'Feb 20, 2024',
    readTime: '8 min',
    tags: ['FEMA', 'RBI', 'Compounding'],
  },
  {
    id: '9',
    title: 'Section 44AD Presumptive Taxation: Is It Right for Your Business?',
    excerpt: 'A clear breakdown of presumptive taxation under Section 44AD — eligibility, benefits, and the hidden traps.',
    fullExcerpt: 'Presumptive taxation can significantly simplify compliance for small businesses, but opting into it without understanding the multi-year implications is a common mistake. Here is everything you need to decide whether Section 44AD works for your situation.',
    category: 'Tax Planning',
    author: 'Raj Sharma',
    authorRole: 'Founder & Managing Partner',
    date: 'Feb 15, 2024',
    readTime: '7 min',
    tags: ['Section 44AD', 'Small Business', 'ITR'],
  },
]

const categories = ['All', 'Tax Planning', 'GST', 'Advisory', 'International', 'Payroll']

// ─────────────────────────────────────────────
// BLOG POST SVG ILLUSTRATIONS
// ─────────────────────────────────────────────
const postIllustrations: Record<string, React.ReactNode> = {
  '1': (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="220" fill="var(--muted)" />
      <line x1="40" y1="40" x2="40" y2="180" stroke="var(--border)" strokeWidth="1" />
      <line x1="40" y1="180" x2="360" y2="180" stroke="var(--border)" strokeWidth="1" />
      <rect x="70" y="100" width="30" height="80" fill="var(--foreground)" opacity="0.08" />
      <rect x="120" y="70" width="30" height="110" fill="var(--foreground)" opacity="0.12" />
      <rect x="170" y="90" width="30" height="90" fill="var(--foreground)" opacity="0.09" />
      <rect x="220" y="50" width="30" height="130" fill="var(--foreground)" opacity="0.15" />
      <rect x="270" y="75" width="30" height="105" fill="var(--foreground)" opacity="0.11" />
      <rect x="320" y="40" width="30" height="140" fill="var(--foreground)" opacity="0.18" />
      <polyline points="85,100 135,70 185,90 235,50 285,75 335,40" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
      {[85,135,185,235,285,335].map((x,i) => (
        <circle key={i} cx={x} cy={[100,70,90,50,75,40][i]} r="3" fill="var(--foreground)" opacity="0.6" />
      ))}
      <text x="200" y="208" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">Tax Deductions by Category</text>
    </svg>
  ),
  '2': (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="220" fill="var(--muted)" />
      <circle cx="200" cy="110" r="70" stroke="var(--border)" strokeWidth="1" fill="none" />
      <circle cx="200" cy="110" r="50" stroke="var(--foreground)" strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="200" cy="110" r="25" fill="var(--foreground)" opacity="0.06" />
      {[0,1,2,3,4,5].map(i => {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
        const x1 = 200 + 50 * Math.cos(angle)
        const y1 = 110 + 50 * Math.sin(angle)
        const x2 = 200 + 70 * Math.cos(angle)
        const y2 = 110 + 70 * Math.sin(angle)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--foreground)" strokeWidth="1" opacity="0.4" />
      })}
      <text x="200" y="115" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">GST</text>
      <text x="200" y="208" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">GST Compliance Framework</text>
    </svg>
  ),
  '3': (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="220" fill="var(--muted)" />
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={60 + i*60} y={160 - i*25} width="40" height={25 + i*25} rx="4"
          stroke="var(--foreground)" strokeWidth="1" fill="var(--foreground)" opacity={0.04 + i*0.03} />
      ))}
      <polyline points="80,155 140,130 200,105 260,80 320,55" stroke="var(--foreground)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
      <path d="M310 45 L320 55 L330 45" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
      <text x="200" y="208" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">Startup Growth Trajectory</text>
    </svg>
  ),
  '4': (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="220" fill="var(--muted)" />
      <circle cx="200" cy="105" r="75" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.3" />
      {[30,60,90,150,180,210,240,300,330].map((deg,i) => {
        const r = Math.PI * deg / 180
        return <line key={i} x1={200 + 55*Math.cos(r)} y1={105 + 55*Math.sin(r)}
          x2={200 + 75*Math.cos(r)} y2={105 + 75*Math.sin(r)}
          stroke="var(--foreground)" strokeWidth="1" opacity="0.4" />
      })}
      <path d="M160 80 Q200 50 240 80 Q270 105 240 130 Q200 160 160 130 Q130 105 160 80Z"
        stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.2" />
      <circle cx="200" cy="105" r="8" fill="var(--foreground)" opacity="0.3" />
      <text x="200" y="208" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">NRI Tax Obligations Map</text>
    </svg>
  ),
  '5': (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="220" fill="var(--muted)" />
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <circle cx="80" cy={40 + i*35} r="10" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.4" />
          <line x1="95" y1={40 + i*35} x2="360" y2={40 + i*35} stroke="var(--border)" strokeWidth="0.8" />
          <rect x="105" y={33 + i*35} width={60 + i*30} height="14" rx="2"
            fill="var(--foreground)" opacity={0.05 + i*0.02} />
        </g>
      ))}
      <text x="200" y="208" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">Labour Code Compliance Checklist</text>
    </svg>
  ),
  '6': (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="220" fill="var(--muted)" />
      <rect x="60" y="40" width="120" height="140" rx="4" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.3" />
      <rect x="220" y="40" width="120" height="140" rx="4" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M180 110 L220 110" stroke="var(--foreground)" strokeWidth="1.5" />
      <path d="M212 103 L220 110 L212 117" stroke="var(--foreground)" strokeWidth="1.5" fill="none" />
      {[60,80,100,120].map((y,i) => (
        <line key={i} x1="75" y1={y} x2="165" y2={y} stroke="var(--border)" strokeWidth="0.8" />
      ))}
      {[60,80,100,120].map((y,i) => (
        <line key={i} x1="235" y1={y} x2="325" y2={y} stroke="var(--border)" strokeWidth="0.8" />
      ))}
      <text x="200" y="208" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">Related Party Transaction Flow</text>
    </svg>
  ),
  '7': (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="220" fill="var(--muted)" />
      <path d="M80 60 L200 160 L320 60" stroke="var(--foreground)" strokeWidth="1.5" fill="none" opacity="0.3" />
      <line x1="200" y1="40" x2="200" y2="160" stroke="var(--foreground)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
      <rect x="100" y="75" width="80" height="55" rx="4" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.25" />
      <rect x="220" y="75" width="80" height="55" rx="4" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.25" />
      <text x="140" y="107" textAnchor="middle" fontSize="9" fill="var(--foreground)" fontFamily="Poppins,sans-serif" opacity="0.4">Creditor</text>
      <text x="260" y="107" textAnchor="middle" fontSize="9" fill="var(--foreground)" fontFamily="Poppins,sans-serif" opacity="0.4">Debtor</text>
      <text x="200" y="208" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">IBC Resolution Framework</text>
    </svg>
  ),
  '8': (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="220" fill="var(--muted)" />
      <path d="M120 110 Q200 40 280 110 Q200 180 120 110Z" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M150 110 Q200 65 250 110 Q200 155 150 110Z" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.3" />
      <circle cx="200" cy="110" r="18" stroke="var(--foreground)" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="200" cy="110" r="5" fill="var(--foreground)" opacity="0.4" />
      <line x1="80" y1="110" x2="120" y2="110" stroke="var(--foreground)" strokeWidth="1" opacity="0.3" />
      <line x1="280" y1="110" x2="320" y2="110" stroke="var(--foreground)" strokeWidth="1" opacity="0.3" />
      <text x="200" y="208" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">FEMA Foreign Exchange Flow</text>
    </svg>
  ),
  '9': (
    <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="220" fill="var(--muted)" />
      <rect x="60" y="50" width="280" height="130" rx="6" stroke="var(--foreground)" strokeWidth="1" fill="none" opacity="0.2" />
      <line x1="60" y1="90" x2="340" y2="90" stroke="var(--border)" strokeWidth="0.8" />
      <text x="110" y="75" textAnchor="middle" fontSize="10" fill="var(--foreground)" fontFamily="Poppins,sans-serif" opacity="0.35">Section</text>
      <text x="230" y="75" textAnchor="middle" fontSize="10" fill="var(--foreground)" fontFamily="Poppins,sans-serif" opacity="0.35">Applicability</text>
      {['44AD','44ADA','44AE'].map((s,i) => (
        <g key={s}>
          <text x="90" y={115 + i*28} fontSize="11" fill="var(--foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">{s}</text>
          <rect x="170" y={103 + i*28} width={60 + i*20} height="14" rx="2" fill="var(--foreground)" opacity="0.06" />
        </g>
      ))}
      <text x="200" y="208" textAnchor="middle" fontSize="11" fill="var(--muted-foreground)" fontFamily="Poppins,sans-serif" opacity="0.5">Presumptive Taxation Eligibility</text>
    </svg>
  ),
}

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
function BlogHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const ticker = ['Tax Planning', 'GST Updates', 'NRI Advisory', 'FEMA Compliance',
    'Startup Finance', 'IBC Insights', 'Transfer Pricing', 'Labour Codes',
    'Tax Planning', 'GST Updates', 'NRI Advisory', 'FEMA Compliance',
    'Startup Finance', 'IBC Insights', 'Transfer Pricing', 'Labour Codes']

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center overflow-hidden bg-background">
      {/* Diagonal ruled lines */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="absolute h-px"
            style={{
              top: `${i * 6.5}%`, left: '-10%', right: '-10%',
              backgroundColor: 'var(--border)', opacity: 0.45,
              transform: 'rotate(-6deg)', transformOrigin: 'left center',
            }}
          />
        ))}
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 25%, var(--background) 100%)' }}
      />

      {/* Watermark */}
      <motion.div style={{ y, opacity }}
        className="absolute right-[-4%] top-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span style={{
          fontSize: 'clamp(140px, 24vw, 340px)', fontFamily: 'Poppins, sans-serif',
          fontWeight: 900, color: 'var(--foreground)', opacity: 0.025,
          lineHeight: 0.85, letterSpacing: '-0.05em',
        }}>BLOG</span>
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        {/* Eyebrow */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-9">
          <div className="h-px w-8 bg-foreground/50" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold">
            Insights · {blogPosts.length} Articles
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-8 lg:gap-16 items-end">
          <div>
            {['Expert insights', 'on tax, compliance,', 'and finance.'].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.08 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black leading-[0.92] tracking-tight"
                  style={{
                    fontSize: 'clamp(44px, 7.5vw, 104px)',
                    fontFamily: 'Poppins, sans-serif',
                    color: i === 2 ? 'var(--muted-foreground)' : 'var(--foreground)',
                  }}
                >{line}</motion.h1>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="flex flex-col gap-5 pb-2">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Practical guides, compliance updates, and strategic insights from our CA partners — written for business owners who want to understand their finances, not just delegate them.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Published weekly</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="flex flex-wrap gap-2">
              {['Tax Planning', 'GST', 'NRI', 'FEMA', 'IBC'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-border text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-transparent via-foreground/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Ticker strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border py-3 overflow-hidden bg-background/80 backdrop-blur-sm">
        <motion.div animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="flex gap-10 whitespace-nowrap w-max">
          {ticker.map((item, i) => (
            <span key={i} className="text-xs uppercase tracking-widest text-muted-foreground/40 font-medium">
              {item}<span className="ml-10 text-border">·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FEATURED POST (first post, large)
// ─────────────────────────────────────────────
function FeaturedPost({ post }: { post: BlogPost }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-16 md:py-20 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-foreground/50" />
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">Featured</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-14 items-center">
          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden border border-border aspect-video"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            {postIllustrations[post.id]}
            {/* Category badge overlay */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-foreground text-background rounded-lg text-xs font-semibold"
              style={{ fontFamily: 'Poppins, sans-serif' }}>
              {post.category}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>{post.readTime} read</span>
            </div>

            <h2 className="font-bold text-foreground leading-tight"
              style={{ fontSize: 'clamp(22px, 3vw, 38px)', fontFamily: 'Poppins, sans-serif' }}>
              {post.title}
            </h2>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {post.fullExcerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-full border border-border text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>

            {/* Author + CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                </div>
              </div>
              <Link href={`/blog/${post.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg text-xs font-semibold hover:bg-foreground/90 transition-all">
                Read Article
                <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// BLOG CARD
// ─────────────────────────────────────────────
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl border border-border overflow-hidden flex flex-col hover:border-foreground transition-colors duration-300"
      style={{ backgroundColor: hovered ? 'var(--card)' : 'var(--background)' }}
    >
      {/* Illustration */}
      <div className="relative aspect-video overflow-hidden"
        style={{ backgroundColor: 'var(--muted)' }}>
        <motion.div animate={{ scale: hovered ? 1.04 : 1 }} transition={{ duration: 0.5 }}
          className="w-full h-full">
          {postIllustrations[post.id] || (
            <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect width="400" height="220" fill="var(--muted)" />
            </svg>
          )}
        </motion.div>

        {/* Category pill */}
        <div className="absolute top-3 left-3 px-2.5 py-1 bg-background border border-border rounded-lg text-xs font-semibold text-foreground">
          {post.category}
        </div>

        {/* Read time */}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-background/80 backdrop-blur-sm border border-border rounded-lg text-xs text-muted-foreground">
          {post.readTime}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col gap-3 flex-1">
        <p className="text-xs text-muted-foreground">{post.date}</p>

        <h3 className="font-bold text-foreground leading-snug text-base md:text-lg line-clamp-2"
          style={{ fontFamily: 'Poppins, sans-serif' }}>
          {post.title}
        </h3>

        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold flex-shrink-0">
              {post.author.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-xs text-muted-foreground">{post.author}</span>
          </div>
          <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}
            className="text-xs text-foreground font-semibold flex items-center gap-1">
            Read
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Bottom border sweep on hover */}
      <motion.div className="absolute bottom-0 left-0 h-0.5 bg-foreground"
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.35 }} />
    </motion.article>
  )
}

// ─────────────────────────────────────────────
// GRID SECTION WITH FILTERS
// ─────────────────────────────────────────────
function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12">
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              animate={{
                backgroundColor: activeCategory === cat ? 'var(--foreground)' : 'var(--card)',
                color: activeCategory === cat ? 'var(--background)' : 'var(--foreground)',
                borderColor: activeCategory === cat ? 'var(--foreground)' : 'var(--border)',
              }}
              transition={{ duration: 0.22 }}
              className="px-4 py-2 border rounded-full text-xs md:text-sm font-semibold hover:border-foreground transition-colors"
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-2 opacity-50 text-xs">
                  {posts.filter(p => p.category === cat).length}
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-base">No articles in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// NEWSLETTER SECTION
// ─────────────────────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 border-t border-border overflow-hidden relative"
      style={{ backgroundColor: 'var(--foreground)' }}
    >
      {/* Grid overlay — uses --background so it adapts in both themes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--background) 1px, transparent 1px), linear-gradient(90deg, var(--background) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          opacity: 0.04,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] gap-10 lg:gap-20 items-center">

          {/* LEFT — heading + bullet points */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ backgroundColor: 'var(--background)', opacity: 0.3 }} />
              <span
                className="text-xs uppercase tracking-[0.22em] font-semibold"
                style={{ color: 'var(--background)', opacity: 0.5 }}
              >
                Newsletter
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-bold leading-tight mb-4"
              style={{
                fontSize: 'clamp(26px, 4vw, 48px)',
                fontFamily: 'Poppins, sans-serif',
                color: 'var(--background)',
              }}
            >
              Tax changes don't<br />wait. Neither should you.
            </h2>

            {/* Subtext */}
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--background)', opacity: 0.55 }}
            >
              Get our weekly digest of compliance deadlines, regulatory updates, and practical advisory — written by practising CAs, not content marketers.
            </p>

            {/* Bullet list */}
            <div className="mt-7 flex flex-col gap-3">
              {[
                'Deadline calendar every Monday morning',
                'Analysis of CBDT and CBIC notifications',
                'One practical tip from our partners per week',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: 'var(--background)', opacity: 0.4 }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--background)', opacity: 0.55 }}
                  >
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — form card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="p-7 md:p-9 rounded-2xl"
            style={{
              backgroundColor: 'var(--background)',
              border: '1px solid var(--border)',
              opacity: 1,
            }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Form heading — now uses --foreground so readable in both themes */}
                  <p
                    className="font-semibold mb-1"
                    style={{
                      color: 'var(--foreground)',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '18px',
                    }}
                  >
                    Subscribe — it's free
                  </p>
                  <p
                    className="text-sm mb-6"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Join 1,200+ business owners who read our weekly digest.
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        backgroundColor: 'var(--input)',
                        border: '1px solid var(--border)',
                        color: 'var(--foreground)',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        backgroundColor: 'var(--input)',
                        border: '1px solid var(--border)',
                        color: 'var(--foreground)',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    />
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                      style={{
                        backgroundColor: 'var(--foreground)',
                        color: 'var(--background)',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      Subscribe to Weekly Digest →
                    </button>
                  </form>

                  <p
                    className="text-xs mt-4 text-center"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    No spam. Unsubscribe at any time.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div
                    className="w-14 h-14 rounded-full border-2 flex items-center justify-center mx-auto mb-5"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="var(--foreground)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p
                    className="font-bold text-lg mb-2"
                    style={{ color: 'var(--foreground)', fontFamily: 'Poppins, sans-serif' }}
                  >
                    You're in.
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    First digest lands in your inbox this Monday.
                  </p>
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
// ROOT EXPORT
// ─────────────────────────────────────────────
export default function BlogContent() {
  const featured = blogPosts[0]
  const rest = blogPosts.slice(1)

  return (
    <div className="bg-background text-foreground">
      <BlogHero />
      <FeaturedPost post={featured} />
      <BlogGrid posts={rest} />
      <NewsletterSection />
    </div>
  )
}