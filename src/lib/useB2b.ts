'use client'

import { useAuth } from '@clerk/nextjs'

/**
 * Login-status for erhvervskunder – nu baseret på Clerk (rigtige konti).
 * Bruges af menu, kurv, erhvervsshop-gate og kontoside.
 */
export function useB2bLoggedIn(): boolean {
  const { isSignedIn } = useAuth()
  return isSignedIn === true
}
