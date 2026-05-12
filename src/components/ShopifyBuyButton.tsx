'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    ShopifyBuy: any
  }
}

const SCRIPT_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
const DOMAIN = 'uxbuqg-hq.myshopify.com'
const TOKEN = 'e8f48fd7513b49b427af1711b66a290e'

interface Props {
  componentId: string   // unique DOM id, must match Shopify embed
  productId: string     // Shopify product numeric id
}

function buildOptions() {
  return {
    product: {
      styles: {
        product: {
          '@media (min-width: 601px)': {
            'max-width': '100%',
            'margin-left': '0px',
            'margin-bottom': '0px',
          },
        },
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
        title: { 'display': 'none' },
        prices: { 'font-family': 'Inter, system-ui, sans-serif', 'font-weight': '700' },
      },
      contents: {
        img: false,
        title: false,
        price: true,
        button: false,
        buttonWithQuantity: true,
        description: false,
      },
      text: { button: 'Læg i kurv' },
    },
    modalProduct: {
      contents: {
        img: false,
        imgWithCarousel: true,
        button: false,
        buttonWithQuantity: true,
      },
      styles: {
        product: {
          '@media (min-width: 601px)': { 'max-width': '100%', 'margin-left': '0px', 'margin-bottom': '0px' },
        },
        button: {
          'font-family': 'Inter, system-ui, sans-serif',
          'background-color': '#0a2540',
          'border-radius': '9999px',
          ':hover': { 'background-color': '#0d2f50' },
        },
      },
      text: { button: 'Læg i kurv' },
    },
    cart: {
      styles: {
        button: {
          'font-family': 'Inter, system-ui, sans-serif',
          'background-color': '#3aad4a',
          'border-radius': '9999px',
          ':hover': { 'background-color': '#2e9a3d' },
        },
      },
      text: { total: 'Subtotal', button: 'Til kassen' },
    },
    toggle: {
      styles: {
        toggle: { 'background-color': '#0a2540', ':hover': { 'background-color': '#0d2f50' } },
        count: { 'font-family': 'Inter, system-ui, sans-serif' },
      },
    },
    option: {},
  }
}

export default function ShopifyBuyButton({ componentId, productId }: Props) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    function init() {
      const client = window.ShopifyBuy.buildClient({ domain: DOMAIN, storefrontAccessToken: TOKEN })
      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        const node = document.getElementById(componentId)
        if (!node) return
        ui.createComponent('product', {
          id: productId,
          node,
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: buildOptions(),
        })
      })
    }

    if (window.ShopifyBuy?.UI) {
      init()
    } else if (window.ShopifyBuy) {
      // Script loaded but UI not ready yet
      const existing = document.querySelector(`script[src="${SCRIPT_URL}"]`) as HTMLScriptElement | null
      if (existing) existing.addEventListener('load', init)
    } else {
      const script = document.createElement('script')
      script.async = true
      script.src = SCRIPT_URL
      script.addEventListener('load', init)
      ;(document.head || document.body).appendChild(script)
    }
  }, [componentId, productId])

  return <div id={componentId} className="w-full" />
}
