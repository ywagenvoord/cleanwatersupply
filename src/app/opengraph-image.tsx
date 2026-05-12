import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Clean Water Supply – Legionella-filtre & vandhygiejne i Danmark'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
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
        {/* Top decorative gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(58, 173, 74, 0.25) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Top: brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C12 2 5 10 5 15a7 7 0 1014 0c0-5-7-13-7-13z"
              fill="#3aad4a"
            />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: 'white', fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em' }}>
              CLEAN WATER SUPPLY
            </div>
            <div style={{ color: '#3aad4a', fontSize: 16, fontWeight: 600, letterSpacing: '0.15em' }}>
              VANDHYGIEJNE · DANMARK
            </div>
          </div>
        </div>

        {/* Middle: headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            marginTop: 40,
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 78,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: 950,
            }}
          >
            Legionella-filtre &
            <br />
            vandhygiejne i Danmark
          </div>
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 28,
              marginTop: 28,
              maxWidth: 850,
              lineHeight: 1.35,
            }}
          >
            Medicinsk certificeret · 7 log retention · ECHA Article 95
          </div>
        </div>

        {/* Bottom: trust badges */}
        <div style={{ display: 'flex', gap: 14, marginTop: 32 }}>
          {['Hospitaler', 'Hoteller', 'Svømmehaller', 'Fødevare', 'Private'].map(label => (
            <div
              key={label}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 999,
                padding: '10px 20px',
                color: 'white',
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
