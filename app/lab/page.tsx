"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { experiments } from "@/lib/data"
import dynamic from "next/dynamic"

const INITIAL_DISPLAY_COUNT = 6

// 动态导入背景组件，禁用 SSR 以避免 hydration 不匹配
const LabBackground = dynamic(() => import("@/components/lab-background").then((mod) => mod.LabBackground), {
  ssr: false,
})

export default function LabPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const displayedExperiments = isExpanded ? experiments : experiments.slice(0, INITIAL_DISPLAY_COUNT)
  const hasMoreExperiments = experiments.length > INITIAL_DISPLAY_COUNT

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent-green selection:text-black overflow-hidden relative">
      <Nav />

      {/* Background Animation */}
      <LabBackground />

      <div className="relative z-10 pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 md:mb-20 border-b border-white/20 pb-4 md:pb-8">
          <h1 className="text-[14vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            THE LAB
          </h1>
          <p className="font-mono text-xs md:text-base max-w-xs text-left md:text-right mt-3 md:mt-0 text-accent-green">
            EXPERIMENTAL PLAYGROUND FOR DIGITAL CHAOS AND CODE POETRY.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          <AnimatePresence>
          {displayedExperiments.map((exp, index) => (
            <Link href={`/lab/${exp.slug}`} key={exp.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="aspect-square border border-white/10 relative group cursor-pointer overflow-hidden bg-white/5 hover:border-accent-pink/50 transition-colors duration-500"
              >
                <div className="absolute top-2 left-2 md:top-4 md:left-4 font-mono text-[10px] md:text-xs text-accent-blue opacity-70">
                  {exp.id} // {exp.tags[0]}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl md:text-4xl font-black tracking-tighter group-hover:scale-125 transition-transform duration-500 z-10 group-hover:text-black mix-blend-difference text-center px-2 md:px-4">
                    {exp.title}
                  </h3>
                </div>

                {/* Interactive Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent-pink via-accent-blue to-accent-green opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: hoveredIndex === index ? ["0% 0%", "100% 100%"] : "0% 0%",
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  style={{ backgroundSize: "200% 200%" }}
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-20 pointer-events-none" />

                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-[10px] md:text-xs font-bold text-black z-20">
                  LAUNCH_EXP →
                </div>
              </motion.div>
            </Link>
          ))}
          </AnimatePresence>
        </div>

        {/* 展开/收起按钮 */}
        {hasMoreExperiments && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8 md:mt-12"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group relative bg-white text-black px-6 md:px-8 py-3 md:py-4 font-bold text-base md:text-lg uppercase tracking-wider border-2 md:border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,0,255,1)] md:shadow-[6px_6px_0px_0px_rgba(255,0,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,255,255,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,255,255,1)] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center gap-2 md:gap-3">
                {isExpanded ? "收起内容" : `查看全部实验 (${experiments.length})`}
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ↓
                </motion.span>
              </span>
            </button>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  )
}
