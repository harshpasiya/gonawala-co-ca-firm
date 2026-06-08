'use client'

import { motion, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const stats = [
  { value: 500, label: 'Happy Clients', suffix: '+' },
  { value: 15, label: 'Years Experience', suffix: '+' },
  { value: 1000, label: 'Projects Completed', suffix: '+' },
  { value: 99, label: 'Client Satisfaction', suffix: '%' },
]

// ── Count-up: starts only when section enters viewport ──
function CountUpNumber({ value, duration = 2, active }: { value: number; duration?: number; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const increment = value / (duration * 60)
    const interval = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(interval)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(interval)
  }, [value, duration, active])

  return <>{count}</>
}

export function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="py-20 md:py-24 bg-card border-y border-border relative overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.35,
        }}
      />
      {/* Vignette so edges fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, var(--card) 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-start gap-2"
            >
              {/* Number */}
              <div
                className="font-black text-foreground tabular-nums leading-none"
                style={{ fontSize: 'clamp(42px, 6vw, 72px)', fontFamily: 'Poppins, sans-serif' }}
              >
                <CountUpNumber value={stat.value} active={inView} />
                <span style={{ color: 'var(--muted-foreground)' }}>{stat.suffix}</span>
              </div>

              {/* Thin animated underline */}
              <motion.div
                className="h-px bg-foreground"
                initial={{ width: 0 }}
                animate={inView ? { width: '40px' } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              />

              {/* Label */}
              <p
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold"
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}