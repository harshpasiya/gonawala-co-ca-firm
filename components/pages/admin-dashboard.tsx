'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Mail, Phone, Eye, Trash2, BarChart3, MessageSquare } from 'lucide-react'

interface ContactSubmission {
  name: string
  email: string
  phone: string
  service: string
  message: string
  timestamp: string
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    totalSessions: 0,
    avgViewTime: 0,
  })

  useEffect(() => {
    // Load submissions from localStorage
    const savedSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
    setSubmissions(savedSubmissions)

    // Calculate stats
    setStats({
      totalSubmissions: savedSubmissions.length,
      totalSessions: Math.floor(Math.random() * 500) + 100,
      avgViewTime: Math.floor(Math.random() * 3) + 2,
    })
  }, [])

  const handleDelete = (index: number) => {
    const updated = submissions.filter((_, i) => i !== index)
    setSubmissions(updated)
    localStorage.setItem('contactSubmissions', JSON.stringify(updated))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  return (
    <div className="bg-background min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-foreground/70">Track submissions and analytics</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: MessageSquare,
              label: 'Total Inquiries',
              value: stats.totalSubmissions,
            },
            {
              icon: Eye,
              label: 'Total Visits',
              value: stats.totalSessions,
            },
            {
              icon: BarChart3,
              label: 'Avg. Session Time',
              value: `${stats.avgViewTime}m`,
            },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 border border-border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-foreground/70 text-sm font-medium mb-2">{stat.label}</p>
                    <p className="text-4xl font-bold text-primary">{stat.value}</p>
                  </div>
                  <Icon className="text-primary/30" size={28} />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">Recent Inquiries</h2>
          </div>

          {submissions.length === 0 ? (
            <div className="p-6 text-center text-foreground/70">
              <p>No inquiries yet. Check back soon!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Name</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Email</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Service</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Date</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Message</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-background/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-foreground font-medium">
                        {submission.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/70 flex items-center gap-2">
                        <Mail size={16} />
                        {submission.email}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                          {submission.service || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/70">
                        {formatDate(submission.timestamp)}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground/70 max-w-xs truncate">
                        {submission.message}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="text-destructive" size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Info Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 bg-primary/10 border border-primary/30 rounded-lg text-primary"
        >
          <p className="text-sm">
            <strong>Note:</strong> This is a demo admin dashboard. Submissions are stored locally in your browser. In a production environment, this data would be stored securely on a server database.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
