"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { experiments } from "@/lib/data"
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right"

export function ExperimentsPreview() {
  // 只显示前4个实验
  const featuredExperiments = experiments.slice(0, 4)

  return (
    <section className="py-32 px-4 md:px-12 bg-white text-black relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-10 w-96 h-96 bg-accent-pink blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-green blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-end justify-between mb-20 border-b-4 border-black/20 pb-6">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
            THE
            <span className="inline-block bg-accent-pink text-white px-4 py-2 border-4 border-black rotate-[1deg] ml-4">
              LAB
            </span>
          </h2>
          <span className="font-mono text-xl font-black mb-2 hidden md:block border-2 border-black bg-black text-white px-3 py-1">
            001—004
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {featuredExperiments.map((exp, index) => {
            const Icon = exp.icon
            return (
              <Link key={exp.id} href={`/lab/${exp.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative ${exp.color} border-4 border-black cursor-pointer overflow-hidden h-[280px] flex flex-col justify-between p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300`}
                >
                  {/* ID 标签 */}
                  <div className="absolute top-4 right-4 w-10 h-10 border-2 border-black bg-white flex items-center justify-center font-black text-sm">
                    {String(exp.id).padStart(2, "0")}
                  </div>

                  <div>
                    <div className="mb-4">
                      <Icon className="w-12 h-12 text-black" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-black mb-3">
                      {exp.title}
                    </h3>
                    <p className="text-sm font-mono text-black/80 line-clamp-2">{exp.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-bold bg-black text-white px-2 py-1 border border-black"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                      <ArrowUpRight className="w-6 h-6 text-black" strokeWidth={3} />
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
          className="flex justify-center"
        >
          <Link href="/lab">
            <button className="bg-black text-white font-black text-xl px-12 py-6 border-4 border-black hover:bg-accent-green hover:text-black transition-all duration-300 shadow-[8px_8px_0px_0px_var(--accent-pink)]">
              VIEW ALL EXPERIMENTS →
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
