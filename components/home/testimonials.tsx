'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useState } from 'react'

const testimonials = [
  {
    name: 'John Smith',
    role: 'CEO, Tech Startup',
    content: 'Elite CA transformed our tax strategy. We saved significantly on taxes while maintaining full compliance.',
    rating: 5,
  },
  {
    name: 'Sarah Johnson',
    role: 'Business Owner',
    content: 'Exceptional service! Their team is knowledgeable, responsive, and truly cares about client success.',
    rating: 5,
  },
  {
    name: 'Michael Brown',
    role: 'Managing Director',
    content: 'Professional, reliable, and always available when we need them. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Entrepreneur',
    content: 'The best financial advisory service I have worked with. Their expertise is unmatched.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">Client Testimonials</span>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Trusted by ambitious businesses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveIndex(index)}
              className={`p-8 rounded-lg border transition-all cursor-pointer ${
                activeIndex === index
                  ? 'border-foreground/30 bg-foreground/5'
                  : 'border-foreground/10 bg-transparent hover:border-foreground/20'
              }`}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-foreground text-foreground"
                  />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed text-lg">
                {`"${testimonial.content}"`}
              </p>
              <div className="pt-4 border-t border-foreground/10">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-foreground/60 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
