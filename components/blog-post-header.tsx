import Link from "next/link"
import ArrowLeft from "lucide-react/dist/esm/icons/arrow-left"
import Clock from "lucide-react/dist/esm/icons/clock"
import User from "lucide-react/dist/esm/icons/user"

interface Post {
  id: number
  title: string
  category: string
  date: string
  slug: string
  content: string
  isGraduation?: boolean
}

interface BlogPostHeaderProps {
  post: Post
}

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-12 max-w-7xl mx-auto relative">
      {/* 返回按钮 */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-bold hover:text-accent-pink transition-colors mb-6 md:mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="border-b-2 border-transparent group-hover:border-accent-pink">返回博客列表</span>
      </Link>

      <div className="inline-block bg-accent-yellow border-2 md:border-4 border-black px-4 md:px-6 py-1 md:py-2 font-black text-sm md:text-xl mb-4 md:mb-8 shadow-[2px_2px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-2">
        {post.category} // {post.date}
      </div>

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
    </header>
  )
}
