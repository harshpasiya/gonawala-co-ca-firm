'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Service data with updated descriptions (2-line versions)
const allServices = [
  { id: 1, title: 'Accounting & Bookkeeping', description: 'Complete books of accounts, financial statements, and MIS reports. Ensuring accurate records for informed business decisions.', category: 'Core', subServices: ['Maintaining books of accounts', 'Preparation of financial statements (Balance Sheet, P&L, Cash Flow)', 'Management accounting and MIS reports'] },
  { id: 2, title: 'Auditing & Assurance', description: 'Statutory, tax, internal, forensic, and bank audits under one roof. Independent verification for compliance and credibility.', category: 'Core', subServices: ['Statutory Audit under Companies Act', 'Tax Audit under section 44AB', 'Internal Audit and Bank Audit', 'Forensic Audit and Cost Audit'] },
  { id: 3, title: 'Taxation Services', description: 'Income tax filing, planning, TDS compliance, and appeal handling. End-to-end tax management for individuals and businesses.', category: 'Core', subServices: ['Income Tax return filing', 'Tax planning and advisory', 'TDS/TCS compliance', 'Advance tax computation'] },
  { id: 4, title: 'GST Compliance', description: 'GST registration, return filing, audits, and refund claims. Full compliance with all GST regulations and advisories.', category: 'Core', subServices: ['GST registration and filing', 'Monthly/quarterly GSTR-1 and GSTR-3B filing', 'GST audit and reconciliation', 'GST refund claims'] },
  { id: 5, title: 'Corporate & Company Law', description: 'Company incorporation, ROC filings, and secretarial services. Complete corporate compliance under Companies Act 2013.', category: 'Core', subServices: ['Company incorporation (Pvt Ltd, LLP, OPC)', 'ROC compliances', 'Annual returns and forms filing', 'MOA, AOA, board resolutions'] },
  { id: 6, title: 'Financial Advisory & Planning', description: 'Investment advisory, business valuation, and feasibility reports. Strategic financial planning for growth and stability.', category: 'Core', subServices: ['Personal financial planning', 'Investment advisory', 'Business valuation', 'Project finance and feasibility'] },
  { id: 7, title: 'Loan & Fund Raising', description: 'CMA data, project reports, and working capital assistance. Expert liaison with banks and financial institutions.', category: 'Specialized', subServices: ['CMA data preparation', 'Project reports for bank loans', 'Working capital finance assistance', 'Bank liaison and coordination'] },
  { id: 8, title: 'Insolvency & Bankruptcy', description: 'IBC 2016 advisory, insolvency proceedings, and resolution support. Acting as Insolvency Professional for corporate restructuring.', category: 'Specialized', subServices: ['Acting as Insolvency Professional', 'Advisory under IBC 2016', 'Resolution and liquidation proceedings', 'Financial restructuring and recovery'] },
  { id: 9, title: 'Startup & Business Advisory', description: 'Startup India, MSME registration, and M&A due diligence. End-to-end advisory for new ventures and growing businesses.', category: 'Specialized', subServices: ['Business registration and structure advisory', 'Startup India registration', 'MSME registration', 'Partnership deeds and shareholder agreements'] },
  { id: 10, title: 'Payroll & Labour Law', description: 'Payroll processing, PF, ESIC, and professional tax compliance. Complete workforce financial compliance management.', category: 'Specialized', subServices: ['Salary structuring and payroll processing', 'PF, ESIC, and Professional Tax compliance', 'Labour law advisory', 'Statutory reporting and filings'] },
  { id: 11, title: 'Certification Services', description: 'Net worth, income, turnover, and Form 15CB certificates. Trusted certifications accepted by banks, courts, and embassies.', category: 'Specialized', subServices: ['Net worth certificates', 'Income certificates for visa and loans', 'Turnover certificates', 'Form 15CB (remittance certification)'] },
  { id: 12, title: 'NRI Taxation', description: 'NRI income tax returns, residential status advisory, and DTAA benefits. Complete tax compliance for non-resident Indians.', category: 'International', subServices: ['Income Tax filing for NRI', 'Residential status determination', 'Foreign asset reporting', 'FEMA compliance for NRI'] },
  { id: 13, title: 'FEMA Compliance', description: 'FEMA advisory, fund repatriation, and NRE/NRO account guidance. Full compliance with foreign exchange regulations.', category: 'International', subServices: ['Foreign investment regulation', 'Remittance and capital transfer', 'AD Code maintenance', 'FEMA return filings'] },
  { id: 14, title: 'RBI Filings & Compliances', description: 'FDI, ODI, ECB filings, and FLA annual return submissions. Complete RBI regulatory compliance for cross-border transactions.', category: 'International', subServices: ['FDI (Foreign Direct Investment) filings', 'ODI (Overseas Direct Investment) forms', 'ECB (External Commercial Borrowings)', 'Annual return on Foreign Liabilities'] },
  { id: 15, title: 'Transfer Pricing', description: 'International transaction documentation and Form 3CEB reports. Expert transfer pricing advisory and dispute handling.', category: 'International', subServices: ['TP documentation', 'Form 3CEB compliance', 'Arm\'s Length Price advisory', 'TP assessments and disputes'] },
  { id: 16, title: 'International Taxation', description: 'Cross-border tax structuring, PE analysis, and BEPS compliance. Form 15CA/15CB and withholding tax advisory.', category: 'International', subServices: ['Cross-border tax structuring', 'PE advisory', 'International tax compliance', 'Form 15CA/15CB withholding'] },
  { id: 17, title: 'Foreign Asset Reporting', description: 'ITR Schedule FA disclosure and Black Money Act compliance. Advisory on foreign asset reporting and disclosure schemes.', category: 'International', subServices: ['Schedule FA (Foreign Assets) reporting', 'Foreign bank account reporting', 'Foreign property and securities reporting', 'Penalty and prosecution protection'] },
  { id: 18, title: 'Inbound & Outbound Investment Advisory', description: 'FDI structuring, outbound investment planning, and JV setup. Strategic advisory for global investment decisions.', category: 'International', subServices: ['Inbound investment structuring (FDI routes)', 'Outbound investments by Indian companies', 'Setting up subsidiaries and JVs', 'Cross-border transaction advisory'] }
]

