'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section ref={ref} className="min-h-screen relative overflow-hidden pt-16 flex items-center bg-background">
      {/* Parallax Background Image with Overlay */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <Image
          src="/images/hero-bg.png"
          alt="Professional office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </motion.div>

      {/* Content */}
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
                Professional CA Services
              </span>
              <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight mb-4 text-foreground">
                Clarity in Numbers.
                <br />
                Confidence in Compliance.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-lg text-foreground/70 leading-relaxed max-w-xl"
            >
              Transform your financial management with our expert team. We deliver comprehensive tax planning, auditing, and strategic financial advisory for ambitious businesses.
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
                Explore Services
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 border border-foreground/30 text-foreground rounded-lg font-semibold hover:bg-foreground/5 transition-colors w-full sm:w-auto text-center"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
