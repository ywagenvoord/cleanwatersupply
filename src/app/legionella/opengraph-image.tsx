import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Legionella – Forebyggelse, filtre & beskyttelse'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function LegionellaOg() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a2540 0%, #0d3160 50%, #1e4380 100%)',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -100, right: -100,
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 5 10 5 15a7 7 0 1014 0c0-5-7-13-7-13z" fill="#3aad4a" />
          </svg>
          <div style={{ color: 'white', fontSize: 24, fontWeight: 800 }}>CLEAN WATER SUPPLY</div>
        </div>

        {/* Topic badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.6)',
            borderRadius: 999,
            padding: '10px 22px',
            color: '#fca5a5',
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            width: 'fit-content',
            marginTop: 50,
          }}
        >
          {/* Tegnet advarselstrekant – undgår emoji (som Satori ikke kan tegne uden ekstern fetch → 500) */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 3 L22 20 H2 Z" fill="#fca5a5" />
            <rect x="11" y="9" width="2" height="6" rx="1" fill="#0a2540" />
            <rect x="11" y="16" width="2" height="2" rx="1" fill="#0a2540" />
          </svg>
          Legionella-risiko
        </div>

        {/* Headline */}
        <div
          style={{
            color: 'white',
            fontSize: 84,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginTop: 28,
            maxWidth: 1000,
          }}
        >
          Beskyt dig mod
          <br />
          <span style={{ color: '#3aad4a' }}>Legionella i vandet</span>
        </div>

        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 28, marginTop: 24, maxWidth: 850 }}>
          Medicinsk certificerede point-of-use filtre med 7 log retention
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 50, marginTop: 'auto' }}>
          {[
            { val: '99,99999%', label: 'Retention' },
            { val: '7 log',     label: 'Bakterier stoppet' },
            { val: 'ECHA',      label: 'Article 95' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: '#3aad4a', fontSize: 40, fontWeight: 900, letterSpacing: '-0.02em' }}>
                {s.val}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
