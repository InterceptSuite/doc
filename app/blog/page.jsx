import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BlogCard from '@/components/BlogCard'
import { getAllBlogs } from '@/lib/blog'
import { getAllDocs } from '@/lib/docs'

export const metadata = {
  title: 'Blog',
  description: 'Articles, guides, and updates from the InterceptSuite team.',
}

export default function BlogPage() {
  const allBlogs = getAllBlogs()
  const allDocs = getAllDocs()
  const searchData = [
    ...allDocs.map((d) => ({ ...d, type: 'docs' })),
    ...allBlogs.map((b) => ({ ...b, type: 'blog' })),
  ]

  const featured = allBlogs[0]
  const rest = allBlogs.slice(1)

  return (
    <>
      <Navbar searchData={searchData} />

      <main className="pt-28 pb-24">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Blog</p>
            <h1 className="text-4xl font-bold text-content tracking-tight mb-3">
              From the InterceptSuite Team
            </h1>
            <p className="text-content-muted max-w-xl">
              Technical guides, deep dives, and updates on new features.
            </p>
          </div>

          {allBlogs.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-content-muted">No blog posts yet. Check back soon.</p>
            </div>
          ) : (
            <>
              {featured && (
                <div className="mb-8">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group block p-8 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 mb-4">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.06] text-content-muted border border-[#2A2A2A]">
                            Featured
                          </span>
                          {featured.tags?.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent-light border border-accent/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-content mb-3 group-hover:text-accent-light transition-colors leading-tight">
                          {featured.title}
                        </h2>
                        <p className="text-content-muted leading-relaxed mb-6 max-w-2xl">
                          {featured.description}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center">
                            <span className="text-xs font-semibold text-white">
                              {featured.author?.charAt(0) || 'I'}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-content">{featured.author || 'InterceptSuite Team'}</p>
                            <div className="flex items-center gap-2 text-xs text-content-dim">
                              {featured.date && (
                                <span>
                                  {new Date(featured.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </span>
                              )}
                              {featured.readTime && <><span>·</span><span>{featured.readTime}</span></>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {rest.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
