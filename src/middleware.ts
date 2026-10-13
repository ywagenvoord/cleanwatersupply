import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Sider der kræver login (erhvervsshop + kontoside).
// Selve login-siden (/min-konto/login) skal IKKE beskyttes.
const isProtectedRoute = createRouteMatcher(['/shop/erhverv(.*)', '/min-konto(.*)'])
// Login OG ansøg-om-konto skal være åbne (man er jo ikke logget ind endnu).
const isPublicAuthRoute = createRouteMatcher(['/min-konto/login(.*)', '/min-konto/ansog(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Preview-tilstand: åben adgang (til chef-gennemgang) – ingen login-væg
  if (process.env.NEXT_PUBLIC_PREVIEW_OPEN === '1') return
  if (isProtectedRoute(req) && !isPublicAuthRoute(req)) {
    await auth.protect()
  }
})

// VIGTIGT (SEO): Clerk-middlewaren må KUN køre på de sider, der faktisk kræver
// login. På en Clerk development-instans laver middlewaren ellers et "handshake"
// -redirect (307) til clerk.accounts.dev på ALLE sider – også forsiden – når
// der ikke er cookies (fx Googlebot). Det gør forsiden "Non-indexable / Redirected".
// Ved kun at matche /min-konto og /shop/erhverv svarer alle offentlige sider nu
// med et rent HTTP 200 uden redirect, så de kan indekseres.
export const config = {
  matcher: [
    '/min-konto/:path*',
    '/shop/erhverv/:path*',
  ],
}
