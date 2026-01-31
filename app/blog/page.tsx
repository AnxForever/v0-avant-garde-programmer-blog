import { Suspense } from 'react'
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { getCachedPostsForList, type PostListItem } from "@/lib/blog-data"
import { BlogListingClient } from "@/components/blog-listing-client"
import Link from "next/link"

export const metadata = {
  title: 'Blog - Thoughts',
  description: 'Articles about programming, data science, and AI',
}

export default function BlogPage() {
  const posts = getCachedPostsForList()

  return (
    <main className="min-h-screen bg-white selection:bg-accent-pink selection:text-white">
      <Nav />

      <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Static title - no animation needed on server */}
        <h1 className="text-[15vw] md:text-[12vw] leading-[0.8] font-black tracking-tighter mb-10 md:mb-20 text-black drop-shadow-[6px_6px_0px_rgba(0,255,0,1)] md:drop-shadow-[10px_10px_0px_rgba(0,255,0,1)]">
          THOUGHTS
        </h1>

        {/* Client component with animations loaded dynamically */}
        <Suspense fallback={<BlogListingFallback posts={posts} />}>
          <BlogListingClient posts={posts} />
        </Suspense>
      </div>

      <Footer />
    </main>
  )
}

// Fallback shows static content while animations load
// Prevents CLS by showing the same layout structure as the final content
function BlogListingFallback({ posts }: { posts: PostListItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:gap-8">
      {posts.slice(0, 4).map((post) => (
        <StaticBlogCard key={post.id} post={post} />
      ))}
    </div>
  )
}

/**
 * Static blog card component for fallback UI
 * Matches the exact dimensions and styling of AnimatedBlogCard to prevent CLS
 * Uses CSS transitions for progressive enhancement
 */
function StaticBlogCard({ post }: { post: PostListItem }) {
  return (
    <Link href={`/blog/${post.slug}`}>
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
    </Link>
  )
}
