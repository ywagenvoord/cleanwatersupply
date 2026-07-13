import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Nyhedsbrevs-tilmelding.
 * Sender e-mailen videre til MailerLite, som håndterer listen,
 * bekræftelsesmail og afmelding (GDPR).
 *
 * Kræver i .env.local + Netlify:
 *   MAILERLITE_API_KEY   (påkrævet)
 *   MAILERLITE_GROUP_ID  (valgfri – hvis du vil lande i en bestemt gruppe/liste)
 */
export async function POST(req: NextRequest) {
  try {
    const { email, consent } = (await req.json()) as {
      email?: string
      consent?: boolean
    }

    // Validering
    const trimmed = (email || '').trim().toLowerCase()
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)
    if (!looksLikeEmail) {
      return NextResponse.json(
        { error: 'Indtast en gyldig e-mailadresse.' },
        { status: 400 },
      )
    }
    if (!consent) {
      return NextResponse.json(
        { error: 'Du skal acceptere, at vi må sende dig nyhedsbrevet.' },
        { status: 400 },
      )
    }

    const apiKey = process.env.MAILERLITE_API_KEY
    if (!apiKey) {
      console.error('MAILERLITE_API_KEY mangler i environment variables')
      return NextResponse.json(
        { error: 'Nyhedsbrevet er ikke sat op endnu. Prøv igen senere.' },
        { status: 500 },
      )
    }

    const groupId = process.env.MAILERLITE_GROUP_ID

    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: trimmed,
        status: 'unconfirmed', // MailerLite sender selv bekræftelsesmail (double opt-in)
        ...(groupId ? { groups: [groupId] } : {}),
      }),
    })

    if (res.ok) {
      return NextResponse.json({ ok: true })
    }

    // 422 = ugyldig e-mail iflg. MailerLite
    if (res.status === 422) {
      return NextResponse.json(
        { error: 'E-mailadressen kunne ikke godkendes. Tjek den lige igen.' },
        { status: 400 },
      )
    }

    const detail = await res.text()
    console.error('MailerLite-fejl:', res.status, detail)
    return NextResponse.json(
      { error: 'Noget gik galt. Prøv igen om lidt.' },
      { status: 500 },
    )
  } catch (e: any) {
    console.error('Newsletter error:', e)
    return NextResponse.json(
      { error: 'Noget gik galt. Prøv igen om lidt.' },
      { status: 500 },
    )
  }
}
