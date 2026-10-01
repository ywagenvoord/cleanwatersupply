import type { Metadata } from 'next'
import Link from 'next/link'
import { SignIn } from '@clerk/nextjs'
import { Building2, ArrowRight, Tag, FileText, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Log ind – Erhvervskonto',
  robots: { index: false, follow: false },
}

export default function ErhvervLoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#eaf2ff] via-white to-white flex flex-col items-center justify-start px-4 pt-10 pb-20 sm:pt-14">
      {/* Dekorative, bløde farveskær */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#284eff]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-24 w-80 h-80 rounded-full bg-[#3aad4a]/10 blur-3xl" />

      {/* Header */}
      <div className="relative text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0a2540] to-[#0044c4] text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20">
          <Building2 className="w-8 h-8" />
        </div>
        <span className="inline-flex items-center gap-2 bg-white/70 ring-1 ring-blue-100 text-[#284eff] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
          Erhverv
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0a2540]">Log ind som erhvervskunde</h1>
        <p className="text-gray-500 mt-2 text-sm">Se dine faste priser og bestil på faktura.</p>
      </div>

      {/* Login-kort */}
      <div className="relative w-full max-w-sm">
        <SignIn
          signUpUrl="/min-konto/ansog"
          appearance={{
            elements: {
              rootBox: 'w-full',
              cardBox: 'w-full shadow-xl shadow-blue-900/5',
              card: 'rounded-3xl border border-gray-100',
              formButtonPrimary: 'bg-[#3aad4a] hover:bg-[#2e9a3d] text-sm normal-case rounded-full py-2.5',
              footerActionLink: 'text-[#3aad4a] hover:text-[#2e9a3d] font-semibold',
              formFieldInput: 'rounded-xl',
            },
          }}
        />
      </div>

      {/* Opret konto */}
      <div className="relative mt-8 w-full max-w-sm rounded-3xl bg-white border border-gray-100 shadow-lg shadow-blue-900/5 p-6 text-center">
        <p className="text-base font-extrabold text-[#0a2540] mb-1">Har du endnu ikke en konto?</p>
        <p className="text-sm text-gray-500 mb-5">Opret en erhvervskonto og få adgang til dine fordele.</p>

        <div className="flex items-center justify-center gap-5 mb-5 text-[11px] font-semibold text-gray-500">
          <span className="inline-flex items-center gap-1.5"><Tag className="w-4 h-4 text-[#3aad4a]" /> Faste priser</span>
          <span className="inline-flex items-center gap-1.5"><FileText className="w-4 h-4 text-[#3aad4a]" /> Køb på faktura</span>
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#3aad4a]" /> Godkendt</span>
        </div>

        <Link
          href="/min-konto/ansog"
          className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-6 py-3.5 text-base font-bold transition-all hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-0.5"
        >
          Opret konto her
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <p className="relative mt-6 text-xs text-gray-400 max-w-sm text-center">
        Erhvervskonti oprettes efter godkendelse.
      </p>
    </main>
  )
}
