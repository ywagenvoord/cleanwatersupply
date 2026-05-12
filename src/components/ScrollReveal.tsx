'use client'

import { useEffect, useRef, useState, CSSProperties, ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface Props {
  children: ReactNode
  delay?: number        // ms
  duration?: number     // ms
  direction?: Direction
  distance?: number     // px
  scale?: boolean
  className?: string
  threshold?: number
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 600,
  direction = 'up',
  distance = 32,
  scale = false,
  className = '',
  threshold = 0.12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el) } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const translate: Record<Direction, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: 'none',
  }

  const hidden: CSSProperties = {
    opacity: 0,
    transform: `${translate[direction]}${scale ? ' scale(0.96)' : ''}`,
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    transitionDelay: `${delay}ms`,
  }

  const shown: CSSProperties = {
    opacity: 1,
    transform: 'translateY(0) translateX(0) scale(1)',
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    transitionDelay: `${delay}ms`,
  }

  return (
    <div ref={ref} style={visible ? shown : hidden} className={className}>
      {children}
    </div>
  )
}
