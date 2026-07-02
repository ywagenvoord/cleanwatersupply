'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Building2, Check } from 'lucide-react'

export type FirmaData = {
  firmanavn: string
  cvr: string
  ean: string
  att: string
  adresse: string
  telefon: string
}

const EMPTY: FirmaData = { firmanavn: '', cvr: '', ean: '', att: '', adresse: '', telefon: '' }

/** Læser firma fra Clerk-kontoens metadata (unsafeMetadata.firma, ellers publicMetadata.firma). */
export function readFirmaFromUser(user: any): FirmaData {
  const fromUnsafe = user?.unsafeMetadata?.firma
  const fromPublic = user?.publicMetadata?.firma
  return { ...EMPTY, ...(fromPublic ?? {}), ...(fromUnsafe ?? {}) }
}

export default function FirmaProfilForm({ email, kontakt }: { email: string; kontakt: string }) {
  const { user, isLoaded } = useUser()
  const [f, setF] = useState<FirmaData>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isLoaded && user) setF(readFirmaFromUser(user))
  }, [isLoaded, user])

  function upd(key: keyof FirmaData, value: string) {
    setF((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    try {
      await user.update({ unsafeMetadata: { ...(user.unsafeMetadata ?? {}), firma: f } })
      setSaved(true)
    } catch {
      /* ignore */
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]'

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-5 h-5 text-[#3aad4a]" />
        <h2 className="font-extrabold text-[#0a2540]">Firmaoplysninger</h2>
      </div>
      <p className="text-sm text-gray-500 mb-5">
        Udfyld én gang – så er de gemt på din konto og udfyldes automatisk, hver gang du bestiller.
        Du kan altid rette dem.
      </p>

      <form onSubmit={save} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Firmanavn</label>
          <input className={inputClass} value={f.firmanavn} onChange={(e) => upd('firmanavn', e.target.value)} placeholder="Firma ApS" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">CVR-nr.</label>
            <input className={inputClass} inputMode="numeric" value={f.cvr} onChange={(e) => upd('cvr', e.target.value)} placeholder="12345678" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">EAN (valgfri)</label>
            <input className={inputClass} inputMode="numeric" value={f.ean} onChange={(e) => upd('ean', e.target.value)} placeholder="EAN" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Att. / kontaktperson</label>
          <input className={inputClass} value={f.att} onChange={(e) => upd('att', e.target.value)} placeholder={kontakt !== 'Ikke angivet' ? kontakt : 'Fornavn Efternavn'} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Leveringsadresse</label>
          <input className={inputClass} value={f.adresse} onChange={(e) => upd('adresse', e.target.value)} placeholder="Vej 1, 8700 Horsens" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Telefon</label>
          <input className={inputClass} inputMode="tel" value={f.telefon} onChange={(e) => upd('telefon', e.target.value)} placeholder="+45 12 34 56 78" />
        </div>

        <div className="pt-2 border-t border-gray-100 space-y-1 text-sm">
          <div className="flex justify-between gap-3"><span className="text-gray-500">E-mail</span><span className="font-semibold text-gray-900 break-all">{email}</span></div>
        </div>

        <button
          type="submit"
          disabled={saving || !isLoaded}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] disabled:opacity-60 text-white py-2.5 rounded-full font-bold text-sm transition-all mt-2"
        >
          {saved ? (<><Check className="w-4 h-4" /> Gemt</>) : saving ? 'Gemmer…' : 'Gem oplysninger'}
        </button>
      </form>
    </div>
  )
}