// SVG Illustrations for each service
function ServiceSVG({ serviceId }: { serviceId: number }) {
  const svgContent: Record<number, string> = {
    1: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><rect x="30" y="40" width="140" height="120" rx="2"/><line x1="60" y1="40" x2="60" y2="160"/><line x1="90" y1="40" x2="90" y2="160"/><line x1="120" y1="40" x2="120" y2="160"/><line x1="150" y1="40" x2="150" y2="160"/><line x1="30" y1="65" x2="170" y2="65"/><line x1="30" y1="90" x2="170" y2="90"/><line x1="30" y1="115" x2="170" y2="115"/><line x1="30" y1="140" x2="170" y2="140"/></g><text x="100" y="175" text-anchor="middle" font-size="12" fill="var(--foreground)">∑</text></svg>',
    2: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><circle cx="130" cy="80" r="45"/><line x1="90" y1="50" x2="160" y2="120" stroke-width="2.5"/></g><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><rect x="40" y="50" width="70" height="80" rx="2"/><line x1="50" y1="65" x2="100" y2="65"/><line x1="50" y1="80" x2="100" y2="80"/><line x1="50" y1="95" x2="100" y2="95"/><line x1="50" y1="110" x2="100" y2="110"/></g></svg>',
    3: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><path d="M 40 150 L 40 50 L 90 20 L 140 50 L 140 150" stroke-width="2"/><line x1="70" y1="50" x2="70" y2="150"/><line x1="100" y1="50" x2="100" y2="150"/><circle cx="50" cy="80" r="6" fill="var(--foreground)"/><circle cx="80" cy="60" r="6" fill="var(--foreground)"/><circle cx="120" cy="90" r="6" fill="var(--foreground)"/></g></svg>',
    4: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><circle cx="60" cy="80" r="35"/><circle cx="100" cy="80" r="35"/><circle cx="140" cy="80" r="35"/><line x1="95" y1="80" x2="105" y2="80" stroke-width="2"/><line x1="135" y1="80" x2="145" y2="80" stroke-width="2"/><circle cx="60" cy="80" r="8" fill="var(--foreground)"/><circle cx="100" cy="80" r="8" fill="var(--foreground)"/><circle cx="140" cy="80" r="8" fill="var(--foreground)"/></g></svg>',
    5: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><path d="M 100 30 L 150 70 L 140 150 L 60 150 L 50 70 Z"/><line x1="100" y1="30" x2="100" y2="150"/><line x1="60" y1="150" x2="140" y2="150"/><rect x="80" y="80" width="40" height="40" rx="2"/></g></svg>',
    6: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><polyline points="40,140 80,80 120,100 160,40"/><circle cx="40" cy="140" r="5" fill="var(--foreground)"/><circle cx="80" cy="80" r="5" fill="var(--foreground)"/><circle cx="120" cy="100" r="5" fill="var(--foreground)"/><circle cx="160" cy="40" r="5" fill="var(--foreground)"/><line x1="30" y1="160" x2="170" y2="160" stroke-width="1.5"/></g></svg>',
    7: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><rect x="50" y="50" width="100" height="100" rx="3"/><rect x="65" y="65" width="20" height="15" fill="var(--foreground)"/><rect x="92" y="60" width="20" height="20" fill="var(--foreground)"/><rect x="119" y="55" width="20" height="25" fill="var(--foreground)"/></g></svg>',
    8: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><path d="M 70 80 L 100 120 L 130 80 Z"/><line x1="100" y1="50" x2="100" y2="120" stroke-width="1.5"/><line x1="70" y1="140" x2="130" y2="140" stroke-width="1.5"/><path d="M 70 150 L 75 160 L 130 160 L 125 150" fill="var(--border)"/></g></svg>',
    9: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><line x1="50" y1="160" x2="50" y2="60"/><line x1="50" y1="160" x2="150" y2="160"/><polyline points="60,140 80,100 100,120 120,60 140,100"/><circle cx="60" cy="140" r="3" fill="var(--foreground)"/><circle cx="80" cy="100" r="3" fill="var(--foreground)"/><circle cx="100" cy="120" r="3" fill="var(--foreground)"/><circle cx="120" cy="60" r="3" fill="var(--foreground)"/><circle cx="140" cy="100" r="3" fill="var(--foreground)"/></g></svg>',
    10: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><circle cx="50" cy="70" r="12"/><circle cx="100" cy="70" r="12"/><circle cx="150" cy="70" r="12"/><line x1="50" y1="85" x2="50" y2="110"/><line x1="100" y1="85" x2="100" y2="110"/><line x1="150" y1="85" x2="150" y2="110"/><line x1="35" y1="110" x2="65" y2="110" stroke-width="2"/><line x1="85" y1="110" x2="115" y2="110" stroke-width="2"/><line x1="135" y1="110" x2="165" y2="110" stroke-width="2"/></g></svg>',
    11: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><circle cx="100" cy="100" r="50" stroke-width="1.5"/><circle cx="100" cy="100" r="30"/><path d="M 100 50 L 100 80 M 60 100 L 80 100 M 140 100 L 160 100 M 100 120 L 100 150"/></g><circle cx="100" cy="100" r="12" fill="var(--foreground)"/></svg>',
    12: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><circle cx="100" cy="100" r="60" stroke-width="2"/><path d="M 100 50 Q 150 75 150 100 Q 150 145 100 160 Q 50 145 50 100 Q 50 75 100 50" stroke-width="1.5"/><line x1="100" y1="50" x2="100" y2="160" stroke-width="1"/></g></svg>',
    13: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><path d="M 50 150 L 80 60 L 120 60 L 150 150 Z"/><line x1="100" y1="60" x2="100" y2="150"/><line x1="70" y1="100" x2="130" y2="100"/></g><line x1="30" y1="155" x2="170" y2="155" stroke="var(--foreground)" stroke-width="1.5"/></svg>',
    14: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><polygon points="100,40 160,160 40,160" fill="none"/><circle cx="100" cy="90" r="15" fill="var(--foreground)"/><line x1="100" y1="110" x2="100" y2="140"/></g></svg>',
    15: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><rect x="50" y="60" width="100" height="80" rx="3"/><circle cx="65" cy="75" r="5" fill="var(--foreground)"/><circle cx="105" cy="75" r="5" fill="var(--foreground)"/><circle cx="145" cy="75" r="5" fill="var(--foreground)"/><line x1="60" y1="95" x2="140" y2="95"/><line x1="60" y1="115" x2="140" y2="115"/></g></svg>',
    16: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><circle cx="100" cy="100" r="55"/><circle cx="100" cy="100" r="45"/><path d="M 100 55 L 100 65 L 110 75 L 100 75 L 90 75 L 100 65 Z" fill="var(--foreground)"/><path d="M 145 100 Q 155 90 165 100" fill="none" stroke-width="1.5"/></g></svg>',
    17: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><rect x="45" y="50" width="110" height="100" rx="4"/><circle cx="60" cy="70" r="4" fill="var(--foreground)"/><circle cx="85" cy="70" r="4" fill="var(--foreground)"/><circle cx="110" cy="70" r="4" fill="var(--foreground)"/><circle cx="135" cy="70" r="4" fill="var(--foreground)"/><line x1="55" y1="90" x2="145" y2="90"/><line x1="55" y1="110" x2="145" y2="110"/></g></svg>',
    18: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><path d="M 60 80 L 100 50 L 140 80 L 140 150 L 60 150 Z"/><line x1="100" y1="50" x2="100" y2="150"/><line x1="60" y1="100" x2="140" y2="100"/><circle cx="100" cy="125" r="8" fill="var(--foreground)"/></g></svg>'
  }
  return <svg dangerouslySetInnerHTML={{ __html: svgContent[serviceId] || '' }} style={{ width: '100%', height: '100%' }} />
}

