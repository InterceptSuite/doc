import Link from 'next/link'

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function RocketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function PuzzleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.568 1.568c-.23.23-.338.556-.289.878l.367 2.207c.198 1.189-.793 2.179-1.982 1.982l-2.207-.367a1.02 1.02 0 0 0-.878.289l-1.569 1.568c-.47.47-1.086.706-1.703.706s-1.233-.235-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.288l-2.208.367c-1.189.198-2.179-.793-1.982-1.982l.367-2.208a1.026 1.026 0 0 0-.288-.877l-1.568-1.568C2.235 13.233 2 12.617 2 12s.235-1.233.706-1.704L4.274 8.73c.23-.23.338-.555.289-.877L4.196 5.646c-.198-1.189.793-2.179 1.982-1.982l2.208.367a1.02 1.02 0 0 0 .877-.289l1.568-1.568C11.302 1.706 11.917 1.47 12.534 1.47s1.233.235 1.704.706l1.568 1.568c.23.23.556.338.878.289l2.207-.367c1.189-.198 2.179.793 1.982 1.982l-.434 2.202z" />
    </svg>
  )
}

const icons = {
  rocket: RocketIcon,
  layers: LayersIcon,
  puzzle: PuzzleIcon,
}

export default function CategoryCard({ category }) {
  const Icon = icons[category.icon] || LayersIcon

  return (
    <Link
      href={`/docs/interceptsuite/${category.items[0].slug}`}
      className="group block p-7 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${category.color}18`, border: `1px solid ${category.color}28` }}
        >
          <span style={{ color: category.color }}>
            <Icon />
          </span>
        </div>
        <span className="text-xs text-content-dim bg-white/[0.04] border border-[#1A1A1A] px-2.5 py-1 rounded-full">
          {category.items.length} articles
        </span>
      </div>

      <h3 className="text-base font-semibold text-content mb-1.5 group-hover:text-accent-light transition-colors">
        {category.category}
      </h3>
      <p className="text-sm text-content-muted leading-relaxed mb-5">
        {category.description}
      </p>

      <ul className="space-y-1.5 mb-5">
        {category.items.slice(0, 3).map((item) => (
          <li
            key={item.slug}
            className="flex items-center gap-2 text-sm text-content-dim"
          >
            <span className="w-1 h-1 rounded-full bg-[#2A2A2A] flex-shrink-0" />
            {item.title}
          </li>
        ))}
        {category.items.length > 3 && (
          <li className="text-xs text-content-dim pl-3">
            +{category.items.length - 3} more
          </li>
        )}
      </ul>

      <div className="flex items-center gap-1.5 text-xs font-medium text-content-muted group-hover:text-accent-light transition-colors">
        View all articles
        <span className="group-hover:translate-x-0.5 transition-transform">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  )
}
