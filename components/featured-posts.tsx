"use client"

import { motion } from "framer-motion"
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right"
import Link from "next/link"

// 提升到模块级别，避免每次渲染重建
const posts = [
  {
    id: 1,
    title: "Breaking the Grid",
    category: "CSS / DESIGN",
    date: "2025.05.21",
    slug: "breaking-the-grid",
  },
  {
    id: 2,
    title: "The Future of React",
    category: "ENGINEERING",
    date: "2025.05.18",
    slug: "future-of-react",
  },
  {
    id: 3,
    title: "Generative Art 101",
    category: "CREATIVE CODING",
    date: "2025.05.10",
    slug: "generative-art-101",
  },
  {
    id: 4,
    title: "Maximalism Rising",
    category: "OPINION",
    date: "2025.05.01",
    slug: "maximalism-rising",
  },
] as const

const decorColors = [
  { line: "border-accent-pink", gradient: "from-accent-pink to-accent-orange", tag: "bg-accent-pink/10 text-accent-pink" },
  { line: "border-accent-blue", gradient: "from-accent-blue to-accent-green", tag: "bg-accent-blue/10 text-accent-blue" },
  { line: "border-accent-green", gradient: "from-accent-green to-accent-yellow", tag: "bg-accent-green/10 text-black" },
  { line: "border-accent-orange", gradient: "from-accent-orange to-accent-pink", tag: "bg-accent-orange/10 text-accent-orange" },
] as const

export function FeaturedPosts() {
  return (
    <section id="thoughts" className="py-32 px-4 md:px-12 bg-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-accent-green to-accent-blue blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-accent-pink to-accent-yellow blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 标题区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div className="relative">
            {/* L形装饰线 */}
            <div className="absolute -top-6 -left-6 w-16 h-16 border-l-4 border-t-4 border-accent-green" />
            
            <h2 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-6">
              <span className="text-black">LATEST</span>
              <br />
              <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
                LOGS
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 font-mono max-w-md">
              // 技术思考与创意记录
            </p>
            
            {/* 装饰元素 */}
            <div className="absolute -bottom-4 right-0 w-3 h-3 bg-accent-pink rounded-full" />
            <div className="absolute -bottom-8 left-1/3 w-0.5 h-12 bg-accent-green" />
          </div>

          <div className="hidden md:flex items-end justify-end">
            <span className="font-mono text-6xl font-black text-gray-100">
              001—004
            </span>
          </div>
        </div>

        {/* 卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => {
            const colors = decorColors[index % decorColors.length]
            
            return (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white border-4 border-black p-8 h-[280px] flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.8)] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* L形装饰线 */}
                  <div className={`absolute -top-3 -left-3 w-10 h-10 border-l-4 border-t-4 ${colors.line}`} />
                  <div className={`absolute -bottom-3 -right-3 w-8 h-8 border-r-4 border-b-4 ${colors.line} opacity-50`} />

                  {/* 编号 */}
                  <div className="absolute top-6 right-6 font-mono text-4xl font-black text-gray-100">
                    0{index + 1}
                  </div>

                  <div>
                    {/* 分类标签 - 透明背景 */}
                    <div className={`inline-block font-mono text-xs font-bold mb-4 px-3 py-1.5 border-2 border-current ${colors.tag}`}>
                      {post.category}
                    </div>
                    
                    {/* 标题 - 渐变色 */}
                    <h3 className={`text-3xl md:text-4xl font-black tracking-tight leading-tight bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    {/* 日期 */}
                    <span className="font-mono text-sm text-gray-400">
                      // {post.date}
                    </span>
                    
                    {/* 箭头按钮 */}
                    <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                      <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* 装饰圆点 */}
                  <div className="absolute bottom-6 left-6 w-2 h-2 bg-black rounded-full opacity-20" />
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
          className="mt-16 flex justify-center"
        >
          <Link href="/blog">
            <button className="group relative bg-white text-black font-black text-lg px-10 py-5 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-300">
              <span className="relative z-10 flex items-center gap-3">
                VIEW ALL POSTS
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-green/20 to-accent-blue/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
