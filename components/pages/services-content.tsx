'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const allServices = [
  {
    id: 1,
    title: 'Accounting & Bookkeeping',
    description: 'Complete bookkeeping and financial statement preparation for comprehensive financial management.',
    category: 'Core',
    subServices: [
      'Maintaining books of accounts',
      'Preparation of financial statements (Balance Sheet, P&L, Cash Flow)',
      'Management accounting and MIS reports',
    ]
  },
  {
    id: 2,
    title: 'Auditing & Assurance',
    description: 'Comprehensive audit services including statutory, tax, internal, and forensic audits.',
    category: 'Core',
    subServices: [
      'Statutory Audit under Companies Act',
      'Tax Audit under section 44AB',
      'Internal Audit and Bank Audit',
      'Forensic Audit and Cost Audit'
    ]
  },
  {
    id: 3,
    title: 'Taxation Services',
    description: 'Expert tax planning and advisory to optimize your tax liability.',
    category: 'Core',
    subServices: [
      'Income Tax return filing',
      'Tax planning and advisory',
      'TDS/TCS compliance',
      'Advance tax computation'
    ]
  },
  {
    id: 4,
    title: 'GST Compliance',
    description: 'Complete GST management and compliance services for seamless tax filing.',
    category: 'Core',
    subServices: [
      'GST registration and filing',
      'Monthly/quarterly GSTR-1 and GSTR-3B filing',
      'GST audit and reconciliation',
      'GST refund claims'
    ]
  },
  {
    id: 5,
    title: 'Corporate & Company Law',
    description: 'Full-spectrum company law services including incorporation and compliance.',
    category: 'Core',
    subServices: [
      'Company incorporation (Pvt Ltd, LLP, OPC)',
      'ROC compliances',
      'Annual returns and forms filing',
      'MOA, AOA, board resolutions'
    ]
  },
  {
    id: 6,
    title: 'Financial Advisory',
    description: 'Strategic financial planning and business valuation services.',
    category: 'Core',
    subServices: [
      'Personal financial planning',
      'Investment advisory',
      'Business valuation',
      'Project finance and feasibility'
    ]
  },
  {
    id: 7,
    title: 'Loan & Fund Raising',
    description: 'Expert assistance in securing financing for business growth.',
    category: 'Specialized',
    subServices: [
      'CMA data preparation',
      'Project reports for bank loans',
      'Working capital finance assistance',
      'Bank liaison and coordination'
    ]
  },
  {
    id: 8,
    title: 'NRI Taxation',
    description: 'Non-Resident Indian taxation and compliance services.',
    category: 'International',
    subServices: [
      'Income Tax filing for NRI',
      'Residential status determination',
      'Foreign asset reporting',
      'FEMA compliance for NRI'
    ]
  },
  {
    id: 9,
    title: 'FEMA Compliance',
    description: 'Foreign Exchange Management Act compliance and advisory.',
    category: 'International',
    subServices: [
      'Foreign investment regulation',
      'Remittance and capital transfer',
      'AD Code maintenance',
      'FEMA return filings'
    ]
  },
  {
    id: 10,
    title: 'RBI Filings & Compliances',
    description: 'RBI regulatory filings and compliance management.',
    category: 'International',
    subServices: [
      'FDI (Foreign Direct Investment) filings',
      'ODI (Overseas Direct Investment) forms',
      'ECB (External Commercial Borrowings)',
      'Annual return on Foreign Liabilities'
    ]
  },
  {
    id: 11,
    title: 'Transfer Pricing',
    description: 'International transaction transfer pricing documentation and advisory.',
    category: 'International',
    subServices: [
      'TP documentation',
      'Form 3CEB compliance',
      'Arm\'s Length Price advisory',
      'TP assessments and disputes'
    ]
  },
  {
    id: 12,
    title: 'International Tax Advisory',
    description: 'Cross-border taxation and treaty advisory services.',
    category: 'International',
    subServices: [
      'DTAA advisory',
      'Cross-border tax planning',
      'PE advisory',
      'International tax compliance'
    ]
  },
  {
    id: 13,
    title: 'Insolvency & Bankruptcy',
    description: 'IBC 2016 and insolvency advisory services.',
    category: 'Specialized',
    subServices: [
      'Acting as Insolvency Professional',
      'Advisory under IBC 2016',
      'Resolution and liquidation proceedings',
      'Financial restructuring and recovery'
    ]
  },
  {
    id: 14,
    title: 'Startup & Business Advisory',
    description: 'Startup registration and business advisory services.',
    category: 'Specialized',
    subServices: [
      'Business registration and structure advisory',
      'Startup India registration',
      'MSME registration',
      'Partnership deeds and shareholder agreements'
    ]
  },
  {
    id: 15,
    title: 'Payroll & Labour Law',
    description: 'Payroll processing and labour law compliance services.',
    category: 'Specialized',
    subServices: [
      'Salary structuring and payroll processing',
      'PF, ESIC, and Professional Tax compliance',
      'Labour law advisory',
      'Statutory reporting and filings'
    ]
  },
  {
    id: 16,
    title: 'Certification Services',
    description: 'Financial and professional certification services.',
    category: 'Specialized',
    subServices: [
      'Net worth certificates',
      'Income certificates for visa and loans',
      'Turnover certificates',
      'Form 15CB (remittance certification)'
    ]
  },
  {
    id: 17,
    title: 'Foreign Asset Reporting',
    description: 'Foreign asset disclosure and reporting services.',
    category: 'International',
    subServices: [
      'Schedule FA (Foreign Assets) reporting',
      'Foreign bank account reporting',
      'Foreign property and securities reporting',
      'Penalty and prosecution protection'
    ]
  },
  {
    id: 18,
    title: 'Inbound & Outbound Investment',
    description: 'Inbound and outbound investment advisory services.',
    category: 'International',
    subServices: [
      'Inbound investment structuring (FDI routes)',
      'Outbound investments by Indian companies',
      'Setting up subsidiaries and JVs',
      'Cross-border transaction advisory'
    ]
  }
]

