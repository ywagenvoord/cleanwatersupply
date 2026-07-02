'use client'

import { useClerk } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'

export default function DemoLogoutButton() {
  const { signOut } = useClerk()
  return (
    <button
      onClick={() => signOut({ redirectUrl: '/' })}
      className="inline-flex items-center gap-1.5 text-sm text-blue-100/80 hover:text-white transition-colors"
    >
      <LogOut className="w-4 h-4" /> Log ud
    </button>
  )
}
