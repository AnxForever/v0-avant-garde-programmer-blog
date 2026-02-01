"use client"

import { motion } from "framer-motion"

const skills = [
  { name: "REACT", level: 95, color: "bg-accent-blue" },
  { name: "NEXT.JS", level: 90, color: "bg-black text-white" },
  { name: "TYPESCRIPT", level: 85, color: "bg-accent-blue" },
  { name: "WEBGL", level: 70, color: "bg-accent-pink" },
  { name: "DESIGN", level: 80, color: "bg-accent-yellow" },
  { name: "NODE", level: 75, color: "bg-accent-green" },
]

export function SkillsGrid() {
  return (
    <section id="lab" className="py-12 md:py-32 px-4 md:px-12 bg-accent-yellow border-y-4 md:border-y-8 border-black relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }}
      ></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10">
        <div className="md:sticky md:top-32 md:h-fit">
          <div className="bg-white border-2 md:border-4 border-black p-4 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:rotate-[-1deg]">
            <h2 className="text-4xl md:text-8xl font-black mb-2 md:mb-4 leading-[0.8]">
              THE <br />
              <span className="text-stroke">TOOLKIT</span>
            </h2>
            <p className="text-base md:text-2xl font-bold font-mono border-t-2 md:border-t-4 border-black pt-2 md:pt-4 mt-2 md:mt-4">
              // WEAPONS OF CHOICE
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
              className="bg-white border-2 md:border-4 border-black p-3 md:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_var(--accent-pink)] md:hover:shadow-[12px_12px_0px_0px_var(--accent-pink)] transition-all"
            >
              <div className="flex justify-between items-end mb-2 md:mb-4">
                <h3 className="text-xl md:text-3xl font-black tracking-tighter">{skill.name}</h3>
                <span className="font-mono font-bold text-sm md:text-xl bg-black text-white px-1.5 md:px-2">{skill.level}%</span>
              </div>
              <div className="h-4 md:h-6 w-full bg-white border-2 md:border-4 border-black p-0.5 md:p-1">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${skill.color}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
