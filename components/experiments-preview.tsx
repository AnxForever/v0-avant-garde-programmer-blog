"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { experiments } from "@/lib/data"
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right"
import type { LucideIcon } from "lucide-react"

// 渐变配色方案 - 提升到模块级别
const gradientColors = [
  { gradient: "from-pink-500 to-orange-400", shadow: "rgba(236,72,153,0.6)", accent: "text-pink-500" },
  { gradient: "from-green-400 to-cyan-500", shadow: "rgba(34,197,94,0.6)", accent: "text-green-500" },
  { gradient: "from-violet-500 to-purple-500", shadow: "rgba(139,92,246,0.6)", accent: "text-violet-500" },
  { gradient: "from-amber-400 to-orange-500", shadow: "rgba(251,191,36,0.6)", accent: "text-amber-500" },
] as const

type Experiment = {
  id: number
  slug: string
  title: string
  description: string
  icon: LucideIcon
  tags: string[]
}

export function ExperimentsPreview() {
  const featuredExperiments = experiments.slice(0, 4)

  return (
    <section className="py-12 md:py-32 px-4 md:px-12 bg-white text-black relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-pink-400 to-orange-300 blur-3xl rounded-full" />
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-gradient-to-br from-green-400 to-cyan-400 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 标题区域 */}
        <div className="flex items-end justify-between mb-8 md:mb-20 border-b-2 border-black/10 pb-4 md:pb-6">
          <h2 className="text-4xl md:text-8xl font-black tracking-tighter">
            THE{" "}
            <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
              LAB
            </span>
          </h2>
          <span className="font-mono text-sm text-black/40 mb-2 hidden md:block">
            001—004
          </span>
        </div>

        {/* ====== 移动端：水平滚动卡片 ====== */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 snap-x">
          <div className="flex gap-3" style={{ width: "max-content" }}>
            {featuredExperiments.map((exp, index) => (
              <MobileExperimentCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>
          {/* 滚动提示 */}
          <div className="flex items-center justify-center mt-4 gap-1">
            {featuredExperiments.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/20" />
            ))}
            <span className="text-[10px] text-black/30 ml-2 font-mono">← 滑动 →</span>
          </div>
        </div>

        {/* ====== PC端：网格布局 ====== */}
        <div className="hidden md:grid grid-cols-2 gap-8 mb-12">
          {featuredExperiments.map((exp, index) => {
            const Icon = exp.icon
            const colorScheme = gradientColors[index % gradientColors.length]
            return (
              <Link key={exp.id} href={`/lab/${exp.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white border-4 border-black cursor-pointer overflow-hidden h-[280px] flex flex-col justify-between p-6 transition-all duration-300"
                  style={{
                    boxShadow: `6px 6px 0px 0px ${colorScheme.shadow}`,
                  }}
                  whileHover={{
                    x: 3,
                    y: 3,
                    boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
                  }}
                >
                  {/* L形装饰线 */}
                  <div className={`absolute top-0 left-0 w-16 h-1 bg-gradient-to-r ${colorScheme.gradient}`} />
                  <div className={`absolute top-0 left-0 w-1 h-16 bg-gradient-to-b ${colorScheme.gradient}`} />
                  <div className={`absolute bottom-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${colorScheme.gradient}`} />

                  {/* ID 标签 */}
                  <div className="absolute top-4 right-4 font-mono text-2xl font-black text-black/10">
                    {String(exp.id).padStart(2, "0")}
                  </div>

                  <div>
                    <div className="mb-4">
                      <Icon className={`w-10 h-10 ${colorScheme.accent}`} strokeWidth={2.5} />
                    </div>
                    <h3 className={`text-2xl md:text-3xl font-black tracking-tight leading-tight mb-3 bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
                      {exp.title}
                    </h3>
                    <p className="text-sm font-mono text-black/60 line-clamp-2">{exp.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-bold ${colorScheme.accent} bg-transparent border border-current px-2 py-1`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center group-hover:rotate-45 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-black" strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>

        {/* 查看全部按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-6 md:mt-0"
        >
          <Link href="/lab">
            <button className="bg-white text-black font-black text-base md:text-xl px-8 md:px-12 py-4 md:py-6 border-2 md:border-4 border-black hover:bg-black hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(139,92,246,0.6)] md:shadow-[6px_6px_0px_0px_rgba(139,92,246,0.6)]">
              VIEW ALL EXPERIMENTS →
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ====== 移动端实验卡片 ======
function MobileExperimentCard({ exp, index }: { exp: Experiment; index: number }) {
  const Icon = exp.icon
  const colorScheme = gradientColors[index % gradientColors.length]

  return (
    <Link href={`/lab/${exp.slug}`} className="snap-start">
      <div className="w-[260px] flex-shrink-0 bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all">
        {/* 顶部装饰线 */}
        <div className={`absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r ${colorScheme.gradient}`} />

        <div className="flex items-start gap-3 mb-3">
          <Icon className={`w-7 h-7 ${colorScheme.accent} flex-shrink-0`} strokeWidth={2.5} />
          <div className="min-w-0">
            <h3 className={`text-base font-black leading-tight mb-1 bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
              {exp.title}
            </h3>
            <p className="text-[11px] text-black/50 line-clamp-2 font-mono">{exp.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {exp.tags.slice(0, 2).map(tag => (
              <span key={tag} className={`text-[10px] font-bold px-1.5 py-0.5 border border-current ${colorScheme.accent}`}>
                {tag}
              </span>
            ))}
          </div>
          <ArrowUpRight className="w-4 h-4 text-black/40" strokeWidth={2} />
        </div>
      </div>
    </Link>
  )
}
