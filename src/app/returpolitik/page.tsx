import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, ArrowLeft } from 'lucide-react'
import { SITE_URL } from '@/lib/site'


export const metadata: Metadata = {
  title: 'Returpolitik – fortrydelsesret & returnering',
  description:
    'Returpolitik hos Clean Water Supply: 14 dages fortrydelsesret, sådan returnerer du, returomkostninger og refundering. Undtagelse for forseglede hygiejneprodukter.',
  alternates: { canonical: `${SITE_URL}/returpolitik` },
  robots: { index: true, follow: true },
}

export default function ReturnPolicyPage() {
  return (
    <main className="bg-white py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 no-underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Tilbage til forsiden
        </Link>
        <h1 className="text-4xl font-extrabold text-[#0a2540] mb-4">Returpolitik</h1>
        <p className="text-sm text-gray-500">Senest opdateret: {new Date().toLocaleDateString('da-DK')}</p>

        <p>
          Vi vil gerne have, at du er tilfreds med dit køb hos Clean Water Supply. Er du fortrudt, eller er der noget
          galt med varen, hjælper vi dig gerne. Herunder kan du læse, hvordan du returnerer.
        </p>

        <h2>14 dages fortrydelsesret</h2>
        <p>
          Du har 14 dages fortrydelsesret, regnet fra den dag du modtager varen. Vil du fortryde købet, skal du give os
          besked inden for fristen – send en e-mail til{' '}
          <a href="mailto:info@cleanwatersupply.dk">info@cleanwatersupply.dk</a>. Du kan bruge den lovbestemte
          standardfortrydelsesformular, men det er ikke et krav.
        </p>
        <p>
          Du må gerne åbne emballagen og undersøge varen, som du ville kunne i en fysisk butik, uden at miste
          fortrydelsesretten. Du hæfter dog for en eventuel værdiforringelse, hvis varen er håndteret ud over, hvad der
          er nødvendigt for at fastslå dens art, egenskaber og måden, den fungerer på.
        </p>

        <h2>Undtagelse for forseglede hygiejneprodukter</h2>
        <p>
          Visse af vores produkter (fx filtre og patroner) leveres forseglet af sundheds- og hygiejnemæssige årsager.
          Brydes forseglingen efter levering, bortfalder fortrydelsesretten for den pågældende vare, jf.
          forbrugeraftalelovens § 18, stk. 2, nr. 5.
        </p>

        <h2>Sådan returnerer du</h2>
        <ol>
          <li>Skriv til <a href="mailto:info@cleanwatersupply.dk">info@cleanwatersupply.dk</a> inden for 14 dage og fortæl, at du vil returnere.</li>
          <li>Pak varen forsvarligt – gerne i den originale emballage.</li>
          <li>Send varen retur til: <strong>Clean Water Supply ApS, Strømøvej 3, 8700 Horsens</strong>.</li>
        </ol>
        <p>
          Varen skal sendes retur uden unødig forsinkelse og senest 14 dage efter, du har givet os besked.
        </p>

        <h2>Returomkostninger</h2>
        <p>
          Du afholder selv omkostningerne ved returnering, medmindre andet er aftalt. Vi anbefaler, at du sender varen
          med et sporbart forsendelsesbevis, så du kan dokumentere, at den er sendt tilbage.
        </p>

        <h2>Refundering</h2>
        <p>
          Vi refunderer betalingen, når vi har modtaget varen retur – eller når du har dokumenteret, at den er sendt
          tilbage. Beløbet tilbageføres til den betalingsmetode, du brugte ved købet.
        </p>

        <h2>Reklamation (fejl og mangler)</h2>
        <p>
          Ud over fortrydelsesretten har du 24 måneders reklamationsret efter købelovens regler. Opdager du en mangel,
          skal du reklamere inden for "rimelig tid". Kontakt os, og vi finder en løsning – typisk reparation, ombytning
          eller refusion. Ved berettiget reklamation refunderer vi også rimelige fragtomkostninger.
        </p>

        <p>
          Se også vores <Link href="/handelsbetingelser">handelsbetingelser</Link> for de fulde vilkår.
        </p>

        <p className="not-prose flex flex-col gap-2 bg-gray-50 rounded-2xl p-6 mt-8">
          <span className="font-bold text-[#0a2540]">Spørgsmål om returnering?</span>
          <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#3aad4a]" /> <a href="mailto:info@cleanwatersupply.dk">info@cleanwatersupply.dk</a></span>
          <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#3aad4a]" /> <a href="tel:+4551215800">+45 51 21 58 00</a></span>
        </p>
      </article>
    </main>
  )
}
