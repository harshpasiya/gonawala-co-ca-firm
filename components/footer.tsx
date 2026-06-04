'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4 text-foreground">Gonawala & Co.</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Expert chartered accountant services delivering financial excellence through tax planning, auditing, and strategic advisory.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground text-sm uppercase tracking-widest">Navigate</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/services" className="text-foreground/70 hover:text-foreground transition-colors">Services</Link></li>
              <li><Link href="/blog" className="text-foreground/70 hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground text-sm uppercase tracking-widest">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="text-foreground/70 hover:text-foreground transition-colors">Tax Planning</Link></li>
              <li><Link href="/services" className="text-foreground/70 hover:text-foreground transition-colors">Auditing</Link></li>
              <li><Link href="/services" className="text-foreground/70 hover:text-foreground transition-colors">Payroll</Link></li>
              <li><Link href="/services" className="text-foreground/70 hover:text-foreground transition-colors">GST Compliance</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground text-sm uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <Phone size={16} className="mt-1 flex-shrink-0 text-foreground/60" />
                <span className="text-foreground/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={16} className="mt-1 flex-shrink-0 text-foreground/60" />
                <span className="text-foreground/70">info@eliteca.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-foreground/60" />
                <span className="text-foreground/70">123 Business Ave, Suite 100, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-foreground/10 pt-8 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-foreground/60">
            © 2024 Gonawala & Co. CA Services. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
