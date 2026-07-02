import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Sider der kræver login (erhvervsshop + kontoside).
// Selve login-siden (/min-konto/login) skal IKKE beskyttes.
const isProtectedRoute = createRouteMatcher(['/shop/erhverv(.*)', '/min-konto(.*)'])
const isPublicAuthRoute = createRouteMatcher(['/min-konto/login(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req) && !isPublicAuthRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Kør på alle sider undtagen Next-interne filer og statiske filer
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Kør altid for API-ruter
    '/(api|trpc)(.*)',
  ],
}
