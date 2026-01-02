"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import { ArrowLeft, Clock, User } from "lucide-react"

interface Post {
  id: number
  title: string
  category: string
  date: string
  slug: string
  content: string
  isGraduation?: boolean
}

interface BlogPostContentProps {
  post: Post
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <main ref={containerRef} className="min-h-screen bg-white selection:bg-accent-pink selection:text-white">
      <Nav />

      {/* Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 h-4 bg-accent-pink z-50 origin-left border-b-4 border-black"
      />

      <header className="pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-12 max-w-7xl mx-auto relative">
        {/* 返回按钮 */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-bold hover:text-accent-pink transition-colors mb-6 md:mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="border-b-2 border-transparent group-hover:border-accent-pink">返回博客列表</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block bg-accent-yellow border-2 md:border-4 border-black px-4 md:px-6 py-1 md:py-2 font-black text-sm md:text-xl mb-4 md:mb-8 shadow-[2px_2px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-2"
        >
          {post.category} // {post.date}
        </motion.div>

        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black uppercase leading-[1.1] mb-6 md:mb-12 drop-shadow-[4px_4px_0px_rgba(0,255,255,1)] md:drop-shadow-[8px_8px_0px_rgba(0,255,255,1)]">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2 md:gap-4 items-center font-mono text-xs md:text-sm border-y-2 md:border-y-4 border-black py-4 md:py-6 bg-gray-50">
          <div className="bg-black text-white px-2 md:px-3 py-1 flex items-center gap-1">
            <Clock className="w-3 h-3 md:w-4 md:h-4" />
            <span>5 分钟</span>
          </div>
          <span className="text-xl md:text-2xl">×</span>
          <div className="bg-black text-white px-2 md:px-3 py-1 flex items-center gap-1">
            <User className="w-3 h-3 md:w-4 md:h-4" />
            <span>V0</span>
          </div>
        </div>

        {/* Floating Element - 移动端隐藏 */}
        <motion.div
          style={{ rotate }}
          className="absolute top-20 right-0 w-32 h-32 md:w-64 md:h-64 border-8 border-black border-dashed rounded-full items-center justify-center opacity-20 pointer-events-none hidden md:flex"
        >
          <div className="w-full text-center font-black text-xl">SCROLL</div>
        </motion.div>
      </header>

      <article className="px-4 md:px-12 max-w-4xl mx-auto pb-16 md:pb-32">
        {/* 文章摘要 - 截取内容前150字符 */}
        <div className="bg-black text-white p-6 md:p-12 mb-8 md:mb-12 shadow-[8px_8px_0px_0px_rgba(255,0,255,1)] md:shadow-[16px_16px_0px_0px_rgba(255,0,255,1)] transform -rotate-1">
          <p className="text-base md:text-2xl font-bold leading-relaxed font-mono">
            &quot;{post.content.replace(/[#*`\[\]]/g, '').slice(0, 150).trim()}...&quot;
          </p>
        </div>

        {/* Markdown 内容渲染 */}
        <div className="prose prose-base md:prose-xl max-w-none
          prose-headings:font-black prose-headings:tracking-tight prose-headings:text-black
          prose-h1:text-2xl prose-h1:md:text-4xl prose-h1:border-b-2 prose-h1:md:border-b-4 prose-h1:border-black prose-h1:pb-2 prose-h1:md:pb-4 prose-h1:mb-4 prose-h1:md:mb-8
          prose-h2:text-xl prose-h2:md:text-3xl prose-h2:mt-8 prose-h2:md:mt-12 prose-h2:mb-4 prose-h2:md:mb-6 prose-h2:bg-accent-yellow prose-h2:inline-block prose-h2:px-2
          prose-h3:text-lg prose-h3:md:text-2xl prose-h3:mt-6 prose-h3:md:mt-8 prose-h3:mb-2 prose-h3:md:mb-4
          prose-p:font-mono prose-p:text-black prose-p:leading-relaxed prose-p:mb-4 prose-p:md:mb-6 prose-p:text-sm prose-p:md:text-base
          prose-strong:bg-accent-pink prose-strong:text-white prose-strong:px-1 prose-strong:font-black
          prose-code:bg-gray-900 prose-code:text-green-400 prose-code:px-1 prose-code:md:px-2 prose-code:py-0.5 prose-code:md:py-1 prose-code:border prose-code:md:border-2 prose-code:border-black prose-code:font-mono prose-code:text-xs prose-code:md:text-sm
          prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:md:p-6 prose-pre:border-2 prose-pre:md:border-4 prose-pre:border-black prose-pre:shadow-[4px_4px_0px_0px_rgba(0,255,255,1)] prose-pre:md:shadow-[8px_8px_0px_0px_rgba(0,255,255,1)] prose-pre:overflow-x-auto prose-pre:text-xs prose-pre:md:text-sm
          [&_pre_code]:bg-transparent [&_pre_code]:text-green-400 [&_pre_code]:border-0 [&_pre_code]:p-0
          prose-ul:list-disc prose-ul:pl-4 prose-ul:md:pl-6 prose-ul:space-y-1 prose-ul:md:space-y-2
          prose-ol:list-decimal prose-ol:pl-4 prose-ol:md:pl-6 prose-ol:space-y-1 prose-ol:md:space-y-2
          prose-li:font-mono prose-li:text-sm prose-li:md:text-base
          prose-blockquote:border-l-4 prose-blockquote:md:border-l-8 prose-blockquote:border-accent-pink prose-blockquote:bg-gray-50 prose-blockquote:p-4 prose-blockquote:md:p-6 prose-blockquote:italic prose-blockquote:font-mono
          prose-a:text-accent-pink prose-a:underline prose-a:decoration-2 prose-a:md:decoration-4 prose-a:underline-offset-2 prose-a:md:underline-offset-4 hover:prose-a:bg-accent-pink hover:prose-a:text-white
          prose-img:border-2 prose-img:md:border-4 prose-img:border-black prose-img:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] prose-img:md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
          prose-table:border-2 prose-table:md:border-4 prose-table:border-black prose-table:text-xs prose-table:md:text-base
          prose-th:bg-black prose-th:text-white prose-th:p-2 prose-th:md:p-4 prose-th:font-black
          prose-td:border prose-td:md:border-2 prose-td:border-black prose-td:p-2 prose-td:md:p-4 prose-td:font-mono
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <Footer />
    </main>
  )
}
