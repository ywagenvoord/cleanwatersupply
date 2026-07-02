'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Lock, ArrowRight, Building2 } from 'lucide-react'
import ShopClient from '../ShopClient'
import { useB2bLoggedIn } from '@/lib/useB2b'
import type { Product } from '@/lib/products'

export default function ErhvervShopGate({ products }: { products: Product[] }) {
  const loggedIn = useB2bLoggedIn()
  const [ready, setReady] = useState(false)
  useEffect(() => { setReady(true) }, [])

  // Undgå at flashe priser før vi ved om man er logget ind
  if (!ready) {
    return <div className="min-h-[60vh]" />
  }

  // Preview-tilstand (chef-gennemgang): vis shoppen uden login
  const previewOpen = process.env.NEXT_PUBLIC_PREVIEW_OPEN === '1'

  if (!loggedIn && !previewOpen) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0a2540] text-white flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0a2540] mb-3">Du skal være logget ind for at kunne tilgå erhvervshoppen</h1>
          <p className="text-gray-600 mb-8">
            Produkter og erhvervspriser vises kun for godkendte, indloggede erhvervskunder. Log ind for at se dine faste priser og bestille på faktura.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/min-konto/login"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-3 rounded-full font-bold text-sm transition-all"
            >
              Log ind <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/min-konto/ansog"
              className="w-full inline-flex items-center justify-center gap-2 border-2 border-[#0a2540] text-[#0a2540] hover:bg-[#0a2540] hover:text-white py-2.5 rounded-full font-bold text-sm transition-all"
            >
              <Building2 className="w-4 h-4" /> Ansøg om erhvervskonto
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <ShopClient products={products} showErhverv />
}
