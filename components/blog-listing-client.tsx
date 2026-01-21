"use client"

import { useState, lazy, Suspense } from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/blog-data'
import { useReducedMotion } from '@/lib/use-reduced-motion'

// Dynamic imports for animation components
const AnimatedBlogCard = lazy(() => import('@/components/animated-blog-card'))
const ExpandButton = lazy(() => import('@/components/expand-button'))

const INITIAL_DISPLAY_COUNT = 4

interface BlogListingClientProps {
  posts: Post[]
}

/**
 * Client component that handles animations and interactivity
 * Uses lazy loading to defer animation library loading
 * Provides static fallbacks for progressive enhancement
 * Respects prefers-reduced-motion for accessibility
 */
export function BlogListingClient({ posts }: BlogListingClientProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const displayedPosts = isExpanded ? posts : posts.slice(0, INITIAL_DISPLAY_COUNT)
  const hasMorePosts = posts.length > INITIAL_DISPLAY_COUNT

  // If user prefers reduced motion, skip loading animations and show static content
  if (prefersReducedMotion) {
    return (
      <>
        <div className="grid grid-cols-1 gap-4 md:gap-8">
          <StaticPostList posts={displayedPosts} />
        </div>

        {hasMorePosts && (
          <StaticExpandButton 
            totalPosts={posts.length}
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
          />
        )}
      </>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:gap-8">
        <Suspense fallback={<StaticPostList posts={displayedPosts} />}>
          {displayedPosts.map((post, index) => (
            <AnimatedBlogCard key={post.id} post={post} index={index} />
          ))}
        </Suspense>
      </div>

      {hasMorePosts && (
        <Suspense fallback={<StaticExpandButton totalPosts={posts.length} />}>
          <ExpandButton
            isExpanded={isExpanded}
            onToggle={() => setIsExpanded(!isExpanded)}
            totalPosts={posts.length}
          />
        </Suspense>
      )}
    </>
  )
}

// Static fallback components for progressive enhancement

/**
 * Static post list fallback that matches the dimensions of animated cards
 * Prevents CLS by maintaining the same layout structure
 */
function StaticPostList({ posts }: { posts: Post[] }) {
  return (
    <>
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <StaticBlogCard post={post} />
        </Link>
      ))}
    </>
  )
}

/**
 * Static blog card that matches the exact dimensions and styling of AnimatedBlogCard
 * Uses CSS transitions instead of framer-motion for progressive enhancement
 */
function StaticBlogCard({ post }: { post: Post }) {
  return (
    <div className="group relative bg-white border-2 md:border-4 border-black p-4 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,0,255,1)] md:hover:shadow-[16px_16px_0px_0px_rgba(255,0,255,1)] hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300">
      <div className="absolute top-0 right-0 bg-black text-white px-2 md:px-4 py-1 md:py-2 font-mono text-xs md:text-sm transform translate-x-1 md:translate-x-2 -translate-y-1 md:-translate-y-2 group-hover:bg-accent-yellow group-hover:text-black transition-colors border-2 border-transparent group-hover:border-black">
        {post.category}
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        <span className="font-mono text-xs md:text-sm text-gray-500 group-hover:text-black transition-colors">
          // {post.date}
        </span>
        <h2 className="text-xl sm:text-2xl md:text-5xl font-black uppercase group-hover:text-accent-blue transition-colors leading-tight">
          {post.title}
        </h2>
        <div className="flex items-center gap-2 mt-2 md:mt-4">
          <span className="w-6 h-6 md:w-8 md:h-8 bg-black rounded-full flex items-center justify-center text-white group-hover:bg-accent-pink transition-colors text-sm md:text-base">
            →
          </span>
          <span className="font-bold font-mono text-sm md:text-base">READ_FILE</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Static expand button fallback that matches the dimensions of the animated version
 * Prevents CLS by maintaining the same height and spacing
 */
function StaticExpandButton({ 
  totalPosts, 
  isExpanded, 
  onToggle 
}: { 
  totalPosts: number
  isExpanded?: boolean
  onToggle?: () => void
}) {
  return (
    <div className="flex justify-center mt-8 md:mt-12">
      <button
        onClick={onToggle}
        className="group relative bg-black text-white px-6 md:px-8 py-3 md:py-4 font-bold text-sm md:text-lg uppercase tracking-wider border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,255,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,255,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,0,255,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(255,0,255,1)] hover:-translate-y-1 transition-all duration-300"
        aria-label={isExpanded ? 'Collapse posts' : `View all ${totalPosts} posts`}
      >
        <span className="flex items-center gap-2 md:gap-3">
          {isExpanded ? '收起' : `查看全部 (${totalPosts})`}
          <span className={isExpanded ? 'rotate-180 inline-block transition-transform' : ''}>↓</span>
        </span>
      </button>
    </div>
  )
}
