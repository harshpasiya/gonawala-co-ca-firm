'use client'

import { MessageCircle, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export function FloatingButtons() {
  return (
    <>
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/15551234567"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      >
        <MessageCircle size={24} />
      </motion.a>

      {/* Mobile Call Bar */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 md:hidden bg-primary text-primary-foreground p-4 z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
      >
        <a
          href="tel:+15551234567"
          className="flex items-center justify-center space-x-2 font-semibold"
        >
          <Phone size={20} />
          <span>Call Us Now</span>
        </a>
      </motion.div>
    </>
  )
}
