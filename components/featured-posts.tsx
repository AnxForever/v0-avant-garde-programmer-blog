"use client"

import { motion } from "framer-motion"
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right"
import Link from "next/link"

const posts = [
  {
    id: 1,
    title: "Breaking the Grid",
    category: "CSS / DESIGN",
    date: "2025.05.21",
    color: "bg-accent-pink",
    slug: "breaking-the-grid",
  },
  {
    id: 2,
    title: "The Future of React",
    category: "ENGINEERING",
    date: "2025.05.18",
    color: "bg-accent-blue",
    slug: "future-of-react",
  },
  {
    id: 3,
    title: "Generative Art 101",
    category: "CREATIVE CODING",
    date: "2025.05.10",
    color: "bg-accent-green",
    slug: "generative-art-101",
  },
  {
    id: 4,
    title: "Maximalism Rising",
    category: "OPINION",
    date: "2025.05.01",
    color: "bg-accent-orange",
    slug: "maximalism-rising",
  },
]

export function FeaturedPosts() {
  return (
    <section id="thoughts" className="py-32 px-4 md:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-20 border-b-[6px] border-black pb-6 relative">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
            LATEST{" "}
            <span className="inline-block bg-accent-green text-black px-4 py-2 border-4 border-black rotate-[-1deg]">
              LOGS
            </span>
          </h2>
          <span className="font-mono text-xl font-black mb-2 hidden md:block border-4 border-black bg-accent-yellow px-3 py-1">
            001—004
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative ${post.color} border-4 border-black cursor-pointer overflow-hidden h-[320px] flex flex-col justify-between p-8 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300`}
              >
                {/* Number badge */}
                <div className="absolute top-4 right-4 w-12 h-12 border-4 border-black bg-white flex items-center justify-center font-black text-lg">
                  0{index + 1}
                </div>

                <div>
                  <div className="font-mono text-xs font-bold mb-4 bg-black text-white inline-block px-3 py-1 border-2 border-black">
                    {post.category}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-black">
                    {post.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-black">{post.date}</span>
                  <div className="w-14 h-14 border-4 border-black bg-white flex items-center justify-center group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-7 h-7" strokeWidth={3} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <Link href="/blog">
            <button className="bg-black text-white font-black text-xl px-12 py-6 border-4 border-black hover:bg-accent-pink hover:text-black transition-all duration-300 shadow-[8px_8px_0px_0px_var(--accent-blue)]">
              VIEW ALL POSTS →
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
