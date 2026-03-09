import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CategoryCard from '@/components/CategoryCard'
import BlogCard from '@/components/BlogCard'
import SearchTriggerClient from '@/components/SearchTriggerClient'
import { getAllDocs } from '@/lib/docs'
import { getAllBlogs } from '@/lib/blog'
import { docNavigation } from '@/lib/navigation'

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export const metadata = {
  title: 'InterceptSuite Docs',
  description:
    'Official documentation for InterceptSuite and ProxyBridge - advanced network interception tools built by the InterceptSuite team.',
}

export default function HomePage() {
  const allDocs = getAllDocs()
  const allBlogs = getAllBlogs()
  const recentDocs = allDocs.slice(0, 6)
  const recentBlogs = allBlogs.slice(0, 4)

  const searchData = [
    ...allDocs.map((d) => ({ ...d, type: 'docs' })),
    ...allBlogs.map((b) => ({ ...b, type: 'blog' })),
  ]

  return (
    <>
      <Navbar searchData={searchData} />

      <main>
        {/* ================================================
            Hero
        ================================================ */}
        <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden pt-16">
          <div
            className="absolute inset-0 dot-grid"
            style={{
              background: `
                radial-gradient(ellipse at 50% -5%, rgba(124,58,237,0.18) 0%, transparent 60%),
                radial-gradient(ellipse at 85% 80%, rgba(79,70,229,0.08) 0%, transparent 45%),
                #050505
              `,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

          <div className="relative mx-auto w-full max-w-[1200px] px-6 flex flex-col items-center text-center py-24 lg:py-32">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent-light text-xs font-semibold mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse" />
              v1.2.0 - Now with Universal TLS Upgrade Detection
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6 max-w-4xl">
              <span className="text-content/90">InterceptSuite Docs</span>
            </h1>

            <p className="text-lg text-content-muted max-w-xl leading-relaxed mb-10">
              Official documentation for InterceptSuite and ProxyBridge - advanced network interception tools built by the InterceptSuite team.
            </p>

            <SearchTrigger />

            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <span className="text-xs text-content-dim">Quick links:</span>
              {[
                { href: '/docs/interceptsuite/installation', label: 'Installation' },
                { href: '/docs/interceptsuite/quick-start', label: 'Quick Start' },
                { href: '/docs/interceptsuite/extensions', label: 'Extensions' },
                { href: '/docs/interceptsuite/extension-api', label: 'API Reference' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs text-content-muted hover:text-content px-3 py-1.5 rounded-full border border-[#2A2A2A] hover:border-[#3A3A3A] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================
            Browse by Category
        ================================================ */}
        <section className="py-24 border-t border-[#1A1A1A]">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-2">Browse</p>
                <h2 className="text-3xl font-bold text-content tracking-tight">InterceptSuite Documentation</h2>
              </div>
              <Link
                href="/docs"
                className="hidden sm:flex items-center gap-1.5 text-sm text-content-muted hover:text-content transition-colors group"
              >
                View all docs
                <span className="group-hover:translate-x-0.5 transition-transform"><ArrowIcon /></span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {docNavigation.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* ================================================
            ProxyBridge
        ================================================ */}
        <section className="py-24 border-t border-[#1A1A1A]">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-2">ProxyBridge</p>
                <h2 className="text-3xl font-bold text-content tracking-tight">ProxyBridge - Open Source Proxy Client</h2>
              </div>
              <a
                href="https://github.com/InterceptSuite/ProxyBridge"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 text-sm text-content-muted hover:text-content transition-colors group"
              >
                View on GitHub
                <span className="group-hover:translate-x-0.5 transition-transform"><ArrowIcon /></span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <a
                href="https://github.com/InterceptSuite/ProxyBridge"
                target="_blank"
                rel="noopener noreferrer"
                className="group col-span-1 md:col-span-1 flex flex-col gap-3 p-7 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent-light">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-content group-hover:text-accent-light transition-colors">Open Source</h3>
                <p className="text-sm text-content-muted leading-relaxed">Free and open source under MIT. Inspect the code, contribute, or self-host.</p>
              </a>

              <a
                href="https://github.com/InterceptSuite/ProxyBridge"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-7 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent-light">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-content group-hover:text-accent-light transition-colors">Windows, macOS &amp; Linux</h3>
                <p className="text-sm text-content-muted leading-relaxed">Route any application through InterceptSuite regardless of per-app proxy support.</p>
              </a>

              <a
                href="https://github.com/InterceptSuite/ProxyBridge"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-7 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent-light">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-content group-hover:text-accent-light transition-colors">SOCKS5 &amp; HTTP Proxy</h3>
                <p className="text-sm text-content-muted leading-relaxed">Forces any process to use a SOCKS5 or HTTP proxy - perfect for intercepting stubborn apps.</p>
              </a>
            </div>
          </div>
        </section>

        {/* ================================================
            Blog
        ================================================ */}
        <section className="py-24 border-t border-[#1A1A1A]">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-2">Blog</p>
                <h2 className="text-3xl font-bold text-content tracking-tight">From the Blog</h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:flex items-center gap-1.5 text-sm text-content-muted hover:text-content transition-colors group"
              >
                All posts
                <span className="group-hover:translate-x-0.5 transition-transform"><ArrowIcon /></span>
              </Link>
            </div>

            {recentBlogs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {recentBlogs.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-content-muted text-sm">Blog posts coming soon.</p>
            )}
          </div>
        </section>

        {/* ================================================
            Support CTA
        ================================================ */}
        <section className="py-24 border-t border-[#1A1A1A]">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Support</p>
              <h2 className="text-3xl font-bold text-content tracking-tight mb-3">Still need help?</h2>
              <p className="text-content-muted max-w-md mx-auto">
                Whether you found a bug or need additional support, we have multiple ways to help you out.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
              <a
                href="https://github.com/InterceptSuite/InterceptSuite/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 p-7 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[#2A2A2A] flex items-center justify-center mb-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-content-muted">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.385.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.932 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23A11.51 11.51 0 0 1 12 5.803a11.5 11.5 0 0 1 3.008.404c2.29-1.553 3.297-1.23 3.297-1.23.653 1.652.243 2.873.12 3.176.769.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-content group-hover:text-accent-light transition-colors">
                  GitHub Issues
                </h3>
                <p className="text-sm text-content-muted leading-relaxed">
                  Report bugs, request features, or get help from the community on GitHub.
                </p>
                <span className="flex items-center gap-1.5 text-xs font-medium text-content-dim group-hover:text-accent-light transition-colors mt-1">
                  Open an issue <ExternalIcon />
                </span>
              </a>

              <a
                href="mailto:support@interceptsuite.com"
                className="group flex flex-col gap-2 p-7 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[#2A2A2A] flex items-center justify-center mb-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-content-muted">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-content group-hover:text-accent-light transition-colors">
                  Email Support
                </h3>
                <p className="text-sm text-content-muted leading-relaxed">
                  Reach the team directly for license issues, billing questions, or professional support.
                </p>
                <span className="flex items-center gap-1.5 text-xs font-medium text-content-dim group-hover:text-accent-light transition-colors mt-1">
                  Send a message <ExternalIcon />
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

function SearchTrigger() {
  return (
    <div className="w-full max-w-lg">
      <SearchTriggerClient />
    </div>
  )
}

