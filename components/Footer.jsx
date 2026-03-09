import Link from 'next/link'
import { docNavigation } from '@/lib/navigation'

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] bg-surface mt-24">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="font-semibold text-content tracking-tight">InterceptSuite</span>
            </Link>
            <p className="text-sm text-content-muted leading-relaxed">
              Official documentation for InterceptSuite and ProxyBridge - advanced network interception tools.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://github.com/InterceptSuite/InterceptSuite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2A] text-content-muted hover:text-content hover:border-[#3A3A3A] transition-colors"
                aria-label="InterceptSuite GitHub"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.385.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.932 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23A11.51 11.51 0 0 1 12 5.803a11.5 11.5 0 0 1 3.008.404c2.29-1.553 3.297-1.23 3.297-1.23.653 1.652.243 2.873.12 3.176.769.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://github.com/InterceptSuite/ProxyBridge"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#2A2A2A] text-content-muted hover:text-content hover:border-[#3A3A3A] transition-colors"
                aria-label="ProxyBridge GitHub"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.385.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.932 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23A11.51 11.51 0 0 1 12 5.803a11.5 11.5 0 0 1 3.008.404c2.29-1.553 3.297-1.23 3.297-1.23.653 1.652.243 2.873.12 3.176.769.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-content-dim mb-4">Documentation</p>
            <ul className="space-y-2.5">
              {docNavigation[0].items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/docs/interceptsuite/${item.slug}`}
                    className="text-sm text-content-muted hover:text-content transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-content-dim mb-4">ProxyBridge</p>
            <ul className="space-y-2.5">
              <li>
                <a href="https://github.com/InterceptSuite/ProxyBridge" target="_blank" rel="noopener noreferrer" className="text-sm text-content-muted hover:text-content transition-colors">Overview</a>
              </li>
              <li>
                <a href="https://github.com/InterceptSuite/ProxyBridge/releases" target="_blank" rel="noopener noreferrer" className="text-sm text-content-muted hover:text-content transition-colors">Download</a>
              </li>
              <li>
                <a href="https://github.com/InterceptSuite/ProxyBridge#readme" target="_blank" rel="noopener noreferrer" className="text-sm text-content-muted hover:text-content transition-colors">README</a>
              </li>
              <li>
                <a href="https://github.com/InterceptSuite/ProxyBridge/issues" target="_blank" rel="noopener noreferrer" className="text-sm text-content-muted hover:text-content transition-colors">Issues</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-content-dim mb-4">Features</p>
            <ul className="space-y-2.5">
              {docNavigation[1].items.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/docs/interceptsuite/${item.slug}`}
                    className="text-sm text-content-muted hover:text-content transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-content-dim mb-4">Resources</p>
            <ul className="space-y-2.5">
              <li>
                <Link href="/blog" className="text-sm text-content-muted hover:text-content transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/InterceptSuite/InterceptSuite/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-content-muted hover:text-content transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/InterceptSuite/InterceptSuite/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-content-muted hover:text-content transition-colors"
                >
                  GitHub Issues
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@interceptsuite.com"
                  className="text-sm text-content-muted hover:text-content transition-colors"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="https://interceptsuite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-content-muted hover:text-content transition-colors"
                >
                  Main Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-content-dim">
            &copy; {new Date().getFullYear()} InterceptSuite Team. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://interceptsuite.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-content-dim hover:text-content-muted transition-colors"
            >
              interceptsuite.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
