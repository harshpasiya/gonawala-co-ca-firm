'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

// ─────────────────────────────────────────────
// THEME TOGGLE ICON — smooth Sun ↔ Moon morph
// ─────────────────────────────────────────────
function ThemeIcon({ isDark }: { isDark: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg">
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.g key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.3 }}>
            <circle cx="12" cy="12" r="4" stroke="var(--foreground)" strokeWidth="1.5" />
            <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
              stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>
        ) : (
          <motion.g key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.3 }}>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  )
}

// ─────────────────────────────────────────────
// MAIN NAVIGATION
// ─────────────────────────────────────────────
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  // Track scroll
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isDark = mounted && theme === 'dark'

  return (
    <>
      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled
            ? 'color-mix(in srgb, var(--background) 88%, transparent)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid color-mix(in srgb, var(--border) 80%, transparent)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 md:h-20" style={{ height: '72px' }}>

            {/* ── LOGO ── */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              {/* Monogram mark */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                style={{ backgroundColor: 'var(--foreground)' }}
              >
                <span
                  className="font-black text-sm leading-none"
                  style={{ color: 'var(--background)', fontFamily: 'Poppins, sans-serif' }}
                >
                  G
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-bold text-foreground tracking-tight leading-tight text-base"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Gonawala & Co.
                </span>
                <span className="text-muted-foreground text-xs tracking-widest uppercase" style={{ fontSize: '9px' }}>
                  Chartered Accountants
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 group"
                    style={{
                      color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--foreground)'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--muted-foreground)'
                    }}
                  >
                    {item.label}
                    {/* Active underline dot */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-dot"
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ backgroundColor: 'var(--foreground)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* ── ACTIONS ── */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                  style={{ border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
                  aria-label="Toggle theme"
                >
                  <ThemeIcon isDark={isDark} />
                </button>
              )}

              {/* CTA button */}
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--foreground)',
                  color: 'var(--background)',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.opacity = '0.88'
                  el.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.opacity = '1'
                  el.style.transform = 'scale(1)'
                }}
              >
                Get Started
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-xs"
                >
                  →
                </motion.span>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setIsOpen(v => !v)}
                className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200"
                style={{ border: '1px solid var(--border)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--muted)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <div className="w-4 flex flex-col gap-[4px] items-end">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 6, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
                    transition={{ duration: 0.25 }}
                    className="block h-[1.5px] rounded-full"
                    style={{ backgroundColor: 'var(--foreground)' }}
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0, width: '75%' }}
                    transition={{ duration: 0.2 }}
                    className="block h-[1.5px] rounded-full"
                    style={{ backgroundColor: 'var(--foreground)' }}
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -6, width: '100%' } : { rotate: 0, y: 0, width: '55%' }}
                    transition={{ duration: 0.25 }}
                    className="block h-[1.5px] rounded-full"
                    style={{ backgroundColor: 'var(--foreground)' }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── SCROLL PROGRESS LINE ── */}
        <ScrollProgressBar />
      </motion.nav>

      {/* ── MOBILE MENU OVERLAY ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: 'color-mix(in srgb, var(--background) 60%, transparent)', backdropFilter: 'blur(4px)' }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)] flex flex-col"
              style={{
                backgroundColor: 'var(--background)',
                borderLeft: '1px solid var(--border)',
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border">
                <div className="flex flex-col">
                  <span className="font-bold text-foreground text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Gonawala & Co.
                  </span>
                  <span className="text-muted-foreground text-xs tracking-widest uppercase" style={{ fontSize: '9px' }}>
                    Chartered Accountants
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:bg-muted transition-colors"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
                    <path d="M3 3l10 10M13 3L3 13" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-1 px-4 py-6 flex-1">
                {navItems.map((item, i) => {
                  const isActive = pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors"
                        style={{
                          backgroundColor: isActive ? 'var(--muted)' : 'transparent',
                          color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '15px',
                          fontWeight: isActive ? 600 : 500,
                        }}
                      >
                        {item.label}
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--foreground)' }} />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Drawer footer */}
              <div className="px-4 pb-6 flex flex-col gap-3 border-t border-border pt-5">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-center transition-all"
                  style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)', fontFamily: 'Poppins, sans-serif' }}
                >
                  Get Started →
                </Link>
                {mounted && (
                  <button
                    onClick={() => setTheme(isDark ? 'light' : 'dark')}
                    className="w-full py-3 rounded-xl text-sm font-medium border border-border flex items-center justify-center gap-2 transition-colors hover:bg-muted"
                    style={{ color: 'var(--foreground)', fontFamily: 'Poppins, sans-serif' }}
                  >
                    <ThemeIcon isDark={isDark} />
                    {isDark ? 'Switch to Light' : 'Switch to Dark'}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ─────────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[1.5px] origin-left"
      style={{ scaleX, backgroundColor: 'var(--foreground)', opacity: 0.35 }}
    />
  )
}