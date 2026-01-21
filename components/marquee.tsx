"use client"

import { motion } from "framer-motion"
import Star from "lucide-react/dist/esm/icons/star"
import Zap from "lucide-react/dist/esm/icons/zap"

export function Marquee() {
  return (
    <div className="bg-accent-pink text-black py-6 overflow-hidden whitespace-nowrap rotate-[-2deg] scale-110 border-y-8 border-black shadow-[0px_10px_20px_rgba(0,0,0,0.2)] z-20 relative my-20">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 15, ease: "linear" }}
        className="flex gap-12 items-center"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-7xl md:text-9xl font-black tracking-tighter italic">FULL STACK</span>
            <Star className="w-12 h-12 fill-black stroke-black animate-spin-slow" />
            <span className="text-7xl md:text-9xl font-black tracking-tighter text-white text-stroke">
              CREATIVE DEV
            </span>
            <Zap className="w-12 h-12 fill-accent-yellow stroke-black" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
