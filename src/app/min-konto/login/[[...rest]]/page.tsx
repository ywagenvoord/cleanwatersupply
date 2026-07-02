import type { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'
import { Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Log ind – Erhvervskonto',
  robots: { index: false, follow: false },
}

export default function ErhvervLoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[#0a2540] text-white flex items-center justify-center mx-auto mb-5">
          <Building2 className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0a2540]">Log ind som erhvervskunde</h1>
        <p className="text-gray-500 mt-2 text-sm">Se dine faste priser og bestil på faktura.</p>
      </div>

      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 'bg-[#3aad4a] hover:bg-[#2e9a3d] text-sm normal-case',
            footerActionLink: 'text-[#3aad4a] hover:text-[#2e9a3d]',
          },
        }}
      />

      <p className="mt-6 text-xs text-gray-400 max-w-sm text-center">
        Erhvervskonti oprettes efter godkendelse. Kontakt os, hvis du ønsker en konto.
      </p>
    </main>
  )
}
