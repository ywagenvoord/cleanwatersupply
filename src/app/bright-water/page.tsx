import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Droplets, ClipboardList, ShieldAlert, Info, FileText, Phone,
  CheckCircle2, ThermometerSun, ArrowRight, Beaker,
  Caravan, Truck, Sailboat, Ship, Warehouse,
} from 'lucide-react'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Bright Water® – brugsvejledning & produktinformation',
  description:
    'Sådan bruger du Bright Water til desinfektion af drikkevand i vandtanke: dosering, sikkerhed, opbevaring og produktinformation.',
  alternates: { canonical: `${SITE_URL}/bright-water` },
}

const doseTable = [
  { tank: '10 liter vand', dose: '10 ml' },
  { tank: '50 liter vand', dose: '½ dl (50 ml)' },
  { tank: '100 liter vand', dose: '1 dl (100 ml)' },
  { tank: '500 liter vand', dose: '5 dl (½ liter)' },
  { tank: '1.000 liter vand', dose: '1 liter' },
  { tank: '5.000 liter vand', dose: '5 liter' },
  { tank: '10.000 liter vand', dose: '10 liter' },
]

const steps = [
  { t: 'Mål vandmængden', b: 'Find ud af, hvor mange liter drikkevand din tank indeholder.' },
  { t: 'Doser 1 dl pr. 100 liter', b: 'Tilsæt 1,0 ml Bright Water (500 mg/L) pr. liter vand – dvs. 1 dl pr. 100 liter eller 1 liter pr. 1.000 liter.' },
  { t: 'Rør rundt', b: 'Bland produktet godt, så det fordeles jævnt i hele vandmængden.' },
  { t: 'Luk til', b: 'Luk tanken og emballagen godt til efter brug.' },
]

// Blandingsforhold: 1,0 ml pr. liter vand = 1:1000.
const dunke = [
  { size: '1 liter dunk', water: 'op til 1.000 liter vand' },
  { size: '5 liter dunk', water: 'op til 5.000 liter vand' },
  { size: '20 liter dunk', water: 'op til 20.000 liter vand' },
]

// Typiske anvendelsesområder med vejledende tankstørrelse og dosering (1,0 ml/liter).
const omraader = [
  { Icon: Caravan, sted: 'Campingvogn', tank: 'ca. 40 liter tank', dose: 'ca. ½ dl (40 ml)' },
  { Icon: Truck, sted: 'Autocamper', tank: 'ca. 100 liter tank', dose: '1 dl (100 ml)' },
  { Icon: Sailboat, sted: 'Sejlbåd / motorbåd', tank: 'ca. 200 liter tank', dose: '2 dl (200 ml)' },
  { Icon: Ship, sted: 'Større fartøj / husbåd', tank: 'ca. 500 liter tank', dose: '5 dl (½ liter)' },
  { Icon: Warehouse, sted: 'Land- & gårdtank (IBC)', tank: 'ca. 1.000 liter tank', dose: '1 liter' },
]

