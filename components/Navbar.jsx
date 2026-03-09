'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.385.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.932 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23A11.51 11.51 0 0 1 12 5.803a11.5 11.5 0 0 1 3.008.404c2.29-1.553 3.297-1.23 3.297-1.23.653 1.652.243 2.873.12 3.176.769.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export default function Navbar({ searchData = [] }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const searchInputRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const handleSearch = useCallback(
    (q) => {
      setQuery(q)
      if (!q.trim()) {
        setResults([])
        return
      }
      const lower = q.toLowerCase()
      const hits = searchData
        .filter(
          (item) =>
            item.title.toLowerCase().includes(lower) ||
            (item.description || '').toLowerCase().includes(lower)
        )
        .slice(0, 8)
      setResults(hits)
    },
    [searchData]
  )

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
        setTimeout(() => searchInputRef.current?.focus(), 50)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setQuery('')
        setResults([])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openSearch = () => {
    setSearchOpen(true)
    setTimeout(() => searchInputRef.current?.focus(), 50)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setQuery('')
    setResults([])
  }

  const navLinks = [
    { href: '/docs/interceptsuite', label: 'InterceptSuite' },
    { href: '/docs/proxybridge', label: 'ProxyBridge' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-[rgba(5,5,5,0.92)] backdrop-blur-xl border-b border-[#1A1A1A]'
            : 'bg-transparent'
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="InterceptSuite Docs home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-semibold text-content tracking-tight text-sm">InterceptSuite</span>
              <span className="text-[10px] text-content-dim tracking-wide">Docs</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(({ href, label, external }) => (
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-content-muted hover:text-content hover:bg-white/[0.04]"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith(href)
                      ? 'text-content bg-white/5'
                      : 'text-content-muted hover:text-content hover:bg-white/[0.04]'
                  }`}
                >
                  {label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={openSearch}
              className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-[#1A1A1A] bg-white/[0.02] hover:border-[#2A2A2A] hover:bg-white/[0.04] transition-all text-content-muted text-sm cursor-pointer"
              aria-label="Search documentation"
            >
              <SearchIcon />
              <span>Search</span>
              <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-content-dim">
                ⌘K
              </kbd>
            </button>

            <a
              href="https://github.com/InterceptSuite/InterceptSuite"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-content-muted hover:text-content hover:bg-white/[0.06] transition-colors"
              aria-label="GitHub repository"
            >
              <GithubIcon />
            </a>

            <Link
              href="/docs/interceptsuite/installation"
              className="hidden md:flex items-center px-4 py-2 rounded-lg bg-accent hover:bg-accent-light text-white text-sm font-medium transition-colors"
            >
              Get Started
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-content-muted hover:text-content hover:bg-white/[0.06] transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[#1A1A1A] bg-[rgba(5,5,5,0.98)]">
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith(href)
                      ? 'text-content bg-white/5'
                      : 'text-content-muted hover:text-content hover:bg-white/[0.04]'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={() => { openSearch(); setMobileOpen(false) }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-content-muted hover:text-content hover:bg-white/[0.04] transition-colors"
              >
                <SearchIcon />
                Search documentation
              </button>
              <a
                href="https://github.com/InterceptSuite/InterceptSuite"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-content-muted hover:text-content hover:bg-white/[0.04] transition-colors"
              >
                <GithubIcon />
                GitHub
              </a>
              <div className="pt-2">
                <Link
                  href="/docs/installation"
                  className="flex items-center justify-center px-4 py-2.5 rounded-lg bg-accent hover:bg-accent-light text-white text-sm font-medium transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4"
          onClick={closeSearch}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-xl bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-[#1A1A1A]">
              <SearchIcon />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search documentation..."
                className="flex-1 bg-transparent text-content placeholder-content-dim text-sm outline-none"
              />
              <button
                onClick={closeSearch}
                className="px-2 py-1 rounded text-xs text-content-dim bg-white/5 border border-white/10 font-mono hover:text-content transition-colors"
              >
                ESC
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                <ul role="listbox">
                  {results.map((item) => (
                    <li key={`${item.type}-${item.slug}`} role="option">
                      <Link
                        href={`/${item.type}/${item.slug}`}
                        onClick={closeSearch}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors group"
                      >
                        <span
                          className={`mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                            item.type === 'docs'
                              ? 'bg-blue-500/15 text-blue-400'
                              : 'bg-amber-500/15 text-amber-400'
                          }`}
                        >
                          {item.type === 'docs' ? 'Doc' : 'Blog'}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-content group-hover:text-accent-light transition-colors">
                            {item.title}
                          </p>
                          {item.description && (
                            <p className="text-xs text-content-dim mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : query ? (
                <div className="px-4 py-10 text-center text-sm text-content-dim">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="px-4 py-10 text-center text-sm text-content-dim">
                  Start typing to search docs and blog posts
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
