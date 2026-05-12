import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, ArrowLeft } from 'lucide-react'

const SITE_URL = 'https://cleanwatersupply-rose.vercel.app'

export const metadata: Metadata = {
  title: 'Privatlivspolitik – Persondatabehandling',
  description:
    'Sådan håndterer Clean Water Supply ApS dine persondata: hvilke oplysninger vi indsamler, hvordan vi bruger dem og dine rettigheder under GDPR.',
  alternates: { canonical: `${SITE_URL}/privatlivspolitik` },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <main className="bg-white py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 no-underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Tilbage til forsiden
        </Link>
        <h1 className="text-4xl font-extrabold text-[#0a2540] mb-4">Privatlivspolitik</h1>
        <p className="text-sm text-gray-500">Senest opdateret: {new Date().toLocaleDateString('da-DK')}</p>

        <h2>1. Dataansvarlig</h2>
        <p>
          Clean Water Supply ApS (CVR 44405563), Strømøvej 3, 8700 Horsens, er dataansvarlig for behandlingen af dine
          personoplysninger. Du kan kontakte os på{' '}
          <a href="mailto:info@cleanwatersupply.dk">info@cleanwatersupply.dk</a> eller{' '}
          <a href="tel:+4551215800">+45 51 21 58 00</a>.
        </p>

        <h2>2. Hvilke oplysninger indsamler vi?</h2>
        <ul>
          <li><strong>Kontaktoplysninger:</strong> navn, e-mail, telefon når du udfylder kontaktformularen.</li>
          <li><strong>Ordreoplysninger:</strong> leverings- og faktureringsadresse ved køb gennem Stripe.</li>
          <li><strong>Tekniske oplysninger:</strong> IP-adresse, browser, enhed (anonymt) til driftsformål.</li>
        </ul>

        <h2>3. Formål med behandlingen</h2>
        <ul>
          <li>Levere bestilte produkter og service</li>
          <li>Besvare henvendelser og rådgivning</li>
          <li>Opfylde lovkrav (bogføring, garanti)</li>
        </ul>

        <h2>4. Retsgrundlag</h2>
        <p>
          Behandlingen sker på baggrund af aftaleopfyldelse (GDPR art. 6, stk. 1, litra b), retlig forpligtelse (litra c)
          og legitime interesser (litra f).
        </p>

        <h2>5. Videregivelse</h2>
        <p>
          Vi deler kun data med betroede databehandlere: Stripe (betalingsbehandling), Vercel (hosting), FormSubmit
          (formularhåndtering). Alle har databehandleraftaler og overholder GDPR.
        </p>

        <h2>6. Opbevaring</h2>
        <p>
          Ordredata opbevares i 5 år (bogføringsloven). Kontaktdata slettes 24 måneder efter sidste interaktion,
          medmindre andet er aftalt.
        </p>

        <h2>7. Dine rettigheder</h2>
        <p>Du har ret til indsigt, berigtigelse, sletning, begrænsning og dataportabilitet. Kontakt os for at gøre brug af disse rettigheder. Du kan også klage til Datatilsynet (datatilsynet.dk).</p>

        <h2>8. Cookies</h2>
        <p>
          Vi bruger kun strengt nødvendige cookies til at drive webshoppen og kurven. Vi sætter ikke marketing- eller
          tracking-cookies uden samtykke.
        </p>

        <h2>9. Kontakt</h2>
        <p className="not-prose flex flex-col gap-2 bg-gray-50 rounded-2xl p-6 mt-8">
          <span className="font-bold text-[#0a2540]">Spørgsmål om privatliv?</span>
          <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-[#3aad4a]" /> <a href="mailto:info@cleanwatersupply.dk">info@cleanwatersupply.dk</a></span>
          <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#3aad4a]" /> <a href="tel:+4551215800">+45 51 21 58 00</a></span>
        </p>
      </article>
    </main>
  )
}
