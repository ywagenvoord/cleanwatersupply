import Script from 'next/script'

/**
 * Google Tag Manager med Google Consent Mode v2.
 *
 * 1. Sætter consent-default (alt afvist undtagen nødvendige) FØR GTM indlæses,
 *    så vi overholder GDPR, indtil brugeren tager stilling i cookie-banneret.
 * 2. Indlæser selve GTM-containeren.
 *
 * Brugerens valg opdateres bagefter af CookieConsent via gtag('consent','update', …).
 */

export const GTM_ID = 'GTM-M26VHJWL'

export default function GoogleTagManager() {
  return (
    <>
      <Script id="gtm-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500
          });
        `}
      </Script>
      <Script id="gtm-loader" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
    </>
  )
}

export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="gtm"
      />
    </noscript>
  )
}
