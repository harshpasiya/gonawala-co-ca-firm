'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const stats = [
  { value: 500, label: 'Happy Clients', suffix: '+' },
  { value: 15, label: 'Years Experience', suffix: '+' },
  { value: 1000, label: 'Projects Completed', suffix: '+' },
  { value: 99, label: 'Client Satisfaction', suffix: '%' },
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
    <section className="py-24 bg-background border-y border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-start"
            >
              <div className="text-5xl md:text-6xl font-bold text-foreground mb-3">
                <CountUpNumber value={stat.value} />
                <span className="text-foreground/60 ml-1">{stat.suffix}</span>
              </div>
              <p className="text-foreground/70 text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
