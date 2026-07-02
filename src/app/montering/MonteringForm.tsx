'use client'

import { useState } from 'react'
import { Upload, X, ArrowRight } from 'lucide-react'

export default function MonteringForm({ nextUrl }: { nextUrl: string }) {
  const [previews, setPreviews] = useState<{ name: string; url: string }[]>([])

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : []
    setPreviews(files.slice(0, 6).map(f => ({ name: f.name, url: URL.createObjectURL(f) })))
  }

  return (
    <form
      action="https://formsubmit.co/caj@cleanwatersupply.dk"
      method="POST"
      encType="multipart/form-data"
      className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-4"
    >
      {/* FormSubmit-indstillinger */}
      <input type="hidden" name="_subject" value="Nyt monteringssted – billeder til vurdering" />
      <input type="hidden" name="_cc" value="ksj@cleanwatersupply.dk" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={nextUrl} />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Navn</label>
          <input name="Navn" required className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="Fornavn Efternavn" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telefon</label>
          <input name="Telefon" required inputMode="tel" className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="+45 12 34 56 78" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">E-mail</label>
          <input name="E-mail" required type="email" className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="navn@mail.dk" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Adresse / postnummer</label>
          <input name="Adresse" required className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="Vej 1, 8700 Horsens" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hvilket anlæg? (hvis du ved det)</label>
        <select name="Anlæg" className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm bg-white focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]">
          <option>Ved ikke endnu</option>
          <option>Blødgøringsanlæg 100M</option>
          <option>Blødgøringsanlæg 100BS</option>
          <option>Blødgøringsanlæg 100B</option>
          <option>Andet</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Besked</label>
        <textarea name="Besked" required rows={3} className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:border-[#3aad4a] focus:outline-none focus:ring-1 focus:ring-[#3aad4a]" placeholder="Beskriv gerne dit ønske eller spørgsmål – fx hvor anlægget skal stå, afstand til afløb, eller hvad du er i tvivl om." />
      </div>

      {/* Billed-upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Billeder af monteringsstedet</label>
        <label className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#3aad4a] hover:bg-[#3aad4a]/5 cursor-pointer px-4 py-8 text-center transition-colors">
          <Upload className="w-6 h-6 text-[#3aad4a]" />
          <span className="text-sm font-semibold text-gray-700">Klik for at vælge billeder</span>
          <span className="text-xs text-gray-400">Tag gerne billeder fra flere vinkler – fx ved vandmåleren og afløbet</span>
          <input type="file" name="Billede" accept="image/*" multiple required onChange={onFiles} className="hidden" />
        </label>

        {previews.length > 0 && (
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {previews.map((p, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-[#3aad4a] hover:bg-[#2e9a3d] text-white py-3.5 rounded-full font-bold text-sm transition-all">
        Send billeder <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-center text-xs text-gray-400">Vi bruger kun billederne til at vurdere monteringen og give dig en pris.</p>
    </form>
  )
}
