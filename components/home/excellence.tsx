'use client'

import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'

export function ExcellenceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Cinematic scale: grows from small → full → shrinks back
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.82, 1, 1, 0.82])
  const borderRadius = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [28, 0, 0, 28])
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const yOffset = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -80])

  // Horizontal line draw
  const lineScale = useTransform(scrollYProgress, [0.2, 0.45], [0, 1])

  // Word-by-word parallax
  const word1Y = useTransform(scrollYProgress, [0.15, 0.45], [40, 0])
  const word2Y = useTransform(scrollYProgress, [0.22, 0.5], [40, 0])
  const word3Y = useTransform(scrollYProgress, [0.29, 0.55], [40, 0])
  const paraY = useTransform(scrollYProgress, [0.35, 0.6], [30, 0])
  const paraOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1])

  return (
    <section ref={containerRef} className="relative h-[280vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* ── SCALED PANEL ── */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          // bg-foreground = always inverted from page bg
          style={{ backgroundColor: 'var(--foreground)', scale, borderRadius, opacity }}
        >
          {/* Dot grid — uses var(--background) so always contrasts */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, var(--background) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
              opacity: 0.07,
            }}
          />

          {/* Diagonal lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute h-px pointer-events-none"
              style={{
                top: `${i * 9}%`, left: '-10%', right: '-10%',
                backgroundColor: 'var(--background)',
                opacity: 0.05,
                transform: 'rotate(-5deg)',
                transformOrigin: 'left center',
              }} />
          ))}

          {/* Radial vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, color-mix(in srgb, var(--foreground) 80%, transparent) 100%)',
            }} />

          {/* Large watermark */}
          <div className="absolute right-[-2%] bottom-[5%] pointer-events-none select-none"
            style={{
              fontSize: 'clamp(120px, 22vw, 300px)',
              fontFamily: 'Poppins, sans-serif', fontWeight: 900,
              color: 'var(--background)', opacity: 0.04,
              lineHeight: 0.85, letterSpacing: '-0.06em',
            }}>
            EX
          </div>
        </motion.div>

        {/* ── TEXT CONTENT (on top of the scaled panel) ── */}
        <motion.div
          style={{ y: yOffset, opacity }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
          {/* Eyebrow */}
          <motion.div
            style={{ opacity: paraOpacity }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <motion.div
              
              className="h-px w-16"
              style={{ backgroundColor: 'var(--background)', opacity: 0.4, scaleX: lineScale, transformOrigin: 'right' }}
            />
            <span className="text-xs uppercase tracking-[0.28em] font-semibold"
              style={{ color: 'var(--background)', opacity: 0.5 }}>
              Our Standard
            </span>
            <motion.div
             
              className="h-px w-16"
              style={{ backgroundColor: 'var(--background)', opacity: 0.4 , scaleX: lineScale, transformOrigin: 'left'}}
            />
          </motion.div>

          {/* Heading — three words with staggered parallax */}
          <div className="overflow-visible flex flex-col items-center">
            <div className="overflow-hidden">
              <motion.h2
                
                className="font-black leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(52px, 9vw, 118px)', fontFamily: 'Poppins, sans-serif', color: 'var(--background)', y: word1Y }}
              >
                Excellence
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                
                className="font-black leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(52px, 9vw, 118px)', fontFamily: 'Poppins, sans-serif', color: 'var(--background)', opacity: 0.7, y: word2Y }}
              >
                in Every
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                
                className="font-black leading-[0.88] tracking-tight"
                style={{ fontSize: 'clamp(52px, 9vw, 118px)', fontFamily: 'Poppins, sans-serif', color: 'var(--background)', opacity: 0.4, y: word3Y }}
              >
                Detail.
              </motion.h2>
            </div>
          </div>

          {/* Paragraph */}
          <motion.p
            
            className="mt-8 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--background)', opacity: paraOpacity, y: paraY, maxWidth: '520px', margin: '2rem auto 0' }}
          >
            Precision in financial management isn't just about numbers — it's about building
            trust through meticulous attention to detail, delivered consistently across every
            engagement we take on.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            style={{ opacity: paraOpacity }}
            className="flex flex-wrap items-center justify-center gap-3 mt-10"
          >
            {[
              { value: '15+', label: 'Years' },
              { value: '600+', label: 'Clients' },
              { value: '100%', label: 'On-Time' },
            ].map((s, i) => (
              <div key={s.label}
                className="px-5 py-2.5 rounded-full flex items-center gap-2"
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--background) 10%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--background) 20%, transparent)',
                }}>
                <span className="font-bold text-sm" style={{ color: 'var(--background)', fontFamily: 'Poppins, sans-serif' }}>
                  {s.value}
                </span>
                <span className="text-xs" style={{ color: 'var(--background)', opacity: 0.55 }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}