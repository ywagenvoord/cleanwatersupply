'use client'

import { useState } from 'react'
import { ShieldCheck, ChevronDown, ExternalLink } from 'lucide-react'

/**
 * Lovpligtig EU-notits om den retlige garanti (reklamationsret).
 * Kræves vist i købsprocessen fra 27. sep. 2026 (Gennemførelsesforordning (EU) 2025/1960).
 * Diskret "klik for at folde ud"-løsning jf. EU's vejledning (afsnit 2.3, Digital display):
 * en kort sætning, hvor den fulde farve-notits vises ved klik, + klikbart link svarende til QR-koden.
 */
const EU_URL = 'https://europa.eu/youreurope/garantier'

export default function RetligGaranti() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-6 rounded-xl border border-blue-100 bg-sky-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center gap-2 px-4 py-3 text-left"
      >
        <ShieldCheck className="w-4 h-4 text-[#3aad4a] shrink-0" />
        <span className="text-xs font-semibold text-gray-600 flex-1">
          Retlig garanti – dine rettigheder ved køb (mindst 2 års reklamationsret i EU)
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-4 pb-4">
          <img
            src="/images/retlig-garanti-da.png"
            alt="EU-notits om den retlige garanti (reklamationsret): mindst 2 års garanti for varer solgt i EU."
            className="w-full max-w-md rounded-lg ring-1 ring-gray-200"
          />
          <a
            href={EU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#284eff] hover:underline"
          >
            Læs om dine rettigheder på europa.eu <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  )
}
