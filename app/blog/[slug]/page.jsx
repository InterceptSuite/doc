import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getBlogBySlug, getAllBlogSlugs, getAllBlogs } from '@/lib/blog'
import { getAllDocs } from '@/lib/docs'
import { addHeadingIds, extractHeadings } from '@/lib/docs'

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  try {
    const post = getBlogBySlug(params.slug)
    return {
      title: post.title,
      description: post.description,
    }
  } catch {
    return { title: 'Not Found' }
  }
}

export default function BlogPostPage({ params }) {
  let post
  try {
    post = getBlogBySlug(params.slug)
  } catch {
    notFound()
  }

  const allBlogs = getAllBlogs()
  const allDocs = getAllDocs()
  const searchData = [
    ...allDocs.map((d) => ({ ...d, type: 'docs' })),
    ...allBlogs.map((b) => ({ ...b, type: 'blog' })),
  ]

  const htmlWithIds = addHeadingIds(post.content)
  const headings = extractHeadings(post.content)

  const relatedPosts = allBlogs
    .filter((p) => p.slug !== params.slug)
    .filter((p) => p.tags?.some((t) => post.tags?.includes(t)))
    .slice(0, 3)

  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <>
      <Navbar searchData={searchData} />

      <div className="pt-20 pb-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">

          {/* Breadcrumb */}
          <div className="mb-5 flex items-center gap-2 text-sm text-content-dim">
            <Link href="/" className="hover:text-content transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-content transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-content truncate">{post.title}</span>
          </div>

          <div className="flex gap-6 items-start">
            {/* Main card */}
            <main className="flex-1 min-w-0 rounded-2xl border border-[#1A1A1A] bg-card p-8 md:p-10 xl:p-12">
              <article>
                <header className="mb-10">
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent-light border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h1 className="text-4xl md:text-5xl font-bold text-content tracking-tight leading-[1.1] mb-5">
                    {post.title}
                  </h1>

                  {post.description && (
                    <p className="text-xl text-content-muted leading-relaxed mb-7">
                      {post.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 pb-8 border-b border-[#1A1A1A]">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {post.author?.charAt(0) || 'I'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-content">
                        {post.author || 'InterceptSuite Team'}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-content-dim">
                        {dateStr && <span>{dateStr}</span>}
                        {post.readTime && (
                          <>
                            <span>·</span>
                            <span>{post.readTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </header>

                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: htmlWithIds }}
                />
              </article>

              <div className="mt-12 pt-8 border-t border-[#1A1A1A]">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-content-muted hover:text-content transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back to all posts
                </Link>
              </div>
            </main>

            {/* Sidebar card */}
            <aside className="hidden xl:block w-64 flex-shrink-0">
              {headings.length > 0 && (
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

                  {relatedPosts.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-[#1A1A1A]">
                      <p className="text-xs font-semibold uppercase tracking-widest text-content-dim mb-4">Related Posts</p>
                      <ul className="space-y-2">
                        {relatedPosts.map((related) => (
                          <li key={related.slug}>
                            <Link
                              href={`/blog/${related.slug}`}
                              className="flex items-start gap-2 text-sm text-content-muted hover:text-content transition-colors group"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 opacity-40">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                              </svg>
                              {related.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
