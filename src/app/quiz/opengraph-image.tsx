import { ImageResponse } from 'next/og'
import { PRIZE_SHORT, DEADLINE } from '@/lib/quiz'

export const runtime = 'nodejs'
export const alt = 'Vandquiz – vind et vandfilter hos Clean Water Supply'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function QuizOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a2540 0%, #0d3160 50%, #1e4380 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          position: 'relative',
        }}
      >
        {/* Dekorative blobs */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            background: 'radial-gradient(circle, rgba(58,173,74,0.35) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -140,
            left: -60,
            width: 360,
            height: 360,
            background: 'radial-gradient(circle, rgba(40,78,255,0.35) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 5 10 5 15a7 7 0 1014 0c0-5-7-13-7-13z" fill="#3aad4a" />
          </svg>
          <div style={{ color: 'white', fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>
            CLEAN WATER SUPPLY
          </div>
        </div>

        {/* Midte */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              background: 'rgba(58,173,74,0.15)',
              border: '1px solid #3aad4a',
              borderRadius: 999,
              padding: '8px 20px',
              color: '#5ed36e',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              width: 'fit-content',
              marginBottom: 24,
            }}
          >
            Konkurrence
          </div>
          <div
            style={{
              color: 'white',
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginBottom: 18,
            }}
          >
            Vind et {PRIZE_SHORT}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 30, lineHeight: 1.3, maxWidth: 820 }}>
            Tag vandquizzen på 4 spørgsmål – og deltag i lodtrækningen om et medicinsk godkendt vandfilter.
          </div>
        </div>

        {/* Bund: CTA + frist */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              background: '#3aad4a',
              color: 'white',
              fontSize: 26,
              fontWeight: 800,
              borderRadius: 999,
              padding: '16px 34px',
            }}
          >
            Deltag gratis →
          </div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 22 }}>
            Værdi 625 kr · Frist {DEADLINE}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
