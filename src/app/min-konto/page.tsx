import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, ShoppingBag, FileText, Repeat, Package, Tag, CheckCircle2, Truck, Clock, ArrowRight } from 'lucide-react'
import DemoLogoutButton from './DemoLogoutButton'

export const metadata: Metadata = {
  title: 'Min konto – Erhverv (prototype)',
  robots: { index: false, follow: false },
}

// Eksempel-data (mock) – erstattes af rigtige data, når login + database er koblet på
const COMPANY = {
  name: 'Eksempel Håndværk ApS',
  cvr: '12345678',
  contact: 'Jens Jensen',
  email: 'jens@eksempel.dk',
  terms: 'Faktura · netto 14 dage',
}

const ORDERS = [
  { id: 'CWS-1042', date: '12. jun. 2026', items: 'Baclyser S (2M) ×10, HygieneSiphon G 1¼" ×4', total: 5450, status: 'Faktureret' },
  { id: 'CWS-1031', date: '28. maj 2026', items: 'Baclyser IL 5 ×2, Cartridge MF5 ×5', total: 5880, status: 'Afsendt' },
  { id: 'CWS-1017', date: '3. maj 2026', items: 'AS Wallshower (4M) ×6', total: 4050, status: 'Faktureret' },
  { id: 'CWS-1004', date: '14. apr. 2026', items: 'Baclyser TL (1M) ×12', total: 3600, status: 'Faktureret' },
]

const STATUS: Record<string, { color: string; Icon: typeof CheckCircle2 }> = {
  'Faktureret': { color: 'bg-green-50 text-green-700 border-green-100', Icon: CheckCircle2 },
  'Afsendt':    { color: 'bg-blue-50 text-blue-700 border-blue-100',    Icon: Truck },
  'Behandles':  { color: 'bg-amber-50 text-amber-700 border-amber-100', Icon: Clock },
}

export default function MinKontoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Prototype-banner */}
      <div className="bg-amber-100 text-amber-800 text-center text-xs font-semibold py-2 px-4">
        Prototype / udkast – eksempel-data. Sådan kan en erhvervskundes konto se ud.
      </div>

      {/* Top bar */}
      <div className="bg-[#0a2540] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#3aad4a]" />
            </div>
            <div>
              <p className="text-xs text-blue-200/70">Erhvervskonto</p>
              <p className="font-bold leading-tight">{COMPANY.name}</p>
            </div>
          </div>
          <DemoLogoutButton />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-extrabold text-[#0a2540] mb-1">Velkommen tilbage, {COMPANY.contact.split(' ')[0]} 👋</h1>
        <p className="text-gray-500 mb-8">Her er dine ordrer, dine faste priser og din faktura-oversigt.</p>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Link href="/shop/erhverv" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#3aad4a]/10 text-[#3aad4a] flex items-center justify-center"><ShoppingBag className="w-5 h-5" /></div>
            <div><p className="font-bold text-[#0a2540] text-sm">Gå til shop</p><p className="text-xs text-gray-500">Bestil til dine faste priser</p></div>
          </Link>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center"><Tag className="w-5 h-5" /></div>
            <div><p className="font-bold text-[#0a2540] text-sm">Faste erhvervspriser</p><p className="text-xs text-gray-500">Vises automatisk, ekskl. moms</p></div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center"><FileText className="w-5 h-5" /></div>
            <div><p className="font-bold text-[#0a2540] text-sm">{COMPANY.terms}</p><p className="text-xs text-gray-500">Betal på faktura</p></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Ordrehistorik */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <Package className="w-5 h-5 text-[#3aad4a]" />
              <h2 className="font-extrabold text-[#0a2540]">Ordrehistorik</h2>
            </div>
            <div className="space-y-3">
              {ORDERS.map((o) => {
                const s = STATUS[o.status] ?? STATUS['Behandles']
                return (
                  <div key={o.id} className="rounded-2xl border border-gray-100 p-4 hover:border-gray-200 transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-bold text-[#0a2540] text-sm">{o.id}</p>
                        <p className="text-xs text-gray-400">{o.date}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${s.color}`}>
                        <s.Icon className="w-3 h-3" /> {o.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{o.items}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-[#0a2540]">{o.total.toLocaleString('da-DK')} kr <span className="text-[11px] font-medium text-gray-400">ekskl. moms</span></span>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#0a2540] cursor-pointer"><FileText className="w-3.5 h-3.5" /> Faktura</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#3aad4a] hover:text-[#2e9a3d] cursor-pointer"><Repeat className="w-3.5 h-3.5" /> Genbestil</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Firmaoplysninger */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-[#3aad4a]" />
                <h2 className="font-extrabold text-[#0a2540]">Firmaoplysninger</h2>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-gray-500">Firma</dt><dd className="font-semibold text-gray-900 text-right">{COMPANY.name}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-gray-500">CVR</dt><dd className="font-semibold text-gray-900">{COMPANY.cvr}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-gray-500">Kontakt</dt><dd className="font-semibold text-gray-900 text-right">{COMPANY.contact}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-gray-500">E-mail</dt><dd className="font-semibold text-gray-900 text-right break-all">{COMPANY.email}</dd></div>
                <div className="flex justify-between gap-3 pt-3 border-t border-gray-100"><dt className="text-gray-500">Betaling</dt><dd className="font-semibold text-gray-900 text-right">{COMPANY.terms}</dd></div>
              </dl>
            </div>

            <div className="bg-gradient-to-br from-[#0a2540] to-blue-800 rounded-3xl p-6 text-white">
              <h3 className="font-extrabold mb-2">Bestil igen på få klik</h3>
              <p className="text-sm text-blue-100/80 mb-5">Alle dine priser er allerede sat op. Læg i kurv, afgiv ordre – så sender vi fakturaen.</p>
              <Link href="/shop/erhverv" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all">
                Åbn erhvervs-shop <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
