'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { setB2bLoggedIn } from '@/lib/b2bDemo'

export default function DemoLogoutButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => { setB2bLoggedIn(false); router.push('/min-konto/login') }}
      className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 hover:text-white transition-colors"
    >
      <LogOut className="w-4 h-4" /> Log ud
    </button>
  )
}
