'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top Tax Strategies to Maximize Your Business Deductions',
    excerpt: 'Learn expert strategies to legally reduce your tax burden and maximize deductions for your business.',
    category: 'Tax Planning',
    author: 'Raj Sharma',
    date: 'Mar 15, 2024',
    readTime: '8 min read',
    image: 'gradient-to-br from-primary/20 to-primary/5',
  },
  {
    id: '2',
    title: 'GST Compliance: Everything You Need to Know',
    excerpt: 'Complete guide to GST compliance, filing procedures, and common mistakes to avoid.',
    category: 'Compliance',
    author: 'Amit Kumar',
    date: 'Mar 12, 2024',
    readTime: '10 min read',
    image: 'gradient-to-br from-secondary/20 to-secondary/5',
  },
  {
    id: '3',
    title: 'Financial Planning for Small Business Growth',
    excerpt: 'Strategic financial planning tips to help your small business scale and grow successfully.',
    category: 'Advisory',
    author: 'Priya Patel',
    date: 'Mar 10, 2024',
    readTime: '6 min read',
    image: 'gradient-to-br from-accent/20 to-accent/5',
  },
  {
    id: '4',
    title: 'Year-End Tax Planning Checklist',
    excerpt: 'Essential year-end tax planning steps every business owner should take before December 31st.',
    category: 'Tax Planning',
    author: 'Lisa Wong',
    date: 'Mar 08, 2024',
    readTime: '7 min read',
    image: 'gradient-to-br from-primary/20 to-primary/5',
  },
  {
    id: '5',
    title: 'Payroll Management Best Practices',
    excerpt: 'Modern approaches to efficient payroll management and statutory compliance.',
    category: 'Payroll',
    author: 'Raj Sharma',
    date: 'Mar 05, 2024',
    readTime: '9 min read',
    image: 'gradient-to-br from-secondary/20 to-secondary/5',
  },
  {
    id: '6',
    title: 'Investment Portfolio Diversification Guide',
    excerpt: 'Learn how to build and diversify an investment portfolio for long-term wealth creation.',
    category: 'Investment',
    author: 'Priya Patel',
    date: 'Mar 01, 2024',
    readTime: '12 min read',
    image: 'gradient-to-br from-accent/20 to-accent/5',
  },
]

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ['Tax Planning', 'Compliance', 'Advisory', 'Payroll', 'Investment']
  const filteredPosts = selectedCategory
    ? blogPosts.filter((post) => post.category === selectedCategory)
    : blogPosts

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-card to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Our Blog</h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Expert insights on tax planning, financial management, and business growth strategies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-12 justify-center"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:border-primary'
              }`}
            >
              All Posts
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground hover:border-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className={`h-48 bg-${post.image} flex items-center justify-center`} />

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-foreground/60">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-foreground/60 mb-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`#`}
                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-foreground/70 text-lg">
                No posts found in this category. Try another one!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-card">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-foreground/70 mb-8">
              Get expert tax and financial insights delivered to your inbox weekly.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
