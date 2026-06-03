'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const stats = [
  { value: 500, label: 'Happy Clients', suffix: '+' },
  { value: 15, label: 'Years Experience', suffix: '+' },
  { value: 1000, label: 'Projects Completed', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
]

function CountUpNumber({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = value / (duration * 60)

    const interval = setInterval(() => {
      start += increment
      if (start > value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(interval)
  }, [value, duration])

  return <>{count}</>
}

export function SocialProofSection() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <CountUpNumber value={stat.value} />
                {stat.suffix}
              </div>
              <p className="text-foreground/70 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
