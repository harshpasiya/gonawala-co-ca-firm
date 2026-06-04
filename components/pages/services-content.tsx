'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FileText, Calculator, Users, TrendingUp, BarChart3, PieChart, DollarSign, ShieldCheck, Zap, Shield, Eye, Lightbulb, Globe, Briefcase, ListCheck, Laptop } from 'lucide-react'

const allServices = [
  {
    category: 'Accounting & Bookkeeping',
    icon: Calculator,
    services: [
      'Maintaining books of accounts',
      'Preparation of financial statements (Balance Sheet, P&L, Cash Flow)',
      'Management accounting and MIS reports',
    ],
  },
  {
    category: 'Auditing & Assurance',
    icon: BarChart3,
    services: [
      'Statutory Audit – mandatory audit under Companies Act',
      'Tax Audit – u/s 44AB of Income Tax Act',
      'Internal Audit, Bank Audit, Forensic Audit, Cost Audit',
      'Stock Audit – physical verification of inventory',
    ],
  },
  {
    category: 'Taxation Services',
    icon: FileText,
    services: [
      'Income Tax return filing (individuals, firms, companies)',
      'Tax planning and advisory',
      'TDS/TCS compliance and return filing',
      'Advance tax computation and appeal filing',
    ],
  },
  {
    category: 'GST (Goods & Services Tax)',
    icon: ShieldCheck,
    services: [
      'GST registration',
      'Monthly/quarterly GST return filing (GSTR-1, GSTR-3B)',
      'GST audit and reconciliation',
      'GST refund claims and advisory',
    ],
  },
  {
    category: 'Corporate & Company Law Services',
    icon: Briefcase,
    services: [
      'Company incorporation (Pvt Ltd, LLP, OPC)',
      'ROC (Registrar of Companies) compliances',
      'Filing of annual returns and forms with MCA',
      'Drafting of MOA, AOA, board resolutions',
    ],
  },
  {
    category: 'Financial Advisory & Planning',
    icon: TrendingUp,
    services: [
      'Personal financial planning',
      'Investment advisory',
      'Business valuation',
      'Project finance and feasibility reports',
    ],
  },
  {
    category: 'Loan & Fund Raising',
    icon: DollarSign,
    services: [
      'Preparation of CMA (Credit Monitoring Arrangement) data',
      'Project reports for bank loans',
      'Working capital finance assistance',
      'Liaison with banks and financial institutions',
    ],
  },
  {
    category: 'FEMA & International Taxation',
    icon: Globe,
    services: [
      'Foreign Exchange Management Act (FEMA) compliance',
      'Advising on NRI taxation',
      'Transfer pricing documentation and compliance',
      'Double Taxation Avoidance Agreement (DTAA) advisory',
    ],
  },
  {
    category: 'Insolvency & Bankruptcy (IBC)',
    icon: Shield,
    services: [
      'Acting as Insolvency Professional (IP)',
      'Advisory under IBC 2016',
      'Resolution and liquidation proceedings',
      'Financial restructuring and recovery',
    ],
  },
  {
    category: 'Startup & Business Advisory',
    icon: Lightbulb,
    services: [
      'Business registration and structure advisory',
      'Startup India registration',
      'MSME registration',
      'Drafting of partnership deeds and shareholder agreements',
    ],
  },
  {
    category: 'Payroll & Labour Law Compliance',
    icon: Users,
    services: [
      'Salary structuring and payroll processing',
      'PF, ESIC, and Professional Tax compliance',
      'Labour law advisory',
      'Statutory reporting and filings',
    ],
  },
  {
    category: 'Certification Services',
    icon: ListCheck,
    services: [
      'Net worth certificates',
      'Income certificates for visa and loan purposes',
      'Turnover certificates',
      'Form 15CB (remittance certification)',
    ],
  },
]

export default function ServicesContent() {
  const [selectedCategory, setSelectedCategory] = useState(0)

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Our Services</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Comprehensive chartered accountancy solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {allServices.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategory(index)}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedCategory === index
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{service.category}</h3>
                </motion.div>
              )
            })}
          </div>

          {/* Selected Service Details */}
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {allServices[selectedCategory].category}
                </h2>
                <p className="text-foreground/70 mb-8 leading-relaxed">
                  Our expert team provides comprehensive {allServices[selectedCategory].category.toLowerCase()} solutions tailored to your specific business needs and requirements.
                </p>
                <div className="space-y-4 mb-8">
                  {allServices[selectedCategory].services.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Zap className="text-primary flex-shrink-0 mt-1" size={20} />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Get More Info
                </Link>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Key Benefits</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Eye className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground">Expert Guidance & Strategic Advice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground">Complete Compliance & Risk Management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground">Efficient & Timely Solutions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Lightbulb className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground">Customized Strategies for Growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Our Services Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose Our Services?</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              We deliver exceptional value through expertise, innovation, and client-centric approach
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Expert Team',
                description: 'Certified professionals with extensive industry experience and expertise.',
              },
              {
                title: 'Technology Driven',
                description: 'Using latest tools and systems for efficient and accurate service delivery.',
              },
              {
                title: 'Client Support',
                description: '24/7 support and regular updates to keep you informed and confident.',
              },
              {
                title: 'Cost Effective',
                description: 'Competitive pricing without compromising on quality and service.',
              },
              {
                title: 'Customized Solutions',
                description: 'Tailored services designed specifically for your unique business needs.',
              },
              {
                title: 'Proven Track Record',
                description: 'Trusted by 500+ clients with consistent excellence and satisfaction.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-background rounded-xl border border-border text-center"
              >
                <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
