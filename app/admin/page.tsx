import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import AdminDashboard from '@/components/pages/admin-dashboard'

export const metadata = {
  title: 'Admin Dashboard - Elite CA Services',
  description: 'Admin dashboard for managing inquiries and analytics.',
}

export default function AdminPage() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <AdminDashboard />
      </main>
      <Footer />
    </>
  )
}
