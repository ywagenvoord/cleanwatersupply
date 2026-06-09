'use client'

import { useCallback, useEffect, useState } from 'react'

const KEY = 'cws-audience'
const EVT = 'cws-audience-change'

export type Audience = 'privat' | 'erhverv' | 'skipped' | null

export function readAudience(): Audience {
  if (typeof window === 'undefined') return null
  try {
    return (localStorage.getItem(KEY) as Audience) ?? null
  } catch {
    return null
  }
}

export function writeAudience(value: Audience) {
  try {
    if (value) localStorage.setItem(KEY, value)
  } catch {}
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVT))
  }
}

/** Shared audience state (privat / erhverv), synced across the app via localStorage + a custom event. */
export function useAudience(): [Audience, (v: Audience) => void] {
  const [value, setValue] = useState<Audience>(null)

  useEffect(() => {
    const sync = () => setValue(readAudience())
    sync()
    window.addEventListener(EVT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(EVT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const set = useCallback((v: Audience) => {
    writeAudience(v)
    setValue(v)
  }, [])

  return [value, set]
}
