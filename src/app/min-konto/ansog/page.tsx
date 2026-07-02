'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, CheckCircle2, ArrowRight, FileText, ClipboardCheck, KeyRound, ShoppingBag } from 'lucide-react'

const STEPS = [
  { Icon: FileText,       title: 'Udfyld ansøgning', body: 'Firma, CVR og kontaktoplysninger – tager et par minutter.' },
  { Icon: ClipboardCheck, title: 'Vi gennemgår',      body: 'Vi tjekker oplysningerne og godkender din konto (typisk inden for 1 hverdag).' },
  { Icon: KeyRound,       title: 'Aktivér login',     body: 'Du får en mail med et link til at oprette din adgangskode.' },
  { Icon: ShoppingBag,    title: 'Bestil på faktura',  body: 'Log ind, se dine faste priser og bestil – betal på faktura.' },
]

export default function AnsogPage() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-amber-100 text-amber-800 text-center text-xs font-semibold py-2 px-4">
        Prototype / udkast – ansøgningen sendes ikke rigtigt endnu.
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[#0a2540] text-white flex items-center justify-center mx-auto mb-5">
            <Building2 className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#0a2540]">Ansøg om erhvervskonto</h1>
          <p className="text-gray-500 mt-2">Få adgang til faste erhvervspriser og bestilling på faktura.</p>
        </div>

        {/* Sådan foregår det */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="font-extrabold text-[#0a2540] mb-6 text-center">Sådan foregår det</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <div className="shrink-0 relative">
                  <div className="w-11 h-11 rounded-xl bg-[#3aad4a]/10 text-[#3aad4a] flex items-center justify-center">
                    <s.Icon className="w-5 h-5" />
                  </div>
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#0a2540] text-white text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                </div>
                <div>
                  <p className="font-bold text-[#0a2540] text-sm">{s.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formular / kvittering */}
        {sent ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 text-[#3aad4a] flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0a2540] mb-2">Tak for din ansøgning!</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Vi har modtaget din ansøgning og vender tilbage inden for 1 hverdag{email ? <> på <span className="font-semibold text-gray-900">{email}</span></> : ''} med besked om godkendelse og et link til at oprette din adgangskode.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 mt-7 text-sm font-bold text-[#3aad4a] hover:text-[#2e9a3d]">
              Tilbage til forsiden <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Firmanavn</label>
                <input required className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="Eksempel Håndværk ApS" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVR-nummer</label>
                <input required inputMode="numeric" className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="12345678" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Kontaktperson</label>
                <input required className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="Fornavn Efternavn" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefon</label>
                <input required inputMode="tel" className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="+45 12 34 56 78" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="navn@virksomhed.dk" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Besked (valgfri)</label>
              <textarea rows={3} className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="Fortæl fx hvad I typisk har brug for." />
            </div>

            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-3.5 rounded-full font-bold text-sm transition-all">
              Send ansøgning <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-xs text-gray-400">Vi bruger kun oplysningerne til at oprette og godkende din erhvervskonto.</p>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Har du allerede en konto? <Link href="/min-konto/login" className="font-bold text-[#0a2540] hover:text-[#3aad4a]">Log ind her</Link>
        </p>
      </div>
    </main>
  )
}
