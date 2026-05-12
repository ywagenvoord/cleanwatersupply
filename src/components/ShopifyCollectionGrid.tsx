'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

declare global {
  interface Window { ShopifyBuy: any }
}

const DOMAIN = 'uxbuqg-hq.myshopify.com'
const TOKEN = 'e8f48fd7513b49b427af1711b66a290e'
const COLLECTION_GID = 'gid://shopify/Collection/671535857991'
const SCRIPT_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'

/* Shared script loader so all widgets share a single <script> tag */
let scriptPromise: Promise<void> | null = null

function loadShopifyScript(): Promise<void> {
  if (scriptPromise) return scriptPromise
  if (typeof window !== 'undefined' && window.ShopifyBuy?.UI) {
    return (scriptPromise = Promise.resolve())
  }
  scriptPromise = new Promise((resolve) => {
    const existing = document.querySelector(`script[src="${SCRIPT_URL}"]`) as HTMLScriptElement | null
    if (existing) { existing.addEventListener('load', () => resolve()); return }
    const s = document.createElement('script')
    s.async = true
    s.src = SCRIPT_URL
    s.addEventListener('load', () => resolve())
    ;(document.head || document.body).appendChild(s)
  })
  return scriptPromise
}

function buildOptions() {
  return {
    product: {
      styles: {
        product: { '@media (min-width: 601px)': { 'max-width': '100%', 'margin-left': '0', 'margin-bottom': '0' } },
        button: {
          'font-family': 'Inter, system-ui, sans-serif',
          'font-size': '14px',
          'font-weight': '700',
          'background-color': '#0a2540',
          'border-radius': '9999px',
          'padding-top': '12px',
          'padding-bottom': '12px',
          'width': '100%',
          ':hover': { 'background-color': '#0d2f50' },
          ':focus': { 'background-color': '#0d2f50' },
        },
        title:  { 'display': 'none' },
        prices: { 'font-family': 'Inter, system-ui, sans-serif', 'font-weight': '700', 'color': '#0a2540' },
      },
      contents: { img: false, title: false, price: true, button: false, buttonWithQuantity: true, description: false },
      text: { button: 'Læg i kurv' },
    },
    modalProduct: {
      contents: { img: false, imgWithCarousel: true, button: false, buttonWithQuantity: true },
      styles: {
        button: { 'font-family': 'Inter, system-ui, sans-serif', 'background-color': '#0a2540', 'border-radius': '9999px', ':hover': { 'background-color': '#0d2f50' } },
      },
      text: { button: 'Læg i kurv' },
    },
    cart: {
      styles: {
        button: { 'font-family': 'Inter, system-ui, sans-serif', 'background-color': '#3aad4a', 'border-radius': '9999px', ':hover': { 'background-color': '#2e9a3d' } },
      },
      text: { total: 'Subtotal', button: 'Til kassen' },
    },
    toggle: {
      styles: { toggle: { 'background-color': '#0a2540', ':hover': { 'background-color': '#0d2f50' } } },
    },
    option: {},
  }
}

/* ─── Single product widget ──────────────────────────────────────────── */

type ShopifyProduct = {
  numericId: string
  title: string
  handle: string
  imageUrl?: string
}

function ProductBuyWidget({ product, index }: { product: ShopifyProduct; index: number }) {
  const nodeId = `shopify-product-widget-${index}`
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    loadShopifyScript().then(() => {
      const client = window.ShopifyBuy.buildClient({ domain: DOMAIN, storefrontAccessToken: TOKEN })
      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        const node = document.getElementById(nodeId)
        if (!node) return
        ui.createComponent('product', {
          id: product.numericId,
          node,
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: buildOptions(),
        })
      })
    })
  }, [nodeId, product.numericId])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Product image from Shopify */}
      <div className="h-44 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-100" />
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-4">{product.title}</h3>
        {/* Shopify buy button mounts here */}
        <div id={nodeId} className="w-full mt-auto" />
      </div>
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────────── */

export default function ShopifyCollectionGrid() {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(false)

  useEffect(() => {
    fetch(`https://${DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': TOKEN,
      },
      body: JSON.stringify({
        query: `{
          collection(id: "${COLLECTION_GID}") {
            products(first: 50) {
              nodes {
                id
                title
                handle
                images(first: 1) { nodes { url } }
              }
            }
          }
        }`,
      }),
    })
      .then(r => r.json())
      .then(data => {
        const nodes: any[] = data?.data?.collection?.products?.nodes ?? []
        setProducts(
          nodes.map(n => ({
            numericId: n.id.split('/').pop(),
            title: n.title,
            handle: n.handle,
            imageUrl: n.images?.nodes?.[0]?.url,
          }))
        )
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 h-64 animate-pulse" />
        ))}
      </div>
    )
  }

  if (error || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-sm mb-4">Produkter ikke tilgængelige via Shopify.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-[#0a2540] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#0d2f50] transition-colors"
        >
          Kontakt os for priser <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <ProductBuyWidget key={product.numericId} product={product} index={i} />
      ))}
    </div>
  )
}
