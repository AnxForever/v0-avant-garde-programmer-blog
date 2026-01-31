# Neo-Brutalist 设计系统文档

> 本文档详细记录了博客的 Neo-Brutalism（新野兽派）设计风格，可作为未来项目的设计参考。

---

## 目录

1. [设计哲学](#1-设计哲学)
2. [色彩系统](#2-色彩系统)
3. [排版系统](#3-排版系统)
4. [边框与阴影](#4-边框与阴影)
5. [组件设计规范](#5-组件设计规范)
6. [动画与交互](#6-动画与交互)
7. [响应式设计](#7-响应式设计)

---

## 1. 设计哲学

### 1.1 Neo-Brutalism 核心原则

Neo-Brutalism（新野兽派）是一种反精致、反极简的设计风格，强调：

| 原则 | 描述 | 实现方式 |
|------|------|----------|
| **反精致** | 拒绝圆润、柔和的设计 | 无圆角 `rounded-none`，粗边框 |
| **高对比** | 强烈的视觉冲击 | 黑白为主 + 荧光强调色 |
| **打破网格** | 不对称、倾斜布局 | `rotate-[-2deg]`，错位元素 |
| **物理隐喻** | 模拟真实按压感 | 阴影位移 + hover 状态变化 |
| **大胆排版** | 超大字体占据视觉主导 | `text-[12vw]`，混合字重 |
| **程序员美学** | 代码风格的视觉语言 | monospace 字体，`// 注释` 风格 |

### 1.2 视觉特征清单

```
✓ 粗黑边框 (border-4 border-black)
✓ 硬阴影无模糊 (shadow-[Xpx_Xpx_0px_0px_rgba(0,0,0,1)])
✓ 无圆角或极少圆角
✓ 高饱和度强调色
✓ 超大标题文字
✓ 倾斜/旋转元素
✓ 网格/点阵背景图案
✓ hover 时阴影消失 + 元素位移
```

---

## 2. 色彩系统

### 2.1 调色板定义

```css
:root {
  /* 主色调 - 黑白 */
  --background: #ffffff;
  --foreground: #000000;
  
  /* Neo-Brutalist 强调色 */
  --accent-pink: #ff006e;    /* 主要CTA、hover状态 */
  --accent-green: #ccff00;   /* 进度条、成功状态 */
  --accent-blue: #00d9ff;    /* 链接、信息提示 */
  --accent-yellow: #ff9500;  /* 标签、警示 */
  --accent-orange: #ff6b00;  /* 次要强调 */
}
```

### 2.2 色彩使用规则

| 颜色 | HEX | 使用场景 | Tailwind 类名 |
|------|-----|----------|---------------|
| Pink | `#ff006e` | CTA按钮hover、选中文字背景、主要强调 | `bg-accent-pink` |
| Green | `#ccff00` | 进度条、技能条、成功状态、装饰条 | `bg-accent-green` |
| Blue | `#00d9ff` | 链接hover、信息标签、装饰元素 | `bg-accent-blue` |
| Yellow | `#ff9500` | 分类标签、警示信息、导航hover | `bg-accent-yellow` |
| Orange | `#ff6b00` | 次要按钮、装饰元素 | `bg-accent-orange` |
| Black | `#000000` | 边框、文字、阴影、背景 | `bg-black`, `border-black` |
| White | `#ffffff` | 背景、卡片、文字 | `bg-white`, `text-white` |

### 2.3 选中文字样式

```tsx
// 全局选中文字样式
<main className="selection:bg-accent-pink selection:text-white">
```

---

## 3. 排版系统

### 3.1 字体配置

```css
@theme inline {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
```

### 3.2 标题尺寸规范

| 层级 | 移动端 | 桌面端 | 使用场景 |
|------|--------|--------|----------|
| Hero 主标题 | `text-[14vw]` | `text-[12vw]` | 首页大标题 |
| 页面标题 | `text-[15vw]` | `text-[12vw]` | 博客列表页标题 |
| 区块标题 | `text-6xl` | `text-8xl` | 各section标题 |
| 卡片标题 | `text-4xl` | `text-5xl` | 博客卡片、项目卡片 |
| 正文标题 | `text-xl` | `text-2xl` | 文章内标题 |

### 3.3 字重使用

```
font-black (900)  → 所有标题、按钮文字、强调文字
font-bold (700)   → 次要标题、标签、导航
font-mono         → 日期、分类、代码风格文字
```

### 3.4 特殊文字效果

#### Text Stroke（镂空文字）
```css
.text-stroke {
  -webkit-text-stroke: 2px black;
  color: transparent;
}

.text-stroke-white {
  -webkit-text-stroke: 2px white;
  color: transparent;
}
```

#### 使用示例
```tsx
<span className="text-stroke">MIST</span>  // 黑色描边镂空
<span className="text-stroke-white">TALK</span>  // 白色描边镂空
```

### 3.5 行高规范

```
leading-[0.8]   → 超大标题（紧凑）
leading-[0.85] → Hero 标题
leading-[1.1]  → 文章标题
leading-tight  → 卡片标题
```

---

## 4. 边框与阴影

### 4.1 边框规范

| 类型 | 移动端 | 桌面端 | 使用场景 |
|------|--------|--------|----------|
| 标准边框 | `border-2` | `border-4` | 卡片、按钮、输入框 |
| 粗边框 | `border-4` | `border-8` | 区块分隔、跑马灯 |
| 超粗边框 | `border-8` | `border-[20px]` | 装饰元素 |

### 4.2 阴影系统

#### 基础阴影（无模糊，硬边缘）
```css
/* 标准阴影 */
shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]     /* 移动端 */
shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]     /* 桌面端 */

/* 大阴影 */
shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]     /* 中等 */
shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]   /* 大型卡片 */
```

#### 彩色阴影
```css
shadow-[8px_8px_0px_0px_var(--accent-pink)]   /* 粉色阴影 */
shadow-[8px_8px_0px_0px_var(--accent-blue)]   /* 蓝色阴影 */
shadow-[8px_8px_0px_0px_var(--accent-green)]  /* 绿色阴影 */
```

### 4.3 预定义边框工具类

```css
/* globals.css 中定义 */
.border-brutal {
  border: 4px solid black;
  box-shadow: 6px 6px 0px 0px rgba(0, 0, 0, 1);
}

.border-brutal-sm {
  border: 3px solid black;
  box-shadow: 4px 4px 0px 0px rgba(0, 0, 0, 1);
}

.border-brutal-pink {
  border: 4px solid black;
  box-shadow: 6px 6px 0px 0px var(--accent-pink);
}

.border-brutal-green {
  border: 4px solid black;
  box-shadow: 6px 6px 0px 0px var(--accent-green);
}

.border-brutal-blue {
  border: 4px solid black;
  box-shadow: 6px 6px 0px 0px var(--accent-blue);
}
```



---

## 5. 组件设计规范

### 5.1 导航栏 (Nav)

#### 设计特点
- 固定定位，始终可见
- 粗边框 + 硬阴影
- Logo 带倾斜效果
- 每个链接有独特的 hover 颜色

#### 代码模板
```tsx
<nav className="fixed top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 z-50 
  bg-white border-2 md:border-4 border-black 
  shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
  px-3 md:px-8 py-2 md:py-4 
  flex justify-between items-center max-w-7xl mx-auto">
  
  {/* Logo - 倾斜黑底白字 */}
  <Link href="/" className="text-base md:text-2xl font-black tracking-tighter 
    hover:scale-105 transition-transform 
    bg-black text-white px-2 py-1 rotate-[-2deg]">
    BRAND_NAME
  </Link>
  
  {/* 导航链接 */}
  <Link href="/page" className="relative group">
    <span className="block font-black text-sm tracking-widest 
      border-2 border-black px-4 py-2 
      bg-white text-black 
      shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
      hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none 
      hover:bg-accent-pink 
      transition-all duration-200">
      链接文字
    </span>
  </Link>
</nav>
```

#### 交互状态
| 状态 | 样式变化 |
|------|----------|
| 默认 | 白底黑字，带阴影 |
| Hover | 背景变色，阴影消失，元素位移 `translate-x-[2px] translate-y-[2px]` |
| Active | 黑底白字，无阴影，已位移 |

---

### 5.2 Hero 区域

#### 设计特点
- 全屏高度 `h-screen`
- 视差滚动背景装饰
- 超大排版 + 混合字体效果
- 代码块装饰元素
- 倾斜标签

#### 背景装饰层
```tsx
{/* 网格背景 */}
<div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] 
  grid-rows-[repeat(20,minmax(0,1fr))] opacity-5 pointer-events-none">
  {Array.from({ length: 400 }).map((_, i) => (
    <div key={i} className="border-[1.5px] border-black" />
  ))}
</div>

{/* 视差模糊色块 */}
<motion.div
  style={{ y: useTransform(scrollY, [0, 500], [0, 200]) }}
  className="absolute top-10 right-10 w-48 md:w-96 h-48 md:h-96 
    bg-accent-green rounded-none blur-2xl opacity-60"
/>
```

#### 标题排版模式
```tsx
{/* 模式1: 实心 + 镂空混合 */}
<h1 className="text-[14vw] md:text-[12vw] leading-[0.85] font-black tracking-tighter">
  <span className="inline-block text-black">DIG</span>
  <span className="inline-block text-stroke">IT</span>
  <span className="inline-block text-black">AL</span>
</h1>

{/* 模式2: 彩色块字母 */}
<h1 className="text-[14vw] md:text-[12vw] leading-[0.85] font-black tracking-tighter flex flex-wrap">
  <span className="inline-block bg-accent-pink text-white px-2 md:px-4 border-2 md:border-4 border-black">AL</span>
  <span className="inline-block bg-accent-orange text-white px-2 md:px-4 border-2 md:border-4 border-black mx-1 md:mx-2">CH</span>
  <span className="inline-block bg-accent-blue text-white px-2 md:px-4 border-2 md:border-4 border-black">E</span>
  <span className="inline-block text-stroke ml-1 md:ml-2">MIST</span>
</h1>
```

#### 装饰代码块
```tsx
<div className="absolute bottom-24 md:bottom-32 right-4 md:right-32 
  bg-black text-white p-4 md:p-6 font-mono text-xs md:text-base 
  max-w-[200px] md:max-w-xs border-brutal-green 
  rotate-2 hover:rotate-0 transition-transform duration-300">
  <p className="text-accent-green mb-2">// system status</p>
  <p>const creativity = Infinity;</p>
  <p>let bugs = 0;</p>
  <p className="mt-2 text-gray-400">/* ready to deploy */</p>
</div>
```

#### 倾斜标签
```tsx
<div className="bg-accent-pink border-2 md:border-4 border-black 
  px-2 md:px-4 py-1 md:py-2 rotate-[-2deg]">
  <span className="font-black text-xs md:text-sm tracking-wider">HELLO WORLD</span>
</div>
```

---

### 5.3 跑马灯 (Marquee)

#### 设计特点
- 倾斜布局打破水平线
- 超粗边框
- 无限循环滚动
- 实心 + 镂空文字交替

#### 代码模板
```tsx
<div className="bg-accent-pink text-black py-6 overflow-hidden whitespace-nowrap 
  rotate-[-2deg] scale-110 border-y-8 border-black 
  shadow-[0px_10px_20px_rgba(0,0,0,0.2)] z-20 relative my-20">
  <motion.div
    animate={{ x: [0, -1000] }}
    transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
    className="flex gap-12 items-center">
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="flex items-center gap-12">
        <span className="text-7xl md:text-9xl font-black tracking-tighter italic">
          FULL STACK
        </span>
        <Star className="w-12 h-12 fill-black stroke-black" />
        <span className="text-7xl md:text-9xl font-black tracking-tighter text-white text-stroke">
          CREATIVE DEV
        </span>
        <Zap className="w-12 h-12 fill-accent-yellow stroke-black" />
      </div>
    ))}
  </motion.div>
</div>
```

#### 关键样式
| 属性 | 值 | 作用 |
|------|-----|------|
| `rotate-[-2deg]` | -2度 | 打破水平线 |
| `scale-110` | 1.1倍 | 超出容器边界 |
| `border-y-8` | 8px | 超粗上下边框 |
| `whitespace-nowrap` | 不换行 | 保持单行滚动 |

---

### 5.4 卡片组件

#### 5.4.1 博客卡片 (Featured Posts)

```tsx
<div className="group relative bg-accent-pink border-4 border-black 
  cursor-pointer overflow-hidden h-[320px] 
  flex flex-col justify-between p-8 
  hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] 
  transition-all duration-300">
  
  {/* 编号徽章 */}
  <div className="absolute top-4 right-4 w-12 h-12 border-4 border-black 
    bg-white flex items-center justify-center font-black text-lg">
    01
  </div>

  <div>
    {/* 分类标签 */}
    <div className="font-mono text-xs font-bold mb-4 
      bg-black text-white inline-block px-3 py-1 border-2 border-black">
      CATEGORY
    </div>
    {/* 标题 */}
    <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-black">
      Card Title
    </h3>
  </div>

  <div className="flex items-center justify-between">
    {/* 日期 */}
    <span className="font-mono text-sm font-bold text-black">2025.05.21</span>
    {/* 箭头按钮 */}
    <div className="w-14 h-14 border-4 border-black bg-white 
      flex items-center justify-center 
      group-hover:scale-110 group-hover:rotate-45 
      transition-all duration-300">
      <ArrowUpRight className="w-7 h-7" strokeWidth={3} />
    </div>
  </div>
</div>
```

#### 5.4.2 博客列表卡片

```tsx
<div className="group relative bg-white border-2 md:border-4 border-black 
  p-4 md:p-8 
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
  hover:shadow-[8px_8px_0px_0px_rgba(255,0,255,1)] md:hover:shadow-[16px_16px_0px_0px_rgba(255,0,255,1)] 
  hover:-translate-y-1 md:hover:-translate-y-2 
  transition-all duration-300">
  
  {/* 分类标签 - 右上角偏移 */}
  <div className="absolute top-0 right-0 bg-black text-white 
    px-2 md:px-4 py-1 md:py-2 font-mono text-xs md:text-sm 
    transform translate-x-1 md:translate-x-2 -translate-y-1 md:-translate-y-2 
    group-hover:bg-accent-yellow group-hover:text-black 
    transition-colors border-2 border-transparent group-hover:border-black">
    {category}
  </div>

  <div className="flex flex-col gap-2 md:gap-4">
    {/* 日期 - 代码注释风格 */}
    <span className="font-mono text-xs md:text-sm text-gray-500 
      group-hover:text-black transition-colors">
      // {date}
    </span>
    
    {/* 标题 */}
    <h2 className="text-xl sm:text-2xl md:text-5xl font-black uppercase 
      group-hover:text-accent-blue transition-colors leading-tight">
      {title}
    </h2>
    
    {/* 阅读按钮 */}
    <div className="flex items-center gap-2 mt-2 md:mt-4">
      <span className="w-6 h-6 md:w-8 md:h-8 bg-black rounded-full 
        flex items-center justify-center text-white 
        group-hover:bg-accent-pink transition-colors">
        →
      </span>
      <span className="font-bold font-mono text-sm md:text-base">READ_FILE</span>
    </div>
  </div>
</div>
```

#### 5.4.3 技能卡片

```tsx
<div className="bg-white border-4 border-black p-6 
  shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
  hover:shadow-[12px_12px_0px_0px_var(--accent-pink)] 
  transition-all">
  
  <div className="flex justify-between items-end mb-4">
    <h3 className="text-3xl font-black tracking-tighter">{skillName}</h3>
    <span className="font-mono font-bold text-xl bg-black text-white px-2">
      {level}%
    </span>
  </div>
  
  {/* 进度条 */}
  <div className="h-6 w-full bg-white border-4 border-black p-1">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      transition={{ duration: 1, delay: 0.5 }}
      className="h-full bg-accent-blue"
    />
  </div>
</div>
```



---

### 5.5 区块标题设计

#### 标准区块标题
```tsx
<div className="flex items-end justify-between mb-20 border-b-[6px] border-black pb-6">
  <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
    LATEST{" "}
    <span className="inline-block bg-accent-green text-black px-4 py-2 
      border-4 border-black rotate-[-1deg]">
      LOGS
    </span>
  </h2>
  <span className="font-mono text-xl font-black mb-2 hidden md:block 
    border-4 border-black bg-accent-yellow px-3 py-1">
    001—004
  </span>
</div>
```

#### 设计要点
- 主标题 + 彩色块内嵌词
- 彩色块带轻微旋转
- 右侧编号标签（桌面端显示）
- 粗底边框分隔

---

### 5.6 按钮设计

#### 主要按钮 (CTA)
```tsx
<button className="bg-black text-white font-black text-xl 
  px-12 py-6 border-4 border-black 
  hover:bg-accent-pink hover:text-black 
  transition-all duration-300 
  shadow-[8px_8px_0px_0px_var(--accent-blue)]">
  VIEW ALL POSTS →
</button>
```

#### 次要按钮
```tsx
<button className="font-black text-sm border-2 border-black 
  px-6 py-3 
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
  hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] 
  transition-all bg-white hover:bg-accent-green">
  GITHUB
</button>
```

#### 滚动按钮
```tsx
<motion.button
  animate={{ y: [0, 10, 0] }}
  transition={{ repeat: Infinity, duration: 2 }}
  className="flex items-center gap-2 md:gap-3 font-black text-sm md:text-base 
    border-2 md:border-4 border-black bg-accent-yellow 
    px-3 md:px-4 py-2 cursor-pointer 
    hover:bg-accent-pink transition-colors">
  <ArrowDownRight className="w-4 h-4 md:w-6 md:h-6" strokeWidth={3} />
  向下
</motion.button>
```

#### 按钮交互规则
| 类型 | 默认状态 | Hover 状态 |
|------|----------|------------|
| 主要 | 黑底白字 + 彩色阴影 | 彩色背景 + 黑字 |
| 次要 | 白底黑字 + 黑色阴影 | 彩色背景 + 阴影消失 + 位移 |
| 图标 | 白底 + 边框 | 放大 + 旋转45度 |

---

### 5.7 页脚 (Footer)

#### 设计特点
- 超大 CTA 文字
- 实心 + 镂空文字组合
- 几何装饰背景
- 社交链接按钮组

#### 代码模板
```tsx
<footer className="bg-white text-black py-20 px-4 md:px-12 
  overflow-hidden relative border-t-8 border-black">
  
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row 
    justify-between items-start md:items-end gap-12 relative z-10">
    
    {/* 左侧 CTA */}
    <div>
      <div className="inline-block bg-black text-white px-4 py-2 mb-4 
        border-4 border-accent-pink rotate-[-2deg]">
        <span className="font-mono font-bold">READY TO START?</span>
      </div>
      <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter text-black">
        LET'S
      </h2>
      <h2 className="text-[12vw] leading-[0.8] font-black tracking-tighter 
        text-white text-stroke drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        TALK
      </h2>
    </div>

    {/* 右侧联系信息 */}
    <div className="flex flex-col gap-6 text-right items-end">
      <a href="mailto:email@example.com" 
        className="text-3xl md:text-5xl font-black 
          hover:text-accent-pink transition-colors 
          bg-accent-yellow border-4 border-black px-6 py-2 
          shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
          hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
        email@example.com
      </a>
      
      {/* 社交链接 */}
      <div className="flex gap-4 justify-end mt-4 flex-wrap">
        <a href="#" className="font-black text-sm border-2 border-black 
          px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
          hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] 
          transition-all bg-white hover:bg-accent-green">
          GITHUB
        </a>
      </div>
      
      <p className="font-mono text-sm font-bold bg-black text-white px-2 py-1 mt-8">
        DESIGNED & BUILT BY NAME
      </p>
    </div>
  </div>

  {/* 背景装饰 */}
  <div className="absolute bottom-0 right-0 w-full h-full opacity-10 
    pointer-events-none overflow-hidden">
    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] 
      border-[20px] border-black rounded-full" />
    <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] 
      bg-accent-pink rounded-none rotate-12" />
    <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] 
      bg-accent-green rounded-full border-4 border-black" />
  </div>
</footer>
```

---

### 5.8 博客文章页面

#### 文章头部
```tsx
<header className="pt-28 md:pt-40 pb-12 md:pb-20 px-4 md:px-12 max-w-7xl mx-auto">
  {/* 返回链接 */}
  <Link href="/blog" className="inline-flex items-center gap-2 font-bold 
    hover:text-accent-pink transition-colors mb-6 md:mb-8 group">
    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
    <span className="border-b-2 border-transparent group-hover:border-accent-pink">
      返回博客列表
    </span>
  </Link>

  {/* 分类标签 - 倾斜 */}
  <div className="inline-block bg-accent-yellow border-2 md:border-4 border-black 
    px-4 md:px-6 py-1 md:py-2 font-black text-sm md:text-xl mb-4 md:mb-8 
    shadow-[2px_2px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-2">
    {category} // {date}
  </div>

  {/* 标题 - 带彩色阴影 */}
  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-black uppercase 
    leading-[1.1] mb-6 md:mb-12 
    drop-shadow-[4px_4px_0px_rgba(0,255,255,1)] md:drop-shadow-[8px_8px_0px_rgba(0,255,255,1)]">
    {title}
  </h1>

  {/* 元信息栏 */}
  <div className="flex flex-wrap gap-2 md:gap-4 items-center font-mono text-xs md:text-sm 
    border-y-2 md:border-y-4 border-black py-4 md:py-6 bg-gray-50">
    <div className="bg-black text-white px-2 md:px-3 py-1 flex items-center gap-1">
      <Clock className="w-3 h-3 md:w-4 md:h-4" />
      <span>5 分钟</span>
    </div>
    <span className="text-xl md:text-2xl">×</span>
    <div className="bg-black text-white px-2 md:px-3 py-1 flex items-center gap-1">
      <User className="w-3 h-3 md:w-4 md:h-4" />
      <span>作者名</span>
    </div>
  </div>
</header>
```

---

## 6. 动画与交互

### 6.1 Framer Motion 动画模式

#### 入场动画
```tsx
// 从下方淡入
initial={{ opacity: 0, y: 50 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ delay: index * 0.1 }}

// 从左侧滑入
initial={{ opacity: 0, x: -50 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ delay: index * 0.1 }}

// 缩放展开
initial={{ scaleX: 0 }}
animate={{ scaleX: 1 }}
transition={{ delay: 0.5, duration: 0.8 }}
className="origin-left"
```

#### 循环动画
```tsx
// 上下浮动
animate={{ y: [0, 10, 0] }}
transition={{ repeat: Infinity, duration: 2 }}

// 旋转 + 缩放
animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
transition={{ repeat: Infinity, duration: 20, ease: "linear" }}

// 水平滚动（跑马灯）
animate={{ x: [0, -1000] }}
transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
```

#### 视差滚动
```tsx
const { scrollY } = useScroll()
const y1 = useTransform(scrollY, [0, 500], [0, 200])
const y2 = useTransform(scrollY, [0, 500], [0, -150])

<motion.div style={{ y: y1 }} className="..." />
```

### 6.2 CSS Transition 模式

#### 标准过渡
```css
transition-all duration-300    /* 所有属性，300ms */
transition-colors              /* 仅颜色 */
transition-transform           /* 仅变换 */
```

#### Hover 位移效果
```tsx
// 阴影消失 + 元素位移（模拟按压）
className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
  hover:shadow-none 
  hover:translate-x-[2px] hover:translate-y-[2px] 
  transition-all"
```

#### 图标旋转
```tsx
// Hover 时旋转45度
className="group-hover:rotate-45 transition-all duration-300"

// Hover 时放大
className="group-hover:scale-110 transition-all duration-300"
```

### 6.3 自定义光标

```tsx
export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  return (
    <>
      {/* 内圆 */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full 
          pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      {/* 外环 */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full 
          pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  )
}
```

### 6.4 Glitch 故障效果

```tsx
export function GlitchText({ text }: { text: string }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative inline-block">
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 -ml-1 text-accent-pink opacity-70 z-0">
            {text}
          </span>
          <span className="absolute top-0 left-0 ml-1 text-accent-blue opacity-70 z-0">
            {text}
          </span>
        </>
      )}
    </div>
  )
}
```

### 6.5 Chaos Mode（彩蛋模式）

```css
.chaos-mode {
  filter: invert(1) hue-rotate(180deg);
  transition: filter 0.5s ease;
}

.chaos-mode img {
  filter: invert(1) hue-rotate(-180deg);  /* 图片反向处理保持正常 */
}
```

