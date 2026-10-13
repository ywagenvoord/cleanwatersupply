'use client'

/**
 * Login er fjernet fra sitet. Der er ikke længere indloggede erhvervskunder,
 * så denne returnerer altid false. Alle priser vises som privatpriser (inkl. moms).
 * (Bevaret som funktion, så eksisterende kald ikke skal ændres.)
 */
export function useB2bLoggedIn(): boolean {
  return false
}
