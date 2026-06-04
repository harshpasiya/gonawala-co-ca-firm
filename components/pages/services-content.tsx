'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X } from 'lucide-react'
import { FileText, Calculator, Users, TrendingUp, BarChart3, Globe, DollarSign, ShieldCheck, Briefcase, ListCheck, Zap, Eye } from 'lucide-react'

const allServices = [
  {
    id: 1,
    category: 'Accounting & Bookkeeping',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
    image: '/images/service-1.png',
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
    image: '/images/service-2.png',
    description: 'Comprehensive audit and assurance services',
    services: [
      'Statutory Audit – mandatory audit under Companies Act',
      'Tax Audit – u/s 44AB of Income Tax Act',
      'Internal Audit – reviewing internal controls and processes',
      'Bank Audit – concurrent, stock, and branch audits',
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
    image: '/images/service-3.png',
    description: 'Expert tax planning and compliance services',
    services: [
      'Income Tax return filing (individuals, firms, companies)',
      'Tax planning and advisory',
      'TDS/TCS compliance and return filing',
      'Advance tax computation',
      'Handling income tax notices and assessments',
      'Appeal filing before CIT(A), ITAT',
    ],
  },
  {
    id: 4,
    category: 'GST (Goods & Services Tax)',
    icon: ShieldCheck,
    color: 'from-green-500 to-emerald-500',
    image: '/images/service-4.png',
    description: 'Complete GST registration and compliance',
    services: [
      'GST registration',
      'Monthly/quarterly GST return filing (GSTR-1, GSTR-3B, etc.)',
      'GST audit and reconciliation',
      'GST refund claims',
      'Advisory on GST applicability and classification',
    ],
  },
  {
    id: 5,
    category: 'Corporate & Company Law Services',
    icon: Briefcase,
    color: 'from-indigo-500 to-blue-500',
    image: '/images/service-5.png',
    description: 'Corporate compliance and legal advisory',
    services: [
      'Company incorporation (Pvt Ltd, LLP, OPC, etc.)',
      'ROC (Registrar of Companies) compliances',
      'Filing of annual returns and forms with MCA',
      'Drafting of MOA, AOA, board resolutions',
      'Secretarial services and compliance under Companies Act 2013',
    ],
  },
  {
    id: 6,
    category: 'Financial Advisory & Planning',
    icon: TrendingUp,
    color: 'from-teal-500 to-cyan-500',
    image: '/images/service-6.png',
    description: 'Strategic financial planning and advisory',
    services: [
      'Personal financial planning',
      'Investment advisory',
      'Business valuation',
      'Project finance and feasibility reports',
      'Budgeting and forecasting',
    ],
  },
  {
    id: 7,
    category: 'Loan & Fund Raising',
    icon: DollarSign,
    color: 'from-yellow-500 to-orange-500',
    image: '/images/service-7.png',
    description: 'Loan preparation and fund raising assistance',
    services: [
      'Preparation of CMA (Credit Monitoring Arrangement) data',
      'Project reports for bank loans',
      'Working capital finance assistance',
      'Liaison with banks and financial institutions',
    ],
  },
  {
    id: 8,
    category: 'Insolvency & Bankruptcy (IBC)',
    icon: ShieldCheck,
    color: 'from-red-500 to-pink-500',
    image: '/images/service-8.png',
    description: 'Insolvency and bankruptcy resolution services',
    services: [
      'Acting as Insolvency Professional (IP)',
      'Advisory under IBC 2016',
      'Resolution and liquidation proceedings',
    ],
  },
  {
    id: 9,
    category: 'Startup & Business Advisory',
    icon: Zap,
    color: 'from-pink-500 to-rose-500',
    image: '/images/service-9.png',
    description: 'Support for startups and business ventures',
    services: [
      'Business registration and structure advisory',
      'Startup India registration',
      'MSME registration',
      'Drafting of partnership deeds, shareholder agreements',
      'Due diligence for mergers & acquisitions',
    ],
  },
  {
    id: 10,
    category: 'Payroll & Labour Law Compliance',
    icon: Users,
    color: 'from-cyan-500 to-blue-500',
    image: '/images/service-10.png',
    description: 'Payroll processing and labour compliance',
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
    image: '/images/service-11.png',
    description: 'Official certificates for various purposes',
    services: [
      'Net worth certificates',
      'Income certificates for visa and loan purposes',
      'Turnover certificates',
      'Form 15CB (remittance certification)',
      'Various certificates required by banks, courts, and regulators',
    ],
  },
  {
    id: 12,
    category: 'NRI Taxation',
    icon: Globe,
    color: 'from-sky-500 to-blue-500',
    image: '/images/service-12.png',
    description: 'Specialized taxation services for NRIs',
    services: [
      'Filing Income Tax Returns for NRIs',
      'Determining residential status (NRI / RNOR / Resident) under FEMA and Income Tax Act',
      'Taxability of Indian income (rent, interest, capital gains) for NRIs',
      'Advisory on TDS applicable on NRI transactions',
      'Claiming DTAA (Double Tax Avoidance Agreement) benefits to avoid double taxation',
    ],
  },
  {
    id: 13,
    category: 'FEMA (Foreign Exchange Management Act) Compliance',
    icon: Eye,
    color: 'from-emerald-500 to-teal-500',
    image: '/images/service-13.png',
    description: 'Foreign exchange compliance and advisory',
    services: [
      'Advisory on permissible and prohibited transactions under FEMA',
      'Compounding of FEMA contraventions',
      'Repatriation of funds from India to abroad',
      'NRE / NRO / FCNR account advisory and compliance',
      'Reporting of foreign assets and liabilities',
    ],
  },
  {
    id: 14,
    category: 'RBI Filings & Compliances',
    icon: ShieldCheck,
    color: 'from-rose-500 to-pink-500',
    image: '/images/service-14.png',
    description: 'RBI regulatory filings and compliance',
    services: [
      'FDI (Foreign Direct Investment) – FC-GPR, FC-TRS filings',
      'ODI (Overseas Direct Investment) – Form ODI filing',
      'ECB (External Commercial Borrowings) – Form ECB filings',
      'Annual return on Foreign Liabilities and Assets (FLA Return)',
    ],
  },
  {
    id: 15,
    category: 'Transfer Pricing',
    icon: BarChart3,
    color: 'from-amber-500 to-orange-500',
    image: '/images/service-15.png',
    description: 'International transaction transfer pricing',
    services: [
      'Documentation of international transactions between related parties',
      'Transfer Pricing Study Report (Form 3CEB)',
      'Advisory on Arm\'s Length Price (ALP)',
      'Handling Transfer Pricing assessments and disputes',
    ],
  },
  {
    id: 16,
    category: 'International Taxation Advisory',
    icon: Globe,
    color: 'from-fuchsia-500 to-purple-500',
    image: '/images/service-16.png',
    description: 'Cross-border taxation and advisory',
    services: [
      'Structuring cross-border transactions tax-efficiently',
      'Permanent Establishment (PE) risk analysis',
      'Advisory on withholding tax on payments to non-residents',
      'Tax residency certificates and Form 15CA/15CB for remittances',
      'BEPS (Base Erosion and Profit Shifting) compliance',
    ],
  },
  {
    id: 17,
    category: 'Foreign Asset Reporting',
    icon: Eye,
    color: 'from-lime-500 to-green-500',
    image: '/images/service-17.png',
    description: 'Foreign asset disclosure and compliance',
    services: [
      'Disclosure of foreign assets in ITR Schedule FA',
      'Black Money Act compliance for undisclosed foreign income/assets',
      'Advisory under Foreign Asset disclosure schemes',
    ],
  },
  {
    id: 18,
    category: 'Inbound & Outbound Investment Advisory',
    icon: Briefcase,
    color: 'from-cyan-500 to-sky-500',
    image: '/images/service-18.png',
    description: 'Investment structuring and advisory',
    services: [
      'Structuring of inbound investments into India (FDI routes, sectoral caps)',
      'Outbound investments by Indian companies/individuals abroad',
      'Setting up subsidiaries, JVs, or liaison offices in India or abroad',
    ],
  },
]

export function ServicesContent() {
  const [selectedService, setSelectedService] = useState<typeof allServices[0] | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

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
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {allServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.button
                  key={service.id}
                  variants={itemVariants}
                  onClick={() => setSelectedService(service)}
                  className="group relative p-8 rounded-2xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/20 transition-all duration-300 text-left cursor-pointer overflow-hidden"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  {/* Icon */}
                  <div className={`relative z-10 inline-block p-4 rounded-xl bg-gradient-to-br ${service.color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 text-xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                    {service.category}
                  </h3>
                  <p className="relative z-10 text-sm text-foreground/70 mb-4">
                    {service.description}
                  </p>

                  {/* Sub-services count */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-sm text-foreground/60">
                      {service.services.length} services
                    </span>
                    <motion.span
                      whileHover={{ x: 4 }}
                      className="text-foreground/60 group-hover:text-foreground transition-colors"
                    >
                      →
                    </motion.span>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-foreground/5 via-foreground/10 to-foreground/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Need Professional Financial Guidance?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Choose any of our 18 specialized services to get started
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header with Close Button */}
              <div className="sticky top-0 z-10 bg-background border-b border-foreground/10 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    {selectedService.category}
                  </h2>
                  <p className="text-foreground/70">
                    {selectedService.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Services List */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Services Included:
                  </h3>
                  <ul className="space-y-4">
                    {selectedService.services.map((service, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${selectedService.color} flex items-center justify-center mt-1`}>
                          <span className="text-white text-sm font-semibold">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="text-foreground font-medium group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                            {service}
                          </p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/contact"
                    className="block w-full px-6 py-3 bg-foreground text-background font-semibold rounded-xl text-center hover:bg-foreground/90 transition-all duration-300"
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
