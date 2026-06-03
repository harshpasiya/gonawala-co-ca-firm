'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function ExcellenceSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  // Scale effect - expands to full screen then collapses
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1.2, 1.2, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const yOffset = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100])

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background Video with Parallax */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/expert.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <motion.div
          style={{ scale, opacity, y: yOffset }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold text-white leading-tight"
          >
            Excellence in
            <br />
            Every Detail
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-xl text-white/80 max-w-2xl mx-auto"
          >
            We believe that precision in financial management isn&apos;t just about numbers—it&apos;s about building trust through meticulous attention to detail.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
