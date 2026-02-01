"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { projects } from "@/lib/data"

const INITIAL_DISPLAY_COUNT = 3

export default function WorkPage() {
  const [isExpanded, setIsExpanded] = useState(false)
  const displayedProjects = isExpanded ? projects : projects.slice(0, INITIAL_DISPLAY_COUNT)
  const hasMoreProjects = projects.length > INITIAL_DISPLAY_COUNT

  return (
    <main className="min-h-screen bg-white selection:bg-accent-pink selection:text-white">
      <Nav />

      <div className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-12 max-w-7xl mx-auto">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-[14vw] md:text-[12vw] leading-[0.8] font-black tracking-tighter mb-10 md:mb-20 text-black"
        >
          SELECTED <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-green">WORKS</span>
        </motion.h1>

        <div className="grid grid-cols-1 gap-12 md:gap-32">
          <AnimatePresence>
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 md:gap-20 items-center`}
            >
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 bg-accent-pink translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 group-hover:translate-x-1 group-hover:translate-y-1 md:group-hover:translate-x-2 md:group-hover:translate-y-2 transition-transform duration-300" />
                <div className="relative overflow-hidden border-2 border-black aspect-[4/3]">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-6">
                <div className="flex items-center gap-3 md:gap-4 font-mono text-xs md:text-sm">
                  <span className="bg-black text-white px-2 py-1">{project.year}</span>
                  <span className="text-gray-500">{project.client}</span>
                </div>

                <h2 className="text-3xl md:text-7xl font-black leading-[0.9]">{project.title}</h2>

                <p className="text-base md:text-xl font-mono leading-relaxed max-w-md">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-2 md:mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-black px-2 md:px-3 py-1 text-xs font-bold hover:bg-accent-green hover:border-accent-green transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/work/${project.slug}`}>
                  <button className="w-fit mt-4 md:mt-8 flex items-center gap-2 text-base md:text-lg font-bold group/btn">
                    查看案例
                    <span className="group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>

        {/* 展开/收起按钮 */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-12 md:mt-20"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group relative bg-black text-white px-6 md:px-8 py-3 md:py-4 font-bold text-base md:text-lg uppercase tracking-wider border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,255,255,1)] md:shadow-[6px_6px_0px_0px_rgba(0,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,255,0,1)] md:hover:shadow-[8px_8px_0px_0px_rgba(0,255,0,1)] hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center gap-2 md:gap-3">
                {isExpanded ? "收起内容" : `查看全部作品 (${projects.length})`}
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
