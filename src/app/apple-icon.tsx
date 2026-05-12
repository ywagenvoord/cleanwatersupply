import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a2540 0%, #0d3160 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C12 2 5 10 5 15a7 7 0 1014 0c0-5-7-13-7-13z"
            fill="#3aad4a"
          />
        </svg>
        <div
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          CWS
        </div>
      </div>
    ),
    { ...size },
  )
}
