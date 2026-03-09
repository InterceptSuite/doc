'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { docNavigation } from '@/lib/navigation'

function ChevronIcon({ className }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export default function DocSidebar({ navigation = docNavigation, basePath = '/docs/interceptsuite' }) {
  const pathname = usePathname()
  const currentSlug = pathname.split('/').pop()

  return (
    <aside className="w-64 flex-shrink-0">
      <nav aria-label="Documentation navigation">
        {navigation.map((group) => (
          <div key={group.slug} className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-content-dim mb-2.5 px-3">
              {group.category}
            </p>
            <ul>
              {group.items.map((item) => {
                const isActive = currentSlug === item.slug
                return (
                  <li key={item.slug}>
                    <Link
                      href={`${basePath}/${item.slug}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all group ${
                        isActive
                          ? 'bg-accent/10 text-accent-light font-medium border border-accent/20'
                          : 'text-content-muted hover:text-content hover:bg-white/[0.04]'
                      }`}
                    >
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-accent-light flex-shrink-0" />
                      )}
                      <span className={isActive ? '' : 'ml-3'}>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}

        <div className="border-t border-[#1A1A1A] pt-6 mt-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-content-dim mb-2.5 px-3">
            Community
          </p>
          <ul>
            {[
              { href: 'https://github.com/InterceptSuite/InterceptSuite/issues', label: 'GitHub Issues' },
              { href: 'https://github.com/InterceptSuite/InterceptSuite/discussions', label: 'Discussions' },
              { href: 'https://interceptsuite.com', label: 'Main Website' },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-content-muted hover:text-content hover:bg-white/[0.04] transition-all group"
                >
                  {label}
                  <ChevronIcon className="opacity-0 group-hover:opacity-50 -rotate-45 transition-all" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  )
}
