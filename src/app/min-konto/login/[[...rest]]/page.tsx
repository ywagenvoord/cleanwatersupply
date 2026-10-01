import type { Metadata } from 'next'
import Link from 'next/link'
import { SignIn } from '@clerk/nextjs'
import { Building2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Log ind – Erhvervskonto',
  robots: { index: false, follow: false },
}

export default function ErhvervLoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 pt-8 pb-16 sm:pt-12">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-[#0a2540] text-white flex items-center justify-center mx-auto mb-5">
          <Building2 className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#0a2540]">Log ind som erhvervskunde</h1>
        <p className="text-gray-500 mt-2 text-sm">Se dine faste priser og bestil på faktura.</p>
      </div>

      <SignIn
        signUpUrl="/min-konto/ansog"
        appearance={{
          elements: {
            formButtonPrimary: 'bg-[#3aad4a] hover:bg-[#2e9a3d] text-sm normal-case',
            footerActionLink: 'text-[#3aad4a] hover:text-[#2e9a3d]',
          },
        }}
      />

      <div className="mt-8 w-full max-w-sm rounded-2xl border-2 border-[#3aad4a]/30 bg-[#3aad4a]/5 p-5 text-center">
        <p className="text-base font-extrabold text-[#0a2540] mb-1">Har du endnu ikke en konto?</p>
        <p className="text-sm text-gray-500 mb-4">Opret en erhvervskonto og få faste priser og køb på faktura.</p>
        <Link
          href="/min-konto/ansog"
          className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-6 py-3.5 text-base font-bold transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5"
        >
          Opret konto her
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <p className="mt-6 text-xs text-gray-400 max-w-sm text-center">
        Erhvervskonti oprettes efter godkendelse.
      </p>
    </main>
  )
}
