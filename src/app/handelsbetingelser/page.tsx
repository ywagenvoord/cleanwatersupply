import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, ArrowLeft } from 'lucide-react'
import { SITE_URL } from '@/lib/site'


export const metadata: Metadata = {
  title: 'Handelsbetingelser – Køb, levering & fortrydelsesret',
  description:
    'Handelsbetingelser hos Clean Water Supply: priser, levering, betaling med Stripe og MobilePay, 14 dages fortrydelsesret og garanti på vandfiltre.',
  alternates: { canonical: `${SITE_URL}/handelsbetingelser` },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <main className="bg-white py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 no-underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Tilbage til forsiden
        </Link>
        <h1 className="text-4xl font-extrabold text-[#0a2540] mb-4">Handelsbetingelser</h1>
        <p className="text-sm text-gray-500">Senest opdateret: {new Date().toLocaleDateString('da-DK')}</p>

        <h2>1. Sælger</h2>
        <p>
          Clean Water Supply ApS, CVR 44405563, Strømøvej 3, 8700 Horsens.<br />
          E-mail: <a href="mailto:info@cleanwatersupply.dk">info@cleanwatersupply.dk</a> · Tlf:{' '}
          <a href="tel:+4551215800">+45 51 21 58 00</a>
        </p>

        <h2>2. Priser</h2>
        <p>
          Alle priser er i danske kroner (DKK) og inkl. 25% moms. Der kan tillægges fragt afhængigt af leveringsland og
          ordrestørrelse. Forbehold for prisændringer og udsolgte varer.
        </p>

        <h2>3. Bestilling og aftaleindgåelse</h2>
        <p>
          Når du gennemfører et køb, modtager du en ordrebekræftelse pr. e-mail. Bindende købsaftale er indgået, når
          ordrebekræftelsen er afsendt.
        </p>

        <h2>4. Betaling</h2>
        <p>
          Vi modtager betaling med Visa, Mastercard, American Express og MobilePay via Stripe (PCI-DSS Level 1
          certificeret). Beløbet trækkes ved afsendelse af din ordre.
        </p>

        <h2>5. Levering</h2>
        <ul>
          <li><strong>Danmark:</strong> 1-3 hverdage</li>
          <li><strong>Sverige, Norge, Tyskland, Holland, Belgien:</strong> 3-5 hverdage</li>
          <li>Fragt beregnes ved kassen</li>
        </ul>

        <h2>6. Fortrydelsesret</h2>
        <p>
          Du har 14 dages fortrydelsesret regnet fra modtagelsen af varen. Returnering skal ske i original og ubrudt
          emballage. Returomkostninger afholdes af køber, medmindre andet aftales.
        </p>
        <p>
          Send en e-mail til <a href="mailto:info@cleanwatersupply.dk">info@cleanwatersupply.dk</a> for at gøre brug af
          fortrydelsesretten.
        </p>

        <h2>7. Reklamation</h2>
        <p>
          Du har 24 måneders reklamationsret efter købelovens regler. Hvis du opdager en mangel, skal du reklamere inden
          for "rimelig tid". Kontakt os, og vi finder en løsning – typisk reparation, ombytning eller refusion.
        </p>

        <h2>8. Garanti</h2>
        <p>
          Vores Legionella-filtre og blødgøringsanlæg leveres med producentens fabriksgaranti. Specifikke garantivilkår
          fremgår af det enkelte produkt og medfølgende dokumentation.
        </p>

        <h2>9. Klagemuligheder</h2>
        <p>
          Klager kan indgives til Center for Klageløsning (Konkurrence- og Forbrugerstyrelsen, Carl Jacobsens Vej 35,
          2500 Valby, <a href="https://www.forbrug.dk" rel="noopener">forbrug.dk</a>) eller via EU's online
          tvistbilæggelsesplatform: <a href="https://ec.europa.eu/consumers/odr/" rel="noopener">ec.europa.eu/consumers/odr</a>.
        </p>

        <h2>10. Persondata</h2>
        <p>Se vores <Link href="/privatlivspolitik">privatlivspolitik</Link> for behandling af persondata.</p>

        <h2>11. Lovvalg og værneting</h2>
        <p>Aftalen er underlagt dansk ret. Tvister afgøres ved Retten i Horsens.</p>

        <p className="not-prose flex flex-col gap-2 bg-gray-50 rounded-2xl p-6 mt-8">
          <span className="font-bold text-[#0a2540]">Spørgsmål til betingelserne?</span>
          <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#3aad4a]" /> <a href="mailto:info@cleanwatersupply.dk">info@cleanwatersupply.dk</a></span>
          <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#3aad4a]" /> <a href="tel:+4551215800">+45 51 21 58 00</a></span>
        </p>
      </article>
    </main>
  )
}
