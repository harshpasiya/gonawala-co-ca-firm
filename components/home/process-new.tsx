'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const processSteps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We begin with a detailed discussion about your financial goals, current situation, and specific needs. Our team listens carefully to understand your unique requirements.',
    image: '/images/service-1.png',
  },
  {
    number: '02',
    title: 'Analysis',
    description: 'We conduct a comprehensive analysis of your financial records, identifying opportunities for optimization and areas of concern. Our experts provide detailed insights.',
    image: '/images/service-2.png',
  },
  {
    number: '03',
    title: 'Strategy',
    description: 'Based on our analysis, we develop a customized financial strategy tailored to your specific goals. We present clear recommendations and implementation plans.',
    image: '/images/service-3.png',
  },
  {
    number: '04',
    title: 'Execution',
    description: 'We implement the agreed-upon strategies with precision and attention to detail. Our team ensures smooth execution and continuous monitoring of results.',
    image: '/images/feature-1.png',
  },
]

export function ProcessNewSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end center'],
  })

  return (
    <section ref={containerRef} className="relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">Our Execution Process</span>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground">
              Four Steps to Financial Excellence
            </h2>
          </motion.div>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {processSteps.map((step, index) => {
            // Create staggered scroll offset for each step
            const startOffset = (index / processSteps.length) * 0.6
            const endOffset = ((index + 1) / processSteps.length) * 0.75

            const stepScrollProgress = useTransform(
              scrollYProgress,
              [startOffset, endOffset],
              [0, 1],
              { clamp: true }
            )

            const opacity = useTransform(stepScrollProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
            const scale = useTransform(stepScrollProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95])
            const yPos = useTransform(stepScrollProgress, [0, 0.5, 1], [50, 0, -50])

            return (
              <div key={index} className="relative mb-12">
                <motion.div
                  style={{
                    opacity,
                    scale,
                    y: yPos,
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  {/* Left side - Checkpoint and Text */}
                  <div className="space-y-6">
                    {/* Checkpoint */}
                    <div className="flex items-start gap-6">
                      <div className="relative flex-shrink-0">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-foreground">
                          <span className="text-2xl font-bold text-background">{step.number}</span>
                        </div>
                        {index < processSteps.length - 1 && (
                          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-foreground to-foreground/20" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                          {step.title}
                        </h3>
                        <p className="text-lg text-foreground/70 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative h-96 rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-white text-xl font-bold">{step.title}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
