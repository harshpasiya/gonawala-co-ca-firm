'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X, Check } from 'lucide-react'

// Emoji icons for each service
const serviceIcons: Record<number, string> = {
  1: '📊', 2: '🔍', 3: '📋', 4: '🔗', 5: '⚖️', 6: '💰',
  7: '💳', 8: '🌍', 9: '💱', 10: '🏦', 11: '📈', 12: '🌐',
  13: '⚡', 14: '🚀', 15: '👥', 16: '✅', 17: '📱', 18: '↔️'
}

const allServices = [
  { id: 1, title: 'Accounting & Bookkeeping', shortDescription: 'Financial statement preparation', description: 'Complete bookkeeping and financial statement preparation for comprehensive financial management.', category: 'Core', subServices: ['Maintaining books of accounts', 'Preparation of financial statements (Balance Sheet, P&L, Cash Flow)', 'Management accounting and MIS reports'] },
  { id: 2, title: 'Auditing & Assurance', shortDescription: 'Comprehensive audit services', description: 'Comprehensive audit services including statutory, tax, internal, and forensic audits.', category: 'Core', subServices: ['Statutory Audit under Companies Act', 'Tax Audit under section 44AB', 'Internal Audit and Bank Audit', 'Forensic Audit and Cost Audit'] },
  { id: 3, title: 'Taxation Services', shortDescription: 'Tax planning and advisory', description: 'Expert tax planning and advisory to optimize your tax liability.', category: 'Core', subServices: ['Income Tax return filing', 'Tax planning and advisory', 'TDS/TCS compliance', 'Advance tax computation'] },
  { id: 4, title: 'GST Compliance', shortDescription: 'GST management services', description: 'Complete GST management and compliance services for seamless tax filing.', category: 'Core', subServices: ['GST registration and filing', 'Monthly/quarterly GSTR-1 and GSTR-3B filing', 'GST audit and reconciliation', 'GST refund claims'] },
  { id: 5, title: 'Corporate & Company Law', shortDescription: 'Company law services', description: 'Full-spectrum company law services including incorporation and compliance.', category: 'Core', subServices: ['Company incorporation (Pvt Ltd, LLP, OPC)', 'ROC compliances', 'Annual returns and forms filing', 'MOA, AOA, board resolutions'] },
  { id: 6, title: 'Financial Advisory', shortDescription: 'Financial planning services', description: 'Strategic financial planning and business valuation services.', category: 'Core', subServices: ['Personal financial planning', 'Investment advisory', 'Business valuation', 'Project finance and feasibility'] },
  { id: 7, title: 'Loan & Fund Raising', shortDescription: 'Financing assistance', description: 'Expert assistance in securing financing for business growth.', category: 'Specialized', subServices: ['CMA data preparation', 'Project reports for bank loans', 'Working capital finance assistance', 'Bank liaison and coordination'] },
  { id: 8, title: 'NRI Taxation', shortDescription: 'NRI tax compliance', description: 'Non-Resident Indian taxation and compliance services.', category: 'International', subServices: ['Income Tax filing for NRI', 'Residential status determination', 'Foreign asset reporting', 'FEMA compliance for NRI'] },
  { id: 9, title: 'FEMA Compliance', shortDescription: 'Foreign exchange compliance', description: 'Foreign Exchange Management Act compliance and advisory.', category: 'International', subServices: ['Foreign investment regulation', 'Remittance and capital transfer', 'AD Code maintenance', 'FEMA return filings'] },
  { id: 10, title: 'RBI Filings & Compliances', shortDescription: 'RBI regulatory filings', description: 'RBI regulatory filings and compliance management.', category: 'International', subServices: ['FDI (Foreign Direct Investment) filings', 'ODI (Overseas Direct Investment) forms', 'ECB (External Commercial Borrowings)', 'Annual return on Foreign Liabilities'] },
  { id: 11, title: 'Transfer Pricing', shortDescription: 'Transfer pricing documentation', description: 'International transaction transfer pricing documentation and advisory.', category: 'International', subServices: ['TP documentation', 'Form 3CEB compliance', 'Arm\'s Length Price advisory', 'TP assessments and disputes'] },
  { id: 12, title: 'International Tax Advisory', shortDescription: 'Cross-border tax planning', description: 'Cross-border taxation and treaty advisory services.', category: 'International', subServices: ['DTAA advisory', 'Cross-border tax planning', 'PE advisory', 'International tax compliance'] },
  { id: 13, title: 'Insolvency & Bankruptcy', shortDescription: 'IBC advisory services', description: 'IBC 2016 and insolvency advisory services.', category: 'Specialized', subServices: ['Acting as Insolvency Professional', 'Advisory under IBC 2016', 'Resolution and liquidation proceedings', 'Financial restructuring and recovery'] },
  { id: 14, title: 'Startup & Business Advisory', shortDescription: 'Startup registration', description: 'Startup registration and business advisory services.', category: 'Specialized', subServices: ['Business registration and structure advisory', 'Startup India registration', 'MSME registration', 'Partnership deeds and shareholder agreements'] },
  { id: 15, title: 'Payroll & Labour Law', shortDescription: 'Payroll processing', description: 'Payroll processing and labour law compliance services.', category: 'Specialized', subServices: ['Salary structuring and payroll processing', 'PF, ESIC, and Professional Tax compliance', 'Labour law advisory', 'Statutory reporting and filings'] },
  { id: 16, title: 'Certification Services', shortDescription: 'Financial certifications', description: 'Financial and professional certification services.', category: 'Specialized', subServices: ['Net worth certificates', 'Income certificates for visa and loans', 'Turnover certificates', 'Form 15CB (remittance certification)'] },
  { id: 17, title: 'Foreign Asset Reporting', shortDescription: 'Asset disclosure services', description: 'Foreign asset disclosure and reporting services.', category: 'International', subServices: ['Schedule FA (Foreign Assets) reporting', 'Foreign bank account reporting', 'Foreign property and securities reporting', 'Penalty and prosecution protection'] },
  { id: 18, title: 'Inbound & Outbound Investment', shortDescription: 'Investment structuring', description: 'Inbound and outbound investment advisory services.', category: 'International', subServices: ['Inbound investment structuring (FDI routes)', 'Outbound investments by Indian companies', 'Setting up subsidiaries and JVs', 'Cross-border transaction advisory'] }
]

