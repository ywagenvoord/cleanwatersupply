import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Nyhedsbrevs-tilmelding via Mailchimp.
 *
 * Kræver i .env.local + Netlify:
 *   MAILCHIMP_API_KEY      (fx abc123...-us21 — datacenteret står efter bindestregen)
 *   MAILCHIMP_AUDIENCE_ID  (Audience → Settings → Audience name and defaults)
 */

/**
 * BEKRÆFTELSESMAIL (double opt-in)
 *   false = tilmeldt med det samme, ingen bekræftelsesmail. Flest tilmeldinger.
 *   true  = Mailchimp sender en bekræftelsesmail, som skal klikkes først.
 *           Giver den stærkeste dokumentation for samtykket.
 *
 * Bemærk: ved false gemmer vi tidspunkt + IP som dokumentation i stedet.
 */
const DOUBLE_OPT_IN = false
export async function POST(req: NextRequest) {
  try {
    const { email, consent, tags, name, phone } = (await req.json()) as {
      email?: string
      consent?: boolean
      tags?: string[]
      name?: string
      phone?: string
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
    // Besøgendes IP – bruges som dokumentation for samtykket
    const signupIp =
      req.headers.get('x-nf-client-connection-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      '127.0.0.1'

    const dc = apiKey.split('-')[1]
    if (!dc) {
      console.error('MAILCHIMP_API_KEY mangler datacenter-suffiks (fx -us21)')
      return NextResponse.json(
        { error: 'Nyhedsbrevet er ikke sat op korrekt.' },
        { status: 500 },
      )
    }

    const auth = `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`
    // Subscriber-hash = MD5 af e-mail i småt. Bruges til upsert (PUT) + tags.
    const hash = createHash('md5').update(trimmed.toLowerCase()).digest('hex')

    // 1) Upsert medlemmet (PUT) – opretter nyt ELLER opdaterer eksisterende.
    //    status_if_new sættes kun ved oprettelse, så vi ikke gen-tilmelder
    //    nogen, der har frameldt sig.
    const res = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${hash}`,
      {
        method: 'PUT',
        headers: { Authorization: auth, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_address: trimmed,
          status_if_new: DOUBLE_OPT_IN ? 'pending' : 'subscribed',
          ...((name || phone) ? {
            merge_fields: {
              ...(name  ? { FNAME: name.trim() }   : {}),
              ...(phone ? { PHONE: phone.trim() }   : {}),
            },
          } : {}),
          ...(DOUBLE_OPT_IN ? {} : {
            ip_signup:        signupIp,
            timestamp_signup: new Date().toISOString().slice(0, 19).replace('T', ' '),
          }),
        }),
      },
    )

    if (!res.ok) {
      const data = await res.json().catch(() => ({} as any))
      // MIDLERTIDIG DEBUG: vis den præcise Mailchimp-fejl på formularen
      const debugMsg = `DEBUG ${res.status} · dc:${dc} · list:...${audienceId.slice(-4)} · ${data?.title || ''} ${String(data?.detail || '').slice(0, 140)}`
      console.error('Mailchimp-fejl:', res.status, JSON.stringify(data).slice(0, 300))
      return NextResponse.json({ error: debugMsg }, { status: res.status || 500 })
    }

    // 2) Tilføj tag(s) via det dedikerede tags-endpoint – virker for BÅDE nye
    //    og eksisterende medlemmer (fx "Quiz-konkurrence"), så alle deltagere
    //    kan findes på tagget, når vinderen skal trækkes.
    if (Array.isArray(tags) && tags.length) {
      try {
        await fetch(
          `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${hash}/tags`,
          {
            method: 'POST',
            headers: { Authorization: auth, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tags: tags.slice(0, 5).map((name) => ({ name, status: 'active' })),
            }),
          },
        )
      } catch (tagErr) {
        // Tilmeldingen er lykkedes – et fejlet tag skal ikke vise brugeren en fejl.
        console.error('Mailchimp tag-fejl:', tagErr)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Newsletter error:', e)
    return NextResponse.json({ error: 'Noget gik galt. Prøv igen om lidt.' }, { status: 500 })
  }
}
