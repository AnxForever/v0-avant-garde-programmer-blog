"use client"

import { motion } from "framer-motion"
import type React from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4,
      }}
    >
      {children}
    </motion.div>
  )
}
