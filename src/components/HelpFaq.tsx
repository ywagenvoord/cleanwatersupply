'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { ChevronDown, Phone, Mail } from 'lucide-react'

type Item = { q: string; qEn: string; person: string; role: string; roleEn: string; photo: string; lead: string; leadEn: string; phone: string | null; email: string }

const ITEMS: Item[] = [
  {
    q: 'Skal du bruge hjælp med bogholderi, faktura, betaling, moms eller regnskab?',
    qEn: 'Need help with accounting, invoices, payment, VAT or bookkeeping?',
    person: 'Heidi', role: 'Bogholder', roleEn: 'Accountant', photo: '/images/team-heidi-sq.jpg',
    lead: 'Kontakt Heidi på mail.', leadEn: 'Email Heidi.', phone: null, email: 'bogholderi@cleanwatersupply.dk',
  },
  {
    q: 'Skal du bruge teknisk info, installation, montering, fejlfinding, service eller filterskift?',
    qEn: 'Need technical info, installation, fitting, troubleshooting, service or filter changes?',
    person: 'Kristoffer', role: 'Tekniker & rejsemontør', roleEn: 'Technician & Field Service', photo: '/images/team-kristoffer-sq.jpg',
    lead: 'Ring eller send en mail til Kristoffer.', leadEn: 'Call or email Kristoffer.', phone: '+45 22 32 01 56', email: 'kristoffer@cleanwatersupply.dk',
  },
  {
    q: 'Skal du bruge rådgivning om salg, montering, tekniske løsninger, erhvervsprojekter, Legionella-sikring eller samarbejde?',
    qEn: 'Need advice on sales, installation, technical solutions, business projects, Legionella protection or partnerships?',
    person: 'Kenneth', role: 'Stifter & indehaver', roleEn: 'Founder & Owner', photo: '/images/team-kenneth-sq.jpg',
    lead: 'Ring eller send en mail til Kenneth – eller spørg bare om noget helt andet.', leadEn: 'Call or email Kenneth – or just ask about anything else.', phone: '+45 51 21 58 00', email: 'ksj@cleanwatersupply.dk',
  },
  {
    q: 'Skal du bruge hjælp med indkøb, salg, webshop og ordrer, produkter, hjemmeside, nyhedsbrev eller marketing?',
    qEn: 'Need help with purchasing, sales, webshop and orders, products, the website, newsletter or marketing?',
    person: 'Camilla', role: 'Salg & Marketing Manager', roleEn: 'Sales & Marketing Manager', photo: '/images/team-camilla-sq.jpg',
    lead: 'Send en mail til Camilla.', leadEn: 'Email Camilla.', phone: null, email: 'caj@cleanwatersupply.dk',
  },
]

export default function HelpFaq() {
  const { language } = useLanguage()
  const da = language !== 'en'

  return (
    <section className="py-12 sm:py-20 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">{da ? 'Vi er her for dig' : 'We’re here for you'}</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0a2540] mt-2.5">{da ? 'Skal du bruge hjælp?' : 'Need a hand?'}</h2>
          <p className="text-gray-600 text-base sm:text-lg mt-3 leading-relaxed">
            {da ? 'Find den rette hjælp her – ring eller skriv direkte til den af os, der kan hjælpe dig bedst.' : 'Find the right help here – call or email the person who can help you best.'}
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {ITEMS.map((m) => (
            <details key={m.person} className="group bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm open:shadow-md transition-shadow overflow-hidden">
              <summary className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 cursor-pointer select-none list-none font-bold text-[#0a2540] hover:bg-blue-50/40 transition-colors">
                <span>{da ? m.q : m.qEn}</span>
                <ChevronDown className="w-5 h-5 text-[#284eff] shrink-0 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-5 sm:px-6 pb-5 border-t border-blue-50 pt-4 flex items-center gap-4">
                <span className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden ring-2 ring-white shadow">
                  <img src={m.photo} alt={`${m.person} – Clean Water Supply`} className="absolute inset-0 w-full h-full object-cover" />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] text-gray-700 leading-relaxed">
                    <span className="font-bold text-[#0a2540]">{m.person}</span> · <span className="text-gray-500">{da ? m.role : m.roleEn}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">{da ? m.lead : m.leadEn}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                    {m.phone && (
                      <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a2540] hover:text-[#284eff] transition-colors">
                        <Phone className="w-3.5 h-3.5 text-[#284eff]" /> {m.phone}
                      </a>
                    )}
                    <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 text-sm text-[#284eff] hover:underline break-all">
                      <Mail className="w-3.5 h-3.5 shrink-0" /> {m.email}
                    </a>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
