'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consentGiven = localStorage.getItem('cookieConsent')
    if (!consentGiven) {
      setShowConsent(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true')
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-foreground">
          We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => setShowConsent(false)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
