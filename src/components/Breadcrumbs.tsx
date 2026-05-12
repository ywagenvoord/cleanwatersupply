import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { name: string; href?: string }

export default function Breadcrumbs({ crumbs, className = '' }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500">
        {crumbs.map((c, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {c.href && !isLast ? (
                <Link href={c.href} className="hover:text-[#0a2540] transition-colors">
                  {c.name}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-gray-700 font-medium' : ''}>
                  {c.name}
                </span>
              )}
              {!isLast && <ChevronRight className="w-3 h-3 text-gray-300" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
