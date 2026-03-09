import Link from 'next/link'

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default function BlogCard({ post, featured = false }) {
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block p-8 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] col-span-2"
      >
        <div className="flex items-center gap-2.5 mb-4">
          {post.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent-light border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-content mb-3 group-hover:text-accent-light transition-colors leading-snug">
          {post.title}
        </h2>
        <p className="text-content-muted text-base leading-relaxed mb-6 line-clamp-3">
          {post.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center">
              <span className="text-xs font-semibold text-white">
                {post.author?.charAt(0) || 'I'}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-content">{post.author || 'InterceptSuite Team'}</p>
              <div className="flex items-center gap-2 text-xs text-content-dim">
                {dateStr && <span>{dateStr}</span>}
                {post.readTime && <><span>·</span><span>{post.readTime}</span></>}
              </div>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-medium text-content-muted group-hover:text-accent-light transition-colors">
            Read post <ArrowIcon />
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col p-6 rounded-2xl border border-[#1A1A1A] bg-card hover:bg-card-hover hover:border-[#2A2A2A] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    >
      {post.tags?.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent-light border border-accent/20">
            {post.tags[0]}
          </span>
        </div>
      )}

      <h3 className="text-base font-semibold text-content mb-2 group-hover:text-accent-light transition-colors leading-snug line-clamp-2 flex-1">
        {post.title}
      </h3>
      <p className="text-sm text-content-muted leading-relaxed mb-4 line-clamp-2 flex-1">
        {post.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#1A1A1A]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center">
            <span className="text-[10px] font-semibold text-white">
              {post.author?.charAt(0) || 'I'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-content-dim">
            {dateStr && <span>{dateStr}</span>}
            {post.readTime && <><span>·</span><span>{post.readTime}</span></>}
          </div>
        </div>
        <span className="text-content-dim group-hover:text-accent-light transition-colors">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  )
}
