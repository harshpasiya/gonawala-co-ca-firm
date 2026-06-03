'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Ready to elevate your financial strategy?
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
            Schedule a consultation with our expert team and discover how we can transform your financial management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/contact"
              className="px-8 py-4 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-all inline-flex items-center justify-center gap-2 group"
            >
              Get In Touch
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-foreground/30 text-foreground rounded-lg font-semibold hover:bg-foreground/5 transition-colors"
            >
              Learn Our Story
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
