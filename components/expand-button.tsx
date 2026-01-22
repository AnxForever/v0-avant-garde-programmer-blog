"use client"

import { memo } from "react"
import { motion } from "framer-motion"

interface ExpandButtonProps {
  isExpanded: boolean
  onToggle: () => void
  totalPosts: number
}

/**
 * Expand/collapse button component with framer-motion animations
 * Designed for dynamic import to reduce initial bundle size
 * Maintains Neo-Brutalist design aesthetic with bold borders and shadows
 */
export const ExpandButton = memo(function ExpandButton({
  isExpanded,
  onToggle,
  totalPosts,
}: ExpandButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center mt-8 md:mt-12"
    >
      <button
        onClick={onToggle}
        className="group relative bg-black text-white px-6 md:px-8 py-3 md:py-4 font-bold text-sm md:text-lg uppercase tracking-wider border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,255,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,255,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,0,255,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(255,0,255,1)] hover:-translate-y-1 transition-all duration-300"
      >
        <span className="flex items-center gap-2 md:gap-3">
          {isExpanded ? "收起内容" : `查看全部 (${totalPosts})`}
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ↓
          </motion.span>
        </span>
      </button>
    </motion.div>
  )
})

export default ExpandButton
