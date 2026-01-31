"use client"

import { motion } from "framer-motion"
import type React from "react"
import { useReducedMotion } from "@/lib/use-reduced-motion"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    clipPath: "inset(0 0 20% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
}

/**
 * 交错动画容器
 * 包裹的子元素会依次入场
 */
export function StaggerChildren({ children, className }: StaggerChildrenProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

/**
 * 交错动画子项
 * 必须作为 StaggerChildren 的子元素使用
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
