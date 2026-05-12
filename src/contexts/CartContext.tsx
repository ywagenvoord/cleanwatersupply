'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type CartItem = {
  id:              string  // CWS product id
  stripeProductId: string  // Stripe product id (prod_...)
  name:            string
  price:           number  // DKK (full kr, not øre)
  image:           string
  quantity:        number
}

type CartContextType = {
  items:          CartItem[]
  addItem:        (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem:     (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart:      () => void
  itemCount:      number
  subtotal:       number
  isOpen:         boolean
  setOpen:        (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

const STORAGE_KEY = 'cws-cart-v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems]   = useState<CartItem[]>([])
  const [isOpen, setOpen]   = useState(false)
  const [hydrated, setHyd]  = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
    setHyd(true)
  }, [])

  // Save on change (but only after hydration to avoid clearing storage)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items, hydrated])

  function addItem(item: Omit<CartItem, 'quantity'>, qty: number = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, { ...item, quantity: qty }]
    })
    setOpen(true) // open mini-cart drawer
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  function updateQuantity(id: string, qty: number) {
    if (qty <= 0) return removeItem(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal  = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, isOpen, setOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
