'use client'

import { useParams } from 'next/navigation'
import Dashboard from '../../components/dashboard'

export default function DashboardSection() {
  const params = useParams()
  const section = params.section as string
  
  // This is a placeholder. In a real application, you'd fetch the user data from a context or API
  const user = { role: 'user' } // or null, depending on your authentication logic

  return (
    <Dashboard initialSection={section} user={user} />
  )
}
