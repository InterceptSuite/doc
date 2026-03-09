'use client'

export default function SearchTriggerClient() {
  const trigger = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }))
  }

  return (
    <button
      onClick={trigger}
      className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl border border-[#2A2A2A] bg-white/[0.025] hover:border-accent/30 hover:bg-accent/[0.04] hover:shadow-[0_0_0_4px_rgba(124,58,237,0.06)] transition-all cursor-pointer group"
      aria-label="Search documentation (Cmd K)"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-content-dim group-hover:text-accent-light transition-colors flex-shrink-0">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span className="flex-1 text-left text-content-dim text-sm">Search documentation...</span>
      <div className="flex items-center gap-1">
        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-content-dim">⌘</kbd>
        <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-content-dim">K</kbd>
      </div>
    </button>
  )
}
