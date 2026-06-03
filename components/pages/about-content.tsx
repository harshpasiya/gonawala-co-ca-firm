'use client'

import { motion } from 'framer-motion'
import { Award, Users, Briefcase, Target } from 'lucide-react'

const team = [
  {
    name: 'Raj Sharma',
    role: 'Founder & Lead CA',
    expertise: 'Tax Planning & Audit',
  },
  {
    name: 'Priya Patel',
    role: 'Senior CA',
    expertise: 'Financial Advisory',
  },
  {
    name: 'Amit Kumar',
    role: 'CA',
    expertise: 'GST & Compliance',
  },
  {
    name: 'Lisa Wong',
    role: 'CA',
    expertise: 'Payroll Management',
  },
]

const milestones = [
  { year: '2010', event: 'Company Founded' },
  { year: '2012', event: '100 Clients Milestone' },
  { year: '2015', event: 'Expanded to 3 Cities' },
  { year: '2020', event: '500 Clients Reached' },
]

export default function AboutContent() {
  return (
    <div className="bg-background">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">About Elite CA Services</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Founded in 2010, we have been serving businesses and individuals with excellence in chartered accountancy for over a decade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex gap-4 mb-4">
                <Target className="text-primary flex-shrink-0" size={28} />
                <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-foreground/70 leading-relaxed text-lg">
                To provide comprehensive, ethical, and expert financial solutions that empower our clients to achieve their business goals and financial aspirations. We believe in building long-term partnerships based on trust and results.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex gap-4 mb-4">
                <Award className="text-primary flex-shrink-0" size={28} />
                <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-foreground/70 leading-relaxed text-lg">
                To be the most trusted and innovative chartered accountancy firm, recognized for delivering exceptional value and transforming financial management for businesses of all sizes across industries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Expert Team</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Meet the certified professionals dedicated to your financial success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 text-center border border-border"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                  <Users className="text-primary" size={28} />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-semibold text-sm mb-2">{member.role}</p>
                <p className="text-foreground/70 text-sm">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Journey</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Milestones that mark our growth and success
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-8"
              >
                <div className="flex-shrink-0 w-24 h-24 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                </div>
                <div className="flex-grow p-6 bg-card rounded-lg border border-border">
                  <p className="text-lg font-semibold text-foreground">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Values</h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Core principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Integrity', desc: 'Honest, ethical, and transparent in all dealings' },
              { title: 'Excellence', desc: 'Commitment to highest quality standards' },
              { title: 'Innovation', desc: 'Embracing modern solutions and technology' },
              { title: 'Client-Focused', desc: 'Your success is our ultimate goal' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-background rounded-xl border border-border text-center"
              >
                <h3 className="text-xl font-bold text-primary mb-2">{value.title}</h3>
                <p className="text-foreground/70 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
