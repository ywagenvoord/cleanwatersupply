import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Mail, Lock, ShieldCheck } from 'lucide-react'
import DemoLoginButton from './DemoLoginButton'

export const metadata: Metadata = {
  title: 'Log ind – Erhvervskonto (prototype)',
  robots: { index: false, follow: false },
}

export default function ErhvervLoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Prototype-banner */}
      <div className="bg-amber-100 text-amber-800 text-center text-xs font-semibold py-2 px-4">
        Prototype / udkast – login virker ikke endnu. Tryk “Log ind” for at se, hvordan kontoen ser ud.
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#0a2540] text-white flex items-center justify-center mx-auto mb-5">
              <Building2 className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#0a2540]">Log ind som erhvervskunde</h1>
            <p className="text-gray-500 mt-2 text-sm">Se dine ordrer, dine faste priser og bestil på faktura.</p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail</label>
            <div className="relative mb-4">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="email" placeholder="navn@virksomhed.dk" className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" />
            </div>

            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Adgangskode</label>
            <div className="relative mb-2">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="password" placeholder="••••••••" className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" />
            </div>
            <div className="text-right mb-5">
              <span className="text-xs text-[#3aad4a] font-semibold cursor-pointer">Glemt adgangskode?</span>
            </div>

            <DemoLoginButton />
          </div>

          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 text-center">
            <p className="text-sm text-gray-600">Ny erhvervskunde?</p>
            <Link href="/min-konto/ansog" className="text-sm font-bold text-[#0a2540] hover:text-[#3aad4a] transition-colors">Ansøg om en erhvervskonto →</Link>
            <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400 mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3aad4a]" />
              Konti godkendes af os, før der kan bestilles på faktura.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
