// DEMO-login til erhvervs-prototypen.
// OBS: Dette er kun en browser-flag til at vise adfærden – IKKE rigtig sikkerhed.
// Rigtig beskyttelse af erhvervspriser kræver login + server-side kontrol.

export const B2B_DEMO_KEY = 'cws-b2b-demo'

export function isB2bLoggedIn(): boolean {
  if (typeof window === 'undefined') return false
  try { return localStorage.getItem(B2B_DEMO_KEY) === '1' } catch { return false }
}

export function setB2bLoggedIn(value: boolean): void {
  if (typeof window === 'undefined') return
  try {
    if (value) localStorage.setItem(B2B_DEMO_KEY, '1')
    else localStorage.removeItem(B2B_DEMO_KEY)
  } catch { /* ignore */ }
}
