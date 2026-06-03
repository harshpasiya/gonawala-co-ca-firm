'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'John Smith',
    role: 'CEO, Tech Startup',
    content: 'Elite CA transformed our tax strategy. We saved significantly on taxes while maintaining full compliance.',
    rating: 5,
    image: '/images/testimonial-1.png',
  },
  {
    name: 'Sarah Johnson',
    role: 'Business Owner',
    content: 'Exceptional service! Their team is knowledgeable, responsive, and truly cares about client success.',
    rating: 5,
    image: '/images/testimonial-2.png',
  },
  {
    name: 'Michael Brown',
    role: 'Managing Director',
    content: 'Professional, reliable, and always available when we need them. Highly recommended!',
    rating: 5,
    image: '/images/testimonial-1.png',
  },
  {
    name: 'Emily Davis',
    role: 'Entrepreneur',
    content: 'The best financial advisory service I have worked with. Their expertise is unmatched.',
    rating: 5,
    image: '/images/testimonial-3.png',
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
              className={`rounded-lg border overflow-hidden transition-all cursor-pointer ${
                activeIndex === index
                  ? 'border-foreground/30 bg-foreground/5'
                  : 'border-foreground/10 bg-transparent hover:border-foreground/20'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
              </div>
              <div className="p-8 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-foreground text-foreground"
                    />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed">
                  {`"${testimonial.content}"`}
                </p>
                <div className="pt-4 border-t border-foreground/10 space-y-1">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-foreground/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
