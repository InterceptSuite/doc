import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import DocSidebar from '@/components/DocSidebar'
import { getDocBySlug, getAllDocSlugs, getAllDocs, extractHeadings, addHeadingIds } from '@/lib/docs'
import { getAllBlogs } from '@/lib/blog'
import { docNavigation } from '@/lib/navigation'

export async function generateStaticParams() {
  return getAllDocSlugs('interceptsuite').map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  try {
    const doc = getDocBySlug(params.slug, 'interceptsuite')
    return {
      title: doc.title,
      description: doc.description,
    }
  } catch {
    return { title: 'Not Found' }
  }
}

function findAdjacentDocs(slug) {
  const allItems = docNavigation.flatMap((g) => g.items)
  const idx = allItems.findIndex((item) => item.slug === slug)
  return {
    prev: idx > 0 ? allItems[idx - 1] : null,
    next: idx < allItems.length - 1 ? allItems[idx + 1] : null,
  }
}

function findCategory(slug) {
  return docNavigation.find((g) => g.items.some((item) => item.slug === slug))
}

export default function DocPage({ params }) {
  let doc
  try {
    doc = getDocBySlug(params.slug, 'interceptsuite')
  } catch {
    notFound()
  }

  const allDocs = getAllDocs('interceptsuite')
  const allBlogs = getAllBlogs()
  const searchData = [
    ...allDocs.map((d) => ({ ...d, type: 'docs' })),
    ...allBlogs.map((b) => ({ ...b, type: 'blog' })),
  ]

  const htmlWithIds = addHeadingIds(doc.content)
  const headings = extractHeadings(doc.content)
  const { prev, next } = findAdjacentDocs(params.slug)
  const category = findCategory(params.slug)

  return (
    <>
      <Navbar searchData={searchData} />

      <div className="pt-20 pb-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="flex gap-6 items-start">
            <div className="hidden lg:block sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto flex-shrink-0">
              <DocSidebar />
            </div>

            <div className="flex flex-1 gap-6 items-start min-w-0">
            <main className="flex-1 min-w-0 rounded-2xl border border-[#1A1A1A] bg-card p-8 md:p-10 xl:p-12">
              <div className="mb-6 flex items-center gap-2 text-sm text-content-dim">
                <Link href="/" className="hover:text-content transition-colors">Home</Link>
                <span>/</span>
                <Link href="/docs/interceptsuite" className="hover:text-content transition-colors">Docs</Link>
                {category && (
                  <>
                    <span>/</span>
                    <span className="text-content-muted">{category.category}</span>
                  </>
                )}
                <span>/</span>
                <span className="text-content">{doc.title}</span>
              </div>

              <article>
                <header className="mb-10 pb-8 border-b border-[#1A1A1A]">
                  {category && (
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
                      style={{
                        background: `${category.color}15`,
                        border: `1px solid ${category.color}25`,
                        color: category.color,
                      }}
                    >
                      {category.category}
                    </span>
                  )}
                  <h1 className="text-4xl font-bold text-content tracking-tight leading-tight mb-3">
                    {doc.title}
                  </h1>
                  {doc.description && (
                    <p className="text-lg text-content-muted leading-relaxed">{doc.description}</p>
                  )}
                </header>

                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: htmlWithIds }}
                />
              </article>

              <div className="mt-12 pt-8 border-t border-[#1A1A1A] flex items-center justify-between gap-4">
                {prev ? (
                  <Link
                    href={`/docs/interceptsuite/${prev.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all max-w-[48%]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-content-dim group-hover:text-accent-light transition-colors flex-shrink-0">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    <div>
                      <p className="text-xs text-content-dim mb-0.5">Previous</p>
                      <p className="text-sm font-medium text-content group-hover:text-accent-light transition-colors line-clamp-1">
                        {prev.title}
                      </p>
                    </div>
                  </Link>
                ) : <div />}

                {next ? (
                  <Link
                    href={`/docs/interceptsuite/${next.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all max-w-[48%] ml-auto text-right"
                  >
                    <div>
                      <p className="text-xs text-content-dim mb-0.5">Next</p>
                      <p className="text-sm font-medium text-content group-hover:text-accent-light transition-colors line-clamp-1">
                        {next.title}
                      </p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-content-dim group-hover:text-accent-light transition-colors flex-shrink-0">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                ) : <div />}
              </div>

              <div className="mt-8 pt-6 border-t border-[#1A1A1A]">
                <a
                  href={`https://github.com/InterceptSuite/InterceptSuite/tree/main/docs/docs/${params.slug}.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-content-dim hover:text-content-muted transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit this page on GitHub
                </a>
              </div>
            </main>

            {headings.length > 0 && (
              <aside className="hidden xl:block w-64 flex-shrink-0">
                <div className="sticky top-24 rounded-2xl border border-[#1A1A1A] bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-content-dim mb-4">On this page</p>
                  <nav aria-label="Table of contents">
                    <ul className="space-y-1.5">
                      {headings.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className={`flex items-center gap-2 text-sm text-content-muted hover:text-content transition-colors py-0.5 ${
                              h.level === 3 ? 'pl-3' : ''
                            }`}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 opacity-40">
                              <rect x="3" y="3" width="7" height="7" />
                              <rect x="14" y="3" width="7" height="7" />
                              <rect x="14" y="14" width="7" height="7" />
                              <rect x="3" y="14" width="7" height="7" />
                            </svg>
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
