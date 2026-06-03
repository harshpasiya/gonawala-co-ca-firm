'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const galleryImages = [
  {
    src: '/images/gallery-1.png',
    alt: 'Accounting workspace',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/images/gallery-2.png',
    alt: 'Financial documents',
    span: 'col-span-1',
  },
  {
    src: '/images/gallery-3.png',
    alt: 'Analytics dashboard',
    span: 'col-span-1',
  },
  {
    src: '/images/gallery-4.png',
    alt: 'Team collaboration',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/images/gallery-5.png',
    alt: 'Executive office',
    span: 'col-span-1',
  },
  {
    src: '/images/gallery-6.png',
    alt: 'Business metrics',
    span: 'col-span-1',
  },
]

function GalleryItem({ image, index }: { image: typeof galleryImages[0]; index: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`${image.span} relative overflow-hidden rounded-lg group cursor-pointer`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </motion.div>
  )
}

export function GallerySection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])

  return (
    <section ref={containerRef} className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-foreground/60 block mb-4">Our Work</span>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Excellence in every detail
          </h2>
        </motion.div>

        <motion.div style={{ opacity }} className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-64">
          {galleryImages.map((image, index) => (
            <GalleryItem key={index} image={image} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
