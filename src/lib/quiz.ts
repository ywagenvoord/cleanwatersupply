/* ─────────────────────────────────────────────────────────────
   VANDQUIZ – indstillinger og spørgsmål
   Ret her; både pop-up og quiz-siden bruger denne fil.
   ───────────────────────────────────────────────────────────── */

/**
 * SAMTYKKE-MODEL
 *   true  = tilmelding til nyhedsbrevet er en BETINGELSE for at deltage (bundtet).
 *           Giver flest tilmeldinger, men samtykket er ikke "frit givet" efter
 *           GDPR og kan anfægtes.
 *   false = deltagelse kræver kun e-mail; nyhedsbrevet er et VALGFRIT flueben.
 *           Juridisk sikreste model.
 */
export const BUNDLED_CONSENT = true

/** Præmie og frist – vises i pop-up, på quiz-siden og i betingelserne. */
export const PRIZE       = 'et Baclyser® neo TR-filter (værdi 625 kr)'
export const PRIZE_SHORT = 'Baclyser® neo TR'
export const DEADLINE    = '31. august 2026'
/** Maskinlæsbar slutdato – banner/CTA skjules automatisk efter denne dato. */
export const DEADLINE_DATE = new Date('2026-08-31T23:59:59+02:00')

/** Sekunder før pop-up'en vises. */
export const DELAY_SECONDS = 12

/** localStorage-nøgle, så pop-up'en kun vises én gang. */
export const SEEN_KEY = 'cws-quiz-seen'

export type Question = {
  q: string
  options: string[]
  correct: number
  explain: string
}

export const QUESTIONS: Question[] = [
  {
    q: 'Ved hvilken temperatur trives Legionella-bakterien bedst?',
    options: ['5–15 °C', '30–40 °C', '70–80 °C'],
    correct: 1,
    explain:
      'Legionella trives i stillestående vand mellem 30 og 40 grader – præcis den temperatur, mange bruger i bruseren.',
  },
  {
    q: 'Hvordan spredes Legionella typisk i hjemmet?',
    options: [
      'Gennem små vanddråber i luften, fx fra bruseren',
      'Ved at drikke vandet',
      'Gennem isterninger i køleskabet',
    ],
    correct: 0,
    explain:
      'Bakterien indåndes via forstøvet vand – derfor er bruseren et af de vigtigste steder at filtrere.',
  },
  {
    q: 'Hvad sker der med koldtvandsrørene om sommeren?',
    options: [
      'De køles ned af grundvandet',
      'Der sker ingenting',
      'De varmes op og nærmer sig bakteriernes yndlingstemperatur',
    ],
    correct: 2,
    explain:
      'Sommervarmen varmer vandet i rørene op – og lige dér trives bakterierne allerbedst.',
  },
  {
    q: 'Hvor stor en del af bakterierne stopper et medicinsk godkendt filter (7 log)?',
    options: ['Ca. 90 %', 'Ca. 99 %', 'Over 99,9999 %'],
    correct: 2,
    explain:
      '7 log-retention betyder, at over 99,99999 % af bakterierne tilbageholdes – inkl. Legionella og Pseudomonas.',
  },
]

/** Tekst på resultatskærmen alt efter score. */
export function scoreHeadline(score: number, total: number): string {
  const pct = score / total
  if (pct === 1)   return 'Imponerende – fuldt hus!'
  if (pct >= 0.5)  return 'Flot klaret!'
  return 'Godt forsøgt!'
}
