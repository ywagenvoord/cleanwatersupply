/**
 * Rundt "stempel"-badge: Produceret i EU.
 * Brand-farvet segl med buet tekst og et gyldent flueben i midten.
 */
export default function EuBadge({
  size = 92,
  className = '',
}: {
  size?: number
  className?: string
}) {
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
        <path id="euArcTop" d="M 50 50 m -36 0 a 36 36 0 1 1 72 0" fill="none" />
        <path id="euArcBot" d="M 50 50 m -36 0 a 36 36 0 1 0 72 0" fill="none" />
      </defs>

      {/* Segl – EU-blå + guld */}
      <circle cx="50" cy="50" r="48" fill="#003399" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#ffd54a" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="41.5" fill="none" stroke="#ffd54a" strokeOpacity="0.55" strokeWidth="1" />

      {/* Buet tekst hele vejen rundt */}
      <text fill="#ffffff" fontSize="8.6" fontWeight="700" letterSpacing="2.6"
            fontFamily="Helvetica, Arial, sans-serif">
        <textPath href="#euArcTop" startOffset="50%" textAnchor="middle">PRODUCERET</textPath>
      </text>
      <text fill="#ffffff" fontSize="8.6" fontWeight="700" letterSpacing="3"
            fontFamily="Helvetica, Arial, sans-serif">
        <textPath href="#euArcBot" startOffset="50%" textAnchor="middle">I&#160;EU</textPath>
      </text>

      {/* Midter-cirkel + flueben */}
      <circle cx="50" cy="50" r="20" fill="none" stroke="#ffd54a" strokeWidth="2.5" />
      <polyline points="41,50 47.5,57 60,43"
                fill="none" stroke="#ffd54a" strokeWidth="4"
                strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
