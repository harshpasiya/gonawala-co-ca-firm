'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    title: 'Bookkeeping',
    description: 'Maintenance of financial records with organized, accurate, and timely data.',
    image: '/images/service-1.png',
  },
  {
    title: 'Tax Advisory',
    description: 'Expert guidance for strategic tax planning and compliance management across all regulations.',
    image: '/images/service-2.png',
  },
  {
    title: 'Audit & Assurance',
    description: 'Comprehensive audits to ensure financial integrity, accuracy, and regulatory compliance.',
    image: '/images/service-3.png',
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <motion.div style={{ y }} className="relative h-72 mb-6 overflow-hidden rounded-lg">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-end p-6">
          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
        </div>
      </motion.div>
      <div className="space-y-3">
        <p className="text-foreground/70 leading-relaxed text-lg">{service.description}</p>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">Services Overview</span>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Structured support across accounting, tax, and reporting
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl">
            From foundational bookkeeping to strategic tax planning and comprehensive audit services, we deliver financial excellence at every level.
          </p>
        </motion.div>

        {/* Featured Services Grid with Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center pt-8 border-t border-foreground/10"
        >
          <Link
            href="/services"
            className="inline-block px-8 py-4 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors"
          >
            Explore All Services
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
