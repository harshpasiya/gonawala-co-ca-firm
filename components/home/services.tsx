'use client'

import { motion } from 'framer-motion'
import { FileText, Calculator, Users, TrendingUp, BarChart3, PieChart, DollarSign, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: FileText,
    title: 'Tax Planning',
    description: 'Strategic tax planning to minimize liabilities and maximize returns.',
  },
  {
    icon: Calculator,
    title: 'GST Compliance',
    description: 'Complete GST filing and compliance management services.',
  },
  {
    icon: BarChart3,
    title: 'Financial Auditing',
    description: 'Comprehensive audit services for accurate financial reporting.',
  },
  {
    icon: Users,
    title: 'Payroll Management',
    description: 'Complete payroll processing and statutory compliance.',
  },
  {
    icon: TrendingUp,
    title: 'Business Advisory',
    description: 'Expert guidance for business growth and expansion.',
  },
  {
    icon: PieChart,
    title: 'Financial Planning',
    description: 'Personalized financial strategies for wealth creation.',
  },
  {
    icon: DollarSign,
    title: 'Investment Advisory',
    description: 'Expert investment recommendations for optimal returns.',
  },
  {
    icon: ShieldCheck,
    title: 'Legal Compliance',
    description: 'Ensure your business stays compliant with all regulations.',
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Services</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Comprehensive solutions for all your accounting and financial needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{service.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
