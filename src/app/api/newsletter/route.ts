import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Nyhedsbrevs-tilmelding via Mailchimp.
 *
 * Mailchimp sender selv bekræftelsesmail (double opt-in) og håndterer
 * afmelding — det er dét, GDPR kræver.
 *
 * Kræver i .env.local + Netlify:
 *   MAILCHIMP_API_KEY      (fx abc123...-us21 — datacenteret står efter bindestregen)
 *   MAILCHIMP_AUDIENCE_ID  (Audience → Settings → Audience name and defaults)
 */
export async function POST(req: NextRequest) {
  try {
    const { email, consent } = (await req.json()) as {
      email?: string
      consent?: boolean
    }

    const trimmed = (email || '').trim().toLowerCase()
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)
    if (!looksLikeEmail) {
      return NextResponse.json({ error: 'Indtast en gyldig e-mailadresse.' }, { status: 400 })
    }
    if (!consent) {
      return NextResponse.json(
        { error: 'Du skal acceptere, at vi må sende dig nyhedsbrevet.' },
        { status: 400 },
      )
    }

    const apiKey     = process.env.MAILCHIMP_API_KEY
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

    if (!apiKey || !audienceId) {
      console.error('MAILCHIMP_API_KEY eller MAILCHIMP_AUDIENCE_ID mangler')
      return NextResponse.json(
        { error: 'Nyhedsbrevet er ikke sat op endnu. Prøv igen senere.' },
        { status: 500 },
      )
    }

    // Datacenteret er suffikset i nøglen, fx "...-us21"
    const dc = apiKey.split('-')[1]
    if (!dc) {
      console.error('MAILCHIMP_API_KEY mangler datacenter-suffiks (fx -us21)')
      return NextResponse.json(
        { error: 'Nyhedsbrevet er ikke sat op korrekt.' },
        { status: 500 },
      )
    }

    const res = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: 'POST',
        headers: {
          // Mailchimp bruger HTTP Basic — brugernavnet er ligegyldigt, nøglen er kodeordet
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: trimmed,
          status: 'pending', // 'pending' = double opt-in: Mailchimp sender bekræftelsesmail
        }),
      },
    )

    if (res.ok) {
      return NextResponse.json({ ok: true })
    }

    const data = await res.json().catch(() => ({} as any))

    // Allerede tilmeldt – det er ikke en fejl for brugeren
    if (res.status === 400 && data?.title === 'Member Exists') {
      return NextResponse.json({ ok: true })
    }

    if (res.status === 400) {
      return NextResponse.json(
        { error: 'E-mailadressen kunne ikke godkendes. Tjek den lige igen.' },
        { status: 400 },
      )
    }

    console.error('Mailchimp-fejl:', res.status, JSON.stringify(data).slice(0, 300))
    return NextResponse.json({ error: 'Noget gik galt. Prøv igen om lidt.' }, { status: 500 })
  } catch (e: any) {
    console.error('Newsletter error:', e)
    return NextResponse.json({ error: 'Noget gik galt. Prøv igen om lidt.' }, { status: 500 })
  }
}
