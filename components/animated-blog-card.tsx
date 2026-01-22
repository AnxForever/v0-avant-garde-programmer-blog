"use client"

import { memo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Post } from '@/lib/blog-data'

interface AnimatedBlogCardProps {
  post: Post
  index: number
}

// Static content extracted outside motion wrapper to prevent unnecessary re-renders
function BlogCardContent({ post }: { post: Post }) {
  return (
    <>
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
    </>
  )
}

/**
 * Animated blog card component with framer-motion animations
 * Wrapped in React.memo() to prevent unnecessary re-renders
 * Maintains all original Tailwind classes and Neo-Brutalist styling
 */
export const AnimatedBlogCard = memo(function AnimatedBlogCard({
  post,
  index,
}: AnimatedBlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative bg-white border-2 md:border-4 border-black p-4 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,0,255,1)] md:hover:shadow-[16px_16px_0px_0px_rgba(255,0,255,1)] hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300"
      >
        <BlogCardContent post={post} />
      </motion.div>
    </Link>
  )
})

// Default export for dynamic import compatibility
export default AnimatedBlogCard
