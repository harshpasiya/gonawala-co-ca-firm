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
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Client Testimonials</h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveIndex(index)}
              className={`p-8 rounded-xl border-2 transition-all cursor-pointer ${
                activeIndex === index
                  ? 'border-primary bg-background'
                  : 'border-border bg-background/50'
              }`}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed italic">
                {`"${testimonial.content}"`}
              </p>
              <div>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-foreground/70 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
