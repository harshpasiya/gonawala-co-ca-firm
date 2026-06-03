'use client'

import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  {
    value: '500',
    suffix: '+',
    label: 'Happy Clients Worldwide',
  },
  {
    value: '15',
    suffix: '+',
    label: 'Years of Experience',
  },
  {
    value: '1000',
    suffix: '+',
    label: 'Financial Portfolios Managed',
  },
  {
    value: '98',
    suffix: '%',
    label: 'Client Satisfaction Rate',
  },
]

function CountUpNumber({ value }: { value: number | string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'start 20%'],
  })
  const count = useTransform(scrollYProgress, [0, 1], [0, Number(value)])

  return (
    <motion.span ref={ref}>
      <motion.span suppressHydrationWarning>
        {count}
      </motion.span>
    </motion.span>
  )
}

export function StatsEnhancedSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={containerRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background animation elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl opacity-0 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-foreground/5 rounded-full blur-3xl opacity-0 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">By The Numbers</span>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Proven Results & Trust
          </h2>
        </motion.div>

        {/* Animated progress bar */}
        <motion.div
          style={{ scaleX }}
          className="h-1 bg-foreground mb-16 origin-left"
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-3 text-center md:text-left"
            >
              <div className="text-5xl md:text-6xl font-bold text-foreground flex items-baseline justify-center md:justify-start gap-1">
                <CountUpNumber value={stat.value} />
                <span className="text-foreground/60">{stat.suffix}</span>
              </div>
              <p className="text-foreground/70 text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
