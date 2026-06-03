'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Elite CA Services</h3>
            <p className="text-sm opacity-90">
              Expert chartered accountant services providing tax, audit, and financial advisory solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-primary transition-colors">Tax Planning</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Auditing</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Payroll</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">GST Compliance</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={16} className="mt-1 flex-shrink-0" />
                <span>info@eliteca.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Business Ave, Suite 100, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-foreground/20 pt-8 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-75">
            © 2024 Elite CA Services. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