function ServiceCard({ service, onClick }: { service: typeof allServices[0]; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border bg-card h-64 md:h-72 flex flex-col hover:border-foreground"
      whileHover={{ scale: 1.03 }}
      style={{ x: 0 }}
    >
      {/* Image Area (55%) */}
      <motion.div
        className="relative w-full h-[55%] overflow-hidden rounded-t-2xl filter transition-all duration-300 group-hover:brightness-[1.15]"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <ServiceSVG serviceId={service.id} />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'linear' }}
          style={{
            background: 'linear-gradient(90deg, transparent, var(--foreground) 15%, transparent)',
            opacity: 0.15
          }}
        />
      </motion.div>

      {/* Text Area (45%) */}
      <div className="p-3 md:p-4 flex flex-col justify-between h-[45%]">
        <div>
          <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-2 mb-2">{service.title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{service.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{service.category}</span>
          <motion.span animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-xs text-muted-foreground">→</motion.span>
        </div>
      </div>
    </motion.button>
  )
}

function DetailPanel({ service, onNext, onPrev, currentIndex, totalServices, onClose }: any) {
  const [typedMain, setTypedMain] = useState('')
  const [typedSubs, setTypedSubs] = useState<string[]>([])
  const [showCTA, setShowCTA] = useState(false)
  const [activeSubIndex, setActiveSubIndex] = useState(-1)
  const [completed, setCompleted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const subTimerRef = useRef<NodeJS.Timeout | null>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  const cleanupTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (subTimerRef.current) clearInterval(subTimerRef.current)
  }

  const startAnimation = () => {
    cleanupTimers()
    setTypedMain('')
    setTypedSubs([])
    setShowCTA(false)
    setActiveSubIndex(-1)
    setCompleted(false)

    // Type main description
    let mainIdx = 0
    timerRef.current = setInterval(() => {
      if (mainIdx < service.description.length) {
        setTypedMain(service.description.slice(0, ++mainIdx))
      } else {
        if (timerRef.current) clearInterval(timerRef.current)
        // After main done, start subservices
        typeSubservices()
      }
    }, 15)
  }

  const typeSubservices = () => {
    let subIdx = 0
    const initialSubs: string[] = []

    const typeNextSub = () => {
      if (subIdx < service.subServices.length) {
        setActiveSubIndex(subIdx)
        const sub = service.subServices[subIdx]
        let charIdx = 0
        initialSubs.push('')
        setTypedSubs([...initialSubs])

        subTimerRef.current = setInterval(() => {
          if (charIdx < sub.length) {
            initialSubs[subIdx] = sub.slice(0, ++charIdx)
            setTypedSubs([...initialSubs])
          } else {
            if (subTimerRef.current) clearInterval(subTimerRef.current)
            subIdx++
            setTimeout(() => {
              setTypedSubs(prev => {
                const updated = [...prev]
                if (updated[subIdx - 1] !== undefined) {
                  updated[subIdx - 1] = service.subServices[subIdx - 1]
                }
                return updated
              })
              typeNextSub()
            }, 1000)
          }
        }, 15)
      } else {
        setActiveSubIndex(-1)
        setShowCTA(true)
        setCompleted(true)
      }
    }

    typeNextSub()
  }

  useEffect(() => {
    startAnimation()
    return cleanupTimers
  }, [service.id])

  const handleSkip = () => {
    cleanupTimers()
    setTypedMain(service.description)
    setTypedSubs(service.subServices)
    setActiveSubIndex(-1)
    setShowCTA(true)
    setCompleted(true)
  }

  const totalDuration = (service.subServices.length * 1500) + 3000
  const progress = completed ? 100 : (typedMain.length / service.description.length * 30) + (typedSubs.length / service.subServices.length * 70)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background border border-border rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Progress Bar */}
        <div className="h-0.5 bg-border overflow-hidden">
          <motion.div
            className="h-full bg-foreground"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Header */}
        <div className="border-b border-border px-6 md:px-8 py-4 md:py-6 flex justify-between items-start">
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">{service.category}</p>
          </motion.div>
          <button onClick={onClose} className="p-2 hover:bg-foreground/5 rounded transition-colors">
            <X size={20} className="text-foreground/60" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-[40%_60%]">
          {/* Left Panel - Image */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 20, duration: 0.5 }}
            className="hidden md:flex items-center justify-center min-h-96 rounded-l-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <ServiceSVG serviceId={service.id} />
            </motion.div>
          </motion.div>

          {/* Right Panel - Content */}
          <motion.div
            ref={rightPanelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-y-auto p-5 md:p-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border"
          >
            {/* Overview Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
              <p className="text-xs md:text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">Overview</p>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                {typedMain}
                {typedMain.length < service.description.length && <span className="animate-pulse">|</span>}
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="h-px bg-border mb-6"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5, transformOrigin: 'left' }}
            />

            {/* Services Breakdown */}
            {typedSubs.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                <p className="text-xs md:text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">Services Breakdown ({service.subServices.length} services)</p>
                <div className="space-y-3">
                  {service.subServices.map((sub, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: idx < typedSubs.length ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-3"
                      style={{ opacity: idx < activeSubIndex ? 0.6 : 1 }}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-semibold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{typedSubs[idx] || ''}{idx === activeSubIndex && <span className="animate-pulse">|</span>}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA Button */}
            {showCTA && (
              <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-8">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-foreground text-background rounded-xl text-sm font-semibold hover:bg-foreground/90 transition-all"
                >
                  Get This Service
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 md:px-8 py-3 md:py-4 flex justify-between items-center gap-4 flex-wrap text-sm">
          <button onClick={handleSkip} className="text-xs text-muted-foreground hover:text-foreground transition-colors">Skip Animation</button>
          <span className="text-xs text-foreground/50">{currentIndex + 1} of {totalServices}</span>
          <div className="flex gap-2">
            <button onClick={onPrev} className="p-2 hover:bg-foreground/5 rounded"><ChevronLeft size={18} className="text-foreground/60" /></button>
            <button onClick={onNext} className="p-2 hover:bg-foreground/5 rounded"><ChevronRight size={18} className="text-foreground/60" /></button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ServicesContent() {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<'All' | 'Core' | 'Specialized' | 'International'>('All')

  const selectedService = allServices.find(s => s.id === selectedServiceId)
  const currentIndex = allServices.findIndex(s => s.id === selectedServiceId)

  const filteredServices = allServices.filter(s => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Core') return s.category === 'Core'
    if (activeFilter === 'Specialized') return s.category === 'Specialized'
    return s.category === 'International'
  })

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allServices.length
    setSelectedServiceId(allServices[nextIdx].id)
  }

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allServices.length) % allServices.length
    setSelectedServiceId(allServices[prevIdx].id)
  }

  return (
    <>
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-base md:text-lg text-foreground/60 max-w-2xl">Comprehensive financial solutions spanning accounting, taxation, compliance, and international advisory.</p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
            {(['All', 'Core', 'Specialized', 'International'] as const).map(filter => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                animate={{
                  backgroundColor: activeFilter === filter ? 'var(--foreground)' : 'var(--card)',
                  color: activeFilter === filter ? 'var(--background)' : 'var(--foreground)',
                  borderColor: activeFilter === filter ? 'var(--foreground)' : 'var(--border)',
                }}
                transition={{ duration: 0.25 }}
                className="px-4 py-2 border rounded-full text-xs md:text-sm font-semibold hover:border-foreground transition-colors"
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Services Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.07,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} onClick={() => setSelectedServiceId(service.id)} />
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedService && (
          <DetailPanel
            service={selectedService}
            onNext={handleNext}
            onPrev={handlePrev}
            currentIndex={currentIndex}
            totalServices={allServices.length}
            onClose={() => setSelectedServiceId(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
