import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Modtagere af erhvervs-ansøgninger (jer).
// OBS: Indtil cleanwatersupply.dk er verificeret hos Resend, leverer den delte
// afsender kun til Resend-kontoens egen adresse (caj@). Tilføj info@/bogholderi@
// igen, når domænet er verificeret.
const TO = ['caj@cleanwatersupply.dk']
const FROM = 'Clean Water Supply <onboarding@resend.dev>'

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function POST(req: NextRequest) {
  try {
    const { firma, cvr, kontakt, telefon, email, besked } = (await req.json()) as Record<string, string>

    if (!firma || !cvr || !kontakt || !telefon || !email) {
      return NextResponse.json({ error: 'Udfyld venligst alle påkrævede felter.' }, { status: 400 })
    }

    const key = process.env.RESEND_API_KEY
    if (!key) {
      return NextResponse.json({ error: 'E-mail er ikke konfigureret (RESEND_API_KEY mangler).' }, { status: 500 })
    }
    const resend = new Resend(key)

    const row = (label: string, value: string) =>
      `<tr><td style="color:#888;width:150px;padding:4px 0;vertical-align:top;">${label}</td><td style="color:#0a2540;padding:4px 0;">${value || '—'}</td></tr>`

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#0a2540;">
        <div style="background:#0a2540;color:#fff;padding:20px 24px;border-radius:14px 14px 0 0;">
          <h1 style="margin:0;font-size:20px;">Ny ansøgning om erhvervskonto 🏢</h1>
        </div>
        <div style="border:1px solid #eee;border-top:none;border-radius:0 0 14px 14px;padding:24px;">
          <table style="width:100%;font-size:14px;border-collapse:collapse;">
            ${row('Firmanavn', esc(firma))}
            ${row('CVR-nummer', esc(cvr))}
            ${row('Kontaktperson', esc(kontakt))}
            ${row('Telefon', esc(telefon))}
            ${row('E-mail', esc(email))}
            ${besked ? row('Besked', esc(besked).replace(/\n/g, '<br>')) : ''}
          </table>
          <p style="margin-top:22px;font-size:12px;color:#aaa;">Sendt automatisk fra cleanwatersupply.dk · Ansøgning om erhvervskonto</p>
        </div>
      </div>`

    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Ny erhvervsansøgning – ${firma}`,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message || 'Noget gik galt.' }, { status: 500 })
  }
}
