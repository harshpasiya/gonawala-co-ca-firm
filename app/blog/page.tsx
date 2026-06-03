import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FloatingButtons } from '@/components/floating-buttons'
import BlogContent from '@/components/pages/blog-content'

export const metadata = {
  title: 'Blog - Elite CA Services',
  description: 'Expert insights on tax planning, financial management, and business advisory from our chartered accountants.',
}

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <BlogContent />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  )
}
