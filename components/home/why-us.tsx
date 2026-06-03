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
    <section className="py-20 bg-gradient-to-b from-card to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Why Choose Us</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            We stand out with our commitment to excellence and client satisfaction
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="text-primary" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
