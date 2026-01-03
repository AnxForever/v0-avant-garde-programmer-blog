"use client"

export function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white text-black py-20 px-4 md:px-12 overflow-hidden relative border-t-8 border-black"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
        <div>
          <div className="inline-block bg-black text-white px-4 py-2 mb-4 border-4 border-accent-pink rotate-[-2deg]">
            <span className="font-mono font-bold">READY TO START?</span>
          </div>
          <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-black drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
            LET&apos;S
          </h2>
          <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-white text-stroke drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            TALK
          </h2>
        </div>

        <div className="flex flex-col gap-6 text-right items-end">
          <a
            href="mailto:anxforever@qq.com"
            className="text-3xl md:text-5xl font-black hover:text-accent-pink transition-colors bg-accent-yellow border-4 border-black px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            anxforever@qq.com
          </a>
          <div className="flex gap-4 justify-end mt-4 flex-wrap">
            <a
              href="https://github.com/AnxForever"
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-sm border-2 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white hover:bg-accent-green"
            >
              GITHUB
            </a>
            <a
              href="mailto:anxforever@qq.com"
              className="font-black text-sm border-2 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-white hover:bg-accent-blue"
            >
              QQ邮箱
            </a>
          </div>
          <p className="font-mono text-sm font-bold bg-black text-white px-2 py-1 mt-8">DESIGNED & BUILT BY ANX</p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] border-[20px] border-black rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-accent-pink rounded-none rotate-12" />
        <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] bg-accent-green rounded-full border-4 border-black" />
      </div>
    </footer>
  )
}
