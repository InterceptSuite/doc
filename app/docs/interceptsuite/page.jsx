import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllDocs } from '@/lib/docs'
import { getAllBlogs } from '@/lib/blog'
import { docNavigation } from '@/lib/navigation'

export const metadata = {
  title: 'InterceptSuite Documentation',
  description: 'Browse all InterceptSuite documentation articles.',
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default function DocsPage() {
  const allDocs = getAllDocs('interceptsuite')
  const allBlogs = getAllBlogs()
  const searchData = [
    ...allDocs.map((d) => ({ ...d, type: 'docs' })),
    ...allBlogs.map((b) => ({ ...b, type: 'blog' })),
  ]

  return (
    <>
      <Navbar searchData={searchData} />

      <main className="pt-28 pb-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">InterceptSuite</p>
            <h1 className="text-4xl font-bold text-content tracking-tight mb-3">InterceptSuite Documentation</h1>
            <p className="text-content-muted max-w-xl">
              Everything you need to set up, configure, and extend InterceptSuite.
            </p>
          </div>

          <div className="space-y-14">
            {docNavigation.map((group) => {
              const groupDocs = allDocs.filter((d) => d.category === group.category)
              return (
                <div key={group.slug}>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${group.color}18`, border: `1px solid ${group.color}28` }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ background: group.color }}
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-content">{group.category}</h2>
                    <span className="text-xs text-content-dim bg-white/[0.04] border border-[#1A1A1A] px-2.5 py-1 rounded-full">
                      {groupDocs.length} articles
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.items.map((navItem) => {
                      const doc = allDocs.find((d) => d.slug === navItem.slug) || navItem
                      return (
                        <Link
                          key={navItem.slug}
                          href={`/docs/interceptsuite/${navItem.slug}`}
                          className="group flex items-start justify-between gap-4 p-5 rounded-xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all"
                        >
                          <div>
                            <h3 className="text-sm font-semibold text-content group-hover:text-accent-light transition-colors mb-1">
                              {doc.title}
                            </h3>
                            <p className="text-sm text-content-dim line-clamp-2">
                              {doc.description || navItem.description}
                            </p>
                          </div>
                          <span className="flex-shrink-0 mt-0.5 text-content-dim group-hover:text-accent-light group-hover:translate-x-0.5 transition-all">
                            <ArrowIcon />
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
