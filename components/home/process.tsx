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
    <section className="py-24 bg-background border-y border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">Our Process</span>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Clear financial processes, steady documentation, and informed reporting
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl font-bold text-foreground/10">{step.number}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                </div>
              </div>
              <p className="text-foreground/70 text-base leading-relaxed flex-1">{step.description}</p>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-12 top-8 z-10">
                  <ChevronRight className="text-foreground/20" size={24} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
