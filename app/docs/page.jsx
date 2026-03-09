import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllDocs } from '@/lib/docs'
import { getAllBlogs } from '@/lib/blog'

export const metadata = {
  title: 'Documentation',
  description: 'Documentation for InterceptSuite and ProxyBridge.',
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
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Documentation</p>
            <h1 className="text-4xl font-bold text-content tracking-tight mb-3">Choose a Product</h1>
            <p className="text-content-muted max-w-xl">
              Select the product you want to explore documentation for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* InterceptSuite */}
            <Link
              href="/docs/interceptsuite"
              className="group flex flex-col gap-5 p-8 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content group-hover:text-accent-light transition-colors">InterceptSuite</h2>
                  <p className="text-xs text-content-dim">Advanced SOCKS5 proxy &amp; TLS interceptor</p>
                </div>
              </div>
              <p className="text-sm text-content-muted leading-relaxed">
                Full documentation for installation, configuration, traffic interception, proxy history, and the Python extension API.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Installation', 'Quick Start', 'Extensions', 'API Reference'].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-[#2A2A2A] text-content-dim">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1.5 text-sm font-medium text-accent-light mt-auto">
                Browse docs <ArrowIcon />
              </span>
            </Link>

            {/* ProxyBridge */}
            <a
              href="https://github.com/InterceptSuite/ProxyBridge#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-5 p-8 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="text-content-muted">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-content group-hover:text-accent-light transition-colors">ProxyBridge</h2>
                  <p className="text-xs text-content-dim">Open source proxy client</p>
                </div>
              </div>
              <p className="text-sm text-content-muted leading-relaxed">
                Route any application through InterceptSuite regardless of its own proxy settings. Works on Windows, macOS, and Linux.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Open Source', 'Windows', 'macOS', 'Linux'].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-[#2A2A2A] text-content-dim">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1.5 text-sm font-medium text-content-muted group-hover:text-accent-light transition-colors mt-auto">
                View on GitHub <ArrowIcon />
              </span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
