import { Suspense } from "react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { BlogPostHeader } from "@/components/blog-post-header"
import { BlogPostArticle } from "@/components/blog-post-article"
import { BlogPostAnimations } from "@/components/blog-post-animations"

interface Post {
  id: number
  title: string
  category: string
  date: string
  slug: string
  content: string
  isGraduation?: boolean
}

interface BlogPostContentProps {
  post: Post
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <main className="min-h-screen bg-white selection:bg-accent-pink selection:text-white">
      <Nav />

      {/* Lazy-loaded animations with fallback that prevents CLS */}
      <Suspense fallback={<BlogPostAnimationsFallback />}>
        <BlogPostAnimations />
      </Suspense>

      {/* Server-rendered header */}
      <BlogPostHeader post={post} />

      {/* Server-rendered article content */}
      <BlogPostArticle post={post} />

      <Footer />
    </main>
  )
}

/**
 * Fallback for blog post animations that prevents Cumulative Layout Shift (CLS)
 * Shows a static progress bar placeholder with the same dimensions as the animated version
 */
function BlogPostAnimationsFallback() {
  return (
    <>
      {/* Static Progress Bar placeholder - matches final dimensions */}
      <div
        className="fixed top-0 left-0 h-4 bg-gray-200 z-50 origin-left border-b-4 border-black"
        style={{ width: '0%' }}
        aria-hidden="true"
      />
      
      {/* Floating Element placeholder - hidden on mobile, matches final dimensions */}
      <div
        className="fixed top-20 right-0 w-32 h-32 md:w-64 md:h-64 border-8 border-gray-200 border-dashed rounded-full items-center justify-center opacity-10 pointer-events-none hidden md:flex"
        aria-hidden="true"
      >
        <div className="w-full text-center font-black text-xl text-gray-300">SCROLL</div>
      </div>
    </>
  )
}
