"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import ArrowDownRight from "lucide-react/dist/esm/icons/arrow-down-right"
import Code from "lucide-react/dist/esm/icons/code"
import Zap from "lucide-react/dist/esm/icons/zap"
import Globe from "lucide-react/dist/esm/icons/globe"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white overflow-hidden selection:bg-accent-pink selection:text-white"
    >
      <Nav />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 opacity-10 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-r border-b border-black h-full" />
          ))}
        </div>

        <motion.div style={{ y, rotate }} className="absolute right-10 top-20 w-64 h-64 md:w-96 md:h-96 z-0">
          <div className="w-full h-full bg-accent-pink rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
        </motion.div>
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]), rotate: -45 }}
          className="absolute left-10 bottom-20 w-72 h-72 md:w-[30rem] md:h-[30rem] z-0"
        >
          <div className="w-full h-full bg-accent-blue rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-700" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="text-[15vw] leading-[0.8] font-black tracking-tighter text-center mix-blend-difference text-black"
          >
            VIBE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-pink via-accent-green to-accent-blue animate-gradient-x">
              CODER
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-3xl font-mono text-center mt-8 max-w-2xl mx-auto"
          >
            数据科学 × AI × 音乐 × 动漫 = 无限可能
          </motion.p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-24 md:py-40 relative z-10 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden border-4 border-black bg-black group">
              <Image
                src="/profile-avatar.jpg"
                alt="Anx的头像"
                width={600}
                height={800}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-accent-green mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-full p-4 bg-black text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-mono text-sm">VIBE.CODER</p>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-accent-pink" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-accent-blue" />
          </motion.div>

          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black tracking-tighter"
            >
              <span className="text-accent-pink">Anx</span>
              <br />
              <span className="text-accent-green">Forever</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl font-mono leading-relaxed"
            >
              数据科学 & AI 开发者 · Vibe Coding 信徒
              <br />
              <br />
              我在数据的海洋中寻找模式，在 AI
              的黑盒中探索可能，在音乐和动漫中汲取灵感。我相信最好的代码不是写出来的，而是&apos;感觉&apos;出来的。
            </motion.p>
            <div className="flex flex-wrap gap-4">
              {["Python", "TensorFlow", "Next.js", "数据可视化", "音乐", "动漫"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 border-2 border-black font-bold hover:bg-black hover:text-white transition-colors cursor-crosshair"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Manifesto */}
      <section className="py-24 bg-black text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/abstract-noise.png')] opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "直觉 / INTUITION",
                desc: "数据告诉我们是什么，但直觉告诉我们为什么。最好的洞察往往来自二者的结合。",
                color: "text-accent-yellow",
              },
              {
                icon: Code,
                title: "探索 / EXPLORATION",
                desc: "从 Python 到 JavaScript，从数据分析到前端开发，保持好奇心，永不停止学习。",
                color: "text-accent-pink",
              },
              {
                icon: Globe,
                title: "创造 / CREATION",
                desc: "用代码创造美，用数据讲述故事，用 AI 拓展想象力的边界。",
                color: "text-accent-blue",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="border border-white/20 p-8 hover:bg-white/5 transition-colors group"
              >
                <item.icon className={`w-12 h-12 mb-6 ${item.color}`} />
                <h3 className="text-4xl font-black mb-4 group-hover:translate-x-2 transition-transform">
                  {item.title}
                </h3>
                <p className="font-mono text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-40 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl md:text-7xl font-black mb-20 text-center"
          >
            我的旅程 / JOURNEY
          </motion.h2>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-black transform md:-translate-x-1/2" />

            {[
              { year: "2025", title: "创建个人博客", company: "记录 Vibe Coding 之旅", side: "left" },
              { year: "2024", title: "深入学习 AI", company: "探索大语言模型与生成式 AI", side: "right" },
              { year: "2023", title: "数据可视化项目", company: "用图表讲述数据故事", side: "left" },
              { year: "2021", title: "进入大学", company: "开始数据科学专业学习", side: "right" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`relative flex items-center justify-between mb-12 md:mb-24 ${
                  item.side === "left" ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden md:block w-5/12" />
                <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-white border-4 border-black rounded-full transform -translate-x-1/2 z-10 hover:scale-150 transition-transform duration-300 hover:bg-accent-pink" />
                <div className="w-full md:w-5/12 pl-12 md:pl-0">
                  <div
                    className={`p-6 border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-white ${
                      item.side === "left" ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="text-accent-blue font-mono font-bold text-xl">{item.year}</span>
                    <h3 className="text-3xl font-bold mt-2">{item.title}</h3>
                    <p className="text-gray-600 font-mono">{item.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent-green text-black text-center overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
          >
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-8">
              一起
              <br />
              Vibe!
            </h2>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-2xl md:text-4xl font-bold border-4 border-black px-8 py-4 hover:bg-black hover:text-white transition-colors"
            >
              联系我 <ArrowDownRight className="w-8 h-8" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
