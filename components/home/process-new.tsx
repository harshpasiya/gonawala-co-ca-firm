'use client'

import { motion } from 'framer-motion'
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
  return (
    <section className="relative bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">Our Execution Process</span>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Four Steps to Financial Excellence
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-24">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: false, margin: '-100px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              {/* Left side - Checkpoint and Text */}
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="relative flex-shrink-0">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-foreground">
                      <span className="text-2xl font-bold text-background">{step.number}</span>
                    </div>
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
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false, margin: '-100px' }}
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
          ))}
        </div>
      </div>
    </section>
  )
}
