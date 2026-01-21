"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export function BlogPostAnimations() {
  const prefersReducedMotion = useReducedMotion()
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll progress of the entire page
  const { scrollYProgress } = useScroll()
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  // For reduced motion, track scroll progress manually with CSS
  useEffect(() => {
    if (!prefersReducedMotion) return

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const progress = scrollTop / (documentHeight - windowHeight)
      setScrollProgress(Math.min(progress * 100, 100))
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  // If user prefers reduced motion, show static progress bar with CSS transitions
  if (prefersReducedMotion) {
    return (
      <>
        {/* Static Progress Bar with CSS transition */}
        <div
          className="fixed top-0 left-0 h-4 bg-accent-pink z-50 origin-left border-b-4 border-black transition-all duration-150"
          style={{
            width: `${scrollProgress}%`
          }}
        />
      </>
    )
  }

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 h-4 bg-accent-pink z-50 origin-left border-b-4 border-black"
      />

      {/* Floating Element - 移动端隐藏 */}
      <motion.div
        style={{ rotate }}
        className="fixed top-20 right-0 w-32 h-32 md:w-64 md:h-64 border-8 border-black border-dashed rounded-full items-center justify-center opacity-20 pointer-events-none hidden md:flex"
      >
        <div className="w-full text-center font-black text-xl">SCROLL</div>
      </motion.div>
    </>
  )
}

export default BlogPostAnimations
