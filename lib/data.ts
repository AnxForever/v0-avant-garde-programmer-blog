import { Cpu, Layers, Mic, Zap, Type, Brain } from "lucide-react"

export const posts = [
  {
    id: 1,
    title: "Vibe Coding：当编程遇上直觉",
    category: "编程哲学",
    date: "2025.03.20",
    slug: "vibe-coding-philosophy",
    content:
      "Vibe Coding 不是随意编码，而是在逻辑与直觉之间找到平衡。作为一名数据科学学生，我发现最好的算法往往诞生于深夜、音乐和纯粹的'感觉对了'的时刻。这篇文章探讨了如何在严谨的数据分析中保持创造力，以及为什么有时候'跟着感觉走'能带来意想不到的突破。",
  },
  {
    id: 2,
    title: "用 Python 可视化我的网易云音乐品味",
    category: "数据分析",
    date: "2025.03.10",
    slug: "netease-music-analysis",
    content:
      "作为一个音乐爱好者和数据科学学生，我用 Python 爬取并分析了我的网易云音乐听歌记录。通过 Pandas、Matplotlib 和 Seaborn，我发现了自己的音乐品味模式：原来我在深夜最喜欢听日系动漫 OST，而写代码时则偏爱电子音乐。数据不会说谎，但它揭示的真相有时会让你惊讶。",
  },
  {
    id: 3,
    title: "AI 让动漫角色'活'过来了？",
    category: "人工智能",
    date: "2025.02.28",
    slug: "ai-anime-characters",
    content:
      "从 Stable Diffusion 到 ChatGPT，AI 正在改变我们与二次元世界的互动方式。作为一个动漫爱好者和 AI 学习者，我尝试用 LLM 创建了一个能够模拟动漫角色对话的聊天机器人。虽然它还不完美，但当它用初音未来的语气回复我时，那种感觉真的很奇妙。这篇文章记录了我的实验过程和一些有趣的发现。",
  },
  {
    id: 4,
    title: "大四迷茫期：我为什么选择做博客",
    category: "随想",
    date: "2025.02.15",
    slug: "why-i-started-blogging",
    content:
      "大四了，身边的同学有的准备考研，有的已经拿到 offer，而我还在摸索自己的方向。做这个博客，是想记录下我在数据科学、AI 和前端开发之间游走的过程。也许这些文字能帮助到同样迷茫的你，或者只是给未来的自己留下一些可以回顾的轨迹。无论如何，coding is fun，而这个博客就是我最好的证明。",
  },
  {
    id: 5,
    title: "从零开始学 Next.js：我的前端入坑记",
    category: "技术学习",
    date: "2025.01.20",
    slug: "learning-nextjs-journey",
    content:
      "作为一个数据科学专业的学生，我的技术栈一直围绕着 Python、Pandas 和 Jupyter Notebook。但当我想要把自己的分析结果用一个酷炫的网站展示出来时，我发现自己需要学习前端。Next.js 成了我的选择——Server Components、路由系统、还有这个疯狂的 Neo-Brutalist 设计风格。这是我的学习笔记，记录了一个后端人的前端冒险。",
  },
]

export const projects = [
  {
    id: 1,
    title: "ANIME_RECOMMENDER",
    client: "个人项目",
    year: "2025",
    description:
      "基于协同过滤和深度学习的动漫推荐系统。爬取了 MAL 和豆瓣的数据，使用 TensorFlow 构建推荐模型。前端用 Next.js + D3.js 做了可视化，可以看到不同动漫之间的相似度网络图。",
    tags: ["PYTHON", "TENSORFLOW", "NEXT.JS", "D3.JS"],
    image: "/neon-cyberpunk-interface.jpg",
    slug: "anime-recommender",
  },
  {
    id: 2,
    title: "MUSIC_MOOD_ANALYZER",
    client: "课程项目",
    year: "2024",
    description:
      "音乐情绪分析工具，通过分析歌曲的音频特征（节奏、音调、能量）来判断歌曲的情绪类型。结合 Spotify API 和机器学习模型，可以自动为你的歌单打上'快乐''忧伤''热血'等标签。",
    tags: ["PYTHON", "SKLEARN", "WEB AUDIO API", "REACT"],
    image: "/audio-visualization-abstract.jpg",
    slug: "music-mood-analyzer",
  },
  {
    id: 3,
    title: "COVID_DATA_DASHBOARD",
    client: "数据可视化作业",
    year: "2024",
    description:
      "疫情数据可视化仪表盘，使用 Python Flask 后端 + Echarts 前端，展示全球和中国各地区的疫情趋势。支持时间轴动画、地图热力图、以及多维度数据对比。虽然疫情已经过去，但这个项目让我学会了如何处理时序数据。",
    tags: ["FLASK", "ECHARTS", "PANDAS", "SQL"],
    image: "/brutalist-architecture-website.jpg",
    slug: "covid-dashboard",
  },
  {
    id: 4,
    title: "STYLE_TRANSFER_APP",
    client: "个人实验",
    year: "2023",
    description:
      "基于神经风格迁移的图片艺术化工具。上传一张照片和一张艺术作品，AI 会把艺术风格应用到你的照片上。我用它把自己的自拍变成了新海诚风格的动漫场景，效果出奇地好。",
    tags: ["PYTORCH", "FASTAPI", "REACT", "AI"],
    image: "/glitch-art-digital.jpg",
    slug: "style-transfer-app",
  },
]

export const experiments = [
  {
    id: 1,
    title: "神经网络可视化",
    description: "神经网络训练过程的 3D 可视化，看见每一层的激活和权重变化。",
    tags: ["THREE.JS", "WEBGL", "TENSORFLOW.JS"],
    color: "bg-accent-pink",
    slug: "neural-net-visualizer",
    icon: Brain,
  },
  {
    id: 2,
    title: "音频反应粒子",
    description: "实时响应麦克风输入的粒子系统，音乐越大声，粒子越疯狂。",
    tags: ["WEB AUDIO", "CANVAS", "PHYSICS"],
    color: "bg-accent-green",
    slug: "audio-reactive-particles",
    icon: Mic,
  },
  {
    id: 3,
    title: "生成式排版",
    description: "鼠标经过时文字会被'推开'的实验性排版效果。",
    tags: ["SVG", "GSAP", "INTERACTION"],
    color: "bg-accent-blue",
    slug: "generative-typography",
    icon: Type,
  },
  {
    id: 4,
    title: "物理布局引擎",
    description: "基于 Matter.js 的物理引擎，方块会真实地碰撞和弹跳。",
    tags: ["MATTER.JS", "REACT", "PHYSICS"],
    color: "bg-accent-yellow",
    slug: "physics-based-layout",
    icon: Layers,
  },
  {
    id: 5,
    title: "AI 聊天机器人",
    description: "基于 GPT 的角色扮演聊天机器人，可以模拟动漫角色对话。",
    tags: ["OPENAI API", "NEXT.JS", "AI"],
    color: "bg-accent-red",
    slug: "ai-chatbot",
    icon: Cpu,
  },
  {
    id: 6,
    title: "数据可视化画廊",
    description: "收集了我做过的各种数据可视化作品，从简单的折线图到复杂的网络图。",
    tags: ["D3.JS", "ECHARTS", "VISUALIZATION"],
    color: "bg-white",
    slug: "data-viz-gallery",
    icon: Zap,
  },
]
