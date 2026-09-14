/**
 * Rundt "stempel"-badge: Produceret i EU.
 * EU-blå segl med bølget (skalleret) kant, guld-detaljer og buet tekst.
 */
export default function EuBadge({
  size = 92,
  className = '',
}: {
  size?: number
  className?: string
}) {
  // Bølget kant: r varierer sinusformet rundt om cirklen
  const wavy = (() => {
    const base = 46.5
    const amp = 1.7
    const waves = 20
    const N = 240
    const pts: string[] = []
    for (let i = 0; i < N; i++) {
      const t = (i / N) * Math.PI * 2
      const r = base + amp * Math.sin(waves * t)
      pts.push(`${(50 + r * Math.cos(t)).toFixed(2)},${(50 + r * Math.sin(t)).toFixed(2)}`)
    }
    return `M ${pts.join(' L ')} Z`
  })()

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Produceret i EU"
    >
      <defs>
        <path id="euArcTop" d="M 50 50 m -35 0 a 35 35 0 1 1 70 0" fill="none" />
        <path id="euArcBot" d="M 50 50 m -35 0 a 35 35 0 1 0 70 0" fill="none" />
      </defs>

      {/* Bølget segl – EU-blå + guld */}
      <path d={wavy} fill="#003399" stroke="#ffd54a" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#ffd54a" strokeOpacity="0.5" strokeWidth="1" />

      {/* Buet tekst */}
      <text fill="#ffffff" fontSize="8.4" fontWeight="700" letterSpacing="2.4"
            fontFamily="Helvetica, Arial, sans-serif">
        <textPath href="#euArcTop" startOffset="50%" textAnchor="middle">PRODUCERET</textPath>
      </text>
      <text fill="#ffd54a" fontSize="13" fontWeight="800" letterSpacing="3.5"
            fontFamily="Helvetica, Arial, sans-serif">
        <textPath href="#euArcBot" startOffset="50%" textAnchor="middle">I&#160;EU</textPath>
      </text>

      {/* Midter-cirkel + flueben */}
      <circle cx="50" cy="50" r="19" fill="none" stroke="#ffd54a" strokeWidth="2.5" />
      <polyline points="41.5,50 47.5,56.5 59,43.5"
                fill="none" stroke="#ffd54a" strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
