import { cache } from 'react'
import { posts } from '@/lib/data'

export interface Post {
  id: number
  title: string
  category: string
  date: string
  slug: string
  content: string
  isGraduation?: boolean
}

/**
 * Cached function to get all posts
 * Uses React.cache() to deduplicate requests within a single render
 */
export const getCachedPosts = cache((): Post[] => {
  return posts
})

/**
 * Cached function to get a single post by slug
 * Uses React.cache() to deduplicate requests within a single render
 */
export const getCachedPost = cache((slug: string): Post | undefined => {
  return posts.find((p) => p.slug === slug)
})

/**
 * Cached function to get all post slugs for static generation
 * Uses React.cache() to deduplicate requests within a single render
 */
export const getCachedPostSlugs = cache((): string[] => {
  return posts.map((p) => p.slug)
})

/**
 * Utility to extract plain text description from markdown content
 * Removes markdown syntax and truncates to specified length
 * Uses React.cache() for memoization
 */
export const extractDescription = cache((content: string, maxLength: number = 160): string => {
  // Remove markdown syntax: #, *, `, [, ]
  const plainText = content.replace(/[#*`\[\]]/g, '').trim()
  
  // Truncate to maxLength and add ellipsis if needed
  return plainText.slice(0, maxLength) + (plainText.length > maxLength ? '...' : '')
})
