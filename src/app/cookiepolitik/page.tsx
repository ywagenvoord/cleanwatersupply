import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import CookieSettingsButton from './CookieSettingsButton'

export const metadata: Metadata = {
  title: 'Cookiepolitik',
  description:
    'Læs om de cookies vi bruger på cleanwatersupply.dk — nødvendige, statistik og marketing. Du kan altid ændre dine indstillinger.',
  alternates: { canonical: `${SITE_URL}/cookiepolitik` },
  robots: { index: true, follow: true },
}

export default function CookiepolitikPage() {
  const updated = new Date().toLocaleDateString('da-DK', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <main className="bg-gray-50 min-h-screen py-16 sm:py-24">
      <article className="max-w-3xl mx-auto px-6 lg:px-8">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#3aad4a]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#3aad4a]">Juridisk</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0a2540] leading-tight tracking-tight mb-3">Cookiepolitik</h1>
          <p className="text-sm text-gray-400">Sidst opdateret: {updated}</p>
        </header>

        <div className="space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            På cleanwatersupply.dk bruger vi cookies for at få hjemmesiden til at fungere, forstå hvordan du bruger den, og vise dig relevante annoncer. Du bestemmer selv, hvilke cookies du vil tillade.
          </p>

          <h2 className="text-2xl font-extrabold text-[#0a2540] mt-10 mb-2">Hvad er cookies?</h2>
          <p className="text-gray-700 leading-relaxed">
            Cookies er små tekstfiler, som din browser gemmer, når du besøger en hjemmeside. De bruges blandt andet til at huske dine valg (fx indhold i indkøbskurven), måle trafikken på sitet og vise dig relevante annoncer.
          </p>

          <h2 className="text-2xl font-extrabold text-[#0a2540] mt-10 mb-2">Hvilke cookies bruger vi?</h2>

          <h3 className="text-xl font-bold text-[#0a2540] mt-6 mb-2">1. Nødvendige cookies (altid aktive)</h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            Disse cookies er nødvendige, for at hjemmesiden kan fungere korrekt. Du kan ikke slå dem fra. De bruges fx til:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
            <li>Indkøbskurv og checkout</li>
            <li>Session-håndtering og sikkerhed</li>
            <li>Dine cookie-præferencer</li>
          </ul>

          <h3 className="text-xl font-bold text-[#0a2540] mt-6 mb-2">2. Statistik (valgfri)</h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            Hjælper os med at forstå, hvordan hjemmesiden bruges, så vi kan gøre den bedre. Vi bruger:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
            <li><strong>Google Analytics</strong> — måler sidevisninger, klik og brugsmønstre. Data behandles anonymiseret.</li>
          </ul>

          <h3 className="text-xl font-bold text-[#0a2540] mt-6 mb-2">3. Marketing (valgfri)</h3>
          <p className="text-gray-700 leading-relaxed mb-2">
            Bruges til at vise dig relevante annoncer og måle effekten af vores markedsføring. Vi bruger:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
            <li><strong>Google Ads & Meta (Facebook/Instagram)</strong> — måler, om vores annoncer fører til køb eller henvendelser, og viser relevante annoncer.</li>
          </ul>

          <h2 className="text-2xl font-extrabold text-[#0a2540] mt-10 mb-2">Dit samtykke</h2>
          <p className="text-gray-700 leading-relaxed">
            Vi beder om dit samtykke, første gang du besøger sitet. Dit valg gemmes i din browser i 12 måneder. Herefter beder vi dig igen.
          </p>
          <p className="text-gray-700 leading-relaxed">Du kan til enhver tid ændre dine indstillinger ved at klikke på knappen nedenfor:</p>
          <div className="my-6">
            <CookieSettingsButton />
          </div>

          <h2 className="text-2xl font-extrabold text-[#0a2540] mt-10 mb-2">Dine rettigheder (GDPR)</h2>
          <p className="text-gray-700 leading-relaxed">
            Du har ret til at trække dit samtykke tilbage, når som helst, og du har ret til indsigt i, berigtigelse eller sletning af de personoplysninger, vi behandler om dig.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Kontakt os på{' '}
            <a href="mailto:info@cleanwatersupply.dk" className="text-[#3aad4a] font-semibold hover:underline">info@cleanwatersupply.dk</a>{' '}
            hvis du har spørgsmål om dine rettigheder, eller hvis du vil klage til Datatilsynet på{' '}
            <a href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" className="text-[#3aad4a] font-semibold hover:underline">datatilsynet.dk</a>.
          </p>

          <h2 className="text-2xl font-extrabold text-[#0a2540] mt-10 mb-2">Dataansvarlig</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Clean Water Supply ApS</strong><br />
            Strømøvej 3, 8700 Horsens<br />
            CVR: 44405563<br />
            E-mail: <a href="mailto:info@cleanwatersupply.dk" className="text-[#3aad4a] font-semibold hover:underline">info@cleanwatersupply.dk</a><br />
            Telefon: <a href="tel:+4551215800" className="text-[#3aad4a] font-semibold hover:underline">+45 51 21 58 00</a>
          </p>
        </div>
      </article>
    </main>
  )
}
