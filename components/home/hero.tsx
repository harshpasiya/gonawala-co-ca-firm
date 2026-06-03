'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-card flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                Professional Expertise Since 2010
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight mb-6 text-foreground">
              Elite Chartered Accountant Services
            </h1>

            <p className="text-xl text-foreground/70 mb-8 leading-relaxed">
              Transform your financial management with our expert team of chartered accountants. We provide comprehensive tax planning, auditing, and financial advisory services for businesses and individuals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                View Services
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Parallax Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-96 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 left-0 w-64 h-40 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 shadow-lg"
            >
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-foreground/70">Happy Clients</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute top-32 right-0 w-64 h-40 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl p-6 shadow-lg"
            >
              <div className="text-4xl font-bold text-secondary mb-2">15+</div>
              <p className="text-foreground/70">Years Experience</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
