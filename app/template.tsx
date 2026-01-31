"use client"

import { motion } from "framer-motion"
import type React from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()

  // 尊重用户的减少动画偏好
  if (prefersReducedMotion) {
    return <div>{children}</div>
  }

  return (
    <motion.div
      initial={{
        clipPath: "inset(0 0 8% 0)",
        opacity: 0.3,
        y: 30,
      }}
      animate={{
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        clipPath: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3, delay: 0.1 },
        y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.div>
  )
}
