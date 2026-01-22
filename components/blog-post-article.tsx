import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Post {
  id: number
  title: string
  category: string
  date: string
  slug: string
  content: string
  isGraduation?: boolean
}

interface BlogPostArticleProps {
  post: Post
}

export function BlogPostArticle({ post }: BlogPostArticleProps) {
  return (
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
  )
}
