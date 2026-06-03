'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We understand your business needs and financial goals through detailed consultation.',
  },
  {
    number: '02',
    title: 'Analysis',
    description: 'Our experts analyze your current financial situation and identify improvement areas.',
  },
  {
    number: '03',
    title: 'Implementation',
    description: 'We develop and implement customized solutions tailored to your requirements.',
  },
  {
    number: '04',
    title: 'Review',
    description: 'Regular monitoring and review to ensure optimal results and continuous improvement.',
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Process</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            A systematic approach to deliver exceptional results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-xl p-6 border border-border h-full">
                <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight className="text-primary" size={24} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
