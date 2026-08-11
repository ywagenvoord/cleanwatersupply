'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { FileText, ArrowRight } from 'lucide-react'
import type { CartItem } from '@/contexts/CartContext'

/**
 * Fase 0 – "Bestil på faktura" for indloggede erhvervskunder.
 *
 * Sender ordren som en struktureret e-mail til Clean Water Supply via FormSubmit.
 * Firmaoplysningerne indsamles her og følger med ordren, så I kan oprette
 * fakturaen i E-komplet.
 *
 * Firmaoplysningerne gemmes i browseren (localStorage) og udfyldes automatisk
 * næste gang – men kan altid rettes. (Rigtige gemte profiler på tværs af enheder
 * kommer i Fase 1 med rigtige konti.)
 *
 * SENERE (Fase 1/2): Denne komponent kan i stedet POST'e til en server-route
 * (fx /api/erhverv/ordre), der læser firmaprofilen fra kontoen og opretter
 * ordren automatisk i E-komplet. Felterne + ordrelinjerne kan genbruges.
 */

type Firma = {
  firmanavn: string
  cvr: string
  ean: string
  att: string
  email: string
  telefon: string
  adresse: string
}

const EMPTY: Firma = { firmanavn: '', cvr: '', ean: '', att: '', email: '', telefon: '', adresse: '' }
const FIRMA_KEY = 'cws-b2b-firma'

export default function FakturaCheckout({
  items,
  subtotal,
}: {
  items: CartItem[]
  subtotal: number
}) {
  const [nextUrl, setNextUrl] = useState('')
  const [f, setF] = useState<Firma>(EMPTY)
  const { user, isLoaded } = useUser()

  // Success-URL + browser-huk (fallback, hvis kontoen ikke har data endnu)
  useEffect(() => {
    setNextUrl(`${window.location.origin}/cart?ordre=sendt`)
    try {
      const raw = localStorage.getItem(FIRMA_KEY)
      if (raw) setF((prev) => ({ ...EMPTY, ...prev, ...JSON.parse(raw) }))
    } catch {}
  }, [])

  // Udfyld fra den indloggede kontos gemte firmaoplysninger (går forud for browser-huk)
  useEffect(() => {
    if (!isLoaded || !user) return
    const acc = ((user.unsafeMetadata as any)?.firma ?? (user.publicMetadata as any)?.firma) as
      | Partial<Firma>
      | undefined
    const email = user.primaryEmailAddress?.emailAddress
    if (acc || email) {
      setF((prev) => ({ ...prev, ...(acc ?? {}), email: email || prev.email }))
    }
  }, [isLoaded, user])

  // Opdatér felt + gem med det samme, så det huskes til næste gang
  function upd(key: keyof Firma, value: string) {
    setF((prev) => {
      const next = { ...prev, [key]: value }
      try {
        localStorage.setItem(FIRMA_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }

  function rydFirma() {
    try {
      localStorage.removeItem(FIRMA_KEY)
    } catch {}
    setF(EMPTY)
  }

  // Ordrelinjer som læsbar tekst, der sendes med i mailen.
  const ordreTekst = items
    .map(
      (i) =>
        `${i.quantity} × ${i.name} — ${i.price.toLocaleString('da-DK')} kr/stk = ${(
          i.price * i.quantity
        ).toLocaleString('da-DK')} kr (ekskl. moms)`,
    )
    .join('\n')

  const inputClass =
    'w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]'

  return (
    <section id="faktura" className="mt-10 scroll-mt-28">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#0a2540] text-white flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-extrabold text-[#0a2540]">Bestil på faktura</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Udfyld jeres firmaoplysninger, så sender vi en ordrebekræftelse og faktura. Alle priser er
          ekskl. moms. Vi husker oplysningerne på denne computer, så I ikke skal skrive dem igen –
          I kan altid rette dem.
        </p>

        <form
          action="https://formsubmit.co/ksj@cleanwatersupply.dk"
          method="POST"
          className="space-y-4"
        >
          {/* FormSubmit-indstillinger */}
          <input type="hidden" name="_subject" value="Ny erhvervsordre (faktura)" />
          <input type="hidden" name="_cc" value="pj@cleanwatersupply.dk" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          {nextUrl && <input type="hidden" name="_next" value={nextUrl} />}

          {/* Ordredata der følger med mailen */}
          <input type="hidden" name="Ordre" value={ordreTekst} />
          <input
            type="hidden"
            name="Total (ekskl. moms)"
            value={`${subtotal.toLocaleString('da-DK')} kr`}
          />
          <input
            type="hidden"
            name="Antal varer"
            value={String(items.reduce((s, i) => s + i.quantity, 0))}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Firmanavn</label>
              <input name="Firmanavn" required value={f.firmanavn} onChange={(e) => upd('firmanavn', e.target.value)} className={inputClass} placeholder="Firma ApS" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVR-nr.</label>
              <input name="CVR" required inputMode="numeric" value={f.cvr} onChange={(e) => upd('cvr', e.target.value)} className={inputClass} placeholder="12345678" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                EAN-nr. <span className="font-normal text-gray-400">(valgfri)</span>
              </label>
              <input name="EAN" inputMode="numeric" value={f.ean} onChange={(e) => upd('ean', e.target.value)} className={inputClass} placeholder="Til offentlige/EAN-fakturaer" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Att. / kontaktperson
              </label>
              <input name="Att" required value={f.att} onChange={(e) => upd('att', e.target.value)} className={inputClass} placeholder="Fornavn Efternavn" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail</label>
              <input name="E-mail" required type="email" value={f.email} onChange={(e) => upd('email', e.target.value)} className={inputClass} placeholder="faktura@firma.dk" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefon</label>
              <input name="Telefon" required inputMode="tel" value={f.telefon} onChange={(e) => upd('telefon', e.target.value)} className={inputClass} placeholder="+45 12 34 56 78" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Leveringsadresse
            </label>
            <input name="Leveringsadresse" required value={f.adresse} onChange={(e) => upd('adresse', e.target.value)} className={inputClass} placeholder="Vej 1, 8700 Horsens" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Besked <span className="font-normal text-gray-400">(valgfri)</span>
            </label>
            <textarea
              name="Besked"
              rows={3}
              className={inputClass}
              placeholder="Ønsket leveringsdato, rekvisitionsnr., eller andet vi skal vide."
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-3.5 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:shadow-green-500/20"
          >
            Send ordre <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center gap-3 text-center">
            <p className="text-xs text-gray-400">
              Vi bekræfter ordren og sender faktura. Ingen binding før vi har bekræftet.
            </p>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={rydFirma}
              className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2"
            >
              Ryd gemte firmaoplysninger
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
