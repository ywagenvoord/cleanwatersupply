import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, ShoppingBag, FileText, Package, Tag, ArrowRight } from 'lucide-react'
import { currentUser } from '@clerk/nextjs/server'
import DemoLogoutButton from './DemoLogoutButton'
import MinKontoGate from './MinKontoGate'
import FirmaProfilForm from './FirmaProfilForm'

export const metadata: Metadata = {
  title: 'Min konto – Erhverv',
  robots: { index: false, follow: false },
}

export default async function MinKontoPage() {
  const user = await currentUser()

  const firstName = user?.firstName || 'erhvervskunde'
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Ikke angivet'
  const email = user?.primaryEmailAddress?.emailAddress || 'Ikke angivet'

  // Firmaoplysninger kan gemmes på kontoen (Clerk publicMetadata) af jer.
  const meta = (user?.publicMetadata ?? {}) as {
    firmanavn?: string
    cvr?: string
    betaling?: string
  }
  const firma = meta.firmanavn || '—'
  const betaling = meta.betaling || 'Faktura · netto 14 dage'

  return (
    <MinKontoGate>
      <main className="min-h-screen bg-gray-50">
        {/* Top bar */}
        <div className="bg-[#0a2540] text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#3aad4a]" />
              </div>
              <div>
                <p className="text-xs text-blue-200/70">Erhvervskonto</p>
                <p className="font-bold leading-tight">{firma !== '—' ? firma : fullName}</p>
              </div>
            </div>
            <DemoLogoutButton />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl font-extrabold text-[#0a2540] mb-1">Velkommen tilbage, {firstName} 👋</h1>
          <p className="text-gray-500 mb-8">Her er dine faste priser og din faktura-oversigt.</p>

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
              <div><p className="font-bold text-[#0a2540] text-sm">{betaling}</p><p className="text-xs text-gray-500">Betal på faktura</p></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Ordrehistorik */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <Package className="w-5 h-5 text-[#3aad4a]" />
                <h2 className="font-extrabold text-[#0a2540]">Ordrehistorik</h2>
              </div>
              <div className="rounded-2xl border border-dashed border-gray-200 p-8 text-center">
                <p className="text-sm font-semibold text-gray-700 mb-1">Ingen ordrer endnu</p>
                <p className="text-sm text-gray-500 mb-5">Når du bestiller på faktura, kan du se dine ordrer her.</p>
                <Link href="/shop/erhverv" className="inline-flex items-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all">
                  Gå til shop <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Firmaoplysninger */}
            <div className="space-y-6">
              <FirmaProfilForm email={email} kontakt={fullName} />

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
    </MinKontoGate>
  )
}
