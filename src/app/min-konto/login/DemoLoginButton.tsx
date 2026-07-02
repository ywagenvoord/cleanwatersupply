'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { setB2bLoggedIn } from '@/lib/b2bDemo'

export default function DemoLoginButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => { setB2bLoggedIn(true); router.push('/min-konto') }}
      className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-3 rounded-full font-bold text-sm transition-all"
    >
      Log ind
      <ArrowRight className="w-4 h-4" />
    </button>
  )
}
