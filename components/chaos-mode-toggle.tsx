"use client"

import { useState, useEffect } from "react"

export function ChaosModeToggle() {
  const [isChaos, setIsChaos] = useState(false)

  useEffect(() => {
    if (isChaos) {
      document.body.classList.add("chaos-mode")
    } else {
      document.body.classList.remove("chaos-mode")
    }
  }, [isChaos])

  return (
    <button
      onClick={() => setIsChaos(!isChaos)}
      aria-label={isChaos ? "禁用混乱模式" : "启用混乱模式"}
      aria-pressed={isChaos}
      className="fixed bottom-8 right-8 z-50 bg-black text-white border-2 border-white p-4 font-mono font-bold uppercase tracking-widest hover:bg-accent-pink hover:text-black hover:border-black transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
    >
      {isChaos ? "DISABLE CHAOS" : "ENABLE CHAOS"}
    </button>
  )
}
