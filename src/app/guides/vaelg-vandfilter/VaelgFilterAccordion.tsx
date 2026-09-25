'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShowerHead, Filter, GlassWater, Home, ShieldCheck, ChevronDown, ArrowRight, Star } from 'lucide-react'

type Product = { name: string; price?: number; img: string; href: string; why?: string }
type Solution = {
  key: string
  Icon: typeof ShowerHead
  when: string
  title: string
  text: string
  tip: string
  recommended: Product
  others: Product[]
}

const SOLUTIONS: Solution[] = [
  {
    key: 'bruser',
    Icon: ShowerHead,
    when: 'Du vil have blødere badevand',
    title: 'Brusefilter',
    text: 'Reducerer kalk og klor i bruservandet – mildere for hud og hår.',
    tip: 'Starter du fra bunden, anbefaler vi det komplette brusehoved, hvor filteret følger med. Har du allerede et brusehoved, køber du bare et udskiftningsfilter.',
    recommended: { name: 'Brusehoved med vandfilter – komplet', price: 525, img: '/images/product-kalkbruser.jpg', href: '/shop/brusehoved-filter-acf', why: 'Alt følger med – brusehoved, filter, børste og svamp. Nemmest at komme i gang med.' },
    others: [
      { name: 'Brusehoved med vandfilter', price: 499, img: '/images/product-brusehoved-sort.jpg', href: '/shop/brusehoved-til-filter' },
      { name: 'Udskiftningsfilter til brusehoved', price: 64, img: '/images/product-acf-filter.jpg', href: '/shop/brusefilter-acf' },
      { name: 'Udskiftningsfilter + C-vitamin', price: 69, img: '/images/product-acf-vitamin-c.jpg', href: '/shop/brusefilter-acf-vitamin-c' },
      { name: 'Udskiftningsfilter + kalkhæmmer', price: 69, img: '/images/product-acf-amino-acid.jpg', href: '/shop/brusefilter-acf-amino-acid' },
    ],
  },
  {
    key: 'hane',
    Icon: Filter,
    when: 'Du vil have renere vand fra hanen',
    title: 'Vandhanefilter',
    text: 'Renser vandet til madlavning og drikke direkte ved hanen.',
    tip: 'Vi anbefaler Baclyser® neo TL (3M) – det er vores bedst solgte vandhanefilter. Med 3 måneders levetid skifter du sjældnere, og det giver den bedste pris pr. dag. TR er samme filter, bare med en blød bruserstråle.',
    recommended: { name: 'Baclyser® neo TL (3M)', price: 625, img: '/images/baclyser-neo-tl.jpg', href: '/shop/baclyser-neo-tl-3m', why: 'Vores bedst solgte – 3 måneders levetid, så du skifter sjældnere og får den bedste pris pr. dag.' },
    others: [
      { name: 'Baclyser® neo TL (2M)', price: 450, img: '/images/baclyser-neo-tl.jpg', href: '/shop/baclyser-neo-tl-2m' },
      { name: 'Baclyser® neo TR (3M)', price: 625, img: '/images/baclyser-neo-tr.jpg', href: '/shop/baclyser-neo-tr-3m' },
      { name: 'Baclyser® neo TR (2M)', price: 450, img: '/images/baclyser-neo-tr.jpg', href: '/shop/baclyser-neo-tr-2m' },
    ],
  },
  {
    key: 'kande',
    Icon: GlassWater,
    when: 'Du vil have bedre drikkevand – nemt',
    title: 'Filterkande',
    text: 'Renser vandet mens du hælder. Ingen installation.',
    tip: 'Vi anbefaler Germ-stop-kanden – den fjerner både bakterier og mikroplast og er det tryggeste valg til familien. Vil du bare have bedre smag i hverdagen, er den enkle filterkande et billigere alternativ.',
    recommended: { name: 'Kande der fjerner 99,999 % bakterier*', price: 399, img: '/images/kande-germ-stop.png', href: '/vandkander/mikroplastik-stop', why: 'Fjerner bakterier og mikroplast, mens du hælder – det tryggeste drikkevand til hele familien.' },
    others: [
      { name: 'Filterkande med udskifteligt filter', price: 189, img: '/images/kande-carmen-t.png', href: '/shop/kande-carmen' },
      { name: 'Vandkaraffel med filter', price: 199, img: '/images/glassmart-flaske-t.png', href: '/vandkander/glassmart' },
    ],
  },
  {
    key: 'blodgoring',
    Icon: Home,
    when: 'Du vil af med kalk i hele huset',
    title: 'Blødgøringsanlæg',
    text: 'Behandler alt vandet og beskytter rør og hvidevarer.',
    tip: 'Til de fleste familier anbefaler vi 100M – kompakt med indbygget salttank. Vil du fylde salt på sjældnere, så vælg 100B eller 100BS med større, separat tank.',
    recommended: { name: 'Blødgøringsanlæg 100M', price: 11250, img: '/images/blosgoringsanlaeg-100m.jpg', href: '/shop/blosgoringsanlaeg-100m', why: 'Kompakt alt-i-ét med indbygget salttank – passer til de fleste familier.' },
    others: [
      { name: 'Blødgøringsanlæg 100B', price: 11250, img: '/images/blosgoringsanlaeg-100b-v2.jpg', href: '/shop/blosgoringsanlaeg-100b' },
      { name: 'Blødgøringsanlæg 100BS', price: 11250, img: '/images/blosgoringsanlaeg-100bs.jpg', href: '/shop/blosgoringsanlaeg-100bs' },
    ],
  },
  {
    key: 'bakterie',
    Icon: ShieldCheck,
    when: 'Du vil beskytte mod Legionella',
    title: 'Bakteriefilter',
    text: 'Medicinsk certificeret filter ved hane og bruser.',
    tip: 'Til hjemmet anbefaler vi Baclyser® neo TR ved hanen. Ønsker du en fast gennemstrøms-løsning, er cBlue SC3 alternativet.',
    recommended: { name: 'Baclyser® neo TR (2M) – til hanen', price: 450, img: '/images/baclyser-neo-tr.jpg', href: '/shop/baclyser-neo-tr-2m', why: 'Bakteriefrit vand direkte fra hanen – samme filter, som hospitaler bruger.' },
    others: [
      { name: 'cBlue SC3 (inkl. filter)', price: 1120, img: '/images/cblue-sc3-2.jpg', href: '/shop/cblue-sc3' },
      { name: 'Filter Housing – til rørledninger', price: 500, img: '/images/filter-housing.jpg', href: '/shop/filter-housing' },
      { name: 'DualStage MF 10-CL', price: 749, img: '/images/dualstage-mf-10cl.jpg', href: '/shop/dualstage-mf-10-cl' },
      { name: 'Aktivt Kulblokfilter 10-CL', price: 375, img: '/images/kulblokfilter-10cl.jpg', href: '/shop/kulblokfilter-10-cl' },
    ],
  },
]

