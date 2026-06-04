'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, X } from 'lucide-react'
import { FileText, Calculator, Users, TrendingUp, BarChart3, Globe, DollarSign, ShieldCheck, Briefcase, ListCheck } from 'lucide-react'

const coreServices = [
  {
    id: 1,
    title: 'Accounting & Bookkeeping',
    description: 'Complete bookkeeping and financial statement preparation for comprehensive financial management.',
    image: '/images/service-1.png',
    color: 'from-blue-500 to-cyan-500',
    icon: Calculator,
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
    image: '/images/service-2.png',
    color: 'from-purple-500 to-pink-500',
    icon: BarChart3,
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
    image: '/images/service-3.png',
    color: 'from-orange-500 to-red-500',
    icon: FileText,
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
    image: '/images/feature-1.png',
    color: 'from-green-500 to-emerald-500',
    icon: ShieldCheck,
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
    image: '/images/feature-2.png',
    color: 'from-indigo-500 to-purple-500',
    icon: Briefcase,
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
    image: '/images/feature-3.png',
    color: 'from-rose-500 to-orange-500',
    icon: TrendingUp,
    subServices: [
      'Personal financial planning',
      'Investment advisory',
      'Business valuation',
      'Project finance and feasibility'
    ]
  }
]

const internationalServices = [
  {
    id: 7,
    title: 'Loan & Fund Raising',
    description: 'Expert assistance in securing financing for business growth.',
    color: 'from-yellow-500 to-amber-500',
    icon: DollarSign,
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
    color: 'from-blue-600 to-blue-400',
    icon: Globe,
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
    color: 'from-emerald-500 to-teal-500',
    icon: Globe,
    subServices: [
      'Foreign investment regulation',
      'Remittance and capital transfer',
      'AD Code maintenance',
      'FEMA return filings'
    ]
  },
  {
    id: 10,
    title: 'Transfer Pricing',
    description: 'International transaction transfer pricing documentation and advisory.',
    color: 'from-amber-500 to-yellow-500',
    icon: BarChart3,
    subServices: [
      'TP documentation',
      'Form 3CEB compliance',
      'Arm\'s Length Price advisory',
      'TP assessments and disputes'
    ]
  },
  {
    id: 11,
    title: 'International Tax',
    description: 'Cross-border taxation and treaty advisory services.',
    color: 'from-sky-500 to-cyan-500',
    icon: Globe,
    subServices: [
      'DTAA advisory',
      'Cross-border tax planning',
      'PE advisory',
      'International tax compliance'
    ]
  },
  {
    id: 12,
    title: 'Inbound Investment',
    description: 'Inbound and outbound investment structuring advisory.',
    color: 'from-purple-600 to-pink-400',
    icon: Globe,
    subServices: [
      'Inbound investment structuring',
      'Outbound investments',
      'Subsidiary and JV setup',
      'Cross-border advisory'
    ]
  }
]

export function ServicesContent() {
  const [selectedService, setSelectedService] = useState<typeof coreServices[0] | null>(null)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <>
      {/* Hero Section */}
      <section ref={ref} className="min-h-screen relative overflow-hidden pt-16 flex items-center bg-background">
        <motion.div className="absolute inset-0 z-0" style={{ y }}>
          <Image
            src="/images/hero-bg.png"
            alt="Services background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span className="inline-block text-sm uppercase tracking-widest text-foreground/60 mb-4">
                  Our Services
                </span>
                <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight mb-4 text-foreground">
                  Comprehensive Financial Solutions
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg text-foreground/70 leading-relaxed max-w-xl"
              >
                From accounting to international taxation, we deliver expert financial services across 12 core and 6 specialized international services.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-all flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  Get Started
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 border border-foreground/30 text-foreground rounded-lg font-semibold hover:bg-foreground/5 transition-colors w-full sm:w-auto text-center"
                >
                  Back Home
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Services with Images */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">Core Services</span>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground">
              Professional Expertise Across All Domains
            </h2>
          </motion.div>

          <div className="space-y-24">
            {coreServices.map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(service)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group w-full text-left"
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:grid-cols-2' : ''}`}>
                  {index % 2 === 0 ? (
                    <>
                      <motion.div whileHover={{ scale: 1.05 }} className="relative h-96 rounded-2xl overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      </motion.div>
                      <div className="space-y-6">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-4xl font-bold text-foreground">{service.title}</h3>
                        <p className="text-lg text-foreground/70 leading-relaxed">{service.description}</p>
                        <div className="flex gap-4">
                          <div className="h-1 w-12 bg-foreground" />
                        </div>
                        <button className="text-foreground font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                          View Details
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-6 order-2 md:order-1">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-4xl font-bold text-foreground">{service.title}</h3>
                        <p className="text-lg text-foreground/70 leading-relaxed">{service.description}</p>
                        <div className="flex gap-4">
                          <div className="h-1 w-12 bg-foreground" />
                        </div>
                        <button className="text-foreground font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                          View Details
                          <ArrowRight size={20} />
                        </button>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} className="relative h-96 rounded-2xl overflow-hidden order-1 md:order-2">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* International Services Grid */}
      <section className="py-24 bg-foreground/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">International & Specialized</span>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground">
              Global Financial Services
            </h2>
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
            {internationalServices.map((service) => {
              const IconComponent = service.icon
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setSelectedService(service as any)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                  }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative h-72 rounded-2xl overflow-hidden cursor-pointer text-left"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative h-full p-6 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white/70">
                        {service.subServices.length} services
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

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-background border-b border-foreground/10 px-8 py-6 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-foreground">{selectedService.title}</h2>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                {'image' in selectedService && (
                  <div className="relative h-96 rounded-2xl overflow-hidden">
                    <Image
                      src={selectedService.image}
                      alt={selectedService.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Overview</h3>
                  <p className="text-foreground/70 leading-relaxed">{selectedService.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Services Included ({selectedService.subServices.length})</h3>
                  <ul className="space-y-2">
                    {selectedService.subServices.map((subService, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-foreground">
                          {index + 1}
                        </span>
                        <span className="text-foreground/70 pt-0.5">{subService}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-all flex items-center gap-2 group w-full text-center justify-center"
                  >
                    Get This Service
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