function ServiceCard({ service, isSelected, isVisible, onClick }: { service: typeof allServices[0]; isSelected: boolean; isVisible: boolean; onClick: () => void }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={onClick}
          className="group relative px-6 py-4 text-left border transition-all duration-300 w-full cursor-pointer"
          style={{
            backgroundColor: isSelected ? 'var(--muted)' : 'var(--card)',
            borderColor: isSelected ? 'var(--foreground)' : 'var(--border)',
          }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{serviceIcons[service.id]}</span>
              <h3 className="font-semibold text-foreground text-sm leading-snug flex-1">{service.title}</h3>
              <motion.span
                animate={{ x: isSelected ? 4 : 0 }}
                className="text-foreground/40 group-hover:text-foreground/60 flex-shrink-0"
              >
                →
              </motion.span>
            </div>
            <p className="text-xs text-muted-foreground">{service.shortDescription}</p>
          </div>

          {isSelected && (
            <motion.div
              layoutId="underline"
              className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
              initial={false}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function DetailPanel({ service, onNext, onPrev, currentIndex, totalServices, onClose }: { service: typeof allServices[0]; onNext: () => void; onPrev: () => void; currentIndex: number; totalServices: number; onClose: () => void }) {
  const [phase, setPhase] = useState<'headingIn' | 'complete'>('headingIn')
  const [subIndex, setSubIndex] = useState(0)

  const mainTimerRef = useRef<NodeJS.Timeout | null>(null)
  const subTimerRef = useRef<NodeJS.Timeout | null>(null)
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null)

  const resetAll = () => {
    if (mainTimerRef.current) clearTimeout(mainTimerRef.current)
    if (subTimerRef.current) clearTimeout(subTimerRef.current)
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current)
    setPhase('headingIn')
    setSubIndex(0)
  }

  useEffect(() => {
    if (phase === 'headingIn') {
      phaseTimerRef.current = setTimeout(() => {
        setPhase('complete')
      }, 1000)
    }

    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current)
    }
  }, [phase])

  useEffect(() => {
    return () => {
      if (mainTimerRef.current) clearTimeout(mainTimerRef.current)
      if (subTimerRef.current) clearTimeout(subTimerRef.current)
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current)
    }
  }, [])

  const handleSkip = () => {
    resetAll()
    setPhase('complete')
  }

  const handlePrevClick = () => {
    resetAll()
    onPrev()
  }

  const handleNextClick = () => {
    resetAll()
    onNext()
  }

  const handleClose = () => {
    resetAll()
    onClose()
  }

  const totalDuration = (service.subServices.length * 1800) + 2000
  const progress = 50

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onKeyDown={(e) => e.key === 'Escape' && handleClose()}
      tabIndex={0}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background border border-border rounded-lg max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Progress Bar */}
        <div className="h-1 bg-border overflow-hidden">
          <motion.div
            className="h-full bg-foreground"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        </div>

        {/* Header */}
        <div className="border-b border-border px-8 py-6 flex justify-between items-start gap-4">
          <div className="flex-1">
            <motion.h2
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
              className="text-3xl md:text-4xl font-bold text-foreground"
            >
              {service.title}
            </motion.h2>
            <p className="text-sm text-foreground/50 mt-1">{service.category}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-foreground/5 rounded transition-colors flex-shrink-0"
          >
            <X size={20} className="text-foreground/60" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8 p-8">
          {/* Left Column */}
          <div className="flex-1 md:w-3/5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <p className="text-foreground/70 leading-relaxed">{service.description}</p>
            </motion.div>

            {phase === 'complete' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-8 space-y-4"
              >
                <Check size={48} className="text-foreground/60" />
                <p className="text-sm text-muted-foreground">Explored fully</p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 bg-foreground text-background rounded text-sm font-semibold hover:bg-foreground/90 transition-colors"
                >
                  View All Services
                </button>
              </motion.div>
            )}
          </div>

          {/* Right Column - Subservices Pills */}
          <div className="md:w-2/5">
            <div className="max-h-96 md:max-h-full overflow-y-auto pr-2 space-y-2">
              {service.subServices.map((sub, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    backgroundColor: 'var(--card)',
                    color: 'var(--muted-foreground)',
                    borderColor: 'var(--border)',
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className="px-4 py-2 border rounded-lg text-sm font-medium"
                >
                  {sub}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls Footer */}
        <div className="border-t border-border px-8 py-4 flex justify-between items-center gap-4 flex-wrap">
          <button
            onClick={handleSkip}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Skip Animation
          </button>
          <div className="text-xs text-foreground/50">
            {currentIndex + 1} of {totalServices}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrevClick}
              className="p-2 hover:bg-foreground/5 rounded transition-colors"
              aria-label="Previous service"
            >
              <ChevronLeft size={18} className="text-foreground/60" />
            </button>
            <button
              onClick={handleNextClick}
              className="p-2 hover:bg-foreground/5 rounded transition-colors"
              aria-label="Next service"
            >
              <ChevronRight size={18} className="text-foreground/60" />
            </button>
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

  const filteredServices = allServices.filter(service => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Core') return service.id >= 1 && service.id <= 6
    if (activeFilter === 'Specialized') return service.id >= 7 && service.id <= 11
    if (activeFilter === 'International') return service.id >= 12 && service.id <= 18
    return true
  })

  const handleNext = () => {
    const currentIdx = allServices.findIndex(s => s.id === selectedServiceId)
    const nextIdx = (currentIdx + 1) % allServices.length
    setSelectedServiceId(allServices[nextIdx].id)
  }

  const handlePrev = () => {
    const currentIdx = allServices.findIndex(s => s.id === selectedServiceId)
    const prevIdx = (currentIdx - 1 + allServices.length) % allServices.length
    setSelectedServiceId(allServices[prevIdx].id)
  }

  return (
    <>
      <section className="min-h-[60vh] flex items-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Comprehensive Financial Services
            </h1>
            <p className="text-lg text-foreground/60 mb-8 leading-relaxed">
              Eighteen specialized services covering all aspects of financial management, accounting, taxation, and international compliance.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-foreground text-background rounded text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-8"
          >
            Our Services
          </motion.h2>

          {/* Filter Bar */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {(['All', 'Core', 'Specialized', 'International'] as const).map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                animate={{
                  backgroundColor: activeFilter === filter ? 'var(--foreground)' : 'var(--card)',
                  color: activeFilter === filter ? 'var(--background)' : 'var(--muted-foreground)',
                  borderColor: activeFilter === filter ? 'var(--foreground)' : 'var(--border)',
                }}
                transition={{ duration: 0.25 }}
                className="px-4 py-2 border rounded-full text-sm font-medium transition-all hover:border-foreground"
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Services Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.04,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {allServices.map((service) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
                layout
              >
                <ServiceCard
                  service={service}
                  isSelected={selectedServiceId === service.id}
                  isVisible={filteredServices.some(s => s.id === service.id)}
                  onClick={() => setSelectedServiceId(service.id)}
                />
              </motion.div>
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
