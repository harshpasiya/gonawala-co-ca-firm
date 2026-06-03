'use client'

import { motion } from 'framer-motion'
import { Award, Zap, Lock, Users } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Certified Professionals',
    description: 'Our team consists of certified CAs with extensive industry experience and expertise.',
  },
  {
    icon: Zap,
    title: 'Fast & Efficient',
    description: 'Quick turnaround times without compromising on quality and accuracy.',
  },
  {
    icon: Lock,
    title: 'Complete Confidentiality',
    description: 'Your financial information is handled with utmost confidentiality and security.',
  },
  {
    icon: Users,
    title: 'Personalized Service',
    description: 'Tailored solutions designed specifically for your business needs.',
  },
]

export function WhyUsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">Why Trust Us</span>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Your financial success is our priority
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-l border-foreground/20 pl-6"
              >
                <div className="mb-4">
                  <Icon className="text-foreground" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70 text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