export default function BrightWaterGuide() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white text-[#0a2540] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest ring-1 ring-blue-100 shadow-sm">
            <Droplets className="w-3.5 h-3.5 text-[#3aad4a]" />
            PT5 · Vand-desinfektion
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a2540] mb-4">
            Bright Water® – brugsvejledning
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Til desinfektion af drikkevand i vandtanke. Her finder du dosering, anvendelse,
            sikkerhed og al produktinformation.
          </p>
        </div>
      </section>

      {/* BRUGSVEJLEDNING + DOSERINGSTABEL side om side */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-start">
          {/* Sådan bruger du */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center">
                <ClipboardList className="w-5 h-5" />
              </span>
              <h2 className="text-2xl font-extrabold text-[#0a2540]">Sådan bruger du Bright Water</h2>
            </div>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <div key={s.t} className="flex items-start gap-4 bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-4">
                  <span className="w-9 h-9 shrink-0 rounded-full bg-[#3aad4a] text-white font-extrabold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-[#0a2540]">{s.t}</p>
                    <p className="text-sm text-gray-600 mt-0.5 leading-relaxed">{s.b}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-2xl bg-blue-50/60 ring-1 ring-blue-100 p-4">
              <Info className="w-5 h-5 text-[#284eff] shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 leading-relaxed">
                Ved en produktkoncentration på 500 mg/L giver 1,0 ml pr. liter ca. 0,5 ppm aktivt klor
                i det behandlede vand. Koncentrationen i det behandlede drikkevand må ikke overstige
                0,5 mg/L (0,5 ppm). Læs altid etiketten før brug.
              </p>
            </div>
          </div>

          {/* Doseringstabel */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center">
                <Beaker className="w-5 h-5" />
              </span>
              <h2 className="text-2xl font-extrabold text-[#0a2540]">Doseringstabel</h2>
            </div>
            <div className="overflow-hidden rounded-2xl ring-1 ring-blue-100 bg-white shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-blue-50/70 text-[#0a2540] text-sm">
                    <th className="px-5 py-3 font-bold">Vandmængde</th>
                    <th className="px-5 py-3 font-bold">Bright Water</th>
                  </tr>
                </thead>
                <tbody>
                  {doseTable.map((r, i) => (
                    <tr key={r.tank} className={i % 2 ? 'bg-white' : 'bg-blue-50/20'}>
                      <td className="px-5 py-2.5 text-gray-700">{r.tank}</td>
                      <td className="px-5 py-2.5 font-bold text-[#0a2540]">{r.dose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">Tommelfingerregel: 1 dl pr. 100 liter vand · 1 liter pr. 1.000 liter vand (blandingsforhold 1:1000).</p>
          </div>
        </div>
      </section>

      {/* ANVENDELSE + DUNKE */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </span>
            <h2 className="text-2xl font-extrabold text-[#0a2540]">Hvor bruges Bright Water?</h2>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed max-w-3xl">
            Bright Water giver rent, sikkert drikkevand i vandtanke – fx på campingvogn, autocamper og
            sejlbåd. Herunder er vejledende tankstørrelser og dosering. Mål altid din egen tank og
            regn med 1,0 ml pr. liter (1 dl pr. 100 liter).
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {omraader.map(({ Icon, sted, tank, dose }) => (
              <div key={sted} className="bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-5">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-bold text-[#0a2540]">{sted}</p>
                <p className="text-sm text-gray-500 mt-0.5">{tank}</p>
                <p className="text-sm font-bold text-[#3aad4a] mt-2">Dosering: {dose}</p>
              </div>
            ))}
            {/* Fås i-kort som del af samme grid, så rækken fyldes ud */}
            <div className="rounded-2xl bg-[#0a2540] text-white shadow-sm p-5 flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-200 mb-2">Fås i tre størrelser</p>
              <p className="text-sm leading-relaxed text-blue-100">
                1, 5 og 20 liter. Samme blandingsforhold: 1,0 ml pr. liter. En 1-liters dunk behandler
                op til 1.000 liter, 5-liters op til 5.000 liter og 20-liters op til 20.000 liter vand.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Tankstørrelserne er vejledende og varierer fra model til model – tjek din egen tanks volumen.
          </p>
        </div>
      </section>

      {/* SIKKERHED + PRODUKTINFORMATION side om side */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-start">
          {/* Sikkerhed & opbevaring */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 ring-1 ring-rose-100 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <h2 className="text-2xl font-extrabold text-[#0a2540]">Sikkerhed & opbevaring</h2>
            </div>
            <div className="rounded-2xl bg-rose-50/70 ring-1 ring-rose-200 p-5 mb-4">
              <p className="font-bold text-rose-800">
                Må ikke opbevares sammen med fødevarer, drikkevarer og foderstoffer.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { Icon: FileText, t: 'Kun i originalemballage', b: 'Opbevar altid produktet i den originale beholder – godt lukket.' },
                { Icon: ThermometerSun, t: 'Undgå sol & varme', b: 'Undgå direkte sollys. Tåler ikke temperaturer over 60 °C.' },
                { Icon: ShieldAlert, t: 'Kan være korrosivt', b: 'Produktet kan være korrosivt på visse metaller.' },
                { Icon: Droplets, t: 'Holdbarhed', b: 'Uåbnet: 1 år efter fremstillingsdato (se flasken). Efter åbning: 6 måneder.' },
              ].map(({ Icon, t, b }) => (
                <div key={t} className="bg-white rounded-2xl ring-1 ring-blue-100 shadow-sm p-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-[#0a2540]">{t}</p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Produktinformation */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center">
                <Info className="w-5 h-5" />
              </span>
              <h2 className="text-2xl font-extrabold text-[#0a2540]">Produktinformation</h2>
            </div>
            <div className="rounded-2xl bg-white ring-1 ring-blue-100 shadow-sm divide-y divide-blue-50">
              {[
                ['Produkttype', 'PT5 – desinfektion af drikkevand'],
                ['Formuleringstype', 'AL – andre væsker'],
                ['Indhold', '500 mg/l aktivt klor frigivet fra hypoklorsyre'],
                ['Maks. koncentration i behandlet vand', '0,5 mg/l (0,5 ppm)'],
                ['PR-nr.', '4332417'],
                ['UFI', '3XQP-M6FR-E00E-9UTW'],
                ['Godkendelsesindehaver', 'Pureclean.eu ApS, Runddelsvej 17, 8930 Randers'],
                ['Distribueret af', 'Clean Water Supply ApS, Strømøvej 3, 8700 Horsens'],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 px-5 py-3">
                  <span className="text-sm font-bold text-[#0a2540] sm:w-56 shrink-0">{k}</span>
                  <span className="text-sm text-gray-600">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOADS / HJÆLP */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/contact"
              className="group bg-white rounded-2xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 shadow-sm hover:shadow-md transition-all p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <p className="font-bold text-[#0a2540] mb-1">Sikkerhedsdatablad (SDS)</p>
              <p className="text-sm text-gray-600 mb-3">Rekvirér det fulde sikkerhedsdatablad for Bright Water.</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#3aad4a]">
                Kontakt os <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
            <Link
              href="/contact"
              className="group bg-white rounded-2xl ring-1 ring-blue-100 hover:ring-[#3aad4a]/40 shadow-sm hover:shadow-md transition-all p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#284eff] ring-1 ring-blue-100 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <p className="font-bold text-[#0a2540] mb-1">Spørgsmål?</p>
              <p className="text-sm text-gray-600 mb-3">Vi hjælper dig gerne med brug, dosering og bestilling.</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#3aad4a]">
                Kontakt Clean Water Supply <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
          <p className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-6 text-center">
            <CheckCircle2 className="w-4 h-4 text-[#3aad4a] shrink-0" />
            Læs altid produktets etiket før brug.
          </p>
        </div>
      </section>
    </main>
  )
}
