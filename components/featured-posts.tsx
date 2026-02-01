"use client"

import { motion } from "framer-motion"
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right"
import Link from "next/link"
import { posts } from "@/lib/data"

// 获取最新 4 篇文章（按 id 降序，排除毕业设计）
const featuredPosts = posts
  .filter((p) => !p.isGraduation)
  .slice(0, 4)

const decorColors = [
  { line: "border-accent-pink", gradient: "from-accent-pink to-accent-orange", tag: "bg-accent-pink/10 text-accent-pink" },
  { line: "border-accent-blue", gradient: "from-accent-blue to-accent-green", tag: "bg-accent-blue/10 text-accent-blue" },
  { line: "border-accent-green", gradient: "from-accent-green to-accent-yellow", tag: "bg-accent-green/10 text-black" },
  { line: "border-accent-orange", gradient: "from-accent-orange to-accent-pink", tag: "bg-accent-orange/10 text-accent-orange" },
] as const

type Post = (typeof featuredPosts)[number]

export function FeaturedPosts() {
  return (
    <section id="thoughts" className="py-12 md:py-32 px-4 md:px-12 bg-white relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-accent-green to-accent-blue blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-accent-pink to-accent-yellow blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 标题区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 mb-8 md:mb-16">
          <div className="relative">
            {/* L形装饰线 */}
            <div className="absolute -top-3 -left-3 md:-top-6 md:-left-6 w-10 md:w-16 h-10 md:h-16 border-l-4 border-t-4 border-accent-green" />

            <h2 className="text-4xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-3 md:mb-6">
              <span className="text-black">LATEST</span>
              <br />
              <span className="bg-gradient-to-r from-accent-green to-accent-blue bg-clip-text text-transparent">
                LOGS
              </span>
            </h2>

            <p className="text-base md:text-xl text-gray-600 font-mono max-w-md">
              // 技术思考与创意记录
            </p>

            {/* 装饰元素 */}
            <div className="absolute -bottom-4 right-0 w-3 h-3 bg-accent-pink rounded-full hidden md:block" />
            <div className="absolute -bottom-8 left-1/3 w-0.5 h-12 bg-accent-green hidden md:block" />
          </div>

          <div className="hidden md:flex items-end justify-end">
            <span className="font-mono text-6xl font-black text-gray-100">
              001—004
            </span>
          </div>
        </div>

        {/* ====== 移动端：紧凑列表 ====== */}
        <div className="md:hidden space-y-3">
          {featuredPosts.map((post, index) => (
            <MobileBlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        {/* ====== PC端：网格布局 ====== */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {featuredPosts.map((post, index) => {
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
                    {/* 分类标签 */}
                    <div className={`inline-block font-mono text-xs font-bold mb-4 px-3 py-1.5 border-2 border-current ${colors.tag}`}>
                      {post.category}
                    </div>

                    {/* 标题 */}
                    <h3 className={`text-3xl md:text-4xl font-black tracking-tight leading-tight bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                      {post.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="font-mono text-sm text-gray-400">
                      // {post.date}
                    </span>
                    <div className="w-12 h-12 border-2 border-black bg-white flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                      <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                  </div>

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
          className="mt-8 md:mt-16 flex justify-center"
        >
          <Link href="/blog">
            <button className="group relative bg-white text-black font-black text-base md:text-lg px-8 md:px-10 py-4 md:py-5 border-2 md:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-300">
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

// ====== 移动端博客卡片 ======
function MobileBlogCard({ post, index }: { post: Post; index: number }) {
  const colors = decorColors[index % decorColors.length]

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="group flex items-center gap-3 p-3 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
      >
        {/* 编号 */}
        <span className="text-2xl font-black text-gray-200 w-8 text-center flex-shrink-0">
          0{index + 1}
        </span>

        {/* 彩色竖线 */}
        <div className={`w-0.5 h-10 flex-shrink-0 bg-gradient-to-b ${colors.gradient}`} />

        {/* 内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[10px] font-bold ${colors.tag} px-1.5 py-0.5 border border-current`}>
              {post.category}
            </span>
            <span className="text-[10px] text-gray-400 font-mono">{post.date}</span>
          </div>
          <h3 className="text-sm font-black leading-tight truncate">{post.title}</h3>
        </div>

        {/* 箭头 */}
        <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-black/30 group-active:rotate-45 transition-transform" strokeWidth={2.5} />
      </motion.div>
    </Link>
  )
}
