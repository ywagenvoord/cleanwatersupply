import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Mail, Phone, ArrowLeft, RotateCcw, PackageOpen, ShieldCheck,
  Wallet, Clock, Mail as MailIcon, Box, Send, Wrench,
} from 'lucide-react'
import { SITE_URL } from '@/lib/site'


export const metadata: Metadata = {
  title: 'Returpolitik – fortrydelsesret & returnering',
  description:
    'Returpolitik hos Clean Water Supply: 14 dages fortrydelsesret, sådan returnerer du, returomkostninger og refundering. Undtagelse for forseglede hygiejneprodukter.',
  alternates: { canonical: `${SITE_URL}/returpolitik` },
  robots: { index: true, follow: true },
}

export default function ReturnPolicyPage() {
  const quickFacts = [
    { icon: Clock, title: '14 dages fortrydelsesret', text: 'Fra den dag du modtager varen.' },
    { icon: RotateCcw, title: 'Nem returnering', text: 'Skriv til os, så guider vi dig igennem.' },
    { icon: Wallet, title: 'Hurtig refundering', text: 'Pengene retur til din betalingsmetode.' },
  ]

  const steps = [
    { icon: MailIcon, title: 'Giv os besked', text: 'Skriv til info@cleanwatersupply.dk inden for 14 dage, og fortæl at du vil returnere.' },
    { icon: Box, title: 'Pak varen', text: 'Pak varen forsvarligt – gerne i den originale emballage.' },
    { icon: Send, title: 'Send retur', text: 'Send til Clean Water Supply ApS, Strømøvej 3, 8700 Horsens – gerne med sporbar forsendelse.' },
  ]

  return (
    <main className="bg-white">
      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eef8f1] via-[#f5fbff] to-white">
        <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#3aad4a]/10 blur-3xl" />
        <div className="pointer-events-none absolute top-6 -right-24 w-96 h-96 rounded-full bg-[#284eff]/10 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-8">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#0a2540] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Tilbage til forsiden
          </Link>
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm ring-1 ring-green-100 px-4 py-1.5 mb-5 shadow-sm">
            <RotateCcw className="w-3.5 h-3.5 text-[#3aad4a]" />
            <span className="text-[11px] font-bold text-[#2e9a3d] uppercase tracking-widest">Returpolitik</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0a2540] leading-[1.05] tracking-tight">Returnering & fortrydelse</h1>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Har du fortrudt, eller er der noget galt med varen, hjælper vi dig gerne. Herunder kan du læse, hvordan du returnerer.
          </p>
          <p className="text-xs text-gray-400 mt-4">Senest opdateret: {new Date().toLocaleDateString('da-DK')}</p>
        </div>
      </section>

      {/* ─── QUICK FACTS ───────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {quickFacts.map((f) => (
            <div key={f.title} className="rounded-2xl bg-white ring-1 ring-blue-100/70 shadow-sm p-5 flex flex-col">
              <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3aad4a] to-[#2e9a3d] flex items-center justify-center mb-3 shadow-lg shadow-green-500/20">
                <f.icon className="w-5 h-5 text-white" strokeWidth={2} />
              </span>
              <h3 className="text-sm font-extrabold text-[#0a2540] leading-tight">{f.title}</h3>
              <p className="text-[13px] text-gray-500 mt-1.5 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SÅDAN RETURNERER DU ───────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <span className="text-[11px] font-black text-[#284eff] uppercase tracking-widest">3 enkle trin</span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a2540] mt-1.5">Sådan returnerer du</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl bg-white ring-1 ring-blue-100/70 shadow-sm p-6 pt-7">
              <span className="absolute -top-3.5 left-6 w-9 h-9 rounded-full bg-gradient-to-br from-[#284eff] to-[#1b32c9] text-white text-sm font-black flex items-center justify-center shadow-lg shadow-[#284eff]/25">
                {i + 1}
              </span>
              <s.icon className="w-6 h-6 text-[#3aad4a] mb-2.5 mt-1" strokeWidth={2} />
              <h3 className="text-sm font-extrabold text-[#0a2540] leading-tight">{s.title}</h3>
              <p className="text-[13px] text-gray-600 mt-1.5 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center mt-6">
          Varen skal sendes retur uden unødig forsinkelse og senest 14 dage efter, du har givet os besked.
        </p>
      </section>

      {/* ─── DETALJER ──────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-8 space-y-4">
        {/* Fortrydelsesret */}
        <div className="rounded-3xl bg-gradient-to-br from-[#f5fbff] to-white ring-1 ring-blue-100/60 p-7">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-white ring-1 ring-blue-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#284eff]" />
            </span>
            <h2 className="text-xl font-extrabold text-[#0a2540]">14 dages fortrydelsesret</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Du har 14 dages fortrydelsesret, regnet fra den dag du modtager varen. Vil du fortryde købet, skal du give os
            besked inden for fristen – send en e-mail til{' '}
            <a href="mailto:info@cleanwatersupply.dk" className="text-[#284eff] font-semibold">info@cleanwatersupply.dk</a>. Du kan
            bruge den lovbestemte standardfortrydelsesformular, men det er ikke et krav.
          </p>
        </div>

        {/* Varens stand / emballage */}
        <div className="rounded-3xl bg-gradient-to-br from-[#eef8f1] to-white ring-1 ring-green-100/70 p-7">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-white ring-1 ring-green-100 flex items-center justify-center">
              <PackageOpen className="w-5 h-5 text-[#3aad4a]" />
            </span>
            <h2 className="text-xl font-extrabold text-[#0a2540]">Varens stand ved returnering</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Varen skal returneres i væsentlig samme stand og mængde, som du modtog den, og den originale emballage skal så
            vidt muligt være ubrudt og intakt. Du må gerne åbne emballagen og undersøge varen, som du ville kunne i en
            fysisk butik, men du hæfter for en eventuel værdiforringelse, hvis varen er håndteret ud over, hvad der er
            nødvendigt for at fastslå dens art, egenskaber og måden, den fungerer på.
          </p>
        </div>

        {/* Forseglede hygiejneprodukter */}
        <div className="rounded-3xl bg-white ring-1 ring-gray-100 shadow-sm p-7">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-gray-50 ring-1 ring-gray-100 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#3aad4a]" />
            </span>
            <h2 className="text-xl font-extrabold text-[#0a2540]">Forseglede hygiejneprodukter</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Visse af vores produkter (fx filtre og patroner) leveres forseglet af sundheds- og hygiejnemæssige årsager.
            For disse varer er det et krav, at forseglingen og emballagen er ubrudt ved returnering. Brydes forseglingen
            efter levering, bortfalder fortrydelsesretten for den pågældende vare, jf. forbrugeraftalelovens § 18, stk. 2,
            nr. 5.
          </p>
        </div>

        {/* Returomkostninger + refundering (to-kolonne) */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-3xl bg-white ring-1 ring-gray-100 shadow-sm p-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-gray-50 ring-1 ring-gray-100 flex items-center justify-center">
                <Send className="w-5 h-5 text-[#284eff]" />
              </span>
              <h2 className="text-lg font-extrabold text-[#0a2540]">Returomkostninger</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Du afholder selv omkostningerne ved returnering, medmindre andet er aftalt. Send gerne med et sporbart
              forsendelsesbevis, så du kan dokumentere returneringen.
            </p>
          </div>
          <div className="rounded-3xl bg-white ring-1 ring-gray-100 shadow-sm p-7">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-xl bg-gray-50 ring-1 ring-gray-100 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[#3aad4a]" />
              </span>
              <h2 className="text-lg font-extrabold text-[#0a2540]">Refundering</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              Vi refunderer betalingen, når vi har modtaget varen retur – eller når du har dokumenteret, at den er sendt
              tilbage. Beløbet tilbageføres til den betalingsmetode, du brugte ved købet.
            </p>
          </div>
        </div>

        {/* Reklamation */}
        <div className="rounded-3xl bg-white ring-1 ring-gray-100 shadow-sm p-7">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-gray-50 ring-1 ring-gray-100 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-[#3aad4a]" />
            </span>
            <h2 className="text-xl font-extrabold text-[#0a2540]">Reklamation (fejl og mangler)</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Ud over fortrydelsesretten har du 24 måneders reklamationsret efter købelovens regler. Opdager du en mangel,
            skal du reklamere inden for "rimelig tid". Kontakt os, og vi finder en løsning – typisk reparation, ombytning
            eller refusion. Ved berettiget reklamation refunderer vi også rimelige fragtomkostninger.
          </p>
        </div>

        <p className="text-sm text-gray-500 text-center pt-2">
          Se også vores <Link href="/handelsbetingelser" className="text-[#284eff] font-semibold">handelsbetingelser</Link> for de fulde vilkår.
        </p>
      </section>

      {/* ─── KONTAKT ───────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a2540] to-[#123a63] p-8 md:p-10 text-center">
          <div className="pointer-events-none absolute -top-14 -left-10 w-56 h-56 rounded-full bg-[#3aad4a]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 w-64 h-64 rounded-full bg-[#284eff]/20 blur-3xl" />
          <h2 className="relative text-xl md:text-2xl font-extrabold text-white mb-2">Spørgsmål om returnering?</h2>
          <p className="relative text-blue-100/80 mb-6">Vi sidder klar til at hjælpe dig.</p>
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:info@cleanwatersupply.dk" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3aad4a] hover:bg-[#2e9a3d] text-white font-bold px-7 py-3.5 text-sm transition-colors">
              <Mail className="w-4 h-4" /> info@cleanwatersupply.dk
            </a>
            <a href="tel:+4551215800" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 hover:bg-white/10 text-white font-semibold px-7 py-3.5 text-sm transition-colors">
              <Phone className="w-4 h-4" /> +45 51 21 58 00
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