function TypeWriter({ text, speed = 50, onComplete }: { text: string; speed?: number; onComplete?: () => void }) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    if (displayedText === text) {
      onComplete?.()
      return
    }

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [displayedText, text, speed, onComplete])

  return <span>{displayedText}</span>
}

function ServiceCard({ service, isSelected, onClick }: { service: typeof allServices[0]; isSelected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative px-6 py-4 text-left border transition-all duration-300 w-full ${
        isSelected
          ? 'border-foreground bg-foreground/5'
          : 'border-border hover:border-foreground/50 bg-transparent hover:bg-foreground/2.5'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-snug">{service.title}</h3>
          <p className="text-xs text-foreground/50 mt-1 line-clamp-1">{service.category}</p>
        </div>
        <motion.span
          animate={{ x: isSelected ? 4 : 0 }}
          className="text-foreground/40 group-hover:text-foreground/60 flex-shrink-0"
        >
          →
        </motion.span>
      </div>

      <motion.div
        layoutId={`underline-${service.id}`}
        className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
        initial={false}
        animate={{ scaleX: isSelected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.button>
  )
}

function DetailPanel({ service, onNext, onPrev, totalServices, onClose }: { service: typeof allServices[0]; onNext: () => void; onPrev: () => void; totalServices: number; onClose: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'mainTyping' | 'mainWait' | 'subTyping' | 'done'>('mainTyping')
  const currentIndex = allServices.findIndex(s => s.id === service.id)
  const progress = ((currentIndex + 1) / totalServices) * 100

  const handleMainTypeComplete = () => {
    setPhase('mainWait')
    setTimeout(() => {
      setPhase('subTyping')
    }, 800)
  }

  const handleSubTypeComplete = () => {
    setPhase('done')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background border border-border rounded-lg max-w-2xl w-full my-8"
      >
        <div className="border-b border-border px-8 py-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-2"
          >
            <TypeWriter text={service.title} speed={40} onComplete={handleMainTypeComplete} />
          </motion.h2>
          <p className="text-sm text-foreground/50">{service.category}</p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="h-0.5 bg-foreground/20"
          style={{ width: `${progress}%`, transformOrigin: 'left' }}
        />

        <div className="px-8 py-8 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-2">Overview</h3>
            <p className="text-foreground/70 leading-relaxed">{service.description}</p>
          </motion.div>

          <div>
            <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">
              <TypeWriter
                text={`Services Included (${service.subServices.length})`}
                speed={30}
                onComplete={handleSubTypeComplete}
              />
            </h3>
            <div className="space-y-2">
              {phase !== 'idle' && phase !== 'mainTyping' && (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  className="space-y-2"
                >
                  {service.subServices.map((subService, index) => (
                    <motion.li
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                      }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-foreground/70 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-foreground/70 text-sm leading-relaxed pt-0.5">{subService}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-4"
          >
            <Link
              href="/contact"
              className="inline-block px-6 py-2.5 bg-foreground text-background rounded text-sm font-semibold hover:bg-foreground/90 transition-colors"
            >
              Get This Service
            </Link>
          </motion.div>
        </div>

        <div className="border-t border-border px-8 py-4 flex items-center justify-between gap-4">
          <div className="text-xs text-foreground/50">
            {currentIndex + 1} of {totalServices}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onPrev}
              className="p-2 hover:bg-foreground/5 rounded transition-colors"
              aria-label="Previous service"
            >
              <ChevronLeft size={18} className="text-foreground/60" />
            </button>
            <button
              onClick={onNext}
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
  const selectedService = allServices.find(s => s.id === selectedServiceId)

  const handleNext = () => {
    if (selectedServiceId === null) return
    const currentIndex = allServices.findIndex(s => s.id === selectedServiceId)
    const nextIndex = (currentIndex + 1) % allServices.length
    setSelectedServiceId(allServices[nextIndex].id)
  }

  const handlePrev = () => {
    if (selectedServiceId === null) return
    const currentIndex = allServices.findIndex(s => s.id === selectedServiceId)
    const prevIndex = (currentIndex - 1 + allServices.length) % allServices.length
    setSelectedServiceId(allServices[prevIndex].id)
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
              Eighteen specialized services covering all aspects of financial management, accounting, taxation, and international compliance. Select a service to explore our offerings.
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
              >
                <ServiceCard
                  service={service}
                  isSelected={selectedServiceId === service.id}
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
            totalServices={allServices.length}
            onClose={() => setSelectedServiceId(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
