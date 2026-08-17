import Link from 'next/link'
import type { Metadata } from 'next'
import { Home, ShoppingBag, Droplets, Phone, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Siden blev ikke fundet (404)',
  description:
    'Vi har fået ny hjemmeside, og siden du leder efter er måske flyttet. Find vores filtre, blødgøringsanlæg og løsninger via linkene her.',
  robots: { index: false, follow: true },
}

const links = [
  { href: '/shop', icon: ShoppingBag, title: 'Shop', text: 'Filtre, blødgøringsanlæg og vandkander' },
  { href: '/solutions', icon: Droplets, title: 'Løsninger', text: 'Legionella, kalk, ECA-vand og mere' },
  { href: '/', icon: Home, title: 'Forsiden', text: 'Tilbage til start' },
  { href: '/contact', icon: Phone, title: 'Kontakt', text: 'Vi hjælper dig med at finde det rette' },
]

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#284eff]">Fejl 404</p>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0a2540]">
          Vi kunne ikke finde siden
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Vi har fået ny hjemmeside, så nogle gamle links er flyttet. Du finder alt vores igen
          via genvejene herunder – eller søg direkte i shoppen.
        </p>

        <div className="mt-10 grid sm:grid-cols-2 gap-4 text-left">
          {links.map(({ href, icon: Icon, title, text }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-5 transition hover:bg-blue-50 hover:border-blue-200"
            >
              <span className="w-11 h-11 shrink-0 rounded-xl bg-white text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <span>
                <span className="flex items-center gap-1 font-bold text-[#0a2540]">
                  {title}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
                </span>
                <span className="block text-sm text-gray-600 mt-0.5">{text}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[#284eff] px-7 py-3 font-bold text-white shadow-sm transition hover:bg-[#1e3fd8]"
          >
            Gå til shoppen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
