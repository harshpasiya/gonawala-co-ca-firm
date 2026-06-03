'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    title: 'Real-Time Analytics',
    description: 'Monitor your financial health with live dashboards and comprehensive reporting tools.',
    image: '/images/feature-1.png',
    position: 'left',
  },
  {
    title: 'Expert Consultation',
    description: 'Work with experienced chartered accountants who understand your business goals.',
    image: '/images/feature-2.png',
    position: 'right',
  },
  {
    title: 'Compliance Mastery',
    description: 'Stay ahead of regulatory changes with our proactive compliance management.',
    image: '/images/feature-3.png',
    position: 'left',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">Key Features</span>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Built for modern accounting
          </h2>
        </motion.div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const isLeft = feature.position === 'left'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      {isLeft ? (
        <>
          <motion.div style={{ y }} className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
          <div className="space-y-6">
            <h3 className="text-4xl font-bold text-foreground">{feature.title}</h3>
            <p className="text-lg text-foreground/70 leading-relaxed">{feature.description}</p>
            <div className="flex gap-4">
              <div className="h-1 w-12 bg-foreground" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-6 order-2 md:order-1">
            <h3 className="text-4xl font-bold text-foreground">{feature.title}</h3>
            <p className="text-lg text-foreground/70 leading-relaxed">{feature.description}</p>
            <div className="flex gap-4">
              <div className="h-1 w-12 bg-foreground" />
            </div>
          </div>
          <motion.div style={{ y }} className="relative h-96 rounded-lg overflow-hidden order-1 md:order-2">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