function priceLabel(p?: number) {
  return p != null ? `${p.toLocaleString('da-DK')} kr` : ''
}

export default function VaelgFilterAccordion() {
  const [open, setOpen] = useState<string | null>('bruser')

  return (
    <div className="space-y-3">
      {SOLUTIONS.map(({ key, Icon, when, title, text, tip, recommended, others }) => {
        const isOpen = open === key
        return (
          <div key={key} className={`bg-white rounded-2xl ring-1 transition-all ${isOpen ? 'ring-[#3aad4a]/40 shadow-md' : 'ring-blue-100 shadow-sm hover:shadow-md'}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : key)}
              aria-expanded={isOpen}
              className="w-full flex items-start gap-4 p-5 text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-[#3aad4a] uppercase tracking-wide mb-0.5">{when}</p>
                <p className="font-extrabold text-[#0a2540]">{title}</p>
                <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{text}</p>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 mt-2 transition-transform ${isOpen ? 'rotate-180 text-[#3aad4a]' : ''}`} />
            </button>

            {isOpen && (
              <div className="px-5 pb-5">
                <div className="border-t border-blue-100 pt-4">
                  {/* Vejledning */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{tip}</p>

                  {/* Anbefaling */}
                  <div className="rounded-2xl ring-2 ring-[#3aad4a]/30 bg-[#3aad4a]/5 p-3.5">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <Star className="w-4 h-4 text-[#3aad4a] fill-[#3aad4a]" />
                      <span className="text-xs font-black text-[#2e9a3d] uppercase tracking-widest">Vi anbefaler</span>
                    </div>
                    <Link href={recommended.href} className="group flex items-center gap-4">
                      <span className="w-20 h-20 rounded-xl bg-white ring-1 ring-blue-100 flex items-center justify-center shrink-0 overflow-hidden">
                        <img src={recommended.img} alt={recommended.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-extrabold text-[#0a2540] leading-snug group-hover:text-[#284eff] transition-colors">{recommended.name}</span>
                        {recommended.why && <span className="block text-[13px] text-gray-600 mt-1 leading-relaxed">{recommended.why}</span>}
                        <span className="block text-lg font-extrabold text-[#0a2540] mt-1.5">{priceLabel(recommended.price)}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3aad4a] group-hover:bg-[#2e9a3d] text-white font-bold text-sm px-4 py-2 transition-all shrink-0">
                        Se produkt <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </div>

                  {/* Flere muligheder */}
                  {others.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2.5">Flere muligheder</p>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {others.map((p) => (
                          <Link
                            key={p.href}
                            href={p.href}
                            className="group flex items-center gap-3 rounded-xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 hover:shadow-sm transition-all p-2.5 bg-white"
                          >
                            <span className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-white flex items-center justify-center shrink-0 overflow-hidden">
                              <img src={p.img} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="block text-[13px] font-bold text-[#0a2540] leading-snug group-hover:text-[#284eff] transition-colors">{p.name}</span>
                              <span className="block text-sm font-extrabold text-[#0a2540] mt-0.5">{priceLabel(p.price)}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Vejledende note */}
      <p className="text-xs text-gray-400 text-center pt-1">
        Priserne er vejledende. Er du i tvivl, så tag quizzen nedenfor eller kontakt os – vi hjælper dig med at vælge rigtigt.
      </p>
    </div>
  )
}
