'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'
import { FileText, Calculator, Users, TrendingUp, BarChart3, Globe, DollarSign, ShieldCheck, Briefcase, ListCheck } from 'lucide-react'

const allServices = [
  {
    id: 1,
    category: 'Accounting & Bookkeeping',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
    description: 'Complete bookkeeping and accounting solutions for your business',
    services: [
      'Maintaining books of accounts',
      'Preparation of financial statements (Balance Sheet, P&L, Cash Flow)',
      'Management accounting and MIS reports',
    ],
  },
  {
    id: 2,
    category: 'Auditing & Assurance',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    description: 'Comprehensive audit and assurance services',
    services: [
      'Statutory Audit – mandatory audit under Companies Act',
      'Tax Audit – u/s 44AB of Income Tax Act',
      'Internal Audit – reviewing internal controls and processes',
      'Bank Audit – concurrent and stock audits',
      'Forensic Audit – detecting fraud and financial irregularities',
      'Cost Audit – audit of cost records',
      'Stock Audit – physical verification of inventory',
    ],
  },
  {
    id: 3,
    category: 'Taxation Services',
    icon: FileText,
    color: 'from-orange-500 to-red-500',
    description: 'Expert tax planning and compliance services',
    services: [
      'Income Tax return filing (individuals, firms, companies)',
      'Tax planning and advisory',
      'TDS/TCS compliance and return filing',
      'Advance tax computation and appeal filing',
    ],
  },
  {
    id: 4,
    category: 'GST Compliance',
    icon: ShieldCheck,
    color: 'from-green-500 to-emerald-500',
    description: 'Goods & Services Tax compliance and advisory',
    services: [
      'GST registration and filing',
      'Monthly/quarterly GST return filing (GSTR-1, GSTR-3B)',
      'GST audit and reconciliation',
      'GST refund claims and advisory',
    ],
  },
  {
    id: 5,
    category: 'Corporate & Company Law',
    icon: Briefcase,
    color: 'from-indigo-500 to-purple-500',
    description: 'Corporate compliance and company law services',
    services: [
      'Company incorporation (Pvt Ltd, LLP, OPC)',
      'ROC (Registrar of Companies) compliances',
      'Filing of annual returns and forms with MCA',
      'Drafting of MOA, AOA, board resolutions',
    ],
  },
  {
    id: 6,
    category: 'Financial Advisory',
    icon: TrendingUp,
    color: 'from-rose-500 to-orange-500',
    description: 'Strategic financial planning and advisory',
    services: [
      'Personal financial planning',
      'Investment advisory',
      'Business valuation',
      'Project finance and feasibility reports',
    ],
  },
  {
    id: 7,
    category: 'Loan & Fund Raising',
    icon: DollarSign,
    color: 'from-yellow-500 to-amber-500',
    description: 'Loan and fund raising assistance',
    services: [
      'Preparation of CMA (Credit Monitoring Arrangement) data',
      'Project reports for bank loans',
      'Working capital finance assistance',
      'Liaison with banks and financial institutions',
    ],
  },
  {
    id: 8,
    category: 'Insolvency & Bankruptcy',
    icon: ShieldCheck,
    color: 'from-cyan-500 to-blue-500',
    description: 'IBC 2016 and insolvency advisory',
    services: [
      'Acting as Insolvency Professional (IP)',
      'Advisory under IBC 2016',
      'Resolution and liquidation proceedings',
      'Financial restructuring and recovery',
    ],
  },
  {
    id: 9,
    category: 'Startup & Business Advisory',
    icon: Briefcase,
    color: 'from-pink-500 to-rose-500',
    description: 'Startup registration and business advisory',
    services: [
      'Business registration and structure advisory',
      'Startup India registration',
      'MSME registration',
      'Drafting of partnership deeds and shareholder agreements',
    ],
  },
  {
    id: 10,
    category: 'Payroll & Labour Law',
    icon: Users,
    color: 'from-teal-500 to-cyan-500',
    description: 'Payroll processing and labour law compliance',
    services: [
      'Salary structuring and payroll processing',
      'PF, ESIC, and Professional Tax compliance',
      'Labour law advisory',
      'Statutory reporting and filings',
    ],
  },
  {
    id: 11,
    category: 'Certification Services',
    icon: ListCheck,
    color: 'from-violet-500 to-purple-500',
    description: 'Financial and professional certifications',
    services: [
      'Net worth certificates',
      'Income certificates for visa and loan purposes',
      'Turnover certificates',
      'Form 15CB (remittance certification)',
    ],
  },
  {
    id: 12,
    category: 'NRI Taxation',
    icon: Globe,
    color: 'from-blue-600 to-blue-400',
    description: 'Non-Resident Indian taxation services',
    services: [
      'Income Tax filing for NRI',
      'Residential status determination',
      'Foreign asset reporting',
      'FEMA compliance for NRI account holders',
    ],
  },
  {
    id: 13,
    category: 'FEMA Compliance',
    icon: Globe,
    color: 'from-emerald-500 to-teal-500',
    description: 'Foreign Exchange Management Act compliance',
    services: [
      'Foreign investment regulation advisory',
      'Remittance and capital transfer compliance',
      'AD Code maintenance and compliance',
      'FEMA return filings and documentation',
    ],
  },
  {
    id: 14,
    category: 'RBI Filings',
    icon: BarChart3,
    color: 'from-red-500 to-orange-500',
    description: 'RBI regulatory filings and compliance',
    services: [
      'FDI (Foreign Direct Investment) filings',
      'ODI (Overseas Direct Investment) – Form ODI',
      'ECB (External Commercial Borrowings)',
      'Annual return on Foreign Liabilities and Assets',
    ],
  },
  {
    id: 15,
    category: 'Transfer Pricing',
    icon: BarChart3,
    color: 'from-amber-500 to-yellow-500',
    description: 'International transaction transfer pricing',
    services: [
      'Documentation of international transactions',
      'Transfer Pricing Study Report (Form 3CEB)',
      'Advisory on Arm\'s Length Price (ALP)',
      'Transfer Pricing assessments and disputes',
    ],
  },
  {
    id: 16,
    category: 'International Tax Advisory',
    icon: Globe,
    color: 'from-sky-500 to-cyan-500',
    description: 'International taxation and treaty advisory',
    services: [
      'Double Taxation Avoidance Agreement (DTAA) advisory',
      'Cross-border tax planning',
      'PE (Permanent Establishment) advisory',
      'International tax compliance',
    ],
  },
  {
    id: 17,
    category: 'Foreign Asset Reporting',
    icon: FileText,
    color: 'from-pink-600 to-rose-400',
    description: 'Foreign asset disclosure and reporting',
    services: [
      'Schedule FA (Foreign Assets) reporting',
      'Foreign bank account reporting',
      'Foreign property and securities reporting',
      'Penalty and prosecution protection',
    ],
  },
  {
    id: 18,
    category: 'Inbound & Outbound Investment',
    icon: Globe,
    color: 'from-purple-600 to-pink-400',
    description: 'Inbound and outbound investment advisory',
    services: [
      'Inbound investment structuring (FDI routes)',
      'Outbound investments by Indian companies',
      'Setting up subsidiaries and JVs',
      'Cross-border transaction advisory',
    ],
  },
]

export function ServicesContent() {
  const [selectedService, setSelectedService] = useState<typeof allServices[0] | null>(null)

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-foreground/5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6">
            Comprehensive Financial Services
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 mb-8">
            18 specialized services covering all aspects of financial management
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Our Services
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Click on any service to explore detailed information and sub-services
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {allServices.map((service) => {
              const IconComponent = service.icon
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer text-left"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {service.category}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white/70">
                        {service.services.length} services
                      </span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-white"
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 flex items-center justify-between p-6 border-b border-foreground/10 bg-background">
                <h2 className="text-3xl font-bold text-foreground">{selectedService.category}</h2>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-lg text-foreground/70">{selectedService.description}</p>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Services Included ({selectedService.services.length})
                  </h3>
                  <ul className="space-y-3">
                    {selectedService.services.map((subService, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-3 items-start"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-foreground to-foreground/60 flex items-center justify-center text-background text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-foreground/80 pt-0.5">{subService}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/contact"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-foreground to-foreground/80 text-background rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Get This Service
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
